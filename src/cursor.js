export function initCustomCursor() {
  // Check touch or reduced motion
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (!cursorDot || !cursorRing) return;

  if (isTouch || prefersReducedMotion) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
    document.documentElement.classList.remove('has-custom-cursor');
    return;
  }

  document.documentElement.classList.add('has-custom-cursor');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isHovered = false;
  let isClicking = false;
  let magneticTarget = null;

  // Track mouse move
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show cursor on first mousemove
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  }, { passive: true });

  window.addEventListener('mousedown', () => {
    isClicking = true;
    cursorRing.classList.add('cursor-clicking');
    cursorDot.classList.add('cursor-dot-clicking');
  });

  window.addEventListener('mouseup', () => {
    isClicking = false;
    cursorRing.classList.remove('cursor-clicking');
    cursorDot.classList.remove('cursor-dot-clicking');
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  // Render loop with high performance lerp
  function renderCursor() {
    // If hovering a magnetic element, pull cursor ring toward element center
    if (magneticTarget) {
      const rect = magneticTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Lerp ring strongly to target center
      ringX += (centerX - ringX) * 0.25;
      ringY += (centerY - ringY) * 0.25;

      // Also gently pull dot
      const dotTargetX = centerX + (mouseX - centerX) * 0.25;
      const dotTargetY = centerY + (mouseY - centerY) * 0.25;
      cursorDot.style.transform = `translate3d(${dotTargetX}px, ${dotTargetY}px, 0)`;
    } else {
      // Standard smooth follow
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);

  // Bind interactive hovers & magnetic physics
  function attachInteractiveListeners() {
    const hoverTargets = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .project-card, .service-card, .tilt-element');
    
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('cursor-hover');
        if (el.classList.contains('magnetic')) {
          magneticTarget = el;
          cursorRing.classList.add('cursor-magnetic');
        }
      });

      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('cursor-hover');
        cursorRing.classList.remove('cursor-magnetic');
        magneticTarget = null;
      });
    });
  }

  attachInteractiveListeners();

  // Export refresh helper for dynamic items
  return {
    refresh: attachInteractiveListeners
  };
}
