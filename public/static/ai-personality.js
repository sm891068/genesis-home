// ========================================
// AI 性格邏輯庫系統（8 種核心性格）
// 用於定義 NPC 角色的行為模式、對話風格、決策傾向
// ========================================

/**
 * 8 種核心性格類型
 * 每種性格定義了完整的行為邏輯、對話模式、互動反應
 */
const PERSONALITY_TYPES = {
    // 1. 霸道型 (Dominant) - 強勢掌控
    dominant: {
        id: 'dominant',
        name: '霸道',
        description: '強勢、自信、喜歡掌控一切',
        emoji: '👑',
        color: '#8e44ad',
        
        dialoguePatterns: {
            greeting: ['嗯，你來了。', '有什麼事直說。', '我正在忙，快說。'],
            praise: ['不錯，總算做對了一次。', '還算可以。', '這次表現勉強及格。'],
            anger: ['你在搞什麼！', '這種錯誤不該犯！', '我很失望。'],
            trust: ['只有你，我才會說這些。', '你是唯一能理解我的人。', '跟緊我，不會讓你失望。'],
            love: ['你...對我來說很特別。', '我承認，我需要你。', '只要你在，我就安心。']
        },
        
        behaviors: {
            loyalty: 85, obedience: 60, initiative: 95, jealousy: 70, possessiveness: 90,
            decisionStyle: 'aggressive', riskTolerance: 80, teamwork: 60,
            responseToGift: { love: 15, like: 8, dislike: -5, hate: -15 }
        },
        
        combatAI: { preferPosition: 'front', attackStyle: 'aggressive', targetPriority: 'strongest' }
    },
    
    // 2. 冷酷型 (Cold) - 冷靜理性
    cold: {
        id: 'cold',
        name: '冷酷',
        description: '冷靜、理性、情感內斂',
        emoji: '❄️',
        color: '#3498db',
        
        dialoguePatterns: {
            greeting: ['....', '嗯。', '什麼事？'],
            praise: ['可以。', '符合預期。', '......（點頭）'],
            anger: ['沒必要。', '這樣不對。', '別再犯了。'],
            trust: ['你可以信任。', '我會保護你。', '......（握手）'],
            love: ['......（沉默但靠近）', '別離開。', '你讓我感到溫暖。']
        },
        
        behaviors: {
            loyalty: 90, obedience: 70, initiative: 60, jealousy: 30, possessiveness: 50,
            decisionStyle: 'calculated', riskTolerance: 40, teamwork: 80,
            responseToGift: { love: 10, like: 5, dislike: -3, hate: -10 }
        },
        
        combatAI: { preferPosition: 'mid', attackStyle: 'calculated', targetPriority: 'weakest' }
    },
    
    // 3. 熱血型 (Passionate) - 積極向上
    passionate: {
        id: 'passionate',
        name: '熱血',
        description: '積極、熱情、永不放棄',
        emoji: '🔥',
        color: '#e74c3c',
        
        dialoguePatterns: {
            greeting: ['老大！今天也要全力以赴！', '哈哈！又見面了！', '準備好大幹一場了嗎？'],
            praise: ['太好了！我就知道你可以！', '這才是老大的實力！', '讚啊！'],
            anger: ['可惡！怎麼會這樣！', '不行，我不能放棄！', '再來一次！'],
            trust: ['老大，我相信你！', '跟著你，我什麼都不怕！', '我們一定能贏！'],
            love: ['老大...你對我來說真的很重要。', '能遇見你，我真的很幸運。', '我願意為你做任何事！']
        },
        
        behaviors: {
            loyalty: 95, obedience: 75, initiative: 90, jealousy: 40, possessiveness: 60,
            decisionStyle: 'brave', riskTolerance: 90, teamwork: 95,
            responseToGift: { love: 20, like: 12, dislike: -2, hate: -8 }
        },
        
        combatAI: { preferPosition: 'front', attackStyle: 'reckless', targetPriority: 'random' }
    },
    
    // 4. 忠義型 (Loyal) - 義氣為先
    loyal: {
        id: 'loyal',
        name: '忠義',
        description: '重情重義、信守承諾',
        emoji: '🛡️',
        color: '#27ae60',
        
        dialoguePatterns: {
            greeting: ['老大好。', '有什麼吩咐嗎？', '隨時候命。'],
            praise: ['謝謝老大的肯定。', '這是我應該做的。', '為老大效勞是我的榮幸。'],
            anger: ['是我的錯，請責罰。', '我會承擔後果。', '對不起，讓老大失望了。'],
            trust: ['老大的恩情，我永遠不會忘。', '就算赴湯蹈火，我也在所不辭。', '我這條命，是老大給的。'],
            love: ['老大...我對你的感情，已經超越了忠誠。', '能為你犧牲，是我的福氣。', '我的心，早就屬於你了。']
        },
        
        behaviors: {
            loyalty: 100, obedience: 95, initiative: 70, jealousy: 20, possessiveness: 40,
            decisionStyle: 'defensive', riskTolerance: 50, teamwork: 100,
            responseToGift: { love: 18, like: 10, dislike: -1, hate: -5 }
        },
        
        combatAI: { preferPosition: 'front', attackStyle: 'defensive', targetPriority: 'protectLeader' }
    },
    
    // 5. 魅惑型 (Seductive) - 誘惑迷人
    seductive: {
        id: 'seductive',
        name: '魅惑',
        description: '嫵媚、誘惑、善於操控人心',
        emoji: '💋',
        color: '#e91e63',
        
        dialoguePatterns: {
            greeting: ['老大~來找人家玩嗎？', '呵呵，又想我了？', '討厭啦~'],
            praise: ['老大真厲害~❤️', '人家就知道你最棒了~', '這樣的你，好有魅力~'],
            anger: ['哼，人家生氣了！', '討厭！不理你了！', '你要怎麼補償人家？'],
            trust: ['只有你，才能看到真實的我。', '在你面前，我卸下了所有偽裝。', '我願意把心交給你。'],
            love: ['我愛你...這是我第一次這麼認真。', '你是我唯一想要的男人。', '今晚...來我房間好嗎？']
        },
        
        behaviors: {
            loyalty: 75, obedience: 50, initiative: 85, jealousy: 80, possessiveness: 85,
            decisionStyle: 'manipulative', riskTolerance: 60, teamwork: 55,
            responseToGift: { love: 25, like: 15, dislike: -10, hate: -20 }
        },
        
        combatAI: { preferPosition: 'mid', attackStyle: 'debuff', targetPriority: 'male' }
    },
    
    // 6. 溫柔型 (Gentle) - 體貼善良
    gentle: {
        id: 'gentle',
        name: '溫柔',
        description: '善良、體貼、溫暖人心',
        emoji: '🌸',
        color: '#f8b500',
        
        dialoguePatterns: {
            greeting: ['老大，你來了。要喝茶嗎？', '今天辛苦了。', '歡迎回來。'],
            praise: ['太好了，我為你感到高興。', '你真的很了不起。', '我就知道你可以的。'],
            anger: ['沒關係，下次會更好的。', '別太自責，我會陪著你。', '失敗了也沒關係，我不會離開你。'],
            trust: ['我會一直在你身邊。', '無論發生什麼，我都相信你。', '你累了嗎？讓我幫你按摩吧。'],
            love: ['我...我喜歡你。', '能在你身邊，我就很幸福了。', '永遠...永遠都不要離開我好嗎？']
        },
        
        behaviors: {
            loyalty: 88, obedience: 85, initiative: 50, jealousy: 35, possessiveness: 45,
            decisionStyle: 'supportive', riskTolerance: 30, teamwork: 95,
            responseToGift: { love: 22, like: 14, dislike: 0, hate: -3 }
        },
        
        combatAI: { preferPosition: 'back', attackStyle: 'support', targetPriority: 'ally' }
    },
    
    // 7. 精明型 (Cunning) - 聰明狡猾
    cunning: {
        id: 'cunning',
        name: '精明',
        description: '聰明、算計、善於謀略',
        emoji: '🦊',
        color: '#ff9800',
        
        dialoguePatterns: {
            greeting: ['老大，我剛好有個提案。', '來得正好，我有事找你。', '呵呵，你會需要我的。'],
            praise: ['這次合作愉快。', '看來我沒看錯人。', '我們是最佳拍檔。'],
            anger: ['這不在計劃之內。', '看來要重新評估了。', '有意思...我會記住的。'],
            trust: ['你是少數能看穿我的人。', '我把我的秘密告訴你。', '我們可以聯手做大事。'],
            love: ['沒想到我也會動心...', '你是我唯一算計不了的人。', '為了你，我願意不計較利益。']
        },
        
        behaviors: {
            loyalty: 70, obedience: 55, initiative: 95, jealousy: 50, possessiveness: 60,
            decisionStyle: 'strategic', riskTolerance: 70, teamwork: 70,
            responseToGift: { love: 12, like: 8, dislike: -4, hate: -12 }
        },
        
        combatAI: { preferPosition: 'mid', attackStyle: 'tactical', targetPriority: 'healer' }
    },
    
    // 8. 傲嬌型 (Tsundere) - 外冷內熱
    tsundere: {
        id: 'tsundere',
        name: '傲嬌',
        description: '嘴硬心軟、外冷內熱',
        emoji: '😤',
        color: '#ff69b4',
        
        dialoguePatterns: {
            greeting: ['哼，又是你。', '才...才不是在等你！', '你來幹嘛？'],
            praise: ['哼，這種程度是應該的。', '還...還行啦。', '不要以為我會誇你！'],
            anger: ['笨蛋！大笨蛋！', '我才不管你了！', '都是你的錯！'],
            trust: ['我...我只是擔心你而已。', '別誤會，我只是...', '笨蛋，不要隨便死掉啊。'],
            love: ['我...我才沒有喜歡你！', '只...只是有一點點在意而已！', '真拿你沒辦法...我喜歡你啦，笨蛋！']
        },
        
        behaviors: {
            loyalty: 82, obedience: 65, initiative: 75, jealousy: 75, possessiveness: 80,
            decisionStyle: 'contradictory', riskTolerance: 55, teamwork: 75,
            responseToGift: { love: 20, like: 10, dislike: -8, hate: -15 }
        },
        
        combatAI: { preferPosition: 'mid', attackStyle: 'balanced', targetPriority: 'random' }
    }
};

