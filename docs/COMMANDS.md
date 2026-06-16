# 常用指令

本文件整理 `黑道建築 Underworld Architect` 開發、測試、部署與 GitHub 上傳時會用到的指令。

## 環境需求

需要先安裝：

- Node.js
- npm
- Git
- GitHub CLI：`gh`

目前這台工作環境尚未找到 `git` 與 `gh` 指令，因此如果要從本機 clone、commit、push，需要先安裝或讓終端機能找到它們。

## 專案安裝

```bash
npm install
```

## 本機開發

```bash
npm run dev
```

啟動 Vite 開發伺服器。

## Cloudflare Pages 本機預覽

```bash
npm run build
npm run preview
```

或使用 sandbox 模式：

```bash
npm run dev:sandbox
```

## 建置

```bash
npm run build
```

輸出會產生在 `dist`。

## 基本測試

```bash
npm run test
```

目前 package script 會檢查：

```bash
curl http://localhost:3000
```

## 部署

```bash
npm run deploy
```

正式專案名稱部署：

```bash
npm run deploy:prod
```

## GitHub 初次設定

如果本機還沒有 clone repo：

```bash
git clone https://github.com/sm891068/genesis-home.git
cd genesis-home
```

如果目前資料夾已經是專案，但還沒有連到 GitHub：

```bash
git init
git remote add origin https://github.com/sm891068/genesis-home.git
git branch -M main
```

## GitHub 登入檢查

```bash
gh auth status
```

如果尚未登入：

```bash
gh auth login
```

## 提交變更

```bash
git status
git add .
git commit -m "docs: define v0.1 rebuild foundation"
```

## 推送到 GitHub

```bash
git push -u origin main
```

## 建立功能分支

```bash
git checkout -b feature/v0.1-rebuild-foundation
```

## 推送分支

```bash
git push -u origin feature/v0.1-rebuild-foundation
```

## 開 Pull Request

```bash
gh pr create --base main --head feature/v0.1-rebuild-foundation --title "feat: define v0.1 rebuild foundation" --body "Define the refreshed v0.1 foundation for the black society strategy game."
```

## 建議提交訊息

```bash
docs: define v0.1 rebuild foundation
feat: add day cycle resource state
feat: add base building system
feat: add daily event choices
feat: add local save system
fix: correct route selection state
```

## v0.1 開發順序指令備忘

實作時建議用這個節奏：

```bash
git checkout -b feature/v0.1-rebuild-foundation
npm install
npm run dev
```

完成一段可測試功能後：

```bash
npm run build
git status
git add .
git commit -m "feat: add day cycle resource state"
git push -u origin feature/v0.1-rebuild-foundation
```
