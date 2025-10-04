/**
 * Apple-Style Landing Page Interactions
 * Sophisticated animations and interactions inspired by apple.com
 */

class LandingPageController {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupNavigation();
        // this.setupParallaxEffects();
        this.setupHoverEffects();
        this.setupKeyboardNavigation();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
        this.setupHorizontalCarousel();
        this.setupCombinedCarousel();
    }

    // Theme toggle functionality
    setupThemeToggle() {
        // Get saved theme or default to system
        const savedTheme = localStorage.getItem('theme') || 'system';
        this.setTheme(savedTheme);
        
        // Set up toggle buttons
        const themeButtons = document.querySelectorAll('.theme-option');
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                this.setTheme(theme);
                localStorage.setItem('theme', theme);
            });
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
                this.updateThemeDisplay();
            }
        });
    }
    
    setTheme(theme) {
        const body = document.body;
        
        // Remove existing theme attributes
        body.removeAttribute('data-theme');
        
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
        } else if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
        }
        // For 'system', we don't set data-theme, letting CSS media queries handle it
        
        this.updateThemeToggle(theme);
    }
    
    updateThemeToggle(activeTheme) {
        const themeButtons = document.querySelectorAll('.theme-option');
        themeButtons.forEach(button => {
            const theme = button.getAttribute('data-theme');
            if (theme === activeTheme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Smooth scroll-triggered animations with performance optimization
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.feature-card, .workflow-step, .hero-content, .download-content')
            .forEach(el => {
                el.classList.add('animate-in');
                observer.observe(el);
            });
    }

    animateElement(element) {
        if (element.classList.contains('animated')) return;

        element.classList.add('visible', 'animated');
        
        // Add staggered animations for child elements
        const children = element.querySelectorAll('.feature-title, .feature-description, .step-title, .step-description');
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
            child.classList.add('visible');
        });
        
        // Special handling for workflow steps to animate step icons
        if (element.classList.contains('workflow-step')) {
            const stepIcon = element.querySelector('.step-icon');
            if (stepIcon) {
                // Delay the icon animation slightly after the text
                setTimeout(() => {
                    element.classList.add('visible');
                }, 200);
            }
        }
    }

    // Smooth scrolling navigation
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Dynamic navigation with backdrop blur
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = 0;
        let ticking = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Add/remove scrolled class for styling
                    if (currentScrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }

                    // Auto-hide navbar disabled for normal scroll behavior
                    lastScrollY = currentScrollY;

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Optimized parallax effects
    setupParallaxEffects() {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        const heroWidgetImage = document.querySelector('.hero-widget-image');
        const featureImages = document.querySelectorAll('.feature-image, .widget-image');
        
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;

            // Subtle parallax for hero widget
            if (heroWidgetImage) {
                const rate = Math.round(scrolled * 0.05);
                heroWidgetImage.style.transform = `translateY(calc(-50% + ${rate}px)) translateZ(0)`;
            }

            // Optimized parallax for feature images
            featureImages.forEach((img) => {
                const rect = img.getBoundingClientRect();
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    const parallaxRate = Math.round((scrolled - img.offsetTop + window.innerHeight) * 0.03);
                    img.style.transform = `translate3d(0, ${parallaxRate}px, 0)`;
                }
            });

            ticking = false;
        };

        const handleParallaxScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleParallaxScroll, { passive: true });
    }

    // Advanced hover effects and micro-interactions
    setupHoverEffects() {
        // Feature card hover effects (disabled)
        // document.querySelectorAll('.feature-card').forEach(card => {
        //     card.addEventListener('mouseenter', (e) => {
        //         this.animateCardEnter(e.target);
        //     });

        //     card.addEventListener('mouseleave', (e) => {
        //         this.animateCardLeave(e.target);
        //     });
        // });

        // Button hover effects with ripple
        document.querySelectorAll('.hero-button, .download-button, .nav-cta').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });

        // Image tilt effects (disabled)
        // document.querySelectorAll('.feature-image, .hero-widget-image').forEach(img => {
        //     this.setupImageTilt(img);
        // });

        // Demo animation for shortcut keys
        this.setupShortcutDemo();
    }

    // animateCardEnter(card) {
    //     const image = card.querySelector('.feature-image, .hero-image, .widget-image');
    //     
    //     card.style.transform = 'translate3d(0, -8px, 0)';
    //     card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
    //     
    //     if (image) {
    //         image.style.transform = 'translate3d(0, 0, 0) scale(1.05)';
    //     }
    // }

    // animateCardLeave(card) {
    //     const image = card.querySelector('.feature-image, .hero-image, .widget-image');
    //     
    //     card.style.transform = 'translate3d(0, 0, 0)';
    //     card.style.boxShadow = '';
    //     
    //     if (image) {
    //         image.style.transform = 'translate3d(0, 0, 0) scale(1)';
    //     }
    // }

    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // setupImageTilt(img) {
    //     if (window.innerWidth < 768) return; // Skip on mobile
    //     
    //     img.addEventListener('mousemove', (e) => {
    //         const rect = img.getBoundingClientRect();
    //         const x = e.clientX - rect.left;
    //         const y = e.clientY - rect.top;
    //         
    //         const centerX = rect.width / 2;
    //         const centerY = rect.height / 2;
    //         
    //         const rotateX = Math.round((y - centerY) / centerY * -3);
    //         const rotateY = Math.round((x - centerX) / centerX * 3);
    //         
    //         img.style.transform = `translate3d(0, 0, 0) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    //         img.style.willChange = 'transform';
    //     });

    //     img.addEventListener('mouseleave', () => {
    //         img.style.transform = 'translate3d(0, 0, 0)';
    //         img.style.willChange = 'auto';
    //     });
    // }

    setupShortcutDemo() {
        const demoSteps = document.querySelectorAll('.demo-step');
        
        demoSteps.forEach((step, index) => {
            // Add pulsing effect to demo keys immediately
            const keys = step.querySelectorAll('.demo-key');
            keys.forEach(key => {
                // Add delay to stagger the pulse animation
                setTimeout(() => {
                    key.style.animation = 'pulse 2s ease-in-out infinite';
                }, index * 500 + 1000);
            });
        });
    }

    // Keyboard navigation support
    setupKeyboardNavigation() {
        let isUsingKeyboard = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                isUsingKeyboard = true;
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            isUsingKeyboard = false;
            document.body.classList.remove('keyboard-nav');
        });

        // Arrow key navigation for feature cards
        document.addEventListener('keydown', (e) => {
            if (!isUsingKeyboard) return;
            
            const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
            
            if (e.key === 'ArrowRight' && currentIndex < focusableElements.length - 1) {
                e.preventDefault();
                focusableElements[currentIndex + 1].focus();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                focusableElements[currentIndex - 1].focus();
            }
        });
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy load images that are not immediately visible
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        images.forEach(img => imageObserver.observe(img));

        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150);
        });

        // Preload critical resources
        this.preloadCriticalResources();
    }

    handleResize() {
        // Recalculate animations and layouts on resize
        const heroContainer = document.querySelector('.hero-container');
        const featureGrid = document.querySelector('.feature-grid');
        
        // Reset transforms on mobile
        if (window.innerWidth < 768) {
            document.querySelectorAll('.hero-widget-image, .feature-image').forEach(img => {
                img.style.transform = 'translateZ(0)';
                img.style.willChange = 'auto';
            });
        }
    }

    preloadCriticalResources() {
        // Preload hero image and critical assets
        const criticalImages = [
            'main-app-interface.png',
            'quick-launcher-menu.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Accessibility enhancements
    setupAccessibility() {
        // Add aria labels for better screen reader support
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.setAttribute('aria-label', `Feature ${index + 1}`);
        });

        // Respect reduced motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
        }

        // High contrast mode support
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }

        // Focus management for modal-like interactions
        this.setupFocusManagement();
    }

    setupFocusManagement() {
        // Trap focus within modal-like components when they're active
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any modal-like elements
                document.querySelectorAll('.modal-like').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
    }

    // Carousel with auto-rotation
    setupCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.pagination-dot');

        if (slides.length === 0 || dots.length === 0) return;

        let currentSlide = 0;
        let autoRotateInterval = null;

        const goToSlide = (index) => {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to target slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');

            currentSlide = index;
        };

        const nextSlide = () => {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        };

        // Start auto-rotation (5 seconds per slide)
        const startAutoRotate = () => {
            autoRotateInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoRotate = () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        };

        // Click handlers for pagination dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoRotate();
                // Restart auto-rotation after user interaction
                setTimeout(startAutoRotate, 8000);
            });
        });

        // Pause auto-rotation on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoRotate);
            carouselContainer.addEventListener('mouseleave', startAutoRotate);
        }

        // Start auto-rotation
        startAutoRotate();
    }

    // Horizontal Carousel
    setupHorizontalCarousel() {
        const container = document.querySelector('.horizontal-carousel-container');
        const track = document.querySelector('.horizontal-carousel-track');
        const items = document.querySelectorAll('.horizontal-carousel-item');
        const dotsContainer = document.querySelector('.horizontal-carousel-dots');
        const dots = document.querySelectorAll('.horizontal-dot');

        if (!container || items.length === 0 || dots.length === 0) return;

        let currentIndex = 0;

        // Check if scrolling is needed
        const checkScrollNeeded = () => {
            const isScrollable = container.scrollWidth > container.clientWidth;
            if (dotsContainer) {
                dotsContainer.style.display = isScrollable ? 'flex' : 'none';
            }
        };

        const updateActiveDot = (index) => {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        };

        const scrollToItem = (index) => {
            const item = items[index];
            if (item) {
                const scrollLeft = item.offsetLeft - container.offsetLeft;
                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
                currentIndex = index;
                updateActiveDot(index);
            }
        };

        // Click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToItem(index);
            });
        });

        // Update dots on scroll
        let scrollTimeout;
        container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const containerRect = container.getBoundingClientRect();
                const containerCenter = containerRect.left + containerRect.width / 2;

                let closestIndex = 0;
                let closestDistance = Infinity;

                items.forEach((item, index) => {
                    const itemRect = item.getBoundingClientRect();
                    const itemCenter = itemRect.left + itemRect.width / 2;
                    const distance = Math.abs(containerCenter - itemCenter);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                });

                if (closestIndex !== currentIndex) {
                    currentIndex = closestIndex;
                    updateActiveDot(currentIndex);
                }
            }, 100);
        });

        // Check on load and resize
        checkScrollNeeded();
        window.addEventListener('resize', checkScrollNeeded);
    }

    // Combined Carousel
    setupCombinedCarousel() {
        const container = document.querySelector('.combined-carousel-container');
        const items = document.querySelectorAll('.combined-carousel-item');
        const dots = document.querySelectorAll('.combined-dot');

        if (!container || items.length === 0 || dots.length === 0) return;

        let currentIndex = 0;

        const updateActiveDot = (index) => {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        };

        const scrollToItem = (index) => {
            const item = items[index];
            if (item) {
                const scrollLeft = item.offsetLeft - container.offsetLeft;
                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
                currentIndex = index;
                updateActiveDot(index);
            }
        };

        // Click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToItem(index);
            });
        });

        // Update dots on scroll
        let scrollTimeout;
        container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const containerRect = container.getBoundingClientRect();
                const containerCenter = containerRect.left + containerRect.width / 2;

                let closestIndex = 0;
                let closestDistance = Infinity;

                items.forEach((item, index) => {
                    const itemRect = item.getBoundingClientRect();
                    const itemCenter = itemRect.left + itemRect.width / 2;
                    const distance = Math.abs(containerCenter - itemCenter);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                });

                if (closestIndex !== currentIndex) {
                    currentIndex = closestIndex;
                    updateActiveDot(currentIndex);
                }
            }, 100);
        });
    }
}

