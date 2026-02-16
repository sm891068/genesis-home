// ========== 系統功能 ==========
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== 存檔系統 ==========
const SaveSystem = {
    saves: [],
    
    init() {
        const data = localStorage.getItem('underworld_saves');
        if (data) this.saves = JSON.parse(data);
        this.updateContinueBtn();
    },
    
    save(gameData, slot = null) {
        const saveData = {
            id: slot || Date.now(),
            name: gameData.gangName,
            route: gameData.routeName,
            day: gameData.day,
            money: gameData.money,
            reputation: gameData.reputation,
            timestamp: new Date().toLocaleString('zh-TW'),
            data: gameData
        };
        
        if (slot) {
            const idx = this.saves.findIndex(s => s.id === slot);
            if (idx >= 0) this.saves[idx] = saveData;
            else this.saves.push(saveData);
        } else {
            this.saves.push(saveData);
        }
        
        localStorage.setItem('underworld_saves', JSON.stringify(this.saves));
        this.updateContinueBtn();
        return saveData;
    },
    
    load(id) {
        const save = this.saves.find(s => s.id === id);
        return save ? save.data : null;
    },
    
    delete(id) {
        this.saves = this.saves.filter(s => s.id !== id);
        localStorage.setItem('underworld_saves', JSON.stringify(this.saves));
        this.updateContinueBtn();
    },
    
    updateContinueBtn() {
        const btn = document.getElementById('continue-btn');
        btn.disabled = this.saves.length === 0;
    }
};

SaveSystem.init();

// ========== 設定系統 ==========
const Settings = {
    data: {
        bgm: true,
        sfx: 70,
        textSpeed: 'normal',
        autoSave: true,
        notification: true,
        fontSize: 'medium',
        vibration: false
    },
    
    init() {
        const saved = localStorage.getItem('underworld_settings');
        if (saved) this.data = JSON.parse(saved);
    },
    
    save() {
        localStorage.setItem('underworld_settings', JSON.stringify(this.data));
    }
};

Settings.init();

// ========== 遊戲數據 ==========
const gameData = {
    route: null,
    routeName: '',
    gangName: '',
    money: 10000,
    day: 1,
    reputation: 50,
    grid: [],
    partners: [],
    currentSaveId: null,
    diary: []
};

// 12句父親的話
const fatherDialogues = [
    "兒子，這些年你學了不少。",
    "但當老大，不是只有打打殺殺。",
    "記住，這座城市是我們家的工地。",
    "每一條街道，每一棟建築，都是你的棋盤。",
    "你要學會用腦子，而不是只用拳頭。",
    "錢要會賺，但也要會洗。",
    "人手要夠，但更要忠心。",
    "敵人要防，但朋友更需警惕。",
    "有時候，退一步比進一步更難。",
    "父親的時代過去了，現在是你的舞台。",
    "不要讓我失望，也不要讓家族蒙羞。",
    "現在，輪到你來經營了。"
];

