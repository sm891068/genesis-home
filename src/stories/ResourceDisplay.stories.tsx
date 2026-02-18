import type { Meta, StoryObj } from '@storybook/react';
import { ResourceDisplay } from '../components/ResourceDisplay';
import '../styles/global.css';

const meta: Meta<typeof ResourceDisplay> = {
  title: 'Components/ResourceDisplay',
  component: ResourceDisplay,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResourceDisplay>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    resources: [
      { label: '資金', value: 125000, icon: '💰' },
      { label: '人手', value: 45, icon: '👥' },
      { label: '聲望', value: 890, icon: '⭐' },
    ],
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    resources: [
      { label: '資金', value: 125000, icon: '💰' },
      { label: '人手', value: 45, icon: '👥' },
      { label: '聲望', value: 890, icon: '⭐' },
    ],
  },
};

export const WithCustomColors: Story = {
  args: {
    orientation: 'horizontal',
    resources: [
      { label: '資金', value: 125000, icon: '💰', color: '#d4af37' },
      { label: '人手', value: 45, icon: '👥', color: '#3498db' },
      { label: '聲望', value: 890, icon: '⭐', color: '#9b59b6' },
      { label: '經驗', value: 1250, icon: '📊', color: '#27ae60' },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    orientation: 'horizontal',
    resources: [
      { label: '資金', value: 125000 },
      { label: '人手', value: 45 },
      { label: '聲望', value: 890 },
    ],
  },
};

export const GameHeader: Story = {
  args: {
    orientation: 'horizontal',
    resources: [
      { label: '資金', value: 1250000, icon: '💰', color: '#d4af37' },
      { label: '人手', value: 150, icon: '👥', color: '#3498db' },
      { label: '聲望', value: 5680, icon: '⭐', color: '#9b59b6' },
      { label: '等級', value: 'Lv.25', icon: '🏆', color: '#f39c12' },
    ],
  },
};

export const PlayerStats: Story = {
  args: {
    orientation: 'vertical',
    resources: [
      { label: '攻擊力', value: 450, icon: '⚔️', color: '#e74c3c' },
      { label: '防禦力', value: 380, icon: '🛡️', color: '#3498db' },
      { label: '速度', value: 120, icon: '⚡', color: '#f39c12' },
      { label: '幸運', value: 85, icon: '🍀', color: '#27ae60' },
    ],
  },
};
