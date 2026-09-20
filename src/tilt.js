export function initTiltEffects() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (prefersReducedMotion || isTouch) return;

  const tiltElements = document.querySelectorAll('[data-tilt]');

  tiltElements.forEach((element) => {
    const maxTilt = parseFloat(element.getAttribute('data-tilt-max') || '12');
    const perspective = element.getAttribute('data-tilt-perspective') || '1000px';
    const scale = parseFloat(element.getAttribute('data-tilt-scale') || '1.02');
    const isHero = element.hasAttribute('data-tilt-hero');

    let bounds = null;
    let isHovering = false;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let rafId = null;

    // Optional glare/sheen layer
    let sheen = element.querySelector('.tilt-sheen');
    if (!sheen) {
      sheen = document.createElement('div');
      sheen.className = 'tilt-sheen absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-300';
      sheen.style.background = 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, rgba(255, 255, 255, 0) 70%)';
      sheen.style.mixBlendMode = 'overlay';
      element.style.position = element.style.position || 'relative';
      element.appendChild(sheen);
    }

    const onMouseEnter = () => {
      bounds = element.getBoundingClientRect();
      isHovering = true;
      sheen.style.opacity = '1';
      startAnimation();
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = element.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const normX = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
      const normY = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      // Invert Y for standard natural 3D tilt
      targetRotateX = -normY * maxTilt;
      targetRotateY = normX * maxTilt;

      // Update sheen position
      const sheenX = (mouseX / bounds.width) * 100;
      const sheenY = (mouseY / bounds.height) * 100;
      sheen.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(212, 175, 55, 0.22) 0%, rgba(255, 255, 255, 0) 65%)`;

      // If hero card, parallax inner floating elements (e.g. badges, avatar)
      if (isHero) {
        const floatBadges = element.querySelectorAll('[data-tilt-badge]');
        floatBadges.forEach((badge) => {
          const depth = parseFloat(badge.getAttribute('data-tilt-depth') || '25');
          const badgeX = normX * depth;
          const badgeY = normY * depth;
          badge.style.transform = `translate3d(${badgeX}px, ${badgeY}px, ${depth * 1.5}px)`;
        });

        const heroAvatar = element.querySelector('.hero-avatar-wrap');
        if (heroAvatar) {
          heroAvatar.style.transform = `translate3d(${normX * 12}px, ${normY * 12}px, 20px)`;
        }
      }
    };

    const onMouseLeave = () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
      sheen.style.opacity = '0';

      if (isHero) {
        const floatBadges = element.querySelectorAll('[data-tilt-badge]');
        floatBadges.forEach((badge) => {
          badge.style.transform = `translate3d(0, 0, 0)`;
        });
        const heroAvatar = element.querySelector('.hero-avatar-wrap');
        if (heroAvatar) {
          heroAvatar.style.transform = `translate3d(0, 0, 0)`;
        }
      }
    };

    function startAnimation() {
      if (rafId) return;

      function update() {
        // Smooth lerp
        currentRotateX += (targetRotateX - currentRotateX) * 0.12;
        currentRotateY += (targetRotateY - currentRotateY) * 0.12;

        const currentScale = isHovering ? scale : 1;

        element.style.transform = `perspective(${perspective}) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(${currentScale}, ${currentScale}, 1)`;

        if (!isHovering && Math.abs(currentRotateX) < 0.05 && Math.abs(currentRotateY) < 0.05) {
          element.style.transform = `perspective(${perspective}) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
          cancelAnimationFrame(rafId);
          rafId = null;
          return;
        }

        rafId = requestAnimationFrame(update);
      }

      rafId = requestAnimationFrame(update);
    }

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mousemove', onMouseMove, { passive: true });
    element.addEventListener('mouseleave', onMouseLeave);
  });
}
