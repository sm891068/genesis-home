// ========== AI 性格邏輯庫 ==========
// 8 個完整的性格類型，用於定義角色的基礎行為模式

const AIPersonalityLibrary = {
    // 1. 霸道型（Dominant）
    dominant: {
        id: 'dominant',
        name: '霸道',
        description: '強勢主導，喜歡掌控一切，對愛人極度佔有',
        emoji: '👑',
        color: '#8e44ad',
        
        dialoguePatterns: {
            greeting: [
                '你來了。記住，你是我的。',
                '別讓我等太久，知道嗎？',
                '乖乖聽話，我會好好疼你的。'
            ],
            praise: [
                '做得好。繼續努力，別讓我失望。',
                '不錯嘛，看來你還挺聰明的。',
                '這才是我看中的人。'
            ],
            anger: [
                '你敢背叛我？找死是嗎？',
                '給我解釋清楚，否則後果自負。',
                '你最好有個合理的理由。'
            ],
            trust: [
                '只有你，能看到我這一面。',
                '我不會讓任何人傷害你。',
                '記住，你永遠是我的。'
            ],
            love: [
                '你是我的全世界，這輩子都不會放手。',
                '不管發生什麼，我都會護著你。',
                '我的心，只為你一個人跳動。'
            ]
        },
        
        behaviorScores: {
            loyalty: 85,          // 忠誠度
            obedience: 60,        // 服從度
            initiative: 95,       // 主動性
            jealousy: 70,         // 嫉妒心
            possessiveness: 90    // 佔有慾
        },
        
        decisionMaking: {
            style: 'aggressive',  // 決策風格：aggressive, cautious, balanced
            riskTolerance: 80,    // 風險承受度 (0-100)
            teamwork: 60          // 團隊合作度 (0-100)
        },
        
        interactionResponses: {
            giftReaction: {
                love: 15,    // 喜歡的禮物：愛意+15
                like: 8,     // 普通禮物：愛意+8
                dislike: -5, // 不喜歡：愛意-5
                hate: -15    // 討厭的禮物：愛意-15
            },
            failureResponse: '失敗了？沒關係，我會幫你擺平。',
            successResponse: '果然，跟著我準沒錯。',
            betrayalResponse: '你竟敢背叛我？我會讓你後悔一輩子。'
        },
        
        triggers: {
            highAffection: 80,    // 高好感度觸發特殊事件
            lowAffection: 30,     // 低好感度觸發警告
            jealousyEvent: 60,    // 嫉妒事件觸發閾值
            specialEvent: 90      // 特殊劇情觸發閾值
        },
        
        questPreferences: ['征服', '統治', '擴張'],
        giftPreferences: {
            luxury: 100,      // 奢侈品
            power: 95,        // 權力象徵
            practical: 60,    // 實用品
            romantic: 40      // 浪漫禮物
        }
    },

    // 2. 冷酷型（Cold）
    cold: {
        id: 'cold',
        name: '冷酷',
        description: '理性至上，情感淡漠，但一旦動心便是深情',
        emoji: '❄️',
        color: '#3498db',
        
        dialoguePatterns: {
            greeting: [
                '有事？',
                '...（點頭）',
                '說吧，什麼事。'
            ],
            praise: [
                '嗯。',
                '...還行。',
                '不算太差。'
            ],
            anger: [
                '...（冷漠地看著你）',
                '別再浪費我的時間。',
                '你讓我很失望。'
            ],
            trust: [
                '你...是特別的。',
                '我不常這樣，但你是例外。',
                '...謝謝你。'
            ],
            love: [
                '我不知道該怎麼表達，但...我不想失去你。',
                '你是唯一能融化我心的人。',
                '...這輩子，只有你。'
            ]
        },
        
        behaviorScores: {
            loyalty: 95,
            obedience: 50,
            initiative: 70,
            jealousy: 40,
            possessiveness: 60
        },
        
        decisionMaking: {
            style: 'cautious',
            riskTolerance: 50,
            teamwork: 70
        },
        
        interactionResponses: {
            giftReaction: {
                love: 20,
                like: 5,
                dislike: 0,
                hate: -10
            },
            failureResponse: '...意料之中。',
            successResponse: '...（點頭）',
            betrayalResponse: '...我早該知道。（轉身離去）'
        },
        
        triggers: {
            highAffection: 90,
            lowAffection: 20,
            jealousyEvent: 50,
            specialEvent: 95
        },
        
        questPreferences: ['策略', '暗殺', '情報'],
        giftPreferences: {
            luxury: 30,
            power: 80,
            practical: 95,
            romantic: 20
        }
    },

    // 3. 溫柔型（Gentle）
    gentle: {
        id: 'gentle',
        name: '溫柔',
        description: '體貼細心，善解人意，總是為他人著想',
        emoji: '🌸',
        color: '#e74c3c',
        
        dialoguePatterns: {
            greeting: [
                '你來了呀，有沒有好好休息？',
                '今天辛苦了，要不要喝杯茶？',
                '看到你我就放心了。'
            ],
            praise: [
                '你真的好厲害！我為你感到驕傲。',
                '太好了！我就知道你可以的。',
                '你總是這麼優秀，真不愧是我喜歡的人。'
            ],
            anger: [
                '我...我有點難過。',
                '為什麼要這樣對我呢？',
                '...（默默流淚）'
            ],
            trust: [
                '有你在，我什麼都不怕。',
                '謝謝你一直陪著我。',
                '我最信任的人，就是你了。'
            ],
            love: [
                '能遇見你，是我這輩子最幸運的事。',
                '我願意為你做任何事，只要你開心。',
                '我的心裡，只有你一個人的位置。'
            ]
        },
        
        behaviorScores: {
            loyalty: 95,
            obedience: 85,
            initiative: 60,
            jealousy: 50,
            possessiveness: 40
        },
        
        decisionMaking: {
            style: 'balanced',
            riskTolerance: 40,
            teamwork: 95
        },
        
        interactionResponses: {
            giftReaction: {
                love: 25,
                like: 15,
                dislike: 5,
                hate: -5
            },
            failureResponse: '沒關係，我們一起再試試看。',
            successResponse: '太好了！我就知道你可以的！',
            betrayalResponse: '為什麼...我那麼相信你...'
        },
        
        triggers: {
            highAffection: 70,
            lowAffection: 40,
            jealousyEvent: 70,
            specialEvent: 85
        },
        
        questPreferences: ['救援', '治療', '和平'],
        giftPreferences: {
            luxury: 40,
            power: 30,
            practical: 70,
            romantic: 100
        }
    },

    // 4. 傲嬌型（Tsundere）
    tsundere: {
        id: 'tsundere',
        name: '傲嬌',
        description: '嘴硬心軟，明明在意卻故作冷淡',
        emoji: '😤',
        color: '#e67e22',
        
        dialoguePatterns: {
            greeting: [
                '哼，你來幹嘛？我可沒叫你來。',
                '別、別誤會！我才不是在等你！',
                '你來了啊...不是，我才沒有等你！'
            ],
            praise: [
                '哼，這點小事誰不會啊？',
                '還、還行吧...不要太得意了！',
                '...做得不錯。（小聲）'
            ],
            anger: [
                '你這個笨蛋！白痴！大豬頭！',
                '氣死我了！再也不理你了！',
                '走開啦！我不想看到你！'
            ],
            trust: [
                '只、只有你...算了，反正就是這樣。',
                '哼，不是我想依賴你，只是剛好而已。',
                '...謝謝你。（轉過頭）'
            ],
            love: [
                '才、才不是喜歡你呢！只是...算了！',
                '笨蛋...我、我喜歡你啦！（羞紅臉）',
                '都怪你...讓我變成這樣...'
            ]
        },
        
        behaviorScores: {
            loyalty: 90,
            obedience: 45,
            initiative: 75,
            jealousy: 85,
            possessiveness: 75
        },
        
        decisionMaking: {
            style: 'aggressive',
            riskTolerance: 65,
            teamwork: 50
        },
        
        interactionResponses: {
            giftReaction: {
                love: 18,
                like: 10,
                dislike: -3,
                hate: -12
            },
            failureResponse: '哼，我就知道會這樣！（偷偷擔心）',
            successResponse: '哼，運氣好而已！才、才不是因為你厲害！',
            betrayalResponse: '我、我才不在乎呢！笨蛋！（哭著跑開）'
        },
        
        triggers: {
            highAffection: 75,
            lowAffection: 35,
            jealousyEvent: 80,
            specialEvent: 88
        },
        
        questPreferences: ['競技', '挑戰', '復仇'],
        giftPreferences: {
            luxury: 70,
            power: 60,
            practical: 55,
            romantic: 85
        }
    },

    // 5. 腹黑型（Cunning）
    cunning: {
        id: 'cunning',
        name: '腹黑',
        description: '表面溫和，內心狡詐，善於謀劃',
        emoji: '😏',
        color: '#9b59b6',
        
        dialoguePatterns: {
            greeting: [
                '呵呵，來了呀～讓我好等。',
                '哎呀，這不是我最愛的人嗎？',
                '來了啊，正好我有件有趣的事想跟你說呢～'
            ],
            praise: [
                '呵呵，不錯不錯，你越來越有趣了。',
                '真聰明，果然沒看錯你呢～',
                '很好，繼續保持，我很期待你的表現喔～'
            ],
            anger: [
                '呵呵...你似乎忘記誰才是主導者了？',
                '真遺憾，我本來還很期待的呢。',
                '...那就別怪我不客氣了。（微笑）'
            ],
            trust: [
                '你知道嗎？你是第一個讓我卸下防備的人。',
                '我的秘密，都可以告訴你喔～',
                '呵呵，我們是最親密的搭檔呢。'
            ],
            love: [
                '你已經逃不掉了，因為我的心早就被你偷走了呢～',
                '我這輩子，只會對你一個人動真心。',
                '呵呵，我可是很執著的，你可別想逃。'
            ]
        },
        
        behaviorScores: {
            loyalty: 80,
            obedience: 40,
            initiative: 90,
            jealousy: 75,
            possessiveness: 85
        },
        
        decisionMaking: {
            style: 'cautious',
            riskTolerance: 70,
            teamwork: 55
        },
        
        interactionResponses: {
            giftReaction: {
                love: 22,
                like: 12,
                dislike: -2,
                hate: -18
            },
            failureResponse: '呵呵，計畫總有失敗的時候，我們來想想B方案吧。',
            successResponse: '果然不出我所料～你真是我最棒的棋子呢。',
            betrayalResponse: '呵呵...有趣，那就讓我們看看誰才是贏家吧。（危險的笑容）'
        },
        
        triggers: {
            highAffection: 85,
            lowAffection: 25,
            jealousyEvent: 75,
            specialEvent: 92
        },
        
        questPreferences: ['陰謀', '操縱', '策反'],
        giftPreferences: {
            luxury: 85,
            power: 90,
            practical: 65,
            romantic: 75
        }
    },

    // 6. 天真型（Innocent）
    innocent: {
        id: 'innocent',
        name: '天真',
        description: '單純可愛，對世界充滿好奇與善意',
        emoji: '🌟',
        color: '#f39c12',
        
        dialoguePatterns: {
            greeting: [
                '哇！你來啦！我好想你喔！',
                '嘿嘿，你終於來了！我等你好久了！',
                '你好你好！今天也要一起玩嗎？'
            ],
            praise: [
                '哇塞！你好厲害喔！',
                '太棒了！我就知道你最強了！',
                '嘿嘿，你是我的英雄！'
            ],
            anger: [
                '嗚嗚...為什麼要這樣...（哭泣）',
                '我、我討厭你！（跑開）',
                '你是壞人...我不要理你了...'
            ],
            trust: [
                '你是我最好最好的朋友了！',
                '我什麼都跟你說喔！',
                '我最喜歡和你在一起了！'
            ],
            love: [
                '我、我喜歡你！超級超級喜歡！',
                '嘿嘿，我們要一直一直在一起喔！',
                '你是我的全世界！'
            ]
        },
        
        behaviorScores: {
            loyalty: 100,
            obedience: 90,
            initiative: 50,
            jealousy: 45,
            possessiveness: 35
        },
        
        decisionMaking: {
            style: 'balanced',
            riskTolerance: 30,
            teamwork: 100
        },
        
        interactionResponses: {
            giftReaction: {
                love: 30,
                like: 20,
                dislike: 8,
                hate: 0
            },
            failureResponse: '沒關係沒關係！我們再試一次！',
            successResponse: '耶！我們成功了！太開心了！',
            betrayalResponse: '為什麼...我那麼相信你的...（崩潰大哭）'
        },
        
        triggers: {
            highAffection: 60,
            lowAffection: 45,
            jealousyEvent: 65,
            specialEvent: 80
        },
        
        questPreferences: ['探險', '收集', '交友'],
        giftPreferences: {
            luxury: 50,
            power: 20,
            practical: 60,
            romantic: 95
        }
    },

    // 7. 神秘型（Mysterious）
    mysterious: {
        id: 'mysterious',
        name: '神秘',
        description: '深不可測，行為莫測，充滿謎團',
        emoji: '🌙',
        color: '#34495e',
        
        dialoguePatterns: {
            greeting: [
                '...（微笑）',
                '我就知道你會來。',
                '呵...命運的齒輪又轉動了。'
            ],
            praise: [
                '有趣，非常有趣。',
                '你超出了我的預期。',
                '...看來我沒看錯人。'
            ],
            anger: [
                '...（沉默地凝視）',
                '你破壞了平衡。',
                '...這個選擇，你會後悔的。'
            ],
            trust: [
                '你是第一個走進我內心的人。',
                '我的秘密，只對你訴說。',
                '...你讓我感到了久違的溫暖。'
            ],
            love: [
                '也許...這就是命運的安排。',
                '我從未想過會為某人動心...直到遇見你。',
                '...你是我黑暗中的唯一光芒。'
            ]
        },
        
        behaviorScores: {
            loyalty: 75,
            obedience: 30,
            initiative: 85,
            jealousy: 55,
            possessiveness: 70
        },
        
        decisionMaking: {
            style: 'cautious',
            riskTolerance: 60,
            teamwork: 45
        },
        
        interactionResponses: {
            giftReaction: {
                love: 25,
                like: 10,
                dislike: 0,
                hate: -8
            },
            failureResponse: '...一切都在計畫之中。',
            successResponse: '果然如此...命運早已注定。',
            betrayalResponse: '...我早已看穿了這個結局。（消失在暗影中）'
        },
        
        triggers: {
            highAffection: 88,
            lowAffection: 22,
            jealousyEvent: 68,
            specialEvent: 95
        },
        
        questPreferences: ['解謎', '探秘', '預言'],
        giftPreferences: {
            luxury: 45,
            power: 75,
            practical: 50,
            romantic: 60
        }
    },

    // 8. 熱血型（Passionate）
    passionate: {
        id: 'passionate',
        name: '熱血',
        description: '充滿活力，勇往直前，永不言敗',
        emoji: '🔥',
        color: '#c0392b',
        
        dialoguePatterns: {
            greeting: [
                '喲！來得正好！準備好大幹一場了嗎？',
                '哈哈！等你好久了！走，咱們去闖一番！',
                '燃起來了！今天一定要做點大事！'
            ],
            praise: [
                '幹得漂亮！這才是我認識的你！',
                '哈哈哈！太熱血了！我喜歡！',
                '就是這樣！繼續保持這股氣勢！'
            ],
            anger: [
                '可惡！你竟敢這樣！我跟你拼了！',
                '混帳！我絕對不會原諒你！',
                '太過分了！給我記住！'
            ],
            trust: [
                '兄弟！你就是我最信任的夥伴！',
                '有你在，我什麼都不怕！',
                '我們一起並肩作戰，直到最後！'
            ],
            love: [
                '我喜歡你！超級喜歡！這就是我的心意！',
                '我會保護你一輩子！這是我的誓言！',
                '你就是我的全部！我會用生命守護你！'
            ]
        },
        
        behaviorScores: {
            loyalty: 100,
            obedience: 55,
            initiative: 100,
            jealousy: 60,
            possessiveness: 50
        },
        
        decisionMaking: {
            style: 'aggressive',
            riskTolerance: 95,
            teamwork: 85
        },
        
        interactionResponses: {
            giftReaction: {
                love: 20,
                like: 15,
                dislike: 5,
                hate: -10
            },
            failureResponse: '沒關係！失敗是成功之母！我們再來一次！',
            successResponse: '哈哈哈！我就知道我們可以的！太爽了！',
            betrayalResponse: '你...竟然背叛我...（暴怒）我絕對不會放過你！'
        },
        
        triggers: {
            highAffection: 65,
            lowAffection: 40,
            jealousyEvent: 70,
            specialEvent: 85
        },
        
        questPreferences: ['戰鬥', '挑戰', '守護'],
        giftPreferences: {
            luxury: 40,
            power: 85,
            practical: 90,
            romantic: 65
        }
    }
};

// 匯出
if (typeof window !== 'undefined') {
    window.AIPersonalityLibrary = AIPersonalityLibrary;
}
