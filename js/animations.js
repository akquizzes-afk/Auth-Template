class AnimationManager {
    constructor() {
        this.observers = [];
        this.initScrollAnimations();
        this.initIntersectionObserver();
    }

    initScrollAnimations() {
        let ticking = false;

        const update = () => {
            this.animateOnScroll();
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    initIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.auth-card, .shape');
        const scrollY = window.scrollY;
        
        elements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    registerAnimation(element, animation) {
        this.observer.observe(element);
        element.classList.add(animation);
    }

    createParticleEffect(x, y, color = '#6366f1') {
        const particles = document.createElement('div');
        particles.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 1000;
        `;

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                animation: particle-float 1s ease-out forwards;
            `;

            const angle = (i / 12) * Math.PI * 2;
            const distance = 30 + Math.random() * 50;
            
            particle.style.setProperty('--angle', angle);
            particle.style.setProperty('--distance', distance);

            particles.appendChild(particle);
        }

        document.body.appendChild(particles);
        
        setTimeout(() => {
            particles.remove();
        }, 1000);
    }
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particle-float {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * var(--distance) * 1px),
                calc(sin(var(--angle)) * var(--distance) * 1px)
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize animation manager
const animationManager = new AnimationManager();