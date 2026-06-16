# 黑道建築 Underworld Architect

`黑道建築 Underworld Architect` 是一款黑道題材的策略經營遊戲。玩家繼承父親留下的勢力，在城市暗流中經營據點、招募角色、處理幫派衝突，並逐步揭開父親當年建立組織的真相。

重新開發版的核心方向是：

- 重構主選單，先確立 8 個主要功能入口。
- 開放聯機戰鬥，支援 PVP 與攻擊其他玩家幫派。
- 追加大量父親故事內容，作為初始主線大綱。
- 以 GitHub repository 作為主要開發與版本管理中心。

## 重新開發版本

目前目標版本：`v0.4.0 Redevelopment`

這個版本不急著擴大量角色或複雜抽卡，而是先把遊戲骨架重新立穩：

1. 主選單清楚、可擴充、功能入口固定。
2. 玩家能從父親遺言進入第一章主線。
3. 玩家能看見幫派狀態與基本資源。
4. 聯機戰鬥先做規格與資料結構，再逐步實作。
5. PVP 以抽象策略戰鬥呈現，不描寫現實犯罪教學。

## 初步主選單 8 功能

1. 新的傳承：開始新遊戲。
2. 繼續遊戲：讀取最近存檔。
3. 父親主線：查看父親故事章節與主線進度。
4. 幫派基地：進入建設、資源與據點管理。
5. 聯機戰鬥：PVP、攻擊其他玩家幫派、戰報。
6. 夥伴圖鑑：角色、隊伍、信任度與能力。
7. 榮耀殿堂：成就、排名、戰績與里程碑。
8. 設定：音效、畫面、存檔、帳號與資料管理。

詳細設計見：

- `docs/REDEVELOPMENT_V0.4.md`
- `docs/MAIN_MENU_8_FEATURES.md`
- `docs/ONLINE_PVP_DESIGN.md`
- `docs/FATHER_MAINLINE_OUTLINE.md`

## 技術

- Vite
- Hono
- Cloudflare Pages / Workers
- TypeScript
- Git / GitHub / GitHub CLI

## 本機開發

```bash
npm install
npm run dev
```

常用 GitHub 與部署指令見：`docs/COMMANDS.md`
