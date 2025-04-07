// Main JavaScript for Faded Footsteps horror game website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and interactive elements
    initHeaderScroll();
    initMobileNav();
    initParallaxEffect();
    initImagePlaceholders();
    initHoverEffects();
    initScrollAnimations();
    initModalSystem();
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile navigation functionality
function initMobileNav() {
    // Add mobile nav button to the DOM if it doesn't exist
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    
    if (!document.querySelector('.mobile-nav-toggle')) {
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.classList.add('mobile-nav-toggle');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        header.appendChild(mobileNavToggle);
        
        mobileNavToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileNavToggle.innerHTML = navList.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile nav when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const offset = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = `${offset * 0.5}px`;
        }
    });
}

// Simulating image placeholders with creepy effects
function initImagePlaceholders() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    
    placeholders.forEach(placeholder => {
        // Add a subtle animated background
        placeholder.style.background = 'linear-gradient(45deg, rgba(20, 20, 20, 1), rgba(50, 10, 10, 0.8))';
        
        // Create a glitch effect element
        const glitchOverlay = document.createElement('div');
        glitchOverlay.classList.add('glitch-overlay');
        glitchOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="rgba(255,0,0,0.03)" width="100" height="1" y="20" /><rect fill="rgba(0,255,255,0.03)" width="100" height="1" y="40" /><rect fill="rgba(255,0,0,0.03)" width="100" height="1" y="60" /><rect fill="rgba(0,255,255,0.03)" width="100" height="1" y="80" /></svg>');
            opacity: 0.3;
            mix-blend-mode: overlay;
            animation: glitch 5s infinite linear alternate-reverse;
        `;
        
        placeholder.appendChild(glitchOverlay);
        
        // Add placeholder icon/text
        if (placeholder.childNodes.length <= 1) {
            const iconElement = document.createElement('div');
            iconElement.innerHTML = placeholder.textContent || 'Image';
            iconElement.style.cssText = `
                font-family: 'Creepster', cursive;
                font-size: 1.5rem;
                color: rgba(255, 255, 255, 0.5);
                text-shadow: 0 0 5px rgba(255, 0, 0, 0.3);
            `;
            placeholder.textContent = '';
            placeholder.appendChild(iconElement);
        }
    });
    
    // Add the glitch animation to stylesheet
    if (!document.querySelector('#glitch-keyframes')) {
        const style = document.createElement('style');
        style.id = 'glitch-keyframes';
        style.textContent = `
            @keyframes glitch {
                0% { transform: translateX(0); }
                20% { transform: translateX(-2px); }
                40% { transform: translateX(2px); }
                60% { transform: translateX(-1px); }
                80% { transform: translateX(1px); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Interactive hover effects
function initHoverEffects() {
    // Add hover glow effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 15px 30px rgba(185, 28, 28, 0.2), 0 0 15px rgba(255, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Add text flicker effect to game title
    const gameTitle = document.querySelector('.game-title');
    if (gameTitle) {
        let flickerInterval;
        
        gameTitle.addEventListener('mouseenter', () => {
            flickerInterval = setInterval(() => {
                const opacity = Math.random() > 0.95 ? '0.7' : '1';
                const offsetX = Math.random() > 0.95 ? '-1px' : '0';
                gameTitle.style.opacity = opacity;
                gameTitle.style.transform = `translateX(${offsetX})`;
            }, 50);
        });
        
        gameTitle.addEventListener('mouseleave', () => {
            clearInterval(flickerInterval);
            gameTitle.style.opacity = '1';
            gameTitle.style.transform = 'translateX(0)';
        });
    }
}

// Scroll animations for elements
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.about-content, .gallery-item, .warning-box, .play-content, .video-container');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elementsToAnimate.forEach(element => {
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Observe element
        observer.observe(element);
    });
}

// Modal system for gallery images
function initModalSystem() {
    // Create modal container if needed
    if (!document.querySelector('.modal-container')) {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        modalContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        const modalClose = document.createElement('button');
        modalClose.classList.add('modal-close');
        modalClose.innerHTML = '&times;';
        modalClose.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        `;
        
        modalContainer.appendChild(modalContent);
        modalContainer.appendChild(modalClose);
        document.body.appendChild(modalContainer);
        
        // Add event listener to close modal
        modalClose.addEventListener('click', () => {
            closeModal();
        });
        
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                closeModal();
            }
        });
    }
    
    // Add click event to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const content = item.innerHTML;
            openModal(content);
        });
    });
    
    // Modal functions
    function openModal(content) {
        const modalContainer = document.querySelector('.modal-container');
        const modalContent = document.querySelector('.modal-content');
        
        modalContent.innerHTML = content;
        modalContainer.style.opacity = '1';
        modalContainer.style.visibility = 'visible';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
        }, 10);
    }
    
    function closeModal() {
        const modalContainer = document.querySelector('.modal-container');
        const modalContent = document.querySelector('.modal-content');
        
        modalContent.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modalContainer.style.opacity = '0';
            modalContainer.style.visibility = 'hidden';
        }, 200);
    }
}

// Add creepy cursor effect
function initCreepyCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgba(185, 28, 28, 0.5);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        mix-blend-mode: difference;
        transition: width 0.2s, height 0.2s, opacity 0.2s;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.opacity = '0.8';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.opacity = '0.5';
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.5';
    });
}

// Initialize custom cursor effect - uncomment to enable
// initCreepyCursor();

// Add a subtle typewriter effect to the warning box
setTimeout(() => {
    const warningText = document.querySelector('.warning-box p');
    if (warningText) {
        const text = warningText.textContent;
        warningText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                warningText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        typeWriter();
    }
}, 1500);

// Create a folder for images
function createImagesFolder() {
    // This is just a placeholder function
    // In a real implementation, you would create this server-side
    console.log('Image folder structure should be created on the server');
}

// Add scroll-to functionality for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});
