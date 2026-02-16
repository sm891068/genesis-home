// ========== AI 性格邏輯庫系統 ==========

// 6+1種核心性格類型
const PERSONALITY_TYPES = {
    // 1. 霸道型 (Dominant)
    dominant: {
        id: 'dominant',
        name: '霸道',
        description: '強勢、自信、喜歡掌控一切',
        emoji: '👑',
        color: '#8e44ad',
        
        // 對話模式
        dialoguePatterns: {
            greeting: [
                '嗯，你來了。',
                '有什麼事直說。',
                '我正在忙，快說。'
            ],
            praise: [
                '不錯，總算做對了一次。',
                '還算可以。',
                '這次表現勉強及格。'
            ],
            anger: [
                '你在搞什麼！',
                '這種錯誤不該犯！',
                '我很失望。'
            ],
            trust: [
                '只有你，我才會說這些。',
                '你是唯一能理解我的人。',
                '跟緊我，不會讓你失望。'
            ],
            love: [
                '你...對我來說很特別。',
                '我承認，我需要你。',
                '只要你在，我就安心。'
            ]
        },
        
        // 行為模式
        behaviors: {
            loyalty: 85,              // 忠誠度基礎值
            obedience: 60,            // 服從度
            initiative: 95,           // 主動性
            jealousy: 70,             // 嫉妒心
            possessiveness: 90,       // 佔有慾
            
            // 決策傾向
            decisionStyle: 'aggressive',  // 決策風格：進攻型
            riskTolerance: 80,            // 風險承受度
            teamwork: 60,                 // 團隊合作度
            
            // 互動反應
            responseToGift: {
                love: '+15',
                like: '+8',
                dislike: '-5',
                hate: '-15'
            },
            
            responseToFailure: '會責怪但不會離開',
            responseToSuccess: '冷靜讚賞',
            responseToBetrayal: '永不原諒'
        },
        
        // 對話觸發條件
        triggers: {
            highAffection: 80,    // 高好感度觸發特殊對話
            lowAffection: 30,     // 低好感度觸發警告
            jealousyEvent: 60,    // 嫉妒事件觸發閾值
            specialEvent: 90      // 特殊劇情觸發
        },
        
        // 專屬任務類型
        questPreference: ['征服', '統治', '擴張'],
        
        // 禮物偏好
        giftPreference: {
            luxury: 100,      // 奢侈品
            power: 95,        // 權力象徵
            practical: 60,    // 實用物品
            romantic: 40      // 浪漫物品
        }
    },
    
    // 2. 冷酷型 (Cold)
    cold: {
        id: 'cold',
        name: '冷酷',
        description: '冷靜、理性、情感內斂',
        emoji: '❄️',
        color: '#3498db',
        
        dialoguePatterns: {
            greeting: [
                '....',
                '嗯。',
                '什麼事？'
            ],
            praise: [
                '...還可以。',
                '符合預期。',
                '繼續保持。'
            ],
            anger: [
                '...',
                '你知道後果。',
                '不要讓我再說第二次。'
            ],
            trust: [
                '你...值得信任。',
                '我可以依靠你。',
                '只有你能靠近我。'
            ],
            love: [
                '我...對你有特殊感覺。',
                '你是唯一能溫暖我的人。',
                '我願意為你改變。'
            ]
        },
        
        behaviors: {
            loyalty: 95,
            obedience: 70,
            initiative: 80,
            jealousy: 40,
            possessiveness: 60,
            
            decisionStyle: 'rational',
            riskTolerance: 70,
            teamwork: 50,
            
            responseToGift: {
                love: '+10',
                like: '+5',
                dislike: '0',
                hate: '-8'
            },
            
            responseToFailure: '沉默分析',
            responseToSuccess: '冷靜點頭',
            responseToBetrayal: '冷血報復'
        },
        
        triggers: {
            highAffection: 85,
            lowAffection: 25,
            jealousyEvent: 70,
            specialEvent: 95
        },
        
        questPreference: ['暗殺', '情報', '精準打擊'],
        
        giftPreference: {
            luxury: 50,
            power: 80,
            practical: 95,
            romantic: 30
        }
    },
    
    // 3. 熱血型 (Hot-Blooded)
    hot_blooded: {
        id: 'hot_blooded',
        name: '熱血',
        description: '熱情、衝動、充滿幹勁',
        emoji: '🔥',
        color: '#e74c3c',
        
        dialoguePatterns: {
            greeting: [
                '老大！今天要做什麼！',
                '我準備好了！',
                '哈哈！來了來了！'
            ],
            praise: [
                '太棒了！我就知道可以！',
                '哈哈哈！過癮！',
                '這才是我們的風格！'
            ],
            anger: [
                '可惡！讓我再試一次！',
                '我不服！',
                '下次一定行！'
            ],
            trust: [
                '老大！我永遠跟著你！',
                '為了你，赴湯蹈火！',
                '你是我最佩服的人！'
            ],
            love: [
                '老大...我好像喜歡上你了！',
                '跟你在一起，我的心跳好快！',
                '我想永遠保護你！'
            ]
        },
        
        behaviors: {
            loyalty: 90,
            obedience: 80,
            initiative: 100,
            jealousy: 50,
            possessiveness: 65,
            
            decisionStyle: 'impulsive',
            riskTolerance: 95,
            teamwork: 85,
            
            responseToGift: {
                love: '+20',
                like: '+12',
                dislike: '+2',
                hate: '-3'
            },
            
            responseToFailure: '不服輸，立刻重來',
            responseToSuccess: '熱烈慶祝',
            responseToBetrayal: '憤怒但可能原諒'
        },
        
        triggers: {
            highAffection: 70,
            lowAffection: 35,
            jealousyEvent: 55,
            specialEvent: 75
        },
        
        questPreference: ['戰鬥', '挑戰', '冒險'],
        
        giftPreference: {
            luxury: 40,
            power: 70,
            practical: 85,
            romantic: 60
        }
    },
    
    // 4. 忠義型 (Loyal)
    loyal: {
        id: 'loyal',
        name: '忠義',
        description: '忠誠、可靠、重情重義',
        emoji: '🛡️',
        color: '#27ae60',
        
        dialoguePatterns: {
            greeting: [
                '老大，有什麼吩咐？',
                '隨時待命！',
                '老大好！'
            ],
            praise: [
                '這都是應該做的！',
                '能幫上忙就好！',
                '為老大效勞是我的榮幸！'
            ],
            anger: [
                '對不起，我讓你失望了...',
                '我會改進的！',
                '請再給我一次機會！'
            ],
            trust: [
                '老大，我這條命都是你的！',
                '不管發生什麼，我都站在你這邊！',
                '你的事就是我的事！'
            ],
            love: [
                '老大...我願意為你做任何事...',
                '你不只是老大，更是我的全部...',
                '這輩子，我只忠於你一人...'
            ]
        },
        
        behaviors: {
            loyalty: 100,
            obedience: 95,
            initiative: 75,
            jealousy: 30,
            possessiveness: 50,
            
            decisionStyle: 'supportive',
            riskTolerance: 60,
            teamwork: 95,
            
            responseToGift: {
                love: '+18',
                like: '+10',
                dislike: '+3',
                hate: '0'
            },
            
            responseToFailure: '自責但不放棄',
            responseToSuccess: '謙虛喜悅',
            responseToBetrayal: '深深受傷但仍忠誠'
        },
        
        triggers: {
            highAffection: 60,
            lowAffection: 20,
            jealousyEvent: 80,
            specialEvent: 70
        },
        
        questPreference: ['保護', '支援', '守衛'],
        
        giftPreference: {
            luxury: 30,
            power: 50,
            practical: 90,
            romantic: 70
        }
    },
    
    // 5. 魅惑型 (Charming)
    charming: {
        id: 'charming',
        name: '魅惑',
        description: '魅力四射、善於交際',
        emoji: '💋',
        color: '#e91e63',
        
        dialoguePatterns: {
            greeting: [
                '呀，找我有事嗎？親愛的～',
                '來陪我玩嗎？',
                '等你好久了呢～'
            ],
            praise: [
                '你真是太厲害了～',
                '不愧是我看上的男人～',
                '獎勵你一個吻～'
            ],
            anger: [
                '哼！人家生氣了！',
                '真是的...你要怎麼補償我？',
                '不理你了！'
            ],
            trust: [
                '只有在你面前，我才是真實的我...',
                '你知道我的所有秘密...',
                '我的心...只為你跳動...'
            ],
            love: [
                '我...愛上你了...',
                '你就是我的一切...',
                '今晚...留下來好嗎？'
            ]
        },
        
        behaviors: {
            loyalty: 75,
            obedience: 65,
            initiative: 90,
            jealousy: 85,
            possessiveness: 80,
            
            decisionStyle: 'persuasive',
            riskTolerance: 70,
            teamwork: 80,
            
            responseToGift: {
                love: '+25',
                like: '+15',
                dislike: '-8',
                hate: '-20'
            },
            
            responseToFailure: '撒嬌求原諒',
            responseToSuccess: '熱情慶祝',
            responseToBetrayal: '報復但可能回頭'
        },
        
        triggers: {
            highAffection: 65,
            lowAffection: 40,
            jealousyEvent: 50,
            specialEvent: 80
        },
        
        questPreference: ['社交', '誘惑', '談判'],
        
        giftPreference: {
            luxury: 100,
            power: 60,
            practical: 40,
            romantic: 95
        }
    },
    
    // 6. 溫柔型 (Gentle)
    gentle: {
        id: 'gentle',
        name: '溫柔',
        description: '溫柔體貼、善解人意',
        emoji: '🌸',
        color: '#f39c12',
        
        dialoguePatterns: {
            greeting: [
                '您回來了，辛苦了。',
                '需要我幫您準備什麼嗎？',
                '歡迎回來。'
            ],
            praise: [
                '您真的很厲害呢。',
                '我就知道您可以的。',
                '我為您感到驕傲。'
            ],
            anger: [
                '對不起...是我做錯了嗎？',
                '我...我會改的...',
                '請不要生氣...'
            ],
            trust: [
                '有您在，我就安心了...',
                '我願意永遠陪在您身邊...',
                '您是我最重要的人...'
            ],
            love: [
                '我...我喜歡您...',
                '能和您在一起，是我最大的幸福...',
                '今生...只屬於您...'
            ]
        },
        
        behaviors: {
            loyalty: 92,
            obedience: 90,
            initiative: 70,
            jealousy: 60,
            possessiveness: 55,
            
            decisionStyle: 'supportive',
            riskTolerance: 40,
            teamwork: 90,
            
            responseToGift: {
                love: '+22',
                like: '+14',
                dislike: '+5',
                hate: '-5'
            },
            
            responseToFailure: '溫柔安慰',
            responseToSuccess: '溫暖微笑',
            responseToBetrayal: '傷心但選擇原諒'
        },
        
        triggers: {
            highAffection: 75,
            lowAffection: 30,
            jealousyEvent: 65,
            specialEvent: 85
        },
        
        questPreference: ['治療', '照顧', '支援'],
        
        giftPreference: {
            luxury: 60,
            power: 30,
            practical: 80,
            romantic: 100
        }
    },
    
    // 7. 精明型 (Shrewd) - 額外補充
    shrewd: {
        id: 'shrewd',
        name: '精明',
        description: '精明能幹、算計周密',
        emoji: '🧠',
        color: '#16a085',
        
        dialoguePatterns: {
            greeting: [
                '來談正事吧。',
                '時間就是金錢。',
                '有什麼能為您效勞？'
            ],
            praise: [
                '這筆買賣很划算。',
                '投資報酬率不錯。',
                '符合預期收益。'
            ],
            anger: [
                '這是虧本生意。',
                '您這樣會讓我們損失慘重。',
                '我需要重新評估。'
            ],
            trust: [
                '您是我見過最聰明的合作夥伴。',
                '我願意與您共享利潤。',
                '長期合作對雙方都有利。'
            ],
            love: [
                '您...是我唯一不計較得失的人。',
                '和您在一起，利益不再重要。',
                '我願意為您放棄一切。'
            ]
        },
        
        behaviors: {
            loyalty: 80,
            obedience: 70,
            initiative: 85,
            jealousy: 45,
            possessiveness: 60,
            
            decisionStyle: 'calculative',
            riskTolerance: 55,
            teamwork: 75,
            
            responseToGift: {
                love: '+12',
                like: '+8',
                dislike: '-3',
                hate: '-10'
            },
            
            responseToFailure: '冷靜分析損失',
            responseToSuccess: '計算收益',
            responseToBetrayal: '精心報復'
        },
        
        triggers: {
            highAffection: 85,
            lowAffection: 35,
            jealousyEvent: 70,
            specialEvent: 90
        },
        
        questPreference: ['投資', '談判', '情報'],
        
        giftPreference: {
            luxury: 70,
            power: 85,
            practical: 95,
            romantic: 45
        }
    }
};

