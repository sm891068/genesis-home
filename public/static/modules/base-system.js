// ========================================
// 基地系統模組（Base System）
// 主選單 UI & 遊戲畫面 UI 共同讀取
// 需依賴：core/game-state.js
// ========================================

// 建築類型定義
const BUILDING_TYPES = {
    'empty': { 
        icon: '⬜', 
        name: '空地', 
        income: 0, 
        maxLevel: 0,
        buildCost: 0,
        upgradeCost: 0
    },
    'hq': { 
        icon: '🏰', 
        name: '總部', 
        income: 0, 
        maxLevel: 10,
        buildCost: 0,  // 總部不能建造
        upgradeCost: (level) => 5000 * Math.pow(1.5, level - 1),
        description: '幫派總部，提升人手上限和防禦力'
    },
    'shop': { 
        icon: '🏪', 
        name: '便利商店', 
        income: 300, 
        maxLevel: 10,
        buildCost: 1000,
        upgradeCost: (level) => 500 * Math.pow(1.3, level - 1),
        description: '提供穩定收益'
    },
    'ktv': { 
        icon: '🎤', 
        name: 'KTV', 
        income: 600, 
        maxLevel: 10,
        buildCost: 3000,
        upgradeCost: (level) => 800 * Math.pow(1.4, level - 1),
        description: '娛樂場所，高收益'
    },
    'casino': {
        icon: '🎰',
        name: '賭場',
        income: 1000,
        maxLevel: 10,
        buildCost: 8000,
        upgradeCost: (level) => 1500 * Math.pow(1.5, level - 1),
        description: '高風險高收益，偶爾觸發特殊事件'
    },
    'nightclub': {
        icon: '🍾',
        name: '夜店',
        income: 1200,
        maxLevel: 10,
        buildCost: 10000,
        upgradeCost: (level) => 2000 * Math.pow(1.5, level - 1),
        description: '頂級娛樂場所，吸引高端客戶'
    },
    'hospital': { 
        icon: '🏥', 
        name: '醫療室', 
        income: 0, 
        maxLevel: 5,
        buildCost: 2000,
        upgradeCost: (level) => 1000 * Math.pow(1.3, level - 1),
        description: '提升夥伴恢復速度'
    },
    'warehouse': {
        icon: '📦',
        name: '倉庫',
        income: 0,
        maxLevel: 5,
        buildCost: 1500,
        upgradeCost: (level) => 700 * Math.pow(1.2, level - 1),
        description: '增加物資存儲上限'
    },
    'training': {
        icon: '💪',
        name: '訓練場',
        income: 0,
        maxLevel: 10,
        buildCost: 5000,
        upgradeCost: (level) => 1200 * Math.pow(1.4, level - 1),
        description: '提升夥伴升級經驗獲得'
    },
    'garage': {
        icon: '🚗',
        name: '車庫',
        income: 0,
        maxLevel: 5,
        buildCost: 3000,
        upgradeCost: (level) => 1000 * Math.pow(1.3, level - 1),
        description: '解鎖更多載具，提升行動力'
    }
};

class BaseSystem {
    constructor() {
        this.initialized = false;
    }

    // 初始化
    init() {
        if (this.initialized) return;
        
        // 檢查依賴
        if (typeof GameState === 'undefined') {
            console.error('[BaseSystem] 缺少 GameState，請先載入 game-state.js');
            return false;
        }
        
        console.log('[BaseSystem] 🏰 基地系統初始化完成');
        this.initialized = true;
        return true;
    }

    /**
     * 獲取建築類型數據
     * @param {string} type - 建築類型
     */
    getBuildingType(type) {
        return BUILDING_TYPES[type] || BUILDING_TYPES['empty'];
    }

    /**
     * 獲取所有可建造的建築類型
     */
    getBuildableTypes() {
        return Object.keys(BUILDING_TYPES).filter(type => 
            type !== 'empty' && type !== 'hq' && BUILDING_TYPES[type].buildCost > 0
        );
    }

    /**
     * 建造建築
     * @param {number} cellIndex - 格子索引
     * @param {string} buildingType - 建築類型
     */
    build(cellIndex, buildingType) {
        const cell = GameState.current.grid[cellIndex];
        if (!cell) {
            return { success: false, message: '無效的格子' };
        }

        if (cell.type !== 'empty') {
            return { success: false, message: '該位置已有建築' };
        }

        const building = this.getBuildingType(buildingType);
        if (!building || building.buildCost === 0) {
            return { success: false, message: '無法建造該類型建築' };
        }

        // 檢查資金
        if (GameState.current.money < building.buildCost) {
            return { 
                success: false, 
                message: `資金不足，需要 $${building.buildCost.toLocaleString()}` 
            };
        }

        // 扣除費用
        GameState.current.money -= building.buildCost;

        // 建造
        cell.type = buildingType;
        cell.level = 1;
        cell.income = building.income;

        GameState.autoSave();

        return {
            success: true,
            message: `成功建造 ${building.name}`,
            building: building,
            cost: building.buildCost,
            cell: cell
        };
    }

