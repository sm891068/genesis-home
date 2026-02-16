// ========== 成就殿堂系統 (24+ 成就) ==========

const ACHIEVEMENTS_DATA = [
    // ===== 故事成就 (Story) =====
    {
        id: 'newbie',
        name: '初出茅廬',
        icon: '🐣',
        description: '完成新手教學，正式踏入江湖',
        category: 'story',
        rarity: 'common',
        condition: { type: 'tutorial_complete' },
        reward: { money: 1000, reputation: 10 },
        unlocked: false
    },
    {
        id: 'first_choice',
        name: '命運抉擇',
        icon: '🎭',
        description: '選擇你的道路，開始新的傳承',
        category: 'story',
        rarity: 'common',
        condition: { type: 'route_selected' },
        reward: { money: 2000, reputation: 15 },
        unlocked: false
    },
    {
        id: 'father_legacy',
        name: '父親的遺志',
        icon: '👴',
        description: '完成父親留下的第一個任務',
        category: 'story',
        rarity: 'rare',
        condition: { type: 'quest_complete', questId: 'father_first_quest' },
        reward: { money: 5000, reputation: 30 },
        unlocked: false
    },
    {
        id: 'empire_builder',
        name: '帝國奠基',
        icon: '🏛️',
        description: '建立起你的商業帝國基礎',
        category: 'story',
        rarity: 'epic',
        condition: { type: 'buildings', count: 20 },
        reward: { money: 20000, reputation: 100 },
        unlocked: false
    },
    {
        id: 'legend_born',
        name: '傳奇誕生',
        icon: '⭐',
        description: '達成所有路線的主線劇情',
        category: 'story',
        rarity: 'legendary',
        condition: { type: 'all_routes_complete' },
        reward: { money: 100000, reputation: 500, special: '傳說稱號' },
        unlocked: false
    },
    
    // ===== 經濟成就 (Economy) =====
    {
        id: 'first_fortune',
        name: '初嚐富貴',
        icon: '💰',
        description: '累積資金達到 10 萬',
        category: 'economy',
        rarity: 'common',
        condition: { type: 'money', amount: 100000 },
        reward: { money: 5000 },
        progress: { current: 0, target: 100000 },
        unlocked: false
    },
    {
        id: 'millionaire',
        name: '百萬富翁',
        icon: '💵',
        description: '累積資金達到 100 萬',
        category: 'economy',
        rarity: 'rare',
        condition: { type: 'money', amount: 1000000 },
        reward: { money: 50000, special: '富豪稱號' },
        progress: { current: 0, target: 1000000 },
        unlocked: false
    },
    {
        id: 'tycoon',
        name: '富甲天下',
        icon: '💎',
        description: '累積資金達到 1000 萬',
        category: 'economy',
        rarity: 'epic',
        condition: { type: 'money', amount: 10000000 },
        reward: { money: 500000, reputation: 200, special: '財神稱號' },
        progress: { current: 0, target: 10000000 },
        unlocked: false
    },
    {
        id: 'business_empire',
        name: '商業帝國',
        icon: '🏦',
        description: '單日收益達到 10 萬',
        category: 'economy',
        rarity: 'epic',
        condition: { type: 'daily_income', amount: 100000 },
        reward: { money: 100000, special: '收益加成 +10%' },
        unlocked: false
    },
    {
        id: 'money_printer',
        name: '印鈔機',
        icon: '🖨️',
        description: '單日收益達到 100 萬',
        category: 'economy',
        rarity: 'legendary',
        condition: { type: 'daily_income', amount: 1000000 },
        reward: { money: 1000000, special: '永久收益 +20%' },
        unlocked: false
    },
    
    // ===== 建築成就 (Building) =====
    {
        id: 'first_building',
        name: '初次建設',
        icon: '🏗️',
        description: '建造第一個建築',
        category: 'building',
        rarity: 'common',
        condition: { type: 'build', count: 1 },
        reward: { money: 1000 },
        progress: { current: 0, target: 1 },
        unlocked: false
    },
    {
        id: 'real_estate_mogul',
        name: '地產大亨',
        icon: '🏙️',
        description: '擁有 10 個最高級建築',
        category: 'building',
        rarity: 'rare',
        condition: { type: 'max_level_buildings', count: 10 },
        reward: { money: 50000, special: '建造成本 -15%' },
        progress: { current: 0, target: 10 },
        unlocked: false
    },
    {
        id: 'city_planner',
        name: '城市規劃師',
        icon: '🗺️',
        description: '解鎖所有建築類型',
        category: 'building',
        rarity: 'epic',
        condition: { type: 'unlock_all_buildings' },
        reward: { money: 100000, special: '建築效率 +20%' },
        unlocked: false
    },
    {
        id: 'architect_god',
        name: '建築之神',
        icon: '🏛️',
        description: '所有建築升至最高級',
        category: 'building',
        rarity: 'legendary',
        condition: { type: 'all_max_level' },
        reward: { money: 500000, special: '永久建築加成 +50%' },
        unlocked: false
    },
    
    // ===== 夥伴成就 (Partner) =====
    {
        id: 'first_partner',
        name: '初次招募',
        icon: '🤝',
        description: '招募第一個夥伴',
        category: 'partner',
        rarity: 'common',
        condition: { type: 'recruit', count: 1 },
        reward: { money: 2000 },
        progress: { current: 0, target: 1 },
        unlocked: false
    },
    {
        id: 'team_builder',
        name: '組建團隊',
        icon: '👥',
        description: '招募 10 個夥伴',
        category: 'partner',
        rarity: 'rare',
        condition: { type: 'recruit', count: 10 },
        reward: { money: 20000, reputation: 50 },
        progress: { current: 0, target: 10 },
        unlocked: false
    },
    {
        id: 'collector',
        name: '收集狂',
        icon: '🎭',
        description: '解鎖所有夥伴',
        category: 'partner',
        rarity: 'epic',
        condition: { type: 'unlock_all_partners' },
        reward: { money: 100000, reputation: 200, special: '招募成功率 +30%' },
        unlocked: false
    },
    {
        id: 'max_affection',
        name: '萬人迷',
        icon: '❤️',
        description: '所有夥伴好感度達到 100',
        category: 'partner',
        rarity: 'legendary',
        condition: { type: 'all_max_affection' },
        reward: { money: 200000, special: '全夥伴屬性 +20%' },
        unlocked: false
    },
    {
        id: 'harem_king',
        name: '後宮之王',
        icon: '👑',
        description: '後宮成員達到 10 人',
        category: 'partner',
        rarity: 'epic',
        condition: { type: 'harem_count', count: 10 },
        reward: { money: 50000, special: '魅力值永久 +50' },
        progress: { current: 0, target: 10 },
        unlocked: false
    },
    
    // ===== 戰鬥成就 (Combat) =====
    {
        id: 'first_blood',
        name: '初次交鋒',
        icon: '⚔️',
        description: '贏得第一場戰鬥',
        category: 'combat',
        rarity: 'common',
        condition: { type: 'win_battle', count: 1 },
        reward: { money: 3000 },
        progress: { current: 0, target: 1 },
        unlocked: false
    },
    {
        id: 'veteran',
        name: '身經百戰',
        icon: '🛡️',
        description: '贏得 50 場戰鬥',
        category: 'combat',
        rarity: 'rare',
        condition: { type: 'win_battle', count: 50 },
        reward: { money: 30000, reputation: 100 },
        progress: { current: 0, target: 50 },
        unlocked: false
    },
    {
        id: 'war_god',
        name: '戰無不勝',
        icon: '👹',
        description: '連續贏得 20 場戰鬥',
        category: 'combat',
        rarity: 'epic',
        condition: { type: 'win_streak', count: 20 },
        reward: { money: 100000, special: '戰鬥力 +25%' },
        progress: { current: 0, target: 20 },
        unlocked: false
    },
    {
        id: 'perfect_victory',
        name: '完美勝利',
        icon: '✨',
        description: '無損血量贏得戰鬥',
        category: 'combat',
        rarity: 'epic',
        condition: { type: 'perfect_win' },
        reward: { money: 50000, special: '防禦力 +20%' },
        unlocked: false
    },
    {
        id: 'boss_slayer',
        name: '魔王殺手',
        icon: '💀',
        description: '擊敗所有 Boss',
        category: 'combat',
        rarity: 'legendary',
        condition: { type: 'defeat_all_bosses' },
        reward: { money: 500000, reputation: 500, special: '魔王殺手稱號' },
        unlocked: false
    },
    
    // ===== 聲望成就 (Reputation) =====
    {
        id: 'known_name',
        name: '小有名氣',
        icon: '📣',
        description: '聲望達到 100',
        category: 'reputation',
        rarity: 'common',
        condition: { type: 'reputation', amount: 100 },
        reward: { money: 5000 },
        progress: { current: 0, target: 100 },
        unlocked: false
    },
    {
        id: 'famous',
        name: '聲名遠播',
        icon: '📢',
        description: '聲望達到 1000',
        category: 'reputation',
        rarity: 'rare',
        condition: { type: 'reputation', amount: 1000 },
        reward: { money: 50000, special: '聲望增長 +15%' },
        progress: { current: 0, target: 1000 },
        unlocked: false
    },
    {
        id: 'legendary_figure',
        name: '傳奇人物',
        icon: '🌟',
        description: '聲望達到 5000',
        category: 'reputation',
        rarity: 'epic',
        condition: { type: 'reputation', amount: 5000 },
        reward: { money: 200000, special: '傳奇人物稱號' },
        progress: { current: 0, target: 5000 },
        unlocked: false
    },
    {
        id: 'king_of_underworld',
        name: '地下世界之王',
        icon: '👑',
        description: '聲望達到 10000',
        category: 'reputation',
        rarity: 'legendary',
        condition: { type: 'reputation', amount: 10000 },
        reward: { money: 1000000, reputation: 0, special: '王者稱號 + 全屬性 +30%' },
        progress: { current: 0, target: 10000 },
        unlocked: false
    },
    
    // ===== 隱藏成就 (Hidden) =====
    {
        id: 'speed_runner',
        name: '速通大師',
        icon: '⏱️',
        description: '30 天內完成主線',
        category: 'hidden',
        rarity: 'legendary',
        condition: { type: 'days_to_complete', days: 30 },
        reward: { money: 500000, special: '速通稱號 + 時間加速' },
        unlocked: false,
        hidden: true
    },
    {
        id: 'pacifist',
        name: '和平主義者',
        icon: '☮️',
        description: '不參與任何戰鬥完成遊戲',
        category: 'hidden',
        rarity: 'legendary',
        condition: { type: 'no_battles' },
        reward: { money: 500000, special: '和平使者稱號 + 談判 +50%' },
        unlocked: false,
        hidden: true
    },
    {
        id: 'lone_wolf',
        name: '獨狼',
        icon: '🐺',
        description: '只使用起始夥伴完成遊戲',
        category: 'hidden',
        rarity: 'epic',
        condition: { type: 'starter_only' },
        reward: { money: 200000, special: '起始夥伴屬性 +50%' },
        unlocked: false,
        hidden: true
    }
];

