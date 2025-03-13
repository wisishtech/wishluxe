/**
 * WISHLUXE Fashion House Website
 * About Us Page JavaScript
 * 
 * This file contains JavaScript functionality specific to the about us page.
 */

// Team Member Hover Effects and Interaction
function setupTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            // In a real application, this might show a detailed bio or portfolio
            const name = this.querySelector('h4').textContent;
            const role = this.querySelector('p').textContent;
            
            console.log(`Clicked on team member: ${name}, ${role}`);
        });
    });
}

// Board Member Social Media Interactions
function setupBoardSocial() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // In a real application, this would link to social media profiles
            const socialType = this.querySelector('i').classList[1];
            const memberName = this.closest('.board-member').querySelector('h3').textContent;
            
            console.log(`${memberName}'s ${socialType} profile would open here.`);
        });
    });
}

// Values Section Animation
function setupValuesAnimation() {
    const valueItems = document.querySelectorAll('.value-item');
    
    if (!valueItems.length) return;
    
    // Create an intersection observer to trigger animations when items come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a delay based on the item's index for a staggered animation
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
                
                // Once the animation is added, we don't need to observe this element anymore
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Start observing each value item
    valueItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize about page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupTeamMembers();
    setupBoardSocial();
    setupValuesAnimation();
});