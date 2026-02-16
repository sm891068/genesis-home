// ========================================
// 隊伍系統 UI 模組（Team System UI）
// 獨立 UI，點擊底部按鈕動態載入
// ========================================

class TeamUI {
    constructor() {
        this.initialized = false;
        this.currentFormation = null; // 當前陣容
    }

    // 初始化
    init() {
        if (this.initialized) return;
        console.log('[TeamUI] 🎯 隊伍系統 UI 初始化');
        this.initialized = true;
    }

    /**
     * 渲染隊伍面板
     * @param {string} containerId - 容器 ID
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('[TeamUI] 找不到容器:', containerId);
            return;
        }

        container.innerHTML = `
            <div style="padding: 20px;">
                <div style="text-align: center; padding: 60px 20px; color: #888;">
                    <div style="font-size: 80px; margin-bottom: 20px;">🎯</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--gold); margin-bottom: 12px;">隊伍編組</div>
                    <div style="font-size: 16px; margin-bottom: 30px; color: #aaa;">組建戰鬥隊伍、配置陣型</div>
                    
                    <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 12px; padding: 24px; max-width: 500px; margin: 0 auto;">
                        <div style="font-size: 14px; color: #888; line-height: 1.8; text-align: left;">
                            <p style="margin-bottom: 12px;">🎮 <strong style="color: var(--gold);">戰鬥陣容：</strong>最多編組 6 名夥伴參戰</p>
                            <p style="margin-bottom: 12px;">📍 <strong style="color: var(--gold);">陣型配置：</strong>前排（2）、中排（2）、後排（2）</p>
                            <p style="margin-bottom: 12px;">⚡ <strong style="color: var(--gold);">職業搭配：</strong>打手、保鏢、殺手、槍手、醫生</p>
                            <p style="margin-bottom: 12px;">🔄 <strong style="color: var(--gold);">快速切換：</strong>保存多個預設陣容</p>
                            <p>💪 <strong style="color: var(--gold);">總戰力：</strong>顯示當前隊伍總戰力</p>
                        </div>
                    </div>

                    <div style="margin-top: 30px; padding: 16px; background: rgba(212,175,55,0.1); border-radius: 8px; border: 1px solid var(--border);">
                        <div style="font-size: 13px; color: var(--gray);">🚧 開發中功能 🚧</div>
                        <div style="font-size: 12px; color: #666; margin-top: 8px;">預計在 v1.3 版本上線（戰鬥系統前置）</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 設置陣容
     * @param {Array} partners - 夥伴 ID 陣列（最多 6 個）
     */
    setFormation(partners) {
        if (!Array.isArray(partners) || partners.length > 6) {
            console.error('[TeamUI] 陣容設置錯誤');
            return false;
        }

        this.currentFormation = partners;
        console.log('[TeamUI] 陣容已設置:', partners);
        return true;
    }

    /**
     * 獲取當前陣容
     */
    getFormation() {
        return this.currentFormation || [];
    }
}

// 創建全局單例
const teamUI = new TeamUI();

// 掛載到全局
if (typeof window !== 'undefined') {
    window.teamUI = teamUI;
    window.TeamUI = TeamUI;
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TeamUI, teamUI };
}