// 路線數據
const routeData = {
    'A': {
        name: '道義路線',
        money: 10000,
        rep: 65,
        partners: [
            {icon:'👔', type:'p-gang', category:'gangster', name:'阿龍', role:'黑道-武鬥', lv:1, heart:85, str:95, int:40},
            {icon:'👑', type:'p-queen', category:'queen', name:'白琴', role:'女王-管理', lv:1, heart:80, str:30, int:90},
            {icon:'🎩', type:'p-host', category:'host', name:'小開', role:'少爺-情報', lv:1, heart:75, str:35, int:85}
        ]
    },
    'B': {
        name: '資本路線',
        money: 18000,
        rep: 50,
        partners: [
            {icon:'👔', type:'p-gang', category:'gangster', name:'刀手坤', role:'黑道-執行', lv:1, heart:75, str:88, int:55},
            {icon:'👑', type:'p-queen', category:'queen', name:'算盤林', role:'女王-財務', lv:1, heart:70, str:20, int:98},
            {icon:'🎩', type:'p-host', category:'host', name:'公關陳', role:'少爺-談判', lv:1, heart:80, str:40, int:80}
        ]
    },
    'C': {
        name: '聲望路線',
        money: 10000,
        rep: 75,
        partners: [
            {icon:'👔', type:'p-gang', category:'gangster', name:'拳王輝', role:'黑道-統帥', lv:1, heart:90, str:92, int:60},
            {icon:'👑', type:'p-queen', category:'queen', name:'紅姐', role:'女王-統御', lv:1, heart:95, str:50, int:75},
            {icon:'🎩', type:'p-host', category:'host', name:'茶博士', role:'少爺-調解', lv:1, heart:85, str:35, int:90}
        ]
    },
    'D': {
        name: '魅力路線',
        money: 10000,
        rep: 60,
        partners: [
            {icon:'👔', type:'p-gang', category:'gangster', name:'雙槍李', role:'黑道-護衛', lv:1, heart:80, str:90, int:50},
            {icon:'👑', type:'p-queen', category:'queen', name:'琉璃', role:'女王-交際', lv:1, heart:85, str:40, int:80},
            {icon:'🎩', type:'p-host', category:'host', name:'王子杰', role:'少爺-公關', lv:1, heart:90, str:45, int:75}
        ]
    }
};

// 所有可收集夥伴
const allPartners = [
    ...routeData['A'].partners,
    ...routeData['B'].partners,
    ...routeData['C'].partners,
    ...routeData['D'].partners,
];

// 成就數據
const achievements = [
    {id:'newbie', name:'初出茅廬', icon:'👑', desc:'完成新手教學', category:'story', unlocked:true, reward:50},
    {id:'rich', name:'富可敵國', icon:'💰', desc:'累積資金達到100萬', category:'economy', unlocked:false, target:1000000, current:0},
    {id:'realEstate', name:'地產大亨', icon:'🏙️', desc:'擁有10個最高級建築', category:'building', unlocked:false, target:10, current:3},
    {id:'lover', name:'萬人迷', icon:'❤️', desc:'所有夥伴好感度達到100', category:'partner', unlocked:false},
    {id:'fighter', name:'戰無不勝', icon:'⚔️', desc:'贏得50場戰鬥', category:'combat', unlocked:false, target:50, current:0},
    {id:'collector', name:'收集狂', icon:'🎭', desc:'解鎖所有夥伴', category:'partner', unlocked:false},
];

// 排行榜數據
const leaderboards = {
    alltime: [
        {rank:1, name:'龍哥', money:9999999, day:365, rep:9999, date:'2025.12.31'},
        {rank:2, name:'白琴之師', money:5000000, day:280, rep:8500, date:'2025.11.15'},
        {rank:3, name:'地產大王', money:3500000, day:200, rep:7200, date:'2025.10.01'},
        {rank:4, name:'商業帝王', money:2800000, day:180, rep:6800, date:'2025.09.20'},
        {rank:5, name:'聲望巨人', money:1500000, day:150, rep:9500, date:'2025.08.15'},
    ],
    month: [
        {rank:1, name:'新興勢力', money:500000, day:25, rep:850, date:'2026.02.10'},
        {rank:2, name:'小成本玩家', money:380000, day:22, rep:720, date:'2026.02.08'},
        {rank:3, name:'聲望獵人', money:250000, day:20, rep:1200, date:'2026.02.05'},
    ],
    week: [
        {rank:1, name:'日活玩家', money:120000, day:6, rep:350, date:'2026.02.14'},
        {rank:2, name:'穩定建築', money:95000, day:5, rep:280, date:'2026.02.12'},
    ]
};

