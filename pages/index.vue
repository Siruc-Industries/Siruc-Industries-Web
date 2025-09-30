<template>
  <div>
    <section class="hero-section" data-scroll-section>
      <div class="spline-background">
        <div class="spline-container">
          <spline-viewer
            url="https://prod.spline.design/a003KKhjX5KeLY8T/scene.splinecode"
          ></spline-viewer>
        </div>
      </div>
      <div class="container">
        <div class="hero-content" data-scroll data-scroll-speed="0.5">
          <h1 class="greeting-title" data-scroll data-scroll-speed="0.3">
            Bespoke software solutions for visionary brands.
          </h1>
          <p class="greeting-text" data-scroll data-scroll-speed="0.2">
            We specialize in delivering high-quality, custom software solutions that elevate your
            brand's digital.
          </p>
          <div @click="scrollToContact" data-scroll data-scroll-speed="0.1">
            <ButtonLink text="Get a quote" type="primary" :circledArrow="true" href="/">
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>

    <div class="welcome-wrapper" data-scroll-section>
      <div class="container">
        <h2
          class="welcome-title scroll-fade"
          data-scroll
          data-scroll-speed="0.35"
          data-scroll-repeat
        >
          Services We Provide
        </h2>

        <div class="welcome-grid" data-scroll data-scroll-repeat>
          <div class="col scroll-fade" data-scroll data-scroll-speed="0.2">
            <div class="welcome-card" data-scroll data-scroll-speed="0.25">
              <h3 class="card-title">Design</h3>
              <p class="card-desc">
                Human-centered UI/UX that elevates your brand and product usability.
              </p>
              <NuxtLink to="/services" class="text-button">Explore services</NuxtLink>
            </div>
            <div class="welcome-card" data-scroll data-scroll-speed="0.15">
              <h3 class="card-title">Development</h3>
              <p class="card-desc">
                Robust web and app engineering, from MVPs to enterprise systems.
              </p>
              <NuxtLink to="/services" class="text-button">Explore services</NuxtLink>
            </div>
          </div>
          <div class="col scroll-fade" data-scroll data-scroll-speed="0.1">
            <div class="welcome-card" data-scroll data-scroll-speed="0.20">
              <h3 class="card-title">Marketing</h3>
              <p class="card-desc">
                Full-funnel growth strategies that convert attention into revenue.
              </p>
              <NuxtLink to="/services" class="text-button">Explore services</NuxtLink>
            </div>
            <div class="welcome-card" data-scroll data-scroll-speed="0.12">
              <h3 class="card-title">SEO</h3>
              <p class="card-desc">
                Technical SEO and content systems that scale organic discovery.
              </p>
              <NuxtLink to="/services" class="text-button">Explore services</NuxtLink>
            </div>
            <div class="welcome-card" data-scroll data-scroll-speed="0.08">
              <h3 class="card-title">Support</h3>
              <p class="card-desc">Reliable maintenance, monitoring, and iteration post‑launch.</p>
              <NuxtLink to="/services" class="text-button">Explore services</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="connect-container" data-scroll-section>
      <div class="connect-body container">
        <div class="connect-inner" data-scroll data-scroll-repeat>
          <h3 class="connect-title">Let's talk about your project.</h3>
          <p class="connect-desc scroll-fade" data-scroll data-scroll-repeat>
            We’re ready to help scope, design, and build. Tell us about timelines, goals, and
            constraints.
          </p>
          <div class="connect-actions">
            <ButtonLink
              text="Leave a message"
              type="basic"
              :circledArrow="true"
              href="mailto:hello@sirucindustries.com"
            />
          </div>
        </div>
      </div>
    </div>

    <h2 class="container welcome-message" data-scroll-section>Welcome to Siruć Industries</h2>
    <div class="container card-container" data-scroll-section>
      <CardInfo
        v-for="(card, idx) in cards"
        :key="idx"
        :index="card.index"
        :title="card.title"
        :text="card.text"
      />
    </div>

    <div ref="contactContainer" class="contact-container" data-scroll-section>
      <div class="contact-body container">
        <CommonContactForm></CommonContactForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CardInfo from '@/components/card/CardInfo.vue';

