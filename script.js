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

// --- Active Nav Link on Scroll ---
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
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
   WATER SIMULATION BACKGROUND
   ========================================= */
(function () {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const CONFIG = {
        simRes: 256,
        meshRes: 256,
        viscosity: 0.985,
        waveSpeed: 2.0,
        mouseSize: 0.05,
        mouseStrength: 0.2,
        waterColor: new THREE.Color('#006994'),
        deepColor: new THREE.Color('#001e36'),
        lightPos: new THREE.Vector3(10, 20, 10)
    };

    let scene, camera, renderer;
    let simScene, simCamera, simMesh;
    let renderTargetA, renderTargetB;
    let waterMesh, floorMesh;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2(9999, 9999);
    let geometrySize = 1;

    const simVertexShader = `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `;

    const simFragmentShader = `
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform float uMouseActive;
        uniform float uViscosity;
        uniform float uWaveSpeed;
        uniform float uMouseSize;
        uniform float uMouseStrength;
        uniform vec2 uResolution;
        varying vec2 vUv;
        void main() {
            vec2 cellSize = 1.0 / uResolution;
            vec4 state = texture2D(uTexture, vUv);
            float height = state.r;
            float vel = state.g;
            float up = texture2D(uTexture, vUv + vec2(0.0, cellSize.y)).r;
            float down = texture2D(uTexture, vUv + vec2(0.0, -cellSize.y)).r;
            float left = texture2D(uTexture, vUv + vec2(-cellSize.x, 0.0)).r;
            float right = texture2D(uTexture, vUv + vec2(cellSize.x, 0.0)).r;
            float avg = (up + down + left + right) * 0.25;
            float accel = (avg - height) * uWaveSpeed;
            vel += accel;
            vel *= uViscosity;
            height += vel;
            float d = distance(vUv, uMouse);
            if (uMouseActive > 0.5 && d < uMouseSize) {
                float force = (1.0 - d / uMouseSize);
                height -= force * uMouseStrength; 
            }
            gl_FragColor = vec4(height, vel, 0.0, 1.0);
        }
    `;

    const waterVertexShader = `
        uniform sampler2D uHeightMap;
        varying vec2 vUv;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;
        void main() {
            vUv = uv;
            float h = texture2D(uHeightMap, uv).r;
            vec3 pos = position;
            pos.z += h * 2.0;
            vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
            vWorldPosition = worldPosition.xyz;
            vec4 mvPosition = viewMatrix * worldPosition;
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const waterFragmentShader = `
        uniform sampler2D uHeightMap;
        uniform vec3 uColor;
        uniform vec3 uDeepColor;
        uniform vec3 uLightPos;
        uniform vec2 uResolution;
        varying vec2 vUv;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;
        vec3 getNormal(vec2 uv) {
            vec2 texel = 1.0 / uResolution;
            float h = texture2D(uHeightMap, uv).r;
            float hRight = texture2D(uHeightMap, uv + vec2(texel.x, 0.0)).r;
            float hUp = texture2D(uHeightMap, uv + vec2(0.0, texel.y)).r;
            return normalize(vec3(h - hRight, h - hUp, 0.05));
        }
        void main() {
            vec3 normal = getNormal(vUv);
            vec3 viewDir = normalize(vViewPosition);
            vec3 lightDir = normalize(uLightPos - vWorldPosition);
            vec3 halfVector = normalize(lightDir + viewDir);
            float fresnel = 0.02 + (1.0 - 0.02) * pow(1.0 - dot(viewDir, normal), 5.0);
            float NdotH = max(0.0, dot(normal, halfVector));
            float specular = pow(NdotH, 100.0) * 1.5;
            float height = texture2D(uHeightMap, vUv).r;
            vec3 waterBase = mix(uDeepColor, uColor, height * 5.0 + 0.5);
            vec3 finalColor = waterBase + vec3(specular) + (fresnel * vec3(0.8, 0.9, 1.0));
            gl_FragColor = vec4(finalColor, 0.9);
        }
    `;

    const floorVertexShader = `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `;

    const floorFragmentShader = `
        uniform sampler2D uWaterHeight;
        varying vec2 vUv;
        void main() {
            float h = texture2D(uWaterHeight, vUv).r;
            float hRight = texture2D(uWaterHeight, vUv + vec2(0.01, 0.0)).r;
            float hUp = texture2D(uWaterHeight, vUv + vec2(0.0, 0.01)).r;
            vec3 normal = normalize(vec3(h - hRight, h - hUp, 0.1));
            vec2 refractedUv = vUv + normal.xy * 0.05;
            vec2 grid = fract(refractedUv * 10.0);
            float lineThickness = 0.05;
            float lines = step(lineThickness, grid.x) * step(lineThickness, grid.y);
            vec3 tileColor = mix(vec3(0.8, 0.9, 1.0), vec3(0.9, 0.95, 1.0), lines);
            float lightFocus = pow(max(0.0, 1.0 - length(normal.xy * 5.0)), 4.0);
            vec3 finalColor = tileColor * (0.8 + lightFocus * 0.5);
            gl_FragColor = vec4(finalColor * vec3(0.5, 0.7, 0.9), 1.0);
        }
    `;

    function init() {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(homeSection.clientWidth, homeSection.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.zIndex = '-1';
        homeSection.appendChild(renderer.domElement);
        homeSection.style.position = 'relative';

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        camera = new THREE.PerspectiveCamera(45, homeSection.clientWidth / homeSection.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 3.5);
        camera.lookAt(0, 0, 0);

        setupSimulation();
        setupWater();
        setupFloor();
        onWindowResize();

        window.addEventListener('resize', onWindowResize, false);
        homeSection.addEventListener('mousemove', onMouseMove, false);
        homeSection.addEventListener('touchmove', onTouchMove, false);

        animate();
    }

    function setupSimulation() {
        simScene = new THREE.Scene();
        simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const simGeometry = new THREE.PlaneGeometry(2, 2);
        const simMaterial = new THREE.ShaderMaterial({
            vertexShader: simVertexShader,
            fragmentShader: simFragmentShader,
            uniforms: {
                uTexture: { value: null },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uMouseActive: { value: 0.0 },
                uMouseSize: { value: CONFIG.mouseSize },
                uMouseStrength: { value: CONFIG.mouseStrength },
                uViscosity: { value: CONFIG.viscosity },
                uWaveSpeed: { value: CONFIG.waveSpeed },
                uResolution: { value: new THREE.Vector2(CONFIG.simRes, CONFIG.simRes) }
            }
        });
        simMesh = new THREE.Mesh(simGeometry, simMaterial);
        simScene.add(simMesh);
        renderTargetA = new THREE.WebGLRenderTarget(CONFIG.simRes, CONFIG.simRes, { type: THREE.FloatType });
        renderTargetB = new THREE.WebGLRenderTarget(CONFIG.simRes, CONFIG.simRes, { type: THREE.FloatType });
    }

    function setupWater() {
        const geometry = new THREE.PlaneGeometry(1, 1, CONFIG.meshRes, CONFIG.meshRes);
        const material = new THREE.ShaderMaterial({
            vertexShader: waterVertexShader,
            fragmentShader: waterFragmentShader,
            uniforms: {
                uHeightMap: { value: null },
                uColor: { value: CONFIG.waterColor },
                uDeepColor: { value: CONFIG.deepColor },
                uLightPos: { value: CONFIG.lightPos },
                uResolution: { value: new THREE.Vector2(CONFIG.simRes, CONFIG.simRes) }
            },
            transparent: true,
            side: THREE.DoubleSide
        });
        waterMesh = new THREE.Mesh(geometry, material);
        scene.add(waterMesh);
    }

    function setupFloor() {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.ShaderMaterial({
            vertexShader: floorVertexShader,
            fragmentShader: floorFragmentShader,
            uniforms: { uWaterHeight: { value: null } }
        });
        floorMesh = new THREE.Mesh(geometry, material);
        floorMesh.position.z = -0.5;
        scene.add(floorMesh);
    }

    function updateMouse(x, y) {
        const rect = homeSection.getBoundingClientRect();
        const relX = x - rect.left;
        const relY = y - rect.top;
        const ndc = new THREE.Vector2((relX / rect.width) * 2 - 1, -(relY / rect.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        const target = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(target, intersectPoint);

        if (intersectPoint) {
            const uvX = (intersectPoint.x + geometrySize / 2) / geometrySize;
            const uvY = (intersectPoint.y + geometrySize / 2) / geometrySize;
            simMesh.material.uniforms.uMouse.value.set(uvX, uvY);
            simMesh.material.uniforms.uMouseActive.value = 1.0;
        } else {
            simMesh.material.uniforms.uMouseActive.value = 0.0;
        }
    }

    function onMouseMove(e) { updateMouse(e.clientX, e.clientY); }
    function onTouchMove(e) {
        if (e.touches.length > 0) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    }

    function onWindowResize() {
        if (!homeSection) return;
        const width = homeSection.clientWidth;
        const height = homeSection.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        const dist = camera.position.z;
        const vFOV = THREE.Math.degToRad(camera.fov);
        const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
        const visibleWidth = visibleHeight * camera.aspect;
        geometrySize = Math.max(visibleWidth, visibleHeight) * 1.1;
        if (waterMesh) waterMesh.scale.set(geometrySize, geometrySize, 1);
        if (floorMesh) floorMesh.scale.set(geometrySize, geometrySize, 1);
    }

    function animate() {
        requestAnimationFrame(animate);
        simMesh.material.uniforms.uTexture.value = renderTargetB.texture;
        renderer.setRenderTarget(renderTargetA);
        renderer.render(simScene, simCamera);
        const temp = renderTargetA; renderTargetA = renderTargetB; renderTargetB = temp;
        renderer.setRenderTarget(null);
        waterMesh.material.uniforms.uHeightMap.value = renderTargetB.texture;
        floorMesh.material.uniforms.uWaterHeight.value = renderTargetB.texture;
        renderer.render(scene, camera);
    }

    init();
})();

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
    initMap(); // Call Map Init

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
