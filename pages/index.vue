<template>
  <div ref="pageRef" class="homepage">
    <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }" />

    <!-- Hero -->
    <section class="hero">
      <HomeHeroScene />

      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge-dot" />
          Web development agency
        </div>

        <h1 class="hero__title">
          <span class="hero__line" style="animation-delay: 0.5s">You Dream It,</span>
          <span class="hero__line hero__line--accent" style="animation-delay: 0.65s">We Build It.</span>
        </h1>

        <p class="hero__subtitle">
          Senior engineers & designers with 5+ years each — building websites, apps,
          and full digital products from concept to launch.
        </p>

        <div class="hero__actions">
          <button class="hero__btn hero__btn--primary" @click="openSidebar">
            <span>Start a project</span>
            <Icon icon="line-md:arrow-right" :width="22" :height="22" />
          </button>
          <button class="hero__btn hero__btn--ghost" @click="scrollToBento">
            <span>Explore services</span>
            <Icon icon="mdi:arrow-down" :width="18" :height="18" />
          </button>
        </div>
      </div>

      <div class="hero__scroll-hint">
        <span>Scroll</span>
        <div class="hero__scroll-line" />
      </div>
    </section>

    <!-- Sections -->
    <div ref="bentoAnchor">
      <HomeBentoGrid class="reveal-section" @open-contact="openSidebar" />
    </div>

    <HomeMarquee />
    <HomeProcess class="reveal-section" />
    <HomeExpertise class="reveal-section" />
    <HomeContact class="reveal-section" @open-contact="openSidebar" />

    <Sidebar :is-open="sidebarOpen" @close="closeSidebar" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const { sidebarOpen, openSidebar, closeSidebar } = useSidebar();

const pageRef = ref<HTMLElement | null>(null);
const bentoAnchor = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);

let revealObserver: IntersectionObserver | null = null;

const onScroll = () => {
  const doc = document.documentElement;
  const scrollTop = window.scrollY;
  const maxScroll = doc.scrollHeight - window.innerHeight;
  scrollProgress.value = maxScroll > 0 ? scrollTop / maxScroll : 0;

  const header = document.getElementById('header');
  if (header) {
    header.classList.toggle('navbar-hidden', scrollTop > 80);
  }
};

const scrollToBento = () => {
  bentoAnchor.value?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
  );

  nextTick(() => {
    document.querySelectorAll('.reveal-section').forEach((el) => {
      revealObserver?.observe(el);
    });
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  revealObserver?.disconnect();
});
</script>

<style scoped lang="scss">
.homepage {
  width: 100%;
  background: #fbfbfb;
  overflow-x: hidden;
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--el-color-orange);
  transform-origin: left;
  z-index: 1000;
  pointer-events: none;
}

// ─── Hero ───────────────────────────────────────────
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 36px 80px;
  overflow: hidden;

  &__content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    text-align: center;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(28, 28, 28, 0.06);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: rgba(28, 28, 28, 0.6);
    margin-bottom: 32px;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.2s forwards;
  }

  &__badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4caf50;
    animation: pulse 2s ease-in-out infinite;
  }

  &__title {
    margin: 0 0 28px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__line {
    display: block;
    font-size: clamp(48px, 9vw, 110px);
    font-weight: 800;
    letter-spacing: -4px;
    line-height: 0.95;
    color: #1c1c1c;
    opacity: 0;
    filter: blur(12px);
    transform: translateY(30px);
    animation: heroReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;

    &--accent {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 700;
      letter-spacing: -3px;
    }
  }

  &__subtitle {
    font-size: clamp(16px, 2vw, 19px);
    line-height: 1.6;
    color: rgba(28, 28, 28, 0.55);
    max-width: 520px;
    margin: 0 auto 40px;
    opacity: 0;
    animation: fadeUp 0.9s ease 0.9s forwards;
  }

  &__actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeUp 0.9s ease 1.1s forwards;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border-radius: 28px;
    padding: 20px 36px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, border-color 0.2s ease;

    &--primary {
      background: #1c1c1c;
      color: #fff;
      &:hover {
        background: #2a2a2a;
        box-shadow: 0 12px 40px rgba(28, 28, 28, 0.2);
      }
    }

    &--ghost {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(8px);
      color: #1c1c1c;
      border: 1px solid rgba(28, 28, 28, 0.1);
      &:hover {
        background: #fff;
        box-shadow: 0 8px 30px rgba(28, 28, 28, 0.08);
      }
    }
  }

  &__scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    z-index: 2;
    opacity: 0;
    animation: fadeUp 0.8s ease 1.5s forwards;

    span {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(28, 28, 28, 0.35);
    }
  }

  &__scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, rgba(28, 28, 28, 0.3), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
}

@keyframes heroReveal {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scrollPulse {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.6); opacity: 0.4; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (max-width: 640px) {
  .hero {
    padding: 100px 20px 60px;
    &__line { letter-spacing: -2px; }
    &__actions { flex-direction: column; align-items: center; }
    &__btn { width: 100%; justify-content: center; }
  }
}
</style>
