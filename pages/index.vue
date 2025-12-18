<template>
  <div class="homepage-container">
    <!-- Section 1: Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="greeting-title">
            You Dream It, <span class="playfair-text">We Build It.</span>
          </h1>
          <p class="greeting-text">
            We specialize in delivering high-quality, custom software solutions that elevate your
            brand's digital.
          </p>
          <div class="button-wrapper">
            <button class="hero-quote-btn" @click="openSidebar">
              <span>Get a quote</span>
              <Icon icon="line-md:arrow-right" :width="24" :height="24" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="bento-section">
      <div class="bento-container">
        <div class="bento-grid">
          <div class="bento-card bento-card-featured">
            <div class="card-line"></div>
            <div class="card-logo">
              <iconify-icon icon="logos:vue" class="iconify-logo"></iconify-icon>
            </div>
            <div class="card-content">
              <h3 class="card-title">Card Title 1</h3>
              <p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla lacinia, vulputate mauris eget.</p>
              <div class="card-tags">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
                <span class="tag">Tag 3</span>
              </div>
            </div>
          </div>
          <div class="bento-card bento-card-featured">
            <div class="card-line"></div>
            <div class="card-logo">
              <iconify-icon icon="logos:react" class="iconify-logo"></iconify-icon>
            </div>
            <div class="card-content">
              <h3 class="card-title">Card Title 2</h3>
              <p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla lacinia, vulputate mauris eget.</p>
              <div class="card-tags">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
                <span class="tag">Tag 3</span>
            </div>
          </div>
            </div>
          <div class="bento-card bento-card-featured">
            <div class="card-line"></div>
            <div class="card-logo">
              <iconify-icon icon="logos:nuxt-icon" class="iconify-logo"></iconify-icon>
            </div>
            <div class="card-content">
              <h3 class="card-title">Card Title 3</h3>
              <p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla lacinia, vulputate mauris eget.</p>
              <div class="card-tags">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
                <span class="tag">Tag 3</span>
            </div>
          </div>
          </div>
          <div class="bento-card bento-card-featured">
            <div class="card-line"></div>
            <div class="card-logo">
              <iconify-icon icon="logos:typescript-icon" class="iconify-logo"></iconify-icon>
            </div>
            <div class="card-content">
              <h3 class="card-title">Card Title 4</h3>
              <p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla lacinia, vulputate mauris eget.</p>
              <div class="card-tags">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
                <span class="tag">Tag 3</span>
        </div>
      </div>
    </div>

          <div class="bento-card">
            <div class="bento-placeholder">
              <span class="placeholder-label">Placeholder 5</span>
            </div>
          </div>
          <div class="bento-card bento-card-wide">
            <div class="bento-placeholder">
              <span class="placeholder-label">Placeholder 6</span>
        </div>
          </div>
          <div class="bento-card bento-card-column">
            <div class="bento-card">
              <div class="bento-placeholder">
                <span class="placeholder-label">Placeholder 7-1</span>
              </div>
            </div>
            <div class="bento-card">
              <div class="bento-placeholder">
                <span class="placeholder-label">Placeholder 7-2</span>
          </div>
        </div>
            <div class="bento-card">
              <div class="bento-placeholder">
                <span class="placeholder-label">Placeholder 7-3</span>
      </div>
    </div>
            <div class="bento-card">
              <div class="bento-placeholder">
                <span class="placeholder-label">Placeholder 7-4</span>
    </div>
      </div>
    </div>
        </div>
      </div>
    </section>
    
    <Sidebar :is-open="sidebarOpen" @close="closeSidebar" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const { sidebarOpen, openSidebar, closeSidebar } = useSidebar();

const heroSection = ref<HTMLElement | null>(null);
const bentoSection = ref<HTMLElement | null>(null);
const bentoContainer = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let hasAnimated = false;
let scrollHandler: (() => void) | null = null;