const buildingTypes = {
    'empty': {icon:'', name:'空地', cost:0, income:0, desc:'可建設新設施'},
    'station': {icon:'🚉', name:'車站', cost:3000, income:200, desc:'提升人員移動速度'},
    'shop': {icon:'🏪', name:'便利商店', cost:2000, income:400, desc:'穩定基礎收入'},
    'factory': {icon:'🏭', name:'工廠', cost:5000, income:600, desc:'較高收入，噪音大'},
    'hotel': {icon:'🏨', name:'酒店', cost:8000, income:1000, desc:'高級客戶來源'},
    'house': {icon:'🏠', name:'住宅', cost:1500, income:100, desc:'提升人口上限'},
    'hq': {icon:'🏰', name:'總部', cost:0, income:0, desc:'指揮中心，最後防線'},
    'casino': {icon:'🎰', name:'賭場', cost:10000, income:1500, desc:'高風險高收入'},
    'hospital': {icon:'🏥', name:'醫療站', cost:4000, income:0, desc:'治療受傷夥伴'},
    'ktv': {icon:'🎤', name:'KTV', cost:6000, income:800, desc:'情報收集點'},
};

// ========== 流程控制 ==========
function startGame() {
    document.getElementById('main-menu').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('main-menu').style.display = 'none';
        showLoading();
    }, 500);
}

function showLoading() {
    const screen = document.getElementById('loading-screen');
    screen.style.display = 'flex';
    
    const dialogueEl = document.getElementById('father-dialogue');
    const counterEl = document.getElementById('dialogue-counter');
    const fill = document.getElementById('progress-fill');
    const percentEl = document.getElementById('progress-percent');
    
    let currentIndex = 0;
    showDialogue(0);
    
    const interval = setInterval(() => {
        currentIndex++;
        const progress = (currentIndex / 12) * 100;
        fill.style.width = progress + '%';
        percentEl.textContent = Math.floor(progress) + '%';
        
        if (currentIndex < 12) {
            showDialogue(currentIndex);
        } else {
            clearInterval(interval);
            setTimeout(() => {
                screen.style.display = 'none';
                document.getElementById('route-select').style.display = 'flex';
            }, 500);
        }
    }, 1000);
    
    function showDialogue(index) {
        dialogueEl.classList.remove('show');
        setTimeout(() => {
            dialogueEl.textContent = fatherDialogues[index];
            dialogueEl.classList.add('show');
            counterEl.textContent = (index + 1) + ' / 12';
        }, 200);
    }
}

function selectRoute(route) {
    gameData.route = route;
    const data = routeData[route];
    gameData.routeName = data.name;
    
    document.getElementById('route-name').textContent = `你選擇了：${data.name}`;
    
    const box = document.getElementById('partner-box');
    box.innerHTML = '<h4>父親留給你的班底（3人）</h4>' + 
        data.partners.map(p => `
            <div class="partner-item">
                <div class="partner-icon ${p.type}">${p.icon}</div>
                <div>
                    <div>${p.name}</div>
                    <div style="font-size:10px;color:var(--gray);">${p.role}</div>
                </div>
            </div>
        `).join('');
    
    gameData.partners = JSON.parse(JSON.stringify(data.partners));
    gameData.money = data.money;
    gameData.reputation = data.rep;
    
    document.getElementById('route-select').style.display = 'none';
    document.getElementById('naming-screen').style.display = 'flex';
}

function randomName() {
    const names = ['九龍興業','東方集團','和勝聯','新義安','14K建設','和記地產','洪興地產','東英社'];
    document.getElementById('gang-name').value = names[Math.floor(Math.random() * names.length)];
    checkName();
}

document.getElementById('gang-name').addEventListener('input', checkName);

function checkName() {
    const val = document.getElementById('gang-name').value.trim();
    const btn = document.getElementById('start-btn');
    if (val.length >= 2) {
        btn.classList.add('active');
        btn.disabled = false;
    } else {
        btn.classList.remove('active');
        btn.disabled = true;
    }
}

