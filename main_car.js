// Elite Shine Auto Care - Main JavaScript

// Page Load
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

// Navbar Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Animated Counters
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Booking Modal
const modal = document.getElementById('modal');
const bookBtns = document.querySelectorAll('.book-btn');
const closeBtn = document.querySelector('.close');

bookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Pricing Calculator
const carTypeSelect = document.getElementById('carType');
const serviceSelect = document.getElementById('service');
const priceDisplay = document.getElementById('price');

const prices = {
    sedan: { basic: 49, premium: 199, ceramic: 499, interior: 129 },
    suv: { basic: 69, premium: 249, ceramic: 599, interior: 179 },
    luxury: { basic: 99, premium: 349, ceramic: 799, interior: 249 }
};

function updatePrice() {
    const carType = carTypeSelect?.value;
    const service = serviceSelect?.value.split(' -')[0];
    
    if (carType && service && prices[carType]) {
        const price = prices[carType][service];
        if (price && priceDisplay) {
            priceDisplay.textContent = `$${price}`;
        }
    }
}

carTypeSelect?.addEventListener('change', updatePrice);
serviceSelect?.addEventListener('change', updatePrice);

// Booking Form Submit
const bookingForm = document.getElementById('bookingForm');
bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Booking Confirmed! We\'ll contact you shortly.');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    bookingForm.reset();
});

// Contact Form Submit
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    contactForm.reset();
});

// Scroll to Top
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop?.classList.add('show');
    } else {
        scrollTop?.classList.remove('show');
    }
});

scrollTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('Elite Shine - Website Ready! ✨');