// ========== AI 行為決策系統 ==========

class AIPersonality {
    constructor(partnerId, personalityType) {
        this.partnerId = partnerId;
        this.personalityType = personalityType;
        this.personality = PERSONALITY_TYPES[personalityType];
        
        // 動態屬性
        this.affection = 50;          // 好感度 0-100
        this.trust = 50;              // 信任度 0-100
        this.mood = 50;               // 心情 0-100
        this.fatigue = 0;             // 疲勞度 0-100
        
        // 事件記憶
        this.memory = {
            gifts: [],                // 收到的禮物
            battles: [],              // 參與的戰鬥
            conversations: [],        // 對話歷史
            specialEvents: []         // 特殊事件
        };
    }
    
    // 獲取當前對話
    getDialogue(type, context = {}) {
        const patterns = this.personality.dialoguePatterns[type];
        if (!patterns || patterns.length === 0) return '...';
        
        // 根據好感度選擇對話
        let dialogue;
        if (this.affection >= 80 && type === 'greeting') {
            dialogue = patterns[patterns.length - 1];  // 高好感用最後一句
        } else if (this.affection <= 30 && type === 'greeting') {
            dialogue = patterns[0];  // 低好感用第一句
        } else {
            dialogue = patterns[Math.floor(Math.random() * patterns.length)];
        }
        
        return dialogue;
    }
    
