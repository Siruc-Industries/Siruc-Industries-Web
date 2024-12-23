<template>
  <div class="container spacing">
    <div class="container-heading">
      <div class="content">
        <h1 class="title">Our Projects</h1>
        <p class="text">Explore and learn more about some of our recently delivered projects</p>
      </div>
    </div>
    <div class="card-container">
      <div v-for="(card, idx) in cards" :key="idx">
        <CardPicture
          title="Random title - Complete Application Design & Development"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam architecto est aliquam harum mollitia blanditiis obcaecati eum maiores in nostrum!"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
]);
</script>

<style scoped lang="scss">
.container-heading {
  width: 100%;
  color: var(--el-color-text);
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .title {
      font-size: 2rem;
      font-weight: 500;
      color: inherit;
      text-align: center;
      margin-bottom: 1rem;
    }

    .text {
      font-size: 1rem;
      font-weight: 500;
      color: inherit;
      margin-bottom: 2.5rem;
      max-width: 322px;
    }
  }
}
</style>
