import * as THREE from "three";
import "./styles.css";

const canvas = document.querySelector("#astral-canvas");
const gate = document.querySelector("#gate");
const enterButton = document.querySelector("#enter-button");
const quote = document.querySelector("#quote");
const brandMark = document.querySelector("#brand-mark");
const authLog = document.querySelector("#auth-log");
const siteContent = document.querySelector(".site-content");
const menuToggle = document.querySelector("#menu-toggle");
const siteMenu = document.querySelector("#site-menu");
const realmButtons = document.querySelectorAll("[data-realm-target]");
const realmPanels = document.querySelectorAll("[data-realm]");

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x02030a, 0.045);

const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 120);
camera.position.set(0, 0, 18);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance"
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const clock = new THREE.Clock();
const pointer = new THREE.Vector2();
const root = new THREE.Group();
const rings = new THREE.Group();
const starGroup = new THREE.Group();
const constellationGroup = new THREE.Group();
const burstGroup = new THREE.Group();

let sequenceStart = 0;
let sequenceActive = false;
let sequenceTime = 0;
let audioContext;
let humGain;

scene.add(root, burstGroup);
root.add(rings, starGroup, constellationGroup);

const glowTexture = buildCircleTexture();
const runeTexture = buildRuneTexture();

const starDust = createStars(1200, 46, 0.015, 0x9fb6dc, 0.38);
const deepStars = createStars(520, 84, 0.028, 0xf4f7ff, 0.42);
scene.add(starDust, deepStars);

const coreMaterial = new THREE.MeshBasicMaterial({
  color: 0xf6f8ff,
  transparent: true,
  opacity: 0,
  blending: THREE.AdditiveBlending
});
const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 4), coreMaterial);
root.add(core);

const coreGlow = new THREE.Sprite(
  new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xf6f8ff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
);
coreGlow.scale.set(5.6, 5.6, 1);
root.add(coreGlow);

const innerRing = createRing(3.0, 0.035, 0xdfe8ff, true);
const middleRing = createRing(5.05, 0.085, 0xcbd7e8, false);
const outerRing = createRing(7.15, 0.052, 0xf4f7ff, false);
innerRing.rotation.set(THREE.MathUtils.degToRad(30), 0, THREE.MathUtils.degToRad(12));
middleRing.rotation.set(THREE.MathUtils.degToRad(-28), THREE.MathUtils.degToRad(18), 0);
outerRing.rotation.set(THREE.MathUtils.degToRad(15), 0, THREE.MathUtils.degToRad(-8));
rings.add(innerRing, middleRing, outerRing);

const runeBand = new THREE.Mesh(
  new THREE.TorusGeometry(3.02, 0.055, 10, 180),
  new THREE.MeshBasicMaterial({
    map: runeTexture,
    color: 0xf5f8ff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  })
);
runeBand.rotation.copy(innerRing.rotation);
rings.add(runeBand);

const galaxyArc = createGalaxyArc();
outerRing.add(galaxyArc);

const towerStars = createTowerStars();
starGroup.add(...towerStars.map((item) => item.sprite));
const constellationLines = createConstellationLines();
constellationGroup.add(...constellationLines);

const haloWaves = Array.from({ length: 4 }, () => {
  const wave = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.012, 8, 160),
    new THREE.MeshBasicMaterial({
      color: 0xdfe8ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    })
  );
  root.add(wave);
  return wave;
});

enterButton.addEventListener("click", startSequence);
window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
  pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
});

menuToggle.addEventListener("click", () => {
  const open = !siteMenu.classList.contains("is-open");
  menuToggle.classList.toggle("is-open", open);
  siteMenu.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "關閉主選單" : "開啟主選單");
});

siteMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("is-open");
    siteMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "開啟主選單");
  });
});

realmButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.realmTarget;
    realmButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    realmPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.realm === target);
    });
  });
});

