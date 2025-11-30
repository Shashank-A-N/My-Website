// --- Navigation ---
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenu.addEventListener('click', () => navMenu.classList.toggle('active'));
navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

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

// --- Animate Skill Bars ---
const skillsSection = document.querySelector('.skills');
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-progress') + '%';
            });
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    observeSkills.observe(skillsSection);
}

// --- Project Modal ---
const projectData = {
    project1: {
        title: 'Hybrid Li-Fi and Wi-Fi Communication System',
        description: 'Developed an innovative communication system that combines the high-speed capabilities of Li-Fi technology with the widespread accessibility of Wi-Fi. This project demonstrates how visible light communication can be integrated with traditional wireless networks to create a more robust and efficient data transmission system.',
        technologies: ['Arduino Uno R3', 'Embedded C', 'Arduino IDE', 'LED Communication', 'Wi-Fi Modules'],
        features: ['Dual-mode communication switching', 'High-speed data transmission via Li-Fi', 'Fallback to Wi-Fi when Li-Fi unavailable', 'Real-time protocol switching', 'Energy-efficient design'],
        challenges: 'Synchronizing between Li-Fi and Wi-Fi protocols, managing interference, and ensuring seamless switching between communication modes.',
        outcome: 'Successfully demonstrated 50% improvement in data transmission reliability and 30% reduction in power consumption compared to Wi-Fi-only systems.'
    },
    project2: {
        title: 'Face Recognition Attendance System',
        description: 'Built an automated attendance tracking system using computer vision and machine learning techniques. The system captures real-time video, detects faces, and marks attendance automatically, eliminating the need for manual attendance tracking.',
        technologies: ['Python', 'OpenCV', 'NumPy', 'Pandas', 'Machine Learning', 'SQLite'],
        features: ['Real-time face detection and recognition', 'Automated attendance marking', 'Database integration for record keeping', 'User-friendly GUI interface', 'Attendance report generation'],
        challenges: 'Handling varying lighting conditions, improving recognition accuracy, and managing multiple face detection simultaneously.',
        outcome: 'Achieved 95% accuracy in face recognition and reduced attendance marking time by 80% compared to manual methods.'
    },
    project3: {
        title: 'Personal Portfolio Website',
        description: 'Designed and developed a responsive web-based portfolio to showcase my skills, projects, and experience. The site features a clean, modern design with smooth animations and interactive elements to provide an engaging user experience.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        features: ['Interactive and responsive UI', 'Smooth scrolling and animations', 'Project modal for detailed views', 'Contact form integration'],
        challenges: 'Ensuring cross-browser compatibility and optimizing performance for a smooth user experience on all devices.',
        outcome: 'A professional and visually appealing personal website that effectively highlights my capabilities as a developer.'
    },
    project4: {
        title: 'Task Manager - A Modern To-Do Application',
        description: 'Task Manager is a sleek, modern, and fully interactive to-do list application designed with a beautiful "liquid glass" (glassmorphism) aesthetic. It\'s a single-page application built with vanilla HTML, CSS, and JavaScript, making it lightweight, fast, and easy to run anywhere. All tasks are saved locally in your browser, so your data persists between sessions without needing a backend or database.',
        technologies: ['HTML5', 'Tailwind CSS', 'JavaScript (ES6+)', 'Local Storage'],
        features: [
            'Stunning Glassmorphism UI.',
            'Persistent local storage for tasks.',
            'Custom-built, interactive calendar for date selection.',
            'Beautiful, draggable analog clock for time selection.',
            'Due date browser notifications (with permission).',
            'Fully responsive and has zero dependencies.'
        ],
        challenges: 'This project showcases advanced UI/UX concepts, including custom-built, interactive modals for date and time selection, dynamic DOM manipulation, and a responsive design that works beautifully on all devices.',
        outcome: 'A fully functional and visually appealing Task Manager that works smoothly on all devices, demonstrating advanced frontend skills without relying on any frameworks.'
    },
    project5: {
        title: 'Shadow PDF - AI-Powered PDF Toolkit',
        description: 'Shadow PDF is your all-in-one AI-powered document management and PDF toolkit. This web-based platform provides a seamless experience to summarize, edit, convert, compress, and manipulate your documents in just a few clicks — all from the browser, with no installations needed.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'OpenAI API', 'PDF.js', 'jsPDF'],
        features: [
            'AI Document Summarizer & Q&A with your document.',
            'Full suite of PDF editing tools (Merge, Split, Modify pages).',
            'Comprehensive conversion tools (PDF to Word, Images to PDF, etc.).',
            'Efficient PDF compression without quality loss.',
            'Completely web-based, privacy-focused, and user-friendly.'
        ],
        challenges: 'Integrating multiple third-party libraries (PDF.js, jsPDF) and the OpenAI API into a cohesive and performant application. Ensuring secure and efficient handling of user-uploaded files was a top priority.',
        outcome: 'The result is a powerful, all-in-one PDF management tool that leverages AI to provide advanced features typically found in premium desktop software, but accessible to anyone through a web browser.'
    },
        project6: {
        title: 'Namma BMTC AI Mitra',
        description: 'Namma BMTC AI Mitra is a modern, AI-powered, and offline-first web application designed to simplify navigating Bengaluru\'s extensive BMTC bus network. It intelligently combines the power of Google\'s Gemini AI for complex route planning with a robust offline database for unmatched reliability.',
        technologies: ['React', 'Tailwind CSS', 'Google Gemini API', 'JavaScript (ES6+)', 'Offline-First'],
        features: [
            'AI-Powered Route Suggestions with connecting routes and fares.',
            'Dual-Engine Search with seamless offline fallback.',
            'Comprehensive offline database of over 770 routes.',
            'Resilient API key pooling system to maximize uptime.',
            'Modern, responsive UI with smart autocomplete search.'
        ],
        challenges: 'Building a resilient hybrid system that gracefully switches between AI and offline modes. Another key challenge was compiling a comprehensive offline database from official documents and implementing an effective API key rotation strategy to handle rate limits.',
        outcome: 'An intelligent and reliable bus navigation tool that ensures users can find routes even without an internet connection, showcasing a robust offline-first architecture combined with cutting-edge AI.'
    },
    project7: {
        title: 'YouTube Multi-Alarm Scheduler',
        description: 'A dynamic, single-page web application that allows you to schedule multiple YouTube videos or playlists to automatically play at specific times, enhancing your productivity, study sessions, or entertainment routines.',
        technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Tailwind CSS', 'Open-Meteo API'],
        features: [
            'Schedule multiple alarms with no restrictions.',
            'Flexible scheduling: specific times or countdown timers.',
            'Real-time visual status for each alarm (Scheduled, Playing, Finished).',
            'Smart tab management: new tab, same tab, or reuse one tab.',
            'Dynamic UI theming based on time of day and local weather.',
            'Popup blocker detection and user notification.'
        ],
        challenges: 'Managing multiple concurrent timers accurately with JavaScript\'s `setTimeout`. Implementing the dynamic theming based on asynchronous weather API calls without causing layout shifts. Gracefully handling browser popup-blocking behavior.',
        outcome: 'A robust and user-friendly scheduling tool that enhances productivity and entertainment by automating video playback. The project successfully integrates external APIs and demonstrates complex state management in a single-page application.'
    },
    project8: {
        title: '3D Home Design Studio',
        description: 'A powerful and intuitive web-based 3D home design tool that allows users to create, visualize, and modify home layouts directly in the browser. Built with modern web technologies, it offers a seamless and responsive experience across all devices.',
        technologies: ['Three.js', 'React', 'JavaScript', 'HTML5', 'Tailwind CSS'],
        features: ['Real-time 3D rendering', 'Drag-and-drop interface', 'Customizable furniture library', 'Cross-device compatibility', 'Save/Load designs'],
        challenges: 'Optimizing 3D performance in the browser, implementing intuitive user controls for 3D manipulation, and ensuring data persistence for user designs.',
        outcome: 'A highly interactive and user-friendly home design application that makes architectural visualization accessible to everyone.'
    },
    project9: {
        title: 'Interview Cracker AI 🚀',
        description: 'Interview Cracker AI is your personal, AI-powered coach for acing job interviews! This lightweight, single-file web application helps you prepare for every stage of the interview process—from aptitude tests to final HR rounds. Powered by the Gemini API, it provides personalized prep plans, realistic practice sessions, and intelligent feedback to get you job-ready.',
        technologies: ['Gemini API', 'React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5'],
        features: ['Personalized interview prep plans', 'AI-driven mock interviews', 'Real-time feedback on answers', 'Covers aptitude, technical, and HR rounds', 'Lightweight and fast single-page app'],
        challenges: 'Crafting effective prompts for the Gemini API to simulate realistic interview scenarios. Processing and displaying AI feedback in a constructive and easy-to-understand manner. Ensuring a low-latency experience during interactive sessions.',
        outcome: 'A comprehensive and intelligent interview preparation tool that helps users build confidence and significantly improve their performance in real interviews.'
    },
    project10: {
        title: 'PPT <=> PDF Converter',
        description: 'A cross-platform desktop application for converting PowerPoint presentations (.ppt, .pptx) to PDF format and vice versa.',
        technologies: ['Python', 'Tkinter', 'pywin32 (for PPT)', 'PyMuPDF (for PDF)', 'Desktop App'],
        features: ['Bidirectional conversion (PPT to PDF, PDF to PPT)', 'Batch processing of files', 'Simple and clean user interface', 'Cross-platform support (Windows, macOS, Linux)'],
        challenges: 'Maintaining original formatting and layout during conversion. Handling large files efficiently without crashing. Packaging the Python application into a standalone executable for different operating systems.',
        outcome: 'A reliable and easy-to-use desktop utility that simplifies the process of converting between PowerPoint and PDF formats.'
    },
    project11: {
        title: 'ESG Handler & Timesheet Dashboard',
        description: 'A comprehensive, single-page web application designed to help businesses and individuals track Environmental, Social, and Governance (ESG) metrics alongside efficient employee time management.',
        technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'Chart.js'],
        features: [
            'Dashboard for visualizing key ESG metrics.',
            'Data entry forms for Environmental, Social, and Governance criteria.',
            'Employee timesheet submission and tracking.',
            'Interactive charts to monitor progress over time.',
            'Single-page application design for a seamless user experience.'
        ],
        challenges: 'Designing a unified and intuitive interface for two distinct types of data (qualitative ESG metrics and quantitative timesheet data). Creating meaningful and easy-to-understand visualizations for complex ESG information. Ensuring the application is responsive and functional across all devices.',
        outcome: 'An integrated web tool that empowers organizations to monitor their sustainability initiatives and workforce productivity from a single, cohesive dashboard, promoting data-driven decision-making.'
    },
    project12: {
        title: 'AI Voice Generator & Document Reader',
        description: 'Users can type text directly or upload documents (PDF, DOCX, PPTX) to extract text automatically and convert it into audio using AI-powered text-to-speech.',
        technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'Dockerfile', 'Python'],
        features: [
            'AI-powered text-to-speech conversion from direct text input.',
            'Supports uploading PDF, DOCX, and PPTX files.',
            'Automatically extracts text content from various document formats.',
            'Python backend for robust document processing.',
            'Containerized with Docker for consistent and scalable deployment.'
        ],
        challenges: 'Accurately parsing and extracting clean, readable text from complex document layouts (e.g., multi-column PDFs, presentations with speaker notes). Integrating the frontend with a Python backend for file processing. Optimizing the voice generation for clarity and natural intonation.',
        outcome: 'A powerful and accessible web application that transforms written content from multiple sources into high-quality audio, making information more accessible for users.'
    },
    project13: {
        title: 'Remote Screen Viewer & Controller',
        description: 'Enables real-time screen sharing and remote control between devices directly in the browser using secure WebRTC P2P connections.',
        technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'PeerJS', 'WebRTC'],
        features: [
            'Real-time screen sharing from host to controller.',
            'Remote click interaction from controller to host.',
            'Easy and secure connection setup via QR codes.',
            'No installation required; runs entirely in the browser.',
            'Direct peer-to-peer connection for privacy and low latency.'
        ],
        challenges: 'Establishing stable WebRTC connections across various network types (NAT traversal). Minimizing latency for a responsive remote control experience. Gracefully handling connection drops and implementing a reconnection mechanism.',
        outcome: 'A fully functional, web-based remote support and screen sharing tool that prioritizes ease of use and security by leveraging modern peer-to-peer web technologies.'
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const project = projectData[projectId];
    if (!project) return;

    modalContent.innerHTML = `
        <h2 style="margin-bottom: 1rem;">${project.title}</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
        <div style="margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;">Technologies:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${project.technologies.map(tech => `<span class="tech-span">${tech}</span>`).join('')}
            </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;">Features:</h3>
            <ul style="padding-left: 1.5rem;">
                ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
            </ul>
        </div>
        <div>
            <h3 style="margin-bottom: 0.5rem;">Outcome:</h3>
            <p style="line-height: 1.6;">${project.outcome}</p>
        </div>
    `;
    modal.style.display = 'block';
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('projectModal')) {
        closeProjectModal();
    }
});

