<template>
  <section class="home-expertise reveal-section">
    <div class="home-expertise__inner">
      <div class="expertise-bento">
        <div class="expertise-card expertise-card--dark">
          <span class="section-label section-label--light">Expertise</span>
          <h2 class="expertise-title">
            Deep technical<br />
            <span class="playfair-text">know-how.</span>
          </h2>
          <p class="expertise-desc">
            We've shipped products across fintech, e-commerce, SaaS, and internal tools —
            always with the same obsession for craft.
          </p>
        </div>

        <div
          v-for="(item, i) in expertise"
          :key="item.title"
          class="expertise-card"
          :style="{ '--delay': `${0.15 + i * 0.08}s` }"
        >
          <Icon :icon="item.icon" :width="22" :height="22" class="expertise-icon" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>

        <div class="expertise-card expertise-card--wide">
          <span class="card-label">Domains we've built for</span>
          <div class="domain-tags">
            <span v-for="d in domains" :key="d" class="domain-tag">{{ d }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const expertise = [
  { icon: 'mdi:speedometer', title: 'Performance', text: 'Core Web Vitals green. Sub-second loads. Optimized from day one.' },
  { icon: 'mdi:shield-check-outline', title: 'Security', text: 'Auth, encryption, and compliance patterns built into every layer.' },
  { icon: 'mdi:responsive', title: 'Responsive', text: 'Flawless on every screen — mobile-first, accessibility-aware.' },
  { icon: 'mdi:api', title: 'APIs & Integrations', text: 'REST, GraphQL, webhooks, payments, and third-party services.' },
];

const domains = ['Fintech', 'E-commerce', 'SaaS', 'Healthcare', 'EdTech', 'Internal Tools'];
</script>

<style scoped lang="scss">
.home-expertise {
  padding: 100px 36px;
  background: #fbfbfb;

  &__inner { max-width: 1400px; margin: 0 auto; }
}

.expertise-bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.expertise-card {
  background: #ffffff;
  border-radius: var(--radius--24px);
  padding: 28px;
  opacity: 0;
  transform: translateY(16px);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #1c1c1c;
    margin: 12px 0 6px;
    letter-spacing: -0.2px;
  }

  p {
    font-size: 13px;
    line-height: 1.55;
    color: rgba(28, 28, 28, 0.6);
    margin: 0;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(28, 28, 28, 0.07);
  }

  &--dark {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
    background: #1c1c1c;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 320px;

    .expertise-title {
      font-size: clamp(28px, 3vw, 40px);
      font-weight: 800;
      letter-spacing: -1.5px;
      line-height: 1.1;
      color: #fff;
      margin: 12px 0 16px;

      .playfair-text {
        font-family: 'Playfair Display', serif;
        font-style: italic;
      }
    }

    .expertise-desc {
      font-size: 15px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.55);
      margin: 0;
      max-width: 400px;
    }
  }

  &--wide {
    grid-column: 1 / 5;
    grid-row: 3 / 4;
  }

  &:not(.expertise-card--dark):not(.expertise-card--wide) {
    &:nth-child(2) { grid-column: 3; grid-row: 1; }
    &:nth-child(3) { grid-column: 4; grid-row: 1; }
    &:nth-child(4) { grid-column: 3; grid-row: 2; }
    &:nth-child(5) { grid-column: 4; grid-row: 2; }
  }
}

.reveal-section.is-visible .expertise-card {
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(28, 28, 28, 0.45);

  &--light { color: rgba(255, 255, 255, 0.45); }
}

.expertise-icon { color: var(--el-color-orange); }

.card-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: rgba(28, 28, 28, 0.45);
  display: block;
  margin-bottom: 16px;
}

.domain-tags { display: flex; flex-wrap: wrap; gap: 10px; }

.domain-tag {
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  color: #1c1c1c;
  background: rgba(28, 28, 28, 0.04);
  border-radius: 12px;
  transition: all 0.25s ease;
  cursor: default;

  &:hover {
    background: #1c1c1c;
    color: #fff;
    transform: translateY(-2px);
  }
}

@media (max-width: 1024px) {
  .expertise-bento { grid-template-columns: repeat(2, 1fr); }
  .expertise-card--dark { grid-column: 1 / 3 !important; grid-row: auto !important; }
  .expertise-card--wide { grid-column: 1 / 3 !important; }
  .expertise-card:not(.expertise-card--dark):not(.expertise-card--wide) {
    grid-column: auto !important; grid-row: auto !important;
  }
}

@media (max-width: 640px) {
  .home-expertise { padding: 80px 20px; }
  .expertise-bento { grid-template-columns: 1fr; }
  .expertise-card--dark, .expertise-card--wide { grid-column: 1 !important; }
}
</style>
