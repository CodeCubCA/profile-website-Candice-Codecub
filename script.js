// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
}

// Typing animation for hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 100);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill items animation on hover
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'translateY(-3px) scale(1.05)';
        skill.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
    });

    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'translateY(0) scale(1)';
        skill.style.boxShadow = 'none';
    });
});

// Add scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + '+';
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Add active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Real Estate Sales Game Logic
class RealEstateGame {
    constructor() {
        this.totalEarnings = 0;
        this.propertiesSold = 0;
        this.totalAttempts = 0;
        this.currentProperty = null;
        this.currentCustomer = null;

        this.properties = [
            {
                title: "Luxury Oceanfront Villa",
                price: 2850000,
                bedrooms: 5,
                bathrooms: 4,
                sqft: 4200,
                yearBuilt: 2019,
                emoji: "🏖️",
                description: "Stunning oceanfront villa with panoramic views, private beach access, gourmet kitchen, infinity pool, and smart home technology throughout.",
                keywords: ["ocean", "beach", "luxury", "modern", "pool", "views"]
            },
            {
                title: "Modern Downtown Penthouse",
                price: 3200000,
                bedrooms: 3,
                bathrooms: 3,
                sqft: 2800,
                yearBuilt: 2021,
                emoji: "🏙️",
                description: "Sophisticated penthouse in the heart of downtown with floor-to-ceiling windows, rooftop terrace, and concierge services.",
                keywords: ["downtown", "penthouse", "modern", "city", "terrace", "luxury"]
            },
            {
                title: "Historic Mansion Estate",
                price: 4500000,
                bedrooms: 8,
                bathrooms: 6,
                sqft: 7200,
                yearBuilt: 1925,
                emoji: "🏰",
                description: "Beautifully restored historic mansion on 5 acres with original hardwood floors, grand staircase, and formal gardens.",
                keywords: ["historic", "mansion", "estate", "gardens", "classic", "elegant"]
            },
            {
                title: "Mountain Ski Lodge",
                price: 2100000,
                bedrooms: 6,
                bathrooms: 4,
                sqft: 5000,
                yearBuilt: 2018,
                emoji: "🏔️",
                description: "Rustic luxury ski lodge with panoramic mountain views, stone fireplace, hot tub, and ski-in/ski-out access.",
                keywords: ["mountain", "ski", "lodge", "rustic", "fireplace", "views"]
            },
            {
                title: "Waterfront Contemporary",
                price: 1850000,
                bedrooms: 4,
                bathrooms: 3,
                sqft: 3200,
                yearBuilt: 2020,
                emoji: "🌊",
                description: "Sleek contemporary home on the waterfront with open concept design, chef's kitchen, and private dock.",
                keywords: ["waterfront", "contemporary", "dock", "modern", "open", "chef"]
            }
        ];

        this.customers = [
            {
                name: "Michael Thompson",
                budget: 3000000,
                notes: "Looking for a vacation home with ocean views and modern amenities.",
                preferences: ["ocean", "modern", "luxury", "views"]
            },
            {
                name: "Sarah Chen",
                budget: 3500000,
                notes: "Seeking a downtown property for entertaining clients and hosting events.",
                preferences: ["downtown", "penthouse", "modern", "entertaining"]
            },
            {
                name: "Robert Williams",
                budget: 5000000,
                notes: "Interested in historic properties with character and extensive grounds.",
                preferences: ["historic", "mansion", "estate", "classic"]
            },
            {
                name: "Lisa Rodriguez",
                budget: 2500000,
                notes: "Family looking for a ski property with plenty of space for children.",
                preferences: ["ski", "family", "mountain", "space"]
            },
            {
                name: "David Kim",
                budget: 2200000,
                notes: "Wants a waterfront property for weekend relaxation and boating.",
                preferences: ["waterfront", "contemporary", "dock", "relaxation"]
            }
        ];

        this.sophisticatedWords = [
            "exquisite", "luxurious", "pristine", "immaculate", "stunning", "breathtaking",
            "sophisticated", "elegant", "opulent", "magnificent", "extraordinary", "exceptional",
            "prestigious", "exclusive", "prime", "coveted", "unparalleled", "distinctive",
            "majestic", "beautiful", "restored", "historical", "formal", "grand", "gem"
        ];

        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.loadNewProperty();
        this.updateStats();
    }

    setupEventListeners() {
        document.getElementById('submit-pitch').addEventListener('click', () => this.evaluatePitch());
        document.getElementById('new-property').addEventListener('click', () => this.loadNewProperty());
    }

    findMatchingProperty(customer) {
        const affordableProperties = this.properties.filter(property =>
            property.price <= customer.budget
        );

        if (affordableProperties.length === 0) {
            return this.properties[Math.floor(Math.random() * this.properties.length)];
        }

        const scoredProperties = affordableProperties.map(property => {
            let score = 0;
            customer.preferences.forEach(preference => {
                if (property.keywords.includes(preference)) {
                    score += 1;
                }
            });
            return { property, score };
        });

        scoredProperties.sort((a, b) => b.score - a.score);

        const goodMatches = scoredProperties.filter(sp => sp.score > 0);
        if (goodMatches.length > 0) {
            const randomMatch = goodMatches[Math.floor(Math.random() * goodMatches.length)];
            return randomMatch.property;
        }

        return affordableProperties[Math.floor(Math.random() * affordableProperties.length)];
    }

