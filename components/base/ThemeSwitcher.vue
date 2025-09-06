<template>
  <button class="theme-switcher" @click="toggleTheme">
    <img v-if="isDarkMode" src="assets/icons/dark-mode.svg" class="img" alt="Dark Mode" />
    <img v-else src="assets/icons/light-mode.svg" class="img" alt="Light Mode" />
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDarkMode = ref(true);

// Check local storage to apply saved theme on page load
onMounted(() => {
  isDarkMode.value = localStorage.getItem('dark-mode') === 'true';
  document.body.classList.toggle('dark-mode', isDarkMode.value);
});

// Toggle the theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  localStorage.setItem('dark-mode', isDarkMode.value);
};
</script>

<style scoped>
.theme-switcher {
  position: relative;
  width: 40px;
  height: 40px;
  background-color: var(--el-color-secondary);
  border: none;
  border-radius: 100%;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
}

body.dark-mode .theme-switcher {
  background-color: var(--el-color-secondary);
  color: #fff;
}

.theme-switcher:hover {
  opacity: 0.7;
}
</style>
