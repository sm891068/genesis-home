# 開發測試手冊 - 後宮AI角色庫

## 📋 目錄
1. [快速開始](#快速開始)
2. [測試指南](#測試指南)
3. [常見問題](#常見問題)
4. [調試技巧](#調試技巧)

---

## 快速開始

### 環境要求
- Node.js 18+ 
- Git 2.0+
- npm 或 yarn

### 安裝步驟

#### 1. 克隆項目
```bash
git clone https://github.com/sm891068/genesis-home.git
cd genesis-home
```

#### 2. 安裝依賴
```bash
npm install
```

#### 3. 驗證安裝
```bash
# 檢查 harem-ai-library.js 語法
npm run sync:harem-ai:check

# 應該看到：✓ Syntax OK
```

### 基本使用

#### 測試角色數據讀取
創建測試文件 `test-harem-ai.js`:

```javascript
import HaremAILibrary, { 
  getCharacterById,
  getAllHaremCharacters,
  getAffectionStage,
  getRandomDialogue
} from './static/data/harem-ai-library.js';

// 測試1: 獲取所有角色
console.log('=== 測試1: 獲取所有角色 ===');
const allCharacters = getAllHaremCharacters();
console.log(`總共 ${allCharacters.length} 位角色`);
allCharacters.forEach(char => {
  console.log(`- ${char.name} (${char.id}) - ${char.rarity}`);
});

// 測試2: 獲取特定角色
console.log('\n=== 測試2: 獲取琉璃女王數據 ===');
const queen = getCharacterById('lr_002');
console.log(`名稱: ${queen.name}`);
console.log(`稀有度: ${queen.rarity}`);
console.log(`職業: ${queen.occupation}`);
console.log(`性格: ${queen.personality.traits.join(', ')}`);

// 測試3: 情感階段
console.log('\n=== 測試3: 測試情感階段 ===');
[0, 40, 80, 120, 160, 200].forEach(points => {
  const stage = getAffectionStage('lr_002', points);
  console.log(`${points}分 -> ${stage.title} (${stage.attitude})`);
});

// 測試4: 隨機對話
console.log('\n=== 測試4: 測試隨機對話 ===');
for (let i = 0; i < 5; i++) {
  const dialogue = getRandomDialogue('lr_002', 120);
  console.log(`- ${dialogue}`);
}
```

運行測試:
```bash
node test-harem-ai.js
```

---

## 測試指南

### 1. 語法驗證測試

```bash
# 方法1: 使用 npm script
npm run sync:harem-ai:check

# 方法2: 使用 Node.js 直接檢查
node -c static/data/harem-ai-library.js

# 方法3: 在 Node.js REPL 中測試
node
> const lib = await import('./static/data/harem-ai-library.js');
> console.log(lib.default);
```

### 2. 數據完整性測試

創建 `test-data-integrity.js`:

```javascript
import HaremAILibrary, { getAllHaremCharacters } from './static/data/harem-ai-library.js';

console.log('🧪 開始數據完整性測試...\n');

const characters = getAllHaremCharacters();
let passCount = 0;
let failCount = 0;

characters.forEach(char => {
  console.log(`測試角色: ${char.name} (${char.id})`);
  
  const tests = [
    { name: '基本信息', check: () => char.id && char.name && char.rarity },
    { name: '性格特質', check: () => char.personality && char.personality.traits },
    { name: '情感階段', check: () => char.affectionStages && Object.keys(char.affectionStages).length === 6 },
    { name: '行為系統', check: () => char.behaviorSystem && char.behaviorSystem.decisionWeights },
    { name: '專屬事件', check: () => char.specialEvents && Object.keys(char.specialEvents).length > 0 },
    { name: '禮物偏好', check: () => char.giftPreferences && char.giftPreferences.loved },
    { name: '對話風格', check: () => char.dialogueStyle && char.dialogueStyle.formality },
    { name: '特殊觸發', check: () => char.specialTriggers && Object.keys(char.specialTriggers).length > 0 }
  ];
  
  let charPass = 0;
  tests.forEach(test => {
    try {
      if (test.check()) {
        console.log(`  ✓ ${test.name}`);
        charPass++;
      } else {
        console.log(`  ✗ ${test.name}`);
        failCount++;
      }
    } catch (e) {
      console.log(`  ✗ ${test.name} (錯誤: ${e.message})`);
      failCount++;
    }
  });
  
  if (charPass === tests.length) {
    console.log(`  ✅ ${char.name} 所有測試通過\n`);
    passCount++;
  } else {
    console.log(`  ⚠️ ${char.name} 有 ${tests.length - charPass} 項測試失敗\n`);
  }
});

console.log('='.repeat(60));
console.log(`總結: ${passCount}/${characters.length} 角色通過所有測試`);
if (failCount > 0) {
  console.log(`⚠️ 發現 ${failCount} 個問題需要修復`);
} else {
  console.log('✅ 所有測試通過！');
}
```

運行:
```bash
node test-data-integrity.js
```

### 3. 情感系統測試

創建 `test-affection-system.js`:

```javascript
import { getAffectionStage, getRandomDialogue } from './static/data/harem-ai-library.js';

console.log('🧪 測試情感系統...\n');

const testCases = [
  { id: 'lr_002', name: '琉璃女王' },
  { id: 'ur_002', name: '紅姐' },
  { id: 'ssr_006', name: '羅奈米' }
];

testCases.forEach(({ id, name }) => {
  console.log(`\n=== ${name} (${id}) ===`);
  
  // 測試所有情感階段
  [0, 40, 80, 120, 160, 200].forEach(points => {
    const stage = getAffectionStage(id, points);
    const dialogue = getRandomDialogue(id, points);
    
    console.log(`\n${points}分 - ${stage.title}`);
    console.log(`態度: ${stage.attitude}`);
    console.log(`對話: ${dialogue}`);
    console.log(`互動: ${stage.interactions.join(', ')}`);
    if (stage.restrictions.length > 0) {
      console.log(`限制: ${stage.restrictions.join(', ')}`);
    }
  });
});

console.log('\n✅ 情感系統測試完成');
```

運行:
```bash
node test-affection-system.js
```

### 4. 事件系統測試

創建 `test-events.js`:

```javascript
import { getCharacterById, triggerSpecialEvent } from './static/data/harem-ai-library.js';

console.log('🧪 測試事件系統...\n');

const characterId = 'lr_002';
const character = getCharacterById(characterId);

console.log(`測試角色: ${character.name}\n`);

// 列出所有事件
Object.entries(character.specialEvents).forEach(([key, event]) => {
  console.log(`事件: ${event.title}`);
  console.log(`ID: ${event.id}`);
  console.log(`觸發條件: ${event.trigger}`);
  console.log(`描述: ${event.description}`);
  
  if (event.dialogue) {
    console.log('對話:');
    event.dialogue.forEach(d => console.log(`  - ${d}`));
  }
  
  if (event.choices) {
    console.log('選項:');
    event.choices.forEach(c => {
      console.log(`  - ${c.text} (${c.effect})`);
    });
  }
  
  console.log('');
});

// 測試事件觸發
console.log('=== 測試事件觸發 ===');
const event = triggerSpecialEvent(characterId, 'lr_002_event_001');
if (event) {
  console.log('✓ 事件觸發成功');
  console.log(`標題: ${event.title}`);
} else {
  console.log('✗ 事件觸發失敗');
}
```

運行:
```bash
node test-events.js
```

### 5. 禮物系統測試

創建 `test-gifts.js`:

```javascript
import { getCharacterById, getGiftReaction } from './static/data/harem-ai-library.js';

console.log('🧪 測試禮物系統...\n');

const characterId = 'lr_002';
const character = getCharacterById(characterId);

console.log(`測試角色: ${character.name}\n`);

// 列出禮物偏好
console.log('禮物偏好:');
console.log(`最愛 (+20): ${character.giftPreferences.loved.join(', ')}`);
console.log(`喜歡 (+10): ${character.giftPreferences.liked.join(', ')}`);
console.log(`中立 (+5): ${character.giftPreferences.neutral.join(', ')}`);
console.log(`不喜歡 (-5): ${character.giftPreferences.disliked.join(', ')}`);
console.log(`討厭 (-15): ${character.giftPreferences.hated.join(', ')}`);

// 測試禮物反應
console.log('\n=== 測試禮物反應 ===');
const testGifts = [
  '稀世珍寶',
  '高級茶葉',
  '普通禮物',
  '廉價飾品',
  '不敬之物'
];

testGifts.forEach(gift => {
  const reaction = getGiftReaction(characterId, gift);
  const affectionChange = {
    'loved': '+20',
    'liked': '+10',
    'neutral': '+5',
    'disliked': '-5',
    'hated': '-15'
  }[reaction];
  
  console.log(`${gift}: ${reaction} (${affectionChange} 親密度)`);
});
```

運行:
```bash
node test-gifts.js
```

### 6. 自動同步測試

```bash
# 測試同步腳本（不實際推送）
# 先備份當前文件
cp static/data/harem-ai-library.js static/data/harem-ai-library.js.backup

# 進行小修改
echo "// Test comment" >> static/data/harem-ai-library.js

# 檢查 Git 狀態
git status

# 測試同步腳本的檢測功能
# 注意：這會實際提交，請謹慎使用
# npm run sync:harem-ai

# 恢復原文件
mv static/data/harem-ai-library.js.backup static/data/harem-ai-library.js
```

---

## 常見問題

### Q1: 導入模塊時出現語法錯誤
**問題**: `SyntaxError: Cannot use import statement outside a module`

**解決方案**:
1. 確保 `package.json` 中有 `"type": "module"`
2. 或者將測試文件改為 `.mjs` 擴展名
3. 或使用 CommonJS 語法: `const lib = require('./...')`

### Q2: 找不到角色數據
**問題**: `getCharacterById` 返回 `null`

**解決方案**:
1. 檢查角色ID是否正確（區分大小寫）
2. 確認文件路徑正確
3. 驗證文件已正確導入

### Q3: 同步腳本無法執行
**問題**: `Permission denied` 或 `command not found`

**解決方案**:
```bash
# 給予執行權限
chmod +x scripts/auto-sync-harem-ai.js

# 使用 node 執行
node scripts/auto-sync-harem-ai.js
```

### Q4: GitHub Actions 不觸發
**問題**: 推送後 Actions 沒有運行

**解決方案**:
1. 確認 `.github/workflows/auto-sync-harem-ai.yml` 文件存在
2. 檢查是否修改了正確的文件路徑
3. 確認 GitHub Actions 已啟用

### Q5: 親密度計算不正確
**問題**: `getAffectionStage` 返回錯誤的階段

**解決方案**:
1. 檢查親密度分數是否在正確範圍內 (0-200)
2. 確認階段定義的分數閾值正確
3. 使用調試輸出查看計算過程

---

## 調試技巧

### 1. 使用 Console 調試

```javascript
import HaremAILibrary from './static/data/harem-ai-library.js';

// 打印整個庫結構
console.log('HaremAILibrary:', HaremAILibrary);

// 打印特定角色
console.log('琉璃女王:', HaremAILibrary.lr_002);

// 打印情感階段
console.log('情感階段:', HaremAILibrary.lr_002.affectionStages);
```

### 2. 使用斷點調試

在 VS Code 中創建 `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "調試測試",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/test-harem-ai.js"
    }
  ]
}
```

### 3. 驗證數據結構

```javascript
// 使用 JSON.stringify 美化輸出
import { getCharacterById } from './static/data/harem-ai-library.js';

const char = getCharacterById('lr_002');
console.log(JSON.stringify(char, null, 2));
```

### 4. 性能測試

```javascript
import { getAllHaremCharacters, getRandomDialogue } from './static/data/harem-ai-library.js';

console.time('獲取所有角色');
const chars = getAllHaremCharacters();
console.timeEnd('獲取所有角色');

console.time('生成1000條對話');
for (let i = 0; i < 1000; i++) {
  getRandomDialogue('lr_002', Math.floor(Math.random() * 200));
}
console.timeEnd('生成1000條對話');
```

### 5. 錯誤處理測試

```javascript
import { getCharacterById, getAffectionStage } from './static/data/harem-ai-library.js';

// 測試不存在的角色
try {
  const char = getCharacterById('invalid_id');
  console.log('角色:', char); // 應該是 null
} catch (e) {
  console.error('錯誤:', e);
}

// 測試異常親密度值
try {
  const stage = getAffectionStage('lr_002', -10);
  console.log('階段:', stage);
} catch (e) {
  console.error('錯誤:', e);
}
```

---

## 持續整合測試

### 設置 GitHub Actions 測試流程

創建 `.github/workflows/test.yml`:

```yaml
name: Test Harem AI Library

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run sync:harem-ai:check
      - run: node test-data-integrity.js
      - run: node test-affection-system.js
```

---

## 測試清單

在發布前，確保完成以下測試：

- [ ] ✅ 語法驗證測試通過
- [ ] ✅ 數據完整性測試通過
- [ ] ✅ 所有11個角色數據完整
- [ ] ✅ 情感系統正常運作
- [ ] ✅ 事件系統能正確觸發
- [ ] ✅ 禮物系統反應正確
- [ ] ✅ 自動同步腳本可執行
- [ ] ✅ GitHub Actions 配置正確
- [ ] ✅ 文檔更新完整
- [ ] ✅ 沒有語法錯誤或警告

---

## 總結

本測試手冊涵蓋了：
1. ✅ 快速開始指南
2. ✅ 完整的測試套件
3. ✅ 常見問題解答
4. ✅ 調試技巧和工具
5. ✅ 持續整合設置

使用這些測試方法，您可以確保後宮AI角色庫的質量和穩定性。

---

**需要幫助？**
- 查看主文檔: `docs/HAREM_AI_LIBRARY.md`
- 提交 Issue: https://github.com/sm891068/genesis-home/issues
- 聯繫維護者: sm891068

---

**最後更新**: 2026-02-19  
**版本**: v1.0.0
