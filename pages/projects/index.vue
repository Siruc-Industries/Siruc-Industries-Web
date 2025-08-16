<template>
  <div class="container spacing">
    <div class="container-heading">
      <div class="content">
        <h1 class="title">Our Projects</h1>
        <p class="text">Explore and learn more about some of our recently delivered projects</p>
      </div>
    </div>
    <div class="card-container">
      <div v-for="(project, idx) in projects" :key="idx">
        <CardPicture
          :id="project.id"
          :title="project.title"
          :text="project.text"
          :tabs="project.tabs ? project.tabs : []"
          :image="project.image"
          :createdAt="project.createdAt"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElLoading, ElMessage } from 'element-plus';
import { fetchProjects } from '~/services/api/projects';

const projects = ref([]);

const loadProjects = async () => {
  const fullScreenLoading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.7)',
  });

  try {
    projects.value = await fetchProjects();
  } catch (error) {
    ElMessage({
      message: 'Failed to load blog projects',
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
  loadProjects();
});
// const cards = ref([
//   { index: 1, title: 'Design', text: 'Description for Design, Lorem ipsum dolor sit amet.' },
//   {
//     index: 2,
//     title: 'Development',
//     text: 'Description for Development, Lorem ipsum dolor sit amet.',
//   },
//   {
//     index: 3,
//     title: 'Marketing',
//     text: 'Description for Marketing, Lorem ipsum dolor sit amet.',
//   },
// ]);
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
