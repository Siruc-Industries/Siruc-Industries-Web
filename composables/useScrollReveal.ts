import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollReveal(threshold = 0.15) {
  const elements = ref<HTMLElement[]>([]);
  let observer: IntersectionObserver | null = null;

  const register = (el: HTMLElement | null) => {
    if (el && !elements.value.includes(el)) {
      elements.value.push(el);
      observer?.observe(el);
    }
  };

  onMounted(() => {
    if (typeof window === 'undefined') return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    elements.value.forEach((el) => observer?.observe(el));
  });

  onUnmounted(() => {
    observer?.disconnect();
    observer = null;
  });

  return { register };
}
