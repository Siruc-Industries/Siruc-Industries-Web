import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useBreakpoints() {
  const width = ref(window?.innerWidth);

  const onResize = () => {
    width.value = window?.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', onResize);
    console.log('width: ', width.value)
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  const isMobile = computed(() => width.value <= 480);
  const isTablet = computed(() => width.value > 480 && width.value <= 768);
  const isDesktop = computed(() => width.value > 768);

  return { isMobile, isTablet, isDesktop };
}
