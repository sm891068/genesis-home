// ========================================
// 後宮系統模組（Harem System）
// 主選單 UI & 遊戲畫面 UI 共同讀取
// 需依賴：core/game-state.js, core-partners-20.js
// ========================================

class HaremSystem {
    constructor() {
        this.initialized = false;
    }
    
    // 初始化
    init() {
        if (this.initialized) return;
        
        // 檢查依賴
        if (typeof GameState === 'undefined') {
            console.error('[HaremSystem] 缺少 GameState，請先載入 game-state.js');
            return false;
        }
        
        console.log('[HaremSystem] 💃 後宮系統初始化完成');
        this.initialized = true;
        return true;
    }
    
    // 檢查夥伴是否符合後宮資格（SR+ 女性）
    isEligible(partner) {
        if (!partner) return false;
        
        const eligibleRarities = ['SR', 'SSR', 'UR', 'LR'];
        return partner.gender === 'female' && eligibleRarities.includes(partner.rarity);
    }
    
    // 檢查是否可以加入後宮（需要屈服度 >= 20%）
    canJoinHarem(partnerId) {
        const partner = this.getPartnerData(partnerId);
        if (!partner || !this.isEligible(partner)) return false;
        
        const partnerState = GameState.current.partners.find(p => p.id === partnerId);
        if (!partnerState) return false;
        
        return partnerState.submission >= 20;
    }
    
    // 加入後宮
    addToHarem(partnerId) {
        if (!this.canJoinHarem(partnerId)) {
            return { success: false, message: '不符合後宮加入條件' };
        }
        
        // 檢查是否已在後宮
        if (GameState.current.harem.includes(partnerId)) {
            return { success: false, message: '已在後宮中' };
        }
        
        // 加入後宮
        GameState.current.harem.push(partnerId);
        
        // 更新夥伴狀態
        const partnerState = GameState.current.partners.find(p => p.id === partnerId);
        if (partnerState) {
            partnerState.inHarem = true;
        }
        
        GameState.autoSave();
        
        const partner = this.getPartnerData(partnerId);
        return {
            success: true,
            message: `💃 ${partner.name} 加入了後宮`,
            partner
        };
    }
    
    // 提升屈服度
    increaseSubmission(partnerId, amount = 10) {
        const partner = this.getPartnerData(partnerId);
        if (!partner || !this.isEligible(partner)) {
            return { success: false, message: '該夥伴不符合後宮資格' };
        }
        
        const partnerState = GameState.current.partners.find(p => p.id === partnerId);
        if (!partnerState) {
            return { success: false, message: '夥伴不存在' };
        }
        
        const oldLevel = Math.floor(partnerState.submission / 20);
        partnerState.submission = Math.min(200, partnerState.submission + amount);
        const newLevel = Math.floor(partnerState.submission / 20);
        
        GameState.autoSave();
        
        // 檢查是否解鎖新階段
        let unlockedContent = null;
        if (newLevel > oldLevel) {
            unlockedContent = this.getSubmissionStageContent(partner, newLevel);
        }
        
        // 檢查是否可以加入後宮
        if (partnerState.submission >= 20 && !partnerState.inHarem) {
            this.addToHarem(partnerId);
        }
        
        return {
            success: true,
            oldSubmission: partnerState.submission - amount,
            newSubmission: partnerState.submission,
            oldLevel,
            newLevel,
            unlockedContent,
            partner
        };
    }
    
    // 獲取屈服度階段內容
    getSubmissionStageContent(partner, stage) {
        const stageNames = [
            '基礎對話',
            '個人任務',
            '接受禮物',
            '深度交流',
            '親密內容',
            '專屬技能',
            '故事分支',
            '隱藏劇情',
            '特殊結局',
            '完全屈服',
            '究極獻身'
        ];
        
        return {
            stage,
            name: stageNames[stage] || '未知階段',
            dialogue: partner.submissionStages ? partner.submissionStages[stage * 20] : null
        };
    }
    
