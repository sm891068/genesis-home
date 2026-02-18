import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';
import '../styles/global.css';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: '請輸入內容...',
  },
};

export const WithLabel: Story = {
  args: {
    label: '用戶名稱',
    placeholder: '請輸入用戶名稱',
  },
};

export const WithError: Story = {
  args: {
    label: '電子郵件',
    placeholder: 'your@email.com',
    error: '請輸入有效的電子郵件地址',
    defaultValue: 'invalid-email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '密碼',
    type: 'password',
    placeholder: '請輸入密碼',
    helperText: '密碼必須至少包含 8 個字符',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: '搜索',
    placeholder: '搜索內容...',
    icon: '🔍',
    iconPosition: 'left',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: '金額',
    placeholder: '0',
    icon: '💰',
    iconPosition: 'right',
  },
};

export const FullWidth: Story = {
  args: {
    label: '幫派名稱',
    placeholder: '請輸入幫派名稱',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '用戶 ID',
    value: 'USER123456',
    disabled: true,
  },
};

export const GameLogin: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label="帳號"
        placeholder="請輸入帳號"
        icon="👤"
        iconPosition="left"
        fullWidth
      />
      <Input
        label="密碼"
        type="password"
        placeholder="請輸入密碼"
        icon="🔒"
        iconPosition="left"
        fullWidth
      />
    </div>
  ),
};

export const SearchBar: Story = {
  args: {
    placeholder: '搜索建築、夥伴、裝備...',
    icon: '🔍',
    iconPosition: 'left',
    fullWidth: true,
  },
};

export const MoneyInput: Story = {
  args: {
    label: '投資金額',
    type: 'number',
    placeholder: '0',
    icon: '💰',
    iconPosition: 'right',
    helperText: '最低投資金額為 $10,000',
  },
};
