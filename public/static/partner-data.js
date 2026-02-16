// ========== 稀有度系統 ==========
const RARITY = {
    N:   { name: 'N',   color: '#FFFFFF', multiplier: 0.5,  maxLevel: 50,  label: '普通' },
    R:   { name: 'R',   color: '#2ECC71', multiplier: 1.25, maxLevel: 60,  label: '稀有' },
    SR:  { name: 'SR',  color: '#3498DB', multiplier: 1.50, maxLevel: 70,  label: '超稀有' },
    SSR: { name: 'SSR', color: '#9B59B6', multiplier: 1.75, maxLevel: 80,  label: '特級稀有' },
    UR:  { name: 'UR',  color: '#E74C3C', multiplier: 2.00, maxLevel: 90,  label: '究極稀有' },
    LR:  { name: 'LR',  color: '#F1C40F', multiplier: 2.25, maxLevel: 100, label: '傳說稀有' }
};

// ========== 職業系統 ==========
const JOBS = {
    FIGHTER:   { name: '打手',   mainStat: 'STR', position: '前排', role: '輸出', icon: '👊' },
    BODYGUARD: { name: '保鏢',   mainStat: 'DEF', position: '前排', role: '坦克', icon: '🛡️' },
    ASSASSIN:  { name: '殺手',   mainStat: 'AGI', position: '中排', role: '爆發', icon: '🗡️' },
    GUNNER:    { name: '槍手',   mainStat: 'INT', position: '後排', role: 'AOE', icon: '🔫' },
    DOCTOR:    { name: '醫生',   mainStat: 'WIS', position: '後排', role: '治療', icon: '💉' },
    SNIPER:    { name: '狙擊手', mainStat: 'AGI', position: '中排', role: '控制', icon: '🎯', secondStat: 'INT' },
    QUEEN:     { name: '女王',   mainStat: 'ALL', position: '中排', role: '指揮', icon: '👑' },
    SECRETARY: { name: '秘書',   mainStat: 'INT', position: '中排', role: '輔助', icon: '📋', secondStat: 'AGI' }
};

// ========== 技能系統 ==========
const SKILLS = {
    // 打手技能
    POWER_STRIKE: {
        name: '力量打擊',
        type: 'active',
        desc: '對單體目標造成150% STR物理傷害',
        cooldown: 3,
        cost: 20
    },
    IRON_FIST: {
        name: '鐵拳',
        type: 'passive',
        desc: '普通攻擊額外造成20% STR傷害'
    },
    
    // 保鏢技能
    SHIELD_WALL: {
        name: '盾牆',
        type: 'active',
        desc: '提升全隊30% DEF，持續2回合',
        cooldown: 4,
        cost: 25
    },
    IRON_BODY: {
        name: '鋼鐵之軀',
        type: 'passive',
        desc: '受到傷害減少15%'
    },
    
    // 殺手技能
    DEADLY_STRIKE: {
        name: '致命一擊',
        type: 'active',
        desc: '對單體目標造成200% AGI物理傷害，有30%機率暴擊',
        cooldown: 3,
        cost: 30
    },
    SHADOW_STEP: {
        name: '影步',
        type: 'passive',
        desc: '閃避率提升20%'
    },
    
    // 槍手技能
    BULLET_STORM: {
        name: '彈幕風暴',
        type: 'active',
        desc: '對全體敵人造成100% INT物理傷害',
        cooldown: 5,
        cost: 35
    },
    QUICK_RELOAD: {
        name: '快速裝填',
        type: 'passive',
        desc: '攻擊速度提升15%'
    },
    
    // 醫生技能
    HEALING_WAVE: {
        name: '治療波',
        type: 'active',
        desc: '恢復全隊100% WIS生命值',
        cooldown: 4,
        cost: 30
    },
    MEDICAL_EXPERT: {
        name: '醫療專家',
        type: 'passive',
        desc: '所有治療效果提升25%'
    },
    
    // 狙擊手技能
    PRECISION_SHOT: {
        name: '精準射擊',
        type: 'active',
        desc: '對單體目標造成180% (AGI+INT)物理傷害，無視30% DEF',
        cooldown: 4,
        cost: 35
    },
    EAGLE_EYE: {
        name: '鷹眼',
        type: 'passive',
        desc: '暴擊率提升25%'
    },
    
    // 女王技能
    ROYAL_COMMAND: {
        name: '王者號令',
        type: 'active',
        desc: '提升全隊所有屬性20%，持續3回合',
        cooldown: 6,
        cost: 40
    },
    BORN_LEADER: {
        name: '天生領袖',
        type: 'passive',
        desc: '全隊獲得10%全屬性加成'
    },
    
    // 秘書技能
    STRATEGIC_SUPPORT: {
        name: '戰略支援',
        type: 'active',
        desc: '提升單個隊友50% INT和AGI，持續2回合',
        cooldown: 4,
        cost: 25
    },
    EFFICIENT_WORK: {
        name: '高效工作',
        type: 'passive',
        desc: '戰鬥結束後額外獲得20%金錢'
    }
};

