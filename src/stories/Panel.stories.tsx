import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from '../components/Panel';
import { Button } from '../components/Button';
import { useState } from 'react';
import '../styles/global.css';

const meta: Meta<typeof Panel> = {
  title: 'Components/Panel',
  component: Panel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    closable: {
      control: 'boolean',
    },
  },
};

export default meta;

export const Bottom = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <Button onClick={() => setOpen(true)}>打開底部面板</Button>
      <Panel
        open={open}
        title="🏰 基地管理"
        placement="bottom"
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          <p>這是從底部彈出的抽屜面板。</p>
          <p>適合用於顯示詳細資訊或操作選項。</p>
        </div>
      </Panel>
    </div>
  );
};

export const Left = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <Button onClick={() => setOpen(true)}>打開左側面板</Button>
      <Panel
        open={open}
        title="導航選單"
        placement="left"
        width="300px"
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          <p>這是從左側彈出的面板。</p>
          <p>適合用於導航選單。</p>
        </div>
      </Panel>
    </div>
  );
};

export const Right = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <Button onClick={() => setOpen(true)}>打開右側面板</Button>
      <Panel
        open={open}
        title="設定"
        placement="right"
        width="350px"
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          <p>這是從右側彈出的面板。</p>
          <p>適合用於設定或詳情面板。</p>
        </div>
      </Panel>
    </div>
  );
};

export const Top = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <Button onClick={() => setOpen(true)}>打開頂部面板</Button>
      <Panel
        open={open}
        title="通知"
        placement="top"
        width="50%"
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          <p>這是從頂部彈出的面板。</p>
          <p>適合用於通知或提示訊息。</p>
        </div>
      </Panel>
    </div>
  );
};

export const GamePanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <Button onClick={() => setOpen(true)}>打開遊戲面板</Button>
      <Panel
        open={open}
        title="💃 私人後宮"
        placement="bottom"
        width="80%"
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          <h4>角色列表</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>👩</div>
              <div style={{ fontWeight: 'bold' }}>艾莉亞</div>
              <div style={{ fontSize: '12px', color: '#888' }}>好感度: 85%</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>👩</div>
              <div style={{ fontWeight: 'bold' }}>索菲亞</div>
              <div style={{ fontSize: '12px', color: '#888' }}>好感度: 70%</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>👩</div>
              <div style={{ fontWeight: 'bold' }}>米婭</div>
              <div style={{ fontSize: '12px', color: '#888' }}>好感度: 60%</div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};
