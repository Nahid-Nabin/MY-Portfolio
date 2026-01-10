// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.reveal, .section-header, .about-content, .about-image, .featured-card, .perfume-card').forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// STAGGER ANIMATIONS FOR CARDS
// ============================================
window.addEventListener('load', function() {
    // Stagger featured cards
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 150);
    });

    // Stagger perfume cards on collection page
    const perfumeCards = document.querySelectorAll('.perfume-card');
    perfumeCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
});

// ============================================
// PRODUCT PAGE ANIMATIONS
// ============================================
// Check if we're on the product page
if (window.location.pathname.includes('product.html')) {
    window.addEventListener('load', () => {
        // Animate details from left
        setTimeout(() => {
            const details = document.querySelector('.product-details');
            if (details) {
                details.style.opacity = '1';
                details.style.transform = 'translateX(0)';
            }
        }, 100);
        
        // Animate bottle from right
        setTimeout(() => {
            const bottle = document.querySelector('.product-bottle');
            if (bottle) {
                bottle.style.opacity = '1';
                bottle.style.transform = 'translateX(0)';
            }
        }, 300);

        // Animate bottle elements
        setTimeout(() => {
            const bottleMain = document.querySelector('.bottle-main');
            if (bottleMain) {
                bottleMain.classList.add('animated');
            }
            
            const circles = document.querySelectorAll('.bottle-bg-circle');
            circles.forEach((circle, i) => {
                setTimeout(() => {
                    circle.classList.add('animated');
                }, i * 100);
            });
        }, 600);
    });

    // Get product ID from URL and update content
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'rose-eternelle';
    
    // Product database
    const products = {
        'rose-eternelle': {
            name: 'Rose Éternelle',
            category: 'FLORAL • FEMININE',
            price: '$285',
            icon: '🌹',
            badge: 'BESTSELLER',
            description: 'A timeless masterpiece that captures the essence of a thousand Bulgarian roses at the peak of their bloom. This exquisite fragrance opens with the intoxicating scent of fresh rose petals, gradually revealing layers of jasmine and ending with a warm embrace of sandalwood.',
            topNotes: 'Bulgarian Rose, Pink Pepper, Bergamot',
            heartNotes: 'Jasmine Absolute, Turkish Rose, Peony',
            baseNotes: 'Sandalwood, White Musk, Amber',
            labelText: 'ROSE',
            labelSubtext: 'ÉTERNELLE'
        },
        'oud-mystique': {
            name: 'Oud Mystique',
            category: 'WOODY • MASCULINE',
            price: '$320',
            icon: '🪵',
            badge: 'SIGNATURE',
            description: 'An enigmatic blend that captures the ancient mystique of pure oud wood. Rich and complex, this fragrance unfolds with smoky leather notes, deepening into a warm amber base accented with exotic spices.',
            topNotes: 'Black Pepper, Cardamom, Bergamot',
            heartNotes: 'Oud Wood, Leather, Dark Rose',
            baseNotes: 'Amber, Musk, Patchouli',
            labelText: 'OUD',
            labelSubtext: 'MYSTIQUE'
        },
        'lumiere-dete': {
            name: 'Lumière d\'Été',
            category: 'CITRUS • UNISEX',
            price: '$265',
            icon: '☀️',
            badge: 'NEW ARRIVAL',
            description: 'Capturing the essence of a perfect summer day, this bright and uplifting fragrance combines fresh citrus with delicate floral notes, settling into a subtle base of white tea and clean musk.',
            topNotes: 'Bergamot, Lemon, Neroli',
            heartNotes: 'White Tea, Orange Blossom, Jasmine',
            baseNotes: 'White Musk, Cedarwood, Amber',
            labelText: 'LUMIÈRE',
            labelSubtext: 'D\'ÉTÉ'
        },
        'velvet-noir': {
            name: 'Velvet Noir',
            category: 'ORIENTAL • FEMININE',
            price: '$295',
            icon: '🌙',
            badge: 'LUXE',
            description: 'A seductive evening fragrance that envelops you in warmth and sophistication. Rich vanilla and tonka bean create a smooth base, while dark chocolate and patchouli add depth and intrigue.',
            topNotes: 'Dark Chocolate, Pink Pepper, Mandarin',
            heartNotes: 'Tonka Bean, Vanilla Orchid, Jasmine',
            baseNotes: 'Patchouli, Amber, Sandalwood',
            labelText: 'VELVET',
            labelSubtext: 'NOIR'
        },
        'azure-coast': {
            name: 'Azure Coast',
            category: 'FRESH • MASCULINE',
            price: '$275',
            icon: '🌊',
            badge: 'FRESH',
            description: 'Inspired by the Mediterranean coastline, this invigorating fragrance captures the essence of sea air and aromatic herbs. Clean, sophisticated, and timelessly elegant.',
            topNotes: 'Sea Salt, Lavender, Bergamot',
            heartNotes: 'Sage, Rosemary, Geranium',
            baseNotes: 'Cedarwood, Vetiver, White Musk',
            labelText: 'AZURE',
            labelSubtext: 'COAST'
        },
        'amber-royale': {
            name: 'Amber Royale',
            category: 'SPICY • UNISEX',
            price: '$340',
            icon: '👑',
            badge: 'PREMIUM',
            description: 'A regal composition of precious ingredients that exudes opulence and power. Rich amber forms the heart, elevated by exotic saffron and tempered with elegant iris.',
            topNotes: 'Saffron, Cardamom, Orange',
            heartNotes: 'Amber, Iris, Turkish Rose',
            baseNotes: 'Sandalwood, Vanilla, Labdanum',
            labelText: 'AMBER',
            labelSubtext: 'ROYALE'
        },
        'gardenia-blanche': {
            name: 'Gardenia Blanche',
            category: 'FLORAL • FEMININE',
            price: '$270',
            icon: '🌸',
            badge: 'ELEGANT',
            description: 'A pure and luminous white floral composition centered around the intoxicating scent of gardenia. Delicate yet memorable, romantic yet modern.',
            topNotes: 'Green Leaves, Neroli, Lemon',
            heartNotes: 'Gardenia, Tuberose, Orange Blossom',
            baseNotes: 'White Amber, Sandalwood, Musk',
            labelText: 'GARDENIA',
            labelSubtext: 'BLANCHE'
        },
        'noir-intense': {
            name: 'Noir Intense',
            category: 'WOODY • MASCULINE',
            price: '$310',
            icon: '🖤',
            badge: 'BOLD',
            description: 'An intensely masculine fragrance that commands attention. Dark, mysterious, and unforgettably powerful with notes of vetiver, black pepper, and tobacco.',
            topNotes: 'Black Pepper, Ginger, Grapefruit',
            heartNotes: 'Vetiver, Tobacco, Iris',
            baseNotes: 'Cedarwood, Leather, Tonka Bean',
            labelText: 'NOIR',
            labelSubtext: 'INTENSE'
        },
        'silk-oud': {
            name: 'Silk & Oud',
            category: 'ORIENTAL • UNISEX',
            price: '$355',
            icon: '✨',
            badge: 'EXCLUSIVE',
            description: 'A masterful fusion of soft silk musk and precious oud creates an enveloping, luxurious experience. Smooth, mesmerizing, and utterly unique.',
            topNotes: 'Cashmere, Pink Pepper, Bergamot',
            heartNotes: 'Oud, Silk Musk, Rose',
            baseNotes: 'Cashmere Woods, Amber, Vanilla',
            labelText: 'SILK',
            labelSubtext: '& OUD'
        }
    };

    // Update page content based on product ID
    if (products[productId]) {
        const product = products[productId];
        
        // Update all product details
        const titleEl = document.querySelector('.product-title');
        if (titleEl) titleEl.textContent = product.name;
        
        const categoryEl = document.querySelector('.product-category');
        if (categoryEl) categoryEl.textContent = product.category;
        
        const priceEl = document.querySelector('.price-amount');
        if (priceEl) priceEl.textContent = product.price;
        
        const badgeEl = document.querySelector('.product-badge');
        if (badgeEl) badgeEl.textContent = product.badge;
        
        const descEl = document.querySelector('.product-description');
        if (descEl) descEl.textContent = product.description;
        
        // Update notes
        const noteSections = document.querySelectorAll('.notes-section p');
        if (noteSections[0]) noteSections[0].textContent = product.topNotes;
        if (noteSections[1]) noteSections[1].textContent = product.heartNotes;
        if (noteSections[2]) noteSections[2].textContent = product.baseNotes;
        
        // Update bottle label
        const labelText = document.querySelector('.label-text');
        const labelSubtext = document.querySelector('.label-subtext');
        if (labelText) labelText.textContent = product.labelText;
        if (labelSubtext) labelSubtext.textContent = product.labelSubtext;
        
        // Update page title
        document.title = `${product.name} - NOIR ESSENCE`;
    }
}