// ========== 角色數據庫 ==========
const ALL_PARTNERS = [
    // ===== LR 傳說級 (金色) =====
    {
        id: 'lr_001',
        name: '龍霸天',
        rarity: 'LR',
        job: 'FIGHTER',
        avatar: '👔',
        gender: 'male',
        baseStats: { STR: 100, DEF: 80, AGI: 70, INT: 60, WIS: 50 },
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        description: '傳說中的黑道霸主，一拳可碎山石',
        obtainWay: '完成主線第10章',
        canHarem: false
    },
    {
        id: 'lr_002',
        name: '琉璃女王',
        rarity: 'LR',
        job: 'QUEEN',
        avatar: '👑',
        gender: 'female',
        baseStats: { STR: 85, DEF: 85, AGI: 85, INT: 85, WIS: 85 },
        activeSkill: 'ROYAL_COMMAND',
        passiveSkill: 'BORN_LEADER',
        description: '統御一方的神秘女王，美貌與智慧並存',
        obtainWay: 'SSR卡池0.1%機率',
        canHarem: true
    },
    
    // ===== UR 究極稀有 (紅色) =====
    {
        id: 'ur_001',
        name: '血刃',
        rarity: 'UR',
        job: 'ASSASSIN',
        avatar: '🗡️',
        gender: 'male',
        baseStats: { STR: 70, DEF: 50, AGI: 95, INT: 55, WIS: 45 },
        activeSkill: 'DEADLY_STRIKE',
        passiveSkill: 'SHADOW_STEP',
        description: '暗夜中的死神，從不失手',
        obtainWay: '完成暗殺任務100次',
        canHarem: false
    },
    {
        id: 'ur_002',
        name: '紅姐',
        rarity: 'UR',
        job: 'QUEEN',
        avatar: '👑',
        gender: 'female',
        baseStats: { STR: 75, DEF: 75, AGI: 75, INT: 80, WIS: 80 },
        activeSkill: 'ROYAL_COMMAND',
        passiveSkill: 'BORN_LEADER',
        description: '江湖人稱紅姐，統御能力一流',
        obtainWay: '聲望路線專屬',
        canHarem: true
    },
    {
        id: 'ur_003',
        name: '冰心',
        rarity: 'UR',
        job: 'SNIPER',
        avatar: '🎯',
        gender: 'female',
        baseStats: { STR: 60, DEF: 55, AGI: 90, INT: 85, WIS: 60 },
        activeSkill: 'PRECISION_SHOT',
        passiveSkill: 'EAGLE_EYE',
        description: '百步穿楊的女狙擊手，冷酷而精準',
        obtainWay: 'SR卡池1%機率',
        canHarem: true
    },
    
    // ===== SSR 特級稀有 (紫色) =====
    {
        id: 'ssr_001',
        name: '白琴',
        rarity: 'SSR',
        job: 'SECRETARY',
        avatar: '📋',
        gender: 'female',
        baseStats: { STR: 50, DEF: 60, AGI: 75, INT: 90, WIS: 70 },
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        description: '能幹的秘書，管理能力出眾',
        obtainWay: '道義路線專屬',
        canHarem: true
    },
    {
        id: 'ssr_002',
        name: '算盤林',
        rarity: 'SSR',
        job: 'SECRETARY',
        avatar: '📋',
        gender: 'female',
        baseStats: { STR: 45, DEF: 55, AGI: 70, INT: 95, WIS: 65 },
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        description: '財務天才，精打細算',
        obtainWay: '資本路線專屬',
        canHarem: true
    },
    {
        id: 'ssr_003',
        name: '拳王輝',
        rarity: 'SSR',
        job: 'FIGHTER',
        avatar: '👊',
        gender: 'male',
        baseStats: { STR: 92, DEF: 75, AGI: 60, INT: 50, WIS: 45 },
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        description: '前拳擊冠軍，力大無窮',
        obtainWay: '聲望路線專屬',
        canHarem: false
    },
    {
        id: 'ssr_004',
        name: '雙槍李',
        rarity: 'SSR',
        job: 'GUNNER',
        avatar: '🔫',
        gender: 'male',
        baseStats: { STR: 70, DEF: 60, AGI: 80, INT: 85, WIS: 55 },
        activeSkill: 'BULLET_STORM',
        passiveSkill: 'QUICK_RELOAD',
        description: '雙槍神射手，百發百中',
        obtainWay: '魅力路線專屬',
        canHarem: false
    },
    {
        id: 'ssr_005',
        name: '妖姬',
        rarity: 'SSR',
        job: 'ASSASSIN',
        avatar: '🗡️',
        gender: 'female',
        baseStats: { STR: 65, DEF: 50, AGI: 90, INT: 70, WIS: 55 },
        activeSkill: 'DEADLY_STRIKE',
        passiveSkill: 'SHADOW_STEP',
        description: '妖嬈的女殺手，致命而美麗',
        obtainWay: 'SR卡池5%機率',
        canHarem: true
    },
    {
        id: 'ssr_006',
        name: '羅奈米',
        nickname: '小辣椒',
        rarity: 'SSR',
        job: 'GUNNER',
        avatar: '🔥',
        gender: 'female',
        age: 18,
        height: 166,
        bust: 'G',
        measurements: '95-60-88',
        baseStats: { STR: 60, DEF: 55, AGI: 85, INT: 90, WIS: 60 },
        activeSkill: 'BULLET_STORM',
        passiveSkill: 'QUICK_RELOAD',
        personality: 'tsundere', // 傲嬌
        description: '18歲街頭小太妹，傲嬌個性，火辣身材。表面兇悍實則內心柔軟，對在意的人會展現不坦率的關心',
        background: '從小在街頭混大，靠著天生的槍法天賦和傲人身材在地下世界闖出名堂。雖然外表強勢，但內心渴望被理解和保護。對喜歡的人會用惡言相向來掩飾害羞',
        obtainWay: '魅力路線中期事件',
        canHarem: true,
        // 傲嬌專屬互動
        tsundereLevel: {
            cold: '哼！誰要理你這個笨蛋！',
            warming: '我、我才沒有擔心你！只是剛好路過而已！',
            trust: '笨蛋...其實我...算了不說了！（臉紅）',
            love: '都怪你...讓我變成這樣...我、我喜歡你啦！笨蛋！（羞到爆）'
        }
    },
    
    // ===== SR 超稀有 (藍色) =====
    {
        id: 'sr_001',
        name: '阿龍',
        rarity: 'SR',
        job: 'FIGHTER',
        avatar: '👊',
        gender: 'male',
        baseStats: { STR: 85, DEF: 70, AGI: 55, INT: 45, WIS: 40 },
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        description: '忠誠的老夥伴，武力值高',
        obtainWay: '道義路線專屬',
        canHarem: false
    },
    {
        id: 'sr_002',
        name: '刀手坤',
        rarity: 'SR',
        job: 'FIGHTER',
        avatar: '👊',
        gender: 'male',
        baseStats: { STR: 88, DEF: 65, AGI: 60, INT: 50, WIS: 42 },
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        description: '擅長近戰的打手',
        obtainWay: '資本路線專屬',
        canHarem: false
    },
    {
        id: 'sr_003',
        name: '小開',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '📋',
        gender: 'male',
        baseStats: { STR: 45, DEF: 50, AGI: 75, INT: 85, WIS: 65 },
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        description: '情報專家，消息靈通',
        obtainWay: '道義路線專屬',
        canHarem: false
    },
    {
        id: 'sr_004',
        name: '公關陳',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '📋',
        gender: 'male',
        baseStats: { STR: 50, DEF: 55, AGI: 80, INT: 80, WIS: 60 },
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        description: '談判高手，能言善辯',
        obtainWay: '資本路線專屬',
        canHarem: false
    },
    {
        id: 'sr_005',
        name: '茶博士',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '📋',
        gender: 'male',
        baseStats: { STR: 40, DEF: 50, AGI: 75, INT: 90, WIS: 70 },
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        description: '智囊團核心，調解專家',
        obtainWay: '聲望路線專屬',
        canHarem: false
    },
    {
        id: 'sr_006',
        name: '王子杰',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '📋',
        gender: 'male',
        baseStats: { STR: 55, DEF: 60, AGI: 85, INT: 75, WIS: 55 },
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        description: '公關達人，社交能手',
        obtainWay: '魅力路線專屬',
        canHarem: false
    },
    {
        id: 'sr_007',
        name: '鐵山',
        rarity: 'SR',
        job: 'BODYGUARD',
        avatar: '🛡️',
        gender: 'male',
        baseStats: { STR: 70, DEF: 90, AGI: 45, INT: 40, WIS: 50 },
        activeSkill: 'SHIELD_WALL',
        passiveSkill: 'IRON_BODY',
        description: '鐵壁般的保鏢，防禦力驚人',
        obtainWay: 'R卡池15%機率',
        canHarem: false
    },
    {
        id: 'sr_008',
        name: '櫻花',
        rarity: 'SR',
        job: 'DOCTOR',
        avatar: '💉',
        gender: 'female',
        baseStats: { STR: 40, DEF: 55, AGI: 65, INT: 70, WIS: 85 },
        activeSkill: 'HEALING_WAVE',
        passiveSkill: 'MEDICAL_EXPERT',
        description: '溫柔的醫生，醫術高明',
        obtainWay: 'R卡池10%機率',
        canHarem: true
    },
    {
        id: 'sr_009',
        name: '黑寡婦',
        rarity: 'SR',
        job: 'SNIPER',
        avatar: '🎯',
        gender: 'female',
        baseStats: { STR: 55, DEF: 50, AGI: 80, INT: 75, WIS: 55 },
        activeSkill: 'PRECISION_SHOT',
        passiveSkill: 'EAGLE_EYE',
        description: '神秘的女狙擊手',
        obtainWay: 'R卡池10%機率',
        canHarem: true
    },
    
    // ===== R 稀有 (綠色) =====
    {
        id: 'r_001',
        name: '小弟A',
        rarity: 'R',
        job: 'FIGHTER',
        avatar: '👊',
        gender: 'male',
        baseStats: { STR: 60, DEF: 50, AGI: 40, INT: 30, WIS: 25 },
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        description: '普通的街頭打手',
        obtainWay: '新手招募',
        canHarem: false
    },
    {
        id: 'r_002',
        name: '小弟B',
        rarity: 'R',
        job: 'BODYGUARD',
        avatar: '🛡️',
        gender: 'male',
        baseStats: { STR: 50, DEF: 70, AGI: 35, INT: 30, WIS: 30 },
        activeSkill: 'SHIELD_WALL',
        passiveSkill: 'IRON_BODY',
        description: '負責看場子的保鏢',
        obtainWay: '新手招募',
        canHarem: false
    },
    {
        id: 'r_003',
        name: '小紅',
        rarity: 'R',
        job: 'SECRETARY',
        avatar: '📋',
        gender: 'female',
        baseStats: { STR: 30, DEF: 35, AGI: 55, INT: 60, WIS: 45 },
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        description: '辦公室小秘書',
        obtainWay: '新手招募',
        canHarem: true
    },
    
    // ===== N 普通 (白色) =====
    {
        id: 'n_001',
        name: '路人甲',
        rarity: 'N',
        job: 'FIGHTER',
        avatar: '👊',
        gender: 'male',
        baseStats: { STR: 40, DEF: 30, AGI: 25, INT: 20, WIS: 15 },
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        description: '隨處可見的街頭混混',
        obtainWay: '基礎招募',
        canHarem: false
    },
    {
        id: 'n_002',
        name: '路人乙',
        rarity: 'N',
        job: 'BODYGUARD',
        avatar: '🛡️',
        gender: 'male',
        baseStats: { STR: 35, DEF: 45, AGI: 20, INT: 20, WIS: 20 },
        activeSkill: 'SHIELD_WALL',
        passiveSkill: 'IRON_BODY',
        description: '臨時雇來的保鏢',
        obtainWay: '基礎招募',
        canHarem: false
    }
];

