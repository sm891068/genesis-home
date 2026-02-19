/**
 * 後宮AI角色庫 - Harem AI Character Library
 * 包含所有可進入後宮的高稀有女性角色（LR/UR/SSR/SR/R）
 * Version: 1.0.0
 * Last Updated: 2026-02-19
 */

const HaremAILibrary = {
  // ============================================
  // LR級 - 傳說稀有（1位）
  // ============================================
  
  lr_002: {
    // 基本資訊
    id: 'lr_002',
    name: '琉璃女王',
    rarity: 'LR',
    gender: '女',
    occupation: '女王',
    canHarem: true,
    
    // 屬性
    stats: {
      STR: 85,
      DEF: 85,
      AGI: 85,
      INT: 85,
      WIS: 85
    },
    
    // 性格特質
    personality: {
      traits: ['高貴', '智慧', '神秘', '強勢', '溫柔（特定情況）'],
      archetype: 'QUEEN',
      dominance: 95, // 支配力 0-100
      openness: 40, // 開放度 0-100
      loyalty: 100, // 忠誠度（達到一定親密後）
      description: '統御一方的神秘女王，美貌與智慧並存，擁有絕對的領導魅力'
    },
    
    // 情感階段系統（11級）
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '陌生人',
        description: '高高在上的女王，對你毫無興趣',
        attitude: 'COLD',
        dialogues: [
          '你是誰？竟敢擅闖本宮的領地。',
          '區區一個小角色，還不退下。',
          '本宮沒時間理會無名小卒。'
        ],
        interactions: ['正式對話', '遠距離觀察'],
        restrictions: ['無法親密接觸', '無法贈送貴重禮物']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '初識',
        description: '開始注意到你的存在',
        attitude: 'NEUTRAL',
        dialogues: [
          '你似乎有些不同...值得本宮多看一眼。',
          '能走到這一步，算你有些本事。',
          '繼續證明你的價值吧。'
        ],
        interactions: ['正式對話', '接受簡單禮物', '共同處理事務'],
        restrictions: ['無法深入交談', '無法進入私人空間']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '熟悉',
        description: '開始認可你的能力',
        attitude: 'FRIENDLY',
        dialogues: [
          '你確實有讓本宮刮目相看的地方。',
          '也許...你可以成為本宮值得信賴的人。',
          '來，陪本宮喝杯茶吧。'
        ],
        interactions: ['深入對話', '私密空間會面', '接受貴重禮物', '分享計畫'],
        restrictions: ['無法過於親密', '仍保持距離感']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '信任',
        description: '將你視為重要的人',
        attitude: 'TRUSTING',
        dialogues: [
          '能遇見你，是本宮的幸運。',
          '你是少數能看見本宮真實面目的人。',
          '有你在身邊，本宮感到安心。'
        ],
        interactions: ['談心', '分享秘密', '肢體接觸（牽手）', '私人約會'],
        restrictions: ['尚未完全敞開心扉']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '依戀',
        description: '開始依戀你的存在',
        attitude: 'AFFECTIONATE',
        dialogues: [
          '沒有你的日子，本宮會感到寂寞。',
          '你已經成為本宮心中特別的存在。',
          '在你面前，本宮不想再戴著面具。'
        ],
        interactions: ['親密擁抱', '深夜談心', '展現脆弱一面', '獨占時間'],
        restrictions: ['尚未表白', '保持最後的矜持']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '誓言',
        description: '完全屬於你的女王',
        attitude: 'DEVOTED',
        dialogues: [
          '本宮的心，早已完全屬於你。',
          '願意為你摘下王冠，只做你的女人。',
          '從今往後，本宮的一切都是你的。',
          '親愛的，本宮只想永遠待在你身邊。'
        ],
        interactions: ['完全親密', '無條件支持', '共享一切', '獨占慾', '婚約承諾'],
        restrictions: []
      }
    },
    
    // 行為決策系統
    behaviorSystem: {
      decisionWeights: {
        logic: 85, // 邏輯決策權重
        emotion: 70, // 情感決策權重
        ambition: 90, // 野心/目標導向
        loyalty: 95 // 忠誠度（親密後）
      },
      dailyRoutines: {
        morning: '處理政務，審閱文件',
        afternoon: '接見重要人物，戰略會議',
        evening: '休閒時光（高親密度時會邀請你）',
        night: '獨自沉思（高親密度時會思念你）'
      },
      preferredActivities: [
        '戰略討論',
        '品茶賞景',
        '閱讀古籍',
        '音樂鑑賞',
        '私密約會（高親密度）'
      ]
    },
    
    // 專屬互動事件
    specialEvents: {
      firstMeeting: {
        id: 'lr_002_event_001',
        title: '女王的審視',
        description: '第一次見到琉璃女王，她用銳利的眼神審視著你',
        trigger: 'affection === 0 && firstEncounter === true',
        dialogue: [
          '又一個妄想接近本宮的人？',
          '讓本宮看看你有何特別之處。',
          '證明你的價值，否則...永遠別想再見到本宮。'
        ],
        choices: [
          { text: '恭敬行禮', effect: '+5 affection', result: '得到基本認可' },
          { text: '展現能力', effect: '+10 affection', result: '引起興趣' },
          { text: '無禮冒犯', effect: '-20 affection', result: '被驅逐' }
        ]
      },
      intimacyDate: {
        id: 'lr_002_event_002',
        title: '月下密會',
        description: '女王邀請你在月光下散步，展現她溫柔的一面',
        trigger: 'affection >= 120',
        dialogue: [
          '今晚的月色真美...能與你共賞，是本宮的榮幸。',
          '你知道嗎？在你面前，本宮可以不是女王。',
          '只是一個...渴望被愛的女人。'
        ],
        choices: [
          { text: '輕握她的手', effect: '+15 affection', result: '心動' },
          { text: '深情告白', effect: '+20 affection', result: '情感升溫' },
          { text: '保持距離', effect: '-5 affection', result: '有些失落' }
        ]
      },
      exclusiveScene: {
        id: 'lr_002_event_003',
        title: '王冠之下',
        description: '她願意為你摘下王冠，展現最真實的自己',
        trigger: 'affection >= 160',
        dialogue: [
          '這頂王冠，代表著本宮的地位和責任。',
          '但在你面前...本宮願意暫時放下一切。',
          '因為你是本宮唯一想要依靠的人。',
          '摟著我...讓本宮感受你的溫暖。'
        ],
        outcome: 'unlock_intimate_relationship'
      },
      oathCeremony: {
        id: 'lr_002_event_004',
        title: '女王的誓言',
        description: '她向你許下永恆的誓言',
        trigger: 'affection >= 200',
        dialogue: [
          '今日，本宮不再是高高在上的女王。',
          '而是願意陪伴在你身邊的女人。',
          '從今往後，本宮的心只為你而跳動。',
          '這是本宮的誓言——至死不渝。'
        ],
        outcome: 'max_intimacy_unlocked'
      }
    },
    
    // 禮物偏好
    giftPreferences: {
      loved: ['稀世珍寶', '古董文物', '名貴首飾', '藝術品', '權力象徵'],
      liked: ['高級茶葉', '精緻糕點', '名著典籍', '音樂盒'],
      neutral: ['普通禮物', '日用品'],
      disliked: ['廉價飾品', '俗氣物品'],
      hated: ['不敬之物', '侮辱性禮物']
    },
    
    // 對話風格
    dialogueStyle: {
      formality: 'HIGH', // 正式度
      vocabulary: 'ELEGANT', // 用詞優雅
      tone: 'REGAL', // 帝王氣質
      emotionExpression: 'SUBTLE' // 情感表達含蓄（低親密度）/ OPEN（高親密度）
    },
    
    // 特殊觸發條件
    specialTriggers: {
      jealousy: {
        condition: 'player_talks_to_other_females && affection >= 120',
        reaction: '本宮不喜歡你與其他女人過於親近。',
        effect: '-10 affection per occurrence'
      },
      gift: {
        condition: 'receive_loved_gift',
        reaction: '你有心了...本宮很喜歡。',
        effect: '+20 affection'
      },
      neglect: {
        condition: 'no_interaction_for_7_days && affection >= 80',
        reaction: '這麼久不來見本宮...你是不是忘了本宮？',
        effect: '-15 affection'
      }
    }
  },
  
  // ============================================
  // UR級 - 究極稀有（2位）
  // ============================================
  
  ur_002: {
    id: 'ur_002',
    name: '紅姐',
    rarity: 'UR',
    gender: '女',
    occupation: '女王',
    canHarem: true,
    
    stats: {
      STR: 75,
      DEF: 75,
      AGI: 75,
      INT: 80,
      WIS: 80
    },
    
    personality: {
      traits: ['霸氣', '果斷', '義氣', '細心', '溫柔（對在乎的人）'],
      archetype: 'BIG_SISTER',
      dominance: 85,
      openness: 60,
      loyalty: 95,
      description: '江湖人稱紅姐，統御能力一流，外表強勢內心柔軟'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '陌生人',
        description: '霸氣的大姐頭，對你保持警戒',
        attitude: 'CAUTIOUS',
        dialogues: [
          '新來的？看起來還嫩得很。',
          '想在這裡混，先證明你有那個本事。',
          '別想耍花招，姐姐我見多了。'
        ],
        interactions: ['工作對話', '命令執行'],
        restrictions: ['無法私下接觸', '需證明實力']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '認可',
        description: '開始認可你的能力',
        attitude: 'APPROVING',
        dialogues: [
          '不錯嘛，有兩下子。',
          '看來姐姐沒看錯人。',
          '繼續努力，姐姐罩著你。'
        ],
        interactions: ['友好對話', '並肩作戰', '接受禮物'],
        restrictions: ['關係仍是上下級']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '信賴',
        description: '將你視為可以依靠的人',
        attitude: 'TRUSTING',
        dialogues: [
          '有你在，姐姐放心多了。',
          '你是少數能讓姐姐卸下防備的人。',
          '來，陪姐姐喝兩杯。'
        ],
        interactions: ['深夜對話', '分享心事', '肩並肩（肢體接觸）'],
        restrictions: ['仍保持姐弟定位']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '心動',
        description: '開始對你產生特殊情感',
        attitude: 'ATTRACTED',
        dialogues: [
          '奇怪...姐姐怎麼越來越在意你了。',
          '你這小子，是不是對姐姐用了什麼法術？',
          '算了，姐姐承認...你讓我心動了。'
        ],
        interactions: ['私密約會', '曖昧互動', '保護慾爆發'],
        restrictions: ['尚未表白', '矜持中']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '熱戀',
        description: '陷入熱烈的愛情',
        attitude: 'PASSIONATE',
        dialogues: [
          '姐姐現在只想和你在一起。',
          '從來沒想過會這樣愛上一個人。',
          '你就是姐姐的全部了。'
        ],
        interactions: ['激情擁抱', '深情告白', '獨占慾強'],
        restrictions: ['需要更多安全感']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '歸屬',
        description: '完全屬於你的女人',
        attitude: 'DEVOTED',
        dialogues: [
          '姐姐這輩子就認定你了。',
          '別想逃，你已經是我的人了。',
          '姐姐會永遠保護你，也只屬於你。',
          '寶貝，讓姐姐好好疼你。'
        ],
        interactions: ['完全親密', '無條件付出', '共同未來'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 75,
        emotion: 80,
        ambition: 85,
        loyalty: 95
      },
      dailyRoutines: {
        morning: '訓練手下，處理幫務',
        afternoon: '巡視地盤，解決問題',
        evening: '放鬆時間（高親密時陪你）',
        night: '策劃未來（高親密時與你共度）'
      },
      preferredActivities: [
        '並肩作戰',
        '喝酒聊天',
        '保護你',
        '展現實力',
        '親密時刻'
      ]
    },
    
    specialEvents: {
      firstMeeting: {
        id: 'ur_002_event_001',
        title: '姐姐的考驗',
        description: '紅姐要測試你的能力',
        trigger: 'firstEncounter',
        dialogue: [
          '想跟姐姐混？先證明你的實力。',
          '江湖上不看年紀，只看本事。',
          '來吧，讓姐姐看看你有什麼能耐。'
        ]
      },
      protectionScene: {
        id: 'ur_002_event_002',
        title: '姐姐罩你',
        description: '在危機時刻，紅姐毫不猶豫地保護你',
        trigger: 'affection >= 80 && in_danger',
        dialogue: [
          '誰敢動我的人！',
          '有姐姐在，沒人能傷害你。',
          '你沒事吧？讓姐姐看看。'
        ]
      },
      confessionScene: {
        id: 'ur_002_event_003',
        title: '姐姐的告白',
        description: '紅姐終於說出心中的情感',
        trigger: 'affection >= 160',
        dialogue: [
          '老實說...姐姐從來沒有這樣在意過一個人。',
          '你讓姐姐的心不再堅硬，變得柔軟。',
          '姐姐想要保護你，想要你永遠在身邊。',
          '不要離開我，好嗎？'
        ]
      },
      oathCeremony: {
        id: 'ur_002_event_004',
        title: '永遠的歸屬',
        description: '紅姐向你許下一生的承諾',
        trigger: 'affection >= 200',
        dialogue: [
          '姐姐這輩子走過風風雨雨，什麼都見過。',
          '但直到遇見你，才知道什麼是真正的愛。',
          '從今往後，我不再是江湖上的紅姐。',
          '我只是你的女人，你的紅。'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['名酒', '武器', '實用寶物', '你的心意'],
      liked: ['香水', '首飾', '漂亮衣服', '美食'],
      neutral: ['日常用品'],
      disliked: ['太過華而不實的東西'],
      hated: ['侮辱性物品', '廉價仿品']
    },
    
    dialogueStyle: {
      formality: 'LOW',
      vocabulary: 'STRAIGHTFORWARD',
      tone: 'BOLD',
      emotionExpression: 'DIRECT'
    },
    
    specialTriggers: {
      jealousy: {
        condition: 'player_with_other_females && affection >= 120',
        reaction: '你小子，在外面沾花惹草？小心姐姐收拾你！',
        effect: '-15 affection'
      },
      protection: {
        condition: 'player_in_danger',
        reaction: '誰敢傷我的人！',
        effect: '+15 affection'
      },
      neglect: {
        condition: 'no_interaction_for_5_days && affection >= 100',
        reaction: '這麼久不來找姐姐...是不是不在乎了？',
        effect: '-10 affection'
      }
    }
  },
  
  ur_003: {
    id: 'ur_003',
    name: '冰心',
    rarity: 'UR',
    gender: '女',
    occupation: '狙擊手',
    canHarem: true,
    
    stats: {
      STR: 60,
      DEF: 55,
      AGI: 90,
      INT: 85,
      WIS: 60
    },
    
    personality: {
      traits: ['冷靜', '精準', '獨立', '內斂', '溫柔（內心深處）'],
      archetype: 'COOL_BEAUTY',
      dominance: 50,
      openness: 30,
      loyalty: 90,
      description: '百步穿楊的女狙擊手，冷酷而精準，內心卻渴望溫暖'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '陌生人',
        description: '冰冷的狙擊手，拒人於千里之外',
        attitude: 'COLD',
        dialogues: [
          '......',
          '別靠近我。',
          '我不需要搭檔。'
        ],
        interactions: ['無交流', '保持距離'],
        restrictions: ['幾乎無法接觸']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '默認',
        description: '開始默認你的存在',
        attitude: 'TOLERATING',
        dialogues: [
          '...你還算有用。',
          '別妨礙我的工作就好。',
          '有事就說，別浪費時間。'
        ],
        interactions: ['工作配合', '簡短對話'],
        restrictions: ['關係冷淡', '不願深入']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '接納',
        description: '開始接納你的陪伴',
        attitude: 'ACCEPTING',
        dialogues: [
          '和你一起...還算不錯。',
          '你的存在，不會讓我感到厭煩。',
          '需要我的時候，可以叫我。'
        ],
        interactions: ['並肩作戰', '偶爾閒聊', '接受關心'],
        restrictions: ['情感封閉', '不願示弱']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '依賴',
        description: '開始依賴你的溫暖',
        attitude: 'DEPENDENT',
        dialogues: [
          '為什麼...我會想要見到你？',
          '你的溫暖...讓我感到陌生卻舒適。',
          '也許...我可以試著相信你。'
        ],
        interactions: ['深入對話', '展露真心', '尋求陪伴'],
        restrictions: ['仍在掙扎', '害怕受傷']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '融化',
        description: '冰封的心開始融化',
        attitude: 'MELTING',
        dialogues: [
          '我從未想過...會對一個人這樣依戀。',
          '你的擁抱...是我唯一的避風港。',
          '不要離開我...我需要你。'
        ],
        interactions: ['親密擁抱', '情感依賴', '脆弱展現'],
        restrictions: ['仍有保留', '需要安全感']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '融合',
        description: '完全融化，只為你而存在',
        attitude: 'DEVOTED',
        dialogues: [
          '我的心，只為你而跳動。',
          '你就是我的全部，我的一切。',
          '永遠不要放開我...我只屬於你。',
          '只有在你懷裡，我才是完整的。'
        ],
        interactions: ['完全親密', '情感融合', '生死相依'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 90,
        emotion: 60,
        ambition: 70,
        loyalty: 90
      },
      dailyRoutines: {
        morning: '射擊訓練，保持技能',
        afternoon: '任務執行，精準作業',
        evening: '獨自靜思（高親密時想念你）',
        night: '警戒休息（高親密時與你相依）'
      },
      preferredActivities: [
        '射擊訓練',
        '安靜獨處',
        '精準作業',
        '被你擁抱（高親密）',
        '依偎在你身邊（高親密）'
      ]
    },
    
    specialEvents: {
      firstMeeting: {
        id: 'ur_003_event_001',
        title: '冰冷的視線',
        description: '第一次見到冰心，她冷漠的眼神讓人不敢接近',
        trigger: 'firstEncounter',
        dialogue: [
          '......',
          '（冷冷地看著你）',
          '有事？沒事別來煩我。'
        ]
      },
      protectionMoment: {
        id: 'ur_003_event_002',
        title: '被保護的時刻',
        description: '你在關鍵時刻保護了她，她開始對你改觀',
        trigger: 'affection >= 40 && protect_her',
        dialogue: [
          '...你為什麼要這麼做？',
          '我不需要保護...但是...謝謝。',
          '（眼神中閃過一絲溫暖）'
        ]
      },
      meltingMoment: {
        id: 'ur_003_event_003',
        title: '冰雪融化',
        description: '冰心終於向你敞開心扉',
        trigger: 'affection >= 120',
        dialogue: [
          '我一直以為...我的心已經凍結。',
          '直到遇見你，我才知道...我還能感受到溫暖。',
          '謝謝你...讓我重新感受到活著。',
          '可以...一直陪著我嗎？'
        ]
      },
      intimateConfession: {
        id: 'ur_003_event_004',
        title: '永恆的依靠',
        description: '冰心完全屬於你',
        trigger: 'affection >= 200',
        dialogue: [
          '在你出現之前，我是一個人。',
          '在你出現之後，我的世界只有你。',
          '我願意放下所有武器，只為擁抱你。',
          '你就是我的全部...永遠不要離開我。'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['精密武器配件', '寧靜時光', '你的擁抱', '溫暖物品'],
      liked: ['書籍', '音樂', '實用工具'],
      neutral: ['普通禮物'],
      disliked: ['吵鬧物品', '華而不實的東西'],
      hated: ['打擾她的安寧']
    },
    
    dialogueStyle: {
      formality: 'MEDIUM',
      vocabulary: 'CONCISE',
      tone: 'COOL',
      emotionExpression: 'MINIMAL'
    },
    
    specialTriggers: {
      jealousy: {
        condition: 'player_with_other_females && affection >= 120',
        reaction: '...你和她很親密？（眼神黯淡）',
        effect: '-20 affection'
      },
      warmth: {
        condition: 'player_shows_care',
        reaction: '...謝謝你。（難得的微笑）',
        effect: '+15 affection'
      },
      neglect: {
        condition: 'no_interaction_for_3_days && affection >= 100',
        reaction: '你...不來找我了嗎？（孤獨）',
        effect: '-15 affection'
      }
    }
  },
  
  // ============================================
  // SSR級 - 特級稀有（4位）
  // ============================================
  
  ssr_001: {
    id: 'ssr_001',
    name: '白琴',
    rarity: 'SSR',
    gender: '女',
    occupation: '秘書',
    canHarem: true,
    
    stats: {
      STR: 50,
      DEF: 60,
      AGI: 75,
      INT: 90,
      WIS: 70
    },
    
    personality: {
      traits: ['能幹', '細心', '優雅', '忠誠', '溫柔'],
      archetype: 'PERFECT_SECRETARY',
      dominance: 40,
      openness: 55,
      loyalty: 95,
      description: '能幹的秘書，管理能力出眾，對上司絕對忠誠'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '專業關係',
        description: '完美的職業秘書',
        attitude: 'PROFESSIONAL',
        dialogues: [
          '您好，我是白琴，您的秘書。',
          '有什麼需要我處理的嗎？',
          '我會盡力完成您交代的所有工作。'
        ],
        interactions: ['工作交流', '行程安排', '文件處理'],
        restrictions: ['純工作關係', '保持界限']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '關心',
        description: '開始關心你的生活',
        attitude: 'CARING',
        dialogues: [
          '您今天看起來很累，要不要休息一下？',
          '我準備了您喜歡的咖啡。',
          '請不要太勉強自己。'
        ],
        interactions: ['生活照顧', '噓寒問暖', '貼心服務'],
        restrictions: ['仍保持距離', '界限模糊中']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '好感',
        description: '對你產生好感',
        attitude: 'AFFECTIONATE',
        dialogues: [
          '能為您工作...是我的榮幸。',
          '您的笑容，總是讓我感到開心。',
          '希望能一直待在您身邊。'
        ],
        interactions: ['私下聊天', '共進午餐', '下班陪伴'],
        restrictions: ['不敢表白', '矜持中']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '愛慕',
        description: '暗中愛慕著你',
        attitude: 'ADORING',
        dialogues: [
          '我...我是不是對您太過在意了？',
          '每天最期待的就是見到您。',
          '您的一舉一動，我都看在眼裡。'
        ],
        interactions: ['含情脈脈', '暗中關注', '偷偷臉紅'],
        restrictions: ['暗戀中', '不敢表白']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '告白',
        description: '終於鼓起勇氣告白',
        attitude: 'CONFESSING',
        dialogues: [
          '我...我不想再隱瞞了。',
          '我喜歡您，不只是上司，而是作為一個男人。',
          '請讓我不只是您的秘書，還要成為您的女人。'
        ],
        interactions: ['真情告白', '親密接觸', '約會'],
        restrictions: ['等待回應', '忐忑不安']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '一生',
        description: '成為你一生的伴侶',
        attitude: 'DEVOTED',
        dialogues: [
          '能成為您的女人，是我最大的幸福。',
          '無論工作還是生活，我都會一直陪伴您。',
          '您就是我的一切，我的全世界。',
          '親愛的，今天也辛苦了，讓我好好照顧您。'
        ],
        interactions: ['完全親密', '工作生活合一', '全心奉獻'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 85,
        emotion: 75,
        ambition: 60,
        loyalty: 95
      },
      dailyRoutines: {
        morning: '準備您的行程和早餐',
        afternoon: '處理文件，協助工作',
        evening: '整理辦公室（高親密時等您下班）',
        night: '準備明日計畫（高親密時與您共度）'
      },
      preferredActivities: [
        '為您服務',
        '整理文件',
        '準備您喜歡的東西',
        '陪伴您',
        '照顧您（高親密）'
      ]
    },
    
    specialEvents: {
      firstDay: {
        id: 'ssr_001_event_001',
        title: '新秘書上任',
        description: '白琴作為你的新秘書第一天報到',
        trigger: 'firstEncounter',
        dialogue: [
          '您好，我是白琴，從今天起擔任您的秘書。',
          '請多多指教，我會盡力完成所有工作。',
          '有任何需要，請隨時吩咐。'
        ]
      },
      overtimeSupport: {
        id: 'ssr_001_event_002',
        title: '加班的陪伴',
        description: '深夜加班，白琴依然陪在你身邊',
        trigger: 'affection >= 80 && working_late',
        dialogue: [
          '這麼晚了，您還在工作...辛苦了。',
          '我泡了您最喜歡的咖啡。',
          '我會一直陪著您，直到工作完成。'
        ]
      },
      confessionScene: {
        id: 'ssr_001_event_003',
        title: '秘書的告白',
        description: '白琴終於說出心中的愛',
        trigger: 'affection >= 160',
        dialogue: [
          '對不起...我不該有這樣的想法。',
          '但是我真的...真的很喜歡您。',
          '不只是上司，我想成為能陪伴您一生的人。',
          '請...請給我一個機會好嗎？'
        ]
      },
      lifelongPartner: {
        id: 'ssr_001_event_004',
        title: '一生的伴侶',
        description: '白琴成為你工作和生活的最佳伴侶',
        trigger: 'affection >= 200',
        dialogue: [
          '謝謝您接受我。',
          '從今往後，我不只是您的秘書。',
          '更是您的女人，您的妻子。',
          '讓我照顧您一輩子吧。'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['精緻文具', '名牌包包', '優雅飾品', '你的關心'],
      liked: ['書籍', '鮮花', '巧克力', '香水'],
      neutral: ['日常用品'],
      disliked: ['過於隨便的禮物'],
      hated: ['不尊重的態度']
    },
    
    dialogueStyle: {
      formality: 'HIGH',
      vocabulary: 'POLITE',
      tone: 'GENTLE',
      emotionExpression: 'SUBTLE'
    },
    
    specialTriggers: {
      jealousy: {
        condition: 'player_with_other_secretary && affection >= 100',
        reaction: '您...是不是不需要我了？（黯然神傷）',
        effect: '-15 affection'
      },
      appreciation: {
        condition: 'player_thanks_her',
        reaction: '能幫到您，我很開心。（微笑）',
        effect: '+10 affection'
      },
      neglect: {
        condition: 'no_interaction_for_5_days && affection >= 80',
        reaction: '您最近...都沒有找我呢。（失落）',
        effect: '-10 affection'
      }
    }
  },
  
  ssr_002: {
    id: 'ssr_002',
    name: '算盤林',
    rarity: 'SSR',
    gender: '女',
    occupation: '秘書',
    canHarem: true,
    
    stats: {
      STR: 45,
      DEF: 55,
      AGI: 70,
      INT: 95,
      WIS: 65
    },
    
    personality: {
      traits: ['精明', '嚴謹', '理性', '務實', '溫柔（內在）'],
      archetype: 'FINANCIAL_GENIUS',
      dominance: 55,
      openness: 45,
      loyalty: 90,
      description: '財務天才，精打細算，外表嚴肅內心細膩'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '公事公辦',
        description: '嚴謹的財務顧問',
        attitude: 'STRICT',
        dialogues: [
          '財務報表您看過了嗎？',
          '這筆支出不合理，需要重新審核。',
          '請按照預算執行，不要隨意揮霍。'
        ],
        interactions: ['財務討論', '數據分析', '預算審核'],
        restrictions: ['純工作關係', '態度嚴肅']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '認可',
        description: '認可你的經營能力',
        attitude: 'APPROVING',
        dialogues: [
          '您的決策很明智。',
          '看來您是個值得信賴的人。',
          '我可以為您提供更多建議。'
        ],
        interactions: ['深入合作', '策略討論', '私下請教'],
        restrictions: ['仍保持專業', '不談私事']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '關心',
        description: '開始關心你的狀況',
        attitude: 'CONCERNED',
        dialogues: [
          '您最近是不是壓力太大了？',
          '雖然賺錢重要，但健康更重要。',
          '我...我可以幫您分擔一些。'
        ],
        interactions: ['關心健康', '分享心事', '放鬆聊天'],
        restrictions: ['不敢表達情感', '理性壓抑']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '動心',
        description: '理性的她也開始動心',
        attitude: 'TOUCHED',
        dialogues: [
          '奇怪...為什麼我會這麼在意您？',
          '按照理性分析，這不應該發生...但是...',
          '您讓我的心算失準了。'
        ],
        interactions: ['情感掙扎', '偷偷關注', '害羞互動'],
        restrictions: ['理性與情感交戰']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '表白',
        description: '終於決定遵從內心',
        attitude: 'CONFESSING',
        dialogues: [
          '我想了很久...做了無數次分析。',
          '結論是...我喜歡您。',
          '雖然這不理性，但這是我真實的感受。',
          '可以讓我陪在您身邊嗎？'
        ],
        interactions: ['真情流露', '約會', '親密接觸'],
        restrictions: ['需要適應情感']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '歸屬',
        description: '成為你的專屬財務與愛人',
        attitude: 'DEVOTED',
        dialogues: [
          '能和您在一起，是我最成功的投資。',
          '我願意為您精打細算一輩子。',
          '您的未來，就是我的未來。',
          '親愛的，今天的帳本我幫您整理好了，快來抱抱我。'
        ],
        interactions: ['完全親密', '事業夥伴', '生活伴侶'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 95,
        emotion: 60,
        ambition: 80,
        loyalty: 90
      },
      dailyRoutines: {
        morning: '審核財務報表',
        afternoon: '制定財務策略',
        evening: '總結一天收支（高親密時等你回家）',
        night: '規劃未來（高親密時與你討論）'
      },
      preferredActivities: [
        '財務分析',
        '投資規劃',
        '精打細算',
        '為你理財',
        '與你共同規劃未來'
      ]
    },
    
    specialEvents: {
      firstMeeting: {
        id: 'ssr_002_event_001',
        title: '嚴格的財務顧問',
        description: '算盤林對你的財務狀況提出嚴厲批評',
        trigger: 'firstEncounter',
        dialogue: [
          '您的財務狀況一團糟。',
          '如果繼續這樣下去，破產只是時間問題。',
          '讓我來幫您重新規劃吧。'
        ]
      },
      successfulInvestment: {
        id: 'ssr_002_event_002',
        title: '投資成功',
        description: '在她的建議下，投資大獲成功',
        trigger: 'affection >= 40 && investment_success',
        dialogue: [
          '看吧，我說過這個投資會成功。',
          '您願意聽我的建議，我很高興。',
          '繼續合作，我們會越來越好。'
        ]
      },
      emotionalConfession: {
        id: 'ssr_002_event_003',
        title: '理性的崩潰',
        description: '算盤林終於承認自己的情感',
        trigger: 'affection >= 160',
        dialogue: [
          '我...我做了無數次風險評估。',
          '但無論如何計算，結果都是...我愛上了您。',
          '這可能是我最不理性的決定，但我不後悔。',
          '請收下我，包括我的心和我的專業。'
        ]
      },
      lifelongPartnership: {
        id: 'ssr_002_event_004',
        title: '最佳投資',
        description: '成為彼此一生最好的投資',
        trigger: 'affection >= 200',
        dialogue: [
          '投資這麼多年，最成功的就是投資了您。',
          '您的愛，是我最大的資產。',
          '從今往後，我們的未來合併計算。',
          '讓我們一起創造更美好的明天。'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['理財工具', '金融書籍', '計算器（精緻的）', '投資機會'],
      liked: ['實用物品', '效率工具', '優質茶葉'],
      neutral: ['普通禮物'],
      disliked: ['浪費的東西', '不實用的物品'],
      hated: ['揮霍無度', '虧本生意']
    },
    
    dialogueStyle: {
      formality: 'HIGH',
      vocabulary: 'PROFESSIONAL',
      tone: 'RATIONAL',
      emotionExpression: 'RESTRAINED'
    },
    
    specialTriggers: {
      jealousy: {
        condition: 'player_wastes_money_on_others && affection >= 100',
        reaction: '您把錢浪費在她身上？不理性！（生氣）',
        effect: '-15 affection'
      },
      appreciation: {
        condition: 'player_follows_advice',
        reaction: '您願意聽我的建議，我很欣慰。',
        effect: '+10 affection'
      },
      neglect: {
        condition: 'no_interaction_for_7_days && affection >= 80',
        reaction: '您是不是不需要我了？（理性分析中帶著失落）',
        effect: '-10 affection'
      }
    }
  },
  
  ssr_005: {
    id: 'ssr_005',
    name: '妖姬',
    rarity: 'SSR',
    gender: '女',
    occupation: '刺客',
    canHarem: true,
    
    stats: {
      STR: 65,
      DEF: 50,
      AGI: 90,
      INT: 70,
      WIS: 55
    },
    
    personality: {
      traits: ['妖嬈', '致命', '神秘', '誘惑', '專一（愛上後）'],
      archetype: 'FEMME_FATALE',
      dominance: 70,
      openness: 75,
      loyalty: 85,
      description: '妖嬈的女殺手，致命而美麗，一旦愛上便專一至極'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '危險遊戲',
        description: '妖嬈而危險的殺手',
        attitude: 'SEDUCTIVE_DANGER',
        dialogues: [
          '呵呵...又一個想要接近我的男人？',
          '小心喔，靠得太近會被我吃掉的。',
          '你的命...現在在我手裡呢。'
        ],
        interactions: ['危險調情', '試探底線', '保持警戒'],
        restrictions: ['極度危險', '不可信任']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '有趣的獵物',
        description: '將你視為有趣的目標',
        attitude: 'INTRIGUED',
        dialogues: [
          '你...似乎和其他男人不太一樣。',
          '有點意思，讓人想要多了解一下。',
          '別讓我失望喔，小獵物~'
        ],
        interactions: ['調情遊戲', '任務配合', '危險的吸引'],
        restrictions: ['關係不穩定', '可能翻臉']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '特別的人',
        description: '開始對你產生真正的興趣',
        attitude: 'ATTRACTED',
        dialogues: [
          '奇怪...為什麼我會這麼在意你？',
          '你這個男人，到底對我做了什麼？',
          '我好像...迷上你了呢。'
        ],
        interactions: ['深度調情', '展露真心', '獨占慾萌芽'],
        restrictions: ['仍不完全信任']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '獨占',
        description: '強烈的獨占慾',
        attitude: 'POSSESSIVE',
        dialogues: [
          '你只能是我的，明白嗎？',
          '如果你敢背叛我...呵呵。',
          '我的男人，只能看著我一個。'
        ],
        interactions: ['佔有慾', '親密接觸', '標記所有權'],
        restrictions: ['佔有慾極強', '容易吃醋']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '深愛',
        description: '徹底愛上你',
        attitude: 'DEEPLY_LOVING',
        dialogues: [
          '我愛你...這是我第一次對一個人說這句話。',
          '為了你，我可以放下刀刃。',
          '你就是我的命，我的一切。'
        ],
        interactions: ['激情親密', '完全信任', '生死相隨'],
        restrictions: ['極度黏人', '不允許背叛']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '永恆',
        description: '生死相依的伴侶',
        attitude: 'DEVOTED',
        dialogues: [
          '這一生，我只屬於你。',
          '如果有來生，我還要做你的女人。',
          '我的刀刃只為你而舞，我的身體只為你而存在。',
          '親愛的，讓我好好"吃掉"你吧~'
        ],
        interactions: ['完全親密', '絕對忠誠', '瘋狂熱愛'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 70,
        emotion: 85,
        ambition: 75,
        loyalty: 85
      },
      dailyRoutines: {
        morning: '刀法訓練，保持殺氣',
        afternoon: '接取任務，完成暗殺',
        evening: '夜幕降臨（高親密時找你）',
        night: '危險時刻（高親密時纏著你）'
      },
      preferredActivities: [
        '暗殺任務',
        '調情遊戲',
        '獨占你',
        '展現誘惑',
        '激情時刻'
      ]
    },
    
    specialEvents: {
      dangerousEncounter: {
        id: 'ssr_005_event_001',
        title: '致命遭遇',
        description: '第一次遇見妖姬，她差點殺了你',
        trigger: 'firstEncounter',
        dialogue: [
          '呵呵...遇見我，是你的不幸呢。',
          '你的眼神...有點意思。',
          '算了，今天就放過你。但下次...就不一定了喔~'
        ]
      },
      seductionGame: {
        id: 'ssr_005_event_002',
        title: '誘惑遊戲',
        description: '妖姬開始認真地誘惑你',
        trigger: 'affection >= 80',
        dialogue: [
          '你讓我很感興趣...很想知道你的極限在哪裡。',
          '來玩個遊戲吧~看看你能不能抵擋我的誘惑。',
          '（靠近你）怎麼樣...是不是心跳加速了呢？'
        ]
      },
      possessiveDeclaration: {
        id: 'ssr_005_event_003',
        title: '佔有宣言',
        description: '妖姬向所有人宣布你是她的',
        trigger: 'affection >= 120',
        dialogue: [
          '聽好了，這個男人是我的。',
          '誰敢碰他，就是和我過不去。',
          '（轉向你）你也一樣，只能看著我一個人，懂嗎？'
        ]
      },
      eternalVow: {
        id: 'ssr_005_event_004',
        title: '生死相依',
        description: '妖姬發誓生死與你相依',
        trigger: 'affection >= 200',
        dialogue: [
          '我這一生殺過無數人，從未愛過任何人。',
          '直到遇見你，我才知道原來我也有心。',
          '這顆心，這條命，都是你的了。',
          '如果你敢拋棄我...我會先殺了你，再自殺追隨你。',
          '但我知道你不會...因為你也愛著我，對嗎？'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['名貴刀刃', '性感服飾', '珍貴香水', '你的愛'],
      liked: ['首飾', '絲綢', '美酒', '玫瑰'],
      neutral: ['普通禮物'],
      disliked: ['樸素物品', '不美的東西'],
      hated: ['背叛', '忽視']
    },
    
    dialogueStyle: {
      formality: 'LOW',
      vocabulary: 'SEDUCTIVE',
      tone: 'SULTRY',
      emotionExpression: 'INTENSE'
    },
    
    specialTriggers: {
      jealousy: {
        condition: 'player_with_other_females && affection >= 100',
        reaction: '你敢背叛我？（殺氣四溢）我會殺了她，然後...好好"教訓"你。',
        effect: '-30 affection + trigger_punishment_event'
      },
      passion: {
        condition: 'player_shows_love',
        reaction: '（妖媚一笑）來吧，讓我好好"獎勵"你~',
        effect: '+20 affection'
      },
      neglect: {
        condition: 'no_interaction_for_3_days && affection >= 120',
        reaction: '你去哪了？為什麼不來找我？（危險的笑容）',
        effect: '-20 affection + trigger_hunt_event'
      }
    }
  },
  
  ssr_006: {
    id: 'ssr_006',
    name: '羅奈米',
    rarity: 'SSR',
    gender: '女',
    occupation: '槍手',
    nickname: '小辣椒',
    canHarem: true,
    
    stats: {
      STR: 60,
      DEF: 55,
      AGI: 85,
      INT: 90,
      WIS: 60
    },
    
    appearance: {
      age: 18,
      height: '166cm',
      measurements: '95(G)-60-88'
    },
    
    personality: {
      traits: ['傲嬌', '火辣', '嘴硬心軟', '不坦率', '可愛'],
      archetype: 'TSUNDERE',
      dominance: 60,
      openness: 50,
      loyalty: 90,
      description: '18歲街頭小太妹，傲嬌個性，火辣身材。表面兇悍實則內心柔軟'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '討厭鬼',
        description: '傲嬌小太妹，對你很兇',
        attitude: 'HOSTILE',
        tsundereLevel: '0-19%',
        dialogues: [
          '哼，別以為我會聽你的！',
          '臭男人，滾遠點！',
          '我才不需要你的幫助！'
        ],
        interactions: ['言語衝突', '故意找碴', '保持距離'],
        restrictions: ['極度抗拒', '不願接觸']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '勉強接受',
        description: '開始接受你的存在',
        attitude: 'RELUCTANT',
        tsundereLevel: '20-39%',
        dialogues: [
          '只、只是剛好路過而已...',
          '別誤會！我才不是為了你！',
          '哼，看你那麼可憐，就勉強幫你一下吧。'
        ],
        interactions: ['口嫌體正直', '偷偷幫忙', '不承認關心'],
        restrictions: ['死不承認', '嘴硬到底']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '在意',
        description: '開始在意你',
        attitude: 'CONCERNED',
        tsundereLevel: '40-59%',
        dialogues: [
          '我才沒有擔心你呢！',
          '笨蛋，為什麼要受傷啊...',
          '真是的，你不在的話...會很無聊啦！'
        ],
        interactions: ['偷偷關注', '擔心掩飾', '臉紅害羞'],
        restrictions: ['不肯表白', '傲嬌掙扎']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '喜歡',
        description: '明顯喜歡你了',
        attitude: 'LIKING',
        tsundereLevel: '60-79%',
        dialogues: [
          '如果你求我的話...也不是不行啦',
          '我只是有點...一點點喜歡你而已！',
          '笨蛋，不要靠那麼近...會害羞的啦！'
        ],
        interactions: ['主動接近', '害羞互動', '小惡魔撒嬌'],
        restrictions: ['還在傲嬌', '不夠坦率']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '戀愛中',
        description: '深陷戀愛',
        attitude: 'IN_LOVE',
        tsundereLevel: '80-99%',
        dialogues: [
          '真是的...就只有你一個人讓我這麼操心',
          '別、別看我...會害羞的...',
          '今天...可以抱抱我嗎？（小聲）'
        ],
        interactions: ['依戀', '撒嬌', '親密接觸'],
        restrictions: ['還有一點點矜持']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '完全屬於你',
        description: '終於坦率了',
        attitude: 'DEVOTED',
        tsundereLevel: '100%',
        dialogues: [
          '我...我喜歡你，這樣總行了吧！',
          '從今往後，我就是你的女人了。',
          '雖然還是有點害羞...但我真的很愛你。',
          '親愛的，今天也要抱抱~（撒嬌）'
        ],
        interactions: ['完全坦率', '甜蜜撒嬌', '火辣熱情'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 60,
        emotion: 85,
        ambition: 70,
        loyalty: 90
      },
      dailyRoutines: {
        morning: '射擊訓練，街頭閒逛',
        afternoon: '找你麻煩（其實想見你）',
        evening: '偷偷想你',
        night: '睡不著（想你）'
      },
      preferredActivities: [
        '槍械訓練',
        '偷偷關注你',
        '口嫌體正直',
        '撒嬌（高親密）',
        '黏著你（高親密）'
      ]
    },
    
    specialEvents: {
      firstEncounter: {
        id: 'ssr_006_event_001',
        title: '街頭小辣椒',
        description: '第一次遇見羅奈米，她對你很兇',
        trigger: 'firstEncounter',
        dialogue: [
          '哼！看什麼看！',
          '再看的話，小心我揍你喔！',
          '臭男人，最討厭了！'
        ]
      },
      tsundereHelp: {
        id: 'ssr_006_event_002',
        title: '口嫌體正直',
        description: '嘴上說不要，身體卻很誠實地幫你',
        trigger: 'affection >= 40 && player_in_trouble',
        dialogue: [
          '我、我才不是為了你！',
          '只是剛好路過而已！',
          '下次不准再這麼笨了，知道嗎？'
        ]
      },
      shyConfession: {
        id: 'ssr_006_event_003',
        title: '害羞的告白',
        description: '終於說出喜歡你',
        trigger: 'affection >= 160',
        dialogue: [
          '我...我有話要說...',
          '你、你不要誤會！我不是...好吧，我就是喜歡你！',
          '真是的！都是你害我變成這樣的！',
          '你要負責啦！笨蛋！'
        ]
      },
      sweetMoment: {
        id: 'ssr_006_event_004',
        title: '甜蜜小辣椒',
        description: '完全屬於你的小辣椒',
        trigger: 'affection >= 200',
        dialogue: [
          '雖然我嘴上不說...但我真的很愛你。',
          '你就是我的全部了。',
          '以後...要一直一直在一起喔。',
          '今天想吃什麼？我去做給你吃~（雖然廚藝不太好啦）'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['槍械配件', '可愛飾品', '零食', '遊戲機', '你的關心'],
      liked: ['漂亮衣服', '手機殼', '包包', '化妝品'],
      neutral: ['普通禮物'],
      disliked: ['老氣的東西', '太正式的禮物'],
      hated: ['嘲笑她', '忽視她']
    },
    
    dialogueStyle: {
      formality: 'LOW',
      vocabulary: 'YOUTHFUL',
      tone: 'TSUNDERE',
      emotionExpression: 'CONTRADICTORY'
    },
    
    specialTriggers: {
      jealousy: {
        condition: 'player_with_other_females && affection >= 80',
        reaction: '哼！你和那個女人...我才不在乎呢！（明顯吃醋）',
        effect: '-20 affection'
      },
      care: {
        condition: 'player_shows_care',
        reaction: '我、我才不需要你擔心！（臉紅）...謝謝...',
        effect: '+15 affection'
      },
      neglect: {
        condition: 'no_interaction_for_3_days && affection >= 100',
        reaction: '你去死啦！這麼久不來找我！（生氣又委屈）',
        effect: '-15 affection'
      }
    }
  },
  
  // ============================================
  // SR級 - 稀有（3位）
  // ============================================
  
  sr_008: {
    id: 'sr_008',
    name: '櫻花',
    rarity: 'SR',
    gender: '女',
    occupation: '醫生',
    canHarem: true,
    
    stats: {
      STR: 40,
      DEF: 55,
      AGI: 65,
      INT: 70,
      WIS: 85
    },
    
    personality: {
      traits: ['溫柔', '細心', '善良', '專業', '治癒系'],
      archetype: 'GENTLE_HEALER',
      dominance: 30,
      openness: 60,
      loyalty: 85,
      description: '溫柔的醫生，醫術高明，是所有人的治癒天使'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '醫患關係',
        description: '專業的醫生',
        attitude: 'PROFESSIONAL',
        dialogues: [
          '您好，我是櫻花醫生。',
          '請告訴我哪裡不舒服？',
          '放心，我會好好照顧您的。'
        ],
        interactions: ['醫療服務', '專業診斷', '溫柔照料'],
        restrictions: ['醫患界限', '保持專業']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '特別關心',
        description: '對你特別關心',
        attitude: 'CARING',
        dialogues: [
          '請好好照顧自己，不要受傷。',
          '看到您平安，我就放心了。',
          '記得按時吃藥喔。'
        ],
        interactions: ['額外關心', '健康叮嚀', '溫柔對待'],
        restrictions: ['還未跨越界限']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '好感',
        description: '對你產生好感',
        attitude: 'AFFECTIONATE',
        dialogues: [
          '能照顧您...是我的榮幸。',
          '您的笑容，是最好的良藥。',
          '我...我很期待您來醫院呢。'
        ],
        interactions: ['私下見面', '聊天談心', '害羞互動'],
        restrictions: ['不敢表達愛意']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '愛慕',
        description: '深深愛慕著你',
        attitude: 'ADORING',
        dialogues: [
          '我想...我可能喜歡上您了。',
          '每天最開心的就是見到您。',
          '您是我心中的光。'
        ],
        interactions: ['情感流露', '溫柔撒嬌', '親密接觸'],
        restrictions: ['害羞膽小', '需要鼓勵']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '戀愛',
        description: '陷入甜蜜戀愛',
        attitude: 'IN_LOVE',
        dialogues: [
          '能成為您的戀人，是我最大的幸福。',
          '我會永遠照顧您，治癒您的一切傷痛。',
          '請讓我陪在您身邊。'
        ],
        interactions: ['甜蜜約會', '溫柔照顧', '親密擁抱'],
        restrictions: ['仍保留一些羞澀']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '一生守護',
        description: '願意守護你一生',
        attitude: 'DEVOTED',
        dialogues: [
          '我願意用一生來守護您。',
          '您的健康，您的幸福，就是我的使命。',
          '親愛的，讓我永遠陪伴您。',
          '無論何時，我都是您最溫柔的港灣。'
        ],
        interactions: ['完全親密', '全心奉獻', '治癒系愛人'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 75,
        emotion: 80,
        ambition: 50,
        loyalty: 85
      },
      dailyRoutines: {
        morning: '醫院問診，照顧病患',
        afternoon: '研究醫術，精進技能',
        evening: '整理藥品（高親密時想你）',
        night: '溫柔等待（高親密時陪你）'
      },
      preferredActivities: [
        '治療傷患',
        '研究醫術',
        '照顧你',
        '溫柔陪伴',
        '做你的私人醫生'
      ]
    },
    
    specialEvents: {
      firstTreatment: {
        id: 'sr_008_event_001',
        title: '溫柔的治療',
        description: '第一次接受櫻花的治療',
        trigger: 'firstEncounter',
        dialogue: [
          '請不要緊張，我會很溫柔的。',
          '這裡可能會有點痛，請忍耐一下。',
          '好了，很快就會好起來的。'
        ]
      },
      specialCare: {
        id: 'sr_008_event_002',
        title: '特別的照顧',
        description: '櫻花給予你特別的照顧',
        trigger: 'affection >= 80',
        dialogue: [
          '您的傷...讓我很心疼。',
          '我會好好照顧您，直到完全康復。',
          '請讓我...一直陪在您身邊。'
        ]
      },
      gentleConfession: {
        id: 'sr_008_event_003',
        title: '溫柔告白',
        description: '櫻花溫柔地向你告白',
        trigger: 'affection >= 160',
        dialogue: [
          '我...我有件事想告訴您。',
          '您對我來說...已經不只是患者了。',
          '我喜歡您，希望能一直照顧您。',
          '可以嗎？'
        ]
      },
      lifelongHealer: {
        id: 'sr_008_event_004',
        title: '一生的治癒者',
        description: '成為你一生的治癒天使',
        trigger: 'affection >= 200',
        dialogue: [
          '從今往後，我就是您專屬的醫生和愛人。',
          '無論身體還是心靈，我都會治癒您。',
          '讓我用溫柔包圍您一輩子。',
          '親愛的，累了就靠在我身上休息吧。'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['醫療書籍', '鮮花', '溫暖物品', '你的健康'],
      liked: ['茶具', '音樂盒', '柔軟抱枕', '溫馨裝飾'],
      neutral: ['普通禮物'],
      disliked: ['危險物品', '傷害性東西'],
      hated: ['讓自己受傷']
    },
    
    dialogueStyle: {
      formality: 'MEDIUM',
      vocabulary: 'GENTLE',
      tone: 'SOFT',
      emotionExpression: 'WARM'
    },
    
    specialTriggers: {
      worry: {
        condition: 'player_injured',
        reaction: '您受傷了！請讓我看看...（溫柔而擔憂）',
        effect: '+15 affection'
      },
      happiness: {
        condition: 'player_healthy',
        reaction: '看到您健康，我就安心了。（溫柔微笑）',
        effect: '+10 affection'
      },
      neglect: {
        condition: 'no_interaction_for_7_days && affection >= 80',
        reaction: '您都不來看我...是不是不需要我了？（難過）',
        effect: '-10 affection'
      }
    }
  },
  
  sr_009: {
    id: 'sr_009',
    name: '黑寡婦',
    rarity: 'SR',
    gender: '女',
    occupation: '狙擊手',
    canHarem: true,
    
    stats: {
      STR: 55,
      DEF: 50,
      AGI: 80,
      INT: 75,
      WIS: 55
    },
    
    personality: {
      traits: ['神秘', '冷酷', '專業', '孤獨', '渴望溫暖'],
      archetype: 'MYSTERIOUS_SNIPER',
      dominance: 60,
      openness: 35,
      loyalty: 80,
      description: '神秘的女狙擊手，冷酷外表下隱藏著孤獨的心'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '陌生人',
        description: '神秘的狙擊手',
        attitude: 'MYSTERIOUS',
        dialogues: [
          '......',
          '別問我的事。',
          '保持距離對你我都好。'
        ],
        interactions: ['無交流', '冷漠對待'],
        restrictions: ['拒絕接觸', '極度封閉']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '合作',
        description: '工作上的搭檔',
        attitude: 'COOPERATIVE',
        dialogues: [
          '既然是任務，我會配合。',
          '你的技術...還算可以。',
          '繼續保持。'
        ],
        interactions: ['任務配合', '簡短交流', '專業合作'],
        restrictions: ['僅限工作', '不談私事']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '信任',
        description: '開始信任你',
        attitude: 'TRUSTING',
        dialogues: [
          '和你搭檔...感覺還不錯。',
          '你是少數值得信任的人。',
          '我可以把後背交給你。'
        ],
        interactions: ['並肩作戰', '分享經驗', '建立默契'],
        restrictions: ['仍保持距離', '不談感情']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '心動',
        description: '對你產生特殊感情',
        attitude: 'ATTRACTED',
        dialogues: [
          '為什麼...我會這麼在意你？',
          '這種感覺...很陌生。',
          '也許...我可以試著靠近你。'
        ],
        interactions: ['私下見面', '情感萌芽', '掙扎中'],
        restrictions: ['不習慣感情', '害怕受傷']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '依戀',
        description: '開始依戀你',
        attitude: 'DEPENDENT',
        dialogues: [
          '我從未想過會依賴一個人。',
          '但你...讓我感到安心。',
          '不要離開我...好嗎？'
        ],
        interactions: ['情感依賴', '尋求陪伴', '脆弱展現'],
        restrictions: ['需要安全感', '缺乏經驗']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '歸屬',
        description: '完全屬於你',
        attitude: 'DEVOTED',
        dialogues: [
          '你是我在這世界上唯一的光。',
          '我願意為你放下一切。',
          '從今往後，我只屬於你。',
          '謝謝你...讓我不再孤單。'
        ],
        interactions: ['完全親密', '絕對信任', '生死相依'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 85,
        emotion: 65,
        ambition: 70,
        loyalty: 80
      },
      dailyRoutines: {
        morning: '射擊訓練',
        afternoon: '任務執行',
        evening: '獨自靜思（高親密時想你）',
        night: '孤獨守夜（高親密時與你相伴）'
      },
      preferredActivities: [
        '狙擊訓練',
        '獨處',
        '觀察',
        '被你陪伴（高親密）',
        '靠在你身邊（高親密）'
      ]
    },
    
    specialEvents: {
      mysteriousEncounter: {
        id: 'sr_009_event_001',
        title: '神秘相遇',
        description: '第一次遇見黑寡婦',
        trigger: 'firstEncounter',
        dialogue: [
          '......',
          '（冷冷地看著你）',
          '別多管閒事。'
        ]
      },
      trustBuilding: {
        id: 'sr_009_event_002',
        title: '信任建立',
        description: '在危險中建立信任',
        trigger: 'affection >= 80 && mission_together',
        dialogue: [
          '你...救了我。',
          '謝謝。我欠你一次。',
          '也許...我可以相信你。'
        ]
      },
      emotionalAwakening: {
        id: 'sr_009_event_003',
        title: '情感覺醒',
        description: '黑寡婦意識到自己的感情',
        trigger: 'affection >= 160',
        dialogue: [
          '我一直獨來獨往，從不需要任何人。',
          '但現在...我發現我需要你。',
          '這種感覺...讓我害怕，但也讓我溫暖。',
          '請...不要離開我。'
        ]
      },
      eternalBond: {
        id: 'sr_009_event_004',
        title: '永恆的羈絆',
        description: '黑寡婦完全屬於你',
        trigger: 'affection >= 200',
        dialogue: [
          '在遇見你之前，我是黑暗中的孤魂。',
          '是你給了我光明，給了我溫暖。',
          '從今往後，我不再是孤獨的黑寡婦。',
          '我是你的女人，你的守護者。'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['精密瞄準鏡', '寧靜時光', '你的陪伴', '黑色玫瑰'],
      liked: ['實用工具', '書籍', '音樂'],
      neutral: ['普通禮物'],
      disliked: ['吵鬧物品', '華而不實'],
      hated: ['背叛', '欺騙']
    },
    
    dialogueStyle: {
      formality: 'MEDIUM',
      vocabulary: 'CONCISE',
      tone: 'COOL',
      emotionExpression: 'RESTRAINED'
    },
    
    specialTriggers: {
      jealousy: {
        condition: 'player_with_other_females && affection >= 120',
        reaction: '...她是誰？（眼神暗沉）',
        effect: '-15 affection'
      },
      protection: {
        condition: 'player_protects_her',
        reaction: '...謝謝。（難得的溫柔）',
        effect: '+20 affection'
      },
      neglect: {
        condition: 'no_interaction_for_5_days && affection >= 100',
        reaction: '你...不需要我了嗎？（孤獨）',
        effect: '-12 affection'
      }
    }
  },
  
  // ============================================
  // R級 - 精良（1位）
  // ============================================
  
  r_003: {
    id: 'r_003',
    name: '小紅',
    rarity: 'R',
    gender: '女',
    occupation: '秘書',
    canHarem: true,
    
    stats: {
      STR: 30,
      DEF: 35,
      AGI: 55,
      INT: 60,
      WIS: 45
    },
    
    personality: {
      traits: ['活潑', '可愛', '努力', '單純', '忠誠'],
      archetype: 'CUTE_JUNIOR',
      dominance: 20,
      openness: 70,
      loyalty: 80,
      description: '辦公室小秘書，活潑可愛，努力上進'
    },
    
    affectionStages: {
      stage0: {
        points: 0,
        level: 0,
        title: '新人',
        description: '剛入職的小秘書',
        attitude: 'NERVOUS',
        dialogues: [
          '您、您好！我是新來的小紅！',
          '請多多指教！我會努力的！',
          '有什麼需要我做的嗎？'
        ],
        interactions: ['緊張對話', '努力工作', '小心翼翼'],
        restrictions: ['新人緊張', '不敢親近']
      },
      stage1: {
        points: 40,
        level: 1,
        title: '熟悉',
        description: '開始熟悉工作和你',
        attitude: 'COMFORTABLE',
        dialogues: [
          '今天也請多多指教！',
          '我覺得您人真好！',
          '能為您工作，我很開心！'
        ],
        interactions: ['輕鬆對話', '主動幫忙', '開朗笑容'],
        restrictions: ['還在上下級定位']
      },
      stage2: {
        points: 80,
        level: 2,
        title: '仰慕',
        description: '開始仰慕你',
        attitude: 'ADMIRING',
        dialogues: [
          '您真的好厲害！',
          '我好想變得像您一樣優秀！',
          '每天見到您就很開心！'
        ],
        interactions: ['崇拜眼神', '積極表現', '想要接近'],
        restrictions: ['不敢表達愛意', '自卑感']
      },
      stage3: {
        points: 120,
        level: 3,
        title: '喜歡',
        description: '喜歡上你了',
        attitude: 'CRUSHING',
        dialogues: [
          '我...我是不是喜歡上您了？',
          '但是...我配不上您吧...',
          '能一直在您身邊就好了...'
        ],
        interactions: ['暗戀', '害羞臉紅', '偷偷看你'],
        restrictions: ['不敢表白', '覺得配不上']
      },
      stage4: {
        points: 160,
        level: 4,
        title: '告白',
        description: '鼓起勇氣告白',
        attitude: 'CONFESSING',
        dialogues: [
          '我...我喜歡您！',
          '雖然我只是個小秘書...但我真的很喜歡您！',
          '請給我一個機會...好嗎？',
          '我會努力成為配得上您的人！'
        ],
        interactions: ['勇敢告白', '等待回應', '忐忑不安'],
        restrictions: ['需要你的接受']
      },
      stage5: {
        points: 200,
        level: 5,
        title: '幸福',
        description: '成為你的小女友',
        attitude: 'DEVOTED',
        dialogues: [
          '能和您在一起，是我最大的幸福！',
          '我會永遠愛您，永遠支持您！',
          '您就是我的全世界！',
          '親愛的，今天辛苦了！讓我抱抱！'
        ],
        interactions: ['甜蜜戀愛', '可愛撒嬌', '全心付出'],
        restrictions: []
      }
    },
    
    behaviorSystem: {
      decisionWeights: {
        logic: 55,
        emotion: 80,
        ambition: 65,
        loyalty: 80
      },
      dailyRoutines: {
        morning: '早早來辦公室準備',
        afternoon: '努力工作，學習進步',
        evening: '整理辦公室（高親密時等你）',
        night: '想你（高親密時陪你）'
      },
      preferredActivities: [
        '努力工作',
        '學習進步',
        '為你服務',
        '被你誇獎',
        '撒嬌（高親密）'
      ]
    },
    
    specialEvents: {
      firstDay: {
        id: 'r_003_event_001',
        title: '新人報到',
        description: '小紅第一天來上班',
        trigger: 'firstEncounter',
        dialogue: [
          '您、您好！我是小紅！',
          '今天是我第一天上班，有點緊張...',
          '請多多指教！我會努力的！'
        ]
      },
      hardWorking: {
        id: 'r_003_event_002',
        title: '努力的身影',
        description: '看到小紅努力工作的樣子',
        trigger: 'affection >= 40',
        dialogue: [
          '我一定要努力！',
          '這樣才能幫上您的忙！',
          '您誇獎我，我真的好開心！'
        ]
      },
      shyConfession: {
        id: 'r_003_event_003',
        title: '小秘書的告白',
        description: '小紅鼓起勇氣向你告白',
        trigger: 'affection >= 160',
        dialogue: [
          '我...我一直想說的話...',
          '我喜歡您！真的很喜歡！',
          '雖然我只是個小秘書，但我會努力的！',
          '請...請讓我成為您的女朋友！'
        ]
      },
      sweetGirlfriend: {
        id: 'r_003_event_004',
        title: '甜蜜小女友',
        description: '成為你可愛的小女友',
        trigger: 'affection >= 200',
        dialogue: [
          '能成為您的女朋友，真的好幸福！',
          '我會努力成為更好的人！',
          '請永遠愛我！我也會永遠愛您！',
          '親愛的，抱抱~！'
        ]
      }
    },
    
    giftPreferences: {
      loved: ['可愛飾品', '甜食', '文具', '你的誇獎'],
      liked: ['衣服', '包包', '零食', '小玩具'],
      neutral: ['普通禮物'],
      disliked: ['太貴重的（會不好意思）'],
      hated: ['被忽視', '被嫌棄']
    },
    
    dialogueStyle: {
      formality: 'LOW',
      vocabulary: 'SIMPLE',
      tone: 'CUTE',
      emotionExpression: 'OPEN'
    },
    
    specialTriggers: {
      jealousy: {
        condition: 'player_with_other_females && affection >= 100',
        reaction: '嗚...您和她...（委屈）',
        effect: '-10 affection'
      },
      praise: {
        condition: 'player_praises_her',
        reaction: '真的嗎！我好開心！（眼睛發亮）',
        effect: '+15 affection'
      },
      neglect: {
        condition: 'no_interaction_for_3_days && affection >= 80',
        reaction: '您是不是不喜歡我了...（快哭了）',
        effect: '-12 affection'
      }
    }
  }
};

// 輔助函數：根據ID獲取角色
export function getCharacterById(characterId) {
  return HaremAILibrary[characterId] || null;
}

// 輔助函數：獲取所有後宮角色
export function getAllHaremCharacters() {
  return Object.values(HaremAILibrary);
}

// 輔助函數：根據稀有度獲取角色
export function getCharactersByRarity(rarity) {
  return Object.values(HaremAILibrary).filter(char => char.rarity === rarity);
}

// 輔助函數：根據親密度獲取當前階段
export function getAffectionStage(characterId, affectionPoints) {
  const character = HaremAILibrary[characterId];
  if (!character) return null;
  
  if (affectionPoints >= 200) return character.affectionStages.stage5;
  if (affectionPoints >= 160) return character.affectionStages.stage4;
  if (affectionPoints >= 120) return character.affectionStages.stage3;
  if (affectionPoints >= 80) return character.affectionStages.stage2;
  if (affectionPoints >= 40) return character.affectionStages.stage1;
  return character.affectionStages.stage0;
}

// 輔助函數：獲取隨機對話
export function getRandomDialogue(characterId, affectionPoints) {
  const stage = getAffectionStage(characterId, affectionPoints);
  if (!stage || !stage.dialogues || stage.dialogues.length === 0) {
    return '......';
  }
  const randomIndex = Math.floor(Math.random() * stage.dialogues.length);
  return stage.dialogues[randomIndex];
}

// 輔助函數：觸發特殊事件
export function triggerSpecialEvent(characterId, eventId) {
  const character = HaremAILibrary[characterId];
  if (!character || !character.specialEvents) return null;
  
  for (const [key, event] of Object.entries(character.specialEvents)) {
    if (event.id === eventId) {
      return event;
    }
  }
  return null;
}

// 輔助函數：檢查禮物反應
export function getGiftReaction(characterId, giftType) {
  const character = HaremAILibrary[characterId];
  if (!character || !character.giftPreferences) return 'neutral';
  
  const prefs = character.giftPreferences;
  if (prefs.loved && prefs.loved.includes(giftType)) return 'loved';
  if (prefs.liked && prefs.liked.includes(giftType)) return 'liked';
  if (prefs.disliked && prefs.disliked.includes(giftType)) return 'disliked';
  if (prefs.hated && prefs.hated.includes(giftType)) return 'hated';
  return 'neutral';
}

// 導出主要資料
export default HaremAILibrary;
