// --- Navigation ---
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => navMenu.classList.toggle('active'));
}

navLinks.forEach(link => link.addEventListener('click', () => {
    if (navMenu) navMenu.classList.remove('active');
}));

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Remove the existing 'scroll' listener for active links
// Add this instead:

const observerOptions = {
    threshold: 0.3 // Trigger when 30% of section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            // Add to current
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// --- Role Animation ---
const roleAnimElement = document.getElementById('role-anim');
if (roleAnimElement) {
    const roles = ["Learner", "Creator", "Explorer", "Student"];
    let currentRoleIndex = 0;

    setInterval(() => {
        roleAnimElement.style.animationName = 'fade-out-subtle';

        setTimeout(() => {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleAnimElement.textContent = roles[currentRoleIndex];
            roleAnimElement.style.animationName = 'fade-in-rise';
        }, 400);
    }, 2000);
}

// --- Theme Switcher ---
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Load theme from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
    // Initialize standard elements
    if (window.lucide) window.lucide.createIcons();
});

// --- Infinite Scroller Animation --- 
const scroller = document.querySelector(".scroller");
if (scroller && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    const scrollerInner = scroller.querySelector(".scroller__inner");
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
    });
}

/* =========================================
   TRADING TERMINAL MECHANISM
   ========================================= */
