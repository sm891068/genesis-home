// ========================================
// 核心遊戲狀態管理系統（Core Game State）
// 主選單 UI & 遊戲畫面 UI 共同讀取
// ========================================

/**
 * 全局遊戲狀態對象
 * 透過 localStorage 持久化存儲
 */
const GameState = {
    // ========== 當前遊戲狀態 ==========
    current: {
        route: null,              // 當前路線 (A/B/C/D/E/F)
        routeName: '',            // 路線名稱
        gangName: '',             // 幫派名稱
        playerName: '',           // 玩家名稱
        money: 10000,             // 資金
        crew: 5,                  // 人手
        reputation: 50,           // 聲望
        day: 1,                   // 天數
        grid: [],                 // 地圖格子數據
        partners: [],             // 已招募夥伴（完整對象）
        harem: [],                // 後宮成員 ID 列表
        currentSaveId: null,      // 當前存檔 ID
        diary: [],                // 日記記錄
        unlockedPartners: [],     // 已解鎖圖鑑的夥伴 ID
        achievements: [],         // 已解鎖成就 ID
        tutorialCompleted: false, // 是否完成教學
        settings: {
            bgm: true,
            sfxVolume: 70,
            textSpeed: 'normal',
            autoSave: true,
            notification: true,
            fontSize: 'medium',
            vibration: false
        }
    },

    // ========== 存檔管理 ==========
    saves: [],

    /**
     * 初始化遊戲狀態
     * 從 localStorage 讀取存檔和設定
     */
    init() {
        console.log('[GameState] 初始化遊戲狀態...');
        
        // 讀取存檔列表
        const savesData = localStorage.getItem('underworld_saves');
        if (savesData) {
            try {
                this.saves = JSON.parse(savesData);
                console.log(`[GameState] 載入 ${this.saves.length} 個存檔`);
            } catch (e) {
                console.error('[GameState] 存檔數據解析失敗:', e);
                this.saves = [];
            }
        }

        // 讀取設定
        const settingsData = localStorage.getItem('underworld_settings');
        if (settingsData) {
            try {
                this.current.settings = { ...this.current.settings, ...JSON.parse(settingsData) };
                console.log('[GameState] 載入用戶設定');
            } catch (e) {
                console.error('[GameState] 設定數據解析失敗:', e);
            }
        }

        // 讀取圖鑑解鎖記錄
        const unlockedData = localStorage.getItem('underworld_unlocked_partners');
        if (unlockedData) {
            try {
                this.current.unlockedPartners = JSON.parse(unlockedData);
                console.log(`[GameState] 載入 ${this.current.unlockedPartners.length} 個已解鎖圖鑑`);
            } catch (e) {
                console.error('[GameState] 圖鑑數據解析失敗:', e);
            }
        }

        // 讀取成就解鎖記錄
        const achievementsData = localStorage.getItem('underworld_achievements');
        if (achievementsData) {
            try {
                this.current.achievements = JSON.parse(achievementsData);
                console.log(`[GameState] 載入 ${this.current.achievements.length} 個已解鎖成就`);
            } catch (e) {
                console.error('[GameState] 成就數據解析失敗:', e);
            }
        }

        return this;
    },

    /**
     * 新遊戲初始化
     * @param {string} route - 路線 ID (A-F)
     * @param {string} gangName - 幫派名稱
     * @param {string} playerName - 玩家名稱
     */
    newGame(route, gangName, playerName = '老大') {
        console.log(`[GameState] 開始新遊戲 - 路線: ${route}, 幫派: ${gangName}`);
        
        // 載入路線數據（需要先引入 routes-data.js）
        const routeData = window.ROUTES_DATA?.routes?.[route];
        if (!routeData) {
            console.error(`[GameState] 路線 ${route} 不存在！`);
            return false;
        }

        // 重置遊戲狀態
        this.current = {
            route: route,
            routeName: routeData.name,
            gangName: gangName,
            playerName: playerName,
            money: routeData.startMoney || 10000,
            crew: 5,
            reputation: routeData.startReputation || 50,
            day: 1,
            grid: [],
            partners: [],
            harem: [],
            currentSaveId: null,
            diary: [],
            unlockedPartners: [...this.current.unlockedPartners],  // 保留圖鑑解鎖記錄
            achievements: [...this.current.achievements],          // 保留成就記錄
            tutorialCompleted: false,
            settings: { ...this.current.settings }                 // 保留設定
        };

        // 添加初始夥伴
        if (routeData.startPartners && window.CORE_PARTNERS) {
            routeData.startPartners.forEach(partnerId => {
                const partnerTemplate = window.CORE_PARTNERS.find(p => p.id === partnerId);
                if (partnerTemplate) {
                    this.recruitPartner(partnerId);
                    console.log(`[GameState] 添加初始夥伴: ${partnerTemplate.name}`);
                }
            });
        }

        // 初始化地圖格子
        this._initGrid();

        // 自動保存
        this.autoSave();

        return true;
    },

    /**
     * 初始化地圖格子（6×6）
     */
    _initGrid() {
        this.current.grid = [];
        
        for (let i = 0; i < 36; i++) {
            const cell = { 
                id: i, 
                type: 'empty', 
                level: 0,
                income: 0
            };
            
            // 中心為總部
            if (i === 14) {  // 第3行第3列 (6×6 grid)
                cell.type = 'hq';
                cell.level = 1;
            }
            
            this.current.grid.push(cell);
        }
    },

    /**
     * 招募夥伴
     * @param {string} partnerId - 夥伴 ID
     * @param {number} level - 初始等級（默認 1）
     */
    recruitPartner(partnerId, level = 1) {
        // 檢查是否已招募
        if (this.current.partners.find(p => p.id === partnerId)) {
            console.warn(`[GameState] 夥伴 ${partnerId} 已存在`);
            return false;
        }

        // 從核心數據庫獲取夥伴模板
        const template = window.CORE_PARTNERS?.find(p => p.id === partnerId);
        if (!template) {
            console.error(`[GameState] 找不到夥伴模板: ${partnerId}`);
            return false;
        }

        // 創建夥伴實例
        const partner = {
            ...template,
            level: level,
            exp: 0,
            submission: 0,  // 屈服度（0-200%）
            loyalty: 50,    // 忠誠度（0-100%）
            mood: 50,       // 心情（0-100%）
            inHarem: false  // 是否在後宮
        };

        this.current.partners.push(partner);

        // 解鎖圖鑑
        this.unlockPartner(partnerId);

        console.log(`[GameState] 招募夥伴成功: ${partner.name} (Lv.${level})`);
        return partner;
    },

    /**
     * 解鎖圖鑑
     * @param {string} partnerId - 夥伴 ID
     */
    unlockPartner(partnerId) {
        if (!this.current.unlockedPartners.includes(partnerId)) {
            this.current.unlockedPartners.push(partnerId);
            localStorage.setItem('underworld_unlocked_partners', JSON.stringify(this.current.unlockedPartners));
            console.log(`[GameState] 解鎖圖鑑: ${partnerId}`);
        }
    },

    /**
     * 解鎖成就
     * @param {string} achievementId - 成就 ID
     */
    unlockAchievement(achievementId) {
        if (!this.current.achievements.includes(achievementId)) {
            this.current.achievements.push(achievementId);
            localStorage.setItem('underworld_achievements', JSON.stringify(this.current.achievements));
            console.log(`[GameState] 解鎖成就: ${achievementId}`);
            
            // 觸發事件通知
            window.dispatchEvent(new CustomEvent('achievement-unlocked', { 
                detail: { id: achievementId } 
            }));
        }
    },

    /**
     * 保存遊戲
     * @param {string} saveName - 存檔名稱（可選）
     */
    save(saveName = null) {
        const saveData = {
            id: this.current.currentSaveId || Date.now(),
            name: saveName || this.current.gangName,
            route: this.current.routeName,
            day: this.current.day,
            money: this.current.money,
            reputation: this.current.reputation,
            timestamp: new Date().toLocaleString('zh-TW'),
            data: JSON.parse(JSON.stringify(this.current))  // 深拷貝
        };

        // 更新或新增存檔
        const existingIndex = this.saves.findIndex(s => s.id === saveData.id);
        if (existingIndex >= 0) {
            this.saves[existingIndex] = saveData;
        } else {
            this.saves.push(saveData);
        }

        // 保存到 localStorage
        localStorage.setItem('underworld_saves', JSON.stringify(this.saves));
        console.log(`[GameState] 遊戲已保存: ${saveData.name} (ID: ${saveData.id})`);

        return saveData;
    },

    /**
     * 自動保存
     */
    autoSave() {
        if (this.current.settings.autoSave) {
            return this.save(`自動存檔 - ${this.current.gangName}`);
        }
    },

    /**
     * 載入存檔
     * @param {number} saveId - 存檔 ID
     */
    load(saveId) {
        const save = this.saves.find(s => s.id === saveId);
        if (!save) {
            console.error(`[GameState] 找不到存檔: ${saveId}`);
            return false;
        }

        this.current = JSON.parse(JSON.stringify(save.data));  // 深拷貝
        this.current.currentSaveId = saveId;

        console.log(`[GameState] 載入存檔: ${save.name} (Day ${save.day})`);
        return true;
    },

    /**
     * 刪除存檔
     * @param {number} saveId - 存檔 ID
     */
    deleteSave(saveId) {
        this.saves = this.saves.filter(s => s.id !== saveId);
        localStorage.setItem('underworld_saves', JSON.stringify(this.saves));
        console.log(`[GameState] 刪除存檔: ${saveId}`);
    },

    /**
     * 獲取最新存檔
     */
    getLatestSave() {
        if (this.saves.length === 0) return null;
        return this.saves.reduce((latest, current) => 
            current.id > latest.id ? current : latest
        );
    },

    /**
     * 保存設定
     */
    saveSettings() {
        localStorage.setItem('underworld_settings', JSON.stringify(this.current.settings));
        console.log('[GameState] 設定已保存');
    },

    /**
     * 清除所有數據（重置遊戲）
     */
    clearAll() {
        localStorage.removeItem('underworld_saves');
        localStorage.removeItem('underworld_settings');
        localStorage.removeItem('underworld_unlocked_partners');
        localStorage.removeItem('underworld_achievements');
        
        this.saves = [];
        this.current = {
            route: null,
            routeName: '',
            gangName: '',
            playerName: '',
            money: 10000,
            crew: 5,
            reputation: 50,
            day: 1,
            grid: [],
            partners: [],
            harem: [],
            currentSaveId: null,
            diary: [],
            unlockedPartners: [],
            achievements: [],
            tutorialCompleted: false,
            settings: {
                bgm: true,
                sfxVolume: 70,
                textSpeed: 'normal',
                autoSave: true,
                notification: true,
                fontSize: 'medium',
                vibration: false
            }
        };

        console.log('[GameState] 所有數據已清除');
    }
};

// 自動初始化
if (typeof window !== 'undefined') {
    GameState.init();
    window.GameState = GameState;  // 掛載到全局
    console.log('[GameState] 核心狀態管理系統已就緒');
}

// 導出（支持模組化加載）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameState;
}
