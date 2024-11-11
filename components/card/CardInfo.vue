<template>
  <div class="card">
    <p class="index">{{ index }}</p>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <p class="text">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    display: flex;
    background: transparent;
    border: 1px solid var(--el-color-border);
    border-radius: 8px;
    color: var(--el-color-text);
    padding: 20px;
    gap: 16px;
    max-width: 380px;
  }

  .index {
    padding-top: 6px;
  }

  .content {
    .title {
      margin-bottom: 8px;
    }
  }
</style>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>