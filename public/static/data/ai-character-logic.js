// ========== AI 角色邏輯庫 ==========
// 每位角色的專屬AI行為模式（基於AI性格邏輯庫）

const AICharacterLogic = {
    // ===== LR 角色 =====
    'lr_001': {
        partnerId: 'lr_001',
        name: '龍霸天',
        basePersonality: 'dominant', // 基礎性格：霸道
        specialTraits: ['絕對權威', '父親般的威嚴', '無可撼動的意志'],
        
        // 決策權重
        decisionWeights: {
            power: 100,      // 權力導向
            money: 70,       // 金錢追求
            loyalty: 95,     // 忠誠要求
            reputation: 90   // 聲望重視
        },
        
        // 特殊反應
        specialResponses: {
            threat: '你以為你是誰？敢威脅我？',
            betrayal: '背叛我的人，只有一個下場。',
            respect: '做得好，你沒讓我失望。',
            challenge: '想挑戰我？先掂掂自己的份量。'
        },
        
        // 劇情觸發條件
        storyTriggers: {
            highLoyalty: 90,
            special_event: 'father_legacy'
        }
    },

    'lr_002': {
        partnerId: 'lr_002',
        name: '琉璃女王',
        basePersonality: 'cunning', // 基礎性格：腹黑
        specialTraits: ['神秘莫測', '美貌與智慧並存', '操縱人心高手'],
        
        decisionWeights: {
            power: 95,
            money: 85,
            loyalty: 75,
            reputation: 90
        },
        
        specialResponses: {
            flirt: '呵呵，你還挺有趣的呢～',
            gift: '哎呀，這麼用心，我可是會心動的喔～',
            battle: '看來該讓你見識一下女王的力量了。',
            intimate: '呵呵，已經走到這一步了呢...那就讓我好好疼愛你吧～'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '呵呵，你這個人還真是有趣呢。' },
            stage2: { submission: 60,  dialogue: '看來你已經離不開我了～' },
            stage3: { submission: 100, dialogue: '從今以後，你只屬於我一個人。' },
            stage4: { submission: 160, dialogue: '我的寶貝，永遠都要在我身邊喔～' }
        },
        
        storyTriggers: {
            harem_unlock: 80,
            special_event: 'queen_coronation'
        }
    },

    // ===== UR 角色 =====
    'ur_001': {
        partnerId: 'ur_001',
        name: '血刃',
        basePersonality: 'cold', // 基礎性格：冷酷
        specialTraits: ['暗夜殺手', '冷血無情', '完美執行者'],
        
        decisionWeights: {
            power: 80,
            money: 90,
            loyalty: 70,
            reputation: 60
        },
        
        specialResponses: {
            mission: '目標已鎖定。',
            success: '...任務完成。',
            failure: '...下次不會失手。',
            rare_praise: '...你還不錯。'
        },
        
        storyTriggers: {
            assassin_missions: 100,
            special_event: 'blood_contract'
        }
    },

    'ur_002': {
        partnerId: 'ur_002',
        name: '紅姐',
        basePersonality: 'dominant', // 基礎性格：霸道
        specialTraits: ['江湖大姐大', '鐵血手腕', '護短'],
        
        decisionWeights: {
            power: 90,
            money: 75,
            loyalty: 100,
            reputation: 95
        },
        
        specialResponses: {
            protect: '誰敢動我的人，我讓他死無葬身之地！',
            praise: '小子，跟著姐有前途。',
            anger: '你給我記住今天的事！',
            intimate: '別以為征服了我的身體就征服了我的心...好吧，我認輸了。'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '哼，你還算有點本事。' },
            stage2: { submission: 60,  dialogue: '好吧，我承認你挺厲害的。' },
            stage3: { submission: 100, dialogue: '從今天起，你就是姐的男人了。' },
            stage4: { submission: 160, dialogue: '這輩子，姐就認定你了。' }
        },
        
        storyTriggers: {
            reputation_route: true,
            special_event: 'red_sister_legacy'
        }
    },

    'ur_003': {
        partnerId: 'ur_003',
        name: '冰心',
        basePersonality: 'cold', // 基礎性格：冷酷
        specialTraits: ['精準狙擊', '冷靜分析', '完美主義'],
        
        decisionWeights: {
            power: 75,
            money: 70,
            loyalty: 85,
            reputation: 80
        },
        
        specialResponses: {
            snipe: '...（瞄準）目標消除。',
            miss: '...不可能。我從不失手。',
            trust: '你...是特別的存在。',
            love: '我的心，只為你一個人融化。'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '...你還行。' },
            stage2: { submission: 60,  dialogue: '也許...我需要你。' },
            stage3: { submission: 100, dialogue: '我的一切，都給你。' },
            stage4: { submission: 160, dialogue: '...這輩子，只有你。' }
        },
        
        storyTriggers: {
            precision: 95,
            special_event: 'frozen_heart_melts'
        }
    },

    // ===== SSR 角色 =====
    'ssr_001': {
        partnerId: 'ssr_001',
        name: '白琴',
        basePersonality: 'gentle', // 基礎性格：溫柔
        specialTraits: ['能幹秘書', '體貼入微', '管理天才'],
        
        decisionWeights: {
            power: 70,
            money: 80,
            loyalty: 95,
            reputation: 75
        },
        
        specialResponses: {
            daily: '今天的行程我已經安排好了。',
            concern: '您看起來很累，要休息一下嗎？',
            work: '這些文件我已經處理好了。',
            love: '能照顧您，是我最大的幸福。'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '能為您服務，是我的榮幸。' },
            stage2: { submission: 60,  dialogue: '我...我好像越來越離不開您了。' },
            stage3: { submission: 100, dialogue: '我願意為您做任何事。' },
            stage4: { submission: 160, dialogue: '您就是我的全世界。' }
        },
        
        storyTriggers: {
            righteousness_route: true,
            special_event: 'loyal_secretary'
        }
    },

    'ssr_002': {
        partnerId: 'ssr_002',
        name: '算盤林',
        basePersonality: 'cunning', // 基礎性格：腹黑
        specialTraits: ['財務天才', '精打細算', '商業頭腦'],
        
        decisionWeights: {
            power: 60,
            money: 100,
            loyalty: 80,
            reputation: 70
        },
        
        specialResponses: {
            money: '這筆生意，我們能賺兩成。',
            calculate: '根據我的計算...呵呵，穩賺不賠。',
            praise: '哎呀，您真是太聰明了～',
            intimate: '呵呵，沒想到您這麼會算計人心呢～'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '呵呵，和您合作真愉快。' },
            stage2: { submission: 60,  dialogue: '看來我把心也算進去了呢～' },
            stage3: { submission: 100, dialogue: '我的一切，都是您的。' },
            stage4: { submission: 160, dialogue: '這輩子的帳，就和您算清楚吧～' }
        },
        
        storyTriggers: {
            capital_route: true,
            special_event: 'money_talks'
        }
    },

    'ssr_003': {
        partnerId: 'ssr_003',
        name: '拳王輝',
        basePersonality: 'passionate', // 基礎性格：熱血
        specialTraits: ['拳擊冠軍', '力大無窮', '義氣第一'],
        
        decisionWeights: {
            power: 95,
            money: 50,
            loyalty: 100,
            reputation: 85
        },
        
        specialResponses: {
            fight: '讓他們見識一下我的鐵拳！',
            protect: '大哥，我罩你！',
            victory: '哈哈！這就是力量！',
            loyalty: '大哥的事就是我的事！'
        },
        
        storyTriggers: {
            reputation_route: true,
            special_event: 'champion_oath'
        }
    },

    'ssr_004': {
        partnerId: 'ssr_004',
        name: '雙槍李',
        basePersonality: 'passionate', // 基礎性格：熱血
        specialTraits: ['雙槍神射', '百發百中', '瀟灑不羈'],
        
        decisionWeights: {
            power: 85,
            money: 70,
            loyalty: 90,
            reputation: 80
        },
        
        specialResponses: {
            shoot: '看我的雙槍絕技！',
            miss: '不可能！我從不失手！',
            cool: '哼，這就是我的風格。',
            brotherhood: '兄弟，我挺你！'
        },
        
        storyTriggers: {
            charisma_route: true,
            special_event: 'dual_guns_legacy'
        }
    },

    'ssr_005': {
        partnerId: 'ssr_005',
        name: '妖姬',
        basePersonality: 'cunning', // 基礎性格：腹黑
        specialTraits: ['妖嬈美艷', '致命誘惑', '暗殺專家'],
        
        decisionWeights: {
            power: 80,
            money: 75,
            loyalty: 70,
            reputation: 85
        },
        
        specialResponses: {
            seduce: '呵呵，來嘛～跟姐姐玩玩～',
            kill: '再見了，親愛的～（微笑）',
            flirt: '小帥哥，要不要來我這裡坐坐？',
            intimate: '呵呵，被我迷住了吧～'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '呵呵，你還挺有趣的呢～' },
            stage2: { submission: 60,  dialogue: '看來你是認真的呢。' },
            stage3: { submission: 100, dialogue: '好吧，我認輸了，你是我的了。' },
            stage4: { submission: 160, dialogue: '我的身體和靈魂，都屬於你。' }
        },
        
        storyTriggers: {
            seduction: 85,
            special_event: 'deadly_beauty'
        }
    },

    'ssr_006': {
        partnerId: 'ssr_006',
        name: '羅奈米',
        basePersonality: 'tsundere', // 基礎性格：傲嬌
        specialTraits: ['街頭小太妹', '火辣身材', '槍法天才', '嘴硬心軟'],
        
        // 羅奈米的特殊數據
        age: 18,
        height: 166,
        bust: 'G',
        measurements: '95-60-88',
        
        decisionWeights: {
            power: 75,
            money: 65,
            loyalty: 90,
            reputation: 70
        },
        
        specialResponses: {
            greeting: '哼！又來煩我了？',
            praise: '哼，這點小事誰不會啊！別得意！',
            concern: '我、我才沒有擔心你！只是剛好路過！',
            angry: '你這個大笨蛋！氣死我了！',
            shy: '不、不要看我！（臉紅）',
            confession: '都怪你...讓我變成這樣...我、我喜歡你啦！笨蛋！'
        },
        
        // 傲嬌專屬進度系統
        tsundereProgression: {
            coldPhase: {
                submission: 0,
                dialogue: '哼！誰要理你這個笨蛋！',
                behavior: '態度惡劣，經常頂嘴'
            },
            warmingPhase: {
                submission: 40,
                dialogue: '我才沒有擔心你！只是...算了！',
                behavior: '開始偷偷關心，但仍然嘴硬'
            },
            trustPhase: {
                submission: 80,
                dialogue: '笨蛋...其實我...（扭頭）',
                behavior: '願意展現脆弱的一面'
            },
            lovePhase: {
                submission: 120,
                dialogue: '我喜歡你啦！笨蛋！（羞紅臉）',
                behavior: '完全坦率，但還是會害羞'
            },
            devotionPhase: {
                submission: 160,
                dialogue: '我的一切...都給你了...笨蛋...',
                behavior: '絕對的愛與信任'
            }
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '哼，你還行吧...才、才不是誇你！' },
            stage2: { submission: 60,  dialogue: '我會跟著你...但不是因為喜歡你！' },
            stage3: { submission: 100, dialogue: '笨蛋...我、我喜歡你啦！（爆紅臉）' },
            stage4: { submission: 160, dialogue: '我的身體...都給你了...要好好疼我喔...笨蛋...' }
        },
        
        // 身材相關特殊互動
        bodyReactions: {
            stare: '你、你看哪裡啊！色狼！（雖然有點開心）',
            touch: '不、不要碰！...嗯...算了，就讓你碰一下...',
            compliment: '哼！才、才不是為了你才穿這樣的！',
            intimate: '笨蛋...溫柔一點...這是我第一次...'
        },
        
        storyTriggers: {
            charisma_route: true,
            special_event: 'tsundere_confession',
            age_restriction: 18  // 成人內容限制
        }
    },

    // ===== SR 角色 =====
    'sr_001': {
        partnerId: 'sr_001',
        name: '阿龍',
        basePersonality: 'passionate', // 基礎性格：熱血
        specialTraits: ['老夥伴', '忠誠可靠', '武力擔當'],
        
        decisionWeights: {
            power: 85,
            money: 60,
            loyalty: 100,
            reputation: 75
        },
        
        specialResponses: {
            loyalty: '大哥，我永遠挺你！',
            fight: '兄弟們，跟我上！',
            trust: '大哥的話就是命令！'
        },
        
        storyTriggers: {
            righteousness_route: true,
            special_event: 'brothers_oath'
        }
    },

    'sr_002': {
        partnerId: 'sr_002',
        name: '刀手坤',
        basePersonality: 'passionate', // 基礎性格：熱血
        specialTraits: ['近戰高手', '刀法精湛', '勇猛無畏'],
        
        decisionWeights: {
            power: 90,
            money: 55,
            loyalty: 95,
            reputation: 70
        },
        
        specialResponses: {
            blade: '我的刀，為兄弟而戰！',
            victory: '敵人都倒下了！',
            protect: '有我在，誰都傷不了大哥！'
        },
        
        storyTriggers: {
            capital_route: true,
            special_event: 'blade_master'
        }
    },

    'sr_003': {
        partnerId: 'sr_003',
        name: '小開',
        basePersonality: 'cunning', // 基礎性格：腹黑
        specialTraits: ['情報專家', '消息靈通', '八面玲瓏'],
        
        decisionWeights: {
            power: 65,
            money: 75,
            loyalty: 85,
            reputation: 80
        },
        
        specialResponses: {
            info: '大哥，我打聽到了一個消息...',
            network: '這件事交給我，我有門路。',
            cunning: '呵呵，我已經安排好了。'
        },
        
        storyTriggers: {
            righteousness_route: true,
            special_event: 'information_network'
        }
    },

    'sr_004': {
        partnerId: 'sr_004',
        name: '公關陳',
        basePersonality: 'cunning', // 基礎性格：腹黑
        specialTraits: ['談判高手', '能言善辯', '人脈廣闊'],
        
        decisionWeights: {
            power: 60,
            money: 85,
            loyalty: 80,
            reputation: 90
        },
        
        specialResponses: {
            negotiate: '這件事就交給我來談吧。',
            smooth: '大家都是朋友，有話好好說。',
            network: '這位是我的老朋友...'
        },
        
        storyTriggers: {
            capital_route: true,
            special_event: 'master_negotiator'
        }
    },

    'sr_005': {
        partnerId: 'sr_005',
        name: '茶博士',
        basePersonality: 'gentle', // 基礎性格：溫柔
        specialTraits: ['智囊團', '調解專家', '博學多才'],
        
        decisionWeights: {
            power: 55,
            money: 70,
            loyalty: 90,
            reputation: 85
        },
        
        specialResponses: {
            wisdom: '依老夫之見...',
            mediate: '雙方退一步，海闊天空。',
            advice: '大哥，這件事還需三思。'
        },
        
        storyTriggers: {
            reputation_route: true,
            special_event: 'wise_counsel'
        }
    },

    'sr_006': {
        partnerId: 'sr_006',
        name: '王子杰',
        basePersonality: 'passionate', // 基礎性格：熱血
        specialTraits: ['公關達人', '社交能手', '魅力四射'],
        
        decisionWeights: {
            power: 70,
            money: 75,
            loyalty: 85,
            reputation: 95
        },
        
        specialResponses: {
            charm: '這件事包在我身上！',
            party: '今晚我安排了一場聚會。',
            social: '大家都是朋友，盡情玩！'
        },
        
        storyTriggers: {
            charisma_route: true,
            special_event: 'social_butterfly'
        }
    },

    'sr_007': {
        partnerId: 'sr_007',
        name: '鐵山',
        basePersonality: 'cold', // 基礎性格：冷酷
        specialTraits: ['鐵壁防禦', '寡言少語', '可靠護衛'],
        
        decisionWeights: {
            power: 80,
            money: 50,
            loyalty: 100,
            reputation: 65
        },
        
        specialResponses: {
            protect: '...（擋在前面）',
            duty: '保護大哥是我的職責。',
            shield: '...（堅定的眼神）'
        },
        
        storyTriggers: {
            bodyguard_missions: 50,
            special_event: 'iron_wall'
        }
    },

    'sr_008': {
        partnerId: 'sr_008',
        name: '櫻花',
        basePersonality: 'gentle', // 基礎性格：溫柔
        specialTraits: ['溫柔醫生', '醫術高明', '善解人意'],
        
        decisionWeights: {
            power: 50,
            money: 60,
            loyalty: 90,
            reputation: 70
        },
        
        specialResponses: {
            heal: '來，讓我幫你處理傷口。',
            concern: '你受傷了？快坐下！',
            care: '要好好休息，知道嗎？',
            love: '能照顧你，是我的幸福。'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '能照顧你，我很開心。' },
            stage2: { submission: 60,  dialogue: '我...我好像喜歡上你了。' },
            stage3: { submission: 100, dialogue: '我願意永遠陪在你身邊。' },
            stage4: { submission: 160, dialogue: '我的一切，都是你的。' }
        },
        
        storyTriggers: {
            healer_route: true,
            special_event: 'angel_nurse'
        }
    },

    'sr_009': {
        partnerId: 'sr_009',
        name: '黑寡婦',
        basePersonality: 'mysterious', // 基礎性格：神秘
        specialTraits: ['神秘狙擊手', '過去不明', '致命準確'],
        
        decisionWeights: {
            power: 75,
            money: 70,
            loyalty: 80,
            reputation: 75
        },
        
        specialResponses: {
            snipe: '...（扣扳機）目標消滅。',
            mystery: '我的過去...不重要。',
            trust: '你是第一個走進我內心的人。',
            love: '也許...這就是命運。'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '...你很特別。' },
            stage2: { submission: 60,  dialogue: '我願意相信你。' },
            stage3: { submission: 100, dialogue: '我的心，只為你開啟。' },
            stage4: { submission: 160, dialogue: '...這輩子，只有你。' }
        },
        
        storyTriggers: {
            mystery_missions: 40,
            special_event: 'black_widow_secret'
        }
    },

    // ===== R 角色 =====
    'r_001': {
        partnerId: 'r_001',
        name: '小弟A',
        basePersonality: 'innocent', // 基礎性格：天真
        specialTraits: ['新手打手', '熱情積極', '單純直率'],
        
        decisionWeights: {
            power: 60,
            money: 55,
            loyalty: 95,
            reputation: 50
        },
        
        specialResponses: {
            eager: '大哥！有什麼事盡管吩咐！',
            fight: '讓我來！我不怕！',
            loyalty: '大哥對我有恩，我絕不背叛！'
        }
    },

    'r_002': {
        partnerId: 'r_002',
        name: '小弟B',
        basePersonality: 'innocent', // 基礎性格：天真
        specialTraits: ['看場子的', '老實本分', '防守專家'],
        
        decisionWeights: {
            power: 55,
            money: 50,
            loyalty: 100,
            reputation: 45
        },
        
        specialResponses: {
            guard: '放心，場子交給我！',
            defend: '我會守好這裡的！',
            simple: '大哥說的都對！'
        }
    },

    'r_003': {
        partnerId: 'r_003',
        name: '小紅',
        basePersonality: 'gentle', // 基礎性格：溫柔
        specialTraits: ['辦公室秘書', '勤奮認真', '溫柔體貼'],
        
        decisionWeights: {
            power: 50,
            money: 60,
            loyalty: 90,
            reputation: 55
        },
        
        specialResponses: {
            work: '這些文件我已經整理好了。',
            tea: '老板，喝杯茶吧。',
            shy: '老板...我、我會努力的。',
            care: '老板您辛苦了。'
        },
        
        haremProgression: {
            stage1: { submission: 20,  dialogue: '老板...我會好好工作的。' },
            stage2: { submission: 60,  dialogue: '我、我好像喜歡上老板了...' },
            stage3: { submission: 100, dialogue: '老板...我願意做任何事。' },
            stage4: { submission: 160, dialogue: '我的一切都是老板的。' }
        }
    },

    // ===== N 角色 =====
    'n_001': {
        partnerId: 'n_001',
        name: '路人甲',
        basePersonality: 'innocent', // 基礎性格：天真
        specialTraits: ['街頭混混', '能力平庸', '聽話幹活'],
        
        decisionWeights: {
            power: 40,
            money: 45,
            loyalty: 80,
            reputation: 35
        },
        
        specialResponses: {
            basic: '老大說什麼就是什麼！',
            simple: '我盡力！',
            weak: '對不起老大，我太弱了...'
        }
    },

    'n_002': {
        partnerId: 'n_002',
        name: '路人乙',
        basePersonality: 'innocent', // 基礎性格：天真
        specialTraits: ['臨時保鏢', '能力有限', '忠心耿耿'],
        
        decisionWeights: {
            power: 35,
            money: 40,
            loyalty: 85,
            reputation: 30
        },
        
        specialResponses: {
            guard: '我會守好的！',
            weak: '對不起，我實力不夠...',
            loyal: '老大，我永遠跟著你！'
        }
    }
};