    // 接收禮物反應
    receiveGift(gift, value) {
        const response = this.personality.behaviors.responseToGift;
        let affectionChange = 0;
        
        // 根據禮物類型和價值計算好感度變化
        if (value >= 90) {
            affectionChange = parseInt(response.love.replace('+', ''));
        } else if (value >= 60) {
            affectionChange = parseInt(response.like.replace('+', ''));
        } else if (value >= 30) {
            affectionChange = parseInt(response.dislike);
        } else {
            affectionChange = parseInt(response.hate);
        }
        
        this.affection = Math.max(0, Math.min(100, this.affection + affectionChange));
        this.memory.gifts.push({ gift, value, time: Date.now() });
        
        return {
            dialogue: this.getDialogue(affectionChange > 0 ? 'praise' : 'anger'),
            affectionChange
        };
    }
    
    // 戰鬥決策
    makeBattleDecision(battleContext) {
        const behaviors = this.personality.behaviors;
        const style = behaviors.decisionStyle;
        
        let action = 'attack';  // 默認行動
        
        // 根據決策風格選擇行動
        switch (style) {
            case 'aggressive':
                action = Math.random() > 0.3 ? 'attack' : 'skill';
                break;
            case 'rational':
                action = battleContext.enemyHealth > 50 ? 'attack' : 'skill';
                break;
            case 'supportive':
                action = battleContext.allyHealth < 50 ? 'heal' : 'attack';
                break;
            case 'impulsive':
                action = Math.random() > 0.5 ? 'skill' : 'attack';
                break;
            default:
                action = 'attack';
        }
        
        this.memory.battles.push({ action, time: Date.now() });
        return action;
    }
    
