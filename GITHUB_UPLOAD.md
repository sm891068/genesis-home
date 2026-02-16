# GitHub 上傳指南

## 📋 準備工作

### 已完成 ✅
- [x] Git 倉庫已初始化
- [x] 所有代碼已提交（10個提交）
- [x] README.md 已創建
- [x] LICENSE 已創建
- [x] VERSION.md 已創建
- [x] CHARACTERS.md 已創建
- [x] .gitignore 已配置

### 待完成 ⏳
- [ ] GitHub 授權
- [ ] 創建 GitHub 倉庫
- [ ] 推送代碼

---

## 🔐 步驟 1：GitHub 授權

### 方法 A：使用 Genspark AI 界面（推薦）
1. 前往 **#github** 標籤頁
2. 點擊「授權 GitHub」按鈕
3. 登入你的 GitHub 帳號
4. 授權 Genspark AI 訪問你的倉庫
5. 完成後返回此對話

### 方法 B：使用 GitHub Personal Access Token
如果方法 A 不可用，可以手動配置：

1. **創建 Token**:
   - 訪問 https://github.com/settings/tokens
   - 點擊「Generate new token (classic)」
   - 勾選權限：`repo`, `workflow`, `write:packages`
   - 生成並複製 Token

2. **配置 Git**:
```bash
cd /home/user/webapp
git config --global user.name "你的GitHub用戶名"
git config --global user.email "你的GitHub郵箱"
```

---

## 📦 步驟 2：創建 GitHub 倉庫

### 選項 A：在 GitHub 網頁創建
1. 訪問 https://github.com/new
2. 倉庫名稱：`underworld-architect`
3. 描述：`黑道建築 - 融合經營、收集、養成的策略模擬遊戲`
4. 選擇「Public」（公開）或「Private」（私有）
5. **不要**勾選「Initialize with README」（我們已有 README）
6. 點擊「Create repository」

### 選項 B：使用 gh CLI（需要授權後）
```bash
cd /home/user/webapp
gh repo create underworld-architect --public --source=. --remote=origin
```

---

## 🚀 步驟 3：推送代碼

### 3.1 添加遠程倉庫
```bash
cd /home/user/webapp
git remote add origin https://github.com/你的用戶名/underworld-architect.git
```

### 3.2 推送到 GitHub
```bash
# 推送主分支
git push -u origin main

# 如果遇到錯誤，強制推送（首次上傳）
git push -u origin main --force
```

### 3.3 驗證上傳
訪問 `https://github.com/你的用戶名/underworld-architect` 查看代碼

---

## 📝 上傳內容清單

### 核心文件
- [x] `README.md` - 項目說明
- [x] `LICENSE` - MIT 授權
- [x] `VERSION.md` - 版本資訊
- [x] `CHARACTERS.md` - 角色圖鑑
- [x] `.gitignore` - Git 忽略配置
- [x] `package.json` - 依賴配置
- [x] `wrangler.jsonc` - Cloudflare 配置
- [x] `vite.config.ts` - Vite 配置
- [x] `tsconfig.json` - TypeScript 配置
- [x] `ecosystem.config.cjs` - PM2 配置

### 源代碼
- [x] `src/index.tsx` - Hono 應用入口
- [x] `public/index.html` - 主選單
- [x] `public/game-main.html` - 遊戲主畫面
- [x] `public/static/` - 所有靜態資源
  - [x] `core/game-state.js`
  - [x] `ui/shared-ui.js`
  - [x] `data/ai-personality.js`
  - [x] `data/ai-character-logic.js`
  - [x] `modules/*.js` (8個模組)
  - [x] `routes-data.js`
  - [x] `partner-data.js`

### 構建產物（自動生成，已在 .gitignore）
- [ ] `dist/` - 不會上傳
- [ ] `node_modules/` - 不會上傳
- [ ] `.wrangler/` - 不會上傳
- [ ] `.pm2/` - 不會上傳

---

## 🔍 Git 提交歷史

當前有 **10 個提交**：

```
0125f22 - docs: 新增完整項目文檔
c19772e - feat: 新增文檔與優化
4ea6941 - feat: 精簡至5條路線 + 整合路線選擇與命名畫面
a005a1b - fix: 修復顯示問題 - 確保初始只顯示主選單
8b4c59f - fix: 修復預覽網址問題 - 使用 Hono 直接返回 HTML 內容
a118482 - feat: 全面更新 - 主選單擴充、父親對話14秒、新手引導者、吃卡系統
5352999 - fix: 更新game-main.html腳本載入，移除舊文件依賴
b584750 - feat: 完整的新遊戲流程 - 父親對話12秒 + 六路線選擇 + 幫派命名
b4c64a4 - 修復 vite 配置
2b35423 - 完全重寫game-main.html
```

---

## ⚠️ 注意事項

### 推送前檢查
```bash
# 查看當前狀態
git status

# 查看未跟蹤的大文件
du -sh * | sort -h

# 確認 .gitignore 生效
git ls-files -i --exclude-standard
```

### 常見問題

#### Q1: 推送失敗 - 權限被拒絕
**解決方案**:
```bash
# 使用 Personal Access Token
git remote set-url origin https://你的Token@github.com/你的用戶名/underworld-architect.git
git push -u origin main
```

#### Q2: 推送失敗 - 倉庫已存在
**解決方案**:
```bash
# 強制推送（覆蓋遠程）
git push -u origin main --force
```

#### Q3: 文件太大無法推送
**解決方案**:
```bash
# 檢查大文件
find . -type f -size +10M

# 添加到 .gitignore
echo "大文件路徑" >> .gitignore
git rm --cached 大文件路徑
git commit -m "chore: 移除大文件"
```

---

## 📊 倉庫統計

- **總文件數**: ~50 個
- **代碼行數**: ~10,000 行
- **Bundle 大小**: 79.75 KB
- **提交次數**: 10 次
- **分支**: main

---

## 🎯 下一步

上傳成功後，建議完成：

1. **啟用 GitHub Pages**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / docs

2. **添加 Topics**
   - Settings → General
   - Topics: `game`, `javascript`, `hono`, `cloudflare`, `strategy`, `simulation`

3. **設置 Cloudflare Pages**
   - 連接 GitHub 倉庫
   - 設置構建命令：`npm run build`
   - 設置輸出目錄：`dist`

4. **添加 Badge**
   - 在 README.md 中更新 Badge 鏈接

5. **邀請協作者**
   - Settings → Collaborators
   - 添加團隊成員

---

## 📞 需要幫助？

如果遇到問題，請：
1. 檢查 GitHub 授權是否完成
2. 確認 Token 權限是否正確
3. 查看 Git 錯誤訊息
4. 聯繫 Genspark AI 支援

---

**準備好了嗎？完成 GitHub 授權後告訴我，我會立即執行推送！** 🚀
