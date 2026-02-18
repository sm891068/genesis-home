import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';
import '../styles/global.css';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '主要按鈕',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '次要按鈕',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '危險按鈕',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: '成功按鈕',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '幽靈按鈕',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '輪廓按鈕',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: '小型按鈕',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: '中型按鈕',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: '大型按鈕',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '🏰',
    children: '帶圖標',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: '加載中...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '已禁用',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '全寬按鈕',
  },
  parameters: {
    layout: 'padded',
  },
};
