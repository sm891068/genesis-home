import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge';
import '../styles/global.css';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'danger', 'warning', 'info'],
    },
    count: {
      control: 'number',
    },
    dot: {
      control: 'boolean',
    },
    max: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: '默認',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '主要',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: '成功',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '危險',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: '警告',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: '資訊',
  },
};

export const WithCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
      <Badge count={5}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          📧
        </div>
      </Badge>
      
      <Badge count={99}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          🔔
        </div>
      </Badge>
      
      <Badge count={150} max={99}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          💬
        </div>
      </Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
      <Badge dot>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          🔔
        </div>
      </Badge>
      
      <Badge dot>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          ⚙️
        </div>
      </Badge>
    </div>
  ),
};

export const GameExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Badge variant="success" children="VIP" />
        <Badge variant="primary" children="LV.10" />
        <Badge variant="warning" children="新手" />
        <Badge variant="danger" children="在線" />
      </div>
      
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <Badge count={5}>
          <div style={{ 
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            📧 郵件
          </div>
        </Badge>
        
        <Badge count={12}>
          <div style={{ 
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            🎁 獎勵
          </div>
        </Badge>
        
        <Badge dot>
          <div style={{ 
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            ⚙️ 設定
          </div>
        </Badge>
      </div>
    </div>
  ),
};