// ============================================
// COLLECTION PAGE FILTER (already in HTML but keeping for reference)
// ============================================

// ============================================
// CUSTOM CURSOR EFFECT (OPTIONAL - SUBTLE)
// ============================================
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// ============================================
// FORM VALIDATION (Optional Enhancement)
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Add your form validation logic here
        // For now, just allow default submission
        console.log('Form submitted');
    });
}

// ============================================
// ADD TO CART FUNCTIONALITY (Placeholder)
// ============================================
const addToCartBtn = document.querySelector('.btn-add-to-cart');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        // Animate button
        this.textContent = 'ADDED TO CART!';
        this.style.background = 'var(--gold)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.textContent = 'ADD TO CART';
            this.style.background = 'var(--noir)';
        }, 2000);
        
        // Here you would typically add the product to a cart
        console.log('Product added to cart');
    });
}

// ============================================
// WISHLIST FUNCTIONALITY (Placeholder)
// ============================================
const wishlistBtn = document.querySelector('.btn-wishlist');
if (wishlistBtn) {
    let isWishlisted = false;
    
    wishlistBtn.addEventListener('click', function() {
        isWishlisted = !isWishlisted;
        
        if (isWishlisted) {
            this.textContent = '♥ ADDED TO WISHLIST';
            this.style.background = 'var(--noir)';
            this.style.color = 'white';
        } else {
            this.textContent = '♡ ADD TO WISHLIST';
            this.style.background = 'white';
            this.style.color = 'var(--noir)';
        }
        
        console.log('Wishlist toggled:', isWishlisted);
    });
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c NOIR ESSENCE ', 'background: #0a0a0a; color: #c9a961; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c L\'Art de la Parfumerie ', 'background: #c9a961; color: white; font-size: 14px; padding: 5px;');
