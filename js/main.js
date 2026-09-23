/**
 * Urban Glow Streetwear - Main JavaScript File
 * Vanilla ES6+ implementation for interactive features
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. Mobile Menu Toggle
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    // Toggle active state on hamburger click
    hamburger.addEventListener('click', (event) => {
      event.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when any navigation link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside of navbar menu and toggle button
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 2. Smooth Scroll (with 65px navbar offset)
  // ==========================================================================
  const NAVBAR_HEIGHT = 65;
  const internalAnchors = document.querySelectorAll('a[href^="#"]');

  internalAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetHash = anchor.getAttribute('href');

      if (!targetHash || targetHash === '#') {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const targetElement = document.querySelector(targetHash);
      if (targetElement) {
        event.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - NAVBAR_HEIGHT;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // 3. Scroll to Top Button
  // ==========================================================================
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    const handleScrollTopVisibility = () => {
      if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });
    handleScrollTopVisibility();

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 4. Navbar Scroll Effect (scrolled past 100px)
  // ==========================================================================
  const navbar = document.getElementById('navbar');

  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  // ==========================================================================
  // 5. Product Filter Tabs
  // ==========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  if (filterTabs.length && productCards.length) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Set active tab styling
        filterTabs.forEach((btn) => btn.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');
        let staggerCount = 0;

        productCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          const isMatch = filterValue === 'all' || category === filterValue;

          if (isMatch) {
            card.classList.remove('hidden');

            // Stagger animation: brief opacity and translation entrance
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

            const delay = staggerCount * 70;
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, delay);

            staggerCount++;
          } else {
            card.classList.add('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 6. Hero Product Slider
  // ==========================================================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroThumbs = document.querySelectorAll('.thumb');
  const heroNextBtn = document.getElementById('heroNextBtn');
  const heroProductName = document.getElementById('heroProductName');
  const heroProductMeta = document.querySelector('.hero-product-meta');

  const heroProducts = [
    { name: 'CAMISETA SAMURAI FURY', meta: 'Algodón 100% Oversize • Estampado Mega Link' },
    { name: 'CAMISETA RACING DEPT', meta: 'Algodón 100% Oversize • Estampado DTF Premium' }
  ];

  let currentSlideIndex = 0;
  let autoSlideTimer = null;

  const updateSlide = (index) => {
    const totalSlides = heroSlides.length;
    if (totalSlides === 0) return;

    currentSlideIndex = (index + totalSlides) % totalSlides;

    // Update active slide
    heroSlides.forEach((slide) => {
      const slideIndex = parseInt(slide.getAttribute('data-slide'), 10);
      if (slideIndex === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update active thumbnail
    heroThumbs.forEach((thumb) => {
      const thumbIndex = parseInt(thumb.getAttribute('data-thumb'), 10);
      if (thumbIndex === currentSlideIndex) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });

    // Update product text info
    const productInfo = heroProducts[currentSlideIndex];
    if (productInfo) {
      if (heroProductName) {
        heroProductName.textContent = productInfo.name;
      }
      if (heroProductMeta) {
        heroProductMeta.textContent = productInfo.meta;
      }
    }
  };

  const startAutoAdvance = () => {
    stopAutoAdvance();
    autoSlideTimer = setInterval(() => {
      updateSlide(currentSlideIndex + 1);
    }, 5000);
  };

  const stopAutoAdvance = () => {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  };

  if (heroSlides.length > 0) {
    // Thumbnail click handlers
    heroThumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const selectedIndex = parseInt(thumb.getAttribute('data-thumb'), 10);
        if (!isNaN(selectedIndex)) {
          updateSlide(selectedIndex);
          startAutoAdvance();
        }
      });
    });

    // Next button click handler
    if (heroNextBtn) {
      heroNextBtn.addEventListener('click', () => {
        updateSlide(currentSlideIndex + 1);
        startAutoAdvance();
      });
    }

    // Initialize auto-advance timer
    startAutoAdvance();
  }

  // ==========================================================================
  // 7. Intersection Observer for Fade-in Animations
  // ==========================================================================
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const fadeInObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    fadeElements.forEach((element) => fadeInObserver.observe(element));
  } else {
    // Fallback if IntersectionObserver is unavailable
    fadeElements.forEach((element) => element.classList.add('visible'));
  }

  // ==========================================================================
  // 8. Active Nav Link on Scroll
  // ==========================================================================
  const trackedSectionIds = ['coleccion', 'materiales', 'instagram'];
  const trackedSections = trackedSectionIds
    .map((id) => document.getElementById(id))
    .filter((section) => section !== null);
  const navAnchorElements = document.querySelectorAll('#navLinks a');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.pageYOffset + NAVBAR_HEIGHT + 50;
    let activeSectionId = '';

    trackedSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSectionId = section.getAttribute('id');
      }
    });

    navAnchorElements.forEach((link) => {
      const targetHash = link.getAttribute('href');
      if (activeSectionId && targetHash === `#${activeSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll();
});
