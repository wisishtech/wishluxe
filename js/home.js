/**
 * WISHLUXE Fashion House Website
 * Home Page JavaScript
 * 
 * This file contains JavaScript functionality specific to the home page.
 */

// Collection Image Hover Effect
function setupCollectionHover() {
    const collectionItems = document.querySelectorAll('.collection-item');
    
    collectionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.collection-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.collection-overlay').style.opacity = '0';
        });
        
        item.addEventListener('focusin', function() {
            this.querySelector('.collection-overlay').style.opacity = '1';
        });
        
        item.addEventListener('focusout', function() {
            this.querySelector('.collection-overlay').style.opacity = '0';
        });
    });
}

// Handle Newsletter Form Submission
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = document.getElementById('email');
        
        if (emailInput.checkValidity()) {
            console.log('Subscription email:', emailInput.value);
            emailInput.style.opacity = '0';
            
            setTimeout(() => {
                emailInput.value = '';
                emailInput.style.opacity = '1';
                const message = document.getElementById('subscription-message');
                message.classList.remove('hidden');
                message.style.opacity = '0';
                
                setTimeout(() => {
                    message.style.opacity = '1';
                    message.classList.add('visible');
                    
                    setTimeout(() => {
                        message.style.opacity = '0';
                        setTimeout(() => {
                            message.classList.add('hidden');
                            message.classList.remove('visible');
                        }, 300);
                    }, 3000);
                }, 10);
            }, 300);
        } else {
            emailInput.classList.add('error');
            setTimeout(() => emailInput.classList.remove('error'), 2000);
        }
    });
}

// Initialize home page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupCollectionHover();
    setupNewsletterForm();
});