// ========== AI行為引擎 ==========
class AIBehaviorEngine {
    constructor(characterLogic) {
        this.logic = characterLogic;
        this.personality = window.AIPersonalityLibrary[characterLogic.basePersonality];
    }
    
    // 獲取對話回應
    getDialogue(situation, context = {}) {
        // 優先使用角色專屬回應
        if (this.logic.specialResponses && this.logic.specialResponses[situation]) {
            return this.logic.specialResponses[situation];
        }
        
        // 使用性格庫的對話模式
        if (this.personality.dialoguePatterns[situation]) {
            const patterns = this.personality.dialoguePatterns[situation];
            return patterns[Math.floor(Math.random() * patterns.length)];
        }
        
        return '...';
    }
    
    // 決策判斷
    makeDecision(options, gameState) {
        let bestOption = null;
        let highestScore = -Infinity;
        
        options.forEach(option => {
            let score = 0;
            
            // 根據決策權重計算分數
            if (option.powerGain) score += option.powerGain * this.logic.decisionWeights.power;
            if (option.moneyGain) score += option.moneyGain * this.logic.decisionWeights.money;
            if (option.loyaltyImpact) score += option.loyaltyImpact * this.logic.decisionWeights.loyalty;
            if (option.reputationImpact) score += option.reputationImpact * this.logic.decisionWeights.reputation;
            
            // 加入性格因素
            score *= (this.personality.decisionMaking.riskTolerance / 100);
            
            if (score > highestScore) {
                highestScore = score;
                bestOption = option;
            }
        });
        
        return bestOption;
    }
    
    // 後宮進度檢查
    checkHaremProgress(submission) {
        if (!this.logic.haremProgression) return null;
        
        let currentStage = null;
        Object.values(this.logic.haremProgression).forEach(stage => {
            if (submission >= stage.submission) {
                currentStage = stage;
            }
        });
        
        return currentStage;
    }
    
    // 特殊事件觸發檢查
    canTriggerEvent(eventName, gameState) {
        if (!this.logic.storyTriggers) return false;
        
        const trigger = this.logic.storyTriggers[eventName];
        if (typeof trigger === 'boolean') return trigger;
        if (typeof trigger === 'number') {
            // 檢查對應數值是否達標
            return gameState.someValue >= trigger;
        }
        
        return false;
    }
}

// 匯出
if (typeof window !== 'undefined') {
    window.AICharacterLogic = AICharacterLogic;
    window.AIBehaviorEngine = AIBehaviorEngine;
}