// Advanced scroll effects
class ScrollEffects {
    constructor() {
        this.setupScrollProgress();
        this.setupScrollSnap();
    }

    setupScrollProgress() {
        // Scroll progress disabled
    }

    setupScrollSnap() {
        // Disabled - allowing normal scroll behavior
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + window.innerHeight / 2;

        for (let section of sections) {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                return section;
            }
        }
        return sections[0];
    }

    getNextSection(currentSection, direction) {
        const sections = Array.from(document.querySelectorAll('section'));
        const currentIndex = sections.indexOf(currentSection);

        if (direction === 'down' && currentIndex < sections.length - 1) {
            return sections[currentIndex + 1];
        } else if (direction === 'up' && currentIndex > 0) {
            return sections[currentIndex - 1];
        }
        return null;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const controller = new LandingPageController();
    const scrollEffects = new ScrollEffects();

    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-1px); }
            75% { transform: translateX(1px); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .keyboard-nav *:focus {
            outline: 2px solid #007AFF;
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }
        
        .feature-card, .hero-button, .download-button {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .demo-step {
            opacity: 1;
            transform: translateX(0);
        }
        
        /* Smooth image loading */
        img {
            transition: opacity 0.3s ease;
        }
        
        img[data-src] {
            opacity: 0;
        }
        
        /* Step icon scroll animation */
        .step-icon {
            transform: scale(0.8);
            transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .workflow-step.visible .step-icon {
            transform: scale(1);
            box-shadow: 0 8px 25px rgba(0, 122, 255, 0.3);
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
            .animate-in {
                transition: none;
            }
            
            .feature-card, .hero-button, .download-button {
                transition: none;
            }
        }
        
        .high-contrast .feature-card {
            border: 2px solid #000;
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
        }
        
        [data-theme="dark"] .navbar.scrolled {
            background: rgba(0, 0, 0, 0.95);
        }
        
        @media (prefers-color-scheme: dark) {
            .navbar.scrolled {
                background: rgba(0, 0, 0, 0.95);
            }
        }
        
        [data-theme="light"] .navbar.scrolled {
            background: rgba(255, 255, 255, 0.95);
        }
    `;
    document.head.appendChild(style);
});

// Export for potential use in other scripts
window.LandingPageController = LandingPageController;