    // 獲取後宮成員列表
    getHaremMembers() {
        if (!GameState.current.harem || GameState.current.harem.length === 0) {
            return [];
        }
        
        return GameState.current.harem.map(id => {
            const partner = this.getPartnerData(id);
            const state = GameState.current.partners.find(p => p.id === id);
            
            if (!partner || !state) return null;
            
            return {
                ...partner,
                ...state,
                submissionStage: Math.floor(state.submission / 20)
            };
        }).filter(p => p !== null);
    }
    
    // 獲取夥伴完整數據
    getPartnerData(partnerId) {
        if (typeof window.CORE_PARTNERS !== 'undefined') {
            return window.CORE_PARTNERS.find(p => p.id === partnerId);
        }
        return null;
    }
    
    // 渲染後宮面板UI
    renderHaremPanel(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const members = this.getHaremMembers();
        
        if (members.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:60px 20px; color:#888;">
                    <div style="font-size:60px; margin-bottom:20px;">💃</div>
                    <div style="font-size:18px; margin-bottom:10px;">後宮目前沒有成員</div>
                    <div style="font-size:14px; color:#666;">
                        招募 SR 以上女性夥伴<br>
                        提升屈服度至 20% 以上即可加入
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:15px; padding:20px;">
                ${members.map(m => this.renderHaremCard(m)).join('')}
            </div>
        `;
    }
    
    // 渲染後宮卡片
    renderHaremCard(member) {
        const rarityColors = {
            'SR': '#3498db',
            'SSR': '#9b59b6',
            'UR': '#e74c3c',
            'LR': '#f1c40f'
        };
        
        const color = rarityColors[member.rarity] || '#888';
        
        return `
            <div class="harem-card" 
                 onclick="haremSystem.showMemberDetail('${member.id}')"
                 style="cursor:pointer; background:rgba(0,0,0,0.4); border:2px solid ${color}; border-radius:12px; padding:15px; transition:all 0.3s;"
                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(212,175,55,0.3)';"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                <div style="text-align:center; margin-bottom:10px;">
                    <div style="font-size:60px;">${member.avatar}</div>
                    <div style="font-weight:bold; color:#fff; margin-top:8px;">${member.name}</div>
                    <div style="font-size:12px; color:${color};">${member.rarity} ${member.rarityData?.label || ''}</div>
                </div>
                <div style="margin-bottom:8px;">
                    <div style="display:flex; justify-content:space-between; font-size:12px; color:#aaa; margin-bottom:4px;">
                        <span>屈服度</span>
                        <span style="color:#ff1493;">${member.submission}%</span>
                    </div>
                    <div style="height:6px; background:rgba(0,0,0,0.3); border-radius:3px; overflow:hidden;">
                        <div style="height:100%; background:linear-gradient(90deg, #ff1493, #ff69b4); width:${member.submission/2}%; transition:width 0.3s;"></div>
                    </div>
                </div>
                <div style="font-size:11px; color:#888; text-align:center;">
                    階段 ${member.submissionStage}/10
                </div>
            </div>
        `;
    }
    
    // 顯示成員詳情
    showMemberDetail(partnerId) {
        console.log('顯示後宮成員詳情:', partnerId);
        // TODO: 實作詳情面板
        alert(`後宮成員詳情功能開發中\nID: ${partnerId}`);
    }
    
    // 互動功能（提升屈服度）
    interact(partnerId) {
        const result = this.increaseSubmission(partnerId, 10);
        
        if (result.success) {
            let message = `💖 ${result.partner.name} 的屈服度提升至 ${result.newSubmission}%`;
            
            if (result.unlockedContent) {
                message += `\n🔓 解鎖：${result.unlockedContent.name}`;
            }
            
            // 顯示提示
            if (typeof window.Toast !== 'undefined') {
                window.Toast.success(message);
            } else if (typeof showToast === 'function') {
                showToast(message);
            } else {
                alert(message);
            }
            
            // 重新渲染
            this.renderHaremPanel('harem-content');
        }
        
        return result;
    }
}

// 創建全局單例
const haremSystem = new HaremSystem();

// 自動初始化
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        haremSystem.init();
    });
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HaremSystem, haremSystem };
}