    loadNewProperty() {
        this.currentCustomer = this.customers[Math.floor(Math.random() * this.customers.length)];
        this.currentProperty = this.findMatchingProperty(this.currentCustomer);

        document.getElementById('property-title').textContent = this.currentProperty.title;
        document.getElementById('property-price').textContent = `$${this.currentProperty.price.toLocaleString()}`;
        document.getElementById('property-image').textContent = this.currentProperty.emoji;
        document.getElementById('bedrooms').textContent = this.currentProperty.bedrooms;
        document.getElementById('bathrooms').textContent = this.currentProperty.bathrooms;
        document.getElementById('sqft').textContent = this.currentProperty.sqft.toLocaleString();
        document.getElementById('year-built').textContent = this.currentProperty.yearBuilt;
        document.getElementById('property-description').textContent = this.currentProperty.description;

        document.getElementById('customer-name').textContent = this.currentCustomer.name;
        document.getElementById('customer-budget').textContent = `$${this.currentCustomer.budget.toLocaleString()}`;
        document.getElementById('customer-notes').textContent = this.currentCustomer.notes;

        document.getElementById('sales-pitch').value = '';
        document.getElementById('evaluation-panel').style.display = 'none';
        document.getElementById('result-panel').style.display = 'none';
    }

    evaluatePitch() {
        const pitch = document.getElementById('sales-pitch').value.trim();

        if (pitch.length < 50) {
            alert('Please write a more detailed pitch (at least 50 characters).');
            return;
        }

        this.totalAttempts++;

        const evaluation = this.analyzePitch(pitch);
        this.displayEvaluation(evaluation);

        const success = this.calculateSuccess(evaluation);
        this.displayResult(success, evaluation);

        this.updateStats();
    }

    analyzePitch(pitch) {
        const words = pitch.toLowerCase().split(/\s+/);
        const sentences = pitch.split(/[.!?]+/).filter(s => s.trim().length > 0);

        const spellingScore = this.checkSpelling(pitch);
        const vocabularyScore = this.checkVocabulary(words);
        const relevanceScore = this.checkRelevance(words);
        const persuasivenessScore = this.checkPersuasiveness(pitch, sentences);

        return {
            spelling: spellingScore,
            vocabulary: vocabularyScore,
            relevance: relevanceScore,
            persuasiveness: persuasivenessScore,
            overall: (spellingScore + vocabularyScore + relevanceScore + persuasivenessScore) / 4
        };
    }

    checkSpelling(pitch) {
        const commonMisspellings = {
            'recieve': 'receive',
            'seperate': 'separate',
            'definately': 'definitely',
            'accomodate': 'accommodate',
            'occured': 'occurred',
            'beutiful': 'beautiful',
            'enviroment': 'environment',
            'necessery': 'necessary',
            'priviledge': 'privilege'
        };

        let errors = 0;
        const words = pitch.toLowerCase().split(/\s+/);

        words.forEach(word => {
            const cleanWord = word.replace(/[^\w]/g, '');
            if (commonMisspellings[cleanWord]) {
                errors++;
            }
        });

        const hasProperCapitalization = /^[A-Z]/.test(pitch.trim());
        const hasPunctuation = /[.!?]$/.test(pitch.trim());
        const hasBasicStructure = pitch.trim().length > 20 && /\s/.test(pitch);

        let score = 8; // More generous base score
        score -= errors * 1.5; // Less harsh penalty for errors
        if (!hasProperCapitalization) score -= 0.5;
        if (!hasPunctuation) score -= 0.5;
        if (hasBasicStructure) score += 1; // Bonus for proper structure

        return Math.max(0, Math.round(score));
    }

    checkVocabulary(words) {
        const sophisticatedWordsUsed = words.filter(word => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
            return this.sophisticatedWords.some(sw =>
                cleanWord.includes(sw.toLowerCase()) || sw.toLowerCase().includes(cleanWord)
            );
        }).length;

        const uniqueWords = new Set(words).size;
        const averageWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;

        let score = 2; // Base score
        score += Math.min(sophisticatedWordsUsed * 2, 6);
        score += Math.min((averageWordLength - 3) * 0.5, 2);

