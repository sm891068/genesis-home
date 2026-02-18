import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../components/Grid';
import { Card } from '../components/Card';
import '../styles/global.css';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'number',
    },
    gap: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const SampleCard = ({ index }: { index: number }) => (
  <Card hoverable>
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏢</div>
      <div>建築 {index + 1}</div>
    </div>
  </Card>
);

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: 16,
    children: Array.from({ length: 6 }, (_, i) => <SampleCard key={i} index={i} />),
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: 16,
    children: Array.from({ length: 8 }, (_, i) => <SampleCard key={i} index={i} />),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 20,
    children: Array.from({ length: 4 }, (_, i) => <SampleCard key={i} index={i} />),
  },
};

export const Responsive: Story = {
  args: {
    columns: 4,
    gap: 16,
    responsive: {
      sm: 1,
      md: 2,
      lg: 4,
    },
    children: Array.from({ length: 8 }, (_, i) => <SampleCard key={i} index={i} />),
  },
};

export const GameBuildings: Story = {
  render: () => (
    <Grid columns={3} gap={16} responsive={{ sm: 1, md: 2, lg: 3 }}>
      <Card
        title="🏰 總部大樓"
        subtitle="Lv.5"
        hoverable
        clickable
        footer={<div style={{ fontSize: '12px' }}>💰 +$5,000/天</div>}
      >
        <div>提升幫派整體實力</div>
      </Card>
      
      <Card
        title="💼 商業中心"
        subtitle="Lv.3"
        hoverable
        clickable
        footer={<div style={{ fontSize: '12px' }}>💰 +$3,000/天</div>}
      >
        <div>增加資金收入</div>
      </Card>
      
      <Card
        title="🏋️ 訓練場"
        subtitle="Lv.4"
        hoverable
        clickable
        footer={<div style={{ fontSize: '12px' }}>👥 容量 +20</div>}
      >
        <div>提升人手戰鬥力</div>
      </Card>
      
      <Card
        title="🎰 賭場"
        subtitle="Lv.2"
        hoverable
        clickable
        footer={<div style={{ fontSize: '12px' }}>💰 +$2,000/天</div>}
      >
        <div>高風險高收益</div>
      </Card>
      
      <Card
        title="🏪 商店"
        subtitle="Lv.2"
        hoverable
        clickable
        footer={<div style={{ fontSize: '12px' }}>⭐ +10 聲望</div>}
      >
        <div>提升地區影響力</div>
      </Card>
      
      <Card
        title="🏥 醫療所"
        subtitle="Lv.1"
        hoverable
        clickable
        footer={<div style={{ fontSize: '12px' }}>❤️ 恢復速度 +50%</div>}
      >
        <div>治療受傷人員</div>
      </Card>
    </Grid>
  ),
};

export const CharacterList: Story = {
  render: () => (
    <Grid columns={4} gap={16} responsive={{ sm: 2, md: 3, lg: 4 }}>
      {[
        { name: '張三', role: '老大', level: 25, emoji: '👨' },
        { name: '李四', role: '顧問', level: 20, emoji: '👨' },
        { name: '艾莉亞', role: '刺客', level: 18, emoji: '👩' },
        { name: '索菲亞', role: '駭客', level: 22, emoji: '👩' },
        { name: '王五', role: '打手', level: 15, emoji: '👨' },
        { name: '趙六', role: '司機', level: 12, emoji: '👨' },
        { name: '米婭', role: '交際花', level: 16, emoji: '👩' },
        { name: '傑克', role: '保鏢', level: 19, emoji: '👨' },
      ].map((char, i) => (
        <Card key={i} hoverable clickable>
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>{char.emoji}</div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{char.name}</div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{char.role}</div>
            <div style={{ fontSize: '12px', color: '#d4af37' }}>Lv.{char.level}</div>
          </div>
        </Card>
      ))}
    </Grid>
  ),
};
