# 🚀 快速上傳到 GitHub

## 方法一：使用腳本（推薦）

```bash
cd /home/user/webapp
./upload-to-github.sh 你的GitHub用戶名 underworld-architect
```

範例：
```bash
./upload-to-github.sh johndoe underworld-architect
```

---

## 方法二：手動命令

### 步驟 1：配置 Git 用戶
```bash
cd /home/user/webapp
git config --global user.name "你的GitHub用戶名"
git config --global user.email "你的GitHub郵箱"
```

### 步驟 2：添加遠程倉庫
```bash
git remote add origin https://github.com/你的用戶名/underworld-architect.git
```

### 步驟 3：推送代碼
```bash
# 正常推送
git push -u origin main

# 如果失敗，強制推送（首次上傳）
git push -u origin main --force
```

---

## 方法三：使用 Personal Access Token

如果需要使用 Token 認證：

### 1. 創建 Token
訪問：https://github.com/settings/tokens
權限：`repo`, `workflow`, `write:packages`

### 2. 使用 Token 推送
```bash
cd /home/user/webapp
git remote set-url origin https://你的Token@github.com/你的用戶名/underworld-architect.git
git push -u origin main
```

---

## 驗證上傳

上傳成功後，訪問：
```
https://github.com/你的用戶名/underworld-architect
```

你應該能看到：
- ✅ README.md（項目說明）
- ✅ LICENSE（MIT授權）
- ✅ 所有源代碼文件
- ✅ 37個文件
- ✅ 12個提交

---

## 常見錯誤

### 錯誤 1：Permission denied
```bash
# 解決方案：使用 Token
git remote set-url origin https://你的Token@github.com/你的用戶名/underworld-architect.git
```

### 錯誤 2：Repository not found
```bash
# 解決方案：先在 GitHub 創建倉庫
# 訪問 https://github.com/new
```

### 錯誤 3：Failed to push
```bash
# 解決方案：強制推送
git push -u origin main --force
```

---

## 📞 需要幫助？

查看詳細指南：[GITHUB_UPLOAD.md](./GITHUB_UPLOAD.md)
