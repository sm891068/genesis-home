// ========================================
// 共享 UI 工具模組
// 主選單 & 遊戲畫面通用的 UI 函數
// ========================================

/**
 * Toast 提示系統
 */
const Toast = {
    /**
     * 顯示提示訊息
     * @param {string} message - 訊息內容
     * @param {number} duration - 持續時間（毫秒）
     * @param {string} type - 類型 (success/error/warning/info)
     */
    show(message, duration = 2500, type = 'info') {
        let toast = document.getElementById('toast');
        
        // 如果不存在，創建 Toast 元素
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        // 自動隱藏
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },

    success(message, duration = 2500) {
        this.show(message, duration, 'success');
    },

    error(message, duration = 3000) {
        this.show(message, duration, 'error');
    },

    warning(message, duration = 2500) {
        this.show(message, duration, 'warning');
    }
};

/**
 * 確認對話框
 * @param {string} message - 訊息內容
 * @param {Function} onConfirm - 確認回調
 * @param {Function} onCancel - 取消回調
 */
function showConfirm(message, onConfirm, onCancel = null) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;

    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.style.cssText = `
        background: var(--panel, #1a1f3a);
        border: 2px solid var(--gold, #d4af37);
        border-radius: 16px;
        padding: 32px 24px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    `;

    dialog.innerHTML = `
        <div style="font-size: 16px; color: var(--text, #e8e8e8); margin-bottom: 24px; line-height: 1.6;">
            ${message}
        </div>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="btn-confirm" style="
                flex: 1;
                padding: 12px 24px;
                background: var(--gold, #d4af37);
                color: #000;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s;
            ">確定</button>
            <button class="btn-cancel" style="
                flex: 1;
                padding: 12px 24px;
                background: transparent;
                color: var(--gray, #888);
                border: 1px solid var(--gray, #888);
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            ">取消</button>
        </div>
    `;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // 按鈕樣式
    const btnConfirm = dialog.querySelector('.btn-confirm');
    const btnCancel = dialog.querySelector('.btn-cancel');

    btnConfirm.addEventListener('mouseenter', () => {
        btnConfirm.style.transform = 'scale(1.05)';
        btnConfirm.style.boxShadow = '0 0 20px rgba(212,175,55,0.5)';
    });
    btnConfirm.addEventListener('mouseleave', () => {
        btnConfirm.style.transform = 'scale(1)';
        btnConfirm.style.boxShadow = 'none';
    });

    btnCancel.addEventListener('mouseenter', () => {
        btnCancel.style.borderColor = 'var(--text, #e8e8e8)';
        btnCancel.style.color = 'var(--text, #e8e8e8)';
    });
    btnCancel.addEventListener('mouseleave', () => {
        btnCancel.style.borderColor = 'var(--gray, #888)';
        btnCancel.style.color = 'var(--gray, #888)';
    });

    // 事件處理
    btnConfirm.addEventListener('click', () => {
        document.body.removeChild(overlay);
        if (onConfirm) onConfirm();
    });

    btnCancel.addEventListener('click', () => {
        document.body.removeChild(overlay);
        if (onCancel) onCancel();
    });

    // 點擊遮罩關閉
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            if (onCancel) onCancel();
        }
    });
}

/**
 * 載入動畫顯示/隱藏
 */
const LoadingScreen = {
    show(message = '載入中...') {
        let loading = document.getElementById('loading-screen');
        
        if (!loading) {
            loading = document.createElement('div');
            loading.id = 'loading-screen';
            loading.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(10, 14, 39, 0.98);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            `;

            loading.innerHTML = `
                <div class="spinner" style="
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(212,175,55,0.2);
                    border-top-color: var(--gold, #d4af37);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <div id="loading-text" style="
                    margin-top: 20px;
                    font-size: 16px;
                    color: var(--gold, #d4af37);
                    text-align: center;
                ">${message}</div>
                <style>
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            `;

            document.body.appendChild(loading);
        } else {
            loading.style.display = 'flex';
            document.getElementById('loading-text').textContent = message;
        }
    },

    hide() {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            loading.style.display = 'none';
        }
    },

    updateText(message) {
        const text = document.getElementById('loading-text');
        if (text) {
            text.textContent = message;
        }
    }
};

/**
 * 格式化數字（加千分位）
 * @param {number} num - 數字
 * @returns {string}
 */
function formatNumber(num) {
    return num.toLocaleString('zh-TW');
}

/**
 * 格式化金額
 * @param {number} amount - 金額
 * @returns {string}
 */
function formatMoney(amount) {
    if (amount >= 1000000000) {
        return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(1)}K`;
    } else {
        return `$${amount}`;
    }
}

/**
 * 格式化日期
 * @param {Date|string} date - 日期
 * @returns {string}
 */
function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * 防抖函數
 * @param {Function} func - 要執行的函數
 * @param {number} delay - 延遲時間（毫秒）
 */
function debounce(func, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 節流函數
 * @param {Function} func - 要執行的函數
 * @param {number} limit - 限制時間（毫秒）
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 掛載到全局
if (typeof window !== 'undefined') {
    window.Toast = Toast;
    window.showConfirm = showConfirm;
    window.LoadingScreen = LoadingScreen;
    window.formatNumber = formatNumber;
    window.formatMoney = formatMoney;
    window.formatDate = formatDate;
    window.debounce = debounce;
    window.throttle = throttle;
}

// 導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Toast,
        showConfirm,
        LoadingScreen,
        formatNumber,
        formatMoney,
        formatDate,
        debounce,
        throttle
    };
}
