<template>
  <div class="container spacing">
    <div class="container-heading">
      <div class="content">
        <h1 class="title">Software Technologies Blog</h1>
        <p class="text">
          Learn about established patterns and the latest innovations in software development
        </p>
      </div>
    </div>
    <div v-loading="isLoading" class="card-container">
      <div v-for="(article, index) in articles" :key="index">
        <CardBlog
          :id="article.id"
          :key="article.id"
          :tabs="article.tabs ? article.tabs : []"
          :index="index + 1"
          :image="article.image"
          :title="article.title"
          :createdAt="article.createdAt"
        />
      </div>
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