// ========== 成就系統功能 ==========

// 檢查成就是否解鎖
function checkAchievement(achievementId, playerData) {
    const achievement = ACHIEVEMENTS_DATA.find(a => a.id === achievementId);
    if (!achievement || achievement.unlocked) return null;
    
    const condition = achievement.condition;
    let unlocked = false;
    
    switch (condition.type) {
        case 'tutorial_complete':
            unlocked = playerData.tutorialComplete === true;
            break;
        case 'route_selected':
            unlocked = playerData.route !== null;
            break;
        case 'money':
            unlocked = playerData.money >= condition.amount;
            break;
        case 'reputation':
            unlocked = playerData.reputation >= condition.amount;
            break;
        case 'recruit':
            unlocked = playerData.partners.length >= condition.count;
            break;
        case 'build':
            unlocked = playerData.buildings >= condition.count;
            break;
        case 'win_battle':
            unlocked = playerData.battlesWon >= condition.count;
            break;
        case 'harem_count':
            unlocked = playerData.harem.length >= condition.count;
            break;
        // ... 其他條件
    }
    
    if (unlocked) {
        achievement.unlocked = true;
        return {
            achievement,
            reward: achievement.reward
        };
    }
    
    return null;
}

// 更新成就進度
function updateAchievementProgress(achievementId, current) {
    const achievement = ACHIEVEMENTS_DATA.find(a => a.id === achievementId);
    if (!achievement || !achievement.progress) return;
    
    achievement.progress.current = current;
    
    // 檢查是否達成
    if (current >= achievement.progress.target) {
        achievement.unlocked = true;
    }
}

// 獲取分類成就
function getAchievementsByCategory(category) {
    return ACHIEVEMENTS_DATA.filter(a => a.category === category);
}

// 獲取已解鎖成就數量
function getUnlockedCount() {
    return ACHIEVEMENTS_DATA.filter(a => a.unlocked).length;
}

// 獲取成就完成度百分比
function getCompletionPercentage() {
    const total = ACHIEVEMENTS_DATA.length;
    const unlocked = getUnlockedCount();
    return Math.floor((unlocked / total) * 100);
}

// 匯出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ACHIEVEMENTS_DATA,
        checkAchievement,
        updateAchievementProgress,
        getAchievementsByCategory,
        getUnlockedCount,
        getCompletionPercentage
    };
}
