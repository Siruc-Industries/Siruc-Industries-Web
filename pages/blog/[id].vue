<template>
  <div class="blog-container">
    <h1>{{ article.title }}</h1>
    <p>{{ article.text }}</p>
    <img
      v-if="article.image"
      :src="`http://localhost:5000${article.image}`"
      alt="Article image"
      class="card-image"
    />
    <p>Written by: {{ article.author }}</p>
    <p>Published on: {{ article.createdAt }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchArticle } from '~/services/api/articles';

const route = useRoute();
const article = ref({});

const loadArticle = async id => {
  try {
    article.value = await fetchArticle(id);
  } catch (error) {
    console.error('Failed to load article.');
    console.error(error);
  }
};

onMounted(() => {
  const id = route.params.id;
  loadArticle(id);
});
</script>

<style scoped lang="scss">
.blog-container {
  max-width: 636px;
  margin: 0 auto;
}
.card-image {
  width: 100%;
  height: 360px;
  object-fit: cover;
}
</style>
