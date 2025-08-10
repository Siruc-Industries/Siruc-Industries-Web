<template>
  <div>
    <section class="hero-section">
      <div class="hero-background">
        <spline-viewer url="https://prod.spline.design/u1pq0QlF82PQYHu2/scene.splinecode"></spline-viewer>
      </div>
      <div class="hero-content">
        <h1 class="greeting-title">
          Bespoke software <br />
          solutions for <br />
          <span id="classifier" class="classifier">
            {{ currentWord }}
          </span>
          brands.
        </h1>
        <p class="greeting-text">
          We specialize in delivering high-quality, custom software solutions that elevate your
          brand's digital presence. From beautifully designed websites to powerful applications, our
          team is dedicated to crafting technology that's as refined as it is reliable.
        </p>
        <div @click="scrollToContact">
          <ButtonLink text="Get a quote" type="primary" :circledArrow="true" href="/"> </ButtonLink>
        </div>
      </div>
    </section>
    <div class="welcome-wrapper">
      <h2 class="container welcome-title">
        Comprehensive Digital Solutions <br />
        for <span class="subtext">Every Ambition</span>
      </h2>
      <div class="container card-container">
        <CardLink
          :id="1"
          :title="'Software Stuff Augmentaion'"
          text="We scale your team with essential personnel your development team needs."
        ></CardLink>
        <CardLink
          :id="1"
          :title="'Software Stuff Augmentaion'"
          text="We scale your team with essential personnel your development team needs."
        ></CardLink>
        <CardLink
          :id="1"
          :title="'Software Stuff Augmentaion'"
          text="We scale your team with essential personnel your development team needs."
        ></CardLink>
      </div>
    </div>

    <div class="connect-container">
      <div class="connect-body container">
        <div class="pointer hover-underline" @click="scrollToContact">
          <h3 class="invite">Let's talk about your project!</h3>
          <img src="assets/icons/arrow-right.svg" class="arrow-img" alt="Arrow right" />
        </div>
      </div>
    </div>

    <h2 class="container welcome-message">Welcome to Siruć Industries</h2>
    <div class="container card-container">
      <CardInfo
        v-for="(card, idx) in cards"
        :key="idx"
        :index="card.index"
        :title="card.title"
        :text="card.text"
      />
    </div>

    <div ref="contactContainer" class="contact-container">
      <div class="contact-body container">
        <CommonContactForm></CommonContactForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CardInfo from '@/components/card/CardInfo.vue';

const list = ['visionary', 'motivated', 'efficient', 'your'];
const currentIndex = ref(0);
const contactContainer = ref(null);
const currentWord = computed(() => list[currentIndex.value]);
console.log(currentWord.value);

function scrollToContact() {
  if (contactContainer.value) {
    contactContainer.value.scrollIntoView({
      behavior: 'smooth', // Smooth scrolling animation
      block: 'start', // Align to the top of the container
    });
  }
}

// const updateWord = () => {
//   currentIndex.value = (currentIndex.value + 1) % list.length;
// };
// let interval;
// onMounted(() => {
//   interval = setInterval(updateWord, 2000);
// });
// onUnmounted(() => {
//   clearInterval(interval);
// });

const cards = ref([
  { index: 1, title: 'Design', text: 'Description for Design, Lorem ipsum dolor sit amet.' },
  {
    index: 2,
    title: 'Development',
    text: 'Description for Development, Lorem ipsum dolor sit amet.',
  },
  {
    index: 3,
    title: 'Marketing',
    text: 'Description for Marketing, Lorem ipsum dolor sit amet.',
  },
  { index: 4, title: 'SEO', text: 'Description for SEO, Lorem ipsum dolor sit amet.' },
  {
    index: 5,
    title: 'Content Creation',
    text: 'Description for Content Creation, Lorem ipsum dolor sit amet.',
  },
  {
    index: 6,
    title: 'Support',
    text: 'Description for Support, Lorem ipsum dolor sit amet.',
  },
]);
</script>

<style scoped lang="scss">
iframe {
  border: none;
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 10;
  pointer-events: all;
}

.connect {
  &-container {
    background-color: #222224;
    margin-bottom: 160px;
  }
  &-body {
    padding: 72px 0;
    .pointer {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .pointer:hover {
      .arrow-img {
        transform: scale(1.3);
      }
    }
    .invite {
      font-size: 32px;
    }
    .arrow-img {
      margin-left: 16px;
      width: 28px;
      height: 28px;
      transition: all 0.2s linear;
    }
  }
}

.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  spline-viewer {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  z-index: 2;
  max-width: 596px;
  padding: 40px;
  
  .greeting {
    &-title {
      font-size: 64px;
      margin-bottom: 24px;
      line-height: 76px;
      position: relative;
      color: white;
    }
    &-text {
      line-height: 20px;
      margin-bottom: 24px;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.section {
  &-container {
    padding: 280px 0;
    color: var(--el-color-text);
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  &-body {
    max-width: 596px;
    .greeting {
      &-title {
        font-size: 64px;
        margin-bottom: 24px;
        line-height: 76px;
        position: relative;
      }
      &-text {
        line-height: 20px;
        margin-bottom: 24px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .hero-content {
    max-width: 100%;
    padding: 30px;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 20px;
    
    .greeting-title {
      font-size: 48px;
      line-height: 56px;
    }
  }
}

.classifier {
  font-style: italic;
  font-weight: 500;
}

@media (max-width: 768px) {
  /* For smaller screens, adjust to two columns */
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  /* For very small screens, adjust to one column */
  .card-container {
    grid-template-columns: 1fr;
  }
}

.welcome-message {
  font-size: 32px;
  color: var(--el-color-text);
}

.welcome-wrapper {
  padding: 0 0 160px 0;
}

.welcome-title {
  font-size: 36px;
  color: var(--el-color-text);
  text-align: center;
  font-weight: 500;
  padding-bottom: 24px;

  .subtext {
    color: var(--el-color-orange);
    font-weight: 500;
  }
}
</style>
