// ========== 20位核心角色完整數據 ==========

const CORE_PARTNERS_20 = [
    // ===== LR 傳說級 (金色) - 2位 =====
    {
        id: 'lr_001',
        name: '龍霸天',
        nickname: '江湖龍王',
        rarity: 'LR',
        job: 'QUEEN',
        avatar: '🐉',
        gender: 'male',
        age: 45,
        personality: 'dominant',  // 性格：霸道
        
        background: '曾經統治整個地下世界的傳奇人物，你父親的老友。退隱江湖多年後，因欣賞你的潛力而選擇追隨。掌握龐大的人脈網絡與秘密情報。',
        
        specialty: '全能指揮',
        position: '核心幹部',
        
        baseStats: {
            STR: 95,
            DEF: 90,
            AGI: 75,
            INT: 98,
            WIS: 92
        },
        
        activeSkill: 'ROYAL_COMMAND',
        passiveSkill: 'BORN_LEADER',
        
        personalQuest: {
            title: '龍王歸來',
            description: '協助龍霸天奪回失去的地盤',
            reward: '專屬技能「龍之威壓」'
        },
        
        dialogues: {
            greeting: '小子，你有你父親當年的風範。',
            battleStart: '讓我來教你什麼叫真正的江湖！',
            victory: '這才是老大該有的樣子。',
            levelUp: '年輕人，還不錯嘛。'
        },
        
        favoriteGifts: ['高級雪茄', '古董字畫', '名貴洋酒'],
        unlock: 'route_F'
    },
    
    {
        id: 'lr_002',
        name: '夜影',
        nickname: '暗夜女皇',
        rarity: 'LR',
        job: 'ASSASSIN',
        avatar: '🌙',
        gender: 'female',
        age: 28,
        personality: 'cold',  // 性格：冷酷
        
        background: '神秘的頂級殺手，從未失手。因一次意外被你所救，從此追隨左右。擅長暗殺、情報竊取與隱秘行動。',
        
        specialty: '暗殺專精',
        position: '特殊行動',
        
        baseStats: {
            STR: 85,
            DEF: 70,
            AGI: 100,
            INT: 88,
            WIS: 75
        },
        
        activeSkill: 'DEADLY_STRIKE',
        passiveSkill: 'SHADOW_STEP',
        
        personalQuest: {
            title: '影之契約',
            description: '幫助夜影找出背叛她的組織',
            reward: '專屬技能「致命暗影」'
        },
        
        dialogues: {
            greeting: '需要我清理誰嗎？',
            battleStart: '目標鎖定。',
            victory: '任務完成。',
            levelUp: '技藝精進了。'
        },
        
        favoriteGifts: ['精密匕首', '夜行裝備', '稀有毒藥'],
        haremEligible: true,
        submissionStages: {
            0: '冷漠應對',
            40: '開始信任',
            80: '展露溫柔',
            120: '心防瓦解',
            160: '深愛不已',
            200: '生死相隨'
        },
        unlock: 'achievement_assassin_master'
    },
    
    // ===== UR 究極稀有 (紅色) - 3位 =====
    {
        id: 'ur_001',
        name: '鐵拳輝',
        nickname: '不敗拳王',
        rarity: 'UR',
        job: 'FIGHTER',
        avatar: '👊',
        gender: 'male',
        age: 32,
        personality: 'hot_blooded',  // 性格：熱血
        
        background: '地下拳擊場的傳奇冠軍，從未敗北。因欣賞你的勇氣而加入，擁有驚人的戰鬥天賦。',
        
        specialty: '近戰無雙',
        position: '前線戰鬥',
        
        baseStats: {
            STR: 100,
            DEF: 88,
            AGI: 75,
            INT: 50,
            WIS: 55
        },
        
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        
        personalQuest: {
            title: '王者之路',
            description: '幫助鐵拳輝重返拳擊場巔峰',
            reward: '專屬技能「毀滅之拳」'
        },
        
        dialogues: {
            greeting: '老大！今天要打誰？',
            battleStart: '讓他們見識我的鐵拳！',
            victory: '哈哈！過癮！',
            levelUp: '我變得更強了！'
        },
        
        favoriteGifts: ['拳套', '能量飲料', '健身器材'],
        unlock: 'route_C'
    },
    
    {
        id: 'ur_002',
        name: '刀鋒',
        nickname: '雙刀殺神',
        rarity: 'UR',
        job: 'ASSASSIN',
        avatar: '🗡️',
        gender: 'male',
        age: 29,
        personality: 'ruthless',  // 性格：冷酷無情
        
        background: '以雙刀聞名的殺手，出手必見血。曾是敵對幫派的王牌，被你的實力折服後投誠。',
        
        specialty: '雙刀流',
        position: '中排爆發',
        
        baseStats: {
            STR: 90,
            DEF: 65,
            AGI: 95,
            INT: 70,
            WIS: 60
        },
        
        activeSkill: 'DEADLY_STRIKE',
        passiveSkill: 'SHADOW_STEP',
        
        personalQuest: {
            title: '刀之道',
            description: '協助刀鋒完成「百人斬」',
            reward: '專屬技能「瞬影斬」'
        },
        
        dialogues: {
            greeting: '刀已飢渴難耐。',
            battleStart: '準備收屍吧。',
            victory: '不過如此。',
            levelUp: '刀更鋒利了。'
        },
        
        favoriteGifts: ['名刀', '磨刀石', '戰術手套'],
        unlock: 'route_E'
    },
    
    {
        id: 'ur_003',
        name: '白蓮',
        nickname: '冰山美人',
        rarity: 'UR',
        job: 'SNIPER',
        avatar: '❄️',
        gender: 'female',
        age: 26,
        personality: 'cold',  // 性格：冷艷
        
        background: '前特種部隊狙擊手，退役後成為傭兵。因一次任務失敗流落街頭，被你收留。擁有完美的射擊天賦。',
        
        specialty: '遠程狙殺',
        position: '後排控制',
        
        baseStats: {
            STR: 60,
            DEF: 55,
            AGI: 92,
            INT: 95,
            WIS: 75
        },
        
        activeSkill: 'PRECISION_SHOT',
        passiveSkill: 'EAGLE_EYE',
        
        personalQuest: {
            title: '完美射擊',
            description: '幫助白蓮找回失去的榮譽',
            reward: '專屬技能「絕對零度」'
        },
        
        dialogues: {
            greeting: '目標在哪？',
            battleStart: '進入狙擊位置。',
            victory: '百發百中。',
            levelUp: '準度提升。'
        },
        
        favoriteGifts: ['狙擊步槍', '望遠鏡', '咖啡'],
        haremEligible: true,
        submissionStages: {
            0: '保持距離',
            40: '開始依賴',
            80: '展現柔情',
            120: '心門大開',
            160: '完全信任',
            200: '永遠追隨'
        },
        unlock: 'achievement_sharpshooter'
    },
    
    // ===== SSR 特級稀有 (紫色) - 5位 =====
    {
        id: 'ssr_001',
        name: '阿龍',
        nickname: '義氣兄弟',
        rarity: 'SSR',
        job: 'FIGHTER',
        avatar: '👔',
        gender: 'male',
        age: 28,
        personality: 'loyal',  // 性格：忠義
        
        background: '你父親生前最信任的手下，從小看著你長大。武力超群，對你忠心耿耿，是最可靠的夥伴。',
        
        specialty: '前排坦克',
        position: '前線保護',
        
        baseStats: {
            STR: 90,
            DEF: 85,
            AGI: 65,
            INT: 60,
            WIS: 70
        },
        
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        
        personalQuest: {
            title: '兄弟之約',
            description: '幫助阿龍找回失散的妹妹',
            reward: '忠誠度永久+50'
        },
        
        dialogues: {
            greeting: '老大，有什麼吩咐？',
            battleStart: '我來保護你！',
            victory: '敵人不堪一擊！',
            levelUp: '為了老大，我會變得更強！'
        },
        
        favoriteGifts: ['名酒', '拳擊手套', '家庭相冊'],
        unlock: 'route_A'
    },
    
    {
        id: 'ssr_002',
        name: '算盤林',
        nickname: '金融鬼才',
        rarity: 'SSR',
        job: 'SECRETARY',
        avatar: '💼',
        gender: 'male',
        age: 35,
        personality: 'shrewd',  // 性格：精明
        
        background: '華爾街回流的金融天才，因捲入內幕交易而逃回台灣。精通洗錢、投資與財務管理。',
        
        specialty: '資金運作',
        position: '後勤支援',
        
        baseStats: {
            STR: 40,
            DEF: 45,
            AGI: 70,
            INT: 98,
            WIS: 88
        },
        
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        
        personalQuest: {
            title: '金融風暴',
            description: '協助算盤林扳倒前雇主',
            reward: '每日收益+20%'
        },
        
        dialogues: {
            greeting: '老大，今天的收益報表已經出來了。',
            battleStart: '用錢也能打倒敵人。',
            victory: '這就是資本的力量。',
            levelUp: '投資回報率上升了。'
        },
        
        favoriteGifts: ['股票', '金條', '經濟學書籍'],
        unlock: 'route_B'
    },
    
    {
        id: 'ssr_003',
        name: '紅姐',
        nickname: '夜店女王',
        rarity: 'SSR',
        job: 'QUEEN',
        avatar: '👑',
        gender: 'female',
        age: 32,
        personality: 'charming',  // 性格：魅惑
        
        background: '統治整個夜生活圈的女王，掌握無數秘密與人脈。因欣賞你的野心而願意合作。',
        
        specialty: '社交掌控',
        position: '情報收集',
        
        baseStats: {
            STR: 55,
            DEF: 60,
            AGI: 80,
            INT: 90,
            WIS: 85
        },
        
        activeSkill: 'ROYAL_COMMAND',
        passiveSkill: 'BORN_LEADER',
        
        personalQuest: {
            title: '女王加冕',
            description: '幫助紅姐擴張夜店帝國',
            reward: 'KTV收益永久+50%'
        },
        
        dialogues: {
            greeting: '小帥哥，找姐姐有事？',
            battleStart: '讓他們見識女人的厲害。',
            victory: '姐姐我可不好惹。',
            levelUp: '魅力又上升了呢。'
        },
        
        favoriteGifts: ['名牌包', '珠寶', '香水'],
        haremEligible: true,
        submissionStages: {
            0: '保持曖昧',
            40: '開始動心',
            80: '主動親近',
            120: '獻身投靠',
            160: '深深愛戀',
            200: '唯你是從'
        },
        unlock: 'route_C'
    },
    
    {
        id: 'ssr_004',
        name: '琉璃',
        nickname: '交際花',
        rarity: 'SSR',
        job: 'SECRETARY',
        avatar: '🌸',
        gender: 'female',
        age: 24,
        personality: 'gentle',  // 性格：溫柔
        
        background: '高級會所的頭牌，精通各國語言與社交禮儀。渴望擺脫過去，願意用才能輔佐你。',
        
        specialty: '外交談判',
        position: '公關協調',
        
        baseStats: {
            STR: 45,
            DEF: 50,
            AGI: 85,
            INT: 88,
            WIS: 82
        },
        
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        
        personalQuest: {
            title: '自由之身',
            description: '幫助琉璃贖回自由身',
            reward: '談判成功率+30%'
        },
        
        dialogues: {
            greeting: '主人，琉璃隨時待命。',
            battleStart: '讓我來處理吧。',
            victory: '一切都在掌握中。',
            levelUp: '謝謝主人的栽培。'
        },
        
        favoriteGifts: ['書籍', '鋼琴', '茶具'],
        haremEligible: true,
        submissionStages: {
            0: '小心翼翼',
            40: '逐漸依賴',
            80: '真心付出',
            120: '完全服從',
            160: '深愛不渝',
            200: '生死相依'
        },
        unlock: 'route_D'
    },
    
    {
        id: 'ssr_005',
        name: '王子杰',
        nickname: '公關王子',
        rarity: 'SSR',
        job: 'SECRETARY',
        avatar: '🎩',
        gender: 'male',
        age: 26,
        personality: 'smooth',  // 性格：圓滑
        
        background: '高級俱樂部的少東，精通人際交往與情報收集。看好你的潛力而選擇合作。',
        
        specialty: '情報網絡',
        position: '公關協調',
        
        baseStats: {
            STR: 50,
            DEF: 55,
            AGI: 80,
            INT: 85,
            WIS: 78
        },
        
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        
        personalQuest: {
            title: '王子歸位',
            description: '協助王子杰奪回家族產業',
            reward: '情報獲取速度+40%'
        },
        
        dialogues: {
            greeting: '老大，有什麼需要我打探的嗎？',
            battleStart: '看我的社交手腕。',
            victory: '人脈就是力量。',
            levelUp: '關係網又擴大了。'
        },
        
        favoriteGifts: ['名片夾', '高級西裝', '紅酒'],
        unlock: 'route_D'
    },
    
    // ===== SR 超稀有 (藍色) - 7位 =====
    {
        id: 'sr_001',
        name: '白琴',
        nickname: '鋼琴女神',
        rarity: 'SR',
        job: 'DOCTOR',
        avatar: '🎹',
        gender: 'female',
        age: 27,
        personality: 'elegant',  // 性格：優雅
        
        background: '前音樂學院教授，因家族破產而流落街頭。擁有醫療知識與藝術氣質。',
        
        specialty: '醫療支援',
        position: '後排治療',
        
        baseStats: {
            STR: 40,
            DEF: 45,
            AGI: 65,
            INT: 75,
            WIS: 90
        },
        
        activeSkill: 'HEALING_WAVE',
        passiveSkill: 'MEDICAL_EXPERT',
        
        personalQuest: {
            title: '音樂之夢',
            description: '幫助白琴重返舞台',
            reward: '全隊生命上限+20%'
        },
        
        dialogues: {
            greeting: '需要我治療嗎？',
            battleStart: '我會保護大家。',
            victory: '平安無事真好。',
            levelUp: '醫術更精進了。'
        },
        
        favoriteGifts: ['樂譜', '醫療器材', '花束'],
        haremEligible: true,
        submissionStages: {
            0: '保持禮貌',
            40: '開始好感',
            80: '心生愛意',
            120: '願意獻身',
            160: '深愛不已',
            200: '生死相隨'
        },
        unlock: 'route_A'
    },
    
    {
        id: 'sr_002',
        name: '刀手坤',
        nickname: '砍人專家',
        rarity: 'SR',
        job: 'FIGHTER',
        avatar: '🔪',
        gender: 'male',
        age: 30,
        personality: 'aggressive',  // 性格：好戰
        
        background: '江湖上有名的砍人高手，因欣賞你的膽識而加入。出手狠辣，從不留情。',
        
        specialty: '近戰砍殺',
        position: '前排輸出',
        
        baseStats: {
            STR: 88,
            DEF: 70,
            AGI: 72,
            INT: 55,
            WIS: 50
        },
        
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        
        personalQuest: {
            title: '復仇之刀',
            description: '幫助刀手坤報殺兄之仇',
            reward: '暴擊率+15%'
        },
        
        dialogues: {
            greeting: '老大，要砍誰？',
            battleStart: '看我的大刀！',
            victory: '殺！',
            levelUp: '刀更利了。'
        },
        
        favoriteGifts: ['砍刀', '磨刀石', '烈酒'],
        unlock: 'route_B'
    },
    
    {
        id: 'sr_003',
        name: '小開',
        nickname: '情報專家',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '💻',
        gender: 'male',
        age: 22,
        personality: 'smart',  // 性格：聰明
        
        background: '頂尖駭客與情報分析師，精通網路攻防與資訊收集。被你的理念吸引而加入。',
        
        specialty: '駭客技術',
        position: '情報支援',
        
        baseStats: {
            STR: 35,
            DEF: 40,
            AGI: 75,
            INT: 92,
            WIS: 70
        },
        
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        
        personalQuest: {
            title: '網路戰爭',
            description: '協助小開攻破敵對組織系統',
            reward: '敵方情報自動揭露'
        },
        
        dialogues: {
            greeting: '老大，我入侵了他們的系統。',
            battleStart: '讓我駭進去。',
            victory: '輕而易舉。',
            levelUp: '技術又升級了。'
        },
        
        favoriteGifts: ['電腦零件', '駭客工具', '能量飲料'],
        unlock: 'route_A'
    },
    
    {
        id: 'sr_004',
        name: '公關陳',
        nickname: '萬能公關',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '📱',
        gender: 'male',
        age: 28,
        personality: 'smooth',  // 性格：圓滑
        
        background: '專業公關人員，擅長危機處理與媒體操作。能將黑的說成白的。',
        
        specialty: '危機公關',
        position: '形象管理',
        
        baseStats: {
            STR: 45,
            DEF: 50,
            AGI: 70,
            INT: 85,
            WIS: 75
        },
        
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        
        personalQuest: {
            title: '形象重塑',
            description: '協助公關陳洗白過去黑歷史',
            reward: '聲望損失-50%'
        },
        
        dialogues: {
            greeting: '老大，需要我處理輿論嗎？',
            battleStart: '看我的口才。',
            victory: '一切都在掌控中。',
            levelUp: '話術更加精進。'
        },
        
        favoriteGifts: ['名片', '手機', '西裝'],
        unlock: 'route_B'
    },
    
    {
        id: 'sr_005',
        name: '茶博士',
        nickname: '和平使者',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '🍵',
        gender: 'male',
        age: 55,
        personality: 'wise',  // 性格：睿智
        
        background: '江湖老前輩，中立調解者。擅長談判與調解糾紛，德高望重。',
        
        specialty: '談判調解',
        position: '外交協調',
        
        baseStats: {
            STR: 35,
            DEF: 60,
            AGI: 50,
            INT: 88,
            WIS: 95
        },
        
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        
        personalQuest: {
            title: '和平之道',
            description: '協助茶博士促成派系和談',
            reward: '談判成功率+25%'
        },
        
        dialogues: {
            greeting: '年輕人，來喝杯茶吧。',
            battleStart: '和為貴，但必要時也要動手。',
            victory: '和氣生財。',
            levelUp: '又悟出些道理了。'
        },
        
        favoriteGifts: ['茶葉', '古書', '香爐'],
        unlock: 'route_C'
    },
    
    {
        id: 'sr_006',
        name: '雙槍李',
        nickname: '雙槍俠客',
        rarity: 'SR',
        job: 'GUNNER',
        avatar: '🔫',
        gender: 'male',
        age: 31,
        personality: 'cool',  // 性格：酷酷的
        
        background: '精通雙槍射擊的俠客，行蹤飄忽。因欣賞你的正義感而加入。',
        
        specialty: '雙槍射擊',
        position: '遠程輸出',
        
        baseStats: {
            STR: 60,
            DEF: 55,
            AGI: 88,
            INT: 78,
            WIS: 65
        },
        
        activeSkill: 'BULLET_STORM',
        passiveSkill: 'QUICK_RELOAD',
        
        personalQuest: {
            title: '槍神之路',
            description: '幫助雙槍李找回失落的名槍',
            reward: '攻擊速度+20%'
        },
        
        dialogues: {
            greeting: '有目標要清理嗎？',
            battleStart: '雙槍齊發！',
            victory: '彈無虛發。',
            levelUp: '槍法更準了。'
        },
        
        favoriteGifts: ['手槍', '子彈', '槍油'],
        unlock: 'route_E'
    },
    
    {
        id: 'sr_007',
        name: '星辰',
        nickname: '科技少女',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '⭐',
        gender: 'female',
        age: 20,
        personality: 'energetic',  // 性格：活潑
        
        background: '天才科技工程師，專精機械與電子系統。對你的科技理念充滿憧憬。',
        
        specialty: '科技研發',
        position: '技術支援',
        
        baseStats: {
            STR: 30,
            DEF: 40,
            AGI: 80,
            INT: 95,
            WIS: 68
        },
        
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        
        personalQuest: {
            title: '科技之光',
            description: '協助星辰完成終極發明',
            reward: '科技建築效率+30%'
        },
        
        dialogues: {
            greeting: '老大老大！我又有新發明了！',
            battleStart: '看我的科技武器！',
            victory: '科技改變世界！',
            levelUp: '研發成功！'
        },
        
        favoriteGifts: ['電路板', '工具箱', '科技雜誌'],
        haremEligible: true,
        submissionStages: {
            0: '保持崇拜',
            40: '逐漸親密',
            80: '萌生愛意',
            120: '願意付出',
            160: '深深依戀',
            200: '永遠追隨'
        },
        unlock: 'route_F'
    },
    
    // ===== R 稀有 (綠色) - 3位 =====
    {
        id: 'r_001',
        name: '小弟甲',
        nickname: '忠心打手',
        rarity: 'R',
        job: 'FIGHTER',
        avatar: '🤜',
        gender: 'male',
        age: 25,
        personality: 'loyal',
        
        background: '組織的基層打手，忠心耿耿但能力普通。願意為你賣命。',
        
        specialty: '基礎戰鬥',
        position: '前排',
        
        baseStats: {
            STR: 65,
            DEF: 60,
            AGI: 50,
            INT: 40,
            WIS: 45
        },
        
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        
        dialogues: {
            greeting: '老大，有什麼吩咐？',
            battleStart: '衝啊！',
            victory: '贏了！',
            levelUp: '我變強了！'
        },
        
        favoriteGifts: ['啤酒', '香煙', '零食'],
        unlock: 'default'
    },
    
    {
        id: 'r_002',
        name: '小弟乙',
        nickname: '跑腿專家',
        rarity: 'R',
        job: 'SECRETARY',
        avatar: '🏃',
        gender: 'male',
        age: 23,
        personality: 'diligent',
        
        background: '勤奮的跑腿小弟，雖然能力有限但做事認真負責。',
        
        specialty: '跑腿辦事',
        position: '後勤',
        
        baseStats: {
            STR: 40,
            DEF: 45,
            AGI: 70,
            INT: 60,
            WIS: 55
        },
        
        activeSkill: 'STRATEGIC_SUPPORT',
        passiveSkill: 'EFFICIENT_WORK',
        
        dialogues: {
            greeting: '老大，今天要我做什麼？',
            battleStart: '我來幫忙！',
            victory: '成功了！',
            levelUp: '辦事更靈活了！'
        },
        
        favoriteGifts: ['交通卡', '便當', '手套'],
        unlock: 'default'
    },
    
    {
        id: 'r_003',
        name: '小弟丙',
        nickname: '看門大哥',
        rarity: 'R',
        job: 'BODYGUARD',
        avatar: '🛡️',
        gender: 'male',
        age: 35,
        personality: 'steady',
        
        background: '穩重的老成員，負責基地防守。雖然戰力不強但經驗豐富。',
        
        specialty: '防守',
        position: '前排',
        
        baseStats: {
            STR: 55,
            DEF: 75,
            AGI: 45,
            INT: 50,
            WIS: 65
        },
        
        activeSkill: 'SHIELD_WALL',
        passiveSkill: 'IRON_BODY',
        
        dialogues: {
            greeting: '老大，基地很安全。',
            battleStart: '我來守護！',
            victory: '防守成功！',
            levelUp: '防禦更強了！'
        },
        
        favoriteGifts: ['盾牌', '茶水', '報紙'],
        unlock: 'default'
    }
];

// 根據 ID 獲取夥伴
function getPartnerById(id) {
    return CORE_PARTNERS_20.find(p => p.id === id);
}

// 根據稀有度篩選
function getPartnersByRarity(rarity) {
    return CORE_PARTNERS_20.filter(p => p.rarity === rarity);
}

// 根據性別篩選
function getPartnersByGender(gender) {
    return CORE_PARTNERS_20.filter(p => p.gender === gender);
}

// 獲取後宮候選
function getHaremCandidates() {
    return CORE_PARTNERS_20.filter(p => p.haremEligible);
}

// 匯出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CORE_PARTNERS_20,
        getPartnerById,
        getPartnersByRarity,
        getPartnersByGender,
        getHaremCandidates
    };
}
