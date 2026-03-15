document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Reveal Animation
    const heroTl = gsap.timeline();
    heroTl.from('.hero-title .reveal', {
        y: 100,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2
    })
    .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8
    }, '-=0.6')
    .from('.scroll-indicator', {
        opacity: 0,
        duration: 0.8
    }, '-=0.4');

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
            
            // Toggle icon
            const icon = menuIcon.querySelector('i');
            const iconName = icon.getAttribute('data-lucide');
            if (iconName === 'menu') {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
                const icon = menuIcon.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // Booking Flow Logic
    const steps = document.querySelectorAll('.flow-step');
    const indicators = document.querySelectorAll('.step-indicator');
    const options = document.querySelectorAll('.option-item');
    const dayButtons = document.querySelectorAll('.day-picker .day');
    const slotButtons = document.querySelectorAll('.slots-grid .slot');
    const confirmBtn = document.querySelector('.btn-confirm');

    let bookingData = {
        service: '',
        stylist: '',
        day: 'Luni, 16 Mar',
        time: ''
    };

    function goToStep(stepNumber) {
        steps.forEach(step => step.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        document.getElementById(`step-${stepNumber}`).classList.add('active');
        document.querySelector(`.step-indicator[data-step="${stepNumber}"]`).classList.add('active');
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            const parentStep = option.closest('.flow-step').id;
            const value = option.getAttribute('data-value');

            if (parentStep === 'step-1') {
                bookingData.service = value;
                goToStep(2);
            } else if (parentStep === 'step-2') {
                bookingData.stylist = value;
                goToStep(3);
            }
        });
    });

    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dayButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            bookingData.day = btn.textContent;
        });
    });

    slotButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            slotButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            bookingData.time = btn.textContent;
            btn.style.borderColor = 'var(--gold)';
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (!bookingData.service || !bookingData.stylist || !bookingData.time) {
            alert('Vă rugăm să selectați toate opțiunile pentru programare.');
            return;
        }

        confirmBtn.textContent = 'PROCESARE...';
        setTimeout(() => {
            alert(`Programare confirmată! \nServiciu: ${bookingData.service}\nStilist: ${bookingData.stylist}\nData: ${bookingData.day}\nOra: ${bookingData.time}`);
            confirmBtn.textContent = 'CONFIRMĂ REZERVAREA';
            // Reset flow
            bookingData = { service: '', stylist: '', day: 'Luni, 16 Mar', time: '' };
            goToStep(1);
        }, 1500);
    });

    // Indicator navigation
    indicators.forEach(ind => {
        ind.addEventListener('click', () => {
            const step = ind.getAttribute('data-step');
            // Only allow going back or to steps already "unlocked" by selection
            if (step == 1 || (step == 2 && bookingData.service) || (step == 3 && bookingData.stylist)) {
                goToStep(step);
            }
        });
    });

    // Parallax effect for Hero Background
    gsap.to('.hero-bg-placeholder', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Reveal animations for sections
    const sections = ['#servicii', '#echipa', '.loyalty', '.instagram'];
    sections.forEach(sec => {
        gsap.from(sec, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: sec,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
});
