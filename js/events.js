/**
 * WISHLUXE Fashion House Website
 * Events Page JavaScript
 * 
 * This file contains JavaScript functionality specific to the events page.
 */

// Calendar Functionality
function setupCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    if (!calendarDays || !currentMonthElement || !prevMonthBtn || !nextMonthBtn) return;
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Events data (in a real application, this would come from a database)
    const events = [
        { date: new Date(2025, 3, 28), title: 'VIP Member Preview' },
        { date: new Date(2025, 4, 15), title: 'Spring Collection Launch' },
        { date: new Date(2025, 5, 3), title: 'Paris Fashion Week' },
        { date: new Date(2025, 5, 15), title: 'Sustainable Fashion Panel' }
    ];
    
    function updateCalendar() {
        // Update current month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Clear previous calendar days
        calendarDays.innerHTML = '';
        
        // Get first day of month and number of days in month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Add empty cells for days of week before the first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            
            // Check if this day has any events
            const dayDate = new Date(currentYear, currentMonth, day);
            const dayEvents = events.filter(event => 
                event.date.getDate() === dayDate.getDate() && 
                event.date.getMonth() === dayDate.getMonth() && 
                event.date.getFullYear() === dayDate.getFullYear()
            );
            
            // Add day number
            const dayNumber = document.createElement('span');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);
            
            // Check if this day is today
            const today = new Date();
            if (day === today.getDate() && 
                currentMonth === today.getMonth() && 
                currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Add event indicators if there are events
            if (dayEvents.length > 0) {
                dayElement.classList.add('has-event');
                
                const eventIndicator = document.createElement('div');
                eventIndicator.classList.add('event-indicator');
                
                const eventTooltip = document.createElement('div');
                eventTooltip.classList.add('event-tooltip');
                
                dayEvents.forEach(event => {
                    const eventItem = document.createElement('div');
                    eventItem.textContent = event.title;
                    eventTooltip.appendChild(eventItem);
                });
                
                eventIndicator.appendChild(eventTooltip);
                dayElement.appendChild(eventIndicator);
                
                // Add click event to navigate to the event
                dayElement.addEventListener('click', function() {
                    // In a real app, you would navigate to the event or show event details
                    console.log(`Events for ${dayDate.toDateString()}:`, dayEvents);
                    
                    // Scroll to the first matching event (demo functionality)
                    const eventTitles = dayEvents.map(e => e.title);
                    const eventElements = document.querySelectorAll('.event-card-large h3');
                    
                    eventElements.forEach(element => {
                        if (eventTitles.includes(element.textContent)) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            element.closest('.event-card-large').classList.add('highlight');
                            setTimeout(() => {
                                element.closest('.event-card-large').classList.remove('highlight');
                            }, 2000);
                        }
                    });
                });
            }
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Initialize calendar
    updateCalendar();
    
    // Event listeners for calendar navigation
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
}

// RSVP Modal Functionality
function setupRsvpModal() {
    const rsvpModal = document.getElementById('rsvp-modal');
    const rsvpBtns = document.querySelectorAll('[id^="rsvp-event-"]');
    const closeRsvpModal = document.querySelector('#rsvp-modal .close-modal');
    const rsvpEventTitle = document.getElementById('rsvp-event-title');
    
    if (!rsvpModal || !closeRsvpModal || !rsvpEventTitle) return;
    
    // Event titles (in a real application, this would be more dynamic)
    const eventTitles = {
        'rsvp-event-1': 'Spring Collection Launch',
        'rsvp-event-2': 'Paris Fashion Week Showcase',
        'rsvp-event-3': 'VIP Member Exclusive Preview',
        'rsvp-event-4': 'Sustainable Fashion Panel Discussion'
    };
    
    // Open RSVP modal when RSVP button is clicked
    rsvpBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.id;
            rsvpEventTitle.textContent = eventTitles[eventId] || 'Event';
            rsvpModal.style.display = 'flex';
        });
    });
    
    // RSVP form submission
    const rsvpForm = document.getElementById('rsvp-form');

    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Basic validation
        let valid = true;
        const requiredElements = rsvpForm.querySelectorAll('[required]');
        
        requiredElements.forEach(el => {
            if (!el.value.trim()) {
                valid = false;
                el.classList.add('error');
                setTimeout(() => el.classList.remove('error'), 2000);
            }
        });
        
        if (valid) {
            // Existing form submission logic
        }
    });

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // In a real application, you would send this data to your server
            console.log('RSVP submitted for:', rsvpEventTitle.textContent);
            console.log('Name:', document.getElementById('name').value);
            console.log('Email:', document.getElementById('email').value);
            
            // Show confirmation message
            this.innerHTML = '<div class="confirmation-message"><i class="fas fa-check-circle"></i><h3>Thank You!</h3><p>Your RSVP has been confirmed. We look forward to seeing you at the event.</p></div>';
            
            // Close modal after 3 seconds
            setTimeout(function() {
                rsvpModal.style.display = 'none';
                // Reset form (in a real application, you might want to reset it immediately)
                document.getElementById('rsvp-form').reset();
            }, 3000);
        });
    }
    
    // Setup modal closing functionality
    setupModal('rsvp-modal', '[id^="rsvp-event-"]', '.close-modal');
}

// Event Filter Functionality
function setupEventFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const locationFilter = document.getElementById('event-location-filter');
    const eventCards = document.querySelectorAll('.event-card-large');
    const noEventsMessage = document.getElementById('no-events-message');
    
    if (!filterTabs.length || !eventCards.length) return;
    
    function filterEvents() {
        const categoryFilter = document.querySelector('.filter-tab.active').getAttribute('data-filter');
        const locationValue = locationFilter ? locationFilter.value : 'all';
        let visibleCount = 0;
        
        eventCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardLocation = card.getAttribute('data-location');
            
            const categoryMatch = categoryFilter === 'all' || categoryFilter === cardCategory;
            const locationMatch = locationValue === 'all' || locationValue === cardLocation;
            
            if (categoryMatch && locationMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show or hide "no events" message
        if (noEventsMessage) {
            if (visibleCount === 0) {
                noEventsMessage.classList.remove('hidden');
            } else {
                noEventsMessage.classList.add('hidden');
            }
        }
    }
    
    // Category filter click handlers
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterEvents();
        });
    });
    
    // Location filter change handler
    if (locationFilter) {
        locationFilter.addEventListener('change', filterEvents);
    }
}

// Add to Calendar functionality
function setupCalendarAdd() {
    const addToCalendarBtns = document.querySelectorAll('[id^="add-to-calendar"]');
    
    addToCalendarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real application, this would generate a calendar file or link
            alert('Calendar event would be generated here. For demonstration purposes only.');
            this.innerHTML = '<i class="fas fa-check"></i> Added to Calendar';
            this.disabled = true;
        });
    });
}

// Initialize events page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupCalendar();
    setupRsvpModal();
    setupEventFilter();
    setupCalendarAdd();
});