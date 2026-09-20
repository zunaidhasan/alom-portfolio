import gsap from 'gsap';
import { projects } from './projectsData.js';

export function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const content = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !backdrop || !content) return;

  let activeProject = null;
  let lastFocusedElement = null;

  function openModal(projectId) {
    activeProject = projects.find(p => p.id === projectId);
    if (!activeProject) return;

    lastFocusedElement = document.activeElement;

    // Populate modal DOM
    const imgEl = document.getElementById('modal-image');
    const titleEl = document.getElementById('modal-title');
    const categoryEl = document.getElementById('modal-category');
    const tagEl = document.getElementById('modal-tag');
    const yearEl = document.getElementById('modal-year');
    const clientEl = document.getElementById('modal-client');
    const industryEl = document.getElementById('modal-industry');
    const summaryEl = document.getElementById('modal-summary');
    const challengeEl = document.getElementById('modal-challenge');
    const solutionEl = document.getElementById('modal-solution');
    const toolsContainer = document.getElementById('modal-tools');
    const paletteContainer = document.getElementById('modal-palette');
    const deliverablesContainer = document.getElementById('modal-deliverables');

    if (imgEl) {
      imgEl.src = activeProject.image;
      imgEl.alt = `${activeProject.title} — ${activeProject.categoryLabel}`;
    }
    if (titleEl) titleEl.textContent = activeProject.title;
    if (categoryEl) categoryEl.textContent = activeProject.categoryLabel;
    if (tagEl) tagEl.textContent = activeProject.tag;
    if (yearEl) yearEl.textContent = activeProject.year;
    if (clientEl) clientEl.textContent = activeProject.client;
    if (industryEl) industryEl.textContent = activeProject.industry || 'Branding & Identity';
    if (summaryEl) summaryEl.textContent = activeProject.summary;
    if (challengeEl) challengeEl.textContent = activeProject.challenge;
    if (solutionEl) solutionEl.textContent = activeProject.solution;

    // Tools tags
    if (toolsContainer) {
      toolsContainer.innerHTML = activeProject.tools
        .map(tool => `<span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/90">${tool}</span>`)
        .join('');
    }

    // Palette swatches
    if (paletteContainer) {
      paletteContainer.innerHTML = activeProject.palette
        .map(hex => `
          <div class="group/color flex flex-col items-center gap-1.5">
            <div class="w-8 h-8 rounded-full border border-white/20 shadow-md transition-transform group-hover/color:scale-110" style="background-color: ${hex}"></div>
            <span class="text-[10px] font-mono text-white/50 group-hover/color:text-accent transition-colors">${hex}</span>
          </div>
        `)
        .join('');
    }

    // Deliverables list
    if (deliverablesContainer) {
      deliverablesContainer.innerHTML = activeProject.deliverables
        .map(item => `
          <li class="flex items-start gap-2.5 text-sm text-neutral-300">
            <svg class="w-4 h-4 text-accent shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${item}</span>
          </li>
        `)
        .join('');
    }

    // Display modal container
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // GSAP silky entrance
    gsap.killTweensOf([backdrop, content]);
    
    gsap.fromTo(backdrop, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    );

    gsap.fromTo(content,
      { opacity: 0, scale: 0.94, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    );

    // Trap focus inside modal
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (modal.classList.contains('hidden')) return;

    gsap.to(content, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.25,
      ease: 'power2.in'
    });

    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocusedElement) lastFocusedElement.focus();
      }
    });
  }

  // Event Listeners
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Keyboard accessibility: ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Delegate project triggers from grid
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-id]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-project-id');
      openModal(id);
    }
  });

  return {
    open: openModal,
    close: closeModal
  };
}
