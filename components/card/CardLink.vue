<template>
  <div class="card">
    <img src="~/assets/icons/space.svg" alt="saturn image" class="card-img" />
    <div class="content">
      <div class="title-container">
        <h2 class="title">{{ title }}</h2>
      </div>
      <p class="text">
        {{ text }}
      </p>
      <Button href="/services" :circledArrow="true" text="Learn More"></Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  background: var(--el-color-bg);
  border-radius: 8px;
  border: 1px solid var(--el-color-input-border);
  color: var(--el-color-text);
  max-width: 380px;
  box-shadow: 0 0 20px #0006;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  padding: 42px 20px;
  height: 100%;
}

.card-img {
  height: 62px;
  width: 62px;
  margin-bottom: 40px;
}

.card:hover {
  box-shadow: 0 0 25px #0009; /* Enhances hover shadow effect */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .title {
    // line-height: 25px;
    font-size: 18px;
    font-weight: 300;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease; /* Smooth text color transition */
    margin-bottom: 24px;
  }

  .text {
    margin-bottom: 40px;
  }
}
</style>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});
</script>
