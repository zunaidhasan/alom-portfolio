import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { initThreeScene } from './threeScene.js';
import { initCustomCursor } from './cursor.js';
import { initTiltEffects } from './tilt.js';
import { initProjectModal } from './modal.js';
import { projects, categories, services, processSteps } from './projectsData.js';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. SOUND FX ENGINE (Web Audio API Synthesizer)
// ==========================================
let audioCtx = null;
let isMuted = true; // start muted for non-intrusive luxury feel

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSubtleClick(freq = 800, type = 'sine', duration = 0.04) {
  if (isMuted || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // ignore audio restrictions
  }
}

// Sound toggle button in header
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');
if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    initAudio();
    isMuted = !isMuted;
    if (!isMuted) {
      soundToggle.classList.add('text-accent', 'border-accent/40');
      soundToggle.classList.remove('text-neutral-400');
      if (soundIcon) {
        soundIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>`;
      }
      playSubtleClick(600, 'sine', 0.08);
    } else {
      soundToggle.classList.remove('text-accent', 'border-accent/40');
      soundToggle.classList.add('text-neutral-400');
      if (soundIcon) {
        soundIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
      }
    }
  });
}

// Global click audio listener
document.addEventListener('click', (e) => {
  if (e.target.closest('button, a, input, select')) {
    playSubtleClick(900, 'sine', 0.03);
  }
});

// ==========================================
// 2. RENDER SERVICES
// ==========================================
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  container.innerHTML = services.map((service) => `
    <div class="service-card group relative p-8 rounded-2xl bg-surface-card/70 hairline-border hover:hairline-border-gold transition-all duration-500 overflow-hidden flex flex-col justify-between"
         data-tilt data-tilt-max="8" data-tilt-scale="1.01">
      <!-- Glow aura on hover -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/15 transition-all duration-700"></div>

      <div>
        <div class="flex items-center justify-between mb-6">
          <span class="font-mono text-xs text-accent/80 tracking-widest uppercase font-semibold">SERVICE ${service.number}</span>
          <div class="p-3 rounded-xl bg-white/5 border border-white/5 text-accent group-hover:scale-110 group-hover:border-accent/30 transition-all duration-300">
            ${service.icon}
          </div>
        </div>

        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 font-display">
          ${service.title}
        </h3>

        <p class="text-neutral-400 text-sm leading-relaxed mb-6">
          ${service.shortDesc}
        </p>
      </div>

      <div class="border-t border-white/5 pt-5 mt-4">
        <div class="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-3">Key Deliverables</div>
        <ul class="space-y-2">
          ${service.deliverables.map(item => `
            <li class="flex items-center gap-2 text-xs text-neutral-300">
              <span class="w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0"></span>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 3. RENDER PROJECTS & FILTERING
// ==========================================
let currentCategory = 'all';

function renderCategoryPills() {
  const container = document.getElementById('project-filters');
  if (!container) return;

  container.innerHTML = categories.map((cat) => `
    <button 
      class="filter-pill px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
        cat.id === currentCategory 
          ? 'bg-accent text-neutral-950 font-semibold shadow-glow-sm' 
          : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
      }"
      data-filter="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  // Attach filter listeners
  container.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const filterId = btn.getAttribute('data-filter');
      if (filterId === currentCategory) return;
      currentCategory = filterId;
      renderCategoryPills();
      filterProjects(currentCategory);
    });
  });
}

