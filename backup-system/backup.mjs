import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const defaultConfigPath = path.join(projectRoot, "backup.config.json");
const exampleConfigPath = path.join(scriptDir, "backup.config.example.json");

const args = process.argv.slice(2);
const command = args[0] || "help";

main().catch((error) => {
  console.error(`Backup failed: ${error.message}`);
  process.exitCode = 1;
});

async function main() {
  if (command === "init") return initConfig();
  if (command === "run") return runBackup();
  if (command === "list") return listBackups();
  if (command === "verify") return verifyBackup(getCommandPositionals()[0]);
  if (command === "prune") return pruneBackups();
  return printHelp();
}

async function initConfig() {
  const configPath = getConfigPath();
  if (await exists(configPath)) {
    console.log(`Config already exists: ${configPath}`);
    return;
  }

  const example = await readFile(exampleConfigPath, "utf8");
  await writeFile(configPath, example, "utf8");
  console.log(`Created config: ${configPath}`);
  console.log("Edit backupRoot and sources before running a real backup.");
}

async function runBackup() {
  const config = await loadConfig();
  const backupId = createBackupId();
  const backupRoot = path.resolve(config.backupRoot);
  const archiveDir = path.join(backupRoot, "archives", backupId);
  const manifestDir = path.join(backupRoot, "manifests");
  const dryRun = hasFlag("--dry-run");

  await mkdir(archiveDir, { recursive: true });
  await mkdir(manifestDir, { recursive: true });

  const manifest = {
    id: backupId,
    createdAt: new Date().toISOString(),
    host: os.hostname(),
    platform: os.platform(),
    backupRoot,
    dryRun,
    sources: [],
    totals: {
      files: 0,
      bytes: 0
    }
  };

  for (const source of config.sources) {
    const sourcePath = path.resolve(source.path);
    const sourceName = sanitizeName(source.name || path.basename(sourcePath));
    const sourceStat = await stat(sourcePath);
    const files = sourceStat.isDirectory()
      ? await collectFiles(sourcePath, config.exclude || [])
      : [await fileEntry(sourcePath, path.basename(sourcePath))];

    const archivePath = path.join(archiveDir, `${sourceName}.tar.gz`);
    const archive = dryRun
      ? null
      : await createArchive(sourcePath, archivePath, config.exclude || []);

    const sourceManifest = {
      name: sourceName,
      originalPath: sourcePath,
      type: sourceStat.isDirectory() ? "directory" : "file",
      archivePath: archive ? archive.path : archivePath,
      archiveSha256: archive ? archive.sha256 : null,
      fileCount: files.length,
      totalBytes: files.reduce((sum, file) => sum + file.size, 0),
      files
    };

    manifest.sources.push(sourceManifest);
    manifest.totals.files += sourceManifest.fileCount;
    manifest.totals.bytes += sourceManifest.totalBytes;
    console.log(`${dryRun ? "Checked" : "Backed up"} ${sourceName}: ${sourceManifest.fileCount} files`);
  }

  const manifestPath = path.join(manifestDir, `${backupId}.json`);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Manifest: ${manifestPath}`);
  console.log(`Backup ID: ${backupId}`);
}

async function listBackups() {
  const config = await loadConfig();
  const manifestDir = path.join(path.resolve(config.backupRoot), "manifests");
  const manifests = await readManifests(manifestDir);

  if (manifests.length === 0) {
    console.log("No backups found.");
    return;
  }

  for (const manifest of manifests) {
    const size = formatBytes(manifest.totals?.bytes || 0);
    console.log(`${manifest.id} | ${manifest.createdAt} | ${manifest.totals?.files || 0} files | ${size}`);
  }
}

async function verifyBackup(requestedId) {
  const config = await loadConfig();
  const backupRoot = path.resolve(config.backupRoot);
  const manifestDir = path.join(backupRoot, "manifests");
  const manifests = await readManifests(manifestDir);

  if (manifests.length === 0) {
    throw new Error("No backups found to verify.");
  }

  const manifest = requestedId
    ? manifests.find((item) => item.id === requestedId)
    : manifests[0];

  if (!manifest) {
    throw new Error(`Backup ID not found: ${requestedId}`);
  }

  for (const source of manifest.sources) {
    const archivePath = path.resolve(source.archivePath);
    assertInside(backupRoot, archivePath, "Archive path is outside backupRoot.");
    if (!(await exists(archivePath))) {
      throw new Error(`Missing archive: ${archivePath}`);
    }

    const currentHash = await sha256File(archivePath);
    if (source.archiveSha256 && currentHash !== source.archiveSha256) {
      throw new Error(`Archive hash mismatch: ${archivePath}`);
    }

    const result = spawnSync("tar", ["-tzf", archivePath], {
      encoding: "utf8",
      windowsHide: true
    });
    if (result.status !== 0) {
      throw new Error(`Archive cannot be read: ${archivePath}\n${result.stderr}`);
    }

    console.log(`Verified ${source.name}: ${path.basename(archivePath)}`);
  }

  console.log(`Backup verified: ${manifest.id}`);
}

async function pruneBackups() {
  const config = await loadConfig();
  const keepLast = Number(config.retention?.keepLast || 10);
  const backupRoot = path.resolve(config.backupRoot);
  const manifestDir = path.join(backupRoot, "manifests");
  const archiveRoot = path.join(backupRoot, "archives");
  const manifests = await readManifests(manifestDir);
  const deleteTargets = manifests.slice(keepLast);

  if (deleteTargets.length === 0) {
    console.log(`Nothing to prune. Keeping ${Math.min(keepLast, manifests.length)} backups.`);
    return;
  }

  for (const manifest of deleteTargets) {
    const archiveDir = path.join(archiveRoot, manifest.id);
    const manifestPath = path.join(manifestDir, `${manifest.id}.json`);
    assertInside(backupRoot, archiveDir, "Archive directory is outside backupRoot.");
    assertInside(backupRoot, manifestPath, "Manifest path is outside backupRoot.");
    await rm(archiveDir, { recursive: true, force: true });
    await rm(manifestPath, { force: true });
    console.log(`Pruned ${manifest.id}`);
  }
}

async function loadConfig() {
  const configPath = getConfigPath();
  if (!(await exists(configPath))) {
    throw new Error(`Missing config: ${configPath}. Run npm run backup:init first.`);
  }

  const config = JSON.parse(await readFile(configPath, "utf8"));
  if (!config.backupRoot) throw new Error("backupRoot is required.");
  if (!Array.isArray(config.sources) || config.sources.length === 0) {
    throw new Error("sources must include at least one source.");
  }
  return config;
}

async function readManifests(manifestDir) {
  if (!(await exists(manifestDir))) return [];

  const entries = await readdir(manifestDir, { withFileTypes: true });
  const manifests = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    const manifestPath = path.join(manifestDir, entry.name);
    manifests.push(JSON.parse(await readFile(manifestPath, "utf8")));
  }
  return manifests.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

async function collectFiles(rootPath, excludeRules, relativeRoot = "") {
  const entries = await readdir(path.join(rootPath, relativeRoot), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeRoot, entry.name);
    if (isExcluded(relativePath, excludeRules)) continue;

    const absolutePath = path.join(rootPath, relativePath);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(rootPath, excludeRules, relativePath));
    } else if (entry.isFile()) {
      files.push(await fileEntry(absolutePath, relativePath));
    }
  }

  return files;
}

async function fileEntry(absolutePath, relativePath) {
  const info = await stat(absolutePath);
  return {
    path: relativePath.replaceAll("\\", "/"),
    size: info.size,
    modifiedAt: info.mtime.toISOString(),
    sha256: await sha256File(absolutePath)
  };
}

async function createArchive(sourcePath, archivePath, excludeRules) {
  await mkdir(path.dirname(archivePath), { recursive: true });
  const parent = path.dirname(sourcePath);
  const base = path.basename(sourcePath);
  const excludeArgs = excludeRules.map((rule) => `--exclude=${rule}`);
  const result = spawnSync("tar", [
    "-czf",
    archivePath,
    ...excludeArgs,
    "-C",
    parent,
    base
  ], {
    encoding: "utf8",
    windowsHide: true
  });

  if (result.status !== 0) {
    throw new Error(`tar failed for ${sourcePath}\n${result.stderr || result.stdout}`);
  }

  return {
    path: archivePath,
    sha256: await sha256File(archivePath)
  };
}

async function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

function isExcluded(relativePath, rules) {
  const normalized = relativePath.replaceAll("\\", "/");
  const segments = normalized.split("/");

  return rules.some((rule) => {
    if (segments.includes(rule)) return true;
    if (rule.startsWith("*.")) return normalized.endsWith(rule.slice(1));
    return normalized === rule || normalized.startsWith(`${rule}/`);
  });
}

function getConfigPath() {
  const index = args.indexOf("--config");
  return index >= 0 && args[index + 1]
    ? path.resolve(args[index + 1])
    : defaultConfigPath;
}

function hasFlag(flag) {
  return args.includes(flag);
}

function getCommandPositionals() {
  const values = [];
  for (let index = 1; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--config") {
      index += 1;
      continue;
    }
    if (value.startsWith("--")) continue;
    values.push(value);
  }
  return values;
}

function createBackupId() {
  return new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
}

function sanitizeName(name) {
  return String(name).replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function assertInside(root, target, message) {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(message);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unit = units.shift();
  while (value >= 1024 && units.length > 0) {
    value /= 1024;
    unit = units.shift();
  }
  return `${value.toFixed(value >= 10 ? 1 : 2)} ${unit}`;
}

function printHelp() {
  console.log(`Local Backup System

Commands:
  init                 Create backup.config.json
  run [--dry-run]      Create a backup from configured sources
  list                 List backup manifests
  verify [backup-id]   Verify latest backup or a specific backup ID
  prune                Delete old backups according to retention.keepLast

Options:
  --config <path>      Use a custom config file
`);
}
