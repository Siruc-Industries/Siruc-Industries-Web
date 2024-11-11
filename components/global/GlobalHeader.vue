<template>
  <header id="header">
    <NuxtLink id="logo" to="/" href="#default">
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
      <ButtonPrimary>Get a quote</ButtonPrimary>
    </div>
  </header>
</template>

<style scoped lang="scss">
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
      clip-path: inset(0 100% 0 0); /* Start with a hidden line */
      transition: clip-path 0.3s ease; /* Smooth reveal effect */
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
    padding: 20px 10px !important;
  }
  #header a {
    display: block;
    text-align: left;
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

<script>
import { onMounted, onBeforeUnmount } from 'vue';
import { useBreakpoints } from '@/composables/useBreakpoints';

export default {
  setup() {
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

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

    // Return any values to use in template if needed
    return { isMobile, isTablet, isDesktop };
  },
};
</script>
