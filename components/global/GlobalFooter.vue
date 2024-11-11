<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-body">
        <p class="footer-project-name">App Footer</p>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.footer {
  background-color: var(--el-color-bg);
  border-top: 1px solid var(--el-color-line);

  &-container {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 32px;
  }

  &-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  &-project {
    &-name {
      letter-spacing: 2px;
      color: var(--el-color-text);
    }
  }
}
</style>
