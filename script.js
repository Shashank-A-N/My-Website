
// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars when they come into view
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress', progress + '%');
                bar.style.width = progress + '%';
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observeSkills.observe(skillsSection);
}

// Animate elements on scroll
const observeElements = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observeElements.observe(section);
});

// Project modal functionality
const projectData = {
    project1: {
        title: 'Hybrid Li-Fi and Wi-Fi Communication System',
        description: 'Developed an innovative communication system that combines the high-speed capabilities of Li-Fi technology with the widespread accessibility of Wi-Fi. This project demonstrates how visible light communication can be integrated with traditional wireless networks to create a more robust and efficient data transmission system.',
        technologies: ['Arduino Uno R3', 'Embedded C', 'Arduino IDE', 'LED Communication', 'Wi-Fi Modules'],
        features: [
            'Dual-mode communication switching',
            'High-speed data transmission via Li-Fi',
            'Fallback to Wi-Fi when Li-Fi unavailable',
            'Real-time protocol switching',
            'Energy-efficient design'
        ],
        challenges: 'Synchronizing between Li-Fi and Wi-Fi protocols, managing interference, and ensuring seamless switching between communication modes.',
        outcome: 'Successfully demonstrated 50% improvement in data transmission reliability and 30% reduction in power consumption compared to Wi-Fi-only systems.'
    },
    project2: {
        title: 'Face Recognition Attendance System',
        description: 'Built an automated attendance tracking system using computer vision and machine learning techniques. The system captures real-time video, detects faces, and marks attendance automatically, eliminating the need for manual attendance tracking.',
        technologies: ['Python', 'OpenCV', 'NumPy', 'Pandas', 'Machine Learning', 'SQLite'],
        features: [
            'Real-time face detection and recognition',
            'Automated attendance marking',
            'Database integration for record keeping',
            'User-friendly GUI interface',
            'Attendance report generation'
        ],
        challenges: 'Handling varying lighting conditions, improving recognition accuracy, and managing multiple face detection simultaneously.',
        outcome: 'Achieved 95% accuracy in face recognition and reduced attendance marking time by 80% compared to manual methods.'
    },
    project3: {
        title: 'Stock Price Prediction Dashboard (Frontend)',
        description: 'Designed and developed a responsive web-based dashboard to visualize stock price trends and predictions using static and sample market data. The project focuses on user experience, interactive charts, and real-time data representation using HTML, CSS, and JavaScript.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
        features: [
            'Interactive line and candlestick charts for stock visualization',
            'Responsive UI with modern design elements',
            'Dropdowns to select different stocks and time ranges',
            'Static prediction overlays based on sample data',
            'Animated transitions for smooth user interaction'
        ],
        challenges: 'Creating visually appealing yet informative data displays, ensuring responsiveness across devices, and simulating predictive insights without backend logic.',
        outcome: 'Successfully built a clean and engaging stock dashboard that demonstrates key frontend skills and mimics real-time market data interactions.'
    }

};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const project = projectData[projectId];

    if (!project) return;

    modalContent.innerHTML = `
        <h2 style="color: #2d3748; margin-bottom: 1rem;">${project.title}</h2>
        <p style="color: #4a5568; margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
        
        <div style="margin-bottom: 1.5rem;">
            <h3 style="color: #2d3748; margin-bottom: 0.5rem;">Technologies Used:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${project.technologies.map(tech => 
                    `<span style="background: #e6fffa; color: #38b2ac; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">${tech}</span>`
                ).join('')}
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h3 style="color: #2d3748; margin-bottom: 0.5rem;">Key Features:</h3>
            <ul style="color: #4a5568; padding-left: 1.5rem;">
                ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
            </ul>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h3 style="color: #2d3748; margin-bottom: 0.5rem;">Challenges & Solutions:</h3>
            <p style="color: #4a5568; line-height: 1.6;">${project.challenges}</p>
        </div>

        <div>
            <h3 style="color: #2d3748; margin-bottom: 0.5rem;">Outcome:</h3>
            <p style="color: #4a5568; line-height: 1.6;">${project.outcome}</p>
        </div>
    `;

    modal.style.display = 'block';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Contact form submission
function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
}

// Download resume function
function downloadResume() {
    // In a real implementation, this would download an actual PDF file
    const link = document.createElement('a');
    link.href = 'PentagonSpace_shashank.pdf'; // Path to your PDF file
    link.download = 'PentagonSpace_shashank.pdf'; // Suggested download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Set initial body opacity
document.body.style.opacity = '0';

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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
