<template>
  <div v-if="project" class="project-container">
    <div :class="project.image ? 'image-bg' : ''">
      <h1 class="title">{{ project.title }}</h1>
    </div>
    <img
      v-if="project.image"
      :src="`http://localhost:5000${project.image}`"
      alt="Project image"
      class="card-image"
    />
    <em v-if="project.imageDescription">{{ project.imageDescription }}</em>
    <div v-if="project.tabs" class="row margin">
      <span v-for="(tab, idx) in project.tabs" :key="idx" class="tab">
        {{ tab }}
      </span>
    </div>
    <div v-html="sanitizedContent" class="project-content"></div>
    <div class="margin">
      <p v-if="project.author">Author: {{ project.author }}</p>
      <div class="publish-content">
        <el-icon class="icon-color"><Calendar /></el-icon>
        <p>Published on: {{ project.createdAt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProject } from '~/services/api/projects';
import DOMPurify from 'dompurify';
import { ElLoading } from 'element-plus';

const route = useRoute();
const project = ref(null);

const sanitizedContent = computed(() => {
  return project.value?.text ? DOMPurify.sanitize(project.value.text) : '';
});

const loadProject = async id => {
  const fullScreenLoading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.7)',
  });

  try {
    project.value = await fetchProject(id);
  } catch (error) {
    console.error('Failed to load project.');
    console.error(error);
  } finally {
    fullScreenLoading.close();
  }
};

onMounted(() => {
  const id = route.params.id;
  loadProject(id);
});
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  margin: 1rem 0;
}

.project-container {
  max-width: 636px;
  margin: 0 auto;
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

.project-content {
  margin: 1rem 0;
}

.project-content :deep(img) {
  max-height: 25rem;
  width: 100%;
  object-fit: fill;
}

.margin {
  margin: 1rem 0;
}
</style>
