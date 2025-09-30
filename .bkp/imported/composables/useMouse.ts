export const useMouseEdgeDetection = (edgeThreshold = 10, delay = 600) => {
  const { app } = useStore();
  const isMouseAtLeftEdge = ref(false);
  let canReactivate = true;
  const checkMousePosition = (event: MouseEvent) => {
    if (event.clientX <= edgeThreshold && canReactivate) {
      isMouseAtLeftEdge.value = true;
      app.isMenuOpen = true;
    }
  };
  watch(() => app.isMenuOpen, (v) => {
    if (!v) {
      canReactivate = false;
      setTimeout(() => {
        canReactivate = true;
      }, delay);
    }
  });
  onMounted(() => {
    window.addEventListener('mousemove', checkMousePosition);
  });
  onUnmounted(() => {
    window.removeEventListener('mousemove', checkMousePosition);
  });
  return { isMouseAtLeftEdge };
};
