// ========================================
// 夥伴系統模組（Partner System）
// 主選單 UI & 遊戲畫面 UI 共同讀取
// 需依賴：core/game-state.js, core-partners-20.js, partner-data.js
// ========================================

class PartnerSystem {
    constructor() {
        this.initialized = false;
    }

    // 初始化
    init() {
        if (this.initialized) return;
        
        // 檢查依賴
        if (typeof GameState === 'undefined') {
            console.error('[PartnerSystem] 缺少 GameState，請先載入 game-state.js');
            return false;
        }
        
        console.log('[PartnerSystem] 👥 夥伴系統初始化完成');
        this.initialized = true;
        return true;
    }

    /**
     * 招募夥伴
     * @param {string} partnerId - 夥伴 ID
     * @param {number} level - 初始等級
     */
    recruit(partnerId, level = 1) {
        return GameState.recruitPartner(partnerId, level);
    }

    /**
     * 升級夥伴
     * @param {string} partnerId - 夥伴 ID
     */
    levelUp(partnerId) {
        const partner = this.getPartner(partnerId);
        if (!partner) {
            return { success: false, message: '找不到該夥伴' };
        }

        const template = this.getPartnerTemplate(partnerId);
        if (!template) {
            return { success: false, message: '找不到夥伴模板數據' };
        }

        // 檢查是否達到等級上限
        const rarityData = this.getRarityData(template.rarity);
        if (!rarityData) {
            return { success: false, message: '稀有度數據錯誤' };
        }

        if (partner.level >= rarityData.maxLevel) {
            return { success: false, message: `已達到最高等級 ${rarityData.maxLevel}` };
        }

        // 計算升級費用
        const cost = this.calculateLevelUpCost(partner.level, template.rarity);
        if (GameState.current.money < cost) {
            return { success: false, message: `資金不足，需要 $${cost.toLocaleString()}` };
        }

        // 扣除費用
        GameState.current.money -= cost;

        // 升級
        const oldLevel = partner.level;
        partner.level++;
        partner.exp = 0;

        // 計算屬性成長（每級 +5%）
        const growthRate = 0.05;
        partner.currentStats = {
            STR: Math.floor(template.baseStats.STR * (1 + partner.level * growthRate)),
            DEF: Math.floor(template.baseStats.DEF * (1 + partner.level * growthRate)),
            AGI: Math.floor(template.baseStats.AGI * (1 + partner.level * growthRate)),
            INT: Math.floor(template.baseStats.INT * (1 + partner.level * growthRate)),
            WIS: Math.floor(template.baseStats.WIS * (1 + partner.level * growthRate))
        };

        // 重新計算戰力
        const power = this.calculatePower(partnerId);

        GameState.autoSave();

        return {
            success: true,
            message: `${template.name} 升級至 Lv.${partner.level}`,
            oldLevel,
            newLevel: partner.level,
            cost,
            power,
            stats: partner.currentStats
        };
    }

    /**
     * 計算升級費用
     * @param {number} currentLevel - 當前等級
     * @param {string} rarity - 稀有度
     */
    calculateLevelUpCost(currentLevel, rarity) {
        const baseRarityCost = {
            'N': 100,
            'R': 200,
            'SR': 500,
            'SSR': 1000,
            'UR': 2000,
            'LR': 5000
        };

        const baseCost = baseRarityCost[rarity] || 100;
        return Math.floor(baseCost * Math.pow(1.5, currentLevel - 1));
    }

    /**
     * 計算夥伴戰力
     * @param {string} partnerId - 夥伴 ID
     */
    calculatePower(partnerId) {
        const partner = this.getPartner(partnerId);
        const template = this.getPartnerTemplate(partnerId);
        
        if (!partner || !template) return 0;

        const rarityData = this.getRarityData(template.rarity);
        if (!rarityData) return 0;

        // 基礎戰力 = 所有屬性之和
        const stats = partner.currentStats || template.baseStats;
        const baseStats = Object.values(stats).reduce((sum, val) => sum + val, 0);

        // 等級加成
        const levelBonus = partner.level * 10;

        // 稀有度乘數
        const rarityMultiplier = rarityData.multiplier;

        // 總戰力 = (基礎屬性 + 等級加成) × 稀有度乘數
        return Math.floor((baseStats + levelBonus) * rarityMultiplier);
    }

    /**
     * 獲取夥伴實例數據
     * @param {string} partnerId - 夥伴 ID
     */
    getPartner(partnerId) {
        return GameState.current.partners.find(p => p.id === partnerId);
    }

    /**
     * 獲取夥伴模板數據
     * @param {string} partnerId - 夥伴 ID
     */
    getPartnerTemplate(partnerId) {
        if (typeof window.CORE_PARTNERS !== 'undefined') {
            return window.CORE_PARTNERS.find(p => p.id === partnerId);
        }
        return null;
    }