function renderProjects(items) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = items.map((project) => `
    <div class="project-card group relative rounded-2xl bg-surface-card hairline-border overflow-hidden cursor-pointer hover:hairline-border-gold transition-all duration-500"
         data-project-id="${project.id}"
         data-category="${project.category}"
         data-tilt data-tilt-max="7" data-tilt-scale="1.01">
      
      <!-- Image showcase wrap with zoom effect -->
      <div class="relative aspect-[16/11] overflow-hidden bg-neutral-900/60">
        <img 
          src="${project.image}" 
          alt="${project.title} — ${project.categoryLabel}"
          loading="lazy"
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
          onerror="this.src='/assets/hero/alom-placeholder.svg'"
        />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-500"></div>

        <!-- Floating Category Tag -->
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-neutral-950/80 backdrop-blur-md text-accent border border-accent/30 shadow-lg">
            ${project.tag}
          </span>
        </div>

        <!-- View Case Study Action Badge -->
        <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div class="w-10 h-10 rounded-full bg-accent text-neutral-950 flex items-center justify-center shadow-glow-sm">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card Content Info -->
      <div class="p-6 relative">
        <div class="flex items-center justify-between text-xs text-neutral-400 mb-2">
          <span class="font-medium text-accent/90">${project.client}</span>
          <span class="font-mono text-neutral-500">${project.year}</span>
        </div>

        <h3 class="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 mb-1 font-display">
          ${project.title}
        </h3>

        <p class="text-xs text-neutral-400 line-clamp-2 mb-4">
          ${project.subtitle}
        </p>

        <!-- Tools & Color Swatches Footer -->
        <div class="flex items-center justify-between pt-3 border-t border-white/5">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${project.tools.slice(0, 2).map(tool => `
              <span class="text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">${tool}</span>
            `).join('')}
          </div>

          <div class="flex items-center -space-x-1">
            ${project.palette.slice(0, 3).map(color => `
              <div class="w-3.5 h-3.5 rounded-full border border-neutral-900" style="background-color: ${color}"></div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProjects(filter) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  gsap.to(container, {
    opacity: 0,
    y: 10,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      renderProjects(filtered);
      initTiltEffects(); // rebind tilt
      
      gsap.fromTo(container, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  });
}

// ==========================================
// 4. GSAP SCROLLTRIGGERS & STATS COUNTER
// ==========================================
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Header blur transition on scroll
  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: { className: 'nav-scrolled', targets: '#main-header' }
  });

  // Animated stat counters
  const counters = document.querySelectorAll('.counter-val');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
    const suffix = counter.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });

  // Fade-up reveals for sections
  const revealElements = document.querySelectorAll('.gsap-reveal');
  revealElements.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      }
    );
  });
}

// ==========================================
// 5. CONTACT FORM HANDLING & CELEBRATION
// ==========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('contact-toast');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check validity
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitOriginalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-neutral-950 inline" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending Message...
    `;

    // Simulated network submit (or Formspree integration)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitOriginalText;

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#F4E5C7', '#00D4C8', '#FFFFFF']
      });

      // Show toast
      if (toast) {
        toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        toast.classList.add('opacity-100', 'translate-y-0');
        setTimeout(() => {
          toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
          toast.classList.remove('opacity-100', 'translate-y-0');
        }, 5000);
      }

      form.reset();
    }, 1200);
  });
}

// ==========================================
// 6. MOBILE NAVIGATION DRAWER
// ==========================================
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !menu) return;

  const toggleMenu = () => {
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) {
      menu.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      menu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  toggle.addEventListener('click', toggleMenu);
  closeLinks.forEach(link => link.addEventListener('click', () => {
    menu.classList.add('hidden');
    document.body.style.overflow = '';
  }));
}

// ==========================================
// 7. PRELOADER DISMISS
// ==========================================
function dismissPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  gsap.to(preloader, {
    opacity: 0,
    duration: 0.6,
    delay: 0.4,
    ease: 'power2.inOut',
    onComplete: () => {
      preloader.style.display = 'none';
    }
  });
}

// ==========================================
// INITIALIZE APPLICATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  initThreeScene('bg-canvas');
  const cursor = initCustomCursor();
  renderServices();
  renderCategoryPills();
  renderProjects(projects);
  initTiltEffects();
  initProjectModal();
  initScrollAnimations();
  initContactForm();
  initMobileMenu();

  if (cursor && cursor.refresh) {
    cursor.refresh();
  }

  // Dismiss preloader smoothly
  dismissPreloader();
});
