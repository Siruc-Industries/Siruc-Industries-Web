<template>
  <section class="home-contact reveal-section">
    <div class="home-contact__inner">
      <div class="home-contact__content">
        <span class="section-label">Let's build</span>
        <h2 class="contact-title">
          Ready to ship<br />
          <span class="playfair-text">something great?</span>
        </h2>
        <p class="contact-desc">
          Tell us about your project. We'll get back within 24 hours with a clear plan
          and honest timeline — no sales pitch, no fluff.
        </p>
        <button class="contact-btn" @click="$emit('openContact')">
          <span>Get in touch</span>
          <Icon icon="line-md:arrow-right" :width="22" :height="22" />
        </button>
      </div>

      <div class="home-contact__stats">
        <div v-for="(stat, i) in stats" :key="stat.label" class="stat-block" :style="{ '--delay': `${i * 0.1}s` }">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <footer class="home-footer">
      <span>© {{ year }} Siruć Industries</span>
      <span class="footer-tag">Crafted with precision</span>
    </footer>
  </section>
</template>

<script setup lang="ts">
defineEmits<{ openContact: [] }>();

const year = new Date().getFullYear();

const stats = [
  { value: '5+', label: 'Years per engineer' },
  { value: '100%', label: 'Senior-led delivery' },
  { value: '2–4wk', label: 'Typical MVP timeline' },
];
</script>

<style scoped lang="scss">
.home-contact {
  padding: 120px 36px 0;
  background: #ffffff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(244, 67, 54, 0.06) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    pointer-events: none;
  }

  &__inner {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 80px;
    align-items: end;
    padding-bottom: 80px;
  }

  &__content {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }

  &__stats {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
}

.reveal-section.is-visible .home-contact__content {
  opacity: 1;
  transform: translateY(0);
}

.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(28, 28, 28, 0.45);
  display: block;
  margin-bottom: 20px;
}

.contact-title {
  font-size: clamp(40px, 5.5vw, 72px);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
  color: #1c1c1c;
  margin-bottom: 24px;

  .playfair-text {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
  }
}

.contact-desc {
  font-size: 17px;
  line-height: 1.6;
  color: rgba(28, 28, 28, 0.6);
  max-width: 480px;
  margin-bottom: 36px;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: #1c1c1c;
  color: #fff;
  border: none;
  border-radius: 28px;
  padding: 22px 40px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #2a2a2a;
    box-shadow: 0 12px 40px rgba(28, 28, 28, 0.2);
  }
}

.stat-block {
  padding: 24px 0;
  border-bottom: 1px solid rgba(28, 28, 28, 0.08);
  opacity: 0;
  transform: translateX(20px);

  &:last-child { border-bottom: none; }
}

.reveal-section.is-visible .stat-block {
  animation: slideIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes slideIn {
  to { opacity: 1; transform: translateX(0); }
}

.stat-value {
  display: block;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -2px;
  color: #1c1c1c;
  line-height: 1;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 14px;
  color: rgba(28, 28, 28, 0.5);
  font-weight: 500;
}

.home-footer {
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 0 40px;
  border-top: 1px solid rgba(28, 28, 28, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: rgba(28, 28, 28, 0.45);
}

.footer-tag {
  font-style: italic;
  font-family: 'Playfair Display', serif;
}

@media (max-width: 900px) {
  .home-contact__inner { grid-template-columns: 1fr; gap: 48px; }
  .home-contact { padding: 80px 20px 0; }
  .home-footer { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
