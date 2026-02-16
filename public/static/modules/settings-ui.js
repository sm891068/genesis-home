// ========================================
// 設定系統 UI 模組（Settings UI）
// 獨立 UI，點擊底部按鈕動態載入
// ========================================

class SettingsUI {
    constructor() {
        this.initialized = false;
    }

    // 初始化
    init() {
        if (this.initialized) return;
        console.log('[SettingsUI] ⚙️ 設定系統 UI 初始化');
        this.initialized = true;
    }

    /**
     * 渲染設定面板
     * @param {string} containerId - 容器 ID
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('[SettingsUI] 找不到容器:', containerId);
            return;
        }

        const settings = GameState.current.settings;

        container.innerHTML = `
            <div style="padding: 20px;">
                <!-- 音效設定 -->
                <div class="settings-section" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0; padding: 16px; margin-bottom: 16px;">
                    <h4 style="font-size: 16px; color: var(--gold); margin-bottom: 16px;">🔊 音效設定</h4>
                    
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px; color: #aaa;">背景音樂（BGM）</span>
                            <label class="toggle-switch" style="position: relative; display: inline-block; width: 50px; height: 24px;">
                                <input type="checkbox" ${settings.bgm ? 'checked' : ''} 
                                       onchange="settingsUI.toggleBGM(this.checked)"
                                       style="opacity: 0; width: 0; height: 0;">
                                <span style="position: absolute; cursor: pointer; inset: 0; background: ${settings.bgm ? 'var(--gold)' : '#555'}; border-radius: 24px; transition: 0.3s;"></span>
                            </label>
                        </div>
                        
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="font-size: 14px; color: #aaa;">音效音量</span>
                                <span style="font-size: 14px; color: var(--gold); font-weight: 700;">${settings.sfxVolume}%</span>
                            </div>
                            <input type="range" min="0" max="100" value="${settings.sfxVolume}" 
                                   oninput="settingsUI.setSFXVolume(this.value)"
                                   style="width: 100%; cursor: pointer;">
                        </div>
                    </div>
                </div>

                <!-- 遊戲設定 -->
                <div class="settings-section" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0; padding: 16px; margin-bottom: 16px;">
                    <h4 style="font-size: 16px; color: var(--gold); margin-bottom: 16px;">🎮 遊戲設定</h4>
                    
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px; color: #aaa;">自動存檔</span>
                            <label class="toggle-switch" style="position: relative; display: inline-block; width: 50px; height: 24px;">
                                <input type="checkbox" ${settings.autoSave ? 'checked' : ''} 
                                       onchange="settingsUI.toggleAutoSave(this.checked)"
                                       style="opacity: 0; width: 0; height: 0;">
                                <span style="position: absolute; cursor: pointer; inset: 0; background: ${settings.autoSave ? 'var(--gold)' : '#555'}; border-radius: 24px; transition: 0.3s;"></span>
                            </label>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px; color: #aaa;">通知提醒</span>
                            <label class="toggle-switch" style="position: relative; display: inline-block; width: 50px; height: 24px;">
                                <input type="checkbox" ${settings.notification ? 'checked' : ''} 
                                       onchange="settingsUI.toggleNotification(this.checked)"
                                       style="opacity: 0; width: 0; height: 0;">
                                <span style="position: absolute; cursor: pointer; inset: 0; background: ${settings.notification ? 'var(--gold)' : '#555'}; border-radius: 24px; transition: 0.3s;"></span>
                            </label>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px; color: #aaa;">震動反饋</span>
                            <label class="toggle-switch" style="position: relative; display: inline-block; width: 50px; height: 24px;">
                                <input type="checkbox" ${settings.vibration ? 'checked' : ''} 
                                       onchange="settingsUI.toggleVibration(this.checked)"
                                       style="opacity: 0; width: 0; height: 0;">
                                <span style="position: absolute; cursor: pointer; inset: 0; background: ${settings.vibration ? 'var(--gold)' : '#555'}; border-radius: 24px; transition: 0.3s;"></span>
                            </label>
                        </div>

                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="font-size: 14px; color: #aaa;">文字速度</span>
                                <span style="font-size: 14px; color: var(--gold); font-weight: 700;">
                                    ${settings.textSpeed === 'slow' ? '慢' : settings.textSpeed === 'normal' ? '正常' : '快'}
                                </span>
                            </div>
                            <select onchange="settingsUI.setTextSpeed(this.value)" 
                                    style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border); border-radius: 6px; color: var(--text); font-size: 14px; cursor: pointer;">
                                <option value="slow" ${settings.textSpeed === 'slow' ? 'selected' : ''}>慢速</option>
                                <option value="normal" ${settings.textSpeed === 'normal' ? 'selected' : ''}>正常</option>
                                <option value="fast" ${settings.textSpeed === 'fast' ? 'selected' : ''}>快速</option>
                            </select>
                        </div>

                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="font-size: 14px; color: #aaa;">字體大小</span>
                                <span style="font-size: 14px; color: var(--gold); font-weight: 700;">
                                    ${settings.fontSize === 'small' ? '小' : settings.fontSize === 'medium' ? '中' : '大'}
                                </span>
                            </div>
                            <select onchange="settingsUI.setFontSize(this.value)" 
                                    style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border); border-radius: 6px; color: var(--text); font-size: 14px; cursor: pointer;">
                                <option value="small" ${settings.fontSize === 'small' ? 'selected' : ''}>小</option>
                                <option value="medium" ${settings.fontSize === 'medium' ? 'selected' : ''}>中</option>
                                <option value="large" ${settings.fontSize === 'large' ? 'selected' : ''}>大</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 危險操作 -->
                <div class="settings-section" style="background: rgba(231,76,60,0.1); border-left: 3px solid #e74c3c; border-radius: 0 10px 10px 0; padding: 16px;">
                    <h4 style="font-size: 16px; color: #e74c3c; margin-bottom: 16px;">⚠️ 危險操作</h4>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button onclick="settingsUI.resetSettings()" 
                                style="padding: 12px 20px; background: transparent; border: 1px solid #e74c3c; color: #e74c3c; border-radius: 8px; font-size: 14px; cursor: pointer;">
                            重置所有設定
                        </button>
                        <button onclick="settingsUI.clearAllData()" 
                                style="padding: 12px 20px; background: #e74c3c; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;">
                            清除所有數據
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // BGM 開關
    toggleBGM(enabled) {
        GameState.current.settings.bgm = enabled;
        GameState.saveSettings();
        Toast.show(enabled ? '背景音樂已開啟' : '背景音樂已關閉', 1500);
    }

    // 設置音效音量
    setSFXVolume(volume) {
        GameState.current.settings.sfxVolume = parseInt(volume);
        GameState.saveSettings();
    }

    // 自動存檔開關
    toggleAutoSave(enabled) {
        GameState.current.settings.autoSave = enabled;
        GameState.saveSettings();
        Toast.show(enabled ? '自動存檔已開啟' : '自動存檔已關閉', 1500);
    }

    // 通知開關
    toggleNotification(enabled) {
        GameState.current.settings.notification = enabled;
        GameState.saveSettings();
        Toast.show(enabled ? '通知提醒已開啟' : '通知提醒已關閉', 1500);
    }

    // 震動反饋開關
    toggleVibration(enabled) {
        GameState.current.settings.vibration = enabled;
        GameState.saveSettings();
        Toast.show(enabled ? '震動反饋已開啟' : '震動反饋已關閉', 1500);
    }

    // 設置文字速度
    setTextSpeed(speed) {
        GameState.current.settings.textSpeed = speed;
        GameState.saveSettings();
        Toast.show(`文字速度已設為：${speed === 'slow' ? '慢速' : speed === 'normal' ? '正常' : '快速'}`, 1500);
    }

    // 設置字體大小
    setFontSize(size) {
        GameState.current.settings.fontSize = size;
        GameState.saveSettings();
        Toast.show(`字體大小已設為：${size === 'small' ? '小' : size === 'medium' ? '中' : '大'}`, 1500);
    }

    // 重置設定
    resetSettings() {
        showConfirm('確定要重置所有設定為默認值嗎？', () => {
            GameState.current.settings = {
                bgm: true,
                sfxVolume: 70,
                textSpeed: 'normal',
                autoSave: true,
                notification: true,
                fontSize: 'medium',
                vibration: false
            };
            GameState.saveSettings();
            Toast.success('設定已重置');
            this.render('settings-panel-content');
        });
    }

    // 清除所有數據
    clearAllData() {
        showConfirm('⚠️ 警告：此操作將清除所有存檔、設定和圖鑑記錄，且無法復原。確定要繼續嗎？', () => {
            showConfirm('最後確認：真的要清除所有數據嗎？', () => {
                GameState.clearAll();
                Toast.success('所有數據已清除');
                
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            });
        });
    }
}

// 創建全局單例
const settingsUI = new SettingsUI();

// 掛載到全局
if (typeof window !== 'undefined') {
    window.settingsUI = settingsUI;
    window.SettingsUI = SettingsUI;
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SettingsUI, settingsUI };
}
