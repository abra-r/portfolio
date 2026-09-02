// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
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


// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
        ) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Create mailto link
        const subject = encodeURIComponent(
            `New Message: ${formData.subject}`
        );

        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );

        window.location.href =
            `mailto:abrarhauqe@gmail.com?subject=${subject}&body=${body}`;

        // Show success message
        showNotification(
            'Opening your email client...',
            'success'
        );

        // Reset form
        setTimeout(() => {
            contactForm.reset();
        }, 500);
    });
}


// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {

    const notification = document.createElement('div');

    notification.className =
        `notification notification-${type}`;

    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${
            type === 'success'
                ? 'var(--burgundy)'
                : type === 'error'
                    ? 'var(--orange)'
                    : 'var(--ink)'
        };
        color: var(--white);
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        animation: slideInDown 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.style.animation =
            'slideInDown 0.3s ease reverse';

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 3000);
}


// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.animation =
                    'slideInUp 0.6s ease forwards';

                observer.unobserve(entry.target);
            }

        });

    },
    observerOptions
);


// ============================================
// OBSERVE ELEMENTS FOR ANIMATION
// ============================================


document
    .querySelectorAll(
        '.featured-card, .skill-category, .cp-card, .contact-item'
    )
    .forEach(el => {

        observer.observe(el);

    });


// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
const navLinks =
    document.querySelectorAll('.nav-links a');

const sections =
    document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.clientHeight;

        if (scrollY >= sectionTop - 200) {

            current =
                section.getAttribute('id');

        }

    });

    navLinks.forEach(link => {

        link.style.color = '';

        if (
            link.getAttribute('href').slice(1)
            === current
        ) {

            link.style.color =
                'var(--burgundy)';

        }

    });

});


// ============================================
// SCROLL-TO-TOP BUTTON
// ============================================
function createScrollToTopButton() {

    const button =
        document.createElement('button');

    button.innerHTML =
        '<i class="fas fa-arrow-up"></i>';

    button.className =
        'scroll-to-top';

    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--burgundy);
        border: none;
        color: var(--white);
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(23, 53, 42, 0.16);
    `;

    document.body.appendChild(button);


    // Show/hide button while scrolling
    window.addEventListener('scroll', () => {

        if (window.scrollY > 300) {

            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';

        } else {

            button.style.display = 'none';

        }

    });


    // Scroll to top
    button.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });


    // Hover effect
    button.addEventListener('mouseenter', () => {

        button.style.transform =
            'scale(1.1)';

    });


    button.addEventListener('mouseleave', () => {

        button.style.transform =
            'scale(1)';

    });

}


// Initialize scroll-to-top button
createScrollToTopButton();


// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', (e) => {

    // Escape to close any open modals
    // Future feature

    if (e.key === 'Escape') {

        // Handle escape key

    }

});


// ============================================
// HEADER SHADOW ON SCROLL
// ============================================
const header =
    document.querySelector('.header');

if (header) {

    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                '0 8px 30px rgba(23, 53, 42, 0.12)';

        } else {

            header.style.boxShadow =
                '0 4px 20px rgba(23, 53, 42, 0.10)';

        }

    });

}


// ============================================
// SKILL COUNTER ANIMATION
// ============================================
function animateCounters() {

    const counters =
        document.querySelectorAll('.stat-value');

    counters.forEach(counter => {

        const target =
            parseInt(counter.textContent);

        if (isNaN(target)) return;

        let current = 0;

        const increment =
            Math.ceil(target / 50);


        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent =
                    current;

                setTimeout(
                    updateCounter,
                    30
                );

            } else {

                counter.textContent =
                    target;

            }

        };


        // Only animate once when visible
        const counterObserver =
            new IntersectionObserver(
                (entries) => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        updateCounter();

                        counterObserver
                            .unobserve(counter);

                    }

                }
            );


        counterObserver.observe(counter);

    });

}


// Initialize counter animation
window.addEventListener(
    'load',
    animateCounters
);


// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {

    const navLinks =
        document.querySelector('.nav-links');


    // Close menu when link is clicked
    // on mobile

    if (window.innerWidth <= 768) {

        document
            .querySelectorAll('.nav-links a')
            .forEach(link => {

                link.addEventListener(
                    'click',
                    () => {

                        // Menu closing logic
                        // can be added here
                        // when hamburger menu
                        // is implemented

                    }
                );

            });

    }

}


initMobileMenu();


// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {

    document.body.style.opacity = '1';

});


// Start page hidden and fade in
document.body.style.opacity = '0';

document.body.style.transition =
    'opacity 0.5s ease';


// ============================================
// THEME CONSISTENCY
// ============================================



// ============================================
// FORM INPUT FOCUS EFFECTS
// ============================================
const formInputs =
    document.querySelectorAll(
        '.form-group input, ' +
        '.form-group select, ' +
        '.form-group textarea'
    );

formInputs.forEach(input => {

    input.addEventListener(
        'focus',
        function () {

            this.parentElement.style.transform =
                'scale(1.02)';

        }
    );


    input.addEventListener(
        'blur',
        function () {

            this.parentElement.style.transform =
                'scale(1)';

        }
    );

});


// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {

    const imageObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const img =
                            entry.target;

                        img.src =
                            img.dataset.src ||
                            img.src;

                        img.classList.add(
                            'loaded'
                        );

                        observer.unobserve(img);

                    }

                });

            }
        );


    document
        .querySelectorAll('img[data-src]')
        .forEach(img => {

            imageObserver.observe(img);

        });

}


// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log(
    '%cWelcome to Abrar Amin\'s Portfolio!',
    'color: #8d1738; font-size: 20px; font-weight: bold;'
);

console.log(
    '%cFeel free to explore and reach out at abrarhauqe@gmail.com',
    'color: #2f8b87; font-size: 14px;'
);

console.log(
    '%cCheck out my GitHub: https://github.com/abra-r',
    'color: #e47f32; font-size: 12px;'
);


// ============================================
// PERFORMANCE MONITORING
// ============================================
if (
    window.performance &&
    window.performance.timing
) {

    window.addEventListener('load', () => {

        const perfData =
            window.performance.timing;

        const pageLoadTime =
            perfData.loadEventEnd -
            perfData.navigationStart;

        console.log(
            'Page load time: ' +
            pageLoadTime +
            'ms'
        );

    });

}