        return Math.min(10, Math.round(score));
    }

    checkRelevance(words) {
        const propertyKeywords = this.currentProperty.keywords;
        const customerPreferences = this.currentCustomer.preferences;

        let relevanceCount = 0;
        words.forEach(word => {
            // Check if word contains or is contained by any keyword (bidirectional)
            if (propertyKeywords.some(kw => word.includes(kw) || kw.includes(word)) ||
                customerPreferences.some(pref => word.includes(pref) || pref.includes(word))) {
                relevanceCount++;
            }
        });

        return Math.min(10, Math.round(relevanceCount * 1.5));
    }

    checkPersuasiveness(pitch, sentences) {
        const persuasiveWords = [
            'imagine', 'discover', 'experience', 'indulge', 'embrace', 'envision',
            'perfect', 'ideal', 'dream', 'opportunity', 'exclusive', 'limited',
            'luxurious', 'exquisite', 'magnificent', 'stunning', 'beautiful',
            'majestic', 'pristine', 'exceptional', 'extraordinary'
        ];

        const hasQuestions = /\?/.test(pitch);
        const hasEmotionalWords = persuasiveWords.some(word =>
            pitch.toLowerCase().includes(word)
        );
        const hasCallToAction = /\b(call|contact|visit|schedule|book|buy|purchase|own)\b/i.test(pitch);
        const sentenceVariety = sentences.length > 2;
        const hasExclamation = /!/.test(pitch);

        let score = 0;
        if (hasQuestions) score += 2;
        if (hasEmotionalWords) score += 3;
        if (hasCallToAction) score += 3;
        if (sentenceVariety) score += 1;
        if (hasExclamation) score += 1;

        return Math.min(10, score);
    }

    displayEvaluation(evaluation) {
        document.getElementById('spelling-score').textContent = `${evaluation.spelling}/10`;
        document.getElementById('vocabulary-score').textContent = `${evaluation.vocabulary}/10`;
        document.getElementById('relevance-score').textContent = `${evaluation.relevance}/10`;
        document.getElementById('persuasiveness-score').textContent = `${evaluation.persuasiveness}/10`;

        const scoreElements = ['spelling-score', 'vocabulary-score', 'relevance-score', 'persuasiveness-score'];
        const scores = [evaluation.spelling, evaluation.vocabulary, evaluation.relevance, evaluation.persuasiveness];

        scores.forEach((score, index) => {
            const element = document.getElementById(scoreElements[index]);
            element.className = 'evaluation-score';
            if (score >= 8) element.classList.add('score-excellent');
            else if (score >= 5) element.classList.add('score-good');
            else element.classList.add('score-poor');
        });

        document.getElementById('evaluation-panel').style.display = 'block';
    }

    calculateSuccess(evaluation) {
        const priceInBudget = this.currentProperty.price <= this.currentCustomer.budget;
        const overallScore = evaluation.overall;

        if (!priceInBudget) {
            return { success: false, reason: 'Price exceeds customer budget' };
        }

        if (overallScore >= 7) {
            return { success: true, quality: 'excellent' };
        } else if (overallScore >= 5) {
            return { success: true, quality: 'good' };
        } else {
            return { success: false, reason: 'Pitch quality too low' };
        }
    }

    displayResult(success, evaluation) {
        const resultPanel = document.getElementById('result-panel');

        if (success.success) {
            this.propertiesSold++;

            let commission = this.currentProperty.price * 0.03;

            if (success.quality === 'excellent') {
                commission *= 1.5;
                document.getElementById('result-title').textContent = 'Exceptional Sale!';
                document.getElementById('result-bonus').textContent = 'Base commission + 50% Excellence bonus';
                resultPanel.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            } else {
                document.getElementById('result-title').textContent = 'Sale Successful!';
                document.getElementById('result-bonus').textContent = 'Base commission earned';
                resultPanel.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
            }

            this.totalEarnings += commission;
            document.getElementById('result-earnings').textContent = `$${commission.toLocaleString()}`;
        } else {
            document.getElementById('result-title').textContent = 'Sale Failed';
            document.getElementById('result-earnings').textContent = '$0';
            document.getElementById('result-bonus').textContent = success.reason;
            resultPanel.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        }

        resultPanel.style.display = 'block';
    }

    updateStats() {
        document.getElementById('total-earnings').textContent = `$${this.totalEarnings.toLocaleString()}`;
        document.getElementById('properties-sold').textContent = this.propertiesSold;

        const successRate = this.totalAttempts > 0 ?
            Math.round((this.propertiesSold / this.totalAttempts) * 100) : 0;
        document.getElementById('success-rate').textContent = `${successRate}%`;

        let level = 'Rookie';
        if (this.totalEarnings >= 1000000) level = 'Elite Agent';
        else if (this.totalEarnings >= 500000) level = 'Senior Agent';
        else if (this.totalEarnings >= 100000) level = 'Professional';

        document.getElementById('current-level').textContent = level;
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('total-earnings')) {
        new RealEstateGame();
    }
    if (document.getElementById('logo-canvas')) {
        new LogoCreator();
    }
});

