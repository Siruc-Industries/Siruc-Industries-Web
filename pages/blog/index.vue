<template>
  <div class="container spacing">
    <h1>Blog goes here</h1>
    <div v-loading="isLoading" class="card-container">
      <CardBlog
        v-for="(article, index) in articles"
        :id="article.id"
        :key="article.id"
        :tabs="article.tabs ? article.tabs : ['Tab 1', 'Tab 2']"
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
import { ElLoading, ElMessage } from 'element-plus';

const articles = ref([]);

const loadArticles = async () => {
  const fullScreenLoading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.7)',
  });

  try {
    articles.value = await fetchArticles();
  } catch (error) {
    ElMessage({
      message: 'Failed to load blog articles',
      type: 'error',
      plain: true,
      showClose: true,
      grouping: true,
    });
    console.error('Failed to load articles.');
    console.error(error);
  } finally {
    fullScreenLoading.close();
  }
};

onMounted(() => {
  loadArticles();
});
</script>

<style></style>