    /**
     * 獲取稀有度數據
     * @param {string} rarity - 稀有度 (N/R/SR/SSR/UR/LR)
     */
    getRarityData(rarity) {
        if (typeof window.RARITY_SYSTEM === 'undefined') return null;
        return window.RARITY_SYSTEM[rarity];
    }

    /**
     * 獲取職業數據
     * @param {string} job - 職業 ID
     */
    getJobData(job) {
        if (typeof window.JOB_SYSTEM === 'undefined') return null;
        return window.JOB_SYSTEM[job];
    }

    /**
     * 獲取技能數據
     * @param {string} skillId - 技能 ID
     */
    getSkillData(skillId) {
        if (typeof window.SKILL_CATALOG === 'undefined') return null;
        return window.SKILL_CATALOG[skillId];
    }

    /**
     * 獲取所有已招募夥伴
     */
    getAllPartners() {
        return GameState.current.partners.map(p => {
            const template = this.getPartnerTemplate(p.id);
            return {
                ...template,
                ...p,
                power: this.calculatePower(p.id)
            };
        });
    }

    /**
     * 獲取已解鎖圖鑑
     */
    getUnlockedPartners() {
        return GameState.current.unlockedPartners;
    }

    /**
     * 檢查是否已解鎖圖鑑
     * @param {string} partnerId - 夥伴 ID
     */
    isUnlocked(partnerId) {
        return GameState.current.unlockedPartners.includes(partnerId);
    }

    /**
     * 渲染夥伴列表 UI
     * @param {string} containerId - 容器 ID
     */
    renderPartnerList(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const partners = this.getAllPartners();

        if (partners.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:60px 20px; color:#888;">
                    <div style="font-size:60px; margin-bottom:20px;">👥</div>
                    <div style="font-size:18px; margin-bottom:10px;">尚未招募任何夥伴</div>
                    <div style="font-size:14px; color:#666;">
                        前往世界地圖招募夥伴
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:15px; padding:20px;">
                ${partners.map(p => this.renderPartnerCard(p)).join('')}
            </div>
        `;
    }

    /**
     * 渲染夥伴卡片
     * @param {Object} partner - 夥伴完整數據
     */
    renderPartnerCard(partner) {
        const rarityColors = {
            'N': '#ddd',
            'R': '#27ae60',
            'SR': '#3498db',
            'SSR': '#9b59b6',
            'UR': '#e74c3c',
            'LR': '#f1c40f'
        };

        const color = rarityColors[partner.rarity] || '#888';
        const rarityData = this.getRarityData(partner.rarity);
        const jobData = this.getJobData(partner.job);

        return `
            <div class="partner-card" 
                 onclick="partnerSystem.showPartnerDetail('${partner.id}')"
                 style="cursor:pointer; background:rgba(0,0,0,0.4); border:2px solid ${color}; border-radius:12px; padding:15px; transition:all 0.3s;"
                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(212,175,55,0.3)';"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                <div style="text-align:center; margin-bottom:10px;">
                    <div style="font-size:60px;">${partner.avatar}</div>
                    <div style="font-weight:bold; color:#fff; margin-top:8px;">${partner.name}</div>
                    <div style="font-size:12px; color:${color};">${rarityData?.label || partner.rarity}</div>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:12px; color:#aaa; margin-bottom:8px;">
                    <span>${jobData?.name || partner.job}</span>
                    <span style="color:var(--gold);">Lv.${partner.level}</span>
                </div>
                <div style="text-align:center; margin-top:8px;">
                    <div style="font-size:11px; color:#888; margin-bottom:4px;">戰力</div>
                    <div style="font-size:18px; color:var(--gold); font-weight:700;">${partner.power.toLocaleString()}</div>
                </div>
                ${partner.haremEligible && partner.inHarem ? `
                    <div style="text-align:center; margin-top:8px;">
                        <span style="background:linear-gradient(90deg, #ff1493, #ff69b4); padding:4px 12px; border-radius:12px; font-size:11px; color:#fff;">💃 後宮</span>
                    </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * 顯示夥伴詳情面板
     * @param {string} partnerId - 夥伴 ID
     */
    showPartnerDetail(partnerId) {
        console.log('[PartnerSystem] 顯示夥伴詳情:', partnerId);
        
        const partner = this.getPartner(partnerId);
        const template = this.getPartnerTemplate(partnerId);
        
        if (!partner || !template) {
            if (typeof window.Toast !== 'undefined') {
                window.Toast.error('找不到該夥伴');
            }
            return;
        }

        // TODO: 顯示詳細面板（包含屬性、技能、升級按鈕等）
        alert(`夥伴詳情面板開發中\nID: ${partnerId}\n名稱: ${template.name}\n等級: ${partner.level}\n戰力: ${this.calculatePower(partnerId)}`);
    }
}

// 創建全局單例
const partnerSystem = new PartnerSystem();

// 自動初始化
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        partnerSystem.init();
    });
    
    window.partnerSystem = partnerSystem;
    window.PartnerSystem = PartnerSystem;
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PartnerSystem, partnerSystem };
}
