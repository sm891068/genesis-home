// ========================================
// 24位核心角色完整數據（擴充版）
// LR×1 / UR×4 / SSR×6 / SR×8 / R×5
// ========================================

// 注意：本文件包含所有 24 位角色
// 羅奈米（SSR）已加入

const CORE_PARTNERS = [
    // ===== LR 傳說級 (金色) - 1位（唯一）=====
    {
        id: 'lr_001',
        name: '龍爺',
        nickname: '傳奇教父',
        rarity: 'LR',
        job: 'QUEEN',
        avatar: '🐲',
        gender: 'male',
        age: 65,
        personality: 'wise',
        
        background: '你的父親，曾經統治整個地下世界的傳奇人物。縱橫江湖四十年，無人敢犯。在你接手家族事業前病逝，留下了龐大的遺產與未完成的野心。他的教誨與精神將永遠指引著你。',
        
        specialty: '傳奇指揮',
        position: '已故教父（精神支柱）',
        
        baseStats: { STR: 100, DEF: 100, AGI: 85, INT: 100, WIS: 100 },
        activeSkill: 'ROYAL_COMMAND',
        passiveSkill: 'BORN_LEADER',
        
        personalQuest: {
            title: '父親的遺志',
            description: '完成父親未竟的事業，統一地下世界',
            reward: '專屬技能「龍之傳承」+ 全屬性永久 +20%'
        },
        
        dialogues: {
            greeting: '兒子，記住，這座城市是我們的工地。',
            battleStart: '別碰毒品，那是底線。',
            victory: '這才是龍家的子孫。',
            levelUp: '你已經超越我了，孩子。',
            memory: '父親的教誨永遠迴響在耳邊...'
        },
        
        favoriteGifts: ['父親的遺物', '家族族譜', '陳年老酒'],
        unlock: 'story_complete',
        isDeceased: true,
        spiritGuide: true
    },
    
    // ===== UR 究極稀有 (紅色) - 4位 =====
    {
        id: 'ur_001',
        name: '夜影',
        nickname: '暗夜女皇',
        rarity: 'UR',
        job: 'ASSASSIN',
        avatar: '🌙',
        gender: 'female',
        age: 28,
        personality: 'cold',
        
        background: '神秘的頂級殺手，從未失手。因一次意外被你所救，從此追隨左右。擅長暗殺、情報竊取與隱秘行動。',
        
        specialty: '暗殺專精',
        position: '特殊行動',
        baseStats: { STR: 85, DEF: 70, AGI: 100, INT: 88, WIS: 75 },
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
            200: '永遠的影子'
        }
    },
    
    {
        id: 'ur_002',
        name: '鐵拳輝',
        nickname: '不敗拳王',
        rarity: 'UR',
        job: 'FIGHTER',
        avatar: '🥊',
        gender: 'male',
        age: 32,
        personality: 'passionate',
        
        background: '地下拳擊場的傳奇拳王，300場不敗。因欠下高利貸被迫為你效力，逐漸被你的魅力折服。',
        
        specialty: '近戰之王',
        position: '前線核心',
        baseStats: { STR: 100, DEF: 90, AGI: 75, INT: 60, WIS: 55 },
        activeSkill: 'IRON_FIST',
        passiveSkill: 'UNBREAKABLE',
        
        personalQuest: {
            title: '不敗神話',
            description: '幫助鐵拳輝完成第400場不敗紀錄',
            reward: '專屬技能「破壞之拳」'
        },
        
        dialogues: {
            greeting: '老大！今天練拳了嗎？',
            battleStart: '讓他們見識真正的拳頭！',
            victory: '哈哈哈！痛快！',
            levelUp: '我變得更強了！'
        },
        
        favoriteGifts: ['拳擊手套', '健身器材', '高蛋白粉']
    },
    
    {
        id: 'ur_003',
        name: '刀鋒',
        nickname: '劍聖',
        rarity: 'UR',
        job: 'ASSASSIN',
        avatar: '⚔️',
        gender: 'male',
        age: 30,
        personality: 'cold',
        
        background: '隱居多年的劍術大師，因尋找失蹤的妹妹而出山。你幫助他找到妹妹後，他發誓追隨。',
        
        specialty: '劍術無雙',
        position: '中線突擊',
        baseStats: { STR: 90, DEF: 75, AGI: 95, INT: 70, WIS: 70 },
        activeSkill: 'BLADE_STORM',
        passiveSkill: 'SWORD_MASTER',
        
        personalQuest: {
            title: '劍之道',
            description: '協助刀鋒找回失散的妹妹',
            reward: '專屬技能「無雙劍舞」'
        },
        
        dialogues: {
            greeting: '......（點頭）',
            battleStart: '劍即是道。',
            victory: '塵埃落定。',
            levelUp: '劍心更清明了。'
        },
        
        favoriteGifts: ['名刀', '磨刀石', '劍譜']
    },
    
    {
        id: 'ur_004',
        name: '白蓮',
        nickname: '聖女',
        rarity: 'UR',
        job: 'DOCTOR',
        avatar: '🌺',
        gender: 'female',
        age: 26,
        personality: 'gentle',
        
        background: '前醫院院長，因不滿黑幫襲擊醫院而主動加入你的組織，希望從內部改變黑道生態。',
        
        specialty: '醫療聖手',
        position: '後線支援',
        baseStats: { STR: 50, DEF: 60, AGI: 70, INT: 85, WIS: 100 },
        activeSkill: 'DIVINE_HEAL',
        passiveSkill: 'BLESSING',
        
        personalQuest: {
            title: '救贖之路',
            description: '幫助白蓮建立地下醫療網絡',
            reward: '專屬技能「生命奇蹟」'
        },
        
        dialogues: {
            greeting: '老大，今天身體還好嗎？',
            battleStart: '請讓我保護大家。',
            victory: '太好了，沒有人受重傷。',
            levelUp: '我能救更多人了。'
        },
        
        favoriteGifts: ['醫療器材', '草藥', '醫學書籍'],
        haremEligible: true,
        submissionStages: {
            0: '專業態度',
            40: '關心增加',
            80: '依賴產生',
            120: '愛意萌芽',
            160: '全心奉獻',
            200: '永恆守護'
        }
    },
    
    // ===== SSR 超超稀有 (紫色) - 6位 =====
    {
        id: 'ssr_001',
        name: '阿龍',
        nickname: '義氣仔',
        rarity: 'SSR',
        job: 'FIGHTER',
        avatar: '👔',
        gender: 'male',
        age: 28,
        personality: 'loyal',
        
        background: '從小在孤兒院長大，因你資助孤兒院而對你感恩戴德。為人重情重義，是最可靠的左右手。',
        
        specialty: '忠誠護衛',
        position: '前線',
        baseStats: { STR: 85, DEF: 80, AGI: 70, INT: 65, WIS: 70 },
        activeSkill: 'POWER_STRIKE',
        passiveSkill: 'IRON_FIST',
        
        personalQuest: {
            title: '報恩之心',
            description: '幫助阿龍重建孤兒院',
            reward: '忠誠度+20，專屬技能'
        },
        
        dialogues: {
            greeting: '老大，有什麼吩咐？',
            battleStart: '為了老大，我拼了！',
            victory: '老大，搞定了！',
            levelUp: '我會變得更強，保護老大！'
        },
        
        favoriteGifts: ['義氣信物', '兄弟合照', '孤兒院捐款']
    },
    
    {
        id: 'ssr_002',
        name: '算盤林',
        nickname: '金算盤',
        rarity: 'SSR',
        job: 'SECRETARY',
        avatar: '🧮',
        gender: 'male',
        age: 45,
        personality: 'cunning',
        
        background: '前會計師，因捲入金融詐騙案而逃亡。你給了他庇護，他用精明的頭腦為你管理財務。',
        
        specialty: '財務專家',
        position: '中線',
        baseStats: { STR: 55, DEF: 60, AGI: 75, INT: 95, WIS: 85 },
        activeSkill: 'ASSET_FREEZE',
        passiveSkill: 'MONEY_SENSE',
        
        personalQuest: {
            title: '洗白計劃',
            description: '幫助算盤林洗清冤屈',
            reward: '每日收益+15%'
        },
        
        dialogues: {
            greeting: '老大，今天帳目我都算好了。',
            battleStart: '錢能解決的，都不是問題。',
            victory: '這次賺大了。',
            levelUp: '投資回報率提升了。'
        },
        
        favoriteGifts: ['金條', '古董', '投資報告']
    },
    
    {
        id: 'ssr_003',
        name: '紅姐',
        nickname: '夜店女王',
        rarity: 'SSR',
        job: 'QUEEN',
        avatar: '💄',
        gender: 'female',
        age: 35,
        personality: 'seductive',
        
        background: '夜店經營者，手下管理著數百名小姐。因你解決了騷擾她的黑幫而主動投靠。',
        
        specialty: '社交女王',
        position: '中線',
        baseStats: { STR: 60, DEF: 65, AGI: 80, INT: 88, WIS: 77 },
        activeSkill: 'CHARM',
        passiveSkill: 'SOCIAL_NETWORK',
        
        personalQuest: {
            title: '夜店帝國',
            description: '幫助紅姐擴展夜店版圖',
            reward: 'KTV/夜店收益+30%'
        },
        
        dialogues: {
            greeting: '老大~又來找姐姐玩啦？',
            battleStart: '姐姐我可不好惹哦~',
            victory: '小菜一碟~',
            levelUp: '姐姐變得更有魅力了~'
        },
        
        favoriteGifts: ['名牌包包', '珠寶', '香水'],
        haremEligible: true,
        submissionStages: {
            0: '職業笑容',
            40: '真心相待',
            80: '依戀產生',
            120: '私密告白',
            160: '身心交付',
            200: '唯一的男人'
        }
    },
    
    {
        id: 'ssr_004',
        name: '琉璃',
        nickname: '妖姬',
        rarity: 'SSR',
        job: 'ASSASSIN',
        avatar: '🦋',
        gender: 'female',
        age: 24,
        personality: 'seductive',
        
        background: '神秘的舞者，實際上是訓練有素的間諜。因被前組織背叛而投靠你，利用美色刺探情報。',
        
        specialty: '誘惑刺探',
        position: '中線',
        baseStats: { STR: 70, DEF: 65, AGI: 90, INT: 85, WIS: 70 },
        activeSkill: 'SEDUCTION',
        passiveSkill: 'SPY_NETWORK',
        
        personalQuest: {
            title: '復仇之舞',
            description: '幫助琉璃對付背叛她的組織',
            reward: '情報獲取效率+50%'
        },
        
        dialogues: {
            greeting: '老大~想看人家跳舞嗎？',
            battleStart: '讓你見識我的舞技~',
            victory: '呵呵~輕而易舉~',
            levelUp: '我的舞姿更迷人了~'
        },
        
        favoriteGifts: ['高跟鞋', '舞衣', '香薰精油'],
        haremEligible: true,
        submissionStages: {
            0: '刻意誘惑',
            40: '真情流露',
            80: '心門打開',
            120: '深深著迷',
            160: '完全屬於你',
            200: '生死相隨'
        }
    },
    
    {
        id: 'ssr_005',
        name: '王子杰',
        nickname: '富二代',
        rarity: 'SSR',
        job: 'SECRETARY',
        avatar: '🎩',
        gender: 'male',
        age: 25,
        personality: 'cunning',
        
        background: '集團公司少東，因不滿父親的經營方式而反叛。被你的氣魄折服，主動加入。',
        
        specialty: '商業談判',
        position: '中線',
        baseStats: { STR: 65, DEF: 70, AGI: 80, INT: 90, WIS: 75 },
        activeSkill: 'BUSINESS_DEAL',
        passiveSkill: 'ELITE_EDUCATION',
        
        personalQuest: {
            title: '繼承之爭',
            description: '幫助王子杰奪取家族企業控制權',
            reward: '商業合作+30%收益'
        },
        
        dialogues: {
            greeting: '老大，我帶來了新的商機。',
            battleStart: '談判破裂？那就用實力說話。',
            victory: '這筆生意穩賺。',
            levelUp: '我的商業頭腦更敏銳了。'
        },
        
        favoriteGifts: ['名表', '雪茄', '商業雜誌']
    },
    
    {
        id: 'ssr_006',
        name: '羅奈米',
        nickname: '小惡魔',
        rarity: 'SSR',
        job: 'GUNNER',
        avatar: '😈',
        gender: 'female',
        age: 18,
        height: 166,
        measurements: '95-58-88',  // G罩杯
        personality: 'tsundere',
        
        background: '街頭小太妹出身，因搶劫你的地盤被抓。本想殺雞儆猴，卻被她的勇氣打動，決定收為己用。外表傲嬌刻薄，內心卻極度缺乏安全感。擁有誘人的身材但始終用凶悍的態度掩飾羞澀。',
        
        specialty: '街頭霸王',
        position: '後線',
        baseStats: { STR: 70, DEF: 65, AGI: 85, INT: 80, WIS: 60 },
        activeSkill: 'RAPID_FIRE',
        passiveSkill: 'STREET_SMART',
        
        personalQuest: {
            title: '小太妹的救贖',
            description: '幫助羅奈米找到真正的歸屬感',
            reward: '專屬技能「惡魔之吻」'
        },
        
        dialogues: {
            greeting: '哼，又來了？才...才不是在等你！',
            battleStart: '笨蛋！看我怎麼收拾他們！',
            victory: '哼，這種程度還不是小菜一碟。',
            levelUp: '變強了？才...才沒有為了你！',
            intimacy: {
                low: '離我遠點，變態！',
                medium: '你...你幹嘛一直看著我？不准盯著我的胸部看！',
                high: '真拿你沒辦法...只有你才能這樣對我。',
                max: '我...我喜歡你啦！笨蛋！不准告訴別人！'
            }
        },
        
        favoriteGifts: ['機車配件', '辣味零食', '時尚雜誌', '可愛玩偶'],
        haremEligible: true,
        submissionStages: {
            0: '死傲嬌狀態',
            40: '偶爾關心',
            80: '心軟表現',
            120: '真心依賴',
            160: '完全淪陷',
            200: '專屬的愛'
        },
        
        specialTraits: {
            bodyType: '誘惑系',
            attitude: '外冷內熱',
            secretLove: '其實很喜歡被誇獎',
            weakness: '摸頭會臉紅',
            jealousy: 90  // 極度吃醋
        }
    },
    
    // ===== SR 超稀有 (藍色) - 8位 =====
    {
        id: 'sr_001',
        name: '白琴',
        nickname: '鋼琴女神',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '🎹',
        gender: 'female',
        age: 27,
        personality: 'gentle',
        
        background: '高級酒吧的鋼琴師，因欠債被迫賣藝。你替她還清債務後，她決定留下來為你效力。',
        
        specialty: '優雅社交',
        position: '中線',
        baseStats: { STR: 50, DEF: 55, AGI: 70, INT: 80, WIS: 75 },
        activeSkill: 'SOOTHING_MELODY',
        passiveSkill: 'ELEGANT_CHARM',
        
        dialogues: {
            greeting: '老大，要聽一曲嗎？',
            battleStart: '讓音樂撫慰人心。',
            victory: '美妙的終章。',
            levelUp: '我的琴技更進一步了。'
        },
        
        favoriteGifts: ['樂譜', '鋼琴配件', '音樂盒'],
        haremEligible: true
    },
    
    {
        id: 'sr_002',
        name: '刀手坤',
        nickname: '快刀手',
        rarity: 'SR',
        job: 'FIGHTER',
        avatar: '🔪',
        gender: 'male',
        age: 30,
        personality: 'passionate',
        
        background: '菜市場殺豬的，刀法精準迅速。因仰慕你而加入，夢想成為真正的戰士。',
        
        specialty: '刀法迅捷',
        position: '前線',
        baseStats: { STR: 80, DEF: 70, AGI: 75, INT: 55, WIS: 50 },
        activeSkill: 'QUICK_SLASH',
        passiveSkill: 'KNIFE_MASTERY',
        
        dialogues: {
            greeting: '老大！今天要砍誰？',
            battleStart: '看我的快刀！',
            victory: '輕鬆搞定！',
            levelUp: '我的刀更快了！'
        },
        
        favoriteGifts: ['磨刀石', '名刀', '肉']
    },
    
    {
        id: 'sr_003',
        name: '小開',
        nickname: '富家少爺',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '💼',
        gender: 'male',
        age: 23,
        personality: 'gentle',
        
        background: '中產家庭的獨生子，因家道中落而投靠你。禮貌周到，擅長處理文書工作。',
        
        specialty: '行政助理',
        position: '中線',
        baseStats: { STR: 55, DEF: 60, AGI: 65, INT: 78, WIS: 72 },
        activeSkill: 'EFFICIENCY_BOOST',
        passiveSkill: 'ORGANIZATION',
        
        dialogues: {
            greeting: '老大，文件都整理好了。',
            battleStart: '我會盡力的！',
            victory: '太好了！',
            levelUp: '我變得更有用了。'
        },
        
        favoriteGifts: ['文具', '書籍', '咖啡']
    },
    
    {
        id: 'sr_004',
        name: '公關陳',
        nickname: '萬人迷',
        rarity: 'SR',
        job: 'SECRETARY',
        avatar: '🎭',
        gender: 'male',
        age: 35,
        personality: 'cunning',
        
        background: '前公關公司經理，因公司倒閉而失業。你欣賞他的口才，聘為公關顧問。',
        
        specialty: '公關專家',
        position: '中線',
        baseStats: { STR: 50, DEF: 55, AGI: 70, INT: 85, WIS: 80 },
        activeSkill: 'SWEET_TALK',
        passiveSkill: 'NETWORKING',
        
        dialogues: {
            greeting: '老大，今天行程我都安排好了。',
            battleStart: '讓我來談判。',
            victory: '一切按計劃進行。',
            levelUp: '我的人脈更廣了。'
        },
        
        favoriteGifts: ['名片夾', '高級筆', '社交場合邀請函']
    },
    
    {
        id: 'sr_005',
        name: '茶博士',
        nickname: '茶藝大師',
        rarity: 'SR',
        job: 'DOCTOR',
        avatar: '🍵',
        gender: 'male',
        age: 50,
        personality: 'gentle',
        
        background: '中醫世家傳人，因不滿現代醫療體系而隱居。你登門拜訪三次後，他終於願意出山。',
        
        specialty: '中醫療法',
        position: '後線',
        baseStats: { STR: 45, DEF: 50, AGI: 55, INT: 75, WIS: 90 },
        activeSkill: 'HERBAL_REMEDY',
        passiveSkill: 'ANCIENT_WISDOM',
        
        dialogues: {
            greeting: '年輕人，今天氣色不錯。',
            battleStart: '養生之道，在於平和。',
            victory: '陰陽調和，萬事順遂。',
            levelUp: '醫道精進了。'
        },
        
        favoriteGifts: ['珍貴藥材', '茶葉', '古醫書']
    },
    
    {
        id: 'sr_006',
        name: '雙槍李',
        nickname: '雙槍快手',
        rarity: 'SR',
        job: 'GUNNER',
        avatar: '🔫',
        gender: 'male',
        age: 28,
        personality: 'passionate',
        
        background: '前警察，因為了正義而擊斃黑警被停職。你給了他第二次機會，他用雙槍為你開路。',
        
        specialty: '雙槍射擊',
        position: '後線',
        baseStats: { STR: 70, DEF: 65, AGI: 80, INT: 72, WIS: 68 },
        activeSkill: 'DOUBLE_SHOT',
        passiveSkill: 'GUN_MASTERY',
        
        dialogues: {
            greeting: '老大，今天要清理誰？',
            battleStart: '正義，由我執行！',
            victory: '一槍一個，精準！',
            levelUp: '我的槍法更準了！'
        },
        
        favoriteGifts: ['子彈', '槍械保養套組', '射擊場會員卡']
    },
    
    {
        id: 'sr_007',
        name: '小美',
        nickname: '甜心護士',
        rarity: 'SR',
        job: 'DOCTOR',
        avatar: '💉',
        gender: 'female',
        age: 22,
        personality: 'gentle',
        
        background: '醫學院畢業的新人護士，因家人被黑幫威脅而被迫加入。漸漸發現你與其他黑幫不同。',
        
        specialty: '緊急救護',
        position: '後線',
        baseStats: { STR: 45, DEF: 50, AGI: 65, INT: 70, WIS: 80 },
        activeSkill: 'FIRST_AID',
        passiveSkill: 'CARING_HEART',
        
        dialogues: {
            greeting: '老大，身體有哪裡不舒服嗎？',
            battleStart: '請讓我來治療大家！',
            victory: '太好了，大家都平安。',
            levelUp: '我能救更多人了！'
        },
        
        favoriteGifts: ['醫療用品', '護士服', '甜點'],
        haremEligible: true
    },
    
    {
        id: 'sr_008',
        name: '阿花',
        nickname: '菜市場大姐',
        rarity: 'SR',
        job: 'BODYGUARD',
        avatar: '🔨',
        gender: 'female',
        age: 40,
        personality: 'passionate',
        
        background: '菜市場賣魚的大姐，力大無窮。因你幫她趕走流氓而感激，主動要求加入保護你。',
        
        specialty: '市井防衛',
        position: '前線',
        baseStats: { STR: 75, DEF: 85, AGI: 55, INT: 50, WIS: 60 },
        activeSkill: 'HAMMER_SMASH',
        passiveSkill: 'THICK_SKIN',
        
        dialogues: {
            greeting: '老大！今天買菜了沒？',
            battleStart: '看我的鐵鎚！',
            victory: '哈哈！輕鬆！',
            levelUp: '我更強壯了！'
        },
        
        favoriteGifts: ['廚具', '新鮮海鮮', '保健品'],
        haremEligible: true
    },
    
    // ===== R 稀有 (綠色) - 5位 =====
    {
        id: 'r_001',
        name: '小弟A',
        nickname: '忠心小弟',
        rarity: 'R',
        job: 'FIGHTER',
        avatar: '👤',
        gender: 'male',
        age: 20,
        personality: 'loyal',
        
        background: '街頭混混出身，被你的魅力折服而追隨。雖然能力普通，但忠心耿耿。',
        
        specialty: '基礎戰鬥',
        position: '前線',
        baseStats: { STR: 60, DEF: 55, AGI: 50, INT: 45, WIS: 40 },
        activeSkill: 'PUNCH',
        passiveSkill: 'LOYALTY',
        
        dialogues: {
            greeting: '老大好！',
            battleStart: '為了老大！',
            victory: '幹掉了！',
            levelUp: '我變強了！'
        },
        
        favoriteGifts: ['煙', '酒', '零食']
    },
    
    {
        id: 'r_002',
        name: '小弟B',
        nickname: '機靈小弟',
        rarity: 'R',
        job: 'ASSASSIN',
        avatar: '👥',
        gender: 'male',
        age: 22,
        personality: 'cunning',
        
        background: '街頭扒手，因你饒他一命而加入。雖然實力不強，但機靈聰明。',
        
        specialty: '偷竊情報',
        position: '中線',
        baseStats: { STR: 50, DEF: 45, AGI: 65, INT: 60, WIS: 50 },
        activeSkill: 'SNEAK_ATTACK',
        passiveSkill: 'NIMBLE',
        
        dialogues: {
            greeting: '老大，有什麼要我辦的？',
            battleStart: '看我的！',
            victory: '搞定！',
            levelUp: '我更靈活了！'
        },
        
        favoriteGifts: ['開鎖工具', '夜視鏡', '運動鞋']
    },
    
    {
        id: 'r_003',
        name: '小弟C',
        nickname: '話癆小弟',
        rarity: 'R',
        job: 'SECRETARY',
        avatar: '🗣️',
        gender: 'male',
        age: 25,
        personality: 'passionate',
        
        background: '前銷售員，因公司倒閉而失業。你欣賞他的口才，讓他負責情報收集。',
        
        specialty: '情報收集',
        position: '中線',
        baseStats: { STR: 45, DEF: 50, AGI: 55, INT: 65, WIS: 60 },
        activeSkill: 'GOSSIP',
        passiveSkill: 'CHATTERBOX',
        
        dialogues: {
            greeting: '老大！我跟你說，今天我聽到一個消息...',
            battleStart: '看我的三寸不爛之舌！',
            victory: '搞定！我再跟你說...',
            levelUp: '我的消息更靈通了！'
        },
        
        favoriteGifts: ['手機', '八卦雜誌', '咖啡']
    },
    
    {
        id: 'r_004',
        name: '小妹A',
        nickname: '收銀妹',
        rarity: 'R',
        job: 'SECRETARY',
        avatar: '👧',
        gender: 'female',
        age: 20,
        personality: 'gentle',
        
        background: '便利商店收銀員，因店被保護費騷擾而求助於你。你幫她解決後，她主動加入。',
        
        specialty: '帳務管理',
        position: '中線',
        baseStats: { STR: 40, DEF: 45, AGI: 55, INT: 60, WIS: 55 },
        activeSkill: 'QUICK_HANDS',
        passiveSkill: 'CAREFUL',
        
        dialogues: {
            greeting: '老大，今天的收入都算好了。',
            battleStart: '我...我會努力的！',
            victory: '太好了！',
            levelUp: '我變得更熟練了！'
        },
        
        favoriteGifts: ['文具', '甜點', '化妝品'],
        haremEligible: true
    },
    
    {
        id: 'r_005',
        name: '小妹B',
        nickname: '服務生',
        rarity: 'R',
        job: 'DOCTOR',
        avatar: '👩',
        gender: 'female',
        age: 23,
        personality: 'gentle',
        
        background: 'KTV服務生，看到你氣度不凡而主動攀談。你欣賞她的勇氣，讓她負責接待工作。',
        
        specialty: '客戶服務',
        position: '後線',
        baseStats: { STR: 42, DEF: 48, AGI: 58, INT: 55, WIS: 62 },
        activeSkill: 'SERVE_DRINK',
        passiveSkill: 'HOSPITALITY',
        
        dialogues: {
            greeting: '老大，要喝點什麼嗎？',
            battleStart: '請讓我幫忙！',
            victory: '太好了！',
            levelUp: '我的服務更周到了！'
        },
        
        favoriteGifts: ['飲料', '點心', '服飾'],
        haremEligible: true
    }
];

// 導出到全局
if (typeof window !== 'undefined') {
    window.CORE_PARTNERS = CORE_PARTNERS;
}

// 模組化導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CORE_PARTNERS };
}
