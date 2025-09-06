<template>
  <div v-if="article" class="blog-container">
    <div :class="article.image ? 'image-bg' : ''">
      <h1 class="title">{{ article.title }}</h1>
    </div>
    <img
      v-if="article.image"
      :src="`http://localhost:5000${article.image}`"
      alt="Article image"
      class="card-image"
    />
    <em v-if="article.imageDescription">{{ article.imageDescription }}</em>
    <div v-if="article.tabs" class="row margin">
      <span v-for="(tab, idx) in article.tabs" :key="idx" class="tab">
        {{ tab }}
      </span>
    </div>
    <div v-html="sanitizedContent" class="article-content"></div>
    <div class="margin">
      <p v-if="article.author">Author: {{ article.author }}</p>
      <div class="publish-content">
        <el-icon class="icon-color"><Calendar /></el-icon>
        <p>Published on: {{ article.createdAt }}</p>
      </div>
    </div>
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
.title {
  text-align: center;
  margin: 1rem 0;
}

.blog-container {
  max-width: 636px;
  margin: 0 auto;
  padding: 0 16px;
}

.card-image {
  width: 100%;
  height: 360px;
  object-fit: cover;
}

.publish-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.tab {
  background-color: #00000021;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 400;
  padding: 4px 8px;
  color: var(--el-color-text);
}

.article-content {
  margin: 1rem 0;
}

.article-content :deep(img) {
  max-height: 25rem;
  width: 100%;
  object-fit: fill;
}

.margin {
  margin: 1rem 0;
}
</style>
