<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="isOpen" class="sidebar-backdrop" @click="close"></div>
    </Transition>
    <Transition name="sidebar">
      <aside v-if="isOpen" class="sidebar">
        <div class="sidebar-content">
          <button class="close-btn" @click="close">
            <Icon icon="material-symbols:close" :width="24" :height="24" />
          </button>
          <nav class="sidebar-nav">
            <NuxtLink to="/services" class="nav-link" @click="close">Services</NuxtLink>
            <NuxtLink to="/projects" class="nav-link" @click="close">Projects</NuxtLink>
            <NuxtLink to="/company" class="nav-link" @click="close">Company</NuxtLink>
            <NuxtLink to="/about-us" class="nav-link" @click="close">About us</NuxtLink>
            <NuxtLink to="/blog" class="nav-link" @click="close">Blog</NuxtLink>
          </nav>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const close = () => {
  emit('close');
};

// Close on escape key
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && typeof window !== 'undefined') {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }
});

// Prevent body scroll when sidebar is open
watch(() => props.isOpen, (isOpen) => {
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});
</script>

<style scoped lang="scss">
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: #ffffff;
  z-index: 1000;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.sidebar-content {
  padding: 24px;
  height: 100%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1c1c1c;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
}

.close-btn :deep(iconify-icon) {
  color: #1c1c1c;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 60px;
}

.nav-link {
  padding: 16px 0;
  font-size: 18px;
  font-weight: 500;
  color: #1c1c1c;
  text-decoration: none;
  border-bottom: 1px solid rgba(28, 28, 28, 0.1);
  transition: color 0.2s ease;
  
  &:hover {
    color: #595959;
  }
  
  &.router-link-active {
    color: #000000;
    font-weight: 600;
  }
}

// Sidebar animations
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from {
  transform: translateX(100%);
}

.sidebar-leave-to {
  transform: translateX(100%);
}

// Backdrop animations
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>

