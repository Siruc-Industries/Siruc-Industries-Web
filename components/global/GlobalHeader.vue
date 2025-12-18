<template>
  <client-only>
    <header id="header">
      <div class="header-container">
        <div class="header-left"></div>
        <NuxtLink id="logo" to="/" class="logo-center">
          <img src="assets/icons/logonew.svg" class="img" alt="Company Logo" />
        </NuxtLink>
        <button class="burger-btn" @click="toggleSidebar">
          <Icon icon="jam:menu" width="28" height="28" />
        </button>
      </div>
    </header>
    <Sidebar :is-open="sidebarOpen" @close="closeSidebar" />
  </client-only>
</template>

<script setup>
import { onMounted } from 'vue';

const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

// Mark animation as complete after it finishes
onMounted(() => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const header = document.getElementById('header');
      if (header) {
        header.classList.add('animation-complete');
      }
    }, 1200); // After animation completes (1s + 0.1s delay + buffer)
  }
});
</script>

<style scoped lang="scss">
#header {
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0;
  height: 76px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
  transform: translateY(0);
  animation: fadeInFromBlack 1s ease-out 0.1s forwards;
}

// After initial animation completes, disable it and use transitions
#header.animation-complete {
  animation: none;
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

// When hidden - use transition
#header.navbar-hidden {
  transform: translateY(-100%) !important;
  opacity: 0 !important;
  pointer-events: none !important;
  animation: none !important;
  transition: transform 0.3s ease, opacity 0.3s ease !important;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
}

.header-left {
  width: 40px; // Same width as burger button for centering
}

.logo-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  text-decoration: none;
  
  .img {
    height: 32px;
  }
}

.burger-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
}

.burger-btn :deep(iconify-icon) {
  color: #000000 !important;
  display: block !important;
  width: 28px !important;
  height: 28px !important;
}

@keyframes fadeInFromBlack {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
