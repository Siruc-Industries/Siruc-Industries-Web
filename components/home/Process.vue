<template>
  <section class="home-process reveal-section">
    <div class="home-process__inner">
      <div class="home-process__header">
        <span class="section-label">How we work</span>
        <h2 class="section-title">
          A process built for<br />
          <span class="playfair-text">speed & quality.</span>
        </h2>
      </div>

      <div class="process-grid">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="process-card"
          :style="{ '--delay': `${i * 0.1}s` }"
        >
          <span class="process-index">0{{ i + 1 }}</span>
          <div class="process-icon">
            <Icon :icon="step.icon" :width="28" :height="28" />
          </div>
          <h3 class="process-title">{{ step.title }}</h3>
          <p class="process-desc">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    icon: 'mdi:magnify-scan',
    title: 'Discover',
    description: 'We dig into your goals, users, and constraints — mapping the shortest path to impact.',
  },
  {
    icon: 'mdi:vector-polyline-edit',
    title: 'Design',
    description: 'Wireframes to high-fidelity UI. Every screen tested for clarity before a line of code.',
  },
  {
    icon: 'mdi:code-braces',
    title: 'Develop',
    description: 'Clean, typed, tested code. Weekly demos so you always know where things stand.',
  },
  {
    icon: 'mdi:rocket-launch',
    title: 'Deliver',
    description: 'Launch, monitor, iterate. We stay until the product performs in the real world.',
  },
];
</script>

<style scoped lang="scss">
.home-process {
  padding: 100px 36px;
  background: #ffffff;

  &__inner {
    max-width: 1400px;
    margin: 0 auto;
  }

  &__header {
    margin-bottom: 56px;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
  }
}

.reveal-section.is-visible .home-process__header {
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
  font-size: clamp(32px, 4.5vw, 52px);
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

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.process-card {
  background: #fbfbfb;
  border-radius: var(--radius--24px);
  padding: 32px 28px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--el-color-orange), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(28, 28, 28, 0.06);
    &::before { transform: scaleX(1); }
    .process-icon { transform: scale(1.1); background: #1c1c1c; color: #fff; }
  }
}

.reveal-section.is-visible .process-card {
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

.process-index {
  font-size: 12px;
  font-weight: 700;
  color: var(--el-color-orange);
  letter-spacing: 1px;
  margin-bottom: 20px;
  display: block;
}

.process-icon {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: rgba(28, 28, 28, 0.06);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  transition: all 0.35s ease;
  color: #1c1c1c;
}

.process-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: #1c1c1c;
  margin: 0 0 10px;
}

.process-desc {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(28, 28, 28, 0.6);
  margin: 0;
}

@media (max-width: 1024px) {
  .process-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .home-process { padding: 80px 20px; }
  .process-grid { grid-template-columns: 1fr; }
}
</style>
