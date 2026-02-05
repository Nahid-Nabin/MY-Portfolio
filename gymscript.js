// IRONPEAK - Gym Equipment Website JavaScript

// Page Load
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
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

// Product Filter
const filterTabs = document.querySelectorAll('.filter-tab');
const productCards = document.querySelectorAll('.product-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Quote Modal
const quoteModal = document.getElementById('quoteModal');
const quoteBtns = document.querySelectorAll('.quote-btn');
const modalCloses = document.querySelectorAll('.modal-close');

quoteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    });
});

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Product Quick View
const productModal = document.getElementById('productModal');
const quickViewBtns = document.querySelectorAll('.quick-view');

const productData = {
    1: {
        name: 'Commercial Power Rack',
        category: 'Strength Training',
        price: '$2,499',
        oldPrice: '$2,999',
        rating: '★★★★★',
        reviews: '(128 reviews)',
        image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=600&fit=crop',
        description: 'Professional-grade power rack built for commercial gym use. Features heavy-duty steel construction, adjustable J-hooks, safety spotter arms, and multiple pull-up bar grips.'
    },
    2: {
        name: 'Professional Treadmill',
        category: 'Cardio',
        price: '$3,299',
        oldPrice: '',
        rating: '★★★★★',
        reviews: '(256 reviews)',
        image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=600&fit=crop',
        description: 'High-performance commercial treadmill with advanced cushioning system, powerful motor, and intuitive touchscreen console. Built for intensive daily use.'
    },
    3: {
        name: 'Rubber Hex Dumbbell Set',
        category: 'Strength Training',
        price: '$899',
        oldPrice: '',
        rating: '★★★★★',
        reviews: '(342 reviews)',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop',
        description: 'Complete set of rubber hex dumbbells from 5 lbs to 50 lbs. Durable rubber coating prevents floor damage and reduces noise. Hexagonal shape prevents rolling.'
    },
    4: {
        name: 'Competition Kettlebell Set',
        category: 'Functional',
        price: '$449',
        oldPrice: '$599',
        rating: '★★★★☆',
        reviews: '(89 reviews)',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
        description: 'Professional competition kettlebells with uniform handle and bell dimensions. Premium steel construction with color-coded weight identification.'
    },
    5: {
        name: 'Assault Air Bike',
        category: 'Cardio',
        price: '$1,299',
        oldPrice: '',
        rating: '★★★★★',
        reviews: '(167 reviews)',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
        description: 'Fan-based air bike for total body conditioning. Unlimited resistance that adapts to your effort. Built for CrossFit and HIIT training.'
    },
    6: {
        name: 'Olympic Barbell 20kg',
        category: 'Strength Training',
        price: '$349',
        oldPrice: '',
        rating: '★★★★★',
        reviews: '(421 reviews)',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=600&fit=crop',
        description: 'Competition-grade Olympic barbell. Chrome finish, precision bearings, and aggressive knurling. 20kg, 28mm grip diameter, 1500 lb capacity.'
    }
};

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productId = btn.getAttribute('data-product');
        const product = productData[productId];
        
        if (product) {
            document.getElementById('modalCategory').textContent = product.category;
            document.getElementById('modalName').textContent = product.name;
            document.getElementById('modalPrice').textContent = product.price;
            document.getElementById('modalOldPrice').textContent = product.oldPrice;
            document.getElementById('modalReviews').textContent = product.reviews;
            document.getElementById('modalDescription').textContent = product.description;
            document.getElementById('productImage').src = product.image;
            
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Cart
const cartSidebar = document.getElementById('cartSidebar');
const cartBtn = document.querySelector('.cart-btn');
const cartClose = document.querySelector('.cart-close');
const cartCount = document.querySelector('.cart-count');
let cart = [];

cartBtn?.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

cartClose?.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = btn.getAttribute('data-product');
        addToCart(productId);
    });
});

function addToCart(productId) {
    cart.push(productId);
    updateCartCount();
    showNotification('Product added to cart!');
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff3c00;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 5000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    currentTestimonial = (index + testimonialCards.length) % testimonialCards.length;
    
    testimonialCards[currentTestimonial].classList.add('active');
    testimonialDots[currentTestimonial].classList.add('active');
}

testimonialPrev?.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
});

testimonialNext?.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
});

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);

// Quote Form Submit
const quoteForm = document.getElementById('quoteForm');
quoteForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Our team will contact you within 24 hours with your custom quote.');
    quoteModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    quoteForm.reset();
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

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations
const observeElements = document.querySelectorAll('.category-card, .product-card, .feature-card');

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

observeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    elementObserver.observe(el);
});

console.log('IRONPEAK - Ready to Build! 💪');
