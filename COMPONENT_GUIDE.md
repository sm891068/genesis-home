# 黑道帝國 UI 組件庫使用指南

這是一套為黑道帝國建設遊戲設計的完整 React/TypeScript UI 組件庫。

## 📦 安裝

組件庫已經整合到項目中，無需額外安裝。直接導入即可使用：

```typescript
import { Button, Card, Modal, Toast } from './components';
```

## 🎨 設計系統

### 顏色

- **主色調 (金色)**: `#d4af37`
- **背景色 (深藍)**: `#0a0e27`
- **文字色 (淺灰)**: `#e8e8e8`
- **字體**: 'Noto Serif TC', serif

### 設計 Token

所有設計 token 定義在 `src/styles/variables.css` 中，可以在自定義樣式時使用：

```css
.custom-element {
  color: var(--color-gold);
  background: var(--color-bg);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

## 📚 組件文檔

### Button 按鈕

支持多種變體和尺寸的按鈕組件。

```tsx
import { Button } from './components';

// 基本使用
<Button variant="primary">主要按鈕</Button>

// 不同變體
<Button variant="secondary">次要按鈕</Button>
<Button variant="danger">危險按鈕</Button>
<Button variant="success">成功按鈕</Button>

// 不同尺寸
<Button size="sm">小按鈕</Button>
<Button size="md">中按鈕</Button>
<Button size="lg">大按鈕</Button>

// 帶圖標
<Button icon="🏰">建設</Button>

// 加載狀態
<Button loading>加載中...</Button>

// 全寬
<Button fullWidth>全寬按鈕</Button>
```

### Card 卡片

可交互的卡片容器組件。

```tsx
import { Card } from './components';

// 基本卡片
<Card>
  <p>卡片內容</p>
</Card>

// 帶標題和副標題
<Card title="卡片標題" subtitle="副標題">
  <p>卡片內容</p>
</Card>

// 可懸停和點擊
<Card hoverable clickable onClick={() => console.log('clicked')}>
  <p>點擊我</p>
</Card>

// 已選中狀態
<Card selected>
  <p>已選中的卡片</p>
</Card>

// 帶底部
<Card
  title="標題"
  footer={<Button>操作</Button>}
>
  <p>內容</p>
</Card>
```

### Toast 提示

消息提示組件，支持多種類型。

```tsx
import { Toast, ToastContainer } from './components';
import { useState } from 'react';

function App() {
  const [toasts, setToasts] = useState([]);

  const showToast = (type) => {
    const newToast = {
      id: Date.now().toString(),
      message: '這是一條提示訊息',
      type: type, // 'success' | 'error' | 'warning' | 'info'
    };
    setToasts([...toasts, newToast]);
  };

  return (
    <>
      <Button onClick={() => showToast('success')}>顯示提示</Button>
      <ToastContainer
        toasts={toasts}
        onRemove={(id) => setToasts(toasts.filter(t => t.id !== id))}
      />
    </>
  );
}
```

### Modal 對話框

模態對話框組件。

```tsx
import { Modal, Button } from './components';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打開對話框</Button>
      
      <Modal
        open={open}
        title="對話框標題"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              確定
            </Button>
          </>
        }
      >
        <p>對話框內容</p>
      </Modal>
    </>
  );
}
```

### Panel 抽屜面板

從屏幕邊緣滑入的面板組件。

```tsx
import { Panel, Button } from './components';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打開面板</Button>
      
      <Panel
        open={open}
        title="面板標題"
        placement="bottom" // 'left' | 'right' | 'top' | 'bottom'
        width="80%"
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          <p>面板內容</p>
        </div>
      </Panel>
    </>
  );
}
```

### Badge 徽章

用於顯示通知數量或狀態的徽章組件。

```tsx
import { Badge } from './components';

// 基本徽章
<Badge variant="primary">VIP</Badge>
<Badge variant="success">在線</Badge>

// 帶數量
<Badge count={5}>
  <div>📧 郵件</div>
</Badge>

// 顯示小紅點
<Badge dot>
  <div>🔔 通知</div>
</Badge>

// 限制最大數量
<Badge count={150} max={99}>
  <div>💬 訊息</div>
</Badge>
```

### ResourceDisplay 資源顯示

用於顯示遊戲資源的組件。

```tsx
import { ResourceDisplay } from './components';

