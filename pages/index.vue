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
          <!-- Hero Card - Large Dark Card -->
          <div class="bento-card bento-card-hero">
            <div class="card-content">
              <div class="hero-chip">
                <Icon icon="mdi:sparkles" :width="12" :height="12" />
                <span>Est. 2024</span>
              </div>
              <div class="hero-text">
                <h1 class="hero-title">
                  We build software<br />that works.
                </h1>
                <p class="hero-description">
                  A lean team of developers shipping websites, apps, and dashboards.
                </p>
              </div>
            </div>
          </div>

          <!-- Recent Work Card -->
          <div class="bento-card bento-card-featured">
            <div class="card-content">
              <span class="card-label">Recent work</span>
              <p class="card-description">From MVPs to enterprise solutions</p>
              <div class="card-tags">
                <span class="tag tag-primary">Fintech</span>
                <span class="tag">E-commerce</span>
                <span class="tag">SaaS</span>
              </div>
            </div>
          </div>

          <!-- Testimonial Card -->
          <div class="bento-card bento-card-featured">
            <div class="card-content">
              <Icon icon="mdi:format-quote-open" class="quote-icon" :width="20" :height="20" />
              <p class="testimonial-text">"Shipped our MVP in 10 days. Exactly what we needed."</p>
              <p class="testimonial-author">— Sarah K., Founder</p>
            </div>
          </div>

          <!-- Services Card 1: Websites -->
          <div class="bento-card bento-card-featured bento-card-service">
            <div class="card-content">
              <div class="service-icon">
                <Icon icon="mdi:web" :width="24" :height="24" />
              </div>
              <h3 class="card-title">Websites</h3>
              <p class="card-description">Fast, responsive, conversion-focused.</p>
            </div>
          </div>

          <!-- Services Card 2: Applications -->
          <div class="bento-card bento-card-featured bento-card-service">
            <div class="card-content">
              <div class="service-icon">
                <Icon icon="mdi:cellphone" :width="24" :height="24" />
              </div>
              <h3 class="card-title">Applications</h3>
              <p class="card-description">Web & mobile with modern stacks.</p>
            </div>
          </div>

          <!-- Services Card 3: Dashboards -->
          <div class="bento-card bento-card-featured bento-card-service">
            <div class="card-content">
              <div class="service-icon">
                <Icon icon="mdi:view-dashboard" :width="24" :height="24" />
              </div>
              <h3 class="card-title">Dashboards</h3>
              <p class="card-description">Data-rich admin interfaces.</p>
            </div>
          </div>

          <!-- Tech Stack Card -->
          <div class="bento-card bento-card-wide bento-card-stack">
            <div class="card-content">
              <span class="card-label">Stack</span>
              <div class="card-tags">
                <span class="tag">React</span>
                <span class="tag">Next.js</span>
                <span class="tag">TypeScript</span>
                <span class="tag">Node.js</span>
                <span class="tag">PostgreSQL</span>
                <span class="tag">Tailwind</span>
              </div>
            </div>
          </div>

          <!-- CTA Card -->
          <div class="bento-card bento-card-cta" @click="openSidebar">
            <div class="card-content">
              <Icon icon="mdi:lightning-bolt" class="cta-icon" :width="32" :height="32" />
              <div class="cta-content">
                <span class="cta-text">Start a project</span>
                <Icon icon="mdi:arrow-right" :width="20" :height="20" />
              </div>
            </div>
          </div>

          <!-- Approach Card -->
          <div class="bento-card bento-card-featured">
            <div class="card-content">
              <span class="card-label">Our approach</span>
              <p class="approach-text">No bloat. No meetings that could've been emails. Just clean code, shipped fast.</p>
            </div>
          </div>

          <!-- Availability Card -->
          <div class="bento-card bento-card-featured">
            <div class="card-content">
              <div class="availability-indicator">
                <div class="status-dot"></div>
                <span class="card-label">Available now</span>
              </div>
              <div class="availability-content">
                <Icon icon="mdi:clock-outline" :width="20" :height="20" />
                <div>
                  <p class="availability-title">Taking on 2 new projects</p>
                  <p class="availability-subtitle">Typical turnaround: 2-4 weeks</p>
                </div>
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
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(160px, auto);
  gap: 12px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  align-items: start;
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
  
  // Service cards should auto-size to content
  &.bento-card-service {
    height: auto;
    min-height: fit-content;
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
  
  &.tag-primary {
    background: #1c1c1c;
    color: #ffffff;
  }
}

