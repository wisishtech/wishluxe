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
    
    // Product data (in a real application, this would come from a database)
    const productData = {
        'silk-palazzo': {
            title: 'Silk Palazzo Pants',
            price: '$850',
            description: 'Fluid silhouette with wide-leg design in premium silk. Features a high waist with concealed side zip closure and pleated front detail. Available in multiple colorways.'
        },
        'leather-tote': {
            title: 'Leather Tote Bag',
            price: '$1,450',
            description: 'Structured leather tote with signature hardware. Crafted from premium Italian leather with a suede interior lining and multiple compartments for organization.'
        },
        'silk-scarf': {
            title: 'Silk Scarf',
            price: '$380',
            description: 'Hand-printed silk with artist collaboration motif. Each scarf is made from the finest silk and features a unique print created in partnership with contemporary artists.'
        },
        'statement-earrings': {
            title: 'Statement Earrings',
            price: '$520',
            description: 'Artisan-crafted metal with semi-precious stones. These bold earrings combine traditional metalworking techniques with modern design aesthetics.'
        },
        'leather-belt': {
            title: 'Leather Belt',
            price: '$490',
            description: 'Italian calfskin with distinctive buckle detail. The perfect finishing touch to any outfit, featuring our signature hardware and meticulous craftsmanship.'
        },
        'structured-blazer': {
            title: 'Structured Blazer',
            price: '$1,200',
            description: 'Tailored wool blend with distinctive shoulder silhouette. Features notched lapels, front button closure, and signature lining. A versatile piece for both formal and casual styling.'
        },
        'cashmere-sweater': {
            title: 'Cashmere Sweater',
            price: '$890',
            description: 'Luxurious oversized cashmere with ribbed details. Features dropped shoulders and a relaxed fit for ultimate comfort. Sourced from sustainable cashmere producers.'
        },
        'pleated-skirt': {
            title: 'Pleated Midi Skirt',
            price: '$720',
            description: 'Elegant pleated design in lightweight sustainable fabric. Features an elastic waistband for comfort and fluid movement. Perfect for day-to-night transitions.'
        },
        'evening-gown': {
            title: 'Embellished Evening Gown',
            price: '$5,800',
            description: 'Hand-beaded silk with dramatic train and draped back. Each bead is carefully applied by expert artisans, requiring over 200 hours of craftsmanship. A true masterpiece of couture.'
        },
        'cocktail-dress': {
            title: 'Sculptural Cocktail Dress',
            price: '$3,200',
            description: 'Architectural silhouette with precision craftsmanship. Features innovative construction techniques that create a dramatic yet wearable statement piece.'
        },
        'bridal': {
            title: 'Custom Bridal Ensemble',
            price: 'Price Upon Request',
            description: 'Bespoke bridal creation with hand-embroidered details. Each design is uniquely created for the bride, involving multiple fittings and consultations to ensure a perfect match to individual style and vision.'
        }
    };
    
    // Open modal when quick view button is clicked
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const product = productData[productId];
            
            if (product) {
                // Update modal content with product data
                document.getElementById('modal-title').textContent = product.title;
                document.getElementById('modal-price').textContent = product.price;
                document.getElementById('modal-description').textContent = product.description;
                
                // Show modal
                modal.style.display = 'flex';
            }
        });
    });
    
    // Initialize modal close functionality
    setupModal('quick-view-modal', '.quick-view-btn', '.close-modal');
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