// =============================================
// DASHBOARD.JS - Interactive Dashboard Logic
// =============================================

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initCharts();
    initMetrics();
    initLiveUpdates();
});

// =============================================
// SECTION A: DIGITAL CLOCK
// =============================================

function initClock() {
    const clockElement = document.getElementById('clock');
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// =============================================
// SECTION B: FINANCIAL CHARTS (Canvas)
// =============================================

function initCharts() {
    drawRevenueChart();
    drawProfitChart();
}

function drawRevenueChart() {
    const canvas = document.getElementById('revenue-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Simulate revenue data for the day (24 hours)
    const data = generateChartData(24, 1500, 3500);
    drawLineChart(ctx, data, '#00bfff', 'Revenue');
}

function drawProfitChart() {
    const canvas = document.getElementById('profit-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Simulate profit data for the day (24 hours)
    const data = generateChartData(24, 600, 1200);
    drawLineChart(ctx, data, '#00dd00', 'Profit');
}

function generateChartData(points, min, max) {
    const data = [];
    for (let i = 0; i < points; i++) {
        data.push(Math.random() * (max - min) + min);
    }
    return data;
}

function drawLineChart(ctx, data, color, label) {
    const padding = 20;
    const width = ctx.canvas.width - 2 * padding;
    const height = ctx.canvas.height - 2 * padding;
    
    // Find min and max for scaling
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    // Draw background grid (subtle)
    ctx.strokeStyle = 'rgba(0, 191, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width + padding, y);
        ctx.stroke();
    }
    
    // Draw line chart
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
        const x = padding + (width / (data.length - 1)) * i;
        const y = padding + height - ((data[i] - min) / range) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Draw glowing area under the curve
    ctx.strokeStyle = 'transparent';
    ctx.lineTo(width + padding, padding + height);
    ctx.lineTo(padding, padding + height);
    ctx.closePath();
    
    // Create gradient for area fill
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + height);
    gradient.addColorStop(0, `${color}30`);
    gradient.addColorStop(1, `${color}05`);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw data points
    ctx.fillStyle = color;
    for (let i = 0; i < data.length; i++) {
        const x = padding + (width / (data.length - 1)) * i;
        const y = padding + height - ((data[i] - min) / range) * height;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw glow effect for last point
    const lastX = padding + width;
    const lastY = padding + height - ((data[data.length - 1] - min) / range) * height;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

// =============================================
// SECTION A: LIVE METRICS UPDATES
// =============================================

function initMetrics() {
    updateMetrics();
    // Update metrics every 3-5 seconds with random changes
    setInterval(() => {
        updateMetrics();
    }, Math.random() * 2000 + 3000);
}

function updateMetrics() {
    // Simulate active users (random variance between 2700-2950)
    const activeUsers = Math.floor(Math.random() * 250 + 2700);
    document.getElementById('active-users').textContent = activeUsers.toLocaleString();
    
    // Simulate live chats (random variance between 320-360)
    const liveChats = Math.floor(Math.random() * 40 + 320);
    document.getElementById('live-chats').textContent = liveChats.toLocaleString();
}

// =============================================
// LIVE UPDATES (Activity Feed & Animations)
// =============================================

function initLiveUpdates() {
    // Animate incoming activity feed items periodically
    setInterval(() => {
        addActivityFeedItem();
    }, 8000);
    
    // Simulate visa status changes
    setInterval(() => {
        updateVisaStatuses();
    }, 10000);
}

function addActivityFeedItem() {
    const feedItems = document.querySelector('.feed-items');
    const activities = [
        'New application received: VISA-2849',
        'Document verification completed',
        'Agent online: Support Team',
        'Queue processed: 12 items',
        'System health: Optimal',
        'Database backup completed',
        'Performance: 99.8% uptime',
        'Email notification sent',
        'Application approved',
        'Payment processed successfully'
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const now = new Date();
    const time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    
    const newItem = document.createElement('div');
    newItem.className = 'feed-item';
    newItem.innerHTML = `
        <span class="feed-time">${time}</span>
        <span class="feed-text">${randomActivity}</span>
    `;
    
    feedItems.insertBefore(newItem, feedItems.firstChild);
    
    // Remove oldest items to keep list manageable (keep max 5 items)
    while (feedItems.children.length > 5) {
        feedItems.removeChild(feedItems.lastChild);
    }
}

function updateVisaStatuses() {
    const visaItems = document.querySelectorAll('.visa-item');
    
    // Randomly update a visa status
    const randomVisa = visaItems[Math.floor(Math.random() * visaItems.length)];
    const currentStatus = randomVisa.className.match(/in-review|urgent|completed/)[0];
    
    const statusCycle = {
        'in-review': 'completed',
        'completed': 'in-review',
        'urgent': 'in-review'
    };
    
    if (statusCycle[currentStatus]) {
        randomVisa.classList.remove(currentStatus);
        randomVisa.classList.add(statusCycle[currentStatus]);
        
        // Update tag
        const statusTag = randomVisa.querySelector('.visa-status');
        const tags = {
            'in-review': { class: 'in-review-tag', text: 'In Review' },
            'completed': { class: 'completed-tag', text: 'Completed' },
            'urgent': { class: 'urgent-tag', text: 'Urgent' }
        };
        
        const newStatus = statusCycle[currentStatus];
        statusTag.className = `visa-status ${tags[newStatus].class}`;
        statusTag.textContent = tags[newStatus].text;
    }
}

// =============================================
// RESPONSIVE CANVAS HANDLING
// =============================================

window.addEventListener('resize', () => {
    // Redraw charts on window resize
    setTimeout(() => {
        drawRevenueChart();
        drawProfitChart();
    }, 100);
});

// =============================================
// INTERACTION ENHANCEMENTS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to chat rows for demo
    const chatRows = document.querySelectorAll('.chat-row');
    chatRows.forEach(row => {
        row.addEventListener('click', () => {
            const userName = row.querySelector('.chat-user').textContent;
            console.log(`Opened chat with: ${userName}`);
            // In a real app, this would open a full chat interface
        });
    });
    
    // Add click handlers to visa items for demo
    const visaItems = document.querySelectorAll('.visa-item');
    visaItems.forEach(item => {
        item.addEventListener('click', () => {
            const visaId = item.querySelector('.visa-id').textContent;
            console.log(`Opened visa details: ${visaId}`);
            // In a real app, this would open a detailed visa application view
        });
    });
});

// =============================================
// PERFORMANCE: Lazy load images & optimize
// =============================================

// Implement IntersectionObserver for lazy loading if needed
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });
    
    // Observe elements that need lazy loading
    document.querySelectorAll('[data-lazy]').forEach(el => {
        observer.observe(el);
    });
}

console.log('Dashboard initialized successfully ✓');
