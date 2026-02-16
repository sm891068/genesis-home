# 黑道建築 Underworld Architect

<div align="center">

![Version](https://img.shields.io/badge/version-0.3.0%20Beta-gold)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Web-green)

一款融合黑道經營、角色收集、後宮養成的策略模擬遊戲

[English](#) | [繁體中文](#) | [简体中文](#)

[🎮 立即遊玩](https://3000-iz94nfxwjw8t53nd2v99t-dfc00ec5.sandbox.novita.ai) | [📖 文檔](./VERSION.md) | [👥 角色圖鑑](./CHARACTERS.md)

</div>

---

## 🌟 特色功能

### 🎯 核心系統
- **5條路線選擇** - 正道、資本、魅力、武力、智謀，每條路線獨特的遊戲體驗
- **26位角色** - 從N到LR，豐富的稀有度系統
- **AI性格系統** - 8種人格類型，每位角色都有獨特的AI行為邏輯
- **後宮養成** - 11級好感度系統，解鎖專屬劇情與獎勵
- **吃卡系統** - N/R卡可用於經驗強化（2%/4%加成）

### 🎨 UI/UX
- **響應式設計** - 完美適配手機、平板、電腦端
- **金色黑道風格** - 沉浸式視覺體驗
- **流暢動畫** - 下雨背景、懸停效果、過場動畫
- **整合式流程** - 路線選擇+命名一體化設計

### 📊 遊戲數據
- **稀有度**: LR, UR, SSR, SR, R, N
- **職業**: 戰士、保鏢、刺客、槍手、醫生、狙擊手、女王、秘書
- **技能**: 主動技能 + 被動技能
- **屬性**: STR, DEF, AGI, INT, WIS

---

## 🚀 快速開始

### 線上遊玩
```bash
# 直接訪問線上版本
https://3000-iz94nfxwjw8t53nd2v99t-dfc00ec5.sandbox.novita.ai
```

### 本地開發

#### 環境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

#### 安裝步驟
```bash
# 1. Clone 倉庫
git clone https://github.com/YOUR_USERNAME/underworld-architect.git
cd underworld-architect

# 2. 安裝依賴
npm install

# 3. 開發模式
npm run dev

# 4. 構建生產版本
npm run build

# 5. 預覽生產版本
npm run preview

# 6. 部署到 Cloudflare Pages
npm run deploy
```

### Docker 部署
```bash
# 構建鏡像
docker build -t underworld-architect .

# 運行容器
docker run -p 3000:3000 underworld-architect
```

---

## 📖 遊戲指南

### 🎮 遊戲流程
```
主選單 → 新的傳承 → 父親對話(14秒) → 路線選擇 → 命名 → 開始遊戲
```

### 🛣️ 五條路線

| 路線 | 圖標 | 特色 | 起始資金 | 聲望 | 人數 |
|------|------|------|----------|------|------|
| 正道 | ⚖️ | 道義與聲望 | 12,000 | 75 | 4 |
| 資本 | 💰 | 金錢至上 | 25,000 | 50 | 3 |
| 魅力 | 💋 | 後宮經營 | 15,000 | 60 | 3 |
| 武力 | ⚔️ | 拳頭硬道理 | 10,000 | 55 | 5 |
| 智謀 | 🧠 | 謀略為先 | 14,000 | 65 | 3 |

### 👥 角色系統

#### 稀有度分布
- **LR（傳說）**: 2位 - 龍霸天、琉璃女王
- **UR（究極）**: 3位 - 血刃、紅姐、冰心
- **SSR（特級）**: 6位 - 白琴、算盤林、拳王輝、雙槍李、妖姬、羅奈米
- **SR（稀有）**: 10位 - 包含新手引導者「阿福」
- **R（精良）**: 3位 - 小弟甲、小弟乙、小紅
- **N（普通）**: 2位 - 路人甲、路人乙

#### 後宮系統
- **11級好感度** - 從陌生冷漠到絕對統治
- **專屬劇情** - 每個好感等級解鎖獨特對話
- **角色互動** - 基於AI性格的動態對話
- **獎勵解鎖** - 屬性加成、技能解鎖、CG解鎖

詳細角色資訊請查看 [角色圖鑑](./CHARACTERS.md)

---

## 🛠️ 技術棧

### 前端
- **框架**: Vanilla JavaScript (ES6+)
- **UI**: HTML5 + CSS3
- **字體**: Noto Serif TC
- **圖標**: Emoji + FontAwesome
- **樣式**: CSS Variables + Flexbox + Grid

### 後端
- **框架**: Hono (Cloudflare Workers)
- **運行時**: Cloudflare Workers Runtime
- **構建工具**: Vite 6.4.1
- **部署**: Cloudflare Pages

### 數據
- **存儲**: LocalStorage (當前)
- **未來**: Cloudflare D1 / KV / R2

### 開發工具
- **版本控制**: Git
- **包管理**: npm
- **代碼規範**: ESLint
- **進程管理**: PM2 (開發環境)

---

## 📂 項目結構

```
webapp/
├── src/
│   └── index.tsx                 # Hono 應用入口
├── public/
│   ├── index.html                # 主選單頁面
│   ├── game-main.html            # 遊戲主畫面
│   └── static/
│       ├── core/
│       │   └── game-state.js     # 遊戲狀態管理
│       ├── ui/
│       │   └── shared-ui.js      # 共享UI組件
│       ├── data/
│       │   ├── ai-personality.js      # AI性格庫
│       │   └── ai-character-logic.js  # AI角色邏輯
│       ├── modules/
│       │   ├── base-system.js         # 基地系統
│       │   ├── harem-system.js        # 後宮系統
│       │   ├── partner-system.js      # 夥伴系統
│       │   ├── faction-ui.js          # 派系UI
│       │   ├── team-ui.js             # 隊伍UI
│       │   ├── save-ui.js             # 存檔UI
│       │   ├── settings-ui.js         # 設定UI
│       │   └── help-ui.js             # 幫助UI
│       ├── routes-data.js        # 路線數據
│       └── partner-data.js       # 角色數據
├── dist/                         # 構建輸出
├── .git/                         # Git倉庫
├── .gitignore                    # Git忽略配置
├── ecosystem.config.cjs          # PM2配置
├── wrangler.jsonc                # Cloudflare配置
├── vite.config.ts                # Vite配置
├── package.json                  # 依賴配置
├── tsconfig.json                 # TypeScript配置
├── README.md                     # 項目說明
├── VERSION.md                    # 版本資訊
├── CHARACTERS.md                 # 角色圖鑑
└── LICENSE                       # 授權文件
```

---

## 🎯 開發路線圖

### v0.3.0 Beta（當前版本）✅
- [x] 主選單系統（7個按鈕）
- [x] 父親對話系統（14秒）
- [x] 5條路線選擇
- [x] 整合式命名畫面
- [x] 26位角色系統
- [x] AI性格與行為系統
- [x] 響應式設計

### v0.4.0（計劃中）🚧
- [ ] 存檔系統（多槽位）
- [ ] 建設系統（建築升級）
- [ ] 時間系統（日期推進）
- [ ] 夥伴管理（強化、編組）
- [ ] 基礎戰鬥系統
- [ ] 後宮互動擴展

### v0.5.0（計劃中）📅
- [ ] 戰鬥系統完善
- [ ] 任務系統
- [ ] 商店系統
- [ ] 劇情推進

### v1.0.0（目標）🎉
- [ ] 完整遊戲循環
- [ ] 多平台部署
- [ ] 多語言支援
- [ ] 社交功能

詳細路線圖請查看 [版本資訊](./VERSION.md)

---

## 🤝 貢獻指南

我們歡迎任何形式的貢獻！

### 如何貢獻
1. Fork 本倉庫
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 代碼規範
- 使用 ESLint 檢查代碼
- 遵循 Airbnb JavaScript Style Guide
- 添加必要的註釋
- 保持函數簡潔（<50行）

### 提交訊息規範
```
feat: 新功能
fix: 修復Bug
docs: 文檔更新
style: 代碼格式調整
refactor: 代碼重構
test: 測試相關
chore: 構建/工具鏈更新
```

---

## 📜 授權

本項目採用 MIT 授權條款。詳見 [LICENSE](LICENSE) 文件。

```
MIT License

Copyright (c) 2026 Underworld Architect Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 📞 聯繫方式

- **項目倉庫**: [GitHub](https://github.com/YOUR_USERNAME/underworld-architect)
- **問題反饋**: [GitHub Issues](https://github.com/YOUR_USERNAME/underworld-architect/issues)
- **討論區**: [GitHub Discussions](https://github.com/YOUR_USERNAME/underworld-architect/discussions)
- **電子郵件**: dev@underworld-architect.com

---

## 🙏 致謝

感謝所有為本項目做出貢獻的開發者和玩家！

特別感謝：
- [Hono](https://hono.dev/) - 輕量級Web框架
- [Cloudflare](https://www.cloudflare.com/) - 邊緣運算平台
- [Vite](https://vitejs.dev/) - 快速構建工具
- [Noto Serif TC](https://fonts.google.com/noto/specimen/Noto+Serif+TC) - 優雅的中文字體

---

## 📊 項目狀態

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/underworld-architect?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/underworld-architect?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/YOUR_USERNAME/underworld-architect?style=social)

![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/underworld-architect)
![GitHub pull requests](https://img.shields.io/github/issues-pr/YOUR_USERNAME/underworld-architect)
![GitHub last commit](https://img.shields.io/github/last-commit/YOUR_USERNAME/underworld-architect)

---

## 🎮 遊戲截圖

### 主選單
![主選單](./screenshots/main-menu.png)

### 父親對話
![父親對話](./screenshots/father-dialogue.png)

### 路線選擇
![路線選擇](./screenshots/route-selection.png)

### 遊戲主畫面
![遊戲主畫面](./screenshots/game-main.png)

---

<div align="center">

**⭐ 如果你喜歡這個項目，請給我們一個 Star！⭐**

Made with ❤️ by Underworld Architect Team

[🔝 回到頂部](#黑道建築-underworld-architect)

</div>