    /**
     * 升級建築
     * @param {number} cellIndex - 格子索引
     */
    upgrade(cellIndex) {
        const cell = GameState.current.grid[cellIndex];
        if (!cell) {
            return { success: false, message: '無效的格子' };
        }

        if (cell.type === 'empty') {
            return { success: false, message: '該位置沒有建築' };
        }

        const building = this.getBuildingType(cell.type);
        
        // 檢查是否達到最高等級
        if (cell.level >= building.maxLevel) {
            return { success: false, message: `已達到最高等級 ${building.maxLevel}` };
        }

        // 計算升級費用
        const cost = typeof building.upgradeCost === 'function' 
            ? building.upgradeCost(cell.level) 
            : building.upgradeCost;

        // 檢查資金
        if (GameState.current.money < cost) {
            return { 
                success: false, 
                message: `資金不足，需要 $${cost.toLocaleString()}` 
            };
        }

        // 扣除費用
        GameState.current.money -= cost;

        // 升級
        const oldLevel = cell.level;
        cell.level++;

        // 更新收益（每級 +20%）
        if (building.income > 0) {
            cell.income = Math.floor(building.income * Math.pow(1.2, cell.level - 1));
        }

        GameState.autoSave();

        return {
            success: true,
            message: `${building.name} 升級至 Lv.${cell.level}`,
            building: building,
            oldLevel: oldLevel,
            newLevel: cell.level,
            cost: cost,
            newIncome: cell.income
        };
    }

    /**
     * 拆除建築（返還 50% 費用）
     * @param {number} cellIndex - 格子索引
     */
    demolish(cellIndex) {
        const cell = GameState.current.grid[cellIndex];
        if (!cell) {
            return { success: false, message: '無效的格子' };
        }

        if (cell.type === 'empty') {
            return { success: false, message: '該位置沒有建築' };
        }

        if (cell.type === 'hq') {
            return { success: false, message: '總部無法拆除' };
        }

        const building = this.getBuildingType(cell.type);
        
        // 計算返還金額（建造費用 50% + 升級費用總和 50%）
        let refund = Math.floor(building.buildCost * 0.5);
        
        for (let i = 1; i < cell.level; i++) {
            const upgradeCost = typeof building.upgradeCost === 'function' 
                ? building.upgradeCost(i) 
                : building.upgradeCost;
            refund += Math.floor(upgradeCost * 0.5);
        }

        // 返還金額
        GameState.current.money += refund;

        // 拆除
        const oldType = cell.type;
        cell.type = 'empty';
        cell.level = 0;
        cell.income = 0;

        GameState.autoSave();

        return {
            success: true,
            message: `拆除 ${building.name}，返還 $${refund.toLocaleString()}`,
            building: building,
            refund: refund
        };
    }

    /**
     * 計算總日收益
     */
    calculateDailyIncome() {
        let totalIncome = 0;

        GameState.current.grid.forEach(cell => {
            if (cell.type !== 'empty' && cell.income > 0) {
                totalIncome += cell.income;
            }
        });

        return totalIncome;
    }

    /**
     * 計算總防禦力
     */
    calculateDefense() {
        let totalDefense = 0;

        // 總部防禦力（等級 × 50）
        const hq = GameState.current.grid.find(cell => cell.type === 'hq');
        if (hq) {
            totalDefense += hq.level * 50;
        }

        // 其他建築防禦力（等級 × 10）
        GameState.current.grid.forEach(cell => {
            if (cell.type !== 'empty' && cell.type !== 'hq') {
                totalDefense += cell.level * 10;
            }
        });

        return totalDefense;
    }

    /**
     * 計算總部等級
     */
    getHQLevel() {
        const hq = GameState.current.grid.find(cell => cell.type === 'hq');
        return hq ? hq.level : 0;
    }

    /**
     * 計算人手上限（基礎 5 + 總部等級 × 5）
     */
    getCrewCapacity() {
        return 5 + this.getHQLevel() * 5;
    }

