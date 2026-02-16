// ========================================
// 幫助系統 UI 模組（Help UI）
// 獨立 UI，點擊底部按鈕動態載入
// ========================================

class HelpUI {
    constructor() {
        this.initialized = false;
    }

    // 初始化
    init() {
        if (this.initialized) return;
        console.log('[HelpUI] ❓ 幫助系統 UI 初始化');
        this.initialized = true;
    }

    /**
     * 渲染幫助面板
     * @param {string} containerId - 容器 ID
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('[HelpUI] 找不到容器:', containerId);
            return;
        }

        container.innerHTML = `
            <div style="padding: 20px;">
                <!-- 快捷鍵說明 -->
                <div class="help-section" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0; padding: 16px; margin-bottom: 16px;">
                    <h4 style="font-size: 16px; color: var(--gold); margin-bottom: 16px;">⌨️ 快捷鍵</h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                        ${this.renderShortcut('1', '基地管理')}
                        ${this.renderShortcut('2', '派系關係')}
                        ${this.renderShortcut('3', '後宮系統')}
                        ${this.renderShortcut('4', '夥伴管理')}
                        ${this.renderShortcut('5', '隊伍編組')}
                        ${this.renderShortcut('6', '幫會 (多人)')}
                        ${this.renderShortcut('7', '世界地圖 (多人)')}
                        ${this.renderShortcut('8', '存檔管理')}
                        ${this.renderShortcut('9', '設定')}
                        ${this.renderShortcut('0', '幫助')}
                        ${this.renderShortcut('ESC', '關閉面板')}
                        ${this.renderShortcut('M', '聊天')}
                        ${this.renderShortcut('N', '下一回合')}
                    </div>
                </div>

                <!-- 遊戲說明 -->
                <div class="help-section" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0; padding: 16px; margin-bottom: 16px;">
                    <h4 style="font-size: 16px; color: var(--gold); margin-bottom: 16px;">📖 遊戲說明</h4>
                    
                    <div style="font-size: 14px; color: #aaa; line-height: 1.8;">
                        <p style="margin-bottom: 12px;"><strong style="color: var(--gold);">目標：</strong>建立黑道帝國，統治地下世界</p>
                        <p style="margin-bottom: 12px;"><strong style="color: var(--gold);">資源：</strong>資金、人手、聲望是發展的關鍵</p>
                        <p style="margin-bottom: 12px;"><strong style="color: var(--gold);">建築：</strong>建造並升級設施來增加收益</p>
                        <p style="margin-bottom: 12px;"><strong style="color: var(--gold);">夥伴：</strong>招募強力夥伴組建團隊</p>
                        <p style="margin-bottom: 12px;"><strong style="color: var(--gold);">後宮：</strong>SR+ 女性夥伴達到 20% 屈服度可加入後宮</p>
                        <p><strong style="color: var(--gold);">戰鬥：</strong>組建隊伍與敵對勢力爭奪地盤（開發中）</p>
                    </div>
                </div>

                <!-- 稀有度說明 -->
                <div class="help-section" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0; padding: 16px; margin-bottom: 16px;">
                    <h4 style="font-size: 16px; color: var(--gold); margin-bottom: 16px;">💎 稀有度系統</h4>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${this.renderRarity('N', '普通', '#ddd', '×0.5', '上限 Lv.50')}
                        ${this.renderRarity('R', '稀有', '#27ae60', '×1.25', '上限 Lv.60')}
                        ${this.renderRarity('SR', '超稀有', '#3498db', '×1.5', '上限 Lv.70')}
                        ${this.renderRarity('SSR', '超超稀有', '#9b59b6', '×1.75', '上限 Lv.80')}
                        ${this.renderRarity('UR', '究極稀有', '#e74c3c', '×2.0', '上限 Lv.90')}
                        ${this.renderRarity('LR', '傳說', '#f1c40f', '×2.25', '上限 Lv.100')}
                    </div>
                </div>

                <!-- 職業說明 -->
                <div class="help-section" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0; padding: 16px; margin-bottom: 16px;">
                    <h4 style="font-size: 16px; color: var(--gold); margin-bottom: 16px;">⚔️ 職業系統</h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
                        ${this.renderJob('打手', 'STR', '前排', '物理輸出')}
                        ${this.renderJob('保鏢', 'DEF', '前排', '肉盾坦克')}
                        ${this.renderJob('殺手', 'AGI', '中排', '爆發刺殺')}
                        ${this.renderJob('槍手', 'INT', '後排', '範圍傷害')}
                        ${this.renderJob('醫生', 'WIS', '後排', '治療輔助')}
                        ${this.renderJob('狙擊手', 'AGI+INT', '中排', '控制')}
                        ${this.renderJob('女王', '全能', '中排', '指揮')}
                        ${this.renderJob('秘書', 'INT+AGI', '中排', '支援')}
                    </div>
                </div>

                <!-- 關於 -->
                <div class="help-section" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0; padding: 16px; text-align: center;">
                    <h4 style="font-size: 16px; color: var(--gold); margin-bottom: 12px;">ℹ️ 關於</h4>
                    <p style="font-size: 13px; color: #888; margin-bottom: 8px;">黑道建築 Underworld Architect</p>
                    <p style="font-size: 12px; color: #666;">Version 1.0.0</p>
                    <p style="font-size: 12px; color: #666; margin-top: 12px;">© 2024 All Rights Reserved</p>
                </div>
            </div>
        `;
    }

    /**
     * 渲染快捷鍵項目
     */
    renderShortcut(key, description) {
        return `
            <div style="display: flex; align-items: center; gap: 12px; padding: 8px; background: rgba(0,0,0,0.3); border-radius: 6px;">
                <div style="
                    min-width: 40px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(212,175,55,0.2);
                    border: 1px solid var(--gold);
                    border-radius: 6px;
                    font-size: 13px;
                    font-weight: 700;
                    color: var(--gold);
                ">${key}</div>
                <span style="font-size: 13px; color: #aaa;">${description}</span>
            </div>
        `;
    }

    /**
     * 渲染稀有度項目
     */
    renderRarity(code, name, color, multiplier, levelCap) {
        return `
            <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(0,0,0,0.3); border-left: 3px solid ${color}; border-radius: 0 6px 6px 0;">
                <div style="
                    min-width: 50px;
                    padding: 4px 8px;
                    background: ${color};
                    color: ${code === 'N' ? '#000' : '#fff'};
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 700;
                    text-align: center;
                ">${code}</div>
                <div style="flex: 1;">
                    <div style="font-size: 14px; color: ${color}; font-weight: 700; margin-bottom: 2px;">${name}</div>
                    <div style="font-size: 11px; color: #888;">${multiplier} 乘數 | ${levelCap}</div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染職業項目
     */
    renderJob(name, stat, position, role) {
        return `
            <div style="padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 8px;">
                <div style="font-size: 14px; color: var(--gold); font-weight: 700; margin-bottom: 4px;">${name}</div>
                <div style="font-size: 11px; color: #888; margin-bottom: 2px;">主屬性：${stat}</div>
                <div style="font-size: 11px; color: #888; margin-bottom: 2px;">站位：${position}</div>
                <div style="font-size: 11px; color: #aaa;">定位：${role}</div>
            </div>
        `;
    }
}

// 創建全局單例
const helpUI = new HelpUI();

// 掛載到全局
if (typeof window !== 'undefined') {
    window.helpUI = helpUI;
    window.HelpUI = HelpUI;
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HelpUI, helpUI };
}