function buildCircleTexture(size = 128) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = size;
  textureCanvas.height = size;
  const ctx = textureCanvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.22, "rgba(244,247,255,0.96)");
  gradient.addColorStop(0.5, "rgba(174,194,225,0.35)");
  gradient.addColorStop(1, "rgba(174,194,225,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function buildRuneTexture() {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 512;
  textureCanvas.height = 64;
  const ctx = textureCanvas.getContext("2d");
  ctx.clearRect(0, 0, 512, 64);
  ctx.strokeStyle = "rgba(245,248,255,0.78)";
  ctx.lineWidth = 1;

  for (let i = 0; i < 18; i += 1) {
    const x = 16 + i * 28;
    ctx.beginPath();
    ctx.moveTo(x, 18);
    ctx.lineTo(x + 8, 32);
    ctx.lineTo(x, 46);
    ctx.lineTo(x - 8, 32);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "rgba(216,201,152,0.55)";
    ctx.fillRect(x + 13, 30, 10, 2);
    ctx.fillRect(x - 22, 30, 10, 2);
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRing(radius, tube, color, useRuneMap) {
  return new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 18, 240),
    new THREE.MeshBasicMaterial({
      color,
      map: useRuneMap ? runeTexture : null,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    })
  );
}

function createStars(count, radius, size, color, opacity) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const baseColor = new THREE.Color(color);

  for (let i = 0; i < count; i += 1) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) - 22;
    colors[i * 3] = baseColor.r;
    colors[i * 3 + 1] = baseColor.g;
    colors[i * 3 + 2] = baseColor.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size,
      vertexColors: true,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
}

function createTowerStars() {
  const points = [];
  const radiusX = 8.2;
  const radiusY = 5.5;
  for (let i = 0; i < 13; i += 1) {
    const angle = -Math.PI / 2 + (i / 13) * Math.PI * 2;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: i === 0 ? 0xd8c998 : 0xf3f6ff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    sprite.position.set(Math.cos(angle) * radiusX, Math.sin(angle) * radiusY, Math.sin(angle * 2) * 1.6);
    sprite.scale.setScalar(0.5);
    points.push({ sprite, base: sprite.position.clone() });
  }
  return points;
}

function createConstellationLines() {
  const lines = [];
  for (let i = 0; i < towerStars.length; i += 1) {
    const next = towerStars[(i + 1) % towerStars.length];
    const geometry = new THREE.BufferGeometry().setFromPoints([towerStars[i].base, next.base]);
    lines.push(
      new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: 0xdfe8ff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending
        })
      )
    );
  }
  return lines;
}

function createGalaxyArc() {
  const count = 360;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 7.18 + Math.sin(i * 0.17) * 0.07;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = Math.sin(angle * 3) * 0.05;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      map: glowTexture,
      size: 0.08,
      color: 0xf4f7ff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
}

function startSequence() {
  if (sequenceActive) return;
  gate.classList.remove("is-visible");
  sequenceActive = true;
  sequenceStart = clock.elapsedTime;
  quote.classList.add("is-visible");
  setTimeout(() => brandMark.classList.add("is-visible"), 9800);
  setTimeout(() => authLog.classList.add("is-visible"), 13600);
  setTimeout(() => siteContent.classList.add("is-visible"), 18800);
  startHum();
}

function startHum() {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const second = audioContext.createOscillator();
    humGain = audioContext.createGain();
    oscillator.type = "sine";
    second.type = "triangle";
    oscillator.frequency.value = 66;
    second.frequency.value = 132;
    humGain.gain.value = 0.0001;
    oscillator.connect(humGain);
    second.connect(humGain);
    humGain.connect(audioContext.destination);
    oscillator.start();
    second.start();
  }
  if (audioContext.state === "suspended") audioContext.resume();
  humGain.gain.cancelScheduledValues(audioContext.currentTime);
  humGain.gain.linearRampToValueAtTime(0.032, audioContext.currentTime + 1.2);
  humGain.gain.linearRampToValueAtTime(0.004, audioContext.currentTime + 20);
}