// Logo Creator Game Logic
class LogoCreator {
    constructor() {
        this.canvas = document.getElementById('logo-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentTool = 'select';
        this.currentColor = '#000000';
        this.currentShape = 'rectangle';
        this.currentLineThickness = 2;
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;
        this.elements = [];
        this.selectedElement = null;
        this.savedLogos = [];
        this.currentCompany = null;
        this.history = [];
        this.historyStep = -1;

        this.companies = [
            {
                name: "TechFlow Solutions",
                description: "A modern software development company specializing in workflow automation tools",
                industry: "Technology",
                style: "Modern & Clean",
                keywords: ["tech", "flow", "automation", "digital"]
            },
            {
                name: "Green Earth Organics",
                description: "Sustainable organic food producer focused on eco-friendly farming practices",
                industry: "Agriculture",
                style: "Natural & Organic",
                keywords: ["green", "earth", "organic", "natural", "eco"]
            },
            {
                name: "Stellar Fitness",
                description: "Premium fitness center offering personal training and wellness programs",
                industry: "Fitness",
                style: "Bold & Energetic",
                keywords: ["stellar", "fitness", "strength", "energy"]
            },
            {
                name: "Azure Marketing Group",
                description: "Creative marketing agency specializing in brand strategy and digital campaigns",
                industry: "Marketing",
                style: "Creative & Dynamic",
                keywords: ["azure", "creative", "marketing", "brand"]
            },
            {
                name: "Golden Brew Coffee",
                description: "Artisan coffee roastery serving premium small-batch coffee blends",
                industry: "Food & Beverage",
                style: "Warm & Artisanal",
                keywords: ["golden", "brew", "coffee", "artisan"]
            },
            {
                name: "Ocean Wave Medical",
                description: "Modern healthcare clinic specializing in family medicine and preventive care",
                industry: "Healthcare",
                style: "Clean & Professional",
                keywords: ["ocean", "wave", "medical", "health", "care"]
            },
            {
                name: "Bright Mind Academy",
                description: "Innovative educational institution focusing on STEM and creative learning",
                industry: "Education",
                style: "Bright & Inspiring",
                keywords: ["bright", "mind", "academy", "education", "learning"]
            },
            {
                name: "Crimson Legal Partners",
                description: "Full-service law firm providing corporate and personal legal services",
                industry: "Legal",
                style: "Professional & Trustworthy",
                keywords: ["crimson", "legal", "partners", "law", "justice"]
            },
            {
                name: "Skyline Construction Co.",
                description: "Commercial and residential construction company building modern structures",
                industry: "Construction",
                style: "Bold & Structural",
                keywords: ["skyline", "construction", "building", "modern"]
            },
            {
                name: "Aurora Beauty Spa",
                description: "Luxury spa offering rejuvenating treatments and wellness services",
                industry: "Beauty & Wellness",
                style: "Elegant & Serene",
                keywords: ["aurora", "beauty", "spa", "luxury", "wellness"]
            },
            {
                name: "Swift Delivery Solutions",
                description: "Logistics company providing fast and reliable shipping services nationwide",
                industry: "Logistics",
                style: "Dynamic & Reliable",
                keywords: ["swift", "delivery", "logistics", "fast", "shipping"]
            },
            {
                name: "Diamond Financial Group",
                description: "Investment advisory firm helping clients build wealth and secure futures",
                industry: "Finance",
                style: "Prestigious & Secure",
                keywords: ["diamond", "financial", "investment", "wealth"]
            },
            {
                name: "Vintage Threads Boutique",
                description: "Curated fashion store featuring unique vintage and contemporary clothing",
                industry: "Fashion",
                style: "Trendy & Unique",
                keywords: ["vintage", "threads", "fashion", "boutique", "style"]
            },
            {
                name: "Pine Valley Real Estate",
                description: "Real estate agency specializing in luxury homes and commercial properties",
                industry: "Real Estate",
                style: "Professional & Upscale",
                keywords: ["pine", "valley", "real estate", "luxury", "homes"]
            },
            {
                name: "Electric Storm Gaming",
                description: "Game development studio creating immersive virtual reality experiences",
                industry: "Gaming",
                style: "Futuristic & Energetic",
                keywords: ["electric", "storm", "gaming", "virtual", "reality"]
            },
            {
                name: "Moonlight Catering",
                description: "Gourmet catering service for weddings, corporate events, and special occasions",
                industry: "Catering",
                style: "Elegant & Sophisticated",
                keywords: ["moonlight", "catering", "gourmet", "events"]
            },
            {
                name: "Thunder Automotive",
                description: "Full-service auto repair shop specializing in performance and luxury vehicles",
                industry: "Automotive",
                style: "Bold & Powerful",
                keywords: ["thunder", "automotive", "performance", "luxury"]
            },
            {
                name: "Crystal Lake Photography",
                description: "Professional photography studio capturing life's precious moments beautifully",
                industry: "Photography",
                style: "Artistic & Elegant",
                keywords: ["crystal", "lake", "photography", "artistic", "moments"]
            },
            {
                name: "Emerald Garden Landscaping",
                description: "Landscape design company creating stunning outdoor spaces and gardens",
                industry: "Landscaping",
                style: "Natural & Fresh",
                keywords: ["emerald", "garden", "landscaping", "outdoor", "nature"]
            },
            {
                name: "Sunrise Bakery & Café",
                description: "Artisan bakery serving fresh breads, pastries, and specialty coffee daily",
                industry: "Food & Beverage",
                style: "Warm & Inviting",
                keywords: ["sunrise", "bakery", "café", "fresh", "artisan"]
            },
            {
                name: "Cyber Shield Security",
                description: "Cybersecurity firm protecting businesses from digital threats and data breaches",
                industry: "Cybersecurity",
                style: "Modern & Secure",
                keywords: ["cyber", "shield", "security", "protection", "digital"]
            },
            {
                name: "Blue Horizon Travel",
                description: "Travel agency specializing in luxury vacations and adventure travel experiences",
                industry: "Travel",
                style: "Adventurous & Luxurious",
                keywords: ["blue", "horizon", "travel", "luxury", "adventure"]
            },
            {
                name: "Redwood Furniture Craft",
                description: "Custom furniture maker creating handcrafted pieces from sustainable materials",
                industry: "Furniture",
                style: "Rustic & Artisanal",
                keywords: ["redwood", "furniture", "craft", "handcrafted", "sustainable"]
            },
            {
                name: "Starlight Entertainment",
                description: "Event planning company producing memorable concerts, festivals, and shows",
                industry: "Entertainment",
                style: "Glamorous & Dynamic",
                keywords: ["starlight", "entertainment", "events", "concerts", "shows"]
            }
        ];

        // Bind methods to preserve 'this' context
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.initializeCanvas();
        this.setupEventListeners();
        this.loadNewCompany();

        // Initialize history with initial state
        this.saveState();
    }

    initializeCanvas() {
        // Set canvas size explicitly to prevent scaling issues
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = 400;
        this.canvas.height = 400;

        // Set CSS size to match canvas resolution
        this.canvas.style.width = '400px';
        this.canvas.style.height = '400px';

        // Clear and set white background
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Set default drawing properties
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.drawGrid();
    }

    drawGrid() {
        const showGrid = document.getElementById('show-grid').checked;
        if (!showGrid) return;

        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 1;

        for (let x = 0; x <= this.canvas.width; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y <= this.canvas.height; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    setupEventListeners() {
        // Tool selection
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.tool-btn.active').classList.remove('active');
                e.target.classList.add('active');
                this.currentTool = e.target.dataset.tool;
            });
        });