// --- Role Animation ---
const roleAnimElement = document.getElementById('role-anim');
const roles = ["Learner", "Creator", "Explorer", "Student"];
let currentRoleIndex = 0;

setInterval(() => {
    roleAnimElement.style.animationName = 'fade-out-subtle';

    setTimeout(() => {
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        roleAnimElement.textContent = roles[currentRoleIndex];
        roleAnimElement.style.animationName = 'fade-in-rise';
    }, 400); // This must match the CSS animation duration
}, 2000); // Change every 2 seconds

// --- Theme Switcher ---
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Load theme from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
});


// --- JavaScript for the Infinite Scroller --- 
const scroller = document.querySelector(".scroller");

// Check if the user prefers reduced motion. If so, we don't add the animation.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // Duplicate the items inside the scroller to create a seamless loop.
    scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        // aria-hidden=true is important for accessibility so screen readers
        // don't read the duplicated content.
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
    });
}

// --- WATER SIMULATION BACKGROUND ---
(function () {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    // Configuration
    const CONFIG = {
        simRes: 256,
        meshRes: 256,
        viscosity: 0.985,
        waveSpeed: 2.0,
        mouseSize: 0.05,
        mouseStrength: 0.2, // Slightly stronger for effect
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
    let geometrySize = 1; // Tracks the dynamic scale of the water plane

    // Shader Code
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

        // Position Canvas
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.zIndex = '-1'; // Behind content

        homeSection.appendChild(renderer.domElement);
        // Ensure home section has relative positioning for the absolute canvas to work
        homeSection.style.position = 'relative';

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Front View Camera
        camera = new THREE.PerspectiveCamera(45, homeSection.clientWidth / homeSection.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 3.5);
        camera.lookAt(0, 0, 0);

        setupSimulation();
        setupWater();
        setupFloor();

        // Initial sizing
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
        // Create a 1x1 geometry that we can scale dynamically
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
        // Create a 1x1 geometry that we can scale dynamically
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
        // Calculate mouse relative to the home section, not the window
        const relX = x - rect.left;
        const relY = y - rect.top;

        const ndc = new THREE.Vector2(
            (relX / rect.width) * 2 - 1,
            -(relY / rect.height) * 2 + 1
        );

        raycaster.setFromCamera(ndc, camera);
        const target = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(target, intersectPoint);

        if (intersectPoint) {
            // Map world space to UV space (0 to 1) based on current geometry size
            // The mesh is centered at 0,0 and has size 'geometrySize'
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

        // Dynamically scale the planes to cover the viewport at the camera's Z distance
        const dist = camera.position.z;
        const vFOV = THREE.Math.degToRad(camera.fov); // Vertical FOV in radians

        // Visible height at Z=0 (approximate water level)
        const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
        // Visible width
        const visibleWidth = visibleHeight * camera.aspect;

        // Set geometry size to cover the largest dimension (Square simulation space)
        // Add a small buffer (1.1) to avoid edge artifacts
        geometrySize = Math.max(visibleWidth, visibleHeight) * 1.1;

        if (waterMesh) waterMesh.scale.set(geometrySize, geometrySize, 1);
        if (floorMesh) floorMesh.scale.set(geometrySize, geometrySize, 1);
    }

    function animate() {
        requestAnimationFrame(animate);
        simMesh.material.uniforms.uTexture.value = renderTargetB.texture;
        renderer.setRenderTarget(renderTargetA);
        renderer.render(simScene, simCamera);

        const temp = renderTargetA;
        renderTargetA = renderTargetB;
        renderTargetB = temp;

        renderer.setRenderTarget(null);
        waterMesh.material.uniforms.uHeightMap.value = renderTargetB.texture;
        floorMesh.material.uniforms.uWaterHeight.value = renderTargetB.texture;
        renderer.render(scene, camera);
    }

    init();
})();
