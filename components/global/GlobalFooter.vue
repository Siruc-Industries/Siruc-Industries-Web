<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-body">
        <NuxtLink id="logo" to="/">
          <img src="assets/icons/logo.svg" class="img" alt="Company Logo" />
          <h1 class="text">Siruć<br />Industries</h1>
        </NuxtLink>
        <div class="contact-block">
          <h4 class="title">Contact us</h4>
          <p class="text">hello@sirucindustries.com</p>
        </div>
        <div class="contact-block">
          <h4 class="title">Contact us</h4>
          <p class="text">hello@sirucindustries.com</p>
        </div>
        <div class="button-block">
          <button class="jump-up" @click="scrollToTop">
            <img src="assets/icons/arrow-up-light.svg" class="icon icon-simple" alt="Up" />
          </button>
        </div>
        <div class="navigation">
          <NuxtLink to="/services" active-class="active" class="link"> Services </NuxtLink>
          <span>/</span>
          <NuxtLink to="/projects" active-class="active" class="link"> Projects </NuxtLink>
          <span>/</span>
          <NuxtLink to="/company" active-class="active" class="link"> Company </NuxtLink>
          <span>/</span>
          <NuxtLink to="/about-us" active-class="active" class="link"> About us </NuxtLink>
          <span>/</span>
          <NuxtLink to="/blog" active-class="active" class="link"> Blog </NuxtLink>
        </div>
        <div class="contact-block">
          <h4 class="title">Our socials</h4>
          <div class="links-block">
            <a href="http://www.linkedin.com/" target="_blank">
              <img src="assets/icons/linked-in.svg" class="icon icon-simple" alt="linked-in" />
            </a>
            <a href="https://www.behance.net/" target="_blank">
              <img src="assets/icons/behance.svg" class="icon icon-simple" alt="behance" />
            </a>
          </div>
        </div>
        <div></div>
        <div class="rights-block">
          <span>© 2025 Siruc Industries.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const scrollToTop = () => {
  const duration = 600;
  const startPosition = window.scrollY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    const currentScroll = startPosition * (1 - easedProgress);

    window.scrollTo(0, currentScroll);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};
</script>
<style scoped lang="scss">
.footer {
  background-color: var(--el-color-bg);
  border-top: 1px solid var(--el-color-line);

  &-container {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 32px;
  }

  &-body {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-content: space-between;
    width: 100%;
    row-gap: 56px;
    font-size: 14px;
    padding-left: 5px;

    .button-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .jump-up {
      width: 40px;
      height: 40px;
      border: none;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      background-color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;

      img {
        width: 36px;
        height: 32px;
        transition: all 0.3s ease;
      }

      &:hover {
        background-color: var(--el-color-orange);
        box-shadow: 0 0px 4px rgba(250, 250, 250, 0.5);
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .contact-block {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .title {
        font-weight: 300;
        text-transform: uppercase;
        color: var(--el-color-subtext);
      }

      .text {
        font-weight: 400;
        font-size: 16px;
        color: var(--el-color-text);
      }

      .links-block {
        display: flex;
        gap: 8px;

        img {
          width: 18px;
        }
      }
    }

    .navigation {
      display: grid;
      grid-template-columns: repeat(6, auto);
      grid-auto-flow: row;
      gap: 26px;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

    .navigation .link {
      text-decoration: none;
      font-size: 16px;
      font-weight: 300;

      &.active {
        color: var(--el-color-orange);
      }
    }

    .navigation span {
      font-size: 16px;
      color: var(--el-color-subtext);
    }

    .rights-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      span {
        font-weight: 300;
        color: var(--el-color-text) !important;
      }
    }
  }

  &-project {
    &-name {
      letter-spacing: 2px;
      color: var(--el-color-text);
    }
  }

  #logo {
    display: flex;
    align-items: center;
    text-align: center;
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
}
</style>
