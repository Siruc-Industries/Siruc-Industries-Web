<template>
  <section class="home-bento reveal-section">
    <div class="home-bento__header">
      <span class="section-label">What we do</span>
      <h2 class="section-title">
        Crafted digital products,<br />
        <span class="playfair-text">end to end.</span>
      </h2>
    </div>

    <div class="bento-grid">
      <!-- Studio hero -->
      <div class="bento-card bento-card-hero">
        <div class="card-content">
          <div class="hero-chip">
            <Icon icon="mdi:sparkles" :width="12" :height="12" />
            <span>Est. 2024 · Bucharest</span>
          </div>
          <div class="hero-text">
            <h3 class="hero-title">We build products<br />people love to use.</h3>
            <p class="hero-description">
              A senior team with 5+ years each — shipping websites, apps, and full digital products
              without the agency overhead.
            </p>
          </div>
        </div>
        <div class="card-glow" />
      </div>

      <!-- Experience -->
      <div class="bento-card bento-card-stat">
        <div class="card-content">
          <span class="card-label">Experience</span>
          <p class="stat-number">5<span class="stat-plus">+</span></p>
          <p class="stat-label">Years per engineer</p>
          <p class="card-description">Senior-level craft on every engagement.</p>
        </div>
      </div>

      <!-- Services — carousel on mobile, grid on desktop -->
      <div class="bento-services">
        <div class="bento-services__header">
          <span class="card-label">Services</span>
          <span class="bento-services__hint">Swipe</span>
        </div>
        <div ref="carouselRef" class="bento-services__track" @scroll="onCarouselScroll">
          <div
            v-for="service in services"
            :key="service.title"
            class="bento-card bento-card-service"
            :class="`bento-card-service--${service.slug}`"
          >
            <div class="card-content">
              <div class="service-icon" :class="{ 'service-icon--dark': service.featured }">
                <Icon :icon="service.icon" :width="24" :height="24" />
              </div>
              <h3 class="card-title">{{ service.title }}</h3>
              <p class="card-description">{{ service.description }}</p>
            </div>
          </div>
        </div>
        <div class="bento-services__dots">
          <button
            v-for="(_, i) in services"
            :key="i"
            class="dot"
            :class="{ 'is-active': activeSlide === i }"
            :aria-label="`Go to slide ${i + 1}`"
            @click="scrollToSlide(i)"
          />
        </div>
      </div>

      <!-- Stack -->
      <div class="bento-card bento-card-stack">
        <div class="card-content">
          <span class="card-label">Our stack</span>
          <div class="card-tags">
            <span v-for="tag in stack" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <!-- Philosophy -->
      <div class="bento-card bento-card-philosophy">
        <div class="card-content">
          <span class="card-label">Philosophy</span>
          <p class="approach-text">
            No bloat. No endless meetings. Just senior engineers who design, build, and ship.
          </p>
        </div>
      </div>

      <!-- Bottom row -->
      <div class="bento-actions">
        <div class="bento-card bento-card-cta" @click="$emit('openContact')">
          <div class="card-content">
            <Icon icon="mdi:lightning-bolt" class="cta-icon" :width="32" :height="32" />
            <div class="cta-content">
              <span class="cta-text">Start a project</span>
              <Icon icon="mdi:arrow-right" :width="20" :height="20" />
            </div>
          </div>
        </div>

        <div class="bento-card bento-card-availability">
          <div class="card-content">
            <div class="availability-indicator">
              <div class="status-dot" />
              <span class="card-label">Available for Q3</span>
            </div>
            <div class="availability-content">
              <Icon icon="mdi:calendar-check" :width="20" :height="20" />
              <div>
                <p class="availability-title">Taking on new projects</p>
                <p class="availability-subtitle">Typical kickoff within 1–2 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{ openContact: [] }>();

const carouselRef = ref<HTMLElement | null>(null);
const activeSlide = ref(0);

const services = [
  {
    slug: 'product',
    featured: true,
    icon: 'mdi:rocket-launch-outline',
    title: 'Full Product Builds',
    description: 'From zero to launch — strategy, design, development, and deployment.',
  },
  {
    slug: 'web',
    featured: false,
    icon: 'mdi:web',
    title: 'Web Development',
    description: 'Blazing-fast sites with modern frameworks, SEO, and performance baked in.',
  },
  {
    slug: 'design',
    featured: false,
    icon: 'mdi:palette-outline',
    title: 'UX / UI Design',
    description: 'Interfaces that feel intuitive — research, wireframes, and pixel-perfect UI.',
  },
  {
    slug: 'apps',
    featured: false,
    icon: 'mdi:cellphone',
    title: 'App Development',
    description: 'Cross-platform web & mobile apps with robust APIs and real-time features.',
  },
];

