# 黑道建築 - Genesis Home

一款策略經營遊戲，包含完整的後宮系統和AI角色互動。

## 🎮 主要特性

### 後宮AI角色庫系統
- ✅ **10位可入後宮的女性角色**，包含 LR、UR、SSR、SR、R 各稀有度
- ✅ **6級情感階段系統**（0/40/80/120/160/200分），從陌生到誓言
- ✅ **豐富的對話系統**，每個角色每階段3-5條獨特對話
- ✅ **專屬互動事件**，每個角色4-5個特殊劇情
- ✅ **行為決策AI**，基於性格特質的動態反應
- ✅ **禮物偏好系統**，不同角色不同喜好
- ✅ **自動同步機制**，一鍵更新到 GitHub

### 角色系統
- 📊 **26位角色**，涵蓋戰士、秘書、女王、刺客、槍手、狙擊手等職業
- 🎯 **稀有度分級**: LR(2) / UR(3) / SSR(6) / SR(10) / R(3) / N(2)
- 💕 **11位後宮角色**，每位都有完整的AI個性與情感系統

## 📚 文檔

詳細文檔請查看 [`docs/`](./docs/) 目錄：

- 📘 [後宮AI角色庫開發文檔](./docs/HAREM_AI_LIBRARY.md)
- 📗 [開發測試手冊](./docs/TESTING_MANUAL.md)
- 📕 [自動同步系統使用說明](./docs/AUTO_SYNC_GUIDE.md)
- 📙 [後宮系統規格](./docs/HAREM_SYSTEM.md)
- 📖 [角色圖鑑](./CHARACTERS.md)

## 🚀 快速開始

### 安裝

```bash
# 克隆項目
git clone https://github.com/sm891068/genesis-home.git
cd genesis-home

# 安裝依賴
npm install
```

### 使用後宮AI系統

```javascript
import { 
  getCharacterById,
  getAffectionStage,
  getRandomDialogue
} from './static/data/harem-ai-library.js';

// 獲取角色
const queen = getCharacterById('lr_002');
console.log(queen.name); // '琉璃女王'

// 獲取當前情感階段
const stage = getAffectionStage('lr_002', 120);
console.log(stage.title); // '信任'

// 獲取對話
const dialogue = getRandomDialogue('lr_002', 120);
console.log(dialogue); // '能遇見你，是本宮的幸運。'
```

### 開發命令

```bash
# 開發模式
npm run dev

# 構建項目
npm run build

# 部署
npm run deploy

# 同步後宮AI庫到 GitHub
npm run sync:harem-ai

# 驗證語法
npm run sync:harem-ai:check
```

## 🎯 後宮角色一覽

| 稀有度 | 角色 | 性格類型 | 特點 |
|--------|------|----------|------|
| **LR** | 琉璃女王 | QUEEN | 高貴女王，智慧與美貌並存 |
| **UR** | 紅姐 | BIG_SISTER | 霸氣大姐頭，外剛內柔 |
| **UR** | 冰心 | COOL_BEAUTY | 冷酷狙擊手，渴望溫暖 |
| **SSR** | 白琴 | PERFECT_SECRETARY | 完美秘書，忠誠能幹 |
| **SSR** | 算盤林 | FINANCIAL_GENIUS | 財務天才，精明理性 |
| **SSR** | 妖姬 | FEMME_FATALE | 妖嬈殺手，致命誘惑 |
| **SSR** | 羅奈米 | TSUNDERE | 傲嬌小辣椒，口嫌體正直 |
| **SR** | 櫻花 | GENTLE_HEALER | 溫柔醫生，治癒天使 |
| **SR** | 黑寡婦 | MYSTERIOUS_SNIPER | 神秘狙擊手，孤獨求溫暖 |
| **R** | 小紅 | CUTE_JUNIOR | 可愛小秘書，努力上進 |

## 🛠️ 技術棧

- **前端框架**: Vite + Hono
- **部署平台**: Cloudflare Pages
- **自動化**: GitHub Actions
- **語言**: JavaScript (ESM)

## 📊 項目統計

- **角色數據大小**: ~54KB
- **總角色數**: 26位
- **可入後宮角色**: 10位
- **情感階段**: 6級系統
- **對話總數**: 200+ 條
- **專屬事件**: 40+ 個

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

查看 [貢獻指南](./docs/README.md#貢獻指南) 了解更多。

## 📝 開發路線圖

### ✅ 已完成
- [x] 後宮AI角色庫系統
- [x] 6級情感階段
- [x] 10位角色完整數據
- [x] 自動同步機制
- [x] 完整文檔

### 🚧 進行中
- [ ] UI/UX 優化
- [ ] 更多角色事件
- [ ] 多語言支持

### 📅 計劃中
- [ ] 遊戲主線劇情
- [ ] 角色語音系統
- [ ] 移動端適配

## 📄 授權

查看 [LICENSE](./LICENSE) 文件了解詳情。

## 🔗 相關鏈接

- **GitHub**: https://github.com/sm891068/genesis-home
- **Issues**: https://github.com/sm891068/genesis-home/issues
- **Actions**: https://github.com/sm891068/genesis-home/actions

## 📧 聯繫方式

- **專案維護者**: sm891068
- **GitHub**: [@sm891068](https://github.com/sm891068)

---

**最後更新**: 2026-02-19  
**版本**: v1.0.0