        // Color selection
        document.querySelectorAll('.color-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelector('.color-item.active').classList.remove('active');
                e.target.classList.add('active');
                this.currentColor = e.target.dataset.color;
            });
        });

        document.getElementById('custom-color').addEventListener('change', (e) => {
            this.currentColor = e.target.value;
        });

        // Shape selection
        document.querySelectorAll('.shape-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.shape-btn.active').classList.remove('active');
                e.target.classList.add('active');
                this.currentShape = e.target.dataset.shape;
            });
        });

        // Font size
        document.getElementById('font-size').addEventListener('input', (e) => {
            document.getElementById('font-size-display').textContent = e.target.value + 'px';
        });

        // Line thickness
        document.getElementById('line-thickness').addEventListener('input', (e) => {
            this.currentLineThickness = parseInt(e.target.value);
            document.getElementById('line-thickness-display').textContent = e.target.value + 'px';
        });

        // Canvas events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        // Add keyboard events for delete
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Action buttons
        document.getElementById('new-company-btn').addEventListener('click', () => this.loadNewCompany());
        document.getElementById('clear-canvas').addEventListener('click', () => this.clearCanvas());
        document.getElementById('download-logo').addEventListener('click', () => this.downloadLogo());
        document.getElementById('submit-logo').addEventListener('click', () => this.submitLogo());
        document.getElementById('delete-selected').addEventListener('click', () => this.deleteSelected());
        document.getElementById('undo-btn').addEventListener('click', () => this.undo());
        document.getElementById('redo-btn').addEventListener('click', () => this.redo());
        document.getElementById('show-grid').addEventListener('change', () => this.redraw());
    }

    loadNewCompany() {
        this.currentCompany = this.companies[Math.floor(Math.random() * this.companies.length)];
        document.getElementById('company-name').textContent = this.currentCompany.name;
        document.getElementById('company-description').textContent = this.currentCompany.description;
        document.getElementById('company-industry').textContent = this.currentCompany.industry;
        document.getElementById('company-style').textContent = this.currentCompany.style;
        document.getElementById('evaluation-section').style.display = 'none';
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    handleMouseDown(e) {
        const pos = this.getMousePos(e);
        this.startX = pos.x;
        this.startY = pos.y;
        this.isDrawing = true;

        if (this.currentTool === 'select') {
            this.selectElement(pos.x, pos.y);
            this.isDrawing = false; // Don't drag for selection
        } else if (this.currentTool === 'text') {
            this.saveState(); // Save for undo
            this.addText(pos.x, pos.y);
        } else if (this.currentTool === 'draw') {
            this.saveState(); // Save for undo
            this.startDrawing(pos.x, pos.y);
        } else if (this.currentTool === 'shape') {
            this.saveState(); // Save for undo
        }
    }

    handleMouseMove(e) {
        if (!this.isDrawing) return;

        const pos = this.getMousePos(e);

        if (this.currentTool === 'draw') {
            this.continueDraw(pos.x, pos.y);
        }
    }

    handleMouseUp(e) {
        if (!this.isDrawing) return;
        this.isDrawing = false;

        const pos = this.getMousePos(e);

        if (this.currentTool === 'shape') {
            this.addShape(this.startX, this.startY, pos.x, pos.y);
        } else if (this.currentTool === 'draw' && this.currentPath) {
            // Finish the drawing path and add it to elements
            this.elements.push(this.currentPath);
            this.currentPath = null;
        }
    }

    addText(x, y) {
        const text = document.getElementById('text-input').value;
        const fontSize = document.getElementById('font-size').value;
        const fontFamily = document.getElementById('font-family').value;

        const textElement = {
            type: 'text',
            text: text,
            x: x,
            y: y,
            fontSize: parseInt(fontSize),
            fontFamily: fontFamily,
            color: this.currentColor
        };

        this.elements.push(textElement);
        this.redraw();
    }

    addShape(startX, startY, endX, endY) {
        const shapeElement = {
            type: 'shape',
            shape: this.currentShape,
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color: this.currentColor
        };

        this.elements.push(shapeElement);
        this.redraw();
    }

    startDrawing(x, y) {
        this.currentPath = {
            type: 'path',
            points: [{x, y}],
            color: this.currentColor,
            lineWidth: this.currentLineThickness
        };

        // Set up drawing context
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineWidth = this.currentLineThickness;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        // Store the last point for smooth drawing
        this.lastX = x;
        this.lastY = y;
    }

    continueDraw(x, y) {
        if (this.currentPath) {
            this.currentPath.points.push({x, y});

            // Draw smooth line from last point to current point
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();

            // Update last position
            this.lastX = x;
            this.lastY = y;
        }
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();

        // Draw all completed elements
        this.elements.forEach(element => {
            this.drawElement(element);
        });

        // Draw current path being drawn (if any)
        if (this.currentPath && this.isDrawing) {
            this.drawElement(this.currentPath);
        }

        // Draw selection indicator
        if (this.selectedElement) {
            this.drawSelectionIndicator(this.selectedElement);
        }
    }

    drawSelectionIndicator(element) {
        this.ctx.strokeStyle = '#00ccff';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);

        if (element.type === 'text') {
            const textWidth = this.ctx.measureText(element.text).width;
            const textHeight = parseInt(element.fontSize);
            this.ctx.strokeRect(element.x - 5, element.y - textHeight - 5, textWidth + 10, textHeight + 10);
        } else if (element.type === 'shape') {
            const minX = Math.min(element.startX, element.endX) - 5;
            const maxX = Math.max(element.startX, element.endX) + 5;
            const minY = Math.min(element.startY, element.endY) - 5;
            const maxY = Math.max(element.startY, element.endY) + 5;
            this.ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
        } else if (element.type === 'path') {
            // Draw bounding box around path
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            element.points.forEach(point => {
                minX = Math.min(minX, point.x);
                maxX = Math.max(maxX, point.x);
                minY = Math.min(minY, point.y);
                maxY = Math.max(maxY, point.y);
            });
            this.ctx.strokeRect(minX - 10, minY - 10, maxX - minX + 20, maxY - minY + 20);
        }

        this.ctx.setLineDash([]); // Reset line dash
    }

    drawElement(element) {
        this.ctx.fillStyle = element.color;
        this.ctx.strokeStyle = element.color;

        if (element.type === 'text') {
            this.ctx.font = `${element.fontSize}px ${element.fontFamily}`;
            this.ctx.fillText(element.text, element.x, element.y);
        } else if (element.type === 'shape') {
            this.drawShape(element);
        } else if (element.type === 'path') {
            this.drawPath(element);
        }
    }

    drawShape(element) {
        const width = element.endX - element.startX;
        const height = element.endY - element.startY;

        switch (element.shape) {
            case 'rectangle':
                this.ctx.fillRect(element.startX, element.startY, width, height);
                break;
            case 'circle':
                const radius = Math.sqrt(width * width + height * height) / 2;
                const centerX = element.startX + width / 2;
                const centerY = element.startY + height / 2;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, 2 * Math.PI);
                this.ctx.fill();
                break;
            case 'oval':
                const ovalCenterX = element.startX + width / 2;
                const ovalCenterY = element.startY + height / 2;
                const radiusX = Math.abs(width) / 2;
                const radiusY = Math.abs(height) / 2;
                this.ctx.beginPath();
                this.ctx.ellipse(ovalCenterX, ovalCenterY, radiusX, radiusY, 0, 0, 2 * Math.PI);
                this.ctx.fill();
                break;
            case 'triangle':
                this.ctx.beginPath();
                this.ctx.moveTo(element.startX + width / 2, element.startY);
                this.ctx.lineTo(element.startX, element.endY);
                this.ctx.lineTo(element.endX, element.endY);
                this.ctx.closePath();
                this.ctx.fill();
                break;
            case 'star':
                this.drawStar(element.startX + width / 2, element.startY + height / 2, Math.abs(width) / 4);
                break;
        }
    }

    drawStar(cx, cy, radius) {
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawPath(element) {
        if (element.points.length < 2) return;

        this.ctx.strokeStyle = element.color;
        this.ctx.lineWidth = element.lineWidth || 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(element.points[0].x, element.points[0].y);

        for (let i = 1; i < element.points.length; i++) {
            this.ctx.lineTo(element.points[i].x, element.points[i].y);
        }
        this.ctx.stroke();
    }

    handleKeyDown(e) {
        // Only handle keys when Logo Creator modal is open
        const modal = document.getElementById('logo-creator-modal');
        if (!modal || modal.style.display !== 'flex') return;

        if (e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();
            this.deleteSelected();
        } else if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.undo();
            } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
                e.preventDefault();
                this.redo();
            }
        }
    }

    selectElement(x, y) {
        // Find element at click position (reverse order to get top element)
        for (let i = this.elements.length - 1; i >= 0; i--) {
            const element = this.elements[i];
            if (this.isPointInElement(x, y, element)) {
                this.selectedElement = element;
                this.redraw();
                return true;
            }
        }

        // No element found, deselect
        this.selectedElement = null;
        this.redraw();
        return false;
    }

    isPointInElement(x, y, element) {
        if (element.type === 'text') {
            // Simple text bounds check
            const textWidth = this.ctx.measureText(element.text).width;
            const textHeight = parseInt(element.fontSize);
            return x >= element.x && x <= element.x + textWidth &&
                   y >= element.y - textHeight && y <= element.y;
        } else if (element.type === 'shape') {
            // Simple rectangle bounds check for all shapes
            const minX = Math.min(element.startX, element.endX);
            const maxX = Math.max(element.startX, element.endX);
            const minY = Math.min(element.startY, element.endY);
            const maxY = Math.max(element.startY, element.endY);
            return x >= minX && x <= maxX && y >= minY && y <= maxY;
        } else if (element.type === 'path') {
            // Check if point is near any part of the path
            const threshold = (element.lineWidth || 2) + 5;
            for (let i = 0; i < element.points.length; i++) {
                const point = element.points[i];
                const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
                if (distance <= threshold) return true;
            }
        }
        return false;
    }

    deleteSelected() {
        if (this.selectedElement) {
            this.saveState(); // Save for undo
            const index = this.elements.indexOf(this.selectedElement);
            if (index > -1) {
                this.elements.splice(index, 1);
                this.selectedElement = null;
                this.redraw();
            }
        }
    }

    saveState() {
        // Remove any redo history when new action is performed
        this.history = this.history.slice(0, this.historyStep + 1);

        // Add current state to history
        this.history.push({
            elements: JSON.parse(JSON.stringify(this.elements)),
            selectedElement: this.selectedElement
        });

        this.historyStep++;

        // Limit history size
        if (this.history.length > 50) {
            this.history.shift();
            this.historyStep--;
        }

        this.updateUndoRedoButtons();
    }

    undo() {
        if (this.historyStep > 0) {
            this.historyStep--;
            const state = this.history[this.historyStep];
            this.elements = JSON.parse(JSON.stringify(state.elements));
            this.selectedElement = state.selectedElement;
            this.redraw();
            this.updateUndoRedoButtons();
        }
    }

    redo() {
        if (this.historyStep < this.history.length - 1) {
            this.historyStep++;
            const state = this.history[this.historyStep];
            this.elements = JSON.parse(JSON.stringify(state.elements));
            this.selectedElement = state.selectedElement;
            this.redraw();
            this.updateUndoRedoButtons();
        }
    }

    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('undo-btn');
        const redoBtn = document.getElementById('redo-btn');

        if (undoBtn) undoBtn.disabled = this.historyStep <= 0;
        if (redoBtn) redoBtn.disabled = this.historyStep >= this.history.length - 1;
    }

    clearCanvas() {
        this.saveState(); // Save for undo
        this.elements = [];
        this.selectedElement = null;
        this.initializeCanvas();
    }

    downloadLogo() {
        const link = document.createElement('a');
        link.download = `${this.currentCompany.name.replace(/\s+/g, '_')}_logo.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }

    submitLogo() {
        const evaluation = this.evaluateLogo();
        this.displayEvaluation(evaluation);
        this.saveLogo();
    }

    evaluateLogo() {
        let creativity = 0;
        let relevance = 0;
        let professional = 0;
        let colorHarmony = 0;

        // Creativity based on number and variety of elements
        const uniqueTypes = new Set(this.elements.map(e => e.type)).size;
        creativity = Math.min(10, this.elements.length + uniqueTypes * 2);

        // Relevance based on company keywords and colors
        const hasText = this.elements.some(e => e.type === 'text');
        const colorCount = new Set(this.elements.map(e => e.color)).size;
        relevance = (hasText ? 5 : 0) + Math.min(5, colorCount * 2);

        // Professional based on balance and composition
        const hasShapes = this.elements.some(e => e.type === 'shape');
        professional = (hasText && hasShapes ? 7 : 4) + (this.elements.length > 1 ? 3 : 0);

        // Color harmony based on color variety and combinations
        colorHarmony = Math.min(10, 5 + colorCount);

        return {
            creativity: Math.min(10, creativity),
            relevance: Math.min(10, relevance),
            professional: Math.min(10, professional),
            colorHarmony: Math.min(10, colorHarmony)
        };
    }

    displayEvaluation(scores) {
        document.getElementById('creativity-score').textContent = `${scores.creativity}/10`;
        document.getElementById('relevance-score').textContent = `${scores.relevance}/10`;
        document.getElementById('professional-score').textContent = `${scores.professional}/10`;
        document.getElementById('color-score').textContent = `${scores.colorHarmony}/10`;

        const average = (scores.creativity + scores.relevance + scores.professional + scores.colorHarmony) / 4;
        document.getElementById('overall-score').textContent = `${average.toFixed(1)}/10`;

        // Generate detailed feedback
        const details = [];
        const getScoreLevel = (score) => {
            if (score >= 8) return 'Excellent';
            if (score >= 6) return 'Good';
            if (score >= 4) return 'Fair';
            return 'Needs Improvement';
        };

        details.push(`🎨 Creativity: ${getScoreLevel(scores.creativity)} (${scores.creativity}/10) - ${this.getCreativityFeedback(scores.creativity)}`);
        details.push(`🎯 Brand Relevance: ${getScoreLevel(scores.relevance)} (${scores.relevance}/10) - ${this.getRelevanceFeedback(scores.relevance)}`);
        details.push(`💼 Professional Quality: ${getScoreLevel(scores.professional)} (${scores.professional}/10) - ${this.getProfessionalFeedback(scores.professional)}`);
        details.push(`🌈 Color Harmony: ${getScoreLevel(scores.colorHarmony)} (${scores.colorHarmony}/10) - ${this.getColorFeedback(scores.colorHarmony)}`);

        const detailsList = document.getElementById('score-details');
        detailsList.innerHTML = details.map(detail => `<li>${detail}</li>`).join('');

        let title, message;
        if (average >= 8) {
            title = "Outstanding Design! 🏆";
            message = "Your logo demonstrates exceptional creativity and professional quality. This design would work great for a real company!";
        } else if (average >= 6) {
            title = "Great Work! 🌟";
            message = "This is a solid logo design with good visual appeal. With a few tweaks, this could be outstanding!";
        } else if (average >= 4) {
            title = "Good Start! 👍";
            message = "You're on the right track. Try adding more elements or refining your color choices for greater impact.";
        } else {
            title = "Keep Trying! 💪";
            message = "Practice makes perfect! Try experimenting with different tools, colors, and design approaches.";
        }

        document.getElementById('result-title').textContent = title;
        document.getElementById('result-message').textContent = message;
        document.getElementById('evaluation-section').style.display = 'block';
    }

    getCreativityFeedback(score) {
        if (score >= 8) return "Very unique and innovative design elements";
        if (score >= 6) return "Good variety of creative elements";
        if (score >= 4) return "Some creative elements, could use more variety";
        return "Try using more diverse tools and shapes";
    }

    getRelevanceFeedback(score) {
        if (score >= 8) return "Perfect match for the company's industry and style";
        if (score >= 6) return "Good alignment with company branding";
        if (score >= 4) return "Somewhat relevant, could better reflect the company";
        return "Consider the company's industry and target audience";
    }

    getProfessionalFeedback(score) {
        if (score >= 8) return "Excellent balance and commercial-ready quality";
        if (score >= 6) return "Good overall composition and polish";
        if (score >= 4) return "Decent structure, could use more refinement";
        return "Focus on balance and adding more design elements";
    }

    getColorFeedback(score) {
        if (score >= 8) return "Excellent color coordination and visual appeal";
        if (score >= 6) return "Good color choices that work well together";
        if (score >= 4) return "Colors work okay, could be more harmonious";
        return "Try using colors that complement each other better";
    }

    saveLogo() {
        const logoData = {
            company: this.currentCompany.name,
            dataUrl: this.canvas.toDataURL(),
            timestamp: new Date().toLocaleString()
        };

        this.savedLogos.push(logoData);
        this.updateLogoGallery();
    }

    updateLogoGallery() {
        const gallery = document.getElementById('saved-logos');
        gallery.innerHTML = '';

        this.savedLogos.forEach((logo, index) => {
            const logoItem = document.createElement('div');
            logoItem.className = 'saved-logo-item';
            logoItem.innerHTML = `
                <img src="${logo.dataUrl}" alt="Logo for ${logo.company}">
                <p>${logo.company}</p>
                <small>${logo.timestamp}</small>
            `;
            gallery.appendChild(logoItem);
        });
    }

    removeEventListeners() {
        // Remove canvas event listeners
        if (this.canvas) {
            this.canvas.removeEventListener('mousedown', this.handleMouseDown);
            this.canvas.removeEventListener('mousemove', this.handleMouseMove);
            this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        }
    }

    reinitializeCanvas() {
        // Remove old event listeners first
        this.removeEventListeners();

        // Clear existing canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.elements = [];
        this.selectedElement = null;

        // Reset canvas and reinitialize
        this.canvas = document.getElementById('logo-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Bind methods to preserve 'this' context
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        // Setup event listeners again
        this.setupEventListeners();

        // Generate new company
        this.generateNewCompany();

        // Reset tools to default
        this.currentTool = 'select';
        this.currentColor = '#000000';
        this.currentShape = 'rectangle';
        this.currentLineThickness = 2;

        // Reset history
        this.history = [];
        this.historyStep = -1;
        this.saveState(); // Save initial state

        // Update active tool button
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        const selectTool = document.getElementById('select-tool');
        if (selectTool) selectTool.classList.add('active');

        // Update active color
        document.querySelectorAll('.color-item').forEach(item => item.classList.remove('active'));
        const blackColor = document.querySelector('.color-item[data-color="#000000"]');
        if (blackColor) blackColor.classList.add('active');

        // Update active shape
        document.querySelectorAll('.shape-btn').forEach(btn => btn.classList.remove('active'));
        const rectShape = document.querySelector('.shape-btn[data-shape="rectangle"]');
        if (rectShape) rectShape.classList.add('active');

        // Reset line thickness slider
        const thicknessSlider = document.getElementById('line-thickness');
        if (thicknessSlider) {
            thicknessSlider.value = 2;
            document.getElementById('line-thickness-display').textContent = '2px';
        }

        this.updateUndoRedoButtons();
    }
}

// Sterling Games Modal Functions
function openRealEstateGame() {
    const modal = document.getElementById('real-estate-modal');
    const iframe = document.getElementById('real-estate-frame');

    // Show modal with animation
    modal.style.display = 'flex';

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    // Reload the iframe to reset the game
    iframe.src = iframe.src;
}

function closeRealEstateGame() {
    const modal = document.getElementById('real-estate-modal');

    // Hide modal
    modal.style.display = 'none';

    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

function openLogoCreator() {
    const modal = document.getElementById('logo-creator-modal');

    // Show modal with animation
    modal.style.display = 'flex';

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    // Initialize logo creator after modal is shown
    setTimeout(() => {
        if (!window.logoCreator) {
            window.logoCreator = new LogoCreator();
        } else {
            // Reinitialize canvas if already exists
            window.logoCreator.reinitializeCanvas();
        }
    }, 100);
}

function closeLogoCreator() {
    const modal = document.getElementById('logo-creator-modal');

    // Hide modal
    modal.style.display = 'none';

    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
document.addEventListener('DOMContentLoaded', function() {
    const realEstateModal = document.getElementById('real-estate-modal');
    const logoCreatorModal = document.getElementById('logo-creator-modal');

    // Real Estate modal events
    if (realEstateModal) {
        realEstateModal.addEventListener('click', function(e) {
            if (e.target === realEstateModal) {
                closeRealEstateGame();
            }
        });
    }

    // Logo Creator modal events
    if (logoCreatorModal) {
        logoCreatorModal.addEventListener('click', function(e) {
            if (e.target === logoCreatorModal) {
                closeLogoCreator();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (realEstateModal && realEstateModal.style.display === 'flex') {
                closeRealEstateGame();
            }
            if (logoCreatorModal && logoCreatorModal.style.display === 'flex') {
                closeLogoCreator();
            }
        }
    });

    // Game category filtering
    initGameFiltering();
});

// Game Category Filtering System
function initGameFiltering() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const gameCards = document.querySelectorAll('.game-card');

    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter game cards
            filterGames(filter, gameCards);
        });
    });
}

function filterGames(category, gameCards) {
    gameCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const tags = card.querySelectorAll('.tag');

        if (category === 'all') {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            let shouldShow = false;

            // Check if card has matching category attribute
            if (cardCategory === category) {
                shouldShow = true;
            }

            // Check if any tag matches the category
            tags.forEach(tag => {
                if (tag.textContent.toLowerCase().includes(category.toLowerCase())) {
                    shouldShow = true;
                }
            });

            // Show featured game always (Real Estate game)
            if (card.classList.contains('featured') && category === 'educational') {
                shouldShow = true;
            }

            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        }
    });
}