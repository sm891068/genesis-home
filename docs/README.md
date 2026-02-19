# 📚 文檔索引

本目錄包含後宮AI角色庫系統的完整文檔。

## 📖 文檔列表

### 1. 後宮AI角色庫開發文檔
**文件**: [`HAREM_AI_LIBRARY.md`](./HAREM_AI_LIBRARY.md)

**內容概要**:
- 系統概述與架構
- 完整的數據結構說明
- API 參考文檔
- 使用指南與代碼示例
- 角色原型與態度類型說明

**適用對象**: 開發者、系統設計師

### 2. 開發測試手冊
**文件**: [`TESTING_MANUAL.md`](./TESTING_MANUAL.md)

**內容概要**:
- 快速開始指南
- 完整的測試套件
- 常見問題解答
- 調試技巧與工具
- 持續整合設置

**適用對象**: 開發者、QA 測試人員

### 3. 自動同步系統使用說明
**文件**: [`AUTO_SYNC_GUIDE.md`](./AUTO_SYNC_GUIDE.md)

**內容概要**:
- 三種同步方式詳解
- 配置選項說明
- 故障排除指南
- 最佳實踐建議
- 進階使用技巧

**適用對象**: 開發者、DevOps 工程師

### 4. 後宮系統規格文檔
**文件**: [`HAREM_SYSTEM.md`](./HAREM_SYSTEM.md)

**內容概要**:
- SSR+ 角色要求
- 11級親密度系統
- 故事解鎖機制
- 稀有度專屬獎勵
- UI 設計規格

**適用對象**: 遊戲設計師、產品經理

---

## 🚀 快速導航

### 我想要...

#### 開始開發
→ 閱讀 [`TESTING_MANUAL.md`](./TESTING_MANUAL.md) 的「快速開始」部分

#### 了解系統架構
→ 閱讀 [`HAREM_AI_LIBRARY.md`](./HAREM_AI_LIBRARY.md) 的「系統架構」部分

#### 使用 API
→ 閱讀 [`HAREM_AI_LIBRARY.md`](./HAREM_AI_LIBRARY.md) 的「API 參考」部分

#### 設置自動同步
→ 閱讀 [`AUTO_SYNC_GUIDE.md`](./AUTO_SYNC_GUIDE.md)

#### 運行測試
→ 閱讀 [`TESTING_MANUAL.md`](./TESTING_MANUAL.md) 的「測試指南」部分

#### 解決問題
→ 閱讀各文檔的「常見問題」或「故障排除」部分

---

## 📊 系統概覽

### 後宮AI角色庫統計

| 項目 | 數量/規格 |
|------|-----------|
| **總角色數** | 10 位 |
| **LR 級** | 1 位（琉璃女王） |
| **UR 級** | 2 位（紅姐、冰心） |
| **SSR 級** | 4 位（白琴、算盤林、妖姬、羅奈米） |
| **SR 級** | 2 位（櫻花、黑寡婦） |
| **R 級** | 1 位（小紅） |
| **情感階段** | 6 級 (0/40/80/120/160/200分) |
| **角色原型** | 10 種不同類型 |
| **專屬事件** | 每角色 4-5 個 |
| **對話數量** | 每階段 3-5 條 |

### 核心文件

```
genesis-home/
├── static/data/
│   └── harem-ai-library.js       # 主數據文件 (~54KB)
├── scripts/
│   └── auto-sync-harem-ai.js     # 自動同步腳本
├── .github/workflows/
│   └── auto-sync-harem-ai.yml    # GitHub Actions 配置
├── docs/
│   ├── HAREM_AI_LIBRARY.md       # 開發文檔
│   ├── TESTING_MANUAL.md         # 測試手冊
│   ├── AUTO_SYNC_GUIDE.md        # 同步指南
│   ├── HAREM_SYSTEM.md           # 系統規格
│   └── README.md                 # 本文件
└── test-harem-ai.js              # 測試腳本
```

---

## 🎯 功能特性

### 情感系統
- ✅ 6 級親密度階段
- ✅ 動態對話生成
- ✅ 階段性解鎖內容
- ✅ 態度轉變系統

### 角色個性
- ✅ 10 種角色原型
- ✅ 多維度性格特質
- ✅ 個性化對話風格
- ✅ 獨特行為決策

### 互動系統
- ✅ 專屬事件劇情
- ✅ 禮物偏好系統
- ✅ 特殊觸發機制
- ✅ 選擇分支系統

### 自動化
- ✅ 一鍵同步到 GitHub
- ✅ 語法自動驗證
- ✅ CI/CD 集成
- ✅ 詳細執行報告

---

## 🛠️ 開發工具

### 命令速查

```bash
# 驗證語法
npm run sync:harem-ai:check

# 同步到 GitHub
npm run sync:harem-ai

# 運行測試
node test-harem-ai.js

# 構建項目
npm run build

# 本地開發
npm run dev
```

### 輔助函數

```javascript
// 導入庫
import { 
  getCharacterById,
  getAllHaremCharacters,
  getCharactersByRarity,
  getAffectionStage,
  getRandomDialogue,
  triggerSpecialEvent,
  getGiftReaction
} from './static/data/harem-ai-library.js';
```

---

## 📝 貢獻指南

### 添加新角色

1. 在 `harem-ai-library.js` 中添加角色對象
2. 遵循現有數據結構
3. 確保所有必需字段完整
4. 運行語法驗證: `npm run sync:harem-ai:check`
5. 運行測試: `node test-harem-ai.js`
6. 提交並同步: `npm run sync:harem-ai`

### 修改現有角色

1. 定位到目標角色對象
2. 修改所需字段
3. 保持數據結構一致性
4. 驗證語法無誤
5. 運行測試確認功能正常
6. 提交更改

### 代碼風格

- ✅ 使用一致的縮進（2空格）
- ✅ 添加清晰的中文註釋
- ✅ 遵循現有命名規範
- ✅ 保持數據結構的統一性
- ✅ 對話文本要符合角色性格

---

## 🔗 相關鏈接

- **GitHub 倉庫**: https://github.com/sm891068/genesis-home
- **Issues**: https://github.com/sm891068/genesis-home/issues
- **Actions**: https://github.com/sm891068/genesis-home/actions

---

## 📧 聯繫方式

- **專案維護者**: sm891068
- **GitHub**: [@sm891068](https://github.com/sm891068)

---

## 📅 版本歷史

### v1.0.0 (2026-02-19)
- ✅ 初始發布
- ✅ 10位後宮角色完整AI數據
- ✅ 6級情感階段系統
- ✅ 自動同步機制
- ✅ 完整文檔

---

## ⭐ 致謝

感謝所有為本項目做出貢獻的開發者和測試人員。

---

**最後更新**: 2026-02-19  
**文檔版本**: v1.0.0  
**維護者**: sm891068