    /**
     * 渲染基地管理面板
     * @param {string} containerId - 容器 ID
     */
    renderBasePanel(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const hqLevel = this.getHQLevel();
        const dailyIncome = this.calculateDailyIncome();
        const defense = this.calculateDefense();
        const capacity = this.getCrewCapacity();

        container.innerHTML = `
            <div class="base-stats" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:12px; margin-bottom:20px;">
                <div class="stat-card" style="background:rgba(0,0,0,0.4); border:1px solid var(--border); padding:16px; border-radius:10px; text-align:center;">
                    <div style="font-size:11px; color:#888; margin-bottom:8px;">基地等級</div>
                    <div style="font-size:24px; font-weight:700; color:var(--gold);">Lv. ${hqLevel}</div>
                </div>
                <div class="stat-card" style="background:rgba(0,0,0,0.4); border:1px solid var(--border); padding:16px; border-radius:10px; text-align:center;">
                    <div style="font-size:11px; color:#888; margin-bottom:8px;">日產量</div>
                    <div style="font-size:24px; font-weight:700; color:var(--gold);">$${dailyIncome.toLocaleString()}</div>
                </div>
                <div class="stat-card" style="background:rgba(0,0,0,0.4); border:1px solid var(--border); padding:16px; border-radius:10px; text-align:center;">
                    <div style="font-size:11px; color:#888; margin-bottom:8px;">防禦值</div>
                    <div style="font-size:24px; font-weight:700; color:var(--gold);">${defense}</div>
                </div>
                <div class="stat-card" style="background:rgba(0,0,0,0.4); border:1px solid var(--border); padding:16px; border-radius:10px; text-align:center;">
                    <div style="font-size:11px; color:#888; margin-bottom:8px;">容納人數</div>
                    <div style="font-size:24px; font-weight:700; color:var(--gold);">${GameState.current.crew} / ${capacity}</div>
                </div>
            </div>

            <div class="section" style="background:rgba(0,0,0,0.3); border-left:3px solid var(--gold); border-radius:0 10px 10px 0; padding:16px;">
                <h4 style="font-size:14px; color:var(--gold); margin-bottom:12px;">🏢 設施列表</h4>
                <div id="building-list" style="display:flex; flex-direction:column; gap:10px;">
                    ${this.renderBuildingList()}
                </div>
            </div>
        `;
    }

    /**
     * 渲染建築列表
     */
    renderBuildingList() {
        const buildings = GameState.current.grid
            .map((cell, index) => ({ ...cell, index }))
            .filter(cell => cell.type !== 'empty');

        if (buildings.length === 0) {
            return '<div style="text-align:center; color:#666; padding:20px;">尚無建築</div>';
        }

        return buildings.map(cell => {
            const building = this.getBuildingType(cell.type);
            const upgradeCost = cell.type !== 'hq' && cell.level < building.maxLevel
                ? (typeof building.upgradeCost === 'function' 
                    ? building.upgradeCost(cell.level) 
                    : building.upgradeCost)
                : 0;

            return `
                <div class="building-item" style="background:rgba(255,255,255,0.05); border:1px solid rgba(212,175,55,0.2); padding:12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; gap:12px; align-items:center;">
                        <div style="font-size:24px;">${building.icon}</div>
                        <div>
                            <div style="font-size:13px; font-weight:600; color:#fff;">${building.name}</div>
                            <div style="font-size:10px; color:#888;">
                                Lv.${cell.level}${cell.income > 0 ? ` | 收益: $${cell.income}/天` : ''}
                            </div>
                        </div>
                    </div>
                    <div style="display:flex; gap:8px;">
                        ${cell.level < building.maxLevel ? `
                            <button onclick="baseSystem.upgradeBuilding(${cell.index})" 
                                    style="padding:6px 12px; background:transparent; border:1px solid var(--gold-dark); color:var(--text); font-size:11px; cursor:pointer; border-radius:4px;">
                                升級 $${upgradeCost.toLocaleString()}
                            </button>
                        ` : `
                            <span style="padding:6px 12px; font-size:11px; color:#666;">已滿級</span>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * UI 升級建築
     * @param {number} cellIndex - 格子索引
     */
    upgradeBuilding(cellIndex) {
        const result = this.upgrade(cellIndex);
        
        if (result.success) {
            if (typeof window.Toast !== 'undefined') {
                window.Toast.success(result.message);
            }
            
            // 重新渲染
            this.renderBasePanel('base-panel-content');
        } else {
            if (typeof window.Toast !== 'undefined') {
                window.Toast.error(result.message);
            }
        }
    }
}

// 創建全局單例
const baseSystem = new BaseSystem();

// 自動初始化
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        baseSystem.init();
    });
    
    window.baseSystem = baseSystem;
    window.BaseSystem = BaseSystem;
    window.BUILDING_TYPES = BUILDING_TYPES;
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BaseSystem, baseSystem, BUILDING_TYPES };
}