// ========== 後宮系統 ==========
const HAREM_LEVELS = [
    { level: 0,   percent: 0,   name: '陌生冷漠',     unlocks: ['基礎對話', '背景故事'] },
    { level: 1,   percent: 20,  name: '試探有意思',   unlocks: ['個人任務', '親密互動初級'] },
    { level: 2,   percent: 40,  name: '接納信任',     unlocks: ['贈禮', '深度交談'] },
    { level: 3,   percent: 60,  name: '投靠主動',     unlocks: ['深層親密場景'] },
    { level: 4,   percent: 80,  name: '完全屈服獻身',  unlocks: ['成人內容', '專屬技能'] },
    { level: 5,   percent: 100, name: '絕對支配',     unlocks: ['群體互動邀約'] },
    { level: 6,   percent: 120, name: '情感融合',     unlocks: ['深層故事分支'] },
    { level: 7,   percent: 140, name: '精神交融',     unlocks: ['靈魂共鳴場景'] },
    { level: 8,   percent: 160, name: '生死相依',     unlocks: ['獨家終極故事'] },
    { level: 9,   percent: 180, name: '永恆契約',     unlocks: ['特殊結局場景'] },
    { level: 10,  percent: 200, name: '絕對統治',     unlocks: ['最終隱藏內容'] }
];

