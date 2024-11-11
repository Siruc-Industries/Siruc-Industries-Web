<template>
  <div>
    <section class="section-container">
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
    <h2 class="welcome-message">Welcome to Siruć Industries</h2>
    <div class="card-container">
      <CardInfo
        v-for="(card, idx) in cards"
        :key="idx"
        :index="card.index"
        :title="card.title"
        :text="card.text"
      />
    </div>
    <div class="card-container">
      <CardPicture
        :key="1"
        title="Random title - Complete Application Design & Development"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam architecto est aliquam harum mollitia blanditiis obcaecati eum maiores in nostrum!"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CardInfo from '@/components/card/CardInfo.vue';
import CardPicture from '@/components/card/CardPicture.vue';

const list = ['visionary', 'motivated', 'efficient', 'your'];
const currentIndex = ref(0);

const currentWord = computed(() => list[currentIndex.value]);
console.log(currentWord.value);

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