const stack = [
  'Vue / Nuxt', 'React / Next.js', 'TypeScript', 'Node.js',
  'PostgreSQL', 'Figma', 'Three.js', 'AWS',
];

const onCarouselScroll = () => {
  const el = carouselRef.value;
  if (!el) return;
  const card = el.querySelector('.bento-card-service') as HTMLElement | null;
  if (!card) return;
  const slideWidth = card.offsetWidth + 12;
  activeSlide.value = Math.min(
    services.length - 1,
    Math.round(el.scrollLeft / slideWidth)
  );
};

const scrollToSlide = (index: number) => {
  const el = carouselRef.value;
  if (!el) return;
  const card = el.querySelector('.bento-card-service') as HTMLElement | null;
  if (!card) return;
  const slideWidth = card.offsetWidth + 12;
  el.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
  activeSlide.value = index;
};
</script>

<style scoped lang="scss">
.home-bento {
  padding: 120px 36px 80px;
  max-width: 1400px;
  margin: 0 auto;

  &__header {
    margin-bottom: 48px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
}

.reveal-section.is-visible .home-bento__header {
  opacity: 1;
  transform: translateY(0);
}

.section-label {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(28, 28, 28, 0.45);
  margin-bottom: 16px;
}

.section-title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1.05;
  color: #1c1c1c;

  .playfair-text {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
  }
}

// ─── Grid (desktop) ───────────────────────────────────
.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(140px, auto);
  gap: 12px;
}

.bento-card {
  border-radius: var(--radius--24px);
  background: #ffffff;
  position: relative;
  overflow: hidden;
  opacity: 0;
  filter: blur(8px);
  transform: translateY(16px);
  transition: box-shadow 0.25s ease;

  &:not(.bento-card-hero):not(.bento-card-cta):hover {
    box-shadow: 0 12px 40px rgba(28, 28, 28, 0.07);
  }
}

.home-bento.reveal-section.is-visible .bento-card {
  animation: cardReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;

  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      animation-delay: #{0.08 + $i * 0.06}s;
    }
  }
}

.home-bento.reveal-section.is-visible .bento-services .bento-card {
  animation-delay: 0.35s;
}

@keyframes cardReveal {
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
}

// Hero
.bento-card-hero {
  grid-column: 1 / 5;
  grid-row: 1 / 3;
  background: #1c1c1c;
  color: #fff;
  padding: 36px 40px;
  min-height: 280px;

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .hero-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    width: fit-content;
    color: #fff;
  }

  .hero-title {
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.1;
    margin: 0 0 12px;
    color: #fff;
  }

  .hero-description {
    font-size: 16px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    max-width: 420px;
  }

  .card-glow {
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(244, 67, 54, 0.35) 0%, transparent 70%);
    bottom: -40px;
    right: -20px;
    pointer-events: none;
  }
}

// Stat
.bento-card-stat {
  grid-column: 5 / 7;
  grid-row: 1 / 2;

  .card-content { padding: 24px; }
  .stat-number {
    font-size: 56px;
    font-weight: 800;
    letter-spacing: -3px;
    color: #1c1c1c;
    line-height: 1;
    margin: 4px 0;
  }
  .stat-plus { color: var(--el-color-orange); }
  .stat-label { font-size: 14px; font-weight: 600; color: #1c1c1c; margin: 0 0 8px; }
}

.bento-card-philosophy { grid-column: 6 / 7; grid-row: 4 / 5; }

// Services wrapper — display:contents so cards join the parent grid
.bento-services {
  display: contents;

  &__header,
  &__hint,
  &__dots {
    display: none;
  }

  &__track {
    display: contents;
  }
}

.bento-card-service--product { grid-column: 5 / 7; grid-row: 2 / 3; }
.bento-card-service--web     { grid-column: 1 / 3; grid-row: 3 / 4; }
.bento-card-service--design  { grid-column: 3 / 5; grid-row: 3 / 4; }
.bento-card-service--apps    { grid-column: 5 / 7; grid-row: 3 / 4; }

// Stack
.bento-card-stack { grid-column: 3 / 6; grid-row: 4 / 5; }

// Actions wrapper
.bento-actions {
  display: contents;
}

.bento-card-cta {
  grid-column: 1 / 4;
  grid-row: 5 / 6;
  cursor: pointer;
  background: var(--el-color-orange) !important;
  color: #fff;
}

.bento-card-availability {
  grid-column: 4 / 7;
  grid-row: 5 / 6;
}

// Shared card styles
.card-content { padding: 24px; display: flex; flex-direction: column; gap: 8px; height: 100%; }

.card-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: rgba(28, 28, 28, 0.45);
}

