/**
 * WISHLUXE Fashion House Website
 * Main JavaScript File
 * 
 * This file contains core JavaScript functionality used across the website.
 */

// Set current year in footer
function setCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Enhanced Mobile Menu with Animation
function setupEnhancedMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const closeIcon = document.querySelector('.close-icon');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    if (!hamburger || !nav) return;
    
    function openMenu() {
        hamburger.classList.add('open');
        nav.classList.add('open');
        closeIcon.classList.add('visible');
        
        if (overlay) {
            overlay.classList.add('active');
        }
        
        // Prevent body scrolling when menu is open
        body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        closeIcon.classList.remove('visible');
        
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Restore body scrolling
        body.style.overflow = '';
    }
    
    // Hamburger click event
    hamburger.addEventListener('click', openMenu);
    
    // Close icon click event
    if (closeIcon) {
        closeIcon.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking on overlay
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Close menu on window resize if it gets larger than mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && hamburger.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('open')) {
                closeMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburger.classList.contains('open')) {
            closeMenu();
        }
    });
}

// Header scroll effect
function setupHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    // Initialize on page load
    handleScroll();
}

// Search toggle functionality
function setupSearchToggle() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    const searchContainer = document.querySelector('.search-container');
    
    if (!searchToggle || !searchForm || !searchContainer) return;
    
    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchForm.classList.toggle('active');
        searchContainer.classList.toggle('active');
        
        if (searchForm.classList.contains('active')) {
            // Focus search input
            setTimeout(() => {
                searchForm.querySelector('input').focus();
            }, 100);
        }
    });
    
    // Close search form when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && searchForm.classList.contains('active')) {
            searchForm.classList.remove('active');
            searchContainer.classList.remove('active');
        }
    });
    
    // Close search form on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchForm.classList.contains('active')) {
            searchForm.classList.remove('active');
            searchContainer.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Marquee Animation with Pause on Hover
function setupMarquee() {
    const marquee = document.querySelector('.marquee');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
    }
}

// Intersection Observer for Section Animations
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-viewport');
                
                // Animate collection items, event cards, etc.
                const animatableElements = entry.target.querySelectorAll('.collection-item, .event-card, .value-item, .board-member, .team-member');
                animatableElements.forEach((el, index) => {
                    el.style.transitionDelay = `${index * 0.1}s`;
                    el.classList.add('animate');
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// Modal functionality
function setupModal(modalId, triggerSelector, closeSelector) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const closeBtns = modal.querySelectorAll(closeSelector);
    const triggers = document.querySelectorAll(triggerSelector);
    
    // Open modal
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when X is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
        }
    });
}

// Form validation and submission
function setupFormSubmission(formId, successMessageId, resetForm = true) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Basic validation
        let valid = true;
        const requiredElements = form.querySelectorAll('[required]');
        
        requiredElements.forEach(el => {
            if (!el.value.trim()) {
                valid = false;
                el.classList.add('error');
                setTimeout(() => el.classList.remove('error'), 2000);
            }
        });
        
        if (valid) {
            // In a real application, you would send the form data to your server
            console.log(`${formId} submitted successfully`);
            
            // Show success message
            const successMessage = document.getElementById(successMessageId);
            if (successMessage) {
                if (resetForm) {
                    form.style.display = 'none';
                }
                successMessage.classList.remove('hidden');
                successMessage.classList.add('visible');
            }
            
            // Reset form
            if (resetForm) {
                form.reset();
            }
        }
    });
}

// Initialize core functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setCurrentYear();
    setupEnhancedMobileMenu();
    setupHeaderScrollEffect();
    setupSearchToggle();
    setupSmoothScrolling();
    setupMarquee();
    setupAnimations();
});