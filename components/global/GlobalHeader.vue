<template>
  <header id="header">
    <a href="#default" id="logo">
      <img src="assets/icons/logo.svg" class="img" alt="Company Logo" />
      <h1 v-if="isDesktop" class="text">Siruć<br />Industries</h1>
    </a>
    <nav id="navbar">
      <a class="active" href="#services">Services</a>
      <a href="#projects">Projects</a>
      <a href="#company">Company</a>

      <a href="#blog">Blog</a>
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

  a {
    color: inherit;
    display: flex;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 8px;
  }

  a:hover {
    background-color: #ddd;
    color: black;
  }

  #header a.active {
    background-color: dodgerblue;
    color: white;
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
