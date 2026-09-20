import * as THREE from 'three';

export function initThreeScene(canvasId = 'bg-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Detect WebGL support
  let isWebGLAvailable = false;
  try {
    const testCanvas = document.createElement('canvas');
    isWebGLAvailable = !!(window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
  } catch (e) {
    isWebGLAvailable = false;
  }

  if (!isWebGLAvailable) {
    console.warn('WebGL not supported, falling back to CSS background');
    canvas.style.display = 'none';
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0015);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 45;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Group for all floating objects to allow smooth mouse parallax
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Subtle Accent Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const goldLight = new THREE.PointLight(0xD4AF37, 2.5, 120);
  goldLight.position.set(20, 20, 20);
  scene.add(goldLight);

  const fillLight = new THREE.PointLight(0x00D4C8, 1.2, 100);
  fillLight.position.set(-25, -15, 10);
  scene.add(fillLight);

  // 2. Primary Hero Abstract Logo Geometry: Elegant Golden Torus Knot (Wireframe + Sheen)
  const knotGeo = new THREE.TorusKnotGeometry(8, 2.2, 120, 16, 2, 3);
  
  // Wireframe material for crisp geometric feel
  const wireMat = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
    roughness: 0.3,
    metalness: 0.9
  });
  const torusKnot = new THREE.Mesh(knotGeo, wireMat);
  torusKnot.position.set(16, 2, -5);
  mainGroup.add(torusKnot);

  // 3. Floating Geometric Platonic Solids (Icosahedrons & Octahedrons) representing logo precision
  const floatingObjects = [];
  
  const createPolyhedron = (geo, color, pos, scale, rotSpeed) => {
    const mat = new THREE.MeshStandardMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      roughness: 0.2,
      metalness: 0.85
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.scale.setScalar(scale);
    mainGroup.add(mesh);
    floatingObjects.push({ mesh, rotSpeed, basePos: { ...pos }, phase: Math.random() * Math.PI * 2 });
    return mesh;
  };

  // Multiple floating brand geometry polyhedra across viewport
  createPolyhedron(new THREE.IcosahedronGeometry(4, 1), 0xD4AF37, [-18, 12, -8], 1.1, { x: 0.003, y: 0.004 });
  createPolyhedron(new THREE.OctahedronGeometry(3.5, 0), 0xF5E4B2, [22, -14, -6], 1.0, { x: -0.002, y: 0.005 });
  createPolyhedron(new THREE.DodecahedronGeometry(3, 0), 0x00D4C8, [-22, -12, -12], 1.2, { x: 0.004, y: -0.003 });
  createPolyhedron(new THREE.IcosahedronGeometry(2.5, 0), 0xD4AF37, [4, -20, -10], 0.9, { x: -0.003, y: 0.003 });
  createPolyhedron(new THREE.TetrahedronGeometry(3, 0), 0xE5C378, [-8, 22, -15], 1.3, { x: 0.002, y: -0.004 });

  // 4. Atmospheric Ambient Particles (Golden Starfield & Dust)
  const particleCount = 280;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorGold = new THREE.Color(0xD4AF37);
  const colorWhite = new THREE.Color(0xFAFAFA);
  const colorTeal = new THREE.Color(0x00D4C8);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 110;
    positions[i3 + 1] = (Math.random() - 0.5) * 110;
    positions[i3 + 2] = (Math.random() - 0.5) * 80;

    // Subtle tint mix
    const mixChoice = Math.random();
    let pickedColor = colorGold;
    if (mixChoice > 0.75) pickedColor = colorWhite;
    else if (mixChoice > 0.65) pickedColor = colorTeal;

    colors[i3] = pickedColor.r;
    colors[i3 + 1] = pickedColor.g;
    colors[i3 + 2] = pickedColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Soft round particle texture using canvas
  const createParticleTexture = () => {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
    grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.08)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  };

  const particleMat = new THREE.PointsMaterial({
    size: 1.2,
    map: createParticleTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  mainGroup.add(particleSystem);

  // 5. Mouse parallax interaction
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  const onMouseMove = (event) => {
    mouse.targetX = (event.clientX - windowHalfX) / windowHalfX;
    mouse.targetY = (event.clientY - windowHalfY) / windowHalfY;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // 6. Window Resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  window.addEventListener('resize', onWindowResize);

  // 7. Tab Visibility Management (Pause when tab hidden for top performance)
  let isTabVisible = !document.hidden;
  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
  });

  // 8. Reduced Motion preference check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animation Loop with clock
  const clock = new THREE.Clock();
  let animationFrameId = null;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (!isTabVisible) return; // Pause completely when tab is hidden

    const elapsedTime = clock.getElapsedTime();

    // Lerp mouse coordinates for butter-smooth camera parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    if (!prefersReducedMotion) {
      // Rotate primary logo knot
      torusKnot.rotation.x = elapsedTime * 0.12;
      torusKnot.rotation.y = elapsedTime * 0.18;
      torusKnot.position.y = 2 + Math.sin(elapsedTime * 0.7) * 1.5;

      // Animate floating polyhedra
      floatingObjects.forEach(({ mesh, rotSpeed, basePos, phase }) => {
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.position.y = basePos.y + Math.sin(elapsedTime * 0.6 + phase) * 1.8;
      });

      // Subtle particle slow drift
      particleSystem.rotation.y = elapsedTime * 0.015;
      particleSystem.rotation.x = elapsedTime * 0.008;

      // Camera tilt to mouse
      camera.position.x = mouse.x * 5;
      camera.position.y = -mouse.y * 5;
      camera.lookAt(0, 0, 0);
    }

    renderer.render(scene, camera);
  }

  animate();

  // Cleanup handler if needed
  return {
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      knotGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    }
  };
}