/**
 * 根據性格ID獲取性格數據
 * @param {string} personalityId - 性格ID
 * @returns {Object|null} 性格數據
 */
function getPersonality(personalityId) {
    return PERSONALITY_TYPES[personalityId] || null;
}

/**
 * 根據性格獲取隨機對話
 * @param {string} personalityId - 性格ID
 * @param {string} situation - 情境類型 (greeting/praise/anger/trust/love)
 * @returns {string} 對話內容
 */
function getDialogue(personalityId, situation) {
    const personality = getPersonality(personalityId);
    if (!personality || !personality.dialoguePatterns[situation]) {
        return '......';
    }
    
    const dialogues = personality.dialoguePatterns[situation];
    return dialogues[Math.floor(Math.random() * dialogues.length)];
}

/**
 * 計算性格對行為的影響
 * @param {string} personalityId - 性格ID
 * @param {string} behaviorType - 行為類型
 * @returns {number} 行為值
 */
function getBehaviorValue(personalityId, behaviorType) {
    const personality = getPersonality(personalityId);
    if (!personality || !personality.behaviors[behaviorType]) {
        return 50; // 默認值
    }
    
    return personality.behaviors[behaviorType];
}

// 導出到全局
if (typeof window !== 'undefined') {
    window.PERSONALITY_TYPES = PERSONALITY_TYPES;
    window.getPersonality = getPersonality;
    window.getDialogue = getDialogue;
    window.getBehaviorValue = getBehaviorValue;
}

// 模組化導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PERSONALITY_TYPES,
        getPersonality,
        getDialogue,
        getBehaviorValue
    };
}
