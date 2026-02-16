#!/bin/bash

# GitHub 快速上傳腳本
# 使用方法：./upload-to-github.sh <github-username> <repo-name>

set -e

# 顏色輸出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== 黑道建築 - GitHub 上傳工具 ===${NC}\n"

# 檢查參數
if [ $# -lt 2 ]; then
    echo -e "${RED}錯誤: 缺少參數${NC}"
    echo "使用方法: ./upload-to-github.sh <github-username> <repo-name>"
    echo "範例: ./upload-to-github.sh yourusername underworld-architect"
    exit 1
fi

GITHUB_USER=$1
REPO_NAME=$2
REMOTE_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo -e "${YELLOW}GitHub 用戶名:${NC} ${GITHUB_USER}"
echo -e "${YELLOW}倉庫名稱:${NC} ${REPO_NAME}"
echo -e "${YELLOW}遠程 URL:${NC} ${REMOTE_URL}\n"

# 確認是否在正確的目錄
if [ ! -d ".git" ]; then
    echo -e "${RED}錯誤: 當前目錄不是 Git 倉庫${NC}"
    exit 1
fi

# 檢查是否有未提交的更改
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}警告: 有未提交的更改${NC}"
    echo "是否要先提交？ (y/n)"
    read -r response
    if [ "$response" = "y" ]; then
        git add -A
        echo "請輸入提交訊息:"
        read -r commit_msg
        git commit -m "$commit_msg"
        echo -e "${GREEN}✓ 已提交更改${NC}\n"
    fi
fi

# 檢查遠程倉庫
if git remote | grep -q "^origin$"; then
    echo -e "${YELLOW}遠程倉庫 'origin' 已存在${NC}"
    CURRENT_URL=$(git remote get-url origin)
    echo -e "當前 URL: ${CURRENT_URL}"
    
    if [ "$CURRENT_URL" != "$REMOTE_URL" ]; then
        echo "是否要更新為新的 URL？ (y/n)"
        read -r response
        if [ "$response" = "y" ]; then
            git remote set-url origin "$REMOTE_URL"
            echo -e "${GREEN}✓ 已更新遠程 URL${NC}\n"
        fi
    fi
else
    echo -e "${YELLOW}添加遠程倉庫...${NC}"
    git remote add origin "$REMOTE_URL"
    echo -e "${GREEN}✓ 已添加遠程倉庫${NC}\n"
fi

# 推送代碼
echo -e "${YELLOW}準備推送代碼到 GitHub...${NC}"
echo "分支: main"
echo "是否要開始推送？ (y/n)"
read -r response

if [ "$response" = "y" ]; then
    echo -e "\n${YELLOW}推送中...${NC}"
    
    # 嘗試正常推送
    if git push -u origin main 2>/dev/null; then
        echo -e "${GREEN}✓ 推送成功！${NC}\n"
    else
        # 如果失敗，詢問是否強制推送
        echo -e "\n${YELLOW}正常推送失敗。這可能是因為遠程倉庫有不同的歷史。${NC}"
        echo "是否要強制推送？這會覆蓋遠程倉庫。 (y/n)"
        read -r force_response
        
        if [ "$force_response" = "y" ]; then
            git push -u origin main --force
            echo -e "${GREEN}✓ 強制推送成功！${NC}\n"
        else
            echo -e "${RED}✗ 推送已取消${NC}"
            exit 1
        fi
    fi
    
    # 顯示倉庫鏈接
    echo -e "${GREEN}=== 上傳完成！ ===${NC}\n"
    echo -e "查看你的倉庫："
    echo -e "${GREEN}https://github.com/${GITHUB_USER}/${REPO_NAME}${NC}\n"
    
    echo -e "下一步建議："
    echo "1. 設置 GitHub Pages (Settings → Pages)"
    echo "2. 添加 Topics (Settings → General → Topics)"
    echo "3. 連接 Cloudflare Pages"
    echo "4. 邀請協作者"
    
else
    echo -e "${YELLOW}推送已取消${NC}"
fi