function initTradingTerminal() {
    const canvas = document.getElementById('mainChart');
    if (!canvas) return; // Exit if trading terminal doesn't exist on this page

    const ctx = canvas.getContext('2d');
    let width, height;

    // 1. Define Categories
    const CATEGORIES = [
        { id: 'ALL', label: 'All' },
        { id: 'LANG', label: 'Langs' },
        { id: 'WEB', label: 'Web' },
        { id: 'PYLIB', label: 'PyLibs' },
        { id: 'TOOLS', label: 'Tools' },
        { id: 'IOT', label: 'IoT' }
    ];

    let activeCategory = 'ALL';

    // 2. Helper to generate history
    const genHistory = (basePrice) => {
        let data = [];
        let price = basePrice;
        for (let i = 0; i < 60; i++) {
            let volatility = basePrice * 0.02;
            let change = (Math.random() - 0.5) * volatility;
            let open = price;
            let close = price + change;
            let high = Math.max(open, close) + Math.random() * (volatility * 0.5);
            let low = Math.min(open, close) - Math.random() * (volatility * 0.5);
            data.push({ open, close, high, low, time: i });
            price = close;
        }
        return data;
    };

    // 3. Expanded Data Set (Array format instead of Object)
    const SKILLS_DATA = [
        // Languages
        { symbol: 'PYT', name: 'Python', cat: 'LANG', price: 1420.50, change: 2.4, desc: 'High-level, interpreted programming language.' },
        { symbol: 'SQL', name: 'SQL', cat: 'LANG', price: 890.00, change: 0.5, desc: 'Domain-specific language for managing data.' },
        { symbol: 'C', name: 'C Lang', cat: 'LANG', price: 750.25, change: -0.2, desc: 'General-purpose, procedural computer programming.' },

        // Web Tech
        { symbol: 'JS', name: 'JavaScript', cat: 'WEB', price: 980.25, change: 1.8, desc: 'Core technology of the World Wide Web.' },
        { symbol: 'RCT', name: 'React', cat: 'WEB', price: 1240.50, change: 2.4, desc: 'JS library for building user interfaces.' },
        { symbol: 'HTML', name: 'HTML5', cat: 'WEB', price: 105.00, change: 0.1, desc: 'Standard markup language for documents.' },
        { symbol: 'CSS', name: 'CSS3', cat: 'WEB', price: 110.50, change: 0.2, desc: 'Style sheet language for presentation.' },
        { symbol: 'TAIL', name: 'Tailwind', cat: 'WEB', price: 850.75, change: 8.5, desc: 'Utility-first CSS framework.' },

        // Python Libs
        { symbol: 'DJG', name: 'Django', cat: 'PYLIB', price: 950.00, change: 4.2, desc: 'High-level Python web framework.' },
        { symbol: 'FAST', name: 'FastAPI', cat: 'PYLIB', price: 820.30, change: 5.5, desc: 'Modern, fast (high-performance) web framework.' },
        { symbol: 'PD', name: 'Pandas', cat: 'PYLIB', price: 580.10, change: 3.5, desc: 'Data manipulation and analysis library.' },
        { symbol: 'NP', name: 'NumPy', cat: 'PYLIB', price: 620.40, change: 1.2, desc: 'Fundamental package for scientific computing.' },

        // Tools
        { symbol: 'GIT', name: 'Git', cat: 'TOOLS', price: 450.00, change: 0.5, desc: 'Version control system.' },
        { symbol: 'DKR', name: 'Docker', cat: 'TOOLS', price: 680.00, change: 1.5, desc: 'Platform for developing, shipping, and running apps.' },

        // IoT
        { symbol: 'ARD', name: 'Arduino', cat: 'IOT', price: 120.00, change: 0.5, desc: 'Open-source hardware and software platform.' },
        { symbol: 'ESP', name: 'ESP32', cat: 'IOT', price: 85.00, change: 6.2, desc: 'Feature-rich MCU with integrated Wi-Fi/Bluetooth.' }
    ].map(skill => ({
        ...skill,
        history: genHistory(skill.price) // Generate unique history for each
    }));


    let activeSymbol = 'PYT';

    let currentSkillData = SKILLS_DATA.find(s => s.symbol === activeSymbol);
    let candles = currentSkillData.history;
    let lastPrice = currentSkillData.price;

    const candleWidth = 10;
    const candleSpacing = 4;

    // --- HELPER FUNCTIONS ---

    // Resize Canvas
    function resizeCanvas() {
        const container = document.getElementById('chart-container');
        if (container) {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
            draw();
        }
    }

    // Generate Fake Historical Data
    function generateHistory(basePrice) {
        let data = [];
        let price = basePrice;
        for (let i = 0; i < 60; i++) { // Generate 60 candles
            let volatility = basePrice * 0.02;
            let change = (Math.random() - 0.5) * volatility;
            let open = price;
            let close = price + change;
            let high = Math.max(open, close) + Math.random() * (volatility * 0.5);
            let low = Math.min(open, close) - Math.random() * (volatility * 0.5);

            data.push({ open, close, high, low, time: i });
            price = close;
        }
        return data;
    }

    // Main Draw Function
    function draw() {
        // 1. Clear & Background
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, width, height);

        // 2. Grid Lines (Subtle)
        ctx.strokeStyle = '#21262d';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Vertical Grid
        for (let x = 0; x < width; x += 80) {
            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, height);
        }
        // Horizontal Grid
        for (let y = 0; y < height; y += 60) {
            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(width, y + 0.5);
        }
        ctx.stroke();

        if (candles.length === 0) return;

        // 3. Determine Color based on overall trend (First vs Last)
        // Or use the 'change' value from your data if available. 
        // Here we compare start vs end of the visible history.
        const startPrice = candles[0].close;
        const endPrice = candles[candles.length - 1].close;
        const isPositive = endPrice >= startPrice;

        // Colors: Emerald for up, Rose for down
        const lineColor = isPositive ? '#34d399' : '#fb7185';
        const gradientStart = isPositive ? 'rgba(52, 211, 153, 0.2)' : 'rgba(251, 113, 133, 0.2)';

        // 4. Calculate Scale
        // We use the whole history to fill the width
        let minPrice = Math.min(...candles.map(c => c.close));
        let maxPrice = Math.max(...candles.map(c => c.close));
        let range = maxPrice - minPrice;

        // Add padding (20%)
        minPrice -= range * 0.2;
        maxPrice += range * 0.2;
        range = maxPrice - minPrice || 1; // avoid divide by zero

        function getX(index) {
            // Distribute points evenly across the width
            return (index / (candles.length - 1)) * width;
        }

        function getY(price) {
            return height - ((price - minPrice) / range) * height;
        }

        // 5. Draw the Area (Gradient Fill)
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, gradientStart);
        gradient.addColorStop(1, 'rgba(13, 17, 23, 0)'); // Fade to transparent

        ctx.beginPath();
        ctx.moveTo(getX(0), height); // Start at bottom-left

        // Trace the line points
        candles.forEach((c, i) => {
            ctx.lineTo(getX(i), getY(c.close));
        });

        ctx.lineTo(width, height); // Go to bottom-right
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // 6. Draw the Main Line
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = lineColor;
        ctx.lineJoin = 'round';

        candles.forEach((c, i) => {
            if (i === 0) ctx.moveTo(getX(i), getY(c.close));
            else ctx.lineTo(getX(i), getY(c.close));
        });

        ctx.stroke();

        // 7. Draw Current Price Marker (Horizontal Dashed Line)
        const currentY = getY(lastPrice);
        ctx.strokeStyle = '#6b7280'; // Neutral grey for the tracker line
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, currentY);
        ctx.lineTo(width, currentY);
        ctx.stroke();
        ctx.setLineDash([]);

        // 8. Price Label Tag
        ctx.fillStyle = isPositive ? '#064e3b' : '#881337'; // Darker background for tag
        const tagHeight = 20;
        const tagWidth = 60;
        ctx.fillRect(width - tagWidth, currentY - (tagHeight / 2), tagWidth, tagHeight);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px JetBrains Mono';
        ctx.fillText(lastPrice.toFixed(2), width - 50, currentY + 4);

        // 9. Pulsing Dot at the end of the line
        const lastX = getX(candles.length - 1);
        const lastY = getY(candles[candles.length - 1].close);

        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(lastX, lastY, 10, 0, Math.PI * 2);
        ctx.fillStyle = isPositive ? 'rgba(52, 211, 153, 0.3)' : 'rgba(251, 113, 133, 0.3)';
        ctx.fill();
    }

    // 1. Render Category Tabs
    function renderCategoryNav() {
        const navContainer = document.getElementById('category-nav');
        if (!navContainer) return;

        navContainer.innerHTML = CATEGORIES.map(cat => `
            <button 
                class="cat-btn ${cat.id === activeCategory ? 'active' : ''}" 
                onclick="window.setTerminalCategory('${cat.id}')"
            >
                ${cat.label}
            </button>
        `).join('');
    }

    // 2. Expose function globally so HTML onclick works
    window.setTerminalCategory = (catId) => {
        activeCategory = catId;
        renderCategoryNav();
        renderWatchlist();
    };

    // 3. Updated Render Watchlist (With Filtering)

    function renderWatchlist() {
        const container = document.getElementById('watchlist-container');
        if (!container) return;
        container.innerHTML = '';

        // FILTER LOGIC
        const filteredSkills = activeCategory === 'ALL'
            ? SKILLS_DATA
            : SKILLS_DATA.filter(s => s.cat === activeCategory);

        if (filteredSkills.length === 0) {
            container.innerHTML = '<div style="padding:10px; color:#666; font-size:0.8rem">No assets in this sector</div>';
            return;
        }

        filteredSkills.forEach(data => {
            const isPositive = data.change >= 0;
            const div = document.createElement('div');
            div.className = `watchlist-item ${data.symbol === activeSymbol ? 'active' : ''}`;
            // Update onclick to pass the symbol string
            div.onclick = () => switchSkill(data.symbol);

            div.innerHTML = `
                <div class="wl-row-1">
                    <span>${data.symbol}</span>
                    <span class="${isPositive ? 'text-up' : 'text-down'}">${data.price.toFixed(2)}</span>
                </div>
                <div class="wl-row-2">
                    <span>${data.name}</span>
                    <span class="${isPositive ? 'text-up' : 'text-down'}">${isPositive ? '+' : ''}${data.change}%</span>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // Render Order Book
    function renderOrderBook(price) {
        const bidsContainer = document.getElementById('bids-container');
        const asksContainer = document.getElementById('asks-container');
        if (!bidsContainer || !asksContainer) return;

        bidsContainer.innerHTML = '';
        asksContainer.innerHTML = '';

        // Generate Asks (Sell Orders - Red)
        for (let i = 8; i > 0; i--) {
            const askPrice = (price + (i * 0.1)).toFixed(2);
            const size = Math.floor(Math.random() * 500) + 50;
            const widthPct = Math.min(size / 8, 100);

            const row = document.createElement('div');
            row.className = 'order-row';
            row.innerHTML = `
                <div class="depth-bar depth-ask" style="width: ${widthPct}%"></div>
                <span class="row-price ask-price">${askPrice}</span>
                <span class="row-size">${size}</span>
            `;
            asksContainer.appendChild(row);
        }

        // Generate Bids (Buy Orders - Green)
        for (let i = 1; i <= 8; i++) {
            const bidPrice = (price - (i * 0.1)).toFixed(2);
            const size = Math.floor(Math.random() * 500) + 50;
            const widthPct = Math.min(size / 8, 100);

            const row = document.createElement('div');
            row.className = 'order-row';
            row.innerHTML = `
                <div class="depth-bar depth-bid" style="width: ${widthPct}%"></div>
                <span class="row-price bid-price">${bidPrice}</span>
                <span class="row-size">${size}</span>
            `;
            bidsContainer.appendChild(row);
        }
    }

    // 4. Updated Switch Skill
    function switchSkill(symbol) {
        activeSymbol = symbol;
        const data = SKILLS_DATA.find(s => s.symbol === symbol); // Changed lookup method

        if (!data) return;

        // Update DOM Elements
        const symbolEl = document.getElementById('chart-symbol');
        const priceEl = document.getElementById('current-price');
        const infoName = document.getElementById('info-name');
        const infoLevel = document.getElementById('info-level');
        const infoDesc = document.getElementById('info-desc');
        const midPrice = document.getElementById('mid-price');

        if (symbolEl) symbolEl.innerHTML = `${data.name.toUpperCase()} <span class="badge">PERP</span>`;
        if (priceEl) priceEl.innerText = data.price.toFixed(2);
        if (infoName) infoName.innerText = data.name;
        if (infoLevel) infoLevel.innerText = "High Proficiency";
        if (infoDesc) infoDesc.innerText = data.desc;
        if (midPrice) midPrice.innerText = data.price.toFixed(2);

        // Reset Data
        lastPrice = data.price;
        candles = data.history; // Use pre-generated history

        // Re-render
        renderWatchlist(); // To update active class
        renderOrderBook(lastPrice);
        draw();
    }

    // Start Simulation Loop
    function startSimulation() {
        setInterval(() => {
            if (candles.length === 0) return;

            // Update current candle
            const current = candles[candles.length - 1];
            const volatility = 0.3; // Price movement speed
            const change = (Math.random() - 0.5) * volatility;

            lastPrice += change;
            current.close = lastPrice;

            // Update High/Low of current candle
            if (lastPrice > current.high) current.high = lastPrice;
            if (lastPrice < current.low) current.low = lastPrice;

            // Update UI
            const priceEl = document.getElementById('current-price');
            const midPriceEl = document.getElementById('mid-price');

            if (priceEl) {
                const prev = parseFloat(priceEl.innerText);
                priceEl.innerText = lastPrice.toFixed(2);
                if (midPriceEl) midPriceEl.innerText = lastPrice.toFixed(2);

                // Color change based on tick
                if (lastPrice > prev) {
                    priceEl.classList.remove('text-down');
                    priceEl.classList.add('text-up');
                    if (midPriceEl) { midPriceEl.classList.remove('text-down'); midPriceEl.classList.add('text-up'); }
                } else {
                    priceEl.classList.remove('text-up');
                    priceEl.classList.add('text-down');
                    if (midPriceEl) { midPriceEl.classList.remove('text-up'); midPriceEl.classList.add('text-down'); }
                }
            }

            draw();
        }, 100); // Fast tick rate

        // Add new candle every 3 seconds
        setInterval(() => {
            if (candles.length === 0) return;
            const prev = candles[candles.length - 1];
            const nextOpen = prev.close;
            candles.push({
                open: nextOpen,
                close: nextOpen,
                high: nextOpen,
                low: nextOpen,
                time: Date.now()
            });
            if (candles.length > 80) candles.shift(); // Keep array size manageable
        }, 3000);

        // Refresh Order Book occasionally
        setInterval(() => {
            renderOrderBook(lastPrice);
        }, 2000);
    }

    // --- TOOLTIP CROSSHAIR ---
    const container = document.getElementById('chart-container');
    const tooltip = document.getElementById('crosshair-tooltip');

    if (container) {
        container.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Find closest candle index based on X position
            // Reverse logic because we draw from right to left
            const visibleCount = Math.floor(width / (candleWidth + candleSpacing));
            const indexFromRight = Math.floor((width - mouseX) / (candleWidth + candleSpacing)) - 3; // -3 accounts for padding
            const candleIndex = candles.length - 1 - indexFromRight;

            if (candles[candleIndex]) {
                const c = candles[candleIndex];
                const tOpen = document.getElementById('tooltip-open');
                const tHigh = document.getElementById('tooltip-high');
                const tLow = document.getElementById('tooltip-low');
                const tClose = document.getElementById('tooltip-close');

                if (tOpen) tOpen.innerText = c.open.toFixed(2);
                if (tHigh) tHigh.innerText = c.high.toFixed(2);
                if (tLow) tLow.innerText = c.low.toFixed(2);
                if (tClose) tClose.innerText = c.close.toFixed(2);

                // Draw Crosshair lines
                draw(); // Redraw chart to clear previous lines
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(mouseX, 0); ctx.lineTo(mouseX, height); // Vert
                ctx.moveTo(0, mouseY); ctx.lineTo(width, mouseY); // Horiz
                ctx.stroke();
                ctx.setLineDash([]);
            }
        });

        container.addEventListener('mouseleave', () => {
            draw(); // Clear lines on exit
        });
    }

    // --- INITIALIZATION CALLS ---
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    renderCategoryNav(); // NEW: Render tabs
    renderWatchlist();
    renderOrderBook(lastPrice);
    startSimulation();
}

// Call the function when DOM is ready
document.addEventListener('DOMContentLoaded', initTradingTerminal);


/* =========================================
   FIXED STACKED EXPERIENCE
   ========================================= */
function initExperienceStack() {
    const container = document.getElementById('stack-container');
    const yearDisplay = document.getElementById('active-year-display');

    if (!container) return;

    // YOUR DATA
    const experiences = [
        {
            role: "Python Full Stack",
            company: "Pentagon Space",
            link: "https://pentagonspace.in/",
            period: "2025",
            year: "2025",
            location: "Bangalore, India",
            description: "Developing robust full-stack web applications using Python and Django. Integrating complex back-end logic with responsive HTML/CSS/JS front-ends.",
            skills: ["Python", "Django", "HTML5", "CSS3", "JavaScript"],
            theme: "indigo"
        },
        {
            role: "Web Development Intern",
            company: "Internpe",
            link: "https://internpe.in/",
            period: "2024",
            year: "2024",
            location: "Remote",
            description: "Developed responsive web applications using modern technologies. Collaborated on frontend interfaces and optimized user experience across devices.",
            skills: ["Web Dev", "Responsive Design", "Frontend"],
            theme: "purple"
        },
        {
            role: "Embedded Systems Intern",
            company: "Loginware",
            link: "https://loginwaresofttec.com/",
            period: "2022 - 2023",
            year: "2023",
            location: "India",
            description: "Worked on embedded C programming and Python integration for IoT projects. Gained hands-on experience with hardware-software bridging.",
            skills: ["Embedded C", "Python", "IoT", "Hardware"],
            theme: "emerald"
        }
    ];

    // Render Cards
    container.innerHTML = experiences.map((exp, index) => {
        const themeColors = {
            indigo: 'from-indigo-500 to-blue-500',
            purple: 'from-purple-500 to-pink-500',
            emerald: 'from-emerald-500 to-teal-500'
        };

        // Notice: No dynamic padding-top. CSS sticky handles the stacking.
        return `
            <div class="experience-card-wrapper" data-year="${exp.year}" style="z-index: ${index + 1};">
                <div class="experience-glass rounded-3xl p-6 md:p-8 relative overflow-hidden group">
                    
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${themeColors[exp.theme]} opacity-60"></div>
                    
                    <div class="relative z-10 flex flex-col md:flex-row gap-6">
                        <div class="md:w-1/4 shrink-0">
                            <span class="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                                ${exp.period}
                            </span>
                            <div class="text-slate-500 text-xs flex items-center gap-2">
                                <i data-lucide="map-pin" width="12"></i> ${exp.location}
                            </div>
                            <div class="hidden md:block mt-6 text-7xl font-serif font-bold text-white/5 select-none">
                                0${index + 1}
                            </div>
                        </div>

                        <div class="md:w-3/4">
                            <h3 class="text-2xl font-bold text-white mb-1">${exp.role}</h3>
                            <a href="${exp.link}" target="_blank" class="text-lg text-indigo-400 font-serif italic mb-4 inline-flex items-center gap-2 hover:text-indigo-300 transition-colors">
                                ${exp.company} <i data-lucide="external-link" width="14"></i>
                            </a>
                            <p class="text-slate-300 text-sm leading-relaxed mb-6 border-l-2 border-slate-700 pl-4">
                                ${exp.description}
                            </p>
                            <div class="flex flex-wrap gap-2">
                                ${exp.skills.map(skill => `
                                    <span class="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 text-xs">
                                        ${skill}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    // 3D Effect Logic (Makes previous cards fade out/scale down)
    const cards = document.querySelectorAll('.experience-card-wrapper');

    function animateStack() {
        const triggerBottom = window.innerHeight * 0.8;

        cards.forEach((card, idx) => {
            const rect = card.getBoundingClientRect();

            // If this card is active (sticky state or visible)
            if (rect.top <= 100) { // 100 allows for the 90px top + buffer
                // Update Year
                if (yearDisplay) yearDisplay.innerText = card.dataset.year;
            }

            // Logic: As the NEXT card comes up, scale DOWN the CURRENT card
            const nextCard = cards[idx + 1];
            if (nextCard) {
                const nextRect = nextCard.getBoundingClientRect();
                // Calculate how close the next card is to the "stack point" (90px)
                const distance = nextRect.top - 90;

                // If next card is approaching the stack point
                if (distance < window.innerHeight * 0.5 && distance > 0) {
                    const progress = 1 - (distance / (window.innerHeight * 0.5));
                    // Scale down slightly (1.0 -> 0.95)
                    const scale = 1 - (progress * 0.05);
                    // Fade out slightly (1.0 -> 0.5)
                    const opacity = 1 - (progress * 0.5);
                    // Blur slightly (0 -> 5px)
                    const blur = progress * 5;

                    const inner = card.querySelector('.experience-glass');
                    if (inner) {
                        inner.style.transform = `scale(${scale})`;
                        inner.style.opacity = `${opacity}`;
                        inner.style.filter = `blur(${blur}px)`;
                    }
                } else if (distance <= 0) {
                    // Next card completely covers this one
                    const inner = card.querySelector('.experience-glass');
                    if (inner) {
                        inner.style.opacity = `0`;
                    }
                } else {
                    // Reset
                    const inner = card.querySelector('.experience-glass');
                    if (inner) {
                        inner.style.transform = `scale(1)`;
                        inner.style.opacity = `1`;
                        inner.style.filter = `blur(0)`;
                    }
                }
            }
        });
        requestAnimationFrame(animateStack);
    }

    animateStack();
}

// Call on load
document.addEventListener('DOMContentLoaded', initExperienceStack);

/* =========================================
   CERTIFICATION VAULT MODAL
   ========================================= */
(function () {
    // DOM Elements
    const modal = document.getElementById('certModal');
    const listPanel = document.getElementById('cert-list-panel');
    const previewPanel = document.getElementById('cert-preview-panel');
    const mobileNav = document.getElementById('mobile-nav-header');
    const pdfFrame = document.getElementById('pdf-frame');
    const placeholder = document.getElementById('placeholder-view');
    const downloadBtn = document.getElementById('download-btn');
    const buttons = document.querySelectorAll('.cert-btn');

    // Helper to check for mobile state using CSS media query logic
    const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

    // Functions attached to window for HTML access
    window.openCertModal = function () {
        if (!modal) return;
        modal.classList.add('active');
        if (isMobile()) {
            showListMobile();
        }
    };

    window.closeCertModal = function () {
        if (!modal) return;
        modal.classList.remove('active');

        // Clean up after transition
        setTimeout(() => {
            pdfFrame.src = "";
            pdfFrame.classList.add('hidden');
            placeholder.classList.remove('hidden');
            if (downloadBtn) downloadBtn.classList.add('hidden');

            // Reset buttons state
            buttons.forEach(btn => {
                btn.classList.remove('bg-slate-100', 'border-slate-300');
                btn.classList.add('bg-white', 'border-slate-100');
            });

            // Reset layout for desktop
            if (listPanel) listPanel.classList.remove('hidden');
            if (previewPanel) {
                previewPanel.classList.remove('hidden');
                previewPanel.classList.add('hidden', 'sm:flex');
            }
            if (mobileNav) {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('flex');
            }
        }, 300);
    };

    window.showListMobile = function () {
        if (!isMobile()) return;

        listPanel.classList.remove('hidden');
        previewPanel.classList.add('hidden');
        previewPanel.classList.remove('flex');

        mobileNav.classList.add('hidden');
        mobileNav.classList.remove('flex');
    };

    window.loadPDF = function (filename, btnElement) {
        // Highlight active button
        buttons.forEach(btn => {
            btn.classList.remove('bg-slate-100', 'border-slate-300');
            btn.classList.add('bg-white', 'border-slate-100');
        });
        btnElement.classList.remove('bg-white', 'border-slate-100');
        btnElement.classList.add('bg-slate-100', 'border-slate-300');

        // Load PDF
        placeholder.classList.add('hidden');
        pdfFrame.classList.remove('hidden');
        pdfFrame.src = filename;

        // Setup download button
        if (downloadBtn) {
            downloadBtn.href = filename;
            downloadBtn.classList.remove('hidden');
        }

        // On mobile, switch to preview view
        if (isMobile()) {
            listPanel.classList.add('hidden');

            previewPanel.classList.remove('hidden');
            previewPanel.classList.add('flex');

            mobileNav.classList.remove('hidden');
            mobileNav.classList.add('flex');
        }
    };

    // Event Listeners
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeCertModal();
            }
        });
    }

    // Handle Resize logic to reset view when switching device orientation
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            // Desktop Mode: Ensure both panels are visible
            if (listPanel) listPanel.classList.remove('hidden');
            if (previewPanel) {
                previewPanel.classList.remove('hidden');
                previewPanel.classList.add('flex');
            }
            if (mobileNav) {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('flex');
            }
        } else {
            // Mobile Mode: If PDF is loaded, show preview. Else show list.
            if (pdfFrame && !pdfFrame.classList.contains('hidden') && pdfFrame.src) {
                // Manually trigger preview view without re-loading PDF
                listPanel.classList.add('hidden');
                previewPanel.classList.remove('hidden');
                previewPanel.classList.add('flex');
                mobileNav.classList.remove('hidden');
                mobileNav.classList.add('flex');
            } else {
                window.showListMobile();
            }
        }
    });
})();

/* =========================================
   CONTACT SECTION LOGIC
   ========================================= */
// ... existing code ...

/* =========================================
   CONTACT SECTION LOGIC
   ========================================= */
(function () {
    // 1. SMART TIME & STATUS
    function updateTime() {
        const timeElement = document.getElementById('local-time');
        const statusDot = document.getElementById('status-dot');
        const statusPing = document.getElementById('status-ping');

        // Critical Null Checks
        if (!timeElement || !statusDot || !statusPing) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
        const hour = parseInt(now.toLocaleTimeString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' }));

        let statusText = "", colorClass = "", pingClass = "";

        if (hour >= 9 && hour < 22) {
            statusText = "Online • " + timeString; colorClass = "bg-emerald-500"; pingClass = "bg-emerald-400";
        } else {
            statusText = "Sleeping • " + timeString; colorClass = "bg-orange-500"; pingClass = "bg-orange-400";
        }
        timeElement.innerText = statusText;
        statusDot.className = `relative inline-flex rounded-full h-2.5 w-2.5 ${colorClass}`;
        statusPing.className = `animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingClass}`;
    }

    // 2. TYPEWRITER EFFECT
    const typeWriterElement = document.getElementById('typewriter');
    const text = "Available for freelance work, collaborations, and tech talks.";
    let i = 0;

    function typeWriter() {
        if (typeWriterElement && i < text.length) {
            typeWriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // 3. MOUSE SPOTLIGHT EFFECT
    const container = document.getElementById('contact-grid-container');
    if (container) {
        // Use a more specific selector to avoid selecting unintended elements
        const cards = container.querySelectorAll('.spotlight-card');
        container.onmousemove = e => {
            for (const card of cards) {
                const rect = card.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`); card.style.setProperty("--mouse-y", `${y}px`);
            }
        }
    }

    // 4. PHONE LOGIC FOR MOBILE
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const phoneBtnText = document.getElementById('phone-btn-text');
    const phoneDisplay = document.getElementById('phone-display');

    if (!isMobile && phoneBtnText && phoneDisplay) {
        phoneBtnText.innerHTML = `Copy Number <i class="ph-bold ph-copy"></i>`;
        phoneDisplay.innerText = "+91 81471 98827 (Mon-Fri)";
    }

    // 5. LEAFLET MAP & WEATHER (NEW)
    function initMap() {
        const mapElement = document.getElementById('leaflet-map');
        if (!mapElement) return;

        // Coordinates for Bengaluru
        const lat = 12.9716;
        const lng = 77.5946;

        // Initialize map with custom options
        // Check if map is already initialized
        if (mapElement._leaflet_id) return;

        const map = L.map('leaflet-map', {
            center: [lat, lng],
            zoom: 12,
            zoomControl: false,      // Clean look
            attributionControl: false, // Clean look
            dragging: !isMobile,     // Disable drag on mobile
            scrollWheelZoom: false   // Disable scroll zoom
        });

        // Dark Matter Tiles (Professional Dark Mode)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            subdomains: 'abcd'
        }).addTo(map);

        // Custom Pulsing Icon
        const pulsarIcon = L.divIcon({
            className: 'custom-map-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        L.marker([lat, lng], { icon: pulsarIcon }).addTo(map);

        // Fetch Live Weather
        fetchWeather(lat, lng);
    }

    async function fetchWeather(lat, lng) {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
            const data = await response.json();
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;

            // Map weather codes to Icons & Text
            let iconClass = "ph-sun";
            let desc = "Clear";

            // Simple mapping for common WMO codes
            if (code >= 1 && code <= 3) { iconClass = "ph-cloud-sun"; desc = "Cloudy"; }
            else if (code >= 45 && code <= 48) { iconClass = "ph-cloud-fog"; desc = "Foggy"; }
            else if (code >= 51 && code <= 67) { iconClass = "ph-cloud-rain"; desc = "Rainy"; }
            else if (code >= 71) { iconClass = "ph-snowflake"; desc = "Snow"; }
            else if (code >= 95) { iconClass = "ph-lightning"; desc = "Storm"; }

            const wText = document.getElementById('weather-text');
            const wIcon = document.getElementById('weather-icon');

            if (wText) wText.innerText = `${temp}°C • ${desc}`;
            if (wIcon) wIcon.className = `ph-fill ${iconClass} text-yellow-400 text-lg`;
        } catch (e) {
            console.log("Weather fetch failed, using default");
        }
    }

    // Initialize logic
    setInterval(updateTime, 1000);
    updateTime();
    const contactSection = document.getElementById('contact');
    const mapObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initMap(); // Only load map when contact section is seen
            mapObserver.disconnect(); // Run once
        }
    });
    if (contactSection) mapObserver.observe(contactSection);

    // Delay type writer slightly to ensure DOM is ready
    if (typeWriterElement) setTimeout(typeWriter, 500);
})();