function clamp01(value) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function smoothstep(edge0, edge1, value) {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function updateSequence(delta) {
  const elapsed = clock.elapsedTime;
  sequenceTime = sequenceActive ? elapsed - sequenceStart : 0;

  const awaken = sequenceActive ? smoothstep(0, 3.2, sequenceTime) : 0;
  const coreIn = smoothstep(4.8, 7.2, sequenceTime);
  const ringsIn = smoothstep(7.0, 10.8, sequenceTime);
  const starsIn = smoothstep(10.5, 14.5, sequenceTime);
  const linesIn = smoothstep(12.8, 15.8, sequenceTime);
  const authIn = smoothstep(14.0, 17.6, sequenceTime);
  const burst = smoothstep(17.2, 18.5, sequenceTime);
  const menuIn = smoothstep(18.2, 20.2, sequenceTime);

  starDust.material.opacity = 0.2 + awaken * 0.28 + menuIn * 0.08;
  deepStars.material.opacity = 0.22 + awaken * 0.26;

  const pulse = 1 + Math.sin(elapsed * 3.2) * 0.08 + Math.sin(elapsed * 6.4) * 0.03;
  core.scale.setScalar((0.55 + coreIn * 0.62) * pulse * (1 - burst * 0.45));
  coreMaterial.opacity = coreIn * (1 - burst);
  coreGlow.material.opacity = coreIn * (0.38 + authIn * 0.25) * (1 - burst);
  coreGlow.scale.setScalar((5.2 + Math.sin(elapsed * 2.8) * 0.5 + authIn * 1.6) * (1 - burst * 0.2));
  core.rotation.x += delta * 0.22;
  core.rotation.y += delta * 0.38;

  rings.children.forEach((ring) => {
    ring.material.opacity = ringsIn * 0.62 * (1 - burst);
  });
  runeBand.material.opacity = ringsIn * 0.54 * (1 - burst);
  galaxyArc.material.opacity = ringsIn * 0.72 * (1 - burst);

  const sync = authIn * 1.65;
  innerRing.rotation.x += delta * (0.24 + sync);
  innerRing.rotation.z += delta * (0.16 + sync * 0.45);
  middleRing.rotation.y -= delta * (0.34 + sync * 1.2);
  middleRing.rotation.z += delta * (0.12 + sync * 0.25);
  outerRing.rotation.x += delta * (0.08 + sync * 0.5);
  outerRing.rotation.y += delta * (0.18 + sync * 0.6);
  runeBand.rotation.copy(innerRing.rotation);
  galaxyArc.rotation.z -= delta * 0.12;

  haloWaves.forEach((wave, index) => {
    const local = ((sequenceTime - 5.4 - index * 0.42) % 2.5 + 2.5) % 2.5;
    const progress = sequenceActive && sequenceTime > 5.4 ? local / 2.5 : 0;
    wave.scale.setScalar(1.1 + progress * 7.4);
    wave.material.opacity = coreIn * (1 - progress) * 0.22 * (1 - burst);
    wave.rotation.x = Math.PI / 2 + pointer.y * 0.08;
  });

  towerStars.forEach((item, index) => {
    const itemIn = smoothstep(10.2 + index * 0.18, 10.9 + index * 0.18, sequenceTime);
    const resonate = 1 + Math.sin(elapsed * 4.2 + index) * 0.13 + authIn * 0.42;
    item.sprite.material.opacity = itemIn * (0.66 + authIn * 0.24) * (1 - burst);
    item.sprite.scale.setScalar((0.42 + itemIn * 0.38) * resonate * (1 - burst * 0.35));
    item.sprite.position.copy(item.base);
  });

  constellationLines.forEach((line, index) => {
    const itemLineIn = smoothstep(12.6 + index * 0.08, 13.4 + index * 0.08, sequenceTime);
    line.material.opacity = itemLineIn * linesIn * 0.44 * (1 - burst);
  });

  if (burst > 0 && burstGroup.children.length === 0) {
    createBurstParticles();
  }

  burstGroup.children.forEach((particle, index) => {
    const data = particle.userData;
    particle.position.copy(data.start).lerp(data.end, burst);
    particle.material.opacity = Math.sin(burst * Math.PI) * 0.62;
    particle.scale.setScalar((0.18 + (index % 5) * 0.018) * (1 + burst * 1.8));
  });

  root.scale.setScalar(1 - menuIn * 0.2);
  root.rotation.x += (pointer.y * 0.12 - root.rotation.x) * 0.035;
  root.rotation.y += (pointer.x * 0.18 - root.rotation.y) * 0.035;
  starGroup.rotation.z += delta * 0.025;
  constellationGroup.rotation.z = starGroup.rotation.z;
  starDust.rotation.y += delta * 0.004;
  deepStars.rotation.y -= delta * 0.002;
}

function createBurstParticles() {
  towerStars.forEach((item, index) => {
    const particle = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: index % 3 === 0 ? 0xd8c998 : 0xf4f7ff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    particle.position.copy(item.base);
    particle.userData = {
      start: item.base.clone(),
      end: item.base.clone().multiplyScalar(1.95).add(new THREE.Vector3(0, -2.8, -2))
    };
    particle.scale.setScalar(0.18);
    burstGroup.add(particle);
  });
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function render() {
  const delta = clock.getDelta();
  updateSequence(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