.tag:hover {
  background: rgba(28, 28, 28, 0.1);
  color: #1c1c1c;
  
  &.tag-primary:hover {
    background: #1a1a1a;
    color: #ffffff;
  }
}

// Hero card styles
.bento-card-hero {
  background: #1c1c1c !important;
  color: #ffffff;
  padding: 32px 48px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .card-content {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 0;
  }
  
  .hero-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    width: fit-content;
    color: #ffffff;
    
    :deep(iconify-icon) {
      color: #ffffff;
    }
  }
  
  .hero-text {
    margin-top: auto;
  }
  
  .hero-title {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -2px;
    margin: 0 0 16px 0;
    color: #ffffff;
  }
  
  .hero-description {
    font-size: 18px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    max-width: 500px;
  }
}

// CTA card styles
.bento-card-cta {
  background: var(--el-color-orange) !important;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.3s ease;
  border: none !important;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-4px);
  }
  
  .card-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  
  .cta-icon {
    color: #ffffff;
  }
  
  .cta-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    
    .cta-text {
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
    }
    
    :deep(iconify-icon) {
      color: #ffffff;
    }
  }
}

// Service icon styles
.service-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(28, 28, 28, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  
  :deep(iconify-icon) {
    color: #1c1c1c;
  }
}

// Service cards (Websites, Applications, Dashboards) - make them hug content
.bento-card-service {
  .card-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .card-title {
    margin-top: 0;
    margin-bottom: 8px;
  }
  
  .card-description {
    margin: 0;
    flex: 0 0 auto;
  }
}

// Testimonial styles
.quote-icon {
  color: var(--el-color-orange);
  margin-bottom: 12px;
}

.testimonial-text {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  color: #1c1c1c;
  margin: 0 0 8px 0;
}

.testimonial-author {
  font-size: 12px;
  color: rgba(28, 28, 28, 0.6);
  margin: 0;
}

// Card label
.card-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(28, 28, 28, 0.5);
  display: block;
  margin-bottom: 12px;
}

// Stack card specific styling
.bento-card-stack {
  .card-content {
    padding: 24px 24px 24px 24px !important;
    padding-top: 24px !important;
    padding-left: 24px !important;
  }
}

// Approach text
.approach-text {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  color: #1c1c1c;
  margin: 12px 0 0 0;
}

// Availability styles
.availability-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4caf50;
    animation: pulse 2s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.availability-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  
  :deep(iconify-icon) {
    color: rgba(28, 28, 28, 0.5);
    margin-top: 2px;
  }
  
  .availability-title {
    font-size: 16px;
    font-weight: 600;
    color: #1c1c1c;
    margin: 0 0 4px 0;
  }
  
  .availability-subtitle {
    font-size: 14px;
    color: rgba(28, 28, 28, 0.6);
    margin: 0;
  }
}

