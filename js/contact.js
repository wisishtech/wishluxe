/**
 * WISHLUXE Fashion House Website
 * Contact Page JavaScript
 * 
 * This file contains JavaScript functionality specific to the contact page.
 */

// Contact Form Submission
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic validation
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    valid = false;
                    
                    setTimeout(() => {
                        field.classList.remove('error');
                    }, 2000);
                }
            });
            
            // If form is valid, process the submission
            if (valid) {
                // In a real application, you would validate and send form data to your server
                console.log('Contact form submitted successfully');
                
                // Hide form and show success message
                this.style.display = 'none';
                const successMessage = document.getElementById('form-success');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
                
                // Reset form (helpful if we want to show it again later)
                this.reset();
            }
        });
    }
}

// Appointment Modal Functionality
function setupAppointmentModal() {
    const appointmentModal = document.getElementById('appointment-modal');
    const appointmentBtn = document.getElementById('appointment-btn');
    
    if (!appointmentModal || !appointmentBtn) return;
    
    // Open appointment modal when button is clicked
    appointmentBtn.addEventListener('click', function() {
        appointmentModal.style.display = 'flex';
    });
    
    // Initialize modal close functionality
    setupModal('appointment-modal', '#appointment-btn', '.close-modal');
}

// Appointment Form Submission
function setupAppointmentForm() {
    const appointmentForm = document.getElementById('appointment-form');
    
    if (!appointmentForm) return;
    
    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Basic validation
        let valid = true;
        const requiredFields = appointmentForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                valid = false;
                
                setTimeout(() => {
                    field.classList.remove('error');
                }, 2000);
            }
        });
        
        // If form is valid, process the submission
        if (valid) {
            // In a real application, you would validate and send form data to your server
            console.log('Appointment requested');
            
            // Show confirmation message
            this.innerHTML = '<div class="confirmation-message"><i class="fas fa-check-circle"></i><h3>Thank You!</h3><p>Your appointment request has been received. We will contact you within 24 hours to confirm your booking.</p></div>';
            
            // Close modal after 5 seconds
            setTimeout(function() {
                document.getElementById('appointment-modal').style.display = 'none';
                // Reset form (in a real application, you might want to reset it immediately)
                appointmentForm.reset();
            }, 5000);
        }
    });
}

// Date validation for appointment form (can't select dates in the past)
function setupDateValidation() {
    const dateInput = document.getElementById('app-date');
    
    if (dateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        
        const currentDate = yyyy + '-' + mm + '-' + dd;
        dateInput.setAttribute('min', currentDate);
    }
}

// Job listing button interactions
function setupJobListings() {
    const jobButtons = document.querySelectorAll('.job-listing .btn');
    
    jobButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.parentElement.querySelector('h3').textContent;
            alert(`You're viewing details for: ${jobTitle}\n\nIn a complete implementation, this would show a detailed job description and application form.`);
        });
    });
}

// Press kit download button
function setupPressKit() {
    const pressKitButton = document.querySelector('.press-kit .btn');
    
    if (pressKitButton) {
        pressKitButton.addEventListener('click', function() {
            alert('In a real implementation, this would download a press kit PDF or redirect to a download page.');
        });
    }
}

// Initialize contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
    setupAppointmentModal();
    setupAppointmentForm();
    setupDateValidation();
    setupJobListings();
    setupPressKit();
});