const list = ['visionary', 'motivated', 'efficient', 'your'];
const currentIndex = ref(0);
const contactContainer = ref(null);
const currentWord = computed(() => list[currentIndex.value]);
console.log(currentWord.value);

// Scroll-dependent motion for connect title
const connectSectionEl = ref<HTMLElement | null>(null);
const connectTitleEl = ref<HTMLElement | null>(null);
let rafId: number | null = null;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function updateConnectMotion() {
  if (!connectSectionEl.value || !connectTitleEl.value) {
    rafId = requestAnimationFrame(updateConnectMotion);
    return;
  }
  const rect = connectSectionEl.value.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  // Define motion over a window of the section being in view: from when top hits 80% vh to when it hits 10% vh
  const start = vh * 0.8;
  const finish = vh * 0.1;
  const raw = (start - rect.top) / (start - finish);
  const t = clamp01(raw);
  const tx = lerp(-240, 0, t);
  const opacity = 1; // keep blur/opacity handled by CSS fade
  const blur = 0; // blur not scroll dependent
  connectTitleEl.value.style.transform = `translateX(${tx}px)`;
  connectTitleEl.value.style.opacity = String(opacity);
  connectTitleEl.value.style.filter = `blur(${blur}px)`;
  rafId = requestAnimationFrame(updateConnectMotion);
}

onMounted(() => {
  connectSectionEl.value = document.querySelector('.connect-container');
  connectTitleEl.value = document.querySelector('.connect-title');
  rafId = requestAnimationFrame(updateConnectMotion);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
});

