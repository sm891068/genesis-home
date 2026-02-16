import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// 提供靜態文件
app.use('/static/*', serveStatic({ root: './public' }))

// 主頁面路由
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>黑道建築 Underworld Architect</title>
    <link rel="stylesheet" href="/static/styles.css">
</head>
<body>
    <!-- Toast 提示 -->
    <div id="toast" class="toast"></div>

    <!-- 主選單 -->
    <div id="main-menu">
        <div class="bg-effects">
            <div class="rain"></div>
            <div class="rain"></div>
            <div class="rain"></div>
            <div class="lightning"></div>
            <div class="vignette"></div>
            <div class="city-silhouette"></div>
        </div>
        
        <div class="logo-container">
            <div class="logo-decoration"></div>
            <div class="logo">
                <h1>黑道建築</h1>
                <div class="logo-sub">UNDERWORLD ARCHITECT</div>
            </div>
        </div>
    
        <div class="menu-container">
            <button class="menu-btn" onclick="startGame()">
                <span class="icon">▶</span>
                <div class="content">
                    <div>新的傳承</div>
                    <small>New Legacy</small>
                </div>
            </button>
            
            <div class="menu-divider"></div>
            
            <button class="menu-btn" id="continue-btn" onclick="showSavePanel()" disabled>
                <span class="icon">💾</span>
                <div class="content">
                    <div>繼續遊戲</div>
                    <small>Continue</small>
                </div>
            </button>
            
            <div class="menu-divider"></div>
            
            <button class="menu-btn secondary" onclick="showAchievements()">
                <span class="icon">🏅</span>
                <div class="content">
                    <div>成就殿堂</div>
                    <small>Achievement Hall</small>
                </div>
            </button>
            
            <button class="menu-btn secondary" onclick="showGlory()">
                <span class="icon">🏆</span>
                <div class="content">
                    <div>榮耀殿堂</div>
                    <small>Hall of Glory</small>
                </div>
            </button>
            
            <button class="menu-btn secondary" onclick="showPartnerGallery()">
                <span class="icon">🎭</span>
                <div class="content">
                    <div>圖鑑夥伴</div>
                    <small>Partner Gallery</small>
                </div>
            </button>
            
            <button class="menu-btn secondary" onclick="showDiary()">
                <span class="icon">📜</span>
                <div class="content">
                    <div>黑道日誌</div>
                    <small>Diary</small>
                </div>
            </button>
            
            <div class="menu-divider"></div>
            
            <button class="menu-btn" onclick="showSettings()">
                <span class="icon">⚙️</span>
                <div class="content">
                    <div>辦公室設定</div>
                    <small>Settings</small>
                </div>
            </button>
        </div>
        
        <div class="version-info">v1.0.0</div>
    </div>

    <!-- 成就殿堂 -->
    <div id="achievement-panel">
        <div class="achievement-header">
            <button class="back-btn" onclick="hideAchievements()">←</button>
            <h3>🏅 成就殿堂</h3>
            <div style="width: 52px;"></div>
        </div>
        
        <div class="achievement-tabs">
            <div class="achievement-tab active" onclick="filterAchievements('all')">
                全部 <span class="tab-count">6/18</span>
            </div>
            <div class="achievement-tab" onclick="filterAchievements('story')">
                故事 <span class="tab-count">2/5</span>
            </div>
            <div class="achievement-tab" onclick="filterAchievements('economy')">
                經濟 <span class="tab-count">1/4</span>
            </div>
            <div class="achievement-tab" onclick="filterAchievements('building')">
                建築 <span class="tab-count">2/4</span>
            </div>
            <div class="achievement-tab" onclick="filterAchievements('partner')">
                夥伴 <span class="tab-count">1/5</span>
            </div>
        </div>
        
        <div class="achievement-content">
            <div class="achievement-grid" id="achievement-grid">
                <!-- 成就卡片將由 JavaScript 生成 -->
            </div>
        </div>
    </div>

    <!-- 榮耀殿堂 -->
    <div id="hall-of-glory">
        <div class="achievement-header">
            <button class="back-btn" onclick="hideGlory()">←</button>
            <h3>🏆 榮耀殿堂</h3>
            <div style="width: 52px;"></div>
        </div>
        
        <div class="glory-content">
            <div class="glory-title">
                <h2>傳說霸主排行</h2>
                <p>歷代老大的豐功偉業</p>
            </div>
            
            <div class="leaderboard-tabs">
                <div class="leaderboard-tab active" onclick="switchLeaderboardTab('alltime')">全時代</div>
                <div class="leaderboard-tab" onclick="switchLeaderboardTab('month')">本月</div>
                <div class="leaderboard-tab" onclick="switchLeaderboardTab('week')">本週</div>
            </div>
            
            <div class="leaderboard-list" id="leaderboard-list">
                <!-- 排行榜將由 JavaScript 生成 -->
            </div>
        </div>
    </div>

    <!-- 圖鑑夥伴 -->
    <div id="partner-gallery">
        <div class="achievement-header">
            <button class="back-btn" onclick="hidePartnerGallery()">←</button>
            <h3>🎭 圖鑑夥伴</h3>
            <div style="width: 52px;"></div>
        </div>
        
        <div class="gallery-tabs">
            <button class="gallery-tab active" onclick="switchGalleryTab('all')">全部</button>
            <button class="gallery-tab" onclick="switchGalleryTab('gangster')">👔黑道</button>
            <button class="gallery-tab" onclick="switchGalleryTab('queen')">👑女王</button>
            <button class="gallery-tab" onclick="switchGalleryTab('host')">🎩少爺</button>
        </div>
        
        <div class="gallery-content">
            <div class="gallery-grid" id="gallery-grid">
                <!-- 圖鑑將由 JavaScript 生成 -->
            </div>
        </div>
    </div>

    <!-- 黑道日誌 -->
    <div id="diary-panel">
        <div class="achievement-header">
            <button class="back-btn" onclick="hideDiary()">←</button>
            <h3>📜 黑道日誌</h3>
            <div style="width: 52px;"></div>
        </div>
        
        <div class="diary-content">
            <div class="diary-title">
                <h2>江湖見聞錄</h2>
                <p>記錄你在黑暗世界中的點點滴滴</p>
            </div>
            
            <div class="diary-list">
                <div class="diary-entry">
                    <div class="diary-date">第 1 天</div>
                    <div class="diary-text">父親將位置傳給了我，從今天開始，我就是家族的老大。這座城市將成為我的工地。</div>
                </div>
                <div class="diary-entry locked">
                    <div class="diary-date">？？？</div>
                    <div class="diary-text">[尚未解鎖]</div>
                </div>
                <div class="diary-entry locked">
                    <div class="diary-date">？？？</div>
                    <div class="diary-text">[尚未解鎖]</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 設定面板 -->
    <div id="settings-panel">
        <div class="panel-header">
            <button class="back-btn" onclick="hideSettings()">←</button>
            <h3>⚙️ 辦公室設定</h3>
            <div style="width: 52px;"></div>
        </div>
        
        <div class="settings-content">
            <div class="setting-item">
                <h4>🔊 音效設定</h4>
                <div class="setting-row">
                    <span>背景音樂</span>
                    <div class="toggle active" onclick="this.classList.toggle('active')"></div>
                </div>
                <div class="setting-row">
                    <span>音效音量: 70%</span>
                </div>
            </div>
            
            <div class="setting-item">
                <h4>🎮 遊戲設定</h4>
                <div class="setting-row">
                    <span>文字速度: 正常</span>
                </div>
                <div class="setting-row">
                    <span>自動存檔</span>
                    <div class="toggle active" onclick="this.classList.toggle('active')"></div>
                </div>
                <div class="setting-row">
                    <span>通知提醒</span>
                    <div class="toggle active" onclick="this.classList.toggle('active')"></div>
                </div>
            </div>
            
            <div class="setting-item">
                <h4>📱 介面設定</h4>
                <div class="setting-row">
                    <span>震動反饋</span>
                    <div class="toggle" onclick="this.classList.toggle('active')"></div>
                </div>
            </div>
            
            <div class="danger-zone">
                <button class="danger-btn" onclick="clearAllData()">🗑️ 清除所有存檔</button>
                <button class="danger-btn" onclick="resetSettings()">↩️ 重置設定</button>
            </div>
        </div>
    </div>

    <!-- 存檔面板 -->
    <div id="save-panel">
        <div class="panel-header">
            <button class="back-btn" onclick="hideSavePanel()">←</button>
            <h3>💾 繼承記錄</h3>
            <div style="width: 52px;"></div>
        </div>
        
        <div class="save-list" id="save-list">
            <!-- 存檔列表由 JavaScript 生成 -->
        </div>
        
        <button class="new-save-btn" onclick="startGame()">+ 開始新的傳承</button>
    </div>

    <!-- 載入畫面 -->
    <div id="loading-screen">
        <div class="loading-container">
            <div class="father-silhouette"></div>
            
            <div class="dialogue-box">
                <div class="dialogue-text" id="father-dialogue">兒子，這些年你學了不少。</div>
                <div class="dialogue-counter" id="dialogue-counter">1 / 12</div>
            </div>
            
            <div class="progress-box">
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <div class="progress-info">
                    <span>傳承載入中...</span>
                    <span id="progress-percent">0%</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 路線選擇 -->
    <div id="route-select">
        <div>
            <h2 class="route-title">父親留給你的教誨</h2>
            <p class="route-sub">選擇道路，影響起始夥伴與經營風格</p>
        </div>
        
        <div class="route-grid">
            <div class="route-card" onclick="selectRoute('A')">
                <div class="route-letter">A</div>
                <div class="route-quote">「別碰毒品，那是底線。」</div>
                <div class="route-type">道義路線</div>
                <div class="route-bonus">👔阿龍 👑白琴 🎩小開</div>
                <div class="route-desc">聲望+15｜正義夥伴易招募｜每週民望+5</div>
            </div>
            
            <div class="route-card" onclick="selectRoute('B')">
                <div class="route-letter">B</div>
                <div class="route-quote">「錢能解決的，都不是問題。」</div>
                <div class="route-type">資本路線</div>
                <div class="route-bonus">👔刀手坤 👑算盤林 🎩公關陳</div>
                <div class="route-desc">資金+$8,000｜收益+15%｜賄賂成本-25%</div>
            </div>
            
            <div class="route-card" onclick="selectRoute('C')">
                <div class="route-letter">C</div>
                <div class="route-quote">「這城市，尊重比恐懼更重要。」</div>
                <div class="route-type">聲望路線</div>
                <div class="route-bonus">👔拳王輝 👑紅姐 🎩茶博士</div>
                <div class="route-desc">忠誠+20%｜談判+25%｜每週自動+8聲望</div>
            </div>
            
            <div class="route-card" onclick="selectRoute('D')">
                <div class="route-letter">D</div>
                <div class="route-quote">「有美人，記得帶回家給你媽看看。」</div>
                <div class="route-type">魅力路線</div>
                <div class="route-bonus">👔雙槍李 👑琉璃 🎩王子杰</div>
                <div class="route-desc">異性談判+35%｜KTV收益+50%｜專屬後宮</div>
            </div>
        </div>
    </div>

    <!-- 命名畫面 -->
    <div id="naming-screen">
        <div class="naming-box">
            <h2>
                父親已經退休，把位置傳給了你。
                現在，你就是家族的老大。
                <span class="highlight" id="route-name">你選擇了：道義路線</span>
            </h2>
            
            <div class="partner-box" id="partner-box">
                <h4>父親留給你的班底</h4>
                <!-- 由 JavaScript 生成 -->
            </div>
            
            <input type="text" id="gang-name" class="name-input" placeholder="輸入你的組織名稱" maxlength="12">
            <br>
            <button class="random-btn" onclick="randomName()">🎲 隨機命名</button>
            <br>
            <button class="start-btn" id="start-btn" onclick="enterGame()" disabled>開始建設</button>
        </div>
    </div>

    <!-- 遊戲主畫面 -->
    <div id="game-screen">
        <div class="game-header">
            <div class="res-box">
                <div class="res-item">
                    <span class="label">資金</span>
                    <span class="value" id="res-money">$10,000</span>
                </div>
                <div class="res-item">
                    <span class="label">人手</span>
                    <span class="value" id="res-crew">3</span>
                </div>
                <div class="res-item">
                    <span class="label">聲望</span>
                    <span class="value" id="res-rep">50</span>
                </div>
            </div>
            <div class="day-box">第 <span id="game-day">1</span> 天</div>
            <div class="header-btns">
                <button class="header-btn" onclick="quickSave()" title="快速存檔">💾</button>
            </div>
        </div>
        
        <div class="map-container">
            <div class="map-grid" id="map-grid">
                <!-- 地圖格子由 JavaScript 生成 -->
            </div>
        </div>
        
        <div class="side-actions">
            <button class="side-btn" onclick="toggleChat()">
                💬
                <span class="badge">1</span>
            </button>
            <button class="side-btn" onclick="nextTurn()">
                ⏭️
            </button>
        </div>
        
        <div class="game-footer">
            <button class="foot-btn active" onclick="showBase()">
                <span class="icon">🏰</span>
                基地
            </button>
            <button class="foot-btn" onclick="showHarem()">
                <span class="icon">💃</span>
                後宮
            </button>
            <button class="foot-btn" onclick="showPartners()">
                <span class="icon">👥</span>
                夥伴
            </button>
            <button class="foot-btn" onclick="showFormation()">
                <span class="icon">⚔️</span>
                編制
            </button>
            <button class="foot-btn" onclick="showWorld()">
                <span class="icon">🌍</span>
                世界
            </button>
            <button class="foot-btn" onclick="showSavePanel()">
                <span class="icon">📁</span>
                存檔
            </button>
            <button class="foot-btn" onclick="showSettings()">
                <span class="icon">⚙️</span>
                設定
            </button>
        </div>
    </div>

    <div class="quick-save-hint" id="quick-save-hint">✓ 已快速存檔</div>

    <!-- 建設/升級彈窗 -->
    <div class="modal-overlay" id="build-modal" onclick="closeModal(event)">
        <div class="modal-box">
            <h3 class="modal-title" id="modal-title">🏪 便利商店</h3>
            <div class="modal-info" id="modal-info"></div>
            <div class="build-options" id="build-options"></div>
            <div class="modal-actions">
                <button class="modal-btn" onclick="closeModal()">關閉</button>
                <button class="modal-btn primary" id="upgrade-btn" style="display:none;">升級</button>
            </div>
        </div>
    </div>

    <!-- 夥伴面板 -->
    <div class="modal-overlay" id="partners-panel" onclick="closePartnersPanel(event)" style="display:none;">
        <div class="modal-box large">
            <div class="panel-header">
                <button class="back-btn" onclick="closePartnersPanel()">←</button>
                <h3>👥 我的夥伴</h3>
                <div style="width: 52px;"></div>
            </div>
            <div class="partners-grid" id="partners-grid">
                <!-- 夥伴卡片由 JavaScript 生成 -->
            </div>
        </div>
    </div>

    <!-- 夥伴詳細面板 -->
    <div class="modal-overlay" id="partner-detail-panel" onclick="closePartnerDetail(event)" style="display:none;">
        <div class="modal-box large">
            <div class="panel-header">
                <button class="back-btn" onclick="closePartnerDetail()">←</button>
                <h3 id="partner-detail-name">夥伴詳情</h3>
                <div style="width: 52px;"></div>
            </div>
            <div id="partner-detail-content">
                <!-- 詳細內容由 JavaScript 生成 -->
            </div>
        </div>
    </div>

    <!-- 後宮面板 -->
    <div class="modal-overlay" id="harem-panel" onclick="closeHaremPanel(event)" style="display:none;">
        <div class="modal-box large">
            <div class="panel-header">
                <button class="back-btn" onclick="closeHaremPanel()">←</button>
                <h3>💃 私人後宮</h3>
                <div style="width: 52px;"></div>
            </div>
            <div class="harem-hint">只有 SR 以上稀有度的女性夥伴才能進入後宮</div>
            <div class="harem-grid" id="harem-grid">
                <!-- 後宮成員由 JavaScript 生成 -->
            </div>
        </div>
    </div>

    <script src="/static/partner-data.js"></script>
    <script src="/static/game.js"></script>
</body>
</html>`)
})

export default app
