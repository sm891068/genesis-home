# Local Backup System

這是本機電腦端備份工具，和官方網站前端分開運作。它會依照設定檔把來源資料夾打包成 `.tar.gz`，同時建立 JSON 清單，方便後續列出、驗證與清理舊備份。

## 第一次設定

```bash
npm run backup:init
```

這會建立 `backup.config.json`。請打開後確認：

- `backupRoot`: 備份要放在哪裡，建議放到外接硬碟、另一顆磁碟或同步硬碟資料夾。
- `sources`: 要備份的資料夾或檔案。
- `exclude`: 不要備份的資料夾或檔案規則。
- `retention.keepLast`: 清理舊備份時保留最近幾份。

## 建立備份

```bash
npm run backup:run
```

備份完成後會產生：

- `backupRoot/archives/<backup-id>/...tar.gz`
- `backupRoot/manifests/<backup-id>.json`

## 查看備份紀錄

```bash
npm run backup:list
```

## 驗證最新備份

```bash
npm run backup:verify
```

也可以指定備份 ID：

```bash
node backup-system/backup.mjs verify 2026-06-17T10-30-00-000Z
```

## 清理舊備份

```bash
npm run backup:prune
```

`prune` 只會刪除 `backupRoot` 底下由本工具建立的舊 archives 和 manifests，不會刪除來源資料夾。