function scrollToContact() {
  if (contactContainer.value) {
    contactContainer.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

const cards = ref([
  { index: 1, title: 'Design', text: 'Description for Design, Lorem ipsum dolor sit amet.' },
  {
    index: 2,
    title: 'Development',
    text: 'Description for Development, Lorem ipsum dolor sit amet.',
  },
  {
    index: 3,
    title: 'Marketing',
    text: 'Description for Marketing, Lorem ipsum dolor sit amet.',
  },
  { index: 4, title: 'SEO', text: 'Description for SEO, Lorem ipsum dolor sit amet.' },
  {
    index: 5,
    title: 'Content Creation',
    text: 'Description for Content Creation, Lorem ipsum dolor sit amet.',
  },
  {
    index: 6,
    title: 'Support',
    text: 'Description for Support, Lorem ipsum dolor sit amet.',
  },
]);
</script>

<style scoped lang="scss">
iframe {
  border: none;
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 10;
  pointer-events: all;
}

.connect {
  &-container {
    /* remove background */
    background-color: transparent;
    margin-bottom: 160px;
    min-height: 70vh;
  }
  &-body {
    padding: 72px 0;
    .pointer {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .pointer:hover {
      .arrow-img {
        transform: scale(1.3);
      }
    }
    .invite {
      font-size: 32px;
    }
    .arrow-img {
      margin-left: 16px;
      width: 28px;
      height: 28px;
      transition: all 0.2s linear;
    }
  }
}

/* Connect section styling */
.connect-inner {
  position: relative;
  overflow: visible;
}

.connect-title {
  font-size: 64px;
  font-weight: 500;
  letter-spacing: -3px;
  line-height: 64px;
  color: var(--el-color-text);
  white-space: nowrap;
  margin: 0 0 8px 0;
  transform: translateX(-120px);
  opacity: 0;
}

.is-revealed .connect-title {
  animation: connectNudgeIn 0.9s ease-out 0s forwards;
}

@keyframes connectNudgeIn {
  0% {
    transform: translateX(-40px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.connect-desc {
  max-width: 420px;
  color: #838993;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 22px;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(8px);
  filter: blur(10px);
}

.is-revealed .connect-desc {
  animation: fadeInBlur 0.8s ease-out 0.4s forwards;
}

.connect-actions {
  margin-top: 16px;
  opacity: 0;
  transform: translateY(8px);
  filter: blur(10px);
}

/* Secondary-like variant for link-style CTA (inherits ButtonLink basic styles) */
.connect-actions :deep(.btn) {
  background: transparent !important;
  border-color: transparent !important;
  padding-left: 12px !important;
}
.is-revealed .connect-actions {
  animation: fadeInBlur 0.9s ease-out 0.8s forwards;
}

.connect-actions :deep(.btn) span {
  color: #838993 !important;
}

.connect-actions :deep(.btn):hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

.connect-actions :deep(.btn):hover span {
  color: #ffffff !important;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.spline-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  .spline-container {
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: fadeInBlur 1.5s ease-out 1.5s forwards;

    spline-viewer {
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  padding: 200px 0 40px 0;
  text-align: left;
  opacity: 0;
  animation: fadeInFromBlack 1.2s ease-out 0.3s forwards;

  .greeting {
    &-title {
      font-size: 64px;
      font-weight: 500;
      letter-spacing: -3px;
      margin-bottom: 24px;
      line-height: 64px;
      position: relative;
      color: white;
      max-width: 800px;
      opacity: 0;
      animation: fadeInBlur 1s ease-out 0.6s forwards;
    }
    &-text {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: -0.3px;
      line-height: 24px;
      margin-bottom: 24px;
      color: #838993;
      max-width: 400px;
      opacity: 0;
      animation: fadeInBlur 1s ease-out 0.9s forwards;
    }
  }

  :deep(.btn) {
    background-color: white !important;
    border-color: white !important;
    gap: 8px !important;
    opacity: 0;
    animation: fadeInBlur 1s ease-out 1.2s forwards;

    span {
      color: black !important;
    }

    .icon {
      filter: brightness(0) !important;
    }

    &:hover {
      background-color: #f5f5f5 !important;
      border-color: #f5f5f5 !important;
    }
  }
}

.section {
  &-container {
    padding: 280px 0;
    color: var(--el-color-text);
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  &-body {
    max-width: 596px;
    .greeting {
      &-title {
        font-size: 64px;
        margin-bottom: 24px;
        line-height: 76px;
        position: relative;
      }
      &-text {
        line-height: 20px;
        margin-bottom: 24px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .hero-content {
    max-width: 100%;
    padding: 30px;
  }
  .welcome-title {
    font-size: 40px;
    line-height: 60px;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 20px;

    .greeting-title {
      font-size: 48px;
      line-height: 56px;
    }
  }
  .welcome-title {
    font-size: 36px;
    line-height: 50px;
  }
}

.classifier {
  font-style: italic;
  font-weight: 500;
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .card-container {
    grid-template-columns: 1fr;
  }
}

.welcome-message {
  font-size: 32px;
  color: var(--el-color-text);
}

.welcome-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 80px 0;
  position: relative;
}

.welcome-title {
  font-size: 48px;
  font-weight: 500;
  letter-spacing: -2.5px;
  line-height: 64px;
  color: var(--el-color-text);
  text-align: left;
  max-width: 800px;
  margin: 0 0 24px 0;
  padding: 0;
  opacity: 0;
  transform: translateY(10px);
  filter: blur(10px);

  .subtext {
    color: var(--el-color-orange);
    font-weight: 500;
  }
}

.welcome-grid {
  display: grid;
  grid-template-columns: 40% 60%;
  column-gap: 8px;
  row-gap: 8px;
  align-items: stretch;
  height: 100%;
  position: relative;
  z-index: 1;
}

.welcome-grid .col {
  display: grid;
  gap: 8px;
  height: 100%;
  opacity: 0;
  transform: translateY(10px);
  filter: blur(10px);
}

.welcome-grid .col:nth-child(1) {
  grid-template-rows: repeat(2, 1fr);
}

.welcome-grid .col:nth-child(2) {
  grid-template-rows: repeat(3, 1fr);
}

.welcome-card {
  position: relative;
  height: 100%;
  padding: 20px;
  border-radius: 12px;
  background: #0a0a0c;
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.welcome-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(60deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.06));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
  margin: 0 0 8px 0;
}

.card-desc {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.1px;
  color: #838993;
  line-height: 22px;
  margin: 0 0 12px 0;
}

.text-button {
  color: #838993;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.1px;
  text-decoration: none;
  height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 8px;
}

.text-button:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}

@media (max-width: 1024px) {
  .welcome-grid {
    grid-template-columns: 1fr;
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

.is-revealed.scroll-fade,
.is-revealed .scroll-fade {
  animation: fadeInBlur 0.9s ease-out 0s forwards;
}
</style>
