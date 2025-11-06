class FormValidator {
    constructor() {
        this.patterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        };
    }

    validateEmail(email) {
        return this.patterns.email.test(email);
    }

    validatePassword(password) {
        return this.patterns.password.test(password);
    }

    validateName(name) {
        return name.trim().length >= 2;
    }

    validateForm(formData, formType) {
        const errors = [];

        if (formType === 'signup') {
            if (!this.validateName(formData.name)) {
                errors.push('Name must be at least 2 characters long');
            }
        }

        if (!this.validateEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!this.validatePassword(formData.password)) {
            errors.push('Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character');
        }

        if (formType === 'signup' && formData.password !== formData.confirmPassword) {
            errors.push('Passwords do not match');
        }

        return errors;
    }

    getPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[@$!%*?&]/.test(password)) strength++;

        return strength;
    }
}

class FormHandler {
    constructor() {
        this.validator = new FormValidator();
    }

    getFormData(form) {
        const formData = {};
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach(input => {
            formData[input.id.replace('login', '').replace('signup', '').toLowerCase()] = input.value;
        });

        return formData;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.5rem;
        `;
        
        field.parentElement.appendChild(errorElement);
        field.style.borderColor = '#ef4444';
    }

    clearFieldError(field) {
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    showPasswordStrength(password) {
        // Implement password strength meter
        const strength = this.validator.getPasswordStrength(password);
        // Update UI with strength indicator
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormValidator, FormHandler };
}