/* =====================================================
   PORTFOLIO — JAVASCRIPT (Enhanced Animations)
   Author: Borra Kasi Naga Sai Lakshmi
   ===================================================== */

(function () {
    'use strict';

    // =====================================================
    // PARTICLE BACKGROUND
    // =====================================================
    var canvas = document.getElementById('particle-canvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var PARTICLE_COUNT = 60;
        var mouseX = -1000;
        var mouseY = -1000;

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.4 + 0.1
            };
        }

        function initParticles() {
            particles = [];
            for (var i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(167, 139, 250, ' + p.opacity + ')';
                ctx.fill();

                // Connect nearby particles
                for (var j = i + 1; j < particles.length; j++) {
                    var p2 = particles[j];
                    var dx = p.x - p2.x;
                    var dy = p.y - p2.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = 'rgba(124, 58, 237, ' + (0.08 * (1 - dist / 120)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Mouse interaction — push particles away
                var mdx = p.x - mouseX;
                var mdy = p.y - mouseY;
                var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 100) {
                    p.x += mdx * 0.02;
                    p.y += mdy * 0.02;
                }
            }

            requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        initParticles();
        drawParticles();

        window.addEventListener('resize', function () {
            resizeCanvas();
            initParticles();
        });

        var heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', function (e) {
                var rect = heroSection.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            });
            heroSection.addEventListener('mouseleave', function () {
                mouseX = -1000;
                mouseY = -1000;
            });
        }
    }

    // =====================================================
    // TYPED TITLE ANIMATION
    // =====================================================
    var titles = [
        'Python Developer',
        'Software Engineer',
        'AI/ML Developer',
        'Generative AI Enthusiast'
    ];

    var typedEl = document.getElementById('typed-title');
    var titleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var TYPING_SPEED = 80;
    var DELETING_SPEED = 45;
    var PAUSE_BEFORE_DELETE = 2000;
    var PAUSE_BEFORE_TYPE = 400;

    function typeTitle() {
        var current = titles[titleIndex];

        if (!isDeleting) {
            typedEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeTitle, PAUSE_BEFORE_DELETE);
                return;
            }
            setTimeout(typeTitle, TYPING_SPEED);
        } else {
            typedEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(typeTitle, PAUSE_BEFORE_TYPE);
                return;
            }
            setTimeout(typeTitle, DELETING_SPEED);
        }
    }

    if (typedEl) {
        setTimeout(typeTitle, 800);
    }

    // =====================================================
    // NAVBAR SCROLL EFFECTS
    // =====================================================
    var navbar = document.getElementById('navbar');
    var sections = document.querySelectorAll('.section, .hero');
    var navLinks = document.querySelectorAll('.nav-link');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // =====================================================
    // ACTIVE NAV HIGHLIGHTING
    // =====================================================
    function updateActiveNav() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // =====================================================
    // HAMBURGER MENU
    // =====================================================
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('nav-menu');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // =====================================================
    // BACK TO TOP BUTTON
    // =====================================================
    var backToTop = document.getElementById('back-to-top');

    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =====================================================
    // SCROLL REVEAL ANIMATION (supports all reveal types)
    // =====================================================
    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    function handleReveal() {
        var triggerBottom = window.innerHeight * 0.88;

        revealElements.forEach(function (el) {
            var top = el.getBoundingClientRect().top;

            if (top < triggerBottom) {
                el.classList.add('visible');
            }
        });
    }

    // =====================================================
    // 3D TILT EFFECT ON PROJECT CARDS
    // =====================================================
    var projectCards = document.querySelectorAll('.project-card');

    function addTiltEffect(card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;

            var rotateX = ((y - centerY) / centerY) * -6;
            var rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseenter', function () {
            card.style.transition = 'transform 0.1s ease-out';
        });
    }

    // Only enable tilt on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
        projectCards.forEach(addTiltEffect);
    }

    // =====================================================
    // ANIMATED COUNTER (for LeetCode 145+ stat)
    // =====================================================
    function animateCounter(el, target, suffix) {
        var start = 0;
        var duration = 1800;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var ease = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(ease * target);
            el.textContent = current + (suffix || '');

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + (suffix || '');
            }
        }

        requestAnimationFrame(step);
    }

    // Find the cert card with "145+" and animate it
    var certCards = document.querySelectorAll('.cert-card h4');
    var counterObserved = false;

    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !counterObserved) {
                certCards.forEach(function (h4) {
                    if (h4.textContent.indexOf('145+') !== -1) {
                        counterObserved = true;
                        var originalText = h4.textContent;
                        // Replace number with animated span
                        h4.innerHTML = '<span class="counter-value" data-target="145"></span>+ Problems Solved';
                        var counterEl = h4.querySelector('.counter-value');
                        animateCounter(counterEl, 145, '');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    var certSection = document.getElementById('certifications');
    if (certSection) {
        counterObserver.observe(certSection);
    }

    // =====================================================
    // PARALLAX ON HERO ORBS (subtle mouse follow)
    // =====================================================
    var heroEl = document.getElementById('hero');
    var orbs = document.querySelectorAll('.hero-orb');

    if (heroEl && orbs.length > 0 && window.matchMedia('(hover: hover)').matches) {
        heroEl.addEventListener('mousemove', function (e) {
            var rect = heroEl.getBoundingClientRect();
            var mx = (e.clientX - rect.left) / rect.width - 0.5;
            var my = (e.clientY - rect.top) / rect.height - 0.5;

            orbs.forEach(function (orb, i) {
                var speed = (i + 1) * 15;
                orb.style.transform = 'translate(' + (mx * speed) + 'px, ' + (my * speed) + 'px)';
            });
        });
    }

    // =====================================================
    // CONTACT FORM
    // =====================================================
    var contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('form-name').value.trim();
            var email = document.getElementById('form-email').value.trim();
            var subject = document.getElementById('form-subject').value.trim();
            var message = document.getElementById('form-message').value.trim();

            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }

            showFormStatus(
                'Form validated successfully! To enable message delivery, connect a backend service like Formspree, EmailJS, or Netlify Forms. For now, you can email me directly at saitejaborra555@gmail.com.',
                'info'
            );
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormStatus(msg, type) {
        var existing = contactForm.querySelector('.form-status');
        if (existing) existing.remove();

        var statusEl = document.createElement('div');
        statusEl.className = 'form-status form-status-' + type;
        statusEl.style.cssText =
            'margin-top:16px;padding:14px 18px;border-radius:8px;font-size:0.85rem;line-height:1.6;animation:hero-child-in 0.4s ease both;';

        if (type === 'error') {
            statusEl.style.background = 'rgba(239,68,68,0.1)';
            statusEl.style.border = '1px solid rgba(239,68,68,0.3)';
            statusEl.style.color = '#fca5a5';
        } else {
            statusEl.style.background = 'rgba(59,130,246,0.1)';
            statusEl.style.border = '1px solid rgba(59,130,246,0.3)';
            statusEl.style.color = '#93c5fd';
        }

        statusEl.textContent = msg;
        contactForm.appendChild(statusEl);

        setTimeout(function () {
            if (statusEl.parentNode) {
                statusEl.style.transition = 'opacity 0.3s';
                statusEl.style.opacity = '0';
                setTimeout(function () {
                    if (statusEl.parentNode) statusEl.remove();
                }, 300);
            }
        }, 10000);
    }

    // =====================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =====================================================
    // COMBINED SCROLL HANDLER
    // =====================================================
    var ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleNavScroll();
                updateActiveNav();
                handleBackToTop();
                handleReveal();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial calls
    handleNavScroll();
    updateActiveNav();
    handleBackToTop();
    handleReveal();

    // =====================================================
    // PAGE LOAD
    // =====================================================
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
        setTimeout(handleReveal, 100);
    });

})();
