/* ========================================
   MAIN JS - Navigation, Smooth Scroll, Accordion, Reveal Animations
   ======================================== */

(function() {
  'use strict';

  // Mobile Navigation Toggle
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarLinks = document.getElementById('navbarLinks');
  const navbarElement = document.querySelector('.navbar');

  if (navbarToggle && navbarLinks) {
    navbarToggle.addEventListener('click', function() {
      navbarLinks.classList.toggle('active');
      const isExpanded = navbarLinks.classList.contains('active');
      navbarToggle.setAttribute('aria-expanded', isExpanded);
      
      // Add/remove class to navbar for white background
      if (navbarElement) {
        if (isExpanded) {
          navbarElement.classList.add('navbar--menu-open');
        } else {
          navbarElement.classList.remove('navbar--menu-open');
        }
      }
    });

    // Close mobile nav when clicking a link
    const navLinks = navbarLinks.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarLinks.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        if (navbarElement) {
          navbarElement.classList.remove('navbar--menu-open');
        }
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
      if (!navbarToggle.contains(event.target) && !navbarLinks.contains(event.target)) {
        navbarLinks.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        if (navbarElement) {
          navbarElement.classList.remove('navbar--menu-open');
        }
      }
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for sticky navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Accordion Functionality
  const accordions = document.querySelectorAll('.accordion');
  
  accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    const content = accordion.querySelector('.accordion-content');
    
    if (header && content) {
      header.addEventListener('click', function() {
        const isExpanded = accordion.getAttribute('aria-expanded') === 'true';
        
        // Close all other accordions (optional - remove if you want multiple open)
        // accordions.forEach(acc => {
        //   if (acc !== accordion) {
        //     acc.setAttribute('aria-expanded', 'false');
        //   }
        // });
        
        // Toggle current accordion
        accordion.setAttribute('aria-expanded', !isExpanded);
        header.setAttribute('aria-expanded', !isExpanded);
      });
    }
  });

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // IntersectionObserver for Reveal Animations with Stagger Support
  const reveals = document.querySelectorAll('.reveal');
  
  if (reveals.length > 0 && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, i * 80); // stagger
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  } else if (reveals.length > 0 && prefersReducedMotion) {
    // If reduced motion, reveal immediately without animation
    reveals.forEach(element => {
      element.classList.add('revealed');
      element.style.transition = 'none';
      element.style.transform = 'none';
    });
  }

  // Lazy Load Video (if needed in future)
  const lazyVideos = document.querySelectorAll('video[data-src]');
  
  if (lazyVideos.length > 0 && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.getAttribute('data-src');
          video.removeAttribute('data-src');
          videoObserver.unobserve(video);
        }
      });
    });

    lazyVideos.forEach(video => {
      videoObserver.observe(video);
    });
  }

  // Stripe-Premium Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      const scrollY = window.pageYOffset || window.scrollY;
      
      if (scrollY >= 12) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    });
    
    // Check initial scroll position on load
    const initialScroll = window.pageYOffset || window.scrollY;
    if (initialScroll >= 12) {
      navbar.classList.add('navbar--scrolled');
    }
  }

  // UTSP Hero Parallax (subtle drift)
  if (!prefersReducedMotion) {
    document.addEventListener('mousemove', (e) => {
      const hero = document.querySelector('.hero-visual');
      if (hero) {
        const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
        const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
        hero.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  }

  // Case study expand/collapse
  document.querySelectorAll('[data-case]').forEach((card) => {
    const btn = card.querySelector('.case-toggle');
    const full = card.querySelector('.case-full');

    function toggle() {
      const isOpen = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      full.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      btn.textContent = isOpen ? 'Hide full testimonial' : 'Read full testimonial';
    }

    // allow clicking anywhere on card OR button
    card.addEventListener('click', (e) => {
      // prevent double-toggle when clicking button
      if (e.target.closest('.case-toggle')) return;
      toggle();
    });
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  });

  // Testimonial expand/collapse
  document.querySelectorAll('[data-testimonial]').forEach((card) => {
    const btn = card.querySelector('.testimonial-toggle');
    const full = card.querySelector('.testimonial-quote-full');

    function toggle() {
      const isOpen = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      full.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      btn.textContent = isOpen ? 'Read less' : 'Read more';
    }

    // allow clicking anywhere on card OR button
    card.addEventListener('click', (e) => {
      // prevent double-toggle when clicking button
      if (e.target.closest('.testimonial-toggle')) return;
      toggle();
    });
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  });

})();

