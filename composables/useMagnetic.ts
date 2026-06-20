import { ref, onMounted, onUnmounted } from 'vue';

export function useMagnetic(strength = 0.35) {
  const elRef = ref<HTMLElement | null>(null);

  const onMove = (e: MouseEvent) => {
    const el = elRef.value;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = elRef.value;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  onMounted(() => {
    const el = elRef.value;
    if (!el) return;
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });

  onUnmounted(() => {
    const el = elRef.value;
    if (!el) return;
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  });

  return { elRef };
}
