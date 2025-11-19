<template>
  <ClientOnly>
    <span
      v-if="icon"
      ref="iconElement"
      class="iconify"
      :data-icon="icon"
      :style="{
        width: (width || 24) + 'px',
        height: (height || 24) + 'px',
        display: 'inline-block',
        color: 'currentColor',
        verticalAlign: 'middle',
      }"
    ></span>
    <template #fallback>
      <span
        :style="{
          width: (width || 24) + 'px',
          height: (height || 24) + 'px',
          display: 'inline-block',
        }"
      ></span>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps<{
  icon: string;
  width?: number | string;
  height?: number | string;
}>();

const iconElement = ref<HTMLElement | null>(null);

const scanIcon = () => {
  if (typeof window === 'undefined' || !iconElement.value) return;
  
  const Iconify = (window as any).Iconify;
  if (!Iconify) return;
  
  nextTick(() => {
    if (Iconify.scan) {
      Iconify.scan(iconElement.value);
    }
  });
};

onMounted(() => {
  if (typeof window === 'undefined') return;
  
  const Iconify = (window as any).Iconify;
  if (Iconify) {
    scanIcon();
  } else {
    const checkInterval = setInterval(() => {
      if ((window as any).Iconify) {
        clearInterval(checkInterval);
        scanIcon();
      }
    }, 100);
    
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 5000);
  }
});

watch(() => props.icon, () => {
  scanIcon();
});

watch(() => [props.width, props.height], () => {
  scanIcon();
});
</script>

<style scoped lang="scss">
.iconify {
  display: inline-block;
  vertical-align: middle;
  
  :deep(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>

