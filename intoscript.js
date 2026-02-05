// LUXE INTERIORS - Main JavaScript

// Page Load Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
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

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const heroPrev = document.querySelector('.hero-prev');
const heroNext = document.querySelector('.hero-next');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-advance slides
let slideInterval = setInterval(nextSlide, 5000);

heroPrev?.addEventListener('click', () => {
    prevSlide();
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
});

heroNext?.addEventListener('click', () => {
    nextSlide();
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

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

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Consultation Modal
const consultModal = document.getElementById('consultModal');
const consultBtns = document.querySelectorAll('.consult-btn');
const modalCloses = document.querySelectorAll('.modal-close');

consultBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        consultModal.classList.add('active');
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

// Project Detail Modal
const projectModal = document.getElementById('projectModal');
const viewBtns = document.querySelectorAll('.view-btn');

const projectData = {
    1: {
        title: 'Modern Penthouse',
        meta: 'Residential · New York · 2023',
        description: 'A complete transformation of a 3,000 sq ft penthouse in Manhattan. The design combines contemporary aesthetics with functional living spaces, featuring custom millwork, designer furniture, and a sophisticated neutral color palette with gold accents.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop'
    },
    2: {
        title: 'Tech Startup Office',
        meta: 'Commercial · San Francisco · 2023',
        description: 'Dynamic office space designed to foster creativity and collaboration. Features include open workstations, private meeting pods, a games area, and a modern kitchen. The design reflects the company\'s innovative culture.',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
    },
    3: {
        title: 'Beverly Hills Estate',
        meta: 'Luxury · Los Angeles · 2023',
        description: 'Opulent estate featuring bespoke furniture, marble finishes, and curated artwork. Every detail crafted to exude luxury and sophistication, from the grand entrance to the intimate private quarters.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    },
    4: {
        title: 'Scandinavian Kitchen',
        meta: 'Residential · Seattle · 2023',
        description: 'Clean lines, natural materials, and functional design define this beautiful Scandinavian-inspired kitchen. Features custom cabinetry, quartz countertops, and integrated appliances.',
        image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop'
    },
    5: {
        title: 'Fine Dining Restaurant',
        meta: 'Commercial · Miami · 2023',
        description: 'Elegant restaurant interior combining modern design with classic sophistication. Custom lighting, luxurious seating, and a carefully curated color palette create an unforgettable dining atmosphere.',
        image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop'
    },
    6: {
        title: 'Spa Bathroom Retreat',
        meta: 'Luxury · Malibu · 2023',
        description: 'Transform your daily routine into a spa experience. This luxurious bathroom features a freestanding tub, walk-in shower, heated floors, and premium fixtures throughout.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop'
    }
};

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            document.getElementById('projectTitle').textContent = project.title;
            document.getElementById('projectMeta').textContent = project.meta;
            document.getElementById('projectDescription').textContent = project.description;
            document.getElementById('projectMainImage').src = project.image;
            
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    currentTestimonial = (index + testimonialCards.length) % testimonialCards.length;
    testimonialCards[currentTestimonial].classList.add('active');
}

testimonialPrev?.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
});

testimonialNext?.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
});

// Auto-rotate testimonials
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 6000);

// Form Submissions
const consultForm = document.getElementById('consultForm');
const contactForm = document.getElementById('contactForm');

consultForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your consultation request has been received. We\'ll contact you within 24 hours.');
    consultModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    consultForm.reset();
});

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! Our team will get back to you shortly.');
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
const observeElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-card');

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

console.log('LUXE Interiors - Website Loaded Successfully ✨');
