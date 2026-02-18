# 🏰 Genesis Home - UI Component Library

一套專為「黑道帝國建設遊戲」設計的完整、可重用的 React/TypeScript UI 組件庫。

## ✨ 特性

- 🎨 **統一設計系統** - 基於遊戲主題的金色/深藍配色方案
- 📦 **9 個核心組件** - Button, Card, Toast, Modal, Panel, Badge, ResourceDisplay, Input, Grid
- 🔧 **完整 TypeScript 支持** - 所有組件都有詳細的類型定義
- 📱 **響應式設計** - 適配桌面和移動設備
- 🎭 **Storybook 文檔** - 交互式組件展示和測試
- ⚡ **高性能** - 使用 React 和 Vite 構建
- 🌐 **可定制** - 支持自定義樣式和主題

## 📦 組件列表

### Button (按鈕)
- 6 種變體: primary, secondary, danger, success, ghost, outline
- 3 種尺寸: sm, md, lg
- 支持圖標、加載狀態、全寬等

### Card (卡片)
- 支持標題、副標題、底部區域
- 可懸停、可點擊、可選中狀態
- 適合展示建築、角色等遊戲內容

### Toast (提示)
- 4 種類型: success, error, warning, info
- 自動消失或手動關閉
- 支持多個提示同時顯示

### Modal (對話框)
- 模態對話框
- 可自定義寬度和內容
- 支持 ESC 鍵關閉

### Panel (抽屜面板)
- 4 個方向: left, right, top, bottom
- 從屏幕邊緣滑入
- 適合顯示詳細資訊

### Badge (徽章)
- 6 種變體配色
- 支持數字計數和小紅點
- 適合通知和狀態標籤

### ResourceDisplay (資源顯示)
- 水平或垂直排列
- 支持圖標和自定義顏色
- 專為遊戲資源顯示設計

### Input (輸入框)
- 支持標籤、錯誤訊息、提示文字
- 左右側圖標
- 全寬和禁用狀態

### Grid (網格佈局)
- 響應式網格系統
- 可配置列數和間距
- 自動適配不同屏幕尺寸

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 使用組件

```tsx
import { Button, Card, Modal } from './src/components';

function App() {
  return (
    <div>
      <Button variant="primary">開始遊戲</Button>
      
      <Card title="總部大樓" hoverable>
        <p>提升幫派整體實力</p>
      </Card>
    </div>
  );
}
```

### 啟動 Storybook

查看所有組件的交互式文檔：

```bash
npm run storybook
```

## 📖 文檔

詳細的使用指南和示例請查看 [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md)

## 🎨 設計系統

### 顏色

```css
--color-gold: #d4af37;          /* 主色調 - 金色 */
--color-bg: #0a0e27;            /* 背景色 - 深藍 */
--color-text: #e8e8e8;          /* 文字色 - 淺灰 */
--color-success: #27ae60;       /* 成功 - 綠色 */
--color-danger: #e74c3c;        /* 危險 - 紅色 */
--color-warning: #f39c12;       /* 警告 - 橙色 */
--color-info: #3498db;          /* 資訊 - 藍色 */
```

### 字體

- 主要字體: 'Noto Serif TC', serif
- 次要字體: -apple-system, 'Noto Sans TC', sans-serif

### 間距

- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px
- 3xl: 32px

## 📁 項目結構

```
src/
├── components/          # 所有 UI 組件
│   ├── Button.tsx
│   ├── Button.css
│   ├── Card.tsx
│   ├── Card.css
│   ├── ...
│   └── index.ts       # 組件導出
├── styles/            # 設計系統樣式
│   ├── variables.css  # 設計 Token
│   ├── animations.css # 全局動畫
│   └── global.css     # 全局樣式
├── types/             # TypeScript 類型定義
│   └── components.ts
└── stories/           # Storybook 故事文件
    ├── Button.stories.tsx
    ├── Card.stories.tsx
    └── ...
```

## 🛠️ 技術棧

- **React 18** - UI 框架
- **TypeScript** - 類型安全
- **Vite** - 構建工具
- **Storybook** - 組件文檔
- **CSS Variables** - 主題系統

## 🎯 使用示例

### 遊戲頭部

```tsx
import { ResourceDisplay } from './src/components';

function GameHeader() {
  return (
    <ResourceDisplay
      resources={[
        { label: '資金', value: 125000, icon: '💰' },
        { label: '人手', value: 45, icon: '👥' },
        { label: '聲望', value: 890, icon: '⭐' },
      ]}
      orientation="horizontal"
    />
  );
}
```

### 建築卡片網格

```tsx
import { Grid, Card, Button } from './src/components';

function BuildingGrid() {
  return (
    <Grid columns={3} responsive={{ sm: 1, md: 2, lg: 3 }}>
      <Card
        title="🏰 總部"
        subtitle="Lv.5"
        hoverable
        clickable
        footer={<Button size="sm">升級</Button>}
      >
        <div>💰 收入: +$5,000/天</div>
      </Card>
      {/* 更多建築... */}
    </Grid>
  );
}
```

### 確認對話框

```tsx
import { Modal, Button } from './src/components';

function ConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Modal
      open={open}
      title="確認操作"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>取消</Button>
          <Button variant="primary" onClick={onConfirm}>確定</Button>
        </>
      }
    >
      <p>確定要執行此操作嗎？</p>
    </Modal>
  );
}
```

## 🧪 測試

組件已通過 Storybook 進行視覺測試和交互測試。

運行 Storybook:
```bash
npm run storybook
```

## 📝 開發

### 添加新組件

1. 在 `src/components/` 創建組件文件
2. 在 `src/types/components.ts` 添加類型定義
3. 在 `src/components/index.ts` 導出組件
4. 在 `src/stories/` 創建 Storybook 故事

### 構建

```bash
npm run build
```

## 📄 License

MIT

## 👥 貢獻

歡迎提交 Issue 和 Pull Request！

## 🎮 關於遊戲

這套組件庫是為「黑道帝國建設遊戲」(Genesis Home) 開發的，一個結合了經營、養成、策略元素的網頁遊戲。

---

Made with ❤️ for Genesis Home
