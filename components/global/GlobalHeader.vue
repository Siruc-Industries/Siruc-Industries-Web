<template>
  <client-only>
    <header v-if="isMobile" id="mobileHeader">
      <NuxtLink id="logo" to="/">
        <img src="assets/icons/logonew.svg" class="img" alt="Company Logo" />
      </NuxtLink>
      <button class="burger" @click="drawerVisible = true">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect y="6" width="32" height="4" rx="2" />
          <rect y="14" width="32" height="4" rx="2" />
          <rect y="22" width="32" height="4" rx="2" />
        </svg>
      </button>
      <el-drawer
        v-model="drawerVisible"
        direction="rtl"
        size="80vw"
        :with-header="false"
        custom-class="mobile-drawer"
      >
        <div class="drawer-content">
          <button class="drawer-close" @click="drawerVisible = false">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" stroke-width="3" />
              <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" stroke-width="3" />
            </svg>
          </button>
          <NuxtLink to="/services" class="drawer-link" @click="drawerVisible = false">
            Services
          </NuxtLink>
          <NuxtLink to="/projects" class="drawer-link" @click="drawerVisible = false">
            Projects
          </NuxtLink>
          <NuxtLink to="/company" class="drawer-link" @click="drawerVisible = false">
            Company
          </NuxtLink>
          <NuxtLink to="/blog" class="drawer-link" @click="drawerVisible = false">Blog</NuxtLink>
        </div>
      </el-drawer>
    </header>
    <header v-else id="header">
      <div class="header-container">
        <NuxtLink id="logo" to="/">
          <img src="assets/icons/logonew.svg" class="img" alt="Company Logo" />
        </NuxtLink>
        <nav id="navbar">
          <NuxtLink to="/services" active-class="active"> Services </NuxtLink>
          <NuxtLink to="/projects" active-class="active"> Projects </NuxtLink>
          <NuxtLink to="/company" active-class="active"> Company </NuxtLink>
          <NuxtLink to="/blog" active-class="active"> Blog </NuxtLink>
        </nav>
        <div id="btns">
          <ButtonOutline>Contact</ButtonOutline>
          <ButtonPrimary type="basic">Get a quote</ButtonPrimary>
        </div>
      </div>
    </header>
  </client-only>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useBreakpoints } from '@/composables/useBreakpoints';
import { ElDrawer } from 'element-plus';

const { isMobile, isDesktop } = useBreakpoints();
const drawerVisible = ref(false);
console.log(isMobile.value);

const scrollFunction = () => {
  const header = document.getElementById('header');
  if (header) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      header.classList.add('scrolled-down', 'blurred');
    } else {
      header.classList.remove('scrolled-down', 'blurred');
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', scrollFunction);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollFunction);
});
</script>

<style scoped lang="scss">
#mobileHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--el-color-bg);
  color: var(--el-color-text);
  padding: 0 16px;
  height: 56px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--el-color-line);
}
#mobileHeader #logo {
  display: flex;
  align-items: center;
}
.burger {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.el-drawer {
  background: var(--el-color-bg);
  color: var(--el-color-text);
  padding: 0;

  &__body {
    background: var(--el-color-bg);
  }
  .drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 24px 16px 0 16px;
    position: relative;
  }
  .drawer-close {
    background: none;
    border: none;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    z-index: 10;
  }
  .drawer-link {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 18px 0;
    border-bottom: 1px solid var(--el-color-line);
    color: var(--el-color-text);
    text-decoration: none;
    transition: background 0.2s;
    &:hover {
      background: var(--el-color-secondary);
    }
  }
}

#header {
  display: flex;
  align-items: center;
  overflow: hidden;
  background: transparent;
  color: var(--el-color-text) !important;
  padding: 0;
  transition: 0.2s;
  position: fixed;
  height: 76px;
  width: 100%;
  top: 0;
  z-index: 99;
  border-bottom: 1px solid rgba(131, 137, 147, 0.1);
  opacity: 0;
  animation: fadeInFromBlack 1s ease-out 0.1s forwards;
}

.header-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 36px;
  height: 100%;
}

#header.blurred {
  background: rgba(44, 44, 46, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(131, 137, 147, 0.1);
}

.scrolled-down {
  height: 68px !important;
}

#logo {
  color: inherit;
  display: flex;
  align-items: center;
  text-align: center;
  .img {
    height: 29px;
  }

  .text {
    color: inherit;
    display: inline-block;
    text-align: start;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 22px;
    font-weight: 300;
  }
}

#navbar {
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  a {
    color: #838993;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.1px;
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    padding: 0 16px;
    position: relative;
    border-radius: 6px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0; /* Position it at the bottom of the link */
      height: 4px; /* Thickness of the underline */
      background-color: var(--el-color-orange);
      clip-path: inset(0 100% 0 0);
      transition: clip-path 0.3s ease;
    }

    &.active::after {
      clip-path: inset(0 0 0 0); /* Reveal the underline when active */
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      color: white;
    }
  }
}

#btns {
  display: flex;
  padding: 5px;
  gap: 4px;
}

@media screen and (max-width: 580px) {
  #header {
    display: none;
  }
}

@media screen and (max-width: 1560px) {
  #header {
    justify-content: center;
  }
  #navbar {
    width: auto;
    max-width: fit-content;
    margin: 0;
  }
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
