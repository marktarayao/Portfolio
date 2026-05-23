/* =========================================
   JAVASCRIPT FOR PERSONAL PORTFOLIO
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');
    const mainContent = document.querySelector('.main-content');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');

    // 1. DESKTOP MINIMIZE SIDEBAR TOGGLE
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // 2. MOBILE MENU TOGGLE FUNCTIONALITY
    const dashboardContainer = document.querySelector('.dashboard-container');
    dashboardContainer.addEventListener('click', (e) => {
        if (window.innerWidth <= 900 && e.clientX < 60 && e.clientY < 60) {
            sidebar.classList.toggle('active');
        }
    });
    mainContent.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // 3. SMOOTH SCROLLING NAV LINKS
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                sidebar.classList.remove('active');
                mainContent.scrollTo({
                    top: targetSection.offsetTop - 30,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. ACTIVE NAV LINK HIGHLIGHTING
    const observerOptions = {
        root: mainContent, 
        rootMargin: '-30% 0px -60% 0px', 
        threshold: 0
    };
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeId = entry.target.id;
                const activeLink = document.querySelector(`.nav-links a[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));


    // 5. FADE-IN ANIMATION
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserverOptions = {
        root: mainContent,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };
    const fadeObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); 
            }
        });
    };
    const fadeObserver = new IntersectionObserver(fadeObserverCallback, fadeObserverOptions);
    fadeElements.forEach(element => fadeObserver.observe(element));


    // 6. SEARCH SHORTCUT ('S')
    const searchInput = document.querySelector('.search-bar input');
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        if (e.key.toLowerCase() === 's') {
            e.preventDefault(); 
            if(sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
            }
            searchInput.focus();
        }
    });

    // 7. MODAL POPUPS (Projects & Certifications)
    const modal = document.getElementById('popup-modal');
    const modalImg = document.getElementById('modal-image');
    const modalLink = document.getElementById('modal-link');
    const modalGithub = document.getElementById('modal-github');
    const modalInfo = document.getElementById('modal-info');
    const closeBtn = document.querySelector('.close-btn');
    const modalTriggers = document.querySelectorAll('.open-modal');

    // Open Modal logic
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const imgSrc = trigger.getAttribute('data-img');
            const linkHref = trigger.getAttribute('data-link');
            const githubHref = trigger.getAttribute('data-github');
            const isDeployed = trigger.getAttribute('data-deployed');
            
            // Set image
            if (imgSrc) {
                modalImg.src = imgSrc;
                modalImg.style.display = 'block';
            } else {
                modalImg.style.display = 'none';
            }

            // Set external live link
            if (linkHref && linkHref !== "#") {
                modalLink.href = linkHref;
                modalLink.style.display = 'inline-flex';
            } else {
                modalLink.style.display = 'none';
            }

            // Set GitHub link
            if (githubHref && githubHref !== "#") {
                modalGithub.href = githubHref;
                modalGithub.style.display = 'inline-flex';
            } else {
                modalGithub.style.display = 'none';
            }

            // Set "Not Deployed" status label
            if (isDeployed === "false") {
                modalInfo.style.display = 'block';
            } else {
                modalInfo.style.display = 'none';
            }
            
            modal.classList.add('show');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

 // 8. TYPING ANIMATION (Infinite Loop with static "I")
const typedTextSpan = document.getElementById("typed-text");
const textArray = ["build digital experiences.", "explore cybersecurity."];
const typingDelay = 70;
const erasingDelay = 40;
const newTextDelay = 1500;

let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (!typedTextSpan) return;

    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (!typedTextSpan) return;

    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 300);
    }
}

if (typedTextSpan) {
    setTimeout(type, 800);
}
});