.card-title { font-size: 18px; font-weight: 700; letter-spacing: -0.3px; color: #1c1c1c; margin: 0; }
.card-description { font-size: 13px; line-height: 1.55; color: rgba(28, 28, 28, 0.65); margin: 0; }

.service-icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(28, 28, 28, 0.05);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
  transition: background 0.25s ease;
  &--dark { background: rgba(244, 67, 54, 0.1); color: var(--el-color-orange); }
}

.bento-card-service:hover .service-icon { background: rgba(28, 28, 28, 0.08); }

.card-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }

.tag {
  padding: 6px 12px; font-size: 12px; font-weight: 500;
  color: #1c1c1c; background: rgba(28, 28, 28, 0.05);
  border-radius: 8px;
}

.approach-text { font-size: 15px; font-weight: 600; line-height: 1.45; color: #1c1c1c; margin: 0; }

.bento-card-cta {
  .card-content { justify-content: space-between; }
  .cta-icon, .cta-text { color: #fff; }
  .cta-content { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
  .cta-text { font-size: 18px; font-weight: 700; }
  transition: filter 0.2s ease;
  &:hover { filter: brightness(1.05); }
}

.availability-indicator {
  display: flex; align-items: center; gap: 8px;
  .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #4caf50; animation: pulse 2s ease-in-out infinite;
  }
}

.availability-content {
  display: flex; gap: 14px; align-items: flex-start; margin-top: 8px;
  .availability-title { font-size: 15px; font-weight: 700; color: #1c1c1c; margin: 0 0 4px; }
  .availability-subtitle { font-size: 13px; color: rgba(28, 28, 28, 0.55); margin: 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

// ─── Tablet ───────────────────────────────────────────
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .bento-card-hero { grid-column: 1 / 3; grid-row: auto; min-height: 240px; }

  .bento-card-stat,
  .bento-card-philosophy {
    grid-column: auto !important;
    grid-row: auto !important;
  }

  .bento-services {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    grid-column: 1 / 3;

    &__header,
    &__hint,
    &__dots { display: none; }

    &__track {
      display: contents;
    }
  }

  .bento-card-service {
    grid-column: auto !important;
    grid-row: auto !important;
  }

  .bento-card-stack { grid-column: 1 / 3; grid-row: auto; }

  .bento-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    grid-column: 1 / 3;
  }

  .bento-card-cta,
  .bento-card-availability {
    grid-column: auto !important;
    grid-row: auto !important;
  }
}

// ─── Mobile ───────────────────────────────────────────
@media (max-width: 768px) {
  .home-bento { padding: 80px 20px 60px; }

  .bento-grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 12px;
  }

  // Reset all desktop grid placement
  .bento-card-hero,
  .bento-card-stat,
  .bento-card-stack,
  .bento-card-philosophy,
  .bento-card-cta,
  .bento-card-availability,
  .bento-card-service {
    grid-column: unset !important;
    grid-row: unset !important;
    min-height: unset;
  }

  .bento-card-hero {
    padding: 28px 24px;
    min-height: auto;
    order: 1;
    width: 100%;
  }

  .bento-card-stat {
    order: 2;
    width: calc(50% - 6px);
  }

  .bento-card-philosophy {
    order: 3;
    width: calc(50% - 6px);

    .approach-text { font-size: 13px; }
  }

  .bento-card-stat .stat-number { font-size: 40px; }

  // Services carousel (mobile only)
  .bento-services {
    display: flex;
    flex-direction: column;
    order: 4;
    gap: 12px;
    width: 100%;
    grid-column: unset;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4px;
    }

    &__hint {
      display: block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(28, 28, 28, 0.35);
    }

    &__track {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      margin: 0 -20px;
      padding: 4px 20px 8px;

      &::-webkit-scrollbar { display: none; }
    }

    &__dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding-top: 4px;

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: none;
        padding: 0;
        background: rgba(28, 28, 28, 0.15);
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;

        &.is-active {
          background: #1c1c1c;
          transform: scale(1.3);
        }
      }
    }

    .bento-card-service {
      flex: 0 0 calc(100% - 48px);
      max-width: 340px;
      scroll-snap-align: center;
      min-height: 200px;
    }
  }

  .bento-card-stack { order: 5; width: 100%; }

  .bento-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    order: 6;
    width: 100%;
    grid-column: unset;
  }
}
</style>
