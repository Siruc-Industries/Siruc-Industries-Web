export const useSidebar = () => {
  const sidebarOpen = useState('sidebarOpen', () => false);

  const openSidebar = () => {
    sidebarOpen.value = true;
  };

  const closeSidebar = () => {
    sidebarOpen.value = false;
  };

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  return {
    sidebarOpen: readonly(sidebarOpen),
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };
};

