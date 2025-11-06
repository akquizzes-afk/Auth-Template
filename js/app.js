class AuthApp {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTheme();
        this.initAnimations();
    }

    bindEvents() {
        // Theme toggle
        document.getElementById('themeIcon').addEventListener('click', () => this.toggleTheme());

        // Form toggle
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFormToggle(e));
        });

        // Password visibility toggle
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => this.togglePasswordVisibility(e));
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));

        // Social buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialAuth(e));
        });

        // Input animations
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', (e) => this.handleInputFocus(e));
            input.addEventListener('blur', (e) => this.handleInputBlur(e));
        });

        // Ripple effects
        document.querySelectorAll('.submit-btn, .social-btn, .toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        const themeIcon = document.getElementById('themeIcon');
        themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        this.saveTheme();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        const themeIcon = document.getElementById('themeIcon');
        themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }

    handleFormToggle(e) {
        const targetForm = e.currentTarget.dataset.form;
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        const slider = document.querySelector('.toggle-slider');
        const forms = document.querySelectorAll('.auth-form');

        // Update active button
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Move slider
        const buttonWidth = e.currentTarget.offsetWidth;
        const buttonPosition = e.currentTarget.offsetLeft;
        slider.style.transform = `translateX(${buttonPosition}px)`;
        slider.style.width = `${buttonWidth}px`;

        // Switch forms with animation
        forms.forEach(form => {
            if (form.id === `${targetForm}Form`) {
                form.classList.remove('slide-out');
                form.classList.add('active');
                setTimeout(() => form.classList.add('slide-in'), 50);
            } else {
                form.classList.remove('active', 'slide-in');
                form.classList.add('slide-out');
            }
        });
    }

    togglePasswordVisibility(e) {
        const button = e.currentTarget;
        const input = button.parentElement.querySelector('input');
        const icon = button.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        await this.submitForm(e.target, 'login');
    }

    async handleSignup(e) {
        e.preventDefault();
        await this.submitForm(e.target, 'signup');
    }

    async submitForm(form, type) {
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateAPICall();
            
            this.showNotification(
                type === 'login' ? 'Successfully logged in!' : 'Account created successfully!',
                'success'
            );

            // Reset form
            form.reset();
            
        } catch (error) {
            this.showNotification(
                type === 'login' ? 'Login failed. Please try again.' : 'Signup failed. Please try again.',
                'error'
            );
        } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    simulateAPICall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.2 ? resolve() : reject();
            }, 2000);
        });
    }

    handleSocialAuth(e) {
        const platform = e.currentTarget.classList[1]; // google, github, twitter
        this.showNotification(`Connecting with ${platform}...`, 'success');
        
        // Here you would normally redirect to OAuth flow
        console.log(`Initiating ${platform} OAuth flow`);
    }

    handleInputFocus(e) {
        const container = e.target.parentElement;
        container.classList.add('focused');
    }

    handleInputBlur(e) {
        const container = e.target.parentElement;
        container.classList.remove('focused');
    }

    createRipple(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const text = notification.querySelector('.notification-text');
        
        notification.className = `notification ${type}`;
        text.textContent = message;
        
        const icon = notification.querySelector('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    initAnimations() {
        // Initialize any additional animations
        this.animateShapes();
    }

    animateShapes() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 2}s`;
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new AuthApp();
});
