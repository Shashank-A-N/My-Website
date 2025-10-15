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
