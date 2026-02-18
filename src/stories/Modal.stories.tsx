import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { useState } from 'react';
import '../styles/global.css';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
    width: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Interactive example
export const Interactive = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>打開對話框</Button>
      <Modal
        open={open}
        title="這是一個對話框"
        onClose={() => setOpen(false)}
      >
        <p>這是對話框的內容區域，可以放置任何內容。</p>
        <p>按 ESC 鍵或點擊遮罩可以關閉對話框。</p>
      </Modal>
    </div>
  );
};

export const WithFooter = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>打開帶底部的對話框</Button>
      <Modal
        open={open}
        title="確認操作"
        onClose={() => setOpen(false)}
        footer={
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={() => {
              alert('已確認');
              setOpen(false);
            }}>
              確定
            </Button>
          </div>
        }
      >
        <p>您確定要執行此操作嗎？</p>
        <p>此操作無法撤銷。</p>
      </Modal>
    </div>
  );
};

export const LargeContent = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>打開大內容對話框</Button>
      <Modal
        open={open}
        title="遊戲規則"
        onClose={() => setOpen(false)}
        width={700}
      >
        <div>
          <h4>基本玩法</h4>
          <p>在黑道帝國建設遊戲中，你將扮演一個幫派老大...</p>
          
          <h4>建築系統</h4>
          <p>通過建設各種建築來提升幫派實力...</p>
          
          <h4>戰鬥系統</h4>
          <p>組建你的戰鬥隊伍，與其他幫派競爭...</p>
          
          <h4>資源管理</h4>
          <p>合理分配資金、人手和聲望...</p>
          
          <p>內容很長，可以滾動查看...</p>
          <p>內容很長，可以滾動查看...</p>
          <p>內容很長，可以滾動查看...</p>
        </div>
      </Modal>
    </div>
  );
};

export const NotClosable = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>打開不可關閉的對話框</Button>
      <Modal
        open={open}
        title="重要提示"
        onClose={() => {}}
        closable={false}
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>
            我已了解
          </Button>
        }
      >
        <p>這是一個重要的提示訊息。</p>
        <p>您必須點擊"我已了解"按鈕才能關閉此對話框。</p>
      </Modal>
    </div>
  );
};
