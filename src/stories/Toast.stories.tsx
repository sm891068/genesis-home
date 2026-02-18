import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastContainer } from '../components/Toast';
import { useState } from 'react';
import { Button } from '../components/Button';
import '../styles/global.css';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    duration: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    message: '操作成功！',
    type: 'success',
    duration: 0, // Disable auto-close for Storybook
  },
};

export const Error: Story = {
  args: {
    message: '操作失敗，請重試',
    type: 'error',
    duration: 0,
  },
};

export const Warning: Story = {
  args: {
    message: '請注意！這是一個警告訊息',
    type: 'warning',
    duration: 0,
  },
};

export const Info: Story = {
  args: {
    message: '這是一條提示訊息',
    type: 'info',
    duration: 0,
  },
};

// Interactive example with container
export const Interactive = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }>>([]);

  const addToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: '操作成功完成！',
      error: '發生錯誤，請重試',
      warning: '請注意此警告訊息',
      info: '這是一條資訊提示',
    };

    const newToast = {
      id: Date.now().toString(),
      message: messages[type],
      type,
    };

    setToasts([...toasts, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <Button variant="success" onClick={() => addToast('success')}>
          顯示成功
        </Button>
        <Button variant="danger" onClick={() => addToast('error')}>
          顯示錯誤
        </Button>
        <Button variant="secondary" onClick={() => addToast('warning')}>
          顯示警告
        </Button>
        <Button variant="primary" onClick={() => addToast('info')}>
          顯示資訊
        </Button>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
