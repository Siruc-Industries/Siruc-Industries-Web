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
    <GlobalFooter v-if="!isHomepage()" />
  </div>
</template>

<style scoped lang="scss">
.global-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* On homepage, allow natural scrolling */
.global-container:has(.homepage-container) {
  height: auto;
  min-height: 100vh;
}

.main-container {
  width: 100%;
  padding-top: 0;
  display: flex;
  flex-grow: 1;
  z-index: 1 !important;
}

.index-wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
}

// On homepage, make sure main container doesn't add extra space
.main-container:has(.homepage-container) {
  height: auto;
  overflow: hidden;
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
import { ref, nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// const isVerticalLines = ref(false);

const router = useRouter();
const route = useRoute();
let locoScroll: any = null;

const isHomepage = () => {
  return route.path === '/' || route.path === '/index';
};

function initLoco() {
  if (typeof window === 'undefined' || !window.LocomotiveScroll) return;
  // Don't initialize Locomotive Scroll on homepage (uses native scroll snap)
  if (isHomepage()) return;
  
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
  // Destroy any existing Locomotive Scroll instance first
  if (locoScroll) {
    try { locoScroll.destroy(); } catch {}
    locoScroll = null;
  }
  
  // Remove Locomotive Scroll classes on homepage
  if (isHomepage() && typeof window !== 'undefined') {
    document.documentElement.classList.remove('has-scroll-smooth', 'has-scroll-dragging');
    document.body.classList.remove('has-scroll-smooth');
    document.documentElement.style.scrollSnapType = '';
    document.body.style.overflowY = 'auto';
  }
  
  // Only initialize if not on homepage
  if (!isHomepage()) {
    initLoco();
  }
});

onBeforeUnmount(() => {
  if (locoScroll) {
    try { locoScroll.destroy(); } catch {}
    locoScroll = null;
  }
});

router.afterEach(async () => {
  await nextTick();
  // Destroy existing instance
  if (locoScroll) {
    try { locoScroll.destroy(); } catch {}
    locoScroll = null;
  }
  
  // Remove Locomotive Scroll classes on homepage
  if (isHomepage() && typeof window !== 'undefined') {
    document.documentElement.classList.remove('has-scroll-smooth', 'has-scroll-dragging');
    document.body.classList.remove('has-scroll-smooth');
    document.documentElement.style.scrollSnapType = '';
    document.body.style.overflowY = 'auto';
  }
  
  // Only initialize if not on homepage
  if (!isHomepage()) {
    initLoco();
  }
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