const handleScroll = () => {
  if (typeof window === 'undefined' || !heroSection.value) return;
  
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const maxScroll = viewportHeight * 0.6; // Maximum scroll distance for animation (60% of viewport)
  const progress = Math.min(scrollY / maxScroll, 1);
  
  // Hide/show navbar based on scroll position
  const header = document.querySelector('#header') as HTMLElement | null;
  if (header) {
    if (scrollY > 50) {
      if (!header.classList.contains('navbar-hidden')) {
        header.classList.add('navbar-hidden');
      }
    } else {
      if (header.classList.contains('navbar-hidden')) {
        header.classList.remove('navbar-hidden');
      }
    }
  }
  
  // Decrease hero section height (from 100vh to ~40vh)
  const minHeight = 40; // Minimum height in vh
  const maxHeight = 100; // Maximum height in vh
  const currentHeight = maxHeight - (maxHeight - minHeight) * progress;
  heroSection.value.style.height = `${currentHeight}vh`;
  
  // Move grid up from bottom of viewport to title position
  if (bentoSection.value) {
    // Grid starts at bottom (100vh down) and moves up to title position (40vh up)
    const startPosition = viewportHeight; // Start below viewport
    const endPosition = viewportHeight * 0.4; // End at title position
    const currentPosition = startPosition - (startPosition - endPosition) * progress;
    bentoSection.value.style.transform = `translateY(${currentPosition}px)`;
  }
  
  // Animate grid container width from 80% to 100% (faster - reaches 100% at 50% scroll progress)
  if (bentoContainer.value) {
    const minWidth = 80; // Start at 80%
    const maxWidth = 100; // End at 100%
    // Make width expand faster - use progress * 2 to reach 100% earlier
    const widthProgress = Math.min(progress * 2, 1);
    const currentWidth = minWidth + (maxWidth - minWidth) * widthProgress;
    bentoContainer.value.style.width = `${currentWidth}%`;
  }
};

onMounted(() => {
  if (typeof window === 'undefined') return;
  
  nextTick(() => {
    heroSection.value = document.querySelector('.hero-section');
    bentoSection.value = document.querySelector('.bento-section');
    bentoContainer.value = document.querySelector('.bento-container');
    
    // Set body and container height to allow scrolling
    // At final scroll: hero is 40vh, grid is at translateY(40vh), so grid bottom is at 40vh + 100vh = 140vh
    // Plus scroll distance needed
    if (typeof window !== 'undefined') {
      const viewportHeight = window.innerHeight;
      const maxScroll = viewportHeight * 0.6;
      // Final state: 40vh (hero) + 100vh (grid) = 140vh, plus scroll distance
      const finalHeight = viewportHeight * 0.9 + maxScroll;
      document.body.style.height = `${finalHeight}px`;
      document.documentElement.style.height = `${finalHeight}px`;
      
      // Set container height to match
      const container = document.querySelector('.homepage-container') as HTMLElement;
      if (container) {
        container.style.height = `${finalHeight}px`;
      }
    }
    
    // Set up scroll listener
    scrollHandler = handleScroll;
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Initial call to set navbar state
    handleScroll();
    
    // Also set up a dedicated navbar scroll handler that runs after a short delay
    // to ensure the header element is available
    setTimeout(() => {
      const handleNavbarScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const header = document.getElementById('header');
        if (header) {
          if (scrollY > 50) {
            header.classList.add('navbar-hidden');
          } else {
            header.classList.remove('navbar-hidden');
          }
        }
      };
      window.addEventListener('scroll', handleNavbarScroll, { passive: true });
      handleNavbarScroll(); // Initial call
    }, 100);
  });
  
  // Intersection Observer for bento grid animations
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          entry.target.classList.add('is-revealed');
          if (observer && entry.target) {
            observer.unobserve(entry.target);
          }
          
          setTimeout(() => {
            entry.target.classList.add('animations-complete');
          }, 2000);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px' }
  );

  nextTick(() => {
    bentoSection.value = document.querySelector('.bento-section');
    if (bentoSection.value) {
      observer?.observe(bentoSection.value);
    }
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  
  if (scrollHandler && typeof window !== 'undefined') {
    window.removeEventListener('scroll', scrollHandler);
  }
});
</script>

