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
        title: 'Task Manager Web App',
        description: 'The Task Manager is a web application designed to help users manage their daily tasks efficiently. Users can add tasks, mark them as completed or undone, and delete them as needed. The app is fully responsive and visually interactive.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'DOM Manipulation', 'Local Storage'],
        features: ['Add, delete, complete and undo tasks', 'Responsive and clean UI design', 'Real-time task list rendering', 'Local storage support for data persistence', 'Interactive feedback on task status'],
        challenges: 'Ensuring real-time updates on UI for every action without reloading and maintaining task state using local storage effectively.',
        outcome: 'Successfully created a fully functional Task Manager that works smoothly on both desktop and mobile devices, enhancing productivity for users.'
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