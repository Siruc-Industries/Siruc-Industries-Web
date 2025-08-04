<template>
  <div v-if="article" class="blog-container">
    <h1>{{ article.title }}</h1>
    <div v-html="sanitizedContent" class="article-content"></div>
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
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { fetchArticle } from '~/services/api/articles';
import DOMPurify from 'dompurify';
import { ElLoading } from 'element-plus';

const route = useRoute();
const article = ref(null);

const sanitizedContent = computed(() => {
  return article.value?.text ? DOMPurify.sanitize(article.value.text) : '';
});

const loadArticle = async id => {
  const fullScreenLoading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.7)',
  });

  try {
    article.value = await fetchArticle(id);
  } catch (error) {
    console.error('Failed to load article.');
    console.error(error);
  } finally {
    fullScreenLoading.close();
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
