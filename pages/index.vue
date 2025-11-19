<template>
  <div class="homepage-container">
    <!-- Section 1: Hero Section -->
    <section class="hero-section" data-scroll-section>
      <div class="container">
        <div class="hero-content" data-scroll data-scroll-speed="0.5">
          <h1 class="greeting-title" data-scroll data-scroll-speed="0.3">
            You Dream It, <span class="playfair-text">We Build It.</span>
          </h1>
          <p class="greeting-text" data-scroll data-scroll-speed="0.2">
            We specialize in delivering high-quality, custom software solutions that elevate your
            brand's digital.
          </p>
          <div data-scroll data-scroll-speed="0.1" class="button-wrapper">
            <ButtonLink text="Get a quote" type="primary" href="/" iconify-icon="line-md:arrow-right" variant="hero"></ButtonLink>
          </div>
        </div>
      </div>
    </section>

    <section class="bento-section" data-scroll-section>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const bentoSection = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let hasAnimated = false;

onMounted(() => {
  if (typeof window === 'undefined') return;
  
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
          }, 2500);
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
});
</script>

<style scoped lang="scss">
.homepage-container {
  width: 100%;
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
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background-color: #ffffff;
  padding-top: 76px;
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
      font-size: 16px;
      font-weight: 400;
      letter-spacing: -0.3px;
      line-height: 24px;
      margin-bottom: 24px;
      color: #595959;
      max-width: 400px;
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
  
  :deep(.btn) {
    opacity: 0;
    animation: fadeInBlur 1s ease-out 1.2s forwards;
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
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background: #fbfbfb;
  padding: 0;
}

.bento-container {
  width: 100%;
  padding: 12px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 30vh 65vh;
  gap: 12px;
  width: 100%;
  height: 95vh;
  align-items: stretch;
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
}

.bento-section:not(.is-revealed) .bento-card:nth-child(1),
.bento-section:not(.is-revealed) .bento-card:nth-child(2) {
  transform: translateX(-150%) !important;
  opacity: 0 !important;
  visibility: hidden;
}

.bento-section:not(.is-revealed) .bento-card:nth-child(3),
.bento-section:not(.is-revealed) .bento-card:nth-child(4) {
  transform: translateX(150%) !important;
  opacity: 0 !important;
  visibility: hidden;
}

.bento-section:not(.is-revealed) .bento-card:nth-child(5),
.bento-section:not(.is-revealed) .bento-card:nth-child(6) {
  transform: translateY(150%) !important;
  opacity: 0 !important;
  visibility: hidden;
}

.bento-section:not(.is-revealed) .bento-card:nth-child(7) {
  transform: translateX(150%) !important;
  opacity: 0 !important;
  visibility: hidden;
}

.bento-section:not(.is-revealed) .bento-card-column .bento-card {
  transform: translateX(150%) !important;
  opacity: 0 !important;
  visibility: hidden;
}

.bento-section.is-revealed .bento-card {
  visibility: visible !important;
}

.bento-section.is-revealed .bento-card:nth-child(1) {
  animation: slideInFromLeft 1.2s ease-out 0.1s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(2) {
  animation: slideInFromLeft 1.4s ease-out 0.15s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(3) {
  animation: slideInFromRight 1.3s ease-out 0.2s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(4) {
  animation: slideInFromRight 1.5s ease-out 0.25s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(5) {
  animation: slideInFromBottom 1.6s ease-out 0.3s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(6) {
  animation: slideInFromBottom 1.4s ease-out 0.35s forwards;
}

.bento-section.is-revealed .bento-card:nth-child(7) {
  animation: slideInFromRight 1.3s ease-out 0.4s forwards;
}

.bento-section.is-revealed .bento-card-column .bento-card:nth-child(1) {
  animation: slideInFromRight 1.1s ease-out 0.5s forwards;
}

.bento-section.is-revealed .bento-card-column .bento-card:nth-child(2) {
  animation: slideInFromRight 1.2s ease-out 0.6s forwards;
}

.bento-section.is-revealed .bento-card-column .bento-card:nth-child(3) {
  animation: slideInFromRight 1.3s ease-out 0.7s forwards;
}

.bento-section.is-revealed .bento-card-column .bento-card:nth-child(4) {
  animation: slideInFromRight 1.4s ease-out 0.8s forwards;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(150%);
    opacity: 1;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromBottom {
  from {
    transform: translateY(150%);
    opacity: 1;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-150%);
    opacity: 1;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
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