function enterGame() {
    gameData.gangName = document.getElementById('gang-name').value.trim();
    gameData.currentSaveId = Date.now();
    
    initMap();
    updateResource();
    
    SaveSystem.save(gameData, gameData.currentSaveId);
    
    document.getElementById('naming-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    
    showToast('歡迎老大！');
}

function initMap() {
    const layout = [
        'station','shop','factory','hotel','house','garage',
        'house','house','house','hq','house','house',
        'hospital','ktv','empty','empty','house','empty',
        'empty','empty','empty','empty','empty','empty',
        'empty','empty','empty','empty','empty','empty',
        'empty','empty','empty','empty','empty','empty'
    ];
    
    gameData.grid = layout.map((type, i) => ({
        id: i,
        type: type === 'garage' ? 'empty' : type,
        lv: type === 'hq' ? 1 : (type === 'empty' || type === 'garage' ? 0 : 1)
    }));
    
    renderMap();
}

function renderMap() {
    const grid = document.getElementById('map-grid');
    grid.innerHTML = gameData.grid.map((cell, i) => {
        const b = buildingTypes[cell.type];
        const isHq = cell.type === 'hq';
        return `
            <div class="grid-cell ${isHq ? 'hq' : ''}" onclick="clickCell(${i})">
                ${b.icon}
                ${cell.lv > 0 ? `<div class="lv">Lv.${cell.lv}</div>` : ''}
            </div>
        `;
    }).join('');
}

let selectedCell = null;

function clickCell(index) {
    selectedCell = index;
    const cell = gameData.grid[index];
    const b = buildingTypes[cell.type];
    
    if (cell.type === 'empty') {
        showBuildMenu(index);
    } else {
        showUpgradeMenu(index);
    }
}

function showUpgradeMenu(index) {
    const cell = gameData.grid[index];
    const b = buildingTypes[cell.type];
    const upgradeCost = 500 + (cell.lv - 1) * 200;
    
    document.getElementById('modal-title').textContent = `${b.icon} ${b.name}`;
    document.getElementById('modal-info').innerHTML = `
        <div>當前等級：Lv.${cell.lv}</div>
        <div>當前收益：+$${b.income * cell.lv}/天</div>
        <div>升級後：Lv.${cell.lv + 1} (+$${b.income}/天)</div>
        <div>升級費用：$${upgradeCost}</div>
    `;
    
    document.getElementById('build-options').style.display = 'none';
    const btn = document.getElementById('upgrade-btn');
    btn.textContent = '升級';
    btn.style.display = 'block';
    btn.disabled = gameData.money < upgradeCost;
    btn.onclick = () => {
        const cost = upgradeCost;
        if (gameData.money >= cost) {
            gameData.money -= cost;
            cell.lv++;
            updateResource();
            renderMap();
            closeModal();
            showToast(`升級完成！${buildingTypes[cell.type].name} Lv.${cell.lv}`);
        }
    };
    
    document.getElementById('build-modal').style.display = 'flex';
}

function showBuildMenu(index) {
    const options = document.getElementById('build-options');
    const builds = ['shop','house','factory','station','hospital','ktv'];
    
    options.innerHTML = builds.map(type => {
        const b = buildingTypes[type];
        const canAfford = gameData.money >= b.cost;
        return `
            <div class="build-option ${canAfford ? '' : 'disabled'}" onclick="build('${type}')">
                <div class="icon">${b.icon}</div>
                <div class="name">${b.name}</div>
                <div class="cost">$${b.cost}</div>
            </div>
        `;
    }).join('');
    
    options.style.display = 'grid';
    document.getElementById('modal-title').textContent = '🏗️ 建設新設施';
    document.getElementById('modal-info').innerHTML = '選擇要建設的設施';
    document.getElementById('upgrade-btn').style.display = 'none';
    
    document.getElementById('build-modal').style.display = 'flex';
}

function build(type) {
    const cost = buildingTypes[type].cost;
    if (gameData.money >= cost) {
        gameData.money -= cost;
        gameData.grid[selectedCell].type = type;
        gameData.grid[selectedCell].lv = 1;
        updateResource();
        renderMap();
        closeModal();
        showToast(`建設完成！${buildingTypes[type].name}`);
    }
}

function closeModal(e) {
    if (!e || e.target.id === 'build-modal') {
        document.getElementById('build-modal').style.display = 'none';
    }
}

function updateResource() {
    document.getElementById('res-money').textContent = '$' + gameData.money.toLocaleString();
    document.getElementById('res-crew').textContent = gameData.partners.length;
    document.getElementById('res-rep').textContent = gameData.reputation;
    document.getElementById('game-day').textContent = gameData.day;
}

function nextTurn() {
    gameData.day++;
    let income = 0;
    gameData.grid.forEach(cell => {
        if (cell.lv > 0 && buildingTypes[cell.type].income > 0) {
            income += buildingTypes[cell.type].income * cell.lv;
        }
    });
    gameData.money += income;
    updateResource();
    showToast(`第${gameData.day}天，收入+$${income}`);
}

function quickSave() {
    if (gameData.currentSaveId) {
        SaveSystem.save(gameData, gameData.currentSaveId);
        const hint = document.getElementById('quick-save-hint');
        hint.classList.add('show');
        setTimeout(() => hint.classList.remove('show'), 2000);
    }
}

// ========== 面板控制 ==========
function showAchievements() {
    document.getElementById('achievement-panel').style.display = 'flex';
    renderAchievements('all');
}

function hideAchievements() {
    document.getElementById('achievement-panel').style.display = 'none';
}

function renderAchievements(category) {
    const grid = document.getElementById('achievement-grid');
    const filtered = category === 'all' ? achievements : achievements.filter(a => a.category === category);
    
    grid.innerHTML = filtered.map(a => {
        if (a.unlocked) {
            return `
                <div class="achievement-card unlocked">
                    <div class="achievement-icon">${a.icon}</div>
                    <div class="achievement-name">${a.name}</div>
                    <div class="achievement-desc">${a.desc}</div>
                    <div class="achievement-reward">+${a.reward} 聲望</div>
                </div>
            `;
        } else if (a.current !== undefined) {
            const progress = Math.round((a.current / a.target) * 100);
            return `
                <div class="achievement-card progress">
                    <div class="achievement-icon">${a.icon}</div>
                    <div class="achievement-name">${a.name}</div>
                    <div class="achievement-desc">${a.desc}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width:${progress}%"></div>
                    </div>
                    <div class="progress-text">${a.current} / ${a.target}</div>
                </div>
            `;
        } else {
            return `
                <div class="achievement-card locked">
                    <div class="achievement-icon">${a.icon}</div>
                    <div class="achievement-name">???</div>
                    <div class="achievement-desc">隱藏成就</div>
                </div>
            `;
        }
    }).join('');
}

function filterAchievements(category) {
    document.querySelectorAll('.achievement-tab').forEach(t => t.classList.remove('active'));
    event.target.closest('.achievement-tab').classList.add('active');
    renderAchievements(category);
}

function showGlory() {
    document.getElementById('hall-of-glory').style.display = 'flex';
    renderLeaderboard('alltime');
}

function hideGlory() {
    document.getElementById('hall-of-glory').style.display = 'none';
}

function renderLeaderboard(type) {
    const list = document.getElementById('leaderboard-list');
    const data = leaderboards[type];
    
    list.innerHTML = data.map(item => {
        const rankClass = `rank-${item.rank}`;
        const medal = ['🥇', '🥈', '🥉'][item.rank - 1] || `#${item.rank}`;
        
        return `
            <div class="rank-item ${rankClass}">
                <div class="rank-badge ${item.rank <= 3 ? 'top'+item.rank : ''}">${medal}</div>
                <div class="rank-info">
                    <div class="rank-name">${item.name}</div>
                    <div class="rank-meta">累計 ${item.day} 天 | ${item.date}</div>
                </div>
                <div class="rank-stats">
                    <div class="rank-stat">
                        <div class="label">資金</div>
                        <div class="value">$${(item.money/1000000).toFixed(1)}M</div>
                    </div>
                    <div class="rank-stat">
                        <div class="label">聲望</div>
                        <div class="value">${item.rep}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function switchLeaderboardTab(type) {
    document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderLeaderboard(type);
}

function showPartnerGallery() {
    document.getElementById('partner-gallery').style.display = 'flex';
    renderGallery('all');
}

function hidePartnerGallery() {
    document.getElementById('partner-gallery').style.display = 'none';
}

function switchGalleryTab(tab) {
    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderGallery(tab);
}

function renderGallery(category) {
    const grid = document.getElementById('gallery-grid');
    const partners = category === 'all' ? allPartners : allPartners.filter(p => p.category === category);
    const unlockedNames = gameData.partners.map(p => p.name);
    
    grid.innerHTML = partners.map(p => {
        const isUnlocked = unlockedNames.includes(p.name);
        return `
            <div class="gallery-item ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="gallery-avatar">${p.icon}</div>
                <div class="gallery-name">${isUnlocked ? p.name : '???'}</div>
            </div>
        `;
    }).join('');
}

function showDiary() {
    document.getElementById('diary-panel').style.display = 'flex';
}

function hideDiary() {
    document.getElementById('diary-panel').style.display = 'none';
}

function showSettings() {
    document.getElementById('settings-panel').style.display = 'flex';
}

function hideSettings() {
    document.getElementById('settings-panel').style.display = 'none';
    Settings.save();
}

function showSavePanel() {
    const panel = document.getElementById('save-panel');
    const list = document.getElementById('save-list');
    
    if (SaveSystem.saves.length === 0) {
        list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray);">尚無存檔記錄</div>';
    } else {
        list.innerHTML = SaveSystem.saves.map(save => `
            <div class="save-item ${save.id === gameData.currentSaveId ? 'active' : ''}">
                <div class="save-icon">💾</div>
                <div class="save-info">
                    <div class="save-name">${save.name}</div>
                    <div class="save-meta">${save.route}｜第${save.day}天｜${save.timestamp}</div>
                </div>
                <div class="save-actions">
                    <button class="save-btn" onclick="loadSave(${save.id})">讀取</button>
                    <button class="save-btn" onclick="deleteSave(${save.id})">刪除</button>
                </div>
            </div>
        `).join('');
    }
    
    panel.style.display = 'flex';
}

function hideSavePanel() {
    document.getElementById('save-panel').style.display = 'none';
}

function loadSave(id) {
    const data = SaveSystem.load(id);
    if (data) {
        Object.assign(gameData, data);
        gameData.currentSaveId = id;
        renderMap();
        updateResource();
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('save-panel').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
        showToast('已讀取存檔');
    }
}

function deleteSave(id) {
    if (confirm('確定要刪除此存檔嗎？')) {
        SaveSystem.delete(id);
        showSavePanel();
    }
}

function clearAllData() {
    if (confirm('確定要清除所有存檔和設定嗎？此操作無法復原。')) {
        localStorage.clear();
        SaveSystem.saves = [];
        SaveSystem.updateContinueBtn();
        showToast('所有資料已清除');
        setTimeout(() => location.reload(), 1500);
    }
}

function resetSettings() {
    Settings.data = {bgm:true, sfx:70, textSpeed:'normal', autoSave:true, notification:true, fontSize:'medium', vibration:false};
    Settings.save();
    showToast('設定已重置');
}

// 虛擬函數（遊戲畫面）
function showBase() { showToast('基地功能開發中...'); }
function showHarem() { showToast('後宮功能開發中...'); }
function showPartners() { showToast('夥伴功能開發中...'); }
function showFormation() { showToast('編制功能開發中...'); }
function showWorld() { showToast('世界功能開發中...'); }
function toggleChat() { showToast('聊天功能開發中...'); }

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    SaveSystem.updateContinueBtn();
});

// 防止雙擊縮放
let lastTouch = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouch < 300) e.preventDefault();
    lastTouch = now;
});
