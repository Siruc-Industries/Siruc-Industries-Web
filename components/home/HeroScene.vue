<template>
  <div ref="containerRef" class="hero-scene" aria-hidden="true">
    <canvas ref="canvasRef" />
    <div class="hero-scene__grain" />
    <div class="hero-scene__fade" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

let cleanup: (() => void) | null = null;

onMounted(async () => {
  if (typeof window === 'undefined' || !containerRef.value || !canvasRef.value) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const THREE = await import('three');

  const container = containerRef.value;
  const canvas = canvasRef.value;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfbfbfb);
  scene.fog = new THREE.Fog(0xfbfbfb, 8, 22);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xfbfbfb, 1);

  // Lights — soft, studio-like on light bg
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
  keyLight.position.set(4, 6, 8);
  scene.add(keyLight);

  const accentLight = new THREE.PointLight(0xf44336, 1.8, 18);
  accentLight.position.set(-5, -2, 4);
  scene.add(accentLight);

  const coolLight = new THREE.PointLight(0x7c4af2, 0.9, 16);
  coolLight.position.set(5, 3, 2);
  scene.add(coolLight);

  const group = new THREE.Group();
  scene.add(group);

  // Wireframe knot — dark, architectural
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.35, 0.32, 128, 20),
    new THREE.MeshBasicMaterial({
      color: 0x1c1c1c,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
  );
  knot.position.set(-1.8, 0.4, -1);
  group.add(knot);

  // Glass icosahedron
  const glass = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 1),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.92,
      thickness: 1.2,
      transparent: true,
      opacity: 0.75,
    })
  );
  glass.position.set(2.4, -0.6, 0);
  group.add(glass);

  // Solid accent ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.6, 0.025, 12, 80),
    new THREE.MeshStandardMaterial({
      color: 0xf44336,
      metalness: 0.7,
      roughness: 0.25,
      emissive: 0xf44336,
      emissiveIntensity: 0.08,
    })
  );
  ring.rotation.x = Math.PI / 2.8;
  ring.position.set(0.6, 1.1, -1.5);
  group.add(ring);

  // Wire octahedron
  const wire = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.75, 0),
    new THREE.MeshBasicMaterial({
      color: 0x1c1c1c,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
  );
  wire.position.set(-3.2, -1.2, -2.5);
  group.add(wire);

  // Particle network
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  const basePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 14;
    const y = (Math.random() - 0.5) * 8;
    const z = (Math.random() - 0.5) * 6 - 1;
    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particles = new THREE.Points(
    particlesGeo,
    new THREE.PointsMaterial({
      color: 0x1c1c1c,
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    })
  );
  scene.add(particles);

  // Connection lines between nearby particles
  const maxConnections = 280;
  const linePositions = new Float32Array(maxConnections * 6);
  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(
    linesGeo,
    new THREE.LineBasicMaterial({
      color: 0x1c1c1c,
      transparent: true,
      opacity: 0.06,
    })
  );
  scene.add(lines);

  const updateLines = () => {
    let idx = 0;
    const maxDist = 2.2;
    const pos = particlesGeo.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount && idx < maxConnections; i++) {
      for (let j = i + 1; j < particleCount && idx < maxConnections; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          const o = idx * 6;
          linePositions[o] = pos[i * 3];
          linePositions[o + 1] = pos[i * 3 + 1];
          linePositions[o + 2] = pos[i * 3 + 2];
          linePositions[o + 3] = pos[j * 3];
          linePositions[o + 4] = pos[j * 3 + 1];
          linePositions[o + 5] = pos[j * 3 + 2];
          idx++;
        }
      }
    }

    linesGeo.setDrawRange(0, idx * 2);
    linesGeo.attributes.position.needsUpdate = true;
  };

  // Mouse state
  const mouse = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  const mouseWorld = new THREE.Vector3();

  const onMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  let width = 0;
  let height = 0;

  const resize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const clock = new THREE.Clock();
  let animationId = 0;

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      smooth.x += (mouse.x - smooth.x) * 0.06;
      smooth.y += (mouse.y - smooth.y) * 0.06;
    }

    // Camera parallax
    camera.position.x = smooth.x * 1.2;
    camera.position.y = smooth.y * 0.8;
    camera.lookAt(0, 0, 0);

    // Group rotation follows cursor
    group.rotation.y = t * 0.08 + smooth.x * 0.35;
    group.rotation.x = smooth.y * 0.2;

    knot.rotation.x = t * 0.15;
    knot.rotation.y = t * 0.22;
    glass.rotation.y = t * 0.18;
    glass.rotation.z = t * 0.1;
    ring.rotation.z = t * 0.12;
    wire.rotation.y = t * 0.25;

    // Accent lights follow mouse
    accentLight.position.x = -5 + smooth.x * 3;
    accentLight.position.y = -2 + smooth.y * 2;
    coolLight.position.x = 5 + smooth.x * 2;

    // Project mouse to world plane for particle repulsion
    mouseWorld.set(smooth.x * 5, smooth.y * 3, 0);

    const pos = particlesGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      const dx = bx - mouseWorld.x;
      const dy = by - mouseWorld.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1.8 - dist) * 0.35;

      const ox = dist > 0.01 ? (dx / dist) * force : 0;
      const oy = dist > 0.01 ? (dy / dist) * force : 0;

      pos[i * 3] = bx + ox + Math.sin(t * 0.4 + i) * 0.02;
      pos[i * 3 + 1] = by + oy + Math.cos(t * 0.35 + i * 0.5) * 0.02;
      pos[i * 3 + 2] = bz;
    }
    particlesGeo.attributes.position.needsUpdate = true;

    if (!prefersReducedMotion) updateLines();

    renderer.render(scene, camera);
  };

  resize();
  updateLines();
  animate();

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('resize', resize, { passive: true });

  cleanup = () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', resize);

    knot.geometry.dispose();
    (knot.material as THREE.Material).dispose();
    glass.geometry.dispose();
    (glass.material as THREE.Material).dispose();
    ring.geometry.dispose();
    (ring.material as THREE.Material).dispose();
    wire.geometry.dispose();
    (wire.material as THREE.Material).dispose();
    particlesGeo.dispose();
    (particles.material as THREE.Material).dispose();
    linesGeo.dispose();
    (lines.material as THREE.Material).dispose();
    renderer.dispose();
  };
});

onUnmounted(() => cleanup?.());
</script>

<style scoped lang="scss">
.hero-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  background: #fbfbfb;

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }

  &__grain {
    position: absolute;
    inset: 0;
    opacity: 0.12;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px;
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  &__fade {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 75% 70% at 50% 50%, transparent 30%, rgba(251, 251, 251, 0.85) 100%);
    pointer-events: none;
  }
}
</style>
