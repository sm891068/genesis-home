// ========== 5條路線系統（精簡版）==========

const ROUTES_DATA = {
    'A': {
        id: 'A',
        name: '正道',
        subtitle: '道義與聲望',
        quote: '「別碰毒品，尊重比恐懼更重要」',
        icon: '⚖️',
        color: '#3498db',
        description: '堅守底線，以道義和聲望治理幫派',
        
        bonuses: {
            money: 12000,
            reputation: 75,
            crew: 4,
            special: {
                '聲望增長': '+20%',
                '忠誠度': '+25%',
                '談判成功率': '+30%',
                '警察關係': '+15'
            }
        },
        
        // 起始夥伴（包含阿福 sr_010）
        startPartners: ['sr_010', 'ssr_001', 'ur_001', 'sr_001', 'r_001'],
        
        uniqueBuildings: ['community_center', 'respect_hall'],
        traits: ['正義', '聲望', '忠誠', '談判'],
        
        unlockConditions: {
            achievements: [],
            level: 1
        }
    },
    
    'B': {
        id: 'B',
        name: '資本',
        subtitle: '金錢至上',
        quote: '「錢能解決的，都不是問題」',
        icon: '💰',
        color: '#f1c40f',
        description: '用資本控制一切，高收益經濟路線',
        
        bonuses: {
            money: 25000,
            reputation: 50,
            crew: 3,
            special: {
                '收益加成': '+25%',
                '賄賂成本': '-35%',
                '投資回報': '+20%',
                '黑市折扣': '-30%'
            }
        },
        
        startPartners: ['sr_010', 'ssr_002', 'sr_002', 'sr_003', 'r_002'],
        uniqueBuildings: ['investment_bank', 'money_laundry'],
        traits: ['資本', '經濟', '投資', '賄賂'],
        
        unlockConditions: {
            achievements: [],
            level: 1
        }
    },
    
    'C': {
        id: 'C',
        name: '魅力',
        subtitle: '後宮經營',
        quote: '「有美人，記得帶回家給你媽看」',
        icon: '💋',
        color: '#e74c3c',
        description: '魅力統領，建立強大後宮系統',
        
        bonuses: {
            money: 15000,
            reputation: 60,
            crew: 3,
            special: {
                '魅力值': '+30',
                '後宮好感': '+25%',
                '女性招募': '成功率 +40%',
                '交際能力': '+35%'
            }
        },
        
        startPartners: ['sr_010', 'ssr_003', 'sr_004', 'sr_005', 'r_003'],
        uniqueBuildings: ['luxury_club', 'beauty_salon'],
        traits: ['魅力', '後宮', '交際', '吸引力'],
        
        unlockConditions: {
            achievements: [],
            level: 1
        }
    },
    
    'D': {
        id: 'D',
        name: '武力',
        subtitle: '拳頭硬道理',
        quote: '「拳頭才是硬道理」',
        icon: '⚔️',
        color: '#c0392b',
        description: '以力服人，暴力擴張領地',
        
        bonuses: {
            money: 10000,
            reputation: 55,
            crew: 5,
            special: {
                '戰鬥力': '+30%',
                '攻擊加成': '+25%',
                '征服速度': '+35%',
                '武器折扣': '-25%'
            }
        },
        
        startPartners: ['sr_010', 'ur_002', 'ssr_004', 'sr_006', 'r_001'],
        uniqueBuildings: ['training_ground', 'weapon_depot'],
        traits: ['武力', '戰鬥', '軍火', '征服'],
        
        unlockConditions: {
            achievements: [],
            level: 1
        }
    },
    
    'E': {
        id: 'E',
        name: '智謀',
        subtitle: '謀略為先',
        quote: '「知己知彼，百戰百勝」',
        icon: '🧠',
        color: '#16a085',
        description: '智慧統領，情報與策略制勝',
        
        bonuses: {
            money: 14000,
            reputation: 65,
            crew: 3,
            special: {
                '情報獲取': '+40%',
                '策略成功率': '+30%',
                '科技研發': '+25%',
                '間諜效率': '+35%'
            }
        },
        
        startPartners: ['sr_010', 'ssr_005', 'ur_003', 'sr_007', 'r_002'],
        uniqueBuildings: ['intelligence_center', 'tech_lab'],
        traits: ['智謀', '情報', '策略', '科技'],
        
        unlockConditions: {
            achievements: [],
            level: 1
        }
    }
};

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ROUTES_DATA };
}
