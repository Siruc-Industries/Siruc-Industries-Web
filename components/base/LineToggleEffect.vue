<template>
  <button @click="emitToggle" class="line-toggle-button">|||</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isVerticalLines = ref(true);

onMounted(() => {
  isVerticalLines.value = localStorage.getItem('vertical-lines') === 'true';
  // document.body.classList.toggle('vertical-lines', isVerticalLines.value);
});

const emit = defineEmits(['toggle']);

const emitToggle = () => {
  isVerticalLines.value = !isVerticalLines.value;
  document.body.classList.toggle('vertical-lines', isVerticalLines.value);
  localStorage.setItem('vertical-lines', isVerticalLines.value);
  emit('toggle'); // Emit a toggle event to the parent component
};
</script>

<style scoped>
.line-toggle-button {
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

body.vertical-lines .line-toggle-button {
  background-color: var(--el-color-secondary);
  color: #fff;
}

.line-toggle-button:hover {
  opacity: 0.7;
}
</style>
