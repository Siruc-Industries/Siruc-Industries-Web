<template>
  <div class="container">
    <h1>Blog goes here</h1>
    <div class="card-container">
      <CardBlog
        v-for="(article, index) in articles"
        :id="article.id"
        :key="article.id"
        :index="index + 1"
        :image="article.image"
        :title="article.title"
        :createdAt="article.createdAt"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CardBlog from '~/components/card/CardBlog.vue';
import { fetchArticles } from '~/services/api/articles';

const articles = ref([]);

const loadArticles = async () => {
  try {
    articles.value = await fetchArticles();
  } catch (error) {
    console.error('Failed to load articles.');
    console.error(error);
  }
};

onMounted(() => {
  loadArticles();
});
</script>

<style></style>
