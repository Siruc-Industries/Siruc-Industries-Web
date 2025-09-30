<template>
  <div class="global-container" data-scroll-container>
    <GlobalHeader />
    <main class="main-container">
      <div class="index-wrapper">
        <NuxtPage />
      </div>
    </main>
    <!-- <aside class="aside">
      <LineToggleEffect @toggle="toggleLines" />
      <BaseThemeSwitcher />
    </aside>
    <div id="grid-overlay" class="grid-overlay">
      <div v-for="n in 7" :key="n" class="line"></div>
    </div> -->
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
  /* removed aside buttons */
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

/* grid overlay disabled */

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

/* grid overlay animations removed */
</style>

<script setup lang="ts">
// import LineToggleEffect from '~/components/base/LineToggleEffect.vue';
import { ref, nextTick, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

// const isVerticalLines = ref(false);

let locoScroll: any = null;

function initLoco() {
  if (typeof window === 'undefined' || !window.LocomotiveScroll) return;
  const container = document.querySelector('[data-scroll-container]') as HTMLElement | null;
  if (!container) return;
  locoScroll = new window.LocomotiveScroll({
    el: container,
    smooth: true,
    multiplier: 0.7,
    lerp: 0.02,
    class: 'is-revealed',
    scrollbarContainer: false,
    touchMultiplier: 2,
    smoothMobile: false,
    smartphone: { smooth: false },
    tablet: { smooth: false }
  });
}

onMounted(async () => {
  // vertical lines disabled
  await nextTick();
  initLoco();
});

onBeforeUnmount(() => {
  if (locoScroll) {
    try { locoScroll.destroy(); } catch {}
    locoScroll = null;
  }
});

const router = useRouter();
router.afterEach(async () => {
  await nextTick();
  if (locoScroll) {
    try { locoScroll.destroy(); } catch {}
    locoScroll = null;
  }
  initLoco();
});

/* const toggleLines = () => {
  // Animated version, delayed for now...
  // const lines = document.querySelectorAll('.line');
  // lines.forEach((line, index) => {
  //   setTimeout(() => {
  //     line.classList.toggle(isVerticalLines.value ? 'disappear' : 'appear');
  //   }, index * 100); // Stagger the animation timing
  // });
}; */
</script>
