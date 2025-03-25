/**
 * WISHLUXE Fashion House Website
 * Collections Page JavaScript
 * 
 * This file contains JavaScript functionality specific to the collections page.
 */

// Collection Filter Functionality
function setupCollectionFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const collectionCategories = document.querySelectorAll('.collection-category');
    
    if (!filterBtns.length || !collectionCategories.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide collection categories based on filter with animation
            collectionCategories.forEach(category => {
                if (filter === 'all') {
                    category.classList.remove('hidden');
                    setTimeout(() => {
                        category.style.opacity = '1';
                    }, 10);
                } else {
                    if (category.classList.contains(filter)) {
                        category.classList.remove('hidden');
                        setTimeout(() => {
                            category.style.opacity = '1';
                        }, 10);
                    } else {
                        category.style.opacity = '0';
                        setTimeout(() => {
                            category.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });
}

// Product Quick View Modal
function setupProductModal() {
    const modal = document.getElementById('quick-view-modal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    if (!modal || !quickViewBtns.length) return;
    
    // Open modal when quick view button is clicked
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            
            // Find the parent product item to fetch data from HTML
            const productItem = this.closest('.product-item');
            
            if (productItem) {
                // Extract product data directly from the HTML
                const title = productItem.querySelector('h3').textContent;
                const price = productItem.querySelector('.product-price').textContent;
                const description = productItem.querySelector('.product-description').textContent;
                const imageSrc = productItem.querySelector('.product-image img').getAttribute('src');
                
                // Update modal content with product data from HTML
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-price').textContent = price;
                document.getElementById('modal-description').textContent = description;
                
                // Update modal image if element exists
                const modalImage = document.getElementById('modal-image');
                if (modalImage) {
                    modalImage.setAttribute('src', imageSrc);
                    modalImage.setAttribute('alt', title);
                }
                
                // Show modal
                modal.style.display = 'flex';
            }
        });
    });
    
    // Initialize modal close functionality
    setupModal('quick-view-modal', '.quick-view-btn', '.close-modal');
}

// Modal setup functionality
function setupModal(modalId, triggerSelector, closeSelector) {
    const modal = document.getElementById(modalId);
    const closeBtn = modal ? modal.querySelector(closeSelector) : null;
    
    if (!modal || !closeBtn) return;
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Size selection functionality
function setupSizeSelection() {
    const sizeBtns = document.querySelectorAll('.size-btn');
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Color selection functionality
function setupColorSelection() {
    const colorBtns = document.querySelectorAll('.color-btn');
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Wishlist button functionality
function setupWishlistButton() {
    const wishlistBtn = document.getElementById('add-to-wishlist');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
            this.classList.add('added');
        });
    }
}

// Request information button functionality
function setupRequestInfoButton() {
    const requestInfoBtn = document.getElementById('request-info');
    
    if (requestInfoBtn) {
        requestInfoBtn.addEventListener('click', function() {
            // In a real application, you would redirect to the contact page
            // or open a specific contact form modal
            window.location.href = 'contact.html';
        });
    }
}

// Initialize collections page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupCollectionFilter();
    setupProductModal();
    setupSizeSelection();
    setupColorSelection();
    setupWishlistButton();
    setupRequestInfoButton();
});