<style scoped lang="scss">
.homepage-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: visible;
  position: relative;
  background-color: #fbfbfb;
  
  // Remove any spacing after last section
  > section:last-child {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
  
  // Remove default section margins
  section {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

iframe {
  border: none;
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}

.hero-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  min-height: 40vh;
  overflow: hidden;
  background-color: #ffffff;
  padding-top: 76px;
  transition: height 0.1s ease-out;
  z-index: 1;
}

.hero-section .container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 76px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 36px;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  width: 100%;
  text-align: center;
  opacity: 0;
  animation: fadeInFromBlack 1.2s ease-out 0.3s forwards;
  
  .greeting {
    &-title {
      font-size: 100px;
      font-weight: 800;
      letter-spacing: -4px;
      margin-bottom: 24px;
      line-height: 95px;
      position: relative;
      color: #1c1c1c;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      opacity: 0;
      animation: fadeInBlur 1s ease-out 0.6s forwards;
      
      .playfair-text {
        font-family: 'Playfair Display', serif;
        font-weight: 800;
        font-style: italic;
      }
    }
    &-text {
      font-size: 18px;
      font-weight: 400;
      letter-spacing: -0.3px;
      line-height: 24px;
      margin-bottom: 24px;
      color: #595959;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
      opacity: 0;
      animation: fadeInBlur 1s ease-out 0.9s forwards;
    }
  }
  
  > div {
    display: flex;
    justify-content: center;
  }
  
  .button-wrapper {
    opacity: 0;
    animation: fadeInBlur 1s ease-out 1.2s forwards;
  }
  
  .hero-quote-btn {
    background-color: #1c1c1c !important;
    border: none !important;
    border-radius: 24px !important;
    color: white !important;
    padding: 22px 44px !important;
    font-size: 18px !important;
    font-weight: 500 !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: background-color 0.3s ease;
    
    span {
      color: white !important;
    }
    
    &:hover,
    &:focus,
    &:active {
      background-color: #1a1a1a !important;
    }
  }
  
  :deep(.btn) {
    opacity: 1;
  }
  
  :deep(.el-button.hero-btn) {
    background-color: #1c1c1c !important;
    border-color: #1c1c1c !important;
    color: white !important;
    padding: 22px 44px !important;
    font-size: 18px !important;
    border-radius: 24px !important;
    height: auto !important;
    min-height: auto !important;
    gap: 12px !important;
    font-weight: 500 !important;
    
    span {
      color: white !important;
      margin-right: 8px !important;
    }
    
    .icon {
      display: none !important;
    }
    
    .iconify-icon {
      display: block !important;
      color: white !important;
      width: 20px !important;
      height: 20px !important;
    }
    
    &:hover,
    &:focus,
    &:active {
      background-color: #1a1a1a !important;
      border-color: #1a1a1a !important;
      color: white !important;
    }
  }
}

.bento-section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  padding: 0;
  margin: 0;
  transition: transform 0.1s ease-out;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  overflow: hidden;
  // Start below viewport, will move up on scroll
  transform: translateY(100vh);
}

.bento-container {
  width: 80%;
  padding: 12px;
  height: 100%;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.1s ease-out;
  margin: 0 auto;
  box-sizing: border-box;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 30vh 65vh;
  gap: 12px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  align-items: stretch;
  box-sizing: border-box;
}

.bento-card {
  border: none;
  border-radius: var(--radius--24px);
  background-color: #ffffff;
  padding: 4px;
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 0;
  will-change: transform;
  opacity: 0;
  visibility: hidden;

  &:hover {
    transform: translateY(-4px);
  }
}

.bento-section:not(.is-revealed) .bento-card {
  transition: none;
}

.bento-section.is-revealed .bento-card {
  animation-fill-mode: forwards;
  transition: none;
}

.bento-section.animations-complete .bento-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.bento-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #1c1c1c;
  border-radius: calc(var(--radius--24px) - 4px);
  background-color: #ffffff;
}

.placeholder-label {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.1px;
}

.bento-card-featured {
  display: flex;
  flex-direction: column;
  position: relative;
}

.bento-card-featured .card-content,
.bento-card-featured .card-logo,
.bento-card-featured .card-line {
  position: relative;
  z-index: 1;
}

.bento-card-featured .card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bento-card-featured {
  --card-gradient: linear-gradient(135deg, rgba(28, 28, 28, 0.3) 0%, rgba(28, 28, 28, 0.15) 50%, rgba(28, 28, 28, 0.05) 100%);
}

.card-line {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  height: 1px;
  background: var(--card-gradient);
  z-index: 2;
}

.card-logo {
  position: absolute;
  top: 24px;
  left: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.iconify-logo {
  width: 32px;
  height: 32px;
  color: #1c1c1c;
  opacity: 0.85;
}

.card-logo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--card-gradient);
  border-radius: 6px;
  opacity: 0.4;
  pointer-events: none;
  mix-blend-mode: overlay;
}


