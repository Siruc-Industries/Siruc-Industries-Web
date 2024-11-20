<template>
  <div class="index-wrapper">
    <section class="container section-container">
      <div class="section-body">
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
        <ButtonLink text="Get a quote" :circled="true" href="/"></ButtonLink>
      </div>
    </section>
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
    <div class="container card-container">
      <CardPicture
        :key="1"
        title="Random title - Complete Application Design & Development"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam architecto est aliquam harum mollitia blanditiis obcaecati eum maiores in nostrum!"
      />
    </div>
    <div class="connect-container">
      <div class="connect-body container">
        <div class="pointer hover-underline" @click="scrollToContact">
          <h3>Let's talk about your project!</h3>
          <img src="assets/icons/arrow-right.svg" class="arrow-img" alt="Arrow right" />
        </div>
      </div>
    </div>
    <div ref="contactContainer" class="contact-container">
      <div class="contact-body container">...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CardInfo from '@/components/card/CardInfo.vue';
import CardPicture from '@/components/card/CardPicture.vue';

const list = ['visionary', 'motivated', 'efficient', 'your'];
const currentIndex = ref(0);
const currentWord = computed(() => list[currentIndex.value]);
console.log(currentWord.value);

function scrollToContact() {
  console.log('fires');
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

.index-wrapper {
  width: 100%;
}

.connect {
  &-container {
    background-color: #222224;
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
    h3 {
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

.section {
  &-container {
    padding: 280px 0;
    color: var(--el-color-text);
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

.classifier {
  font-style: italic;
  font-weight: 500;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns */
  gap: 20px;
  padding: 16px 0;
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
</style>
