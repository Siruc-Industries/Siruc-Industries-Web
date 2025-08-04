<template>
  <client-only>
    <header v-if="isMobile" id="mobileHeader">
      <NuxtLink id="logo" to="/">
        <img src="assets/icons/logo.svg" class="img" alt="Company Logo" />
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
      <NuxtLink id="logo" to="/">
        <img src="assets/icons/logo.svg" class="img" alt="Company Logo" />
        <h1 v-if="isDesktop" class="text">Siruć<br />Industries</h1>
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
  .img {
    height: 38px;
    width: 38px;
  }
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
  padding: 0 36px;
  transition: 0.2s;
  position: fixed;
  height: 76px;
  width: 100%;
  top: 0;
  z-index: 99;
  border-bottom: 1px solid var(--el-color-line);
}

#header.blurred {
  background: rgba(44, 44, 46, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--el-color-line);
}

.scrolled-down {
  height: 68px !important;
}

#logo {
  color: inherit;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 5px;
  position: absolute;
  left: 30px;

  .img {
    height: 38px;
    width: 38px;
    margin-right: 6px;
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
  height: 100%;
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  a {
    color: inherit;
    display: flex;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 16px;
    position: relative;

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
      background-color: #ddd;
      color: black;
    }
  }
}

#btns {
  display: flex;
  padding: 5px;
  position: absolute;
  right: 30px;
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
</style>
