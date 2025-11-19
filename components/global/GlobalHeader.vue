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
import { ref } from 'vue';

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};
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
  animation: fadeInFromBlack 1s ease-out 0.1s forwards;
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
