<template>
  <div class="global-container">
    <GlobalHeader />
    <main class="main-container">
      <div class="index-wrapper">
        <NuxtPage />
      </div>
    </main>
    <aside class="aside">
      <LineToggleEffect @toggle="toggleLines" />
      <BaseThemeSwitcher />
    </aside>
    <div id="grid-overlay" class="grid-overlay">
      <div v-for="n in 7" :key="n" class="line"></div>
    </div>
    <GlobalFooter />
  </div>
</template>

<style scoped lang="scss">
.global-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  width: 100%;
  padding-top: 80px;
  display: flex;
  flex-grow: 1;
  z-index: 1 !important;
}

.index-wrapper {
  width: 100%;
}

.aside {
  position: fixed;
  bottom: 12px;
  left: 36px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;
}

.grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: none;
  grid-template-columns: repeat(7, 1fr);
  pointer-events: none;
  padding: 0 var(--app-padding);
  z-index: -100;
}

body.vertical-lines {
  .grid-overlay {
    display: grid;
  }
}

.line {
  display: inherit;
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: var(--el-color-line);
  // transform: translateY(-100%); /* Start off-screen */
  animation-fill-mode: forwards;
  opacity: 1;
}

// .line.appear {
//   animation: slideDown 0.5s forwards;
// }

// .line.disappear {
//   animation: slideUp 0.5s forwards;
// }

/* Position lines horizontally across the screen */
.line:nth-child(1) {
  left: 5%;
}
.line:nth-child(2) {
  left: 20%;
}
.line:nth-child(3) {
  left: 35%;
}
.line:nth-child(4) {
  left: 50%;
}
.line:nth-child(5) {
  left: 65%;
}
.line:nth-child(6) {
  left: 80%;
}
.line:nth-child(7) {
  left: 95%;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>

<script setup lang="ts">
import LineToggleEffect from '~/components/base/LineToggleEffect.vue';
import { ref } from 'vue';

const isVerticalLines = ref(false);

onMounted(() => {
  isVerticalLines.value = localStorage.getItem('vertical-lines') === 'true';
  document.body.classList.toggle('vertical-lines', isVerticalLines.value);
});

const toggleLines = () => {
  // Animated version, delayed for now...
  // const lines = document.querySelectorAll('.line');
  // lines.forEach((line, index) => {
  //   setTimeout(() => {
  //     line.classList.toggle(isVerticalLines.value ? 'disappear' : 'appear');
  //   }, index * 100); // Stagger the animation timing
  // });

  const linesGrid = document.getElementById('grid-overlay');
  linesGrid?.classList.toggle('disappear');
  // Toggle the state after triggering animations
  isVerticalLines.value = !isVerticalLines.value;
};
</script>