.card-title {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 28px;
  color: #1c1c1c;
  margin: 0;
}

.card-description {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #1c1c1c;
  margin: 0;
  flex: 1;
  opacity: 0.7;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.1px;
  color: #1c1c1c;
  background: rgba(28, 28, 28, 0.05);
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.tag:hover {
  background: rgba(28, 28, 28, 0.1);
  color: #1c1c1c;
}

.bento-grid {
  .bento-card:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  
  .bento-card:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  
  .bento-card:nth-child(3) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  
  .bento-card:nth-child(4) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }
  
  .bento-card:nth-child(5) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  
  .bento-card:nth-child(6) {
    grid-column: 2 / 4;
    grid-row: 2 / 3;
  }
  
  .bento-card:nth-child(7).bento-card-column {
    grid-column: 4 / 5;
    grid-row: 2 / 3;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 4px;
    background: transparent !important;
    border: none;
    border-radius: var(--radius--24px);
    background-color: transparent !important;
    align-self: stretch;
    height: 100%;
  }
  
  .bento-card-column::before {
    display: none;
  }
  
  .bento-card-column .bento-card {
    border: none;
    border-radius: var(--radius--24px);
    background-color: #ffffff;
    padding: 4px;
    position: relative;
    flex: 1;
    min-height: 0;
  }
}

.bento-section:not(.is-revealed) .bento-card {
  opacity: 0 !important;
  visibility: hidden !important;
  filter: blur(10px);
  transform: translateY(10px);
}

.bento-section.is-revealed .bento-card {
  visibility: visible !important;
}

.bento-section.is-revealed .bento-card:nth-child(1) {
  animation: fadeInBlur 0.9s ease-out 0.1s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(2) {
  animation: fadeInBlur 1.1s ease-out 0.2s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(3) {
  animation: fadeInBlur 0.8s ease-out 0.15s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(4) {
  animation: fadeInBlur 1.2s ease-out 0.25s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(5) {
  animation: fadeInBlur 1.0s ease-out 0.3s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(6) {
  animation: fadeInBlur 1.1s ease-out 0.35s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(7) {
  animation: fadeInBlur 0.9s ease-out 0.4s forwards;
}

.bento-section.is-revealed .bento-card-column .bento-card:nth-child(1) {
  animation: fadeInBlur 0.8s ease-out 0.5s forwards;
}

.bento-section.is-revealed .bento-card-column .bento-card:nth-child(2) {
  animation: fadeInBlur 0.9s ease-out 0.6s forwards;
}

.bento-section.is-revealed .bento-card-column .bento-card:nth-child(3) {
  animation: fadeInBlur 1.0s ease-out 0.7s forwards;
}

.bento-section.is-revealed .bento-card-column .bento-card:nth-child(4) {
  animation: fadeInBlur 1.1s ease-out 0.8s forwards;
}


.bento-card-wide {
  grid-column: span 2;
}

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  
  .bento-grid {
    .bento-card:nth-child(1),
    .bento-card:nth-child(2),
    .bento-card:nth-child(3),
    .bento-card:nth-child(4) {
      grid-column: span 1;
      grid-row: 1 / 2;
    }
    
    .bento-card:nth-child(5) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
    
    .bento-card:nth-child(6) {
      grid-column: 2 / 4;
      grid-row: 2 / 3;
    }
    
    .bento-card:nth-child(7) {
      grid-column: 4 / 5;
      grid-row: 2 / 3;
    }
    
    .bento-card-column {
      grid-column: 1 / 5;
      grid-row: 3 / 4;
      grid-template-rows: repeat(4, 1fr);
    }
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 120px 20px 20px 20px;
    
    .greeting-title {
      font-size: 48px;
      line-height: 56px;
    }
  }
  
  .bento-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 8px;
  }
  
  .bento-grid .bento-card,
  .bento-grid .bento-card-column {
    grid-column: 1 !important;
    grid-row: auto !important;
  }
  
  .bento-card-column {
    grid-template-rows: repeat(4, minmax(150px, 1fr));
  }
}

@keyframes fadeInFromBlack {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInBlur {
  from {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}
</style>