const resources = [
  { label: '資金', value: 125000, icon: '💰', color: '#d4af37' },
  { label: '人手', value: 45, icon: '👥', color: '#3498db' },
  { label: '聲望', value: 890, icon: '⭐', color: '#9b59b6' },
];

// 水平排列
<ResourceDisplay resources={resources} orientation="horizontal" />

// 垂直排列
<ResourceDisplay resources={resources} orientation="vertical" />
```

### Input 輸入框

表單輸入組件。

```tsx
import { Input } from './components';

// 基本輸入框
<Input placeholder="請輸入內容" />

// 帶標籤
<Input label="用戶名稱" placeholder="請輸入" />

// 帶錯誤訊息
<Input
  label="電子郵件"
  error="請輸入有效的電子郵件"
  value="invalid@"
/>

// 帶提示文字
<Input
  label="密碼"
  type="password"
  helperText="至少 8 個字符"
/>

// 帶圖標
<Input
  icon="🔍"
  iconPosition="left"
  placeholder="搜索..."
/>

// 全寬
<Input fullWidth placeholder="全寬輸入框" />
```

### Grid 網格佈局

響應式網格佈局組件。

```tsx
import { Grid, Card } from './components';

// 3 列網格
<Grid columns={3} gap={16}>
  <Card>內容 1</Card>
  <Card>內容 2</Card>
  <Card>內容 3</Card>
</Grid>

// 響應式網格
<Grid
  columns={4}
  gap={16}
  responsive={{
    sm: 1,  // 小屏幕 1 列
    md: 2,  // 中屏幕 2 列
    lg: 4,  // 大屏幕 4 列
  }}
>
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</Grid>
```

## 🎯 遊戲集成示例

### 遊戲頭部資源欄

```tsx
import { ResourceDisplay } from './components';

function GameHeader() {
  const resources = [
    { label: '資金', value: gameState.money, icon: '💰' },
    { label: '人手', value: gameState.crew, icon: '👥' },
    { label: '聲望', value: gameState.reputation, icon: '⭐' },
  ];

  return (
    <div className="game-header">
      <ResourceDisplay resources={resources} orientation="horizontal" />
      <div className="day-info">第 {gameState.day} 天</div>
    </div>
  );
}
```

### 建築網格

```tsx
import { Grid, Card, Button } from './components';

function BuildingGrid() {
  const buildings = [
    { id: 1, name: '🏰 總部', level: 5, income: 5000 },
    { id: 2, name: '💼 商業中心', level: 3, income: 3000 },
    // ...更多建築
  ];

  return (
    <Grid columns={3} gap={16} responsive={{ sm: 1, md: 2, lg: 3 }}>
      {buildings.map(building => (
        <Card
          key={building.id}
          title={building.name}
          subtitle={`Lv.${building.level}`}
          hoverable
          clickable
          onClick={() => selectBuilding(building.id)}
          footer={
            <Button size="sm" fullWidth>
              升級 ($50,000)
            </Button>
          }
        >
          <div>💰 收入: +${building.income}/天</div>
        </Card>
      ))}
    </Grid>
  );
}
```

### 確認對話框

```tsx
import { Modal, Button } from './components';
import { useState } from 'react';

function UpgradeConfirmation() {
  const [open, setOpen] = useState(false);

  const handleUpgrade = () => {
    // 執行升級邏輯
    console.log('升級建築');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>升級建築</Button>
      
      <Modal
        open={open}
        title="確認升級"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={handleUpgrade}>
              確定升級
            </Button>
          </>
        }
      >
        <p>確定要升級總部大樓到 Lv.6 嗎？</p>
        <p>需要花費: $50,000</p>
      </Modal>
    </>
  );
}
```

## 🎨 自定義樣式

所有組件都支持通過 `className` 和 `style` 屬性自定義樣式：

```tsx
<Button
  className="custom-button"
  style={{ marginTop: '20px' }}
>
  自定義按鈕
</Button>
```

## 📝 TypeScript 支持

所有組件都有完整的 TypeScript 類型定義，導入即可獲得類型提示：

```typescript
import { ButtonProps, CardProps, ModalProps } from './components';

const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
  children: '按鈕',
};
```

## 🧪 測試

使用 Storybook 查看所有組件的示例和文檔：

```bash
npm run storybook
```

## 📱 響應式設計

所有組件都經過響應式設計優化，在移動設備上也能良好顯示。

## 🎉 完成

現在你已經掌握了如何使用這套 UI 組件庫！開始構建你的黑道帝國遊戲吧！