// ... existing global functions ...

// GLOBAL FUNCTIONS FOR HTML ONCLICK EVENTS

function showContactToast(message) {
    const toast = document.getElementById('contact-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.remove('-translate-y-[300%]');
    toast.classList.add('translate-y-6');
    setTimeout(() => { toast.classList.remove('translate-y-6'); toast.classList.add('-translate-y-[300%]'); }, 3000);
}

function triggerConfetti(originX = 0.5, originY = 0.5) {
    if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { x: originX, y: originY }, colors: ['#4f46e5', '#ec4899', '#06b6d4', '#ffffff'], disableForReducedMotion: true });
    }
}

window.handleInstagramAction = function (e) {
    const message = "Hi! I saw your portfolio and wanted to connect.";
    const igUrl = "https://ig.me/m/is_shashank";
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth, y = (rect.top + rect.height / 2) / window.innerHeight;

    navigator.clipboard.writeText(message).then(() => {
        triggerConfetti(x, y);
        showContactToast("Message Copied! Opening Chat...");
        setTimeout(() => { window.open(igUrl, '_blank'); }, 800);
    }).catch(() => { window.open(igUrl, '_blank'); });
}

window.handleEmailAction = function (e) {
    const myEmail = "shashankan077@gmail.com";
    const emailSubject = "Project Inquiry";
    const emailBody = "Hi Shashank,\n\nI came across your portfolio and would like to discuss a potential project.\n\nBest,\n[Your Name]";
    window.location.href = `mailto:${myEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}

window.copyEmailOnly = function (e) {
    e.stopPropagation();
    const myEmail = "shashankan077@gmail.com";
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth, y = (rect.top + rect.height / 2) / window.innerHeight;
    navigator.clipboard.writeText(myEmail).then(() => { triggerConfetti(x, y); showContactToast("Email Address Copied!"); });
}

window.handlePhoneAction = function (phoneNumber, e) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) { window.location.href = `tel:${phoneNumber}`; }
    else {
        const rect = e.target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth, y = (rect.top + rect.height / 2) / window.innerHeight;
        navigator.clipboard.writeText(phoneNumber).then(() => { triggerConfetti(x, y); showContactToast("Number Copied to Clipboard!"); });
    }
}

window.downloadVCard = function () {
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:Shashank\nTEL;TYPE=CELL:+918147198827\nEMAIL:shashankan077@gmail.com\nURL:https://instagram.com/is_shashank\nNOTE:Portfolio Contact\nEND:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = 'Shashank_Contact.vcf';
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    showContactToast("Contact File Downloaded!");
}

window.downloadResume = function () {
    showContactToast("Opening Resume PDF...");
    window.open('resume.pdf', '_blank');
}

window.toggleQR = function () {
    const qrModal = document.getElementById('qr-modal');
    if (!qrModal) return;

    if (qrModal.classList.contains('hidden')) {
        qrModal.classList.remove('hidden');
        setTimeout(() => { qrModal.classList.remove('opacity-0'); qrModal.querySelector('div').classList.remove('scale-90'); }, 10);

        if (!qrModal.dataset.generated) {
            // Safety check for qrcodejs
            if (typeof QRCode !== 'undefined') {
                new QRCode(document.getElementById("qrcode"), { text: window.location.href, width: 128, height: 128 });
                qrModal.dataset.generated = "true";
            }
        }
    } else {
        qrModal.classList.add('opacity-0'); qrModal.querySelector('div').classList.add('scale-90');
        setTimeout(() => { qrModal.classList.add('hidden'); }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const qrModal = document.getElementById('qr-modal');
    if (qrModal) {
        qrModal.addEventListener('click', (e) => { if (e.target === qrModal) window.toggleQR(); });
    }
});

// --- Sound System (Web Audio API) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const playSound = {
    spin: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    },
    stop: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(60, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    },
    win: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        [0, 150, 300, 450, 600].forEach((delay, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                const notes = [440, 554, 659, 880, 1108];
                osc.frequency.value = notes[i];
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.5);
            }, delay);
        });
    }
};

// --- Configuration ---
const symbolHeight = 90; // UPDATED to match CSS height (Compact)
const numIcons = 6;

const symbols = [
    { icon: 'fa-briefcase', color: '#60a5fa', id: 'job' },
    { icon: 'fa-code', color: '#34d399', id: 'code' },
    { icon: 'fa-lightbulb', color: '#fbbf24', id: 'idea' },
    { icon: 'fa-gem', color: '#f472b6', id: 'gem' },
    { icon: 'fa-rocket', color: '#ef4444', id: 'rocket' },
    { icon: 'fa-heart', color: '#f87171', id: 'love' }
];

// --- Setup ---
const reels = [
    document.getElementById('reel-1'),
    document.getElementById('reel-2'),
    document.getElementById('reel-3')
];

const bulbs = document.querySelectorAll('.bulb');

const generateReelHtml = () => {
    let html = '';
    for (let i = 0; i < 40; i++) {
        symbols.forEach((sym) => {
            html += `<div class="symbol" style="color: ${sym.color}">
                        <i class="fas ${sym.icon}"></i>
                    </div>`;
        });
    }
    return html;
};

reels.forEach(reel => {
    reel.innerHTML = generateReelHtml();
    const randomStart = Math.floor(Math.random() * symbols.length);
    reel.style.transform = `translateY(-${randomStart * symbolHeight}px)`;
});

// --- Logic ---
let isSpinning = false;
const leverStick = document.getElementById('lever-stick');
const leverKnob = document.getElementById('lever-knob');
const statusText = document.getElementById('status-text');
const prizeContainer = document.getElementById('prize-container');

leverKnob.addEventListener('click', spin);
leverKnob.addEventListener('touchstart', (e) => { e.preventDefault(); spin(); });
leverKnob.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        spin();
    }
});

function spin() {
    if (isSpinning) return;
    isSpinning = true;

    if (audioCtx.state === 'suspended') audioCtx.resume();

    leverStick.classList.add('pulled');
    setTimeout(() => leverStick.classList.remove('pulled'), 600);

    playSound.spin();

    statusText.textContent = "GOOD LUCK...";
    statusText.style.color = "#fff";
    prizeContainer.classList.add('hidden');
    prizeContainer.classList.remove('opacity-100');
    stopBlinkingLights();

    const willWin = Math.random() < 0.5;

    let targetIndexes = [];
    if (willWin) {
        const winIdx = Math.floor(Math.random() * symbols.length);
        targetIndexes = [winIdx, winIdx, winIdx];
    } else {
        targetIndexes = [
            Math.floor(Math.random() * symbols.length),
            Math.floor(Math.random() * symbols.length),
            Math.floor(Math.random() * symbols.length)
        ];
        if (targetIndexes[0] === targetIndexes[1] && targetIndexes[1] === targetIndexes[2]) {
            targetIndexes[2] = (targetIndexes[2] + 1) % symbols.length;
        }
    }

    reels.forEach((reel, i) => {
        const currentY = parseFloat(reel.style.transform.replace('translateY(', '').replace('px)', '')) || 0;

        // Anticipation
        reel.style.transition = 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)';
        reel.style.transform = `translateY(${currentY + 40}px)`; // Adjusted for smaller size

        setTimeout(() => {
            reel.style.transition = 'none';
            reel.style.filter = 'blur(0px)';

            const startSet = 1;
            const startPos = -((startSet * symbols.length * symbolHeight));
            reel.style.transform = `translateY(${startPos}px)`;

            reel.offsetHeight;

            const targetSet = 25 + (i * 3);
            const targetPos = -((targetSet * symbols.length * symbolHeight) + (targetIndexes[i] * symbolHeight));

            reel.classList.add('blur-spin');

            const duration = 2000 + (i * 600);

            reel.style.transition = `transform ${duration}ms cubic-bezier(0.1, 1, 0.3, 1.1)`;
            reel.style.transform = `translateY(${targetPos}px)`;

            setTimeout(() => {
                reel.classList.remove('blur-spin');
                playSound.stop();
                if (navigator.vibrate) navigator.vibrate(10);
            }, duration);

        }, 100);
    });

    const totalTime = 2000 + (reels.length * 600);
    setTimeout(() => {
        checkWin(targetIndexes);
        isSpinning = false;
    }, totalTime);
}

function checkWin(indexes) {
    const allMatch = indexes.every(val => val === indexes[0]);

    if (allMatch) {
        statusText.textContent = "JACKPOT!";
        statusText.style.color = "#fbbf24";
        startBlinkingLights();
        playSound.win();
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);

        setTimeout(() => {
            prizeContainer.classList.remove('hidden');
            requestAnimationFrame(() => prizeContainer.classList.add('opacity-100'));
            startConfetti();

            setTimeout(() => {
                isConfettiActive = false;
            }, 4000);

        }, 500);
    } else {
        statusText.textContent = "TRY AGAIN";
        statusText.style.color = "#9ca3af";
    }
}

function resetGame() {
    prizeContainer.classList.remove('opacity-100');
    setTimeout(() => {
        prizeContainer.classList.add('hidden');
        statusText.textContent = "PULL LEVER"; // Shortened text
        statusText.style.color = "#fbbf24";
        stopBlinkingLights();
        stopConfetti();
    }, 500);
}

function claimPrize() {
    window.location.href = "mailto:shashankan077@gmail.com?subject=I hit the jackpot!";
}

// --- Lights Effect ---
let lightInterval;
function startBlinkingLights() {
    let active = 0;
    lightInterval = setInterval(() => {
        bulbs.forEach(b => b.classList.remove('active'));
        bulbs[active].classList.add('active');
        active = (active + 1) % bulbs.length;
    }, 200);
}

function stopBlinkingLights() {
    clearInterval(lightInterval);
    bulbs.forEach(b => b.classList.remove('active'));
}

// --- Confetti ---
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiLoop;
const particles = [];
let isConfettiActive = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: -20,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        size: Math.random() * 6 + 3, // Smaller particles
        speedY: Math.random() * 5 + 3,
        speedX: Math.random() * 4 - 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
    };
}

function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isConfettiActive && particles.length < 150) particles.push(createParticle());
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotationSpeed;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); ctx.restore();
        if (p.y > canvas.height) {
            if (isConfettiActive) { particles[i] = createParticle(); }
            else { particles.splice(i, 1); i--; }
        }
    }
    if (!isConfettiActive && particles.length === 0) {
        cancelAnimationFrame(confettiLoop); confettiLoop = null; return;
    }
    confettiLoop = requestAnimationFrame(updateConfetti);
}

function startConfetti() { isConfettiActive = true; if (!confettiLoop) updateConfetti(); }
function stopConfetti() { isConfettiActive = false; if (confettiLoop) { cancelAnimationFrame(confettiLoop); confettiLoop = null; ctx.clearRect(0, 0, canvas.width, canvas.height); particles.length = 0; } }


// -------------------------------------------------------------------------------

/* =========================================
           SPLASH CURSOR FLUID SIMULATION
           ========================================= */
(function () {
    const simCanvas = document.getElementById('fluid');
    if (!simCanvas) return;

    // --- Configuration ---
    const INITIAL_CONFIG = {
        SIM_RESOLUTION: 256,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 0.97,
        VELOCITY_DISSIPATION: 0.98,
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SHADING: false,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: false,
        BLOOM: true,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.8,
        BLOOM_THRESHOLD: 0.6,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: false,
        SUNRAYS_RESOLUTION: 196,
        SUNRAYS_WEIGHT: 1.0,
        CHROMATIC_ABERRATION: false,
        ABERRATION_INTENSITY: 0.005,
        FILM_GRAIN: false,
        GRAIN_INTENSITY: 0.08,
        AUTO_SPLAT: false,
        AUTO_SPLAT_INTERVAL: 800,
        PALETTE: 'sinebow'
    };

    // Mobile Optimization Check
    if (window.innerWidth < 600) {
        INITIAL_CONFIG.DYE_RESOLUTION = 512;
        INITIAL_CONFIG.SIM_RESOLUTION = 128;
        INITIAL_CONFIG.SPLAT_RADIUS = 0.6;
        INITIAL_CONFIG.SPLAT_FORCE = 1500;
    }

    let simulationConfig = { ...INITIAL_CONFIG };

    // --- State Variables ---
    let gl, ext;
    let lastUpdateTime = Date.now();
    let splatTime = 0;

    // Framebuffers
    let dye, velocity, divergence, curl, pressure;
    let bloom, bloomFramebuffers = [];
    let sunrays, sunraysMask;

    // Pointers
    function pointerPrototype() {
        this.id = -1;
        this.texcoordX = 0;
        this.texcoordY = 0;
        this.prevTexcoordX = 0;
        this.prevTexcoordY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.down = false;
        this.moved = false;
        this.color = [30, 0, 300];
    }
    let activePointers = [];
    for (let i = 0; i < 10; i++) activePointers.push(new pointerPrototype());

    // --- Shader Sources ---
    const VERTEX_SHADER_SOURCE = `
                precision highp float;
                attribute vec2 aPosition;
                varying vec2 vUv;
                varying vec2 vL;
                varying vec2 vR;
                varying vec2 vT;
                varying vec2 vB;
                uniform vec2 texelSize;
                void main () {
                    vUv = aPosition * 0.5 + 0.5;
                    vL = vUv - vec2(texelSize.x, 0.0);
                    vR = vUv + vec2(texelSize.x, 0.0);
                    vT = vUv + vec2(0.0, texelSize.y);
                    vB = vUv - vec2(0.0, texelSize.y);
                    gl_Position = vec4(aPosition, 0.0, 1.0);
                }
            `;

    const COPY_SHADER_SOURCE = `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                uniform sampler2D uTexture;
                void main () { gl_FragColor = texture2D(uTexture, vUv); }
            `;

    const CLEAR_SHADER_SOURCE = `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                uniform sampler2D uTexture;
                uniform float value;
                void main () { gl_FragColor = value * texture2D(uTexture, vUv); }
            `;

    const DISPLAY_SHADER_SOURCE = `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                varying vec2 vL;
                varying vec2 vR;
                varying vec2 vT;
                varying vec2 vB;
                uniform sampler2D uTexture;
                uniform sampler2D uBloom;
                uniform sampler2D uSunrays;
                uniform vec2 texelSize;
                uniform int transparent;
                uniform vec3 backColor;
                uniform float aberration;
                uniform float grain;
                uniform float time;
                float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }
                void main () {
                    vec3 c;
                    #ifdef CHROMATIC_ABERRATION
                        vec2 dist = vUv - 0.5;
                        vec2 offset = dist * aberration;
                        c.r = texture2D(uTexture, vUv + offset).r;
                        c.g = texture2D(uTexture, vUv).g;
                        c.b = texture2D(uTexture, vUv - offset).b;
                        #ifdef BLOOM
                            vec3 b;
                            b.r = texture2D(uBloom, vUv + offset).r;
                            b.g = texture2D(uBloom, vUv).g;
                            b.b = texture2D(uBloom, vUv - offset).b;
                            c += b;
                        #endif
                    #else
                        c = texture2D(uTexture, vUv).rgb;
                        #ifdef BLOOM
                            vec3 bloom = texture2D(uBloom, vUv).rgb;
                            c += bloom;
                        #endif
                    #endif
                    #ifdef SUNRAYS
                        float sunrays = texture2D(uSunrays, vUv).r;
                        c *= sunrays;
                        c += sunrays * 0.25; 
                    #endif
                    #ifdef SHADING
                        vec3 lc = texture2D(uTexture, vL).rgb;
                        vec3 rc = texture2D(uTexture, vR).rgb;
                        vec3 tc = texture2D(uTexture, vT).rgb;
                        vec3 bc = texture2D(uTexture, vB).rgb;
                        float dx = length(rc) - length(lc);
                        float dy = length(tc) - length(bc);
                        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
                        vec3 l = vec3(0.0, 0.0, 1.0);
                        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
                        c *= diffuse;
                        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
                        vec3 halfVector = normalize(l + viewDir);
                        float specular = pow(max(dot(n, halfVector), 0.0), 50.0);
                        c += specular * 0.5; 
                    #endif
                    float distSq = length(vUv - 0.5);
                    float vignette = 1.0 - smoothstep(0.5, 1.5, distSq);
                    c *= vignette;
                    #ifdef FILM_GRAIN
                        float noise = rand(vUv * time);
                        c += (noise - 0.5) * grain;
                    #endif
                    float a = max(c.r, max(c.g, c.b));
                    if (transparent == 1) { gl_FragColor = vec4(c, a); } 
                    else { gl_FragColor = vec4(mix(backColor, c, a), 1.0); }
                }
            `;

    const BLOOM_PREFILTER_SHADER = `
                precision mediump float;
                precision mediump sampler2D;
                varying vec2 vUv;
                uniform sampler2D uTexture;
                uniform vec3 curve;
                uniform float threshold;
                void main () {
                    vec3 c = texture2D(uTexture, vUv).rgb;
                    float br = max(c.r, max(c.g, c.b));
                    float rq = clamp(br - curve.x, 0.0, curve.y);
                    rq = curve.z * rq * rq;
                    c *= max(rq, br - threshold) / max(br, 0.0001);
                    gl_FragColor = vec4(c, 0.0);
                }
            `;

    const BLOOM_BLUR_SHADER = `
                precision mediump float;
                precision mediump sampler2D;
                varying vec2 vUv;
                uniform sampler2D uTexture;
                uniform vec2 texelSize;
                void main () {
                    vec4 sum = vec4(0.0);
                    sum += texture2D(uTexture, vUv - 4.0 * texelSize) * 0.051;
                    sum += texture2D(uTexture, vUv - 3.0 * texelSize) * 0.0918;
                    sum += texture2D(uTexture, vUv - 2.0 * texelSize) * 0.12245;
                    sum += texture2D(uTexture, vUv - 1.0 * texelSize) * 0.1531;
                    sum += texture2D(uTexture, vUv) * 0.1633;
                    sum += texture2D(uTexture, vUv + 1.0 * texelSize) * 0.1531;
                    sum += texture2D(uTexture, vUv + 2.0 * texelSize) * 0.12245;
                    sum += texture2D(uTexture, vUv + 3.0 * texelSize) * 0.0918;
                    sum += texture2D(uTexture, vUv + 4.0 * texelSize) * 0.051;
                    gl_FragColor = sum;
                }
            `;

    const BLOOM_FINAL_SHADER = `
                precision mediump float;
                precision mediump sampler2D;
                varying vec2 vUv;
                uniform sampler2D uTexture;
                uniform sampler2D uBloom;
                uniform float intensity;
                void main () {
                    vec4 c = texture2D(uTexture, vUv);
                    vec4 b = texture2D(uBloom, vUv);
                    gl_FragColor = c + b * intensity;
                }
            `;

    const SUNRAYS_MASK_SHADER = `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                uniform sampler2D uTexture;
                void main () {
                    vec4 c = texture2D(uTexture, vUv);
                    float br = max(c.r, max(c.g, c.b));
                    c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
                    gl_FragColor = c;
                }
            `;

    const SUNRAYS_SHADER = `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                uniform sampler2D uTexture;
                uniform float weight;
                #define ITERATIONS 16
                void main () {
                    float Density = 0.3;
                    float Decay = 0.95;
                    float Exposure = 0.7;
                    vec2 coord = vUv;
                    vec2 dir = vUv - 0.5;
                    dir *= 1.0 / float(ITERATIONS) * Density;
                    float illuminationDecay = 1.0;
                    vec4 color = texture2D(uTexture, vUv);
                    for (int i = 0; i < ITERATIONS; i++) {
                        coord -= dir;
                        vec4 texel = texture2D(uTexture, coord);
                        texel *= illuminationDecay * weight;
                        color += texel;
                        illuminationDecay *= Decay;
                    }
                    gl_FragColor = color * Exposure;
                }
            `;

    const SPLAT_SHADER = `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                uniform sampler2D uTarget;
                uniform float aspectRatio;
                uniform vec3 color;
                uniform vec2 point;
                uniform float radius;
                void main () {
                    vec2 p = vUv - point.xy;
                    p.x *= aspectRatio;
                    vec3 splat = exp(-dot(p, p) / radius) * color;
                    vec3 base = texture2D(uTarget, vUv).xyz;
                    gl_FragColor = vec4(base + splat, 1.0);
                }
            `;

    const ADVECTION_SHADER = `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                uniform sampler2D uVelocity;
                uniform sampler2D uSource;
                uniform vec2 texelSize;
                uniform vec2 dyeTexelSize;
                uniform float dt;
                uniform float dissipation;
                vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
                    vec2 st = uv / tsize - 0.5;
                    vec2 iuv = floor(st);
                    vec2 fuv = fract(st);
                    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
                    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
                    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
                    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
                    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
                }
                void main () {
                    #ifdef MANUAL_FILTERING
                        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                        vec4 result = bilerp(uSource, coord, dyeTexelSize);
                    #else
                        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                        vec4 result = texture2D(uSource, coord);
                    #endif
                    float decay = 1.0 + dissipation * dt;
                    gl_FragColor = result / decay;
                }
            `;

    const DIVERGENCE_SHADER = `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                varying highp vec2 vL;
                varying highp vec2 vR;
                varying highp vec2 vT;
                varying highp vec2 vB;
                uniform sampler2D uVelocity;
                void main () {
                    float L = texture2D(uVelocity, vL).x;
                    float R = texture2D(uVelocity, vR).x;
                    float T = texture2D(uVelocity, vT).y;
                    float B = texture2D(uVelocity, vB).y;
                    vec2 C = texture2D(uVelocity, vUv).xy;
                    if (vL.x < 0.0) { L = -C.x; }
                    if (vR.x > 1.0) { R = -C.x; }
                    if (vT.y > 1.0) { T = -C.y; }
                    if (vB.y < 0.0) { B = -C.y; }
                    float div = 0.5 * (R - L + T - B);
                    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
                }
            `;

    const CURL_SHADER = `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                varying highp vec2 vL;
                varying highp vec2 vR;
                varying highp vec2 vT;
                varying highp vec2 vB;
                uniform sampler2D uVelocity;
                void main () {
                    float L = texture2D(uVelocity, vL).y;
                    float R = texture2D(uVelocity, vR).y;
                    float T = texture2D(uVelocity, vT).x;
                    float B = texture2D(uVelocity, vB).x;
                    float vorticity = R - L - T + B;
                    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
                }
            `;

    const VORTICITY_SHADER = `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                varying vec2 vL;
                varying vec2 vR;
                varying vec2 vT;
                varying vec2 vB;
                uniform sampler2D uVelocity;
                uniform sampler2D uCurl;
                uniform float curl;
                uniform float dt;
                void main () {
                    float L = texture2D(uCurl, vL).x;
                    float R = texture2D(uCurl, vR).x;
                    float T = texture2D(uCurl, vT).x;
                    float B = texture2D(uCurl, vB).x;
                    float C = texture2D(uCurl, vUv).x;
                    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
                    force /= length(force) + 0.0001;
                    force *= curl * C;
                    force.y *= -1.0;
                    vec2 velocity = texture2D(uVelocity, vUv).xy;
                    velocity += force * dt;
                    velocity = min(max(velocity, -1000.0), 1000.0);
                    gl_FragColor = vec4(velocity, 0.0, 1.0);
                }
            `;

    const PRESSURE_SHADER = `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                varying highp vec2 vL;
                varying highp vec2 vR;
                varying highp vec2 vT;
                varying highp vec2 vB;
                uniform sampler2D uPressure;
                uniform sampler2D uDivergence;
                void main () {
                    float L = texture2D(uPressure, vL).x;
                    float R = texture2D(uPressure, vR).x;
                    float T = texture2D(uPressure, vT).x;
                    float B = texture2D(uPressure, vB).x;
                    float C = texture2D(uPressure, vUv).x;
                    float divergence = texture2D(uDivergence, vUv).x;
                    float pressure = (L + R + B + T - divergence) * 0.25;
                    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
                }
            `;

    const GRADIENT_SUBTRACT_SHADER = `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                varying highp vec2 vL;
                varying highp vec2 vR;
                varying highp vec2 vT;
                varying highp vec2 vB;
                uniform sampler2D uPressure;
                uniform sampler2D uVelocity;
                void main () {
                    float L = texture2D(uPressure, vL).x;
                    float R = texture2D(uPressure, vR).x;
                    float T = texture2D(uPressure, vT).x;
                    float B = texture2D(uPressure, vB).x;
                    vec2 velocity = texture2D(uVelocity, vUv).xy;
                    velocity.xy -= vec2(R - L, T - B);
                    gl_FragColor = vec4(velocity, 0.0, 1.0);
                }
            `;

    // --- Programs & Materials ---
    let baseVertexShader, copyProgram, clearProgram, splatProgram, advectionProgram;
    let divergenceProgram, curlProgram, vorticityProgram, pressureProgram, gradienSubtractProgram;
    let bloomPrefilterProgram, bloomBlurProgram, bloomFinalProgram;
    let sunraysMaskProgram, sunraysProgram;
    let displayMaterial;

    // --- Helper Classes & Functions ---

    class Material {
        constructor(vertexShader, fragmentShaderSource) {
            this.vertexShader = vertexShader;
            this.fragmentShaderSource = fragmentShaderSource;
            this.programs = [];
            this.activeProgram = null;
            this.uniforms = [];
        }
        setKeywords(keywords) {
            let hash = 0;
            for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
            let program = this.programs[hash];
            if (program == null) {
                let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
                program = createProgram(this.vertexShader, fragmentShader);
                this.programs[hash] = program;
            }
            if (program === this.activeProgram) return;
            this.uniforms = getUniforms(program);
            this.activeProgram = program;
        }
        bind() { gl.useProgram(this.activeProgram); }
    }

    class Program {
        constructor(vertexShader, fragmentShader) {
            this.uniforms = {};
            this.program = createProgram(vertexShader, fragmentShader);
            this.uniforms = getUniforms(this.program);
        }
        bind() { gl.useProgram(this.program); }
    }

    function createProgram(vertexShader, fragmentShader) {
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(program));
        return program;
    }

    function getUniforms(program) {
        let uniforms = [];
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let uniformName = gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
    }

    function compileShader(type, source, keywords) {
        source = addKeywords(source, keywords);
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader));
        return shader;
    }

    function addKeywords(source, keywords) {
        if (!keywords) return source;
        let keywordsString = '';
        keywords.forEach(keyword => {
            keywordsString += '#define ' + keyword + '\n';
        });
        return keywordsString + source;
    }

    const blit = (() => {
        let buffer, elementBuffer;
        return (target, clear = false) => {
            if (!buffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
                gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(0);
            }
            if (target == null) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            } else {
                gl.viewport(0, 0, target.width, target.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            }
            if (clear) {
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        };
    })();

    // --- Main Logic & Init ---

    function init() {
        const context = getWebGLContext(simCanvas);
        gl = context.gl;
        ext = context.ext;

        if (!ext.supportLinearFiltering) {
            simulationConfig.DYE_RESOLUTION = 128;
            simulationConfig.SHADING = false;
            simulationConfig.BLOOM = false;
            simulationConfig.SUNRAYS = false;
            simulationConfig.CHROMATIC_ABERRATION = false;
        }

        // Compile Base Vertex Shader
        baseVertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);

        // Initialize Programs
        copyProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, COPY_SHADER_SOURCE));
        clearProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, CLEAR_SHADER_SOURCE));
        splatProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, SPLAT_SHADER));
        advectionProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, ADVECTION_SHADER, ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']));
        divergenceProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, DIVERGENCE_SHADER));
        curlProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, CURL_SHADER));
        vorticityProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, VORTICITY_SHADER));
        pressureProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, PRESSURE_SHADER));
        gradienSubtractProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, GRADIENT_SUBTRACT_SHADER));

        bloomPrefilterProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, BLOOM_PREFILTER_SHADER));
        bloomBlurProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, BLOOM_BLUR_SHADER));
        bloomFinalProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, BLOOM_FINAL_SHADER));

        sunraysMaskProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, SUNRAYS_MASK_SHADER));
        sunraysProgram = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, SUNRAYS_SHADER));

        displayMaterial = new Material(baseVertexShader, DISPLAY_SHADER_SOURCE);

        initFramebuffers();
        updateKeywords();
        setupUI();
        attachListeners();
        updateFrame();
    }

    function getWebGLContext(canvasEl) {
        const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: true };
        let gl = canvasEl.getContext('webgl2', params);
        const isWebGL2 = !!gl;
        if (!isWebGL2) gl = canvasEl.getContext('webgl', params) || canvasEl.getContext('experimental-webgl', params);

        let halfFloat, supportLinearFiltering;
        if (isWebGL2) {
            gl.getExtension('EXT_color_buffer_float');
            supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
        } else {
            halfFloat = gl.getExtension('OES_texture_half_float');
            supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
        }
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES;
        let formatRGBA, formatRG, formatR;

        if (isWebGL2) {
            formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
            formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
            formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
        } else {
            formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
            formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
            formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        }

        return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
        if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
            switch (internalFormat) {
                case gl.R16F: return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
                case gl.RG16F: return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
                default: return null;
            }
        }
        return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        return status === gl.FRAMEBUFFER_COMPLETE;
    }

    function createFBO(w, h, internalFormat, format, type, param) {
        gl.activeTexture(gl.TEXTURE0);
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

        let fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);

        return {
            texture, fbo, width: w, height: h,
            texelSizeX: 1.0 / w, texelSizeY: 1.0 / h,
            attach(id) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                return id;
            }
        };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
        let fbo1 = createFBO(w, h, internalFormat, format, type, param);
        let fbo2 = createFBO(w, h, internalFormat, format, type, param);
        return {
            width: w, height: h,
            texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
            get read() { return fbo1; }, set read(value) { fbo1 = value; },
            get write() { return fbo2; }, set write(value) { fbo2 = value; },
            swap() { let temp = fbo1; fbo1 = fbo2; fbo2 = temp; }
        };
    }

    function initFramebuffers() {
        let simRes = getResolution(simulationConfig.SIM_RESOLUTION);
        let dyeRes = getResolution(simulationConfig.DYE_RESOLUTION);
        const texType = ext.halfFloatTexType;
        const rgba = ext.formatRGBA;
        const rg = ext.formatRG;
        const r = ext.formatR;
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

        gl.disable(gl.BLEND);

        if (!dye) dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        else dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

        if (!velocity) velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        else velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

        divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

        initBloomFramebuffers();
        initSunraysFramebuffers();
    }

    function initBloomFramebuffers() {
        let res = getResolution(simulationConfig.BLOOM_RESOLUTION);
        const texType = ext.halfFloatTexType;
        const rgba = ext.formatRGBA;
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        bloom = createFBO(res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering);
        bloomFramebuffers.length = 0;
        for (let i = 0; i < simulationConfig.BLOOM_ITERATIONS; i++) {
            let width = res.width >> (i + 1);
            let height = res.height >> (i + 1);
            if (width < 2 || height < 2) break;
            let fbo = createFBO(width, height, rgba.internalFormat, rgba.format, texType, filtering);
            bloomFramebuffers.push(fbo);
        }
    }

    function initSunraysFramebuffers() {
        let res = getResolution(simulationConfig.SUNRAYS_RESOLUTION);
        const texType = ext.halfFloatTexType;
        const r = ext.formatR;
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        sunrays = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
        sunraysMask = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
    }

    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
        if (target.width === w && target.height === h) return target;
        target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
        target.write = createFBO(w, h, internalFormat, format, type, param);
        target.width = w; target.height = h;
        target.texelSizeX = 1.0 / w; target.texelSizeY = 1.0 / h;
        return target;
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
        let newFBO = createFBO(w, h, internalFormat, format, type, param);
        copyProgram.bind();
        gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
        blit(newFBO);
        return newFBO;
    }

    function getResolution(resolution) {
        let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
        if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
        const min = Math.round(resolution);
        const max = Math.round(resolution * aspectRatio);
        if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
        else return { width: min, height: max };
    }

    function updateKeywords() {
        let displayKeywords = [];
        if (simulationConfig.SHADING) displayKeywords.push('SHADING');
        if (simulationConfig.BLOOM) displayKeywords.push('BLOOM');
        if (simulationConfig.SUNRAYS) displayKeywords.push('SUNRAYS');
        if (simulationConfig.CHROMATIC_ABERRATION) displayKeywords.push('CHROMATIC_ABERRATION');
        if (simulationConfig.FILM_GRAIN) displayKeywords.push('FILM_GRAIN');
        displayMaterial.setKeywords(displayKeywords);
    }

    // ... inside the fluid simulation IIFE ...

    // 1. Create an observer to track visibility
    let isHeroVisible = true;
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isHeroVisible = entry.isIntersecting;
        });
    }, { threshold: 0 });

    const heroSection = document.querySelector('#home');
    if (heroSection) heroObserver.observe(heroSection);

    // 2. Modify updateFrame to stop rendering when not visible
    function updateFrame() {
        // STOP the loop if hero is not visible
        if (!isHeroVisible && !simulationConfig.PAUSED) {
            requestAnimationFrame(updateFrame);
            return;
        }

        const dt = calcDeltaTime();
        if (resizeCanvas()) initFramebuffers();
        if (!simulationConfig.PAUSED) {
            updateColors(dt);
            applyInputs();
            checkAutoSplat();
            step(dt);
        }
        render(null);
        requestAnimationFrame(updateFrame);
    }

    function calcDeltaTime() {
        let now = Date.now();
        let dt = (now - lastUpdateTime) / 1000;
        dt = Math.min(dt, 0.016666);
        lastUpdateTime = now;
        return dt;
    }

    function resizeCanvas() {
        let width = scaleByPixelRatio(simCanvas.clientWidth);
        let height = scaleByPixelRatio(simCanvas.clientHeight);
        if (simCanvas.width !== width || simCanvas.height !== height) {
            simCanvas.width = width;
            simCanvas.height = height;
            return true;
        }
        return false;
    }

    function step(dt) {
        gl.disable(gl.BLEND);
        // Curl
        curlProgram.bind();
        gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
        blit(curl);
        // Vorticity
        vorticityProgram.bind();
        gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
        gl.uniform1f(vorticityProgram.uniforms.curl, simulationConfig.CURL);
        gl.uniform1f(vorticityProgram.uniforms.dt, dt);
        blit(velocity.write);
        velocity.swap();
        // Divergence
        divergenceProgram.bind();
        gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
        blit(divergence);
        // Clear Pressure
        clearProgram.bind();
        gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
        gl.uniform1f(clearProgram.uniforms.value, simulationConfig.PRESSURE);
        blit(pressure.write);
        pressure.swap();
        // Pressure Solver
        pressureProgram.bind();
        gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
        for (let i = 0; i < simulationConfig.PRESSURE_ITERATIONS; i++) {
            gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
            blit(pressure.write);
            pressure.swap();
        }
        // Gradient Subtract
        gradienSubtractProgram.bind();
        gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
        gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
        blit(velocity.write);
        velocity.swap();
        // Advection
        advectionProgram.bind();
        gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
        let velocityId = velocity.read.attach(0);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
        gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
        gl.uniform1f(advectionProgram.uniforms.dt, dt);
        gl.uniform1f(advectionProgram.uniforms.dissipation, simulationConfig.VELOCITY_DISSIPATION);
        blit(velocity.write);
        velocity.swap();
        if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
        gl.uniform1f(advectionProgram.uniforms.dissipation, simulationConfig.DENSITY_DISSIPATION);
        blit(dye.write);
        dye.swap();
    }

    function render(target) {
        if (simulationConfig.BLOOM) applyBloom(dye.read, bloom);
        if (simulationConfig.SUNRAYS) applySunrays(dye.read, dye.read, sunrays);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        drawDisplay(target);
    }

    function applyBloom(source, destination) {
        if (bloomFramebuffers.length < 2) return;
        let last = destination;
        gl.disable(gl.BLEND);
        bloomPrefilterProgram.bind();
        let knee = simulationConfig.BLOOM_THRESHOLD * simulationConfig.BLOOM_SOFT_KNEE + 0.0001;
        let curve0 = simulationConfig.BLOOM_THRESHOLD - knee;
        let curve1 = knee * 2.0;
        let curve2 = 0.25 / knee;
        gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
        gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, simulationConfig.BLOOM_THRESHOLD);
        gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
        blit(last);
        bloomBlurProgram.bind();
        for (let i = 0; i < bloomFramebuffers.length; i++) {
            let dest = bloomFramebuffers[i];
            gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
            gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
            blit(dest);
            last = dest;
        }
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.enable(gl.BLEND);
        for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
            let baseTex = bloomFramebuffers[i];
            gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
            gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
            gl.viewport(0, 0, baseTex.width, baseTex.height);
            blit(baseTex);
            last = baseTex;
        }
        gl.disable(gl.BLEND);
        bloomFinalProgram.bind();
        gl.uniform1i(bloomFinalProgram.uniforms.uTexture, source.attach(0));
        gl.uniform1i(bloomFinalProgram.uniforms.uBloom, last.attach(1));
        gl.uniform1f(bloomFinalProgram.uniforms.intensity, simulationConfig.BLOOM_INTENSITY);
        blit(destination);
    }

    function applySunrays(source, mask, destination) {
        gl.disable(gl.BLEND);
        sunraysMaskProgram.bind();
        gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
        blit(sunraysMask);
        sunraysProgram.bind();
        gl.uniform1f(sunraysProgram.uniforms.weight, simulationConfig.SUNRAYS_WEIGHT);
        gl.uniform1i(sunraysProgram.uniforms.uTexture, sunraysMask.attach(0));
        blit(destination);
    }

    function drawDisplay(target) {
        let width = target == null ? gl.drawingBufferWidth : target.width;
        let height = target == null ? gl.drawingBufferHeight : target.height;
        displayMaterial.bind();
        if (simulationConfig.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
        gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
        if (simulationConfig.BLOOM) gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1));
        if (simulationConfig.SUNRAYS) gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(2));
        if (simulationConfig.CHROMATIC_ABERRATION) gl.uniform1f(displayMaterial.uniforms.aberration, simulationConfig.ABERRATION_INTENSITY);
        if (simulationConfig.FILM_GRAIN) {
            gl.uniform1f(displayMaterial.uniforms.grain, simulationConfig.GRAIN_INTENSITY);
            gl.uniform1f(displayMaterial.uniforms.time, Date.now() / 1000.0);
        }
        if (simulationConfig.TRANSPARENT) gl.uniform1i(displayMaterial.uniforms.transparent, 1);
        else {
            gl.uniform1i(displayMaterial.uniforms.transparent, 0);
            gl.uniform3f(displayMaterial.uniforms.backColor, simulationConfig.BACK_COLOR.r, simulationConfig.BACK_COLOR.g, simulationConfig.BACK_COLOR.b);
        }
        blit(target);
    }

    // --- Inputs & UI ---

    function setupUI() {
        const ui = {
            bloom: document.getElementById('bloomIntensity'),
            sunrays: document.getElementById('toggleSunrays'),
            shading: document.getElementById('toggleShading'),
            grain: document.getElementById('toggleGrain'),
            aberration: document.getElementById('toggleAberration'),
            autoSplat: document.getElementById('toggleAutoSplat'),
            paused: document.getElementById('togglePaused'),
            curl: document.getElementById('curlStrength'),
            density: document.getElementById('densityDissipation'),
            velocity: document.getElementById('velocityDissipation'),
            radius: document.getElementById('splatRadius'),
            palette: document.getElementById('colorPalette'),
            quality: document.getElementById('qualitySelect'),
            toggleBtn: document.getElementById('toggleSettings'),
            panel: document.getElementById('controlsPanel'),
            resetBtn: document.getElementById('resetBtn'),
            screenshotBtn: document.getElementById('screenshotBtn')
        };

        // Init values
        ui.bloom.value = simulationConfig.BLOOM_INTENSITY;
        document.getElementById('val-bloom').innerText = simulationConfig.BLOOM_INTENSITY;
        ui.sunrays.checked = simulationConfig.SUNRAYS;
        ui.shading.checked = simulationConfig.SHADING;
        ui.grain.checked = simulationConfig.FILM_GRAIN;
        ui.aberration.checked = simulationConfig.CHROMATIC_ABERRATION;
        ui.autoSplat.checked = simulationConfig.AUTO_SPLAT;
        ui.paused.checked = simulationConfig.PAUSED;
        ui.curl.value = simulationConfig.CURL;
        document.getElementById('val-curl').innerText = simulationConfig.CURL;
        ui.density.value = simulationConfig.DENSITY_DISSIPATION;
        document.getElementById('val-dissipation').innerText = simulationConfig.DENSITY_DISSIPATION;
        ui.velocity.value = simulationConfig.VELOCITY_DISSIPATION;
        document.getElementById('val-velocity').innerText = simulationConfig.VELOCITY_DISSIPATION;
        ui.radius.value = simulationConfig.SPLAT_RADIUS;
        document.getElementById('val-radius').innerText = simulationConfig.SPLAT_RADIUS;
        ui.palette.value = simulationConfig.PALETTE;

        if (simulationConfig.DYE_RESOLUTION >= 1024) ui.quality.value = "high";
        else if (simulationConfig.DYE_RESOLUTION >= 512) ui.quality.value = "medium";
        else ui.quality.value = "low";

        // Listeners
        ui.toggleBtn.addEventListener('click', () => ui.panel.classList.toggle('minimized'));
        ui.bloom.addEventListener('input', (e) => { simulationConfig.BLOOM_INTENSITY = parseFloat(e.target.value); document.getElementById('val-bloom').innerText = simulationConfig.BLOOM_INTENSITY; });
        ui.sunrays.addEventListener('change', (e) => { simulationConfig.SUNRAYS = e.target.checked; updateKeywords(); });
        ui.shading.addEventListener('change', (e) => { simulationConfig.SHADING = e.target.checked; updateKeywords(); });
        ui.grain.addEventListener('change', (e) => { simulationConfig.FILM_GRAIN = e.target.checked; updateKeywords(); });
        ui.aberration.addEventListener('change', (e) => { simulationConfig.CHROMATIC_ABERRATION = e.target.checked; updateKeywords(); });
        ui.autoSplat.addEventListener('change', (e) => { simulationConfig.AUTO_SPLAT = e.target.checked; });
        ui.paused.addEventListener('change', (e) => { simulationConfig.PAUSED = e.target.checked; });
        ui.curl.addEventListener('input', (e) => { simulationConfig.CURL = parseFloat(e.target.value); document.getElementById('val-curl').innerText = simulationConfig.CURL; });
        ui.density.addEventListener('input', (e) => { simulationConfig.DENSITY_DISSIPATION = parseFloat(e.target.value); document.getElementById('val-dissipation').innerText = simulationConfig.DENSITY_DISSIPATION; });
        ui.velocity.addEventListener('input', (e) => { simulationConfig.VELOCITY_DISSIPATION = parseFloat(e.target.value); document.getElementById('val-velocity').innerText = simulationConfig.VELOCITY_DISSIPATION; });
        ui.radius.addEventListener('input', (e) => { simulationConfig.SPLAT_RADIUS = parseFloat(e.target.value); document.getElementById('val-radius').innerText = simulationConfig.SPLAT_RADIUS; });
        ui.palette.addEventListener('change', (e) => { simulationConfig.PALETTE = e.target.value; });
        ui.quality.addEventListener('change', (e) => {
            const q = e.target.value;
            if (q === 'low') { simulationConfig.DYE_RESOLUTION = 256; simulationConfig.SIM_RESOLUTION = 128; }
            else if (q === 'medium') { simulationConfig.DYE_RESOLUTION = 512; simulationConfig.SIM_RESOLUTION = 256; }
            else { simulationConfig.DYE_RESOLUTION = 1024; simulationConfig.SIM_RESOLUTION = 512; }
            initFramebuffers();
        });
        ui.screenshotBtn.addEventListener('click', () => {
            simCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `splash-cursor-${Date.now()}.png`;
                a.click();
            });
        });
        ui.resetBtn.addEventListener('click', () => {
            simulationConfig = { ...INITIAL_CONFIG };
            if (window.innerWidth < 600) { simulationConfig.SPLAT_RADIUS = 0.6; simulationConfig.SPLAT_FORCE = 1500; }
            setupUI(); // Refresh UI values
            updateKeywords();
            initFramebuffers();
        });
    }

    function attachListeners() {
        window.addEventListener('mousedown', e => {
            let pointer = activePointers[0];
            let posX = scaleByPixelRatio(e.clientX);
            let posY = scaleByPixelRatio(e.clientY);
            updatePointerDownData(pointer, -1, posX, posY);
            clickSplat(pointer);
        });

        window.addEventListener('mousemove', e => {
            let pointer = activePointers[0];
            let posX = scaleByPixelRatio(e.clientX);
            let posY = scaleByPixelRatio(e.clientY);
            updatePointerMoveData(pointer, posX, posY, pointer.color);
        });

        // Corrected code for script.js
        window.addEventListener('touchstart', e => {
            // e.preventDefault();  <-- REMOVED
            const touches = e.targetTouches;
            for (let i = 0; i < touches.length; i++) {
                if (i >= activePointers.length) break;
                let pointer = activePointers[i];
                let posX = scaleByPixelRatio(touches[i].clientX);
                let posY = scaleByPixelRatio(touches[i].clientY);
                updatePointerDownData(pointer, touches[i].identifier, posX, posY);
            }
        }, { passive: true }); // <-- CHANGED TO TRUE

        window.addEventListener('touchmove', e => {
            // e.preventDefault(); <-- REMOVED
            const touches = e.targetTouches;
            for (let i = 0; i < touches.length; i++) {
                if (i >= activePointers.length) break;
                let pointer = activePointers[i];
                let posX = scaleByPixelRatio(touches[i].clientX);
                let posY = scaleByPixelRatio(touches[i].clientY);
                updatePointerMoveData(pointer, posX, posY, pointer.color);
            }
        }, { passive: true }); // <-- CHANGED TO TRUE

        window.addEventListener('touchend', e => {
            const touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                let pointer = activePointers.find(p => p.id === touches[i].identifier);
                if (pointer) updatePointerUpData(pointer);
            }
        });
    }

    function updatePointerDownData(pointer, id, posX, posY) {
        pointer.id = id;
        pointer.down = true;
        pointer.moved = false;
        pointer.texcoordX = posX / simCanvas.width;
        pointer.texcoordY = 1.0 - posY / simCanvas.height;
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.deltaX = 0;
        pointer.deltaY = 0;
        pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer, posX, posY, color) {
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.texcoordX = posX / simCanvas.width;
        pointer.texcoordY = 1.0 - posY / simCanvas.height;
        pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
        pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
        pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
        pointer.color = color;
    }

    function updatePointerUpData(pointer) { pointer.down = false; }
    function correctDeltaX(delta) { let aspectRatio = simCanvas.width / simCanvas.height; if (aspectRatio < 1) delta *= aspectRatio; return delta; }
    function correctDeltaY(delta) { let aspectRatio = simCanvas.width / simCanvas.height; if (aspectRatio > 1) delta /= aspectRatio; return delta; }

    function generateColor(t = Date.now() / 1000) {
        let c = { r: 0, g: 0, b: 0 };
        switch (simulationConfig.PALETTE) {
            case 'fire': c.r = 0.8 + 0.2 * Math.sin(t * 3); c.g = 0.25 + 0.25 * Math.sin(t * 2 + 2); c.b = 0.1; break;
            case 'ocean': c.r = 0.1; c.g = 0.4 + 0.3 * Math.sin(t * 2); c.b = 0.8 + 0.2 * Math.sin(t * 4); break;
            case 'toxic': c.r = 0.1; c.g = 0.8 + 0.2 * Math.sin(t * 4); c.b = 0.1 + 0.1 * Math.sin(t); break;
            case 'mono': let v = 0.6 + 0.4 * Math.sin(t * 3); c.r = v; c.g = v; c.b = v; break;
            case 'sinebow': default: c.r = 0.5 + 0.5 * Math.sin(t); c.g = 0.5 + 0.5 * Math.sin(t + 2); c.b = 0.5 + 0.5 * Math.sin(t + 4); c.r *= 0.25; c.g *= 0.25; c.b *= 0.25; return c;
        }
        c.r *= 0.15; c.g *= 0.15; c.b *= 0.15;
        return c;
    }

    function updateColors(dt) {
        if (!simulationConfig.COLOR_UPDATE_SPEED) return;
        let time = Date.now() / 1000;
        activePointers.forEach(p => { p.color = generateColor(time); });
    }

    function checkAutoSplat() {
        if (!simulationConfig.AUTO_SPLAT) return;
        let now = Date.now();
        if (now - splatTime > simulationConfig.AUTO_SPLAT_INTERVAL) {
            splatTime = now;
            const x = Math.random();
            const y = Math.random();
            const dx = (Math.random() - 0.5) * 5000;
            const dy = (Math.random() - 0.5) * 5000;
            const color = generateColor();
            color.r *= 5.0; color.g *= 5.0; color.b *= 5.0;
            splat(x, y, dx, dy, color);
        }
    }

    function splatPointer(pointer) {
        let dx = pointer.deltaX * simulationConfig.SPLAT_FORCE;
        let dy = pointer.deltaY * simulationConfig.SPLAT_FORCE;
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer) {
        const color = generateColor();
        color.r *= 10.0; color.g *= 10.0; color.b *= 10.0;
        let dx = 10 * (Math.random() - 0.5);
        let dy = 30 * (Math.random() - 0.5);
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(x, y, dx, dy, color) {
        splatProgram.bind();
        gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
        gl.uniform1f(splatProgram.uniforms.aspectRatio, simCanvas.width / simCanvas.height);
        gl.uniform2f(splatProgram.uniforms.point, x, y);
        gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
        gl.uniform1f(splatProgram.uniforms.radius, correctRadius(simulationConfig.SPLAT_RADIUS / 100.0));
        blit(velocity.write);
        velocity.swap();

        gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
        gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
        blit(dye.write);
        dye.swap();
    }

    function correctRadius(radius) {
        let aspectRatio = simCanvas.width / simCanvas.height;
        if (aspectRatio > 1) radius *= aspectRatio;
        return radius;
    }

    function scaleByPixelRatio(input) {
        const pixelRatio = window.devicePixelRatio || 1;
        return Math.floor(input * pixelRatio);
    }

    function hashCode(s) {
        if (s.length === 0) return 0;
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            hash = (hash << 5) - hash + s.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    function applyInputs() {
        if (activePointers.length > 0) {
            activePointers.forEach(p => {
                if (p.moved) {
                    p.moved = false;
                    splatPointer(p);
                }
            });
        }
    }

    // Start
    init();

})();
// ... existing code ...

// --- BENTO EMAIL FORM LOGIC ---
const emailForm = document.getElementById('bento-email-form');
const successOverlay = document.getElementById('email-success-overlay');
const submitBtn = document.getElementById('btn-submit-email');

// Configuration
const FORM_ENDPOINT = "https://formsubmit.co/ajax/shashankan077@gmail.com";

if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Get Values
        const from = document.getElementById('email-from').value;
        const subject = document.getElementById('email-subject').value;
        const message = document.getElementById('email-message').value;
        const originalBtnText = submitBtn.innerHTML;

        // 2. Set Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;

        // 3. Send Data via Fetch
        fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: from,
                _subject: subject || "Portfolio Contact Form",
                message: message,
                _captcha: "false" // Disable captcha for smoother experience
            })
        })
            .then(response => response.json())
            .then(data => {
                // 4. Show Success
                successOverlay.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
                successOverlay.classList.add('opacity-100', 'scale-100');

                // 5. Trigger Confetti (reuse existing function)
                if (typeof triggerConfetti === 'function') {
                    const rect = emailForm.getBoundingClientRect();
                    const x = (rect.left + rect.width / 2) / window.innerWidth;
                    const y = (rect.top + rect.height / 2) / window.innerHeight;
                    triggerConfetti(x, y);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Oops! Something went wrong. Please check your connection.");
            })
            .finally(() => {
                // Reset Button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
}

function resetEmailForm() {
    if (emailForm) emailForm.reset();
    if (successOverlay) {
        successOverlay.classList.remove('opacity-100', 'scale-100');
        successOverlay.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
    }
}
