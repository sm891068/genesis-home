// ========================================
// 派系系統 UI 模組（Faction System UI）
// 獨立 UI，點擊底部按鈕動態載入
// ========================================

class FactionUI {
    constructor() {
        this.initialized = false;
    }

    // 初始化
    init() {
        if (this.initialized) return;
        console.log('[FactionUI] ⚔️ 派系系統 UI 初始化');
        this.initialized = true;
    }

    /**
     * 渲染派系面板
     * @param {string} containerId - 容器 ID
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('[FactionUI] 找不到容器:', containerId);
            return;
        }

        container.innerHTML = `
            <div style="padding: 20px;">
                <div style="text-align: center; padding: 60px 20px; color: #888;">
                    <div style="font-size: 80px; margin-bottom: 20px;">⚔️</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--gold); margin-bottom: 12px;">派系系統</div>
                    <div style="font-size: 16px; margin-bottom: 30px; color: #aaa;">管理勢力關係、結盟與對抗</div>
                    
                    <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 12px; padding: 24px; max-width: 500px; margin: 0 auto;">
                        <div style="font-size: 14px; color: #888; line-height: 1.8; text-align: left;">
                            <p style="margin-bottom: 12px;">📌 <strong style="color: var(--gold);">派系關係：</strong>查看各勢力的友好度與敵對度</p>
                            <p style="margin-bottom: 12px;">🤝 <strong style="color: var(--gold);">結盟合作：</strong>與其他幫派建立同盟關係</p>
                            <p style="margin-bottom: 12px;">⚔️ <strong style="color: var(--gold);">宣戰挑戰：</strong>向敵對勢力發起挑戰</p>
                            <p style="margin-bottom: 12px;">💰 <strong style="color: var(--gold);">資源交易：</strong>與盟友進行資源互換</p>
                            <p>🎯 <strong style="color: var(--gold);">勢力任務：</strong>完成派系委託獲取獎勵</p>
                        </div>
                    </div>

                    <div style="margin-top: 30px; padding: 16px; background: rgba(212,175,55,0.1); border-radius: 8px; border: 1px solid var(--border);">
                        <div style="font-size: 13px; color: var(--gray);">🚧 開發中功能 🚧</div>
                        <div style="font-size: 12px; color: #666; margin-top: 8px;">預計在 v1.2 版本上線</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// 創建全局單例
const factionUI = new FactionUI();

// 掛載到全局
if (typeof window !== 'undefined') {
    window.factionUI = factionUI;
    window.FactionUI = FactionUI;
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FactionUI, factionUI };
}
