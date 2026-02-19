#!/usr/bin/env node

/**
 * 自動同步腳本 - Harem AI Library Auto-Sync
 * 用途：當 harem-ai-library.js 更新時，自動提交並推送到 GitHub
 * 使用方法：
 *   1. 手動執行: node scripts/auto-sync-harem-ai.js
 *   2. 通過 npm script: npm run sync:harem-ai
 *   3. 通過 GitHub Actions 自動觸發
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  targetFile: 'static/data/harem-ai-library.js',
  commitPrefix: '[AUTO-SYNC]',
  branch: 'main',
  remoteName: 'origin'
};

// 顏色輸出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf-8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
  } catch (error) {
    throw new Error(`命令執行失敗: ${command}\n錯誤: ${error.message}`);
  }
}

function checkGitStatus() {
  log('\n📊 檢查 Git 狀態...', 'cyan');
  
  try {
    const status = execCommand('git status --porcelain', { silent: true });
    
    if (!status) {
      log('✓ 沒有需要提交的更改', 'green');
      return false;
    }
    
    // 檢查目標文件是否有更改
    const lines = status.split('\n');
    const targetFileChanged = lines.some(line => 
      line.includes(CONFIG.targetFile)
    );
    
    if (targetFileChanged) {
      log(`✓ 檢測到 ${CONFIG.targetFile} 有更改`, 'green');
      return true;
    } else {
      log(`⚠ ${CONFIG.targetFile} 沒有更改`, 'yellow');
      return false;
    }
  } catch (error) {
    log(`✗ Git 狀態檢查失敗: ${error.message}`, 'red');
    throw error;
  }
}

function getFileInfo() {
  const filePath = path.join(process.cwd(), CONFIG.targetFile);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`文件不存在: ${CONFIG.targetFile}`);
  }
  
  const stats = fs.statSync(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 統計角色數量
  const characterCount = (content.match(/^\s{2}[a-z_]+_\d+:\s*{/gm) || []).length;
  
  return {
    size: stats.size,
    modified: stats.mtime,
    characterCount
  };
}

function generateCommitMessage() {
  const fileInfo = getFileInfo();
  const timestamp = new Date().toISOString().split('T')[0];
  
  return `${CONFIG.commitPrefix} 更新後宮AI角色庫 - ${timestamp}

- 總角色數: ${fileInfo.characterCount}
- 文件大小: ${(fileInfo.size / 1024).toFixed(2)} KB
- 更新時間: ${fileInfo.modified.toLocaleString('zh-CN')}

自動同步系統 v1.0`;
}

function commitChanges() {
  log('\n📝 提交更改...', 'cyan');
  
  try {
    // 添加目標文件
    execCommand(`git add ${CONFIG.targetFile}`);
    log(`✓ 已添加 ${CONFIG.targetFile}`, 'green');
    
    // 生成提交訊息
    const commitMessage = generateCommitMessage();
    
    // 提交
    execCommand(`git commit -m "${commitMessage}"`);
    log('✓ 提交成功', 'green');
    
    return true;
  } catch (error) {
    log(`✗ 提交失敗: ${error.message}`, 'red');
    return false;
  }
}

function pushToGitHub() {
  log('\n🚀 推送到 GitHub...', 'cyan');
  
  try {
    // 檢查遠程倉庫
    const remotes = execCommand('git remote', { silent: true });
    if (!remotes.includes(CONFIG.remoteName)) {
      throw new Error(`遠程倉庫 '${CONFIG.remoteName}' 不存在`);
    }
    
    // 獲取當前分支
    const currentBranch = execCommand('git branch --show-current', { silent: true }).trim();
    log(`當前分支: ${currentBranch}`, 'blue');
    
    // 推送
    execCommand(`git push ${CONFIG.remoteName} ${currentBranch}`);
    log('✓ 推送成功', 'green');
    
    return true;
  } catch (error) {
    log(`✗ 推送失敗: ${error.message}`, 'red');
    return false;
  }
}

function displaySummary(fileInfo) {
  log('\n' + '='.repeat(60), 'cyan');
  log('📊 同步摘要', 'cyan');
  log('='.repeat(60), 'cyan');
  log(`文件: ${CONFIG.targetFile}`, 'blue');
  log(`角色數量: ${fileInfo.characterCount} 位`, 'blue');
  log(`文件大小: ${(fileInfo.size / 1024).toFixed(2)} KB`, 'blue');
  log(`最後修改: ${fileInfo.modified.toLocaleString('zh-CN')}`, 'blue');
  log('='.repeat(60), 'cyan');
}

function main() {
  try {
    log('╔════════════════════════════════════════════════════════════╗', 'magenta');
    log('║     後宮AI角色庫 - 自動同步系統                            ║', 'magenta');
    log('║     Harem AI Library - Auto-Sync System                   ║', 'magenta');
    log('╚════════════════════════════════════════════════════════════╝', 'magenta');
    
    // 1. 檢查文件信息
    log('\n📂 檢查文件信息...', 'cyan');
    const fileInfo = getFileInfo();
    displaySummary(fileInfo);
    
    // 2. 檢查 Git 狀態
    const hasChanges = checkGitStatus();
    
    if (!hasChanges) {
      log('\n✨ 沒有需要同步的更改，結束執行', 'yellow');
      process.exit(0);
    }
    
    // 3. 提交更改
    const commitSuccess = commitChanges();
    if (!commitSuccess) {
      log('\n✗ 同步失敗：無法提交更改', 'red');
      process.exit(1);
    }
    
    // 4. 推送到 GitHub
    const pushSuccess = pushToGitHub();
    if (!pushSuccess) {
      log('\n✗ 同步失敗：無法推送到 GitHub', 'red');
      process.exit(1);
    }
    
    // 5. 成功完成
    log('\n' + '='.repeat(60), 'green');
    log('🎉 同步完成！', 'green');
    log('='.repeat(60), 'green');
    log(`✓ ${CONFIG.targetFile} 已成功同步到 GitHub`, 'green');
    log('✓ 包含 ' + fileInfo.characterCount + ' 位角色的完整AI資料', 'green');
    log('✓ 您可以在 GitHub 上查看最新提交', 'green');
    log('='.repeat(60), 'green');
    
    process.exit(0);
  } catch (error) {
    log('\n✗ 同步過程中發生錯誤:', 'red');
    log(error.message, 'red');
    log('\n請檢查錯誤信息並手動處理', 'yellow');
    process.exit(1);
  }
}

// 執行主函數
main();
