<template>
  <div class="home-marquee" aria-hidden="true">
    <div class="home-marquee__track">
      <div v-for="n in 2" :key="n" class="home-marquee__content">
        <span v-for="item in items" :key="`${n}-${item}`" class="marquee-item">
          <span class="marquee-dot" />
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  'Web Development', 'UX Design', 'UI Design', 'Mobile Apps',
  'SaaS Products', 'E-commerce', 'Three.js', 'API Design',
  'Cloud Infrastructure', 'Performance', 'Branding', 'Prototyping',
];
</script>

<style scoped lang="scss">
.home-marquee {
  padding: 28px 0;
  background: #1c1c1c;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &__track {
    display: flex;
    width: max-content;
    animation: marquee 35s linear infinite;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 48px;
    padding-right: 48px;
  }
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: 48px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  text-transform: uppercase;
}

.marquee-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--el-color-orange);
  flex-shrink: 0;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
