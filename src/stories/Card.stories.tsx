import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import '../styles/global.css';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
    selected: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    children: <div>這是一個基本的卡片組件</div>,
  },
};

export const WithTitle: Story = {
  args: {
    title: '卡片標題',
    children: <div>這是卡片的內容區域</div>,
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: '卡片標題',
    subtitle: '這是副標題',
    children: <div>這是卡片的內容區域，可以放置任何內容。</div>,
  },
};

export const WithFooter: Story = {
  args: {
    title: '卡片標題',
    children: <div>這是卡片的內容區域</div>,
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="sm">取消</Button>
        <Button variant="primary" size="sm">確定</Button>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    title: '可懸停卡片',
    hoverable: true,
    children: <div>將鼠標懸停在卡片上查看效果</div>,
  },
};

export const Clickable: Story = {
  args: {
    title: '可點擊卡片',
    clickable: true,
    hoverable: true,
    onClick: () => alert('卡片被點擊了！'),
    children: <div>點擊這個卡片會觸發事件</div>,
  },
};

export const Selected: Story = {
  args: {
    title: '已選中卡片',
    selected: true,
    children: <div>這個卡片處於選中狀態</div>,
  },
};

export const GameCard: Story = {
  args: {
    title: '🏰 總部大樓',
    subtitle: 'Lv.5 • 聲望 +50',
    hoverable: true,
    clickable: true,
    children: (
      <div>
        <p style={{ marginBottom: '12px' }}>提升幫派的整體實力和影響力</p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
          <span>💰 收入: +$5,000/天</span>
          <span>👥 容量: 50人</span>
        </div>
      </div>
    ),
    footer: (
      <Button variant="primary" size="sm" fullWidth>
        升級 (需要 $50,000)
      </Button>
    ),
  },
};