.bento-grid {
  // Hero card - spans 4 columns, 2 rows
  .bento-card:nth-child(1).bento-card-hero {
    grid-column: 1 / 5;
    grid-row: 1 / 3;
  }
  
  // Recent work card - spans 2 columns
  .bento-card:nth-child(2) {
    grid-column: 5 / 7;
    grid-row: 1 / 2;
  }
  
  // Testimonial card - spans 2 columns
  .bento-card:nth-child(3) {
    grid-column: 5 / 7;
    grid-row: 2 / 3;
  }
  
  // Services card 1: Websites - spans 2 columns, auto height
  .bento-card:nth-child(4) {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    align-self: start;
    height: auto;
  }
  
  // Services card 2: Applications - spans 2 columns, auto height
  .bento-card:nth-child(5) {
    grid-column: 3 / 5;
    grid-row: 3 / 4;
    align-self: start;
    height: auto;
  }
  
  // Services card 3: Dashboards - spans 2 columns, auto height
  .bento-card:nth-child(6) {
    grid-column: 5 / 7;
    grid-row: 3 / 4;
    align-self: start;
    height: auto;
    margin-bottom: 0;
  }
  
  // Tech stack card - spans 3 columns, reduce gap from row above
  .bento-card:nth-child(7).bento-card-wide {
    grid-column: 1 / 4;
    grid-row: 4 / 5;
    margin-top: -12px; // Reduce gap from service cards row
  }
  
  // CTA card - also reduce gap to match
  .bento-card:nth-child(8).bento-card-cta {
    margin-top: -12px;
  }
  
  // CTA card - spans 3 columns
  .bento-card:nth-child(8).bento-card-cta {
    grid-column: 4 / 7;
    grid-row: 4 / 5;
  }
  
  // Approach card - spans 3 columns
  .bento-card:nth-child(9) {
    grid-column: 1 / 4;
    grid-row: 5 / 6;
  }
  
  // Availability card - spans 3 columns
  .bento-card:nth-child(10) {
    grid-column: 4 / 7;
    grid-row: 5 / 6;
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

.bento-section.is-revealed .bento-card:nth-child(6) {
  animation: fadeInBlur 1.0s ease-out 0.25s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(7) {
  animation: fadeInBlur 1.1s ease-out 0.3s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(8) {
  animation: fadeInBlur 0.9s ease-out 0.35s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(9) {
  animation: fadeInBlur 1.0s ease-out 0.4s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(10) {
  animation: fadeInBlur 1.1s ease-out 0.45s forwards;
}


.bento-card-wide {
  grid-column: span 2;
}

// Stack card specific styling - ensure proper padding on top and left
.bento-card-stack {
  .card-content {
    padding: 24px 24px 20px 24px !important;
    padding-top: 24px !important;
    padding-left: 24px !important;
  }
}

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 160px;
  }
  
  .bento-grid {
    // Hero card - spans 3 columns, 2 rows on tablet
    .bento-card:nth-child(1).bento-card-hero {
      grid-column: 1 / 4;
      grid-row: 1 / 3;
    }
    
    // Recent work - spans full width
    .bento-card:nth-child(2) {
      grid-column: 1 / 4;
      grid-row: 3 / 4;
    }
    
    // Testimonial - spans full width
    .bento-card:nth-child(3) {
      grid-column: 1 / 4;
      grid-row: 4 / 5;
    }
    
    // Services cards - each spans 1 column
    .bento-card:nth-child(4),
    .bento-card:nth-child(5),
    .bento-card:nth-child(6) {
      grid-row: 5 / 6;
    }
    
    // Tech stack - spans 2 columns
    .bento-card:nth-child(7) {
      grid-column: 1 / 3;
      grid-row: 6 / 7;
    }
    
    // CTA - spans 1 column
    .bento-card:nth-child(8) {
      grid-column: 3 / 4;
      grid-row: 6 / 7;
    }
    
    // Approach - spans full width
    .bento-card:nth-child(9) {
      grid-column: 1 / 4;
      grid-row: 7 / 8;
    }
    
    // Availability - spans full width
    .bento-card:nth-child(10) {
      grid-column: 1 / 4;
      grid-row: 8 / 9;
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
  
  .bento-card-hero {
    .hero-title {
      font-size: 32px !important;
      line-height: 1.2 !important;
    }
    
    .hero-description {
      font-size: 16px !important;
    }
    
    padding: 24px !important;
  }
  
  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 8px;
  }
  
  .bento-grid .bento-card {
    grid-column: 1 !important;
    grid-row: auto !important;
  }
  
  .bento-card-hero {
    grid-row: span 1 !important;
  }
  
  .approach-text {
    font-size: 16px !important;
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