// ========== 工具函數 ==========
function calculateStats(partner, level) {
    const rarity = RARITY[partner.rarity];
    const multiplier = rarity.multiplier;
    const levelBonus = (level - 1) * 0.05; // 每級加5%
    
    return {
        STR: Math.floor(partner.baseStats.STR * multiplier * (1 + levelBonus)),
        DEF: Math.floor(partner.baseStats.DEF * multiplier * (1 + levelBonus)),
        AGI: Math.floor(partner.baseStats.AGI * multiplier * (1 + levelBonus)),
        INT: Math.floor(partner.baseStats.INT * multiplier * (1 + levelBonus)),
        WIS: Math.floor(partner.baseStats.WIS * multiplier * (1 + levelBonus))
    };
}

function getHaremLevel(submission) {
    for (let i = HAREM_LEVELS.length - 1; i >= 0; i--) {
        if (submission >= HAREM_LEVELS[i].percent) {
            return HAREM_LEVELS[i];
        }
    }
    return HAREM_LEVELS[0];
}

function getHaremPartners() {
    return ALL_PARTNERS.filter(p => p.canHarem && p.rarity !== 'N' && p.rarity !== 'R');
}

// 導出供遊戲使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RARITY, JOBS, SKILLS, ALL_PARTNERS, HAREM_LEVELS, calculateStats, getHaremLevel, getHaremPartners };
}
