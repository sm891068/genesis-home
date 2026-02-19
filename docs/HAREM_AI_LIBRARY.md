# 後宮AI角色庫 - 開發文檔

## 📚 目錄
- [概述](#概述)
- [系統架構](#系統架構)
- [角色數據結構](#角色數據結構)
- [使用指南](#使用指南)
- [自動同步機制](#自動同步機制)
- [API 參考](#api-參考)
- [開發與測試](#開發與測試)

---

## 概述

### 簡介
後宮AI角色庫是一個完整的角色行為與情感系統，專為遊戲中的高稀有度女性角色（LR/UR/SSR/SR/R）設計。系統包含：
- 11位可進入後宮的女性角色完整AI數據
- 6級情感階段系統（0/40/80/120/160/200分）
- 豐富的對話、事件、行為決策邏輯
- 自動化的Git同步機制

### 包含角色
| 稀有度 | 數量 | 角色列表 |
|--------|------|----------|
| **LR (傳說)** | 1 | 琉璃女王 (lr_002) |
| **UR (究極)** | 2 | 紅姐 (ur_002)、冰心 (ur_003) |
| **SSR (特級)** | 4 | 白琴 (ssr_001)、算盤林 (ssr_002)、妖姬 (ssr_005)、羅奈米/小辣椒 (ssr_006) |
| **SR (稀有)** | 3 | 櫻花 (sr_008)、黑寡婦 (sr_009)、小紅 (r_003 重複) |
| **R (精良)** | 1 | 小紅 (r_003) |

### 文件位置
- **主資料檔**: `static/data/harem-ai-library.js`
- **自動同步腳本**: `scripts/auto-sync-harem-ai.js`
- **GitHub Actions**: `.github/workflows/auto-sync-harem-ai.yml`
- **文檔**: `docs/HAREM_AI_LIBRARY.md`

---

## 系統架構

### 資料結構層次
```
HaremAILibrary
├── [character_id]
│   ├── 基本資訊 (id, name, rarity, gender, occupation)
│   ├── 屬性 (stats)
│   ├── 性格特質 (personality)
│   ├── 情感階段系統 (affectionStages)
│   │   ├── stage0 (0分)
│   │   ├── stage1 (40分)
│   │   ├── stage2 (80分)
│   │   ├── stage3 (120分)
│   │   ├── stage4 (160分)
│   │   └── stage5 (200分)
│   ├── 行為決策系統 (behaviorSystem)
│   ├── 專屬互動事件 (specialEvents)
│   ├── 禮物偏好 (giftPreferences)
│   ├── 對話風格 (dialogueStyle)
│   └── 特殊觸發條件 (specialTriggers)
```

### 情感階段系統
每個角色都有6個情感階段，根據親密度分數解鎖：

| 階段 | 分數 | 等級 | 說明 |
|------|------|------|------|
| stage0 | 0 | 0 | 陌生人階段，初次見面 |
| stage1 | 40 | 1 | 初識階段，開始認識 |
| stage2 | 80 | 2 | 熟悉階段，建立好感 |
| stage3 | 120 | 3 | 信任階段，產生特殊情感 |
| stage4 | 160 | 4 | 熱戀階段，深度情感連結 |
| stage5 | 200 | 5 | 誓言階段，完全歸屬 |

---

## 角色數據結構

### 基本資訊
```javascript
{
  id: 'lr_002',              // 角色唯一ID
  name: '琉璃女王',          // 角色名稱
  rarity: 'LR',              // 稀有度: LR/UR/SSR/SR/R
  gender: '女',              // 性別
  occupation: '女王',        // 職業
  canHarem: true            // 是否可進入後宮
}
```

### 屬性系統
```javascript
stats: {
  STR: 85,  // 力量
  DEF: 85,  // 防禦
  AGI: 85,  // 敏捷
  INT: 85,  // 智力
  WIS: 85   // 智慧
}
```

### 性格特質
```javascript
personality: {
  traits: ['高貴', '智慧', '神秘', '強勢', '溫柔（特定情況）'],
  archetype: 'QUEEN',       // 角色原型
  dominance: 95,            // 支配力 0-100
  openness: 40,             // 開放度 0-100
  loyalty: 100,             // 忠誠度 0-100
  description: '統御一方的神秘女王，美貌與智慧並存'
}
```

### 情感階段詳細結構
```javascript
affectionStages: {
  stage0: {
    points: 0,              // 達成所需分數
    level: 0,               // 階段等級
    title: '陌生人',        // 階段標題
    description: '...',     // 階段描述
    attitude: 'COLD',       // 態度類型
    dialogues: [],          // 對話列表
    interactions: [],       // 可用互動
    restrictions: []        // 限制事項
  }
  // ... stage1 到 stage5
}
```

### 行為決策系統
```javascript
behaviorSystem: {
  decisionWeights: {
    logic: 85,              // 邏輯決策權重
    emotion: 70,            // 情感決策權重
    ambition: 90,           // 野心/目標導向
    loyalty: 95             // 忠誠度
  },
  dailyRoutines: {
    morning: '處理政務，審閱文件',
    afternoon: '接見重要人物，戰略會議',
    evening: '休閒時光',
    night: '獨自沉思'
  },
  preferredActivities: []   // 偏好活動列表
}
```

### 專屬互動事件
```javascript
specialEvents: {
  firstMeeting: {
    id: 'lr_002_event_001',
    title: '女王的審視',
    description: '第一次見到琉璃女王...',
    trigger: 'affection === 0 && firstEncounter === true',
    dialogue: [],
    choices: [
      { 
        text: '恭敬行禮', 
        effect: '+5 affection', 
        result: '得到基本認可' 
      }
    ]
  }
  // ... 更多事件
}
```

### 禮物偏好
```javascript
giftPreferences: {
  loved: [],    // 最愛：+20 affection
  liked: [],    // 喜歡：+10 affection
  neutral: [],  // 中立：+5 affection
  disliked: [], // 不喜歡：-5 affection
  hated: []     // 討厭：-15 affection
}
```

### 特殊觸發條件
```javascript
specialTriggers: {
  jealousy: {
    condition: 'player_talks_to_other_females && affection >= 120',
    reaction: '本宮不喜歡你與其他女人過於親近。',
    effect: '-10 affection per occurrence'
  }
  // ... 更多觸發器
}
```

---

## 使用指南

### 1. 導入庫
```javascript
import HaremAILibrary, { 
  getCharacterById, 
  getAllHaremCharacters,
  getCharactersByRarity,
  getAffectionStage,
  getRandomDialogue,
  triggerSpecialEvent,
  getGiftReaction
} from './static/data/harem-ai-library.js';
```

### 2. 獲取角色數據
```javascript
// 根據ID獲取角色
const queen = getCharacterById('lr_002');
console.log(queen.name); // '琉璃女王'

// 獲取所有後宮角色
const allCharacters = getAllHaremCharacters();
console.log(allCharacters.length); // 11

// 根據稀有度獲取
const lrCharacters = getCharactersByRarity('LR');
const ssrCharacters = getCharactersByRarity('SSR');
```

### 3. 處理情感階段
```javascript
// 獲取當前情感階段
const affectionPoints = 120; // 玩家當前親密度
const currentStage = getAffectionStage('lr_002', affectionPoints);

console.log(currentStage.title);       // '信任'
console.log(currentStage.attitude);    // 'TRUSTING'
console.log(currentStage.dialogues);   // 對話列表
```

### 4. 獲取對話
```javascript
// 根據親密度獲取隨機對話
const dialogue = getRandomDialogue('lr_002', 120);
console.log(dialogue); // '能遇見你，是本宮的幸運。'
```

### 5. 觸發事件
```javascript
// 觸發特定事件
const event = triggerSpecialEvent('lr_002', 'lr_002_event_002');
console.log(event.title);      // '月下密會'
console.log(event.dialogue);   // 事件對話
console.log(event.choices);    // 玩家選項
```

### 6. 處理禮物
```javascript
// 檢查禮物反應
const reaction = getGiftReaction('lr_002', '稀世珍寶');
console.log(reaction); // 'loved'

// 根據反應調整親密度
const affectionChange = {
  'loved': +20,
  'liked': +10,
  'neutral': +5,
  'disliked': -5,
  'hated': -15
};
```

### 7. 完整使用示例
```javascript
// 遊戲中的角色互動系統
class CharacterInteraction {
  constructor(characterId) {
    this.character = getCharacterById(characterId);
    this.affection = 0;
  }
  
  // 獲取當前對話
  getDialogue() {
    return getRandomDialogue(this.character.id, this.affection);
  }
  
  // 增加親密度
  increaseAffection(points) {
    this.affection += points;
    const newStage = getAffectionStage(this.character.id, this.affection);
    console.log(`進入新階段: ${newStage.title}`);
  }
  
  // 贈送禮物
  giveGift(giftType) {
    const reaction = getGiftReaction(this.character.id, giftType);
    const affectionChange = {
      'loved': 20,
      'liked': 10,
      'neutral': 5,
      'disliked': -5,
      'hated': -15
    }[reaction];
    
    this.increaseAffection(affectionChange);
    return reaction;
  }
  
  // 觸發事件
  triggerEvent(eventId) {
    return triggerSpecialEvent(this.character.id, eventId);
  }
}

// 使用示例
const queenInteraction = new CharacterInteraction('lr_002');
console.log(queenInteraction.getDialogue());
queenInteraction.giveGift('稀世珍寶'); // 親密度 +20
```

---

## 自動同步機制

### 1. 手動同步
```bash
# 方法1: 使用 npm script
npm run sync:harem-ai

# 方法2: 直接執行腳本
node scripts/auto-sync-harem-ai.js

# 方法3: 使用傳統 shell 腳本
./upload-to-github.sh sm891068 genesis-home
```

### 2. 自動同步（GitHub Actions）
當 `static/data/harem-ai-library.js` 文件被推送到 GitHub 時，會自動觸發同步流程：

1. **檢測文件變更**
2. **驗證 JavaScript 語法**
3. **統計角色數量**
4. **生成同步報告**
5. **更新 GitHub 記錄**

### 3. 同步腳本功能
`scripts/auto-sync-harem-ai.js` 提供：
- ✅ 自動檢測文件變更
- ✅ 生成詳細提交訊息
- ✅ 統計角色數量和文件大小
- ✅ 自動提交並推送到 GitHub
- ✅ 彩色終端輸出
- ✅ 完整的錯誤處理

### 4. GitHub Actions 功能
`.github/workflows/auto-sync-harem-ai.yml` 提供：
- ✅ 自動觸發（當文件更新時）
- ✅ JavaScript 語法驗證
- ✅ 生成詳細的同步摘要
- ✅ 支持手動觸發
- ✅ 完整的工作流程報告

---

## API 參考

### getCharacterById(characterId)
獲取指定ID的角色數據。

**參數:**
- `characterId` (string): 角色ID (如 'lr_002', 'ur_002')

**返回:**
- (Object|null): 角色對象，如果不存在則返回 null

**示例:**
```javascript
const character = getCharacterById('lr_002');
console.log(character.name); // '琉璃女王'
```

### getAllHaremCharacters()
獲取所有後宮角色。

**返回:**
- (Array): 所有角色對象的數組

**示例:**
```javascript
const allChars = getAllHaremCharacters();
console.log(allChars.length); // 11
```

### getCharactersByRarity(rarity)
根據稀有度獲取角色列表。

**參數:**
- `rarity` (string): 稀有度 ('LR', 'UR', 'SSR', 'SR', 'R')

**返回:**
- (Array): 符合條件的角色數組

**示例:**
```javascript
const lrChars = getCharactersByRarity('LR');
const ssrChars = getCharactersByRarity('SSR');
```

### getAffectionStage(characterId, affectionPoints)
根據親密度獲取當前情感階段。

**參數:**
- `characterId` (string): 角色ID
- `affectionPoints` (number): 當前親密度分數

**返回:**
- (Object|null): 當前階段對象

**示例:**
```javascript
const stage = getAffectionStage('lr_002', 120);
console.log(stage.title); // '信任'
```

### getRandomDialogue(characterId, affectionPoints)
根據親密度獲取隨機對話。

**參數:**
- `characterId` (string): 角色ID
- `affectionPoints` (number): 當前親密度分數

**返回:**
- (string): 隨機對話文本

**示例:**
```javascript
const dialogue = getRandomDialogue('lr_002', 80);
```

### triggerSpecialEvent(characterId, eventId)
觸發角色的特殊事件。

**參數:**
- `characterId` (string): 角色ID
- `eventId` (string): 事件ID

**返回:**
- (Object|null): 事件對象

**示例:**
```javascript
const event = triggerSpecialEvent('lr_002', 'lr_002_event_001');
```

### getGiftReaction(characterId, giftType)
檢查角色對禮物的反應。

**參數:**
- `characterId` (string): 角色ID
- `giftType` (string): 禮物類型

**返回:**
- (string): 反應類型 ('loved', 'liked', 'neutral', 'disliked', 'hated')

**示例:**
```javascript
const reaction = getGiftReaction('lr_002', '稀世珍寶');
```

---

## 開發與測試

### 驗證語法
```bash
# 使用 npm script
npm run sync:harem-ai:check

# 或手動執行
node -c static/data/harem-ai-library.js
```

### 測試腳本
```bash
# 測試自動同步腳本（不實際推送）
# 修改腳本中的 pushToGitHub 函數，添加 dry-run 模式
node scripts/auto-sync-harem-ai.js --dry-run
```

### 本地開發
1. 克隆倉庫
```bash
git clone https://github.com/sm891068/genesis-home.git
cd genesis-home
```

2. 安裝依賴
```bash
npm install
```

3. 編輯角色數據
```bash
# 使用你喜歡的編輯器
code static/data/harem-ai-library.js
```

4. 驗證語法
```bash
npm run sync:harem-ai:check
```

5. 同步到 GitHub
```bash
npm run sync:harem-ai
```

### 添加新角色
1. 在 `HaremAILibrary` 對象中添加新角色
2. 遵循現有的數據結構
3. 確保所有必需字段都已填寫
4. 驗證語法無誤
5. 運行同步腳本

### 最佳實踐
- ✅ 每個角色至少包含 3-5 條不同的對話
- ✅ 每個情感階段都有明確的解鎖條件
- ✅ 特殊事件應該與角色性格相符
- ✅ 禮物偏好應該反映角色個性
- ✅ 保持數據結構的一致性
- ✅ 添加詳細的中文註釋

---

## 附錄

### 角色原型類型 (Archetype)
- `QUEEN`: 女王型（高貴、強勢）
- `BIG_SISTER`: 大姐頭型（霸氣、照顧）
- `COOL_BEAUTY`: 冷酷美人型（冷靜、內斂）
- `PERFECT_SECRETARY`: 完美秘書型（專業、忠誠）
- `FINANCIAL_GENIUS`: 財務天才型（精明、理性）
- `FEMME_FATALE`: 妖姬型（誘惑、危險）
- `TSUNDERE`: 傲嬌型（口嫌體正直）
- `GENTLE_HEALER`: 溫柔治癒型（溫暖、關懷）
- `MYSTERIOUS_SNIPER`: 神秘狙擊型（冷酷、孤獨）
- `CUTE_JUNIOR`: 可愛後輩型（活潑、努力）

### 態度類型 (Attitude)
- `COLD`: 冷淡
- `NEUTRAL`: 中立
- `FRIENDLY`: 友好
- `TRUSTING`: 信任
- `AFFECTIONATE`: 親愛
- `DEVOTED`: 奉獻
- `CAUTIOUS`: 謹慎
- `APPROVING`: 認可
- `ATTRACTED`: 吸引
- `PASSIONATE`: 熱情
- `PROFESSIONAL`: 專業
- `CARING`: 關心
- `ADORING`: 愛慕
- `CONFESSING`: 告白中
- `IN_LOVE`: 戀愛中

### 版本歷史
- **v1.0.0** (2026-02-19): 初始版本
  - 包含11位後宮角色完整AI數據
  - 實現6級情感階段系統
  - 添加自動同步機制
  - 完整的文檔和API

---

## 聯繫方式
- **專案維護者**: sm891068
- **GitHub**: https://github.com/sm891068/genesis-home
- **問題反饋**: 請在 GitHub Issues 中提交

---

**最後更新**: 2026-02-19  
**版本**: v1.0.0
