import React from 'react';
import {
  Button,
  Card,
  Toast,
  Modal,
  Panel,
  Badge,
  ResourceDisplay,
  Input,
  Grid,
} from './components';

/**
 * 組件測試示例 - 驗證所有組件可以正常導入和使用
 * Component test example - Verify all components can be imported and used
 */
export function ComponentTest() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [panelOpen, setPanelOpen] = React.useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>組件庫測試 / Component Library Test</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>Button 按鈕</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Card 卡片</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Card title="基本卡片">
            <p>這是一個基本卡片</p>
          </Card>
          <Card title="可懸停卡片" hoverable>
            <p>將鼠標懸停在這裡</p>
          </Card>
          <Card title="已選中" selected>
            <p>這個卡片已被選中</p>
          </Card>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Badge 徽章</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge count={5}>
            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
              📧 郵件
            </div>
          </Badge>
          <Badge dot>
            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
              🔔 通知
            </div>
          </Badge>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>ResourceDisplay 資源顯示</h2>
        <ResourceDisplay
          resources={[
            { label: '資金', value: 125000, icon: '💰' },
            { label: '人手', value: 45, icon: '👥' },
            { label: '聲望', value: 890, icon: '⭐' },
          ]}
          orientation="horizontal"
        />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Input 輸入框</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Input placeholder="基本輸入框" />
          <Input label="帶標籤" placeholder="請輸入內容" />
          <Input label="搜索" icon="🔍" iconPosition="left" placeholder="搜索..." />
          <Input label="金額" icon="💰" iconPosition="right" placeholder="0" />
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Grid 網格</h2>
        <Grid columns={3} gap={16} responsive={{ sm: 1, md: 2, lg: 3 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} hoverable>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏢</div>
                <div>項目 {i}</div>
              </div>
            </Card>
          ))}
        </Grid>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Modal & Panel</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setModalOpen(true)}>打開 Modal</Button>
          <Button onClick={() => setPanelOpen(true)}>打開 Panel</Button>
        </div>

        <Modal open={modalOpen} title="測試 Modal" onClose={() => setModalOpen(false)}>
          <p>這是一個測試對話框</p>
        </Modal>

        <Panel open={panelOpen} title="測試 Panel" placement="bottom" onClose={() => setPanelOpen(false)}>
          <div style={{ padding: '20px' }}>
            <p>這是一個測試面板</p>
          </div>
        </Panel>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Toast 提示</h2>
        <Toast message="這是一個測試提示" type="info" duration={0} />
      </section>
    </div>
  );
}