    // 嫉妒檢查
    checkJealousy(event) {
        const threshold = this.personality.triggers.jealousyEvent;
        const jealousyLevel = this.personality.behaviors.jealousy;
        
        if (jealousyLevel >= threshold && event.type === 'other_partner_interaction') {
            this.affection -= 5;
            this.mood -= 10;
            return {
                isJealous: true,
                dialogue: '哼...你和她關係很好呢...',
                affectionChange: -5
            };
        }
        
        return { isJealous: false };
    }
    
    // 觸發特殊事件
    triggerSpecialEvent() {
        if (this.affection >= this.personality.triggers.specialEvent) {
            return {
                unlocked: true,
                eventType: 'love_confession',
                dialogue: this.getDialogue('love')
            };
        }
        return { unlocked: false };
    }
    
    // 每日更新
    dailyUpdate() {
        // 疲勞度自然降低
        this.fatigue = Math.max(0, this.fatigue - 10);
        
        // 心情趨向中性
        if (this.mood > 50) this.mood -= 2;
        if (this.mood < 50) this.mood += 2;
        
        // 低好感度有機率離開（特定性格）
        if (this.affection < 20 && this.personality.behaviors.loyalty < 80) {
            return { risk: 'may_leave', warning: true };
        }
        
        return { risk: 'none' };
    }
}

// 匯出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PERSONALITY_TYPES, AIPersonality };
}
