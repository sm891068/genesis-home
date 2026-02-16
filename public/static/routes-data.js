// ========== 6條路線系統 ==========

const ROUTES_DATA = {
    'A': {
        id: 'A',
        name: '道義路線',
        subtitle: '別碰毒品，那是底線',
        quote: '「別碰毒品，那是底線。」',
        icon: '⚖️',
        color: '#3498db',
        description: '堅守底線，以道義治理幫派。拒絕毒品交易，專注合法灰色產業。',
        
        // 起始加成
        bonuses: {
            money: 10000,
            reputation: 65,
            crew: 3,
            special: {
                '聲望增長': '+15%',
                '正義夥伴招募': '成功率 +25%',
                '每週民望': '+5',
                '警察關係': '+20'
            }
        },
        
        // 起始夥伴（partner-data.js 中的 ID）
        startPartners: ['ssr_001', 'sr_001', 'r_001'],
        
        // 專屬建築
        uniqueBuildings: ['community_center', 'legal_office'],
        
        // 路線特性
        traits: ['正義', '聲望', '合法經營', '民心'],
        
        // 解鎖條件
        unlockConditions: {
            achievements: [],
            level: 1
        }
    },
    
    'B': {
        id: 'B',
        name: '資本路線',
        subtitle: '錢能解決的，都不是問題',
        quote: '「錢能解決的，都不是問題。」',
        icon: '💰',
        color: '#f1c40f',
        description: '金錢至上，用資本控制一切。高起始資金，專注經濟擴張。',
        
        bonuses: {
            money: 20000,
            reputation: 50,
            crew: 2,
            special: {
                '收益加成': '+20%',
                '賄賂成本': '-30%',
                '投資回報': '+15%',
                '黑市折扣': '-25%'
            }
        },
        
        startPartners: ['ssr_002', 'sr_002', 'r_002'],
        uniqueBuildings: ['investment_bank', 'money_laundry'],
        traits: ['資本', '經濟', '投資', '賄賂'],
        
        unlockConditions: {
            achievements: [],
            level: 1
        }
    },
    
    'C': {
        id: 'C',
        name: '聲望路線',
        subtitle: '尊重比恐懼更重要',
        quote: '「這城市，尊重比恐懼更重要。」',
        icon: '👑',
        color: '#9b59b6',
        description: '以聲望服人，建立江湖威信。高忠誠度，強大談判能力。',
        
        bonuses: {
            money: 12000,
            reputation: 80,
            crew: 4,
            special: {
                '忠誠度': '+25%',
                '談判成功率': '+30%',
                '每週聲望': '+8',
                '夥伴忠誠': '+20%'
            }
        },
        
        startPartners: ['ur_001', 'sr_003', 'r_003'],
        uniqueBuildings: ['respect_hall', 'negotiation_center'],
        traits: ['聲望', '忠誠', '談判', '威信'],
        
        unlockConditions: {
            achievements: [],
            level: 1
        }
    },
    
    'D': {
        id: 'D',
        name: '魅力路線',
        subtitle: '有美人，記得帶回家',
        quote: '「有美人，記得帶回家給你媽看看。」',
        icon: '💋',
        color: '#e74c3c',
        description: '魅力無限，征服人心。專屬後宮系統，女性角色招募加成。',
        
        bonuses: {
            money: 10000,
            reputation: 60,
            crew: 3,
            special: {
                '異性談判': '+40%',
                'KTV收益': '+60%',
                '後宮容量': '+5',
                '女性招募': '+35%'
            }
        },
        
        startPartners: ['ssr_003', 'sr_004', 'sr_005'],
        uniqueBuildings: ['luxury_club', 'beauty_salon'],
        traits: ['魅力', '後宮', '交際', '吸引力'],
        
        unlockConditions: {
            achievements: [],
            level: 1
        }
    },
    
    'E': {
        id: 'E',
        name: '武力路線',
        subtitle: '拳頭才是硬道理',
        quote: '「江湖上，拳頭才是硬道理。」',
        icon: '⚔️',
        color: '#c0392b',
        description: '以武力征服一切。強大戰鬥能力，軍火交易專精。',
        
        bonuses: {
            money: 8000,
            reputation: 55,
            crew: 5,
            special: {
                '戰鬥力': '+30%',
                '武器成本': '-40%',
                '搶劫收益': '+50%',
                '防禦力': '+25%'
            }
        },
        
        startPartners: ['ur_002', 'ssr_004', 'sr_006'],
        uniqueBuildings: ['training_ground', 'weapon_depot'],
        traits: ['武力', '戰鬥', '軍火', '征服'],
        
        unlockConditions: {
            achievements: ['first_blood'],
            level: 1
        }
    },
    
    'F': {
        id: 'F',
        name: '智謀路線',
        subtitle: '知己知彼，百戰百勝',
        quote: '「真正的老大，用腦子而非拳頭。」',
        icon: '🧠',
        color: '#16a085',
        description: '智慧為王，情報先行。情報系統強化，策略優勢明顯。',
        
        bonuses: {
            money: 15000,
            reputation: 70,
            crew: 3,
            special: {
                '情報獲取': '+50%',
                '策略成功率': '+35%',
                '科技研發': '+40%',
                '敵人弱點': '自動偵測'
            }
        },
        
        startPartners: ['lr_001', 'ssr_005', 'sr_007'],
        uniqueBuildings: ['intelligence_center', 'tech_lab'],
        traits: ['智謀', '情報', '策略', '科技'],
        
        unlockConditions: {
            achievements: ['strategic_master'],
            level: 5
        }
    }
};

// 路線解鎖檢查
function isRouteUnlocked(routeId, playerData) {
    const route = ROUTES_DATA[routeId];
    if (!route) return false;
    
    // 檢查等級
    if (playerData.level < route.unlockConditions.level) return false;
    
    // 檢查成就
    for (const achId of route.unlockConditions.achievements) {
        if (!playerData.achievements.includes(achId)) return false;
    }
    
    return true;
}

// 獲取路線加成描述
function getRouteBonusText(routeId) {
    const route = ROUTES_DATA[routeId];
    if (!route) return '';
    
    const bonuses = [];
    if (route.bonuses.money !== 10000) {
        bonuses.push(`起始資金 $${route.bonuses.money.toLocaleString()}`);
    }
    if (route.bonuses.reputation !== 50) {
        bonuses.push(`聲望 ${route.bonuses.reputation}`);
    }
    if (route.bonuses.crew !== 3) {
        bonuses.push(`人手 ${route.bonuses.crew}人`);
    }
    
    // 特殊加成
    for (const [key, value] of Object.entries(route.bonuses.special)) {
        bonuses.push(`${key} ${value}`);
    }
    
    return bonuses.join(' | ');
}

// 匯出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ROUTES_DATA, isRouteUnlocked, getRouteBonusText };
}
