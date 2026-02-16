// ========================================
// 存檔系統 UI 模組（Save System UI）
// 獨立 UI，點擊底部按鈕動態載入
// ========================================

class SaveUI {
    constructor() {
        this.initialized = false;
    }

    // 初始化
    init() {
        if (this.initialized) return;
        console.log('[SaveUI] 📁 存檔系統 UI 初始化');
        this.initialized = true;
    }

    /**
     * 渲染存檔面板
     * @param {string} containerId - 容器 ID
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('[SaveUI] 找不到容器:', containerId);
            return;
        }

        const saves = GameState.saves || [];

        container.innerHTML = `
            <div style="padding: 20px;">
                <!-- 快速操作區 -->
                <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
                    <button onclick="saveUI.quickSave()" 
                            style="flex: 1; padding: 12px 20px; background: var(--gold); color: #000; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;">
                        💾 快速存檔
                    </button>
                    <button onclick="saveUI.newSave()" 
                            style="flex: 1; padding: 12px 20px; background: transparent; border: 1px solid var(--gold); color: var(--text); border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;">
                        ➕ 新建存檔
                    </button>
                </div>

                <!-- 存檔列表 -->
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${saves.length > 0 ? saves.map((save, index) => this.renderSaveCard(save, index)).join('') : `
                        <div style="text-align: center; padding: 60px 20px; color: #888;">
                            <div style="font-size: 60px; margin-bottom: 20px;">📁</div>
                            <div style="font-size: 18px; margin-bottom: 10px;">尚無存檔</div>
                            <div style="font-size: 14px; color: #666;">
                                點擊上方「快速存檔」或「新建存檔」保存進度
                            </div>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    /**
     * 渲染存檔卡片
     * @param {Object} save - 存檔對象
     * @param {number} index - 索引
     */
    renderSaveCard(save, index) {
        const isCurrentSave = GameState.current.currentSaveId === save.id;

        return `
            <div class="save-card" style="
                background: rgba(0,0,0,0.4);
                border: 2px solid ${isCurrentSave ? 'var(--gold)' : 'var(--border)'};
                border-radius: 12px;
                padding: 16px;
                position: relative;
                transition: all 0.3s;
            " onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='${isCurrentSave ? 'var(--gold)' : 'var(--border)'}'" >
                ${isCurrentSave ? `
                    <div style="position: absolute; top: 12px; right: 12px; background: var(--gold); color: #000; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700;">
                        當前存檔
                    </div>
                ` : ''}
                
                <div style="display: flex; gap: 16px; align-items: center;">
                    <div style="font-size: 48px;">💾</div>
                    
                    <div style="flex: 1;">
                        <div style="font-size: 16px; font-weight: 700; color: var(--gold); margin-bottom: 4px;">
                            ${save.name || '未命名存檔'}
                        </div>
                        <div style="font-size: 12px; color: #aaa; margin-bottom: 8px;">
                            ${save.route || '未知路線'} | Day ${save.day} | $${(save.money || 0).toLocaleString()}
                        </div>
                        <div style="font-size: 11px; color: #666;">
                            ${save.timestamp || '時間未知'}
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button onclick="saveUI.loadSave(${save.id})" 
                                style="padding: 8px 16px; background: transparent; border: 1px solid var(--gold); color: var(--text); border-radius: 6px; font-size: 12px; cursor: pointer;">
                            讀取
                        </button>
                        <button onclick="saveUI.deleteSave(${save.id})" 
                                style="padding: 8px 16px; background: transparent; border: 1px solid #e74c3c; color: #e74c3c; border-radius: 6px; font-size: 12px; cursor: pointer;">
                            刪除
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 快速存檔
     */
    quickSave() {
        const saveData = GameState.save(`快速存檔 - ${GameState.current.gangName}`);
        
        if (saveData) {
            Toast.success('快速存檔成功！');
            this.render('saves-panel-content');
        } else {
            Toast.error('快速存檔失敗');
        }
    }

    /**
     * 新建存檔
     */
    newSave() {
        const saveName = prompt('請輸入存檔名稱：', `${GameState.current.gangName} - Day ${GameState.current.day}`);
        
        if (!saveName) {
            Toast.warning('已取消存檔');
            return;
        }

        const saveData = GameState.save(saveName);
        
        if (saveData) {
            Toast.success(`存檔「${saveName}」已保存！`);
            this.render('saves-panel-content');
        } else {
            Toast.error('存檔失敗');
        }
    }

    /**
     * 讀取存檔
     * @param {number} saveId - 存檔 ID
     */
    loadSave(saveId) {
        showConfirm('讀取存檔將會覆蓋當前進度，確定要繼續嗎？', () => {
            LoadingScreen.show('載入存檔中...');
            
            setTimeout(() => {
                const success = GameState.load(saveId);
                
                if (success) {
                    LoadingScreen.hide();
                    Toast.success('存檔載入成功！');
                    
                    // 重新載入頁面以更新所有 UI
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else {
                    LoadingScreen.hide();
                    Toast.error('存檔載入失敗');
                }
            }, 1500);
        });
    }

    /**
     * 刪除存檔
     * @param {number} saveId - 存檔 ID
     */
    deleteSave(saveId) {
        const save = GameState.saves.find(s => s.id === saveId);
        const saveName = save ? save.name : '未知存檔';

        showConfirm(`確定要刪除存檔「${saveName}」嗎？此操作無法復原。`, () => {
            GameState.deleteSave(saveId);
            Toast.success('存檔已刪除');
            this.render('saves-panel-content');
        });
    }
}

// 創建全局單例
const saveUI = new SaveUI();

// 掛載到全局
if (typeof window !== 'undefined') {
    window.saveUI = saveUI;
    window.SaveUI = SaveUI;
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SaveUI, saveUI };
}
