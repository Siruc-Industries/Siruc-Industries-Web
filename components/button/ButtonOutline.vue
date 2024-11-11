<template>
  <el-button class="btn btn-outlined btn-border">
    <span><slot /></span>
  </el-button>
</template>

<style scoped lang="scss">
  .btn {
    &-border {
      border-color: var(--el-color-border);
    }

    &-outlined {
      background: transparent;
    }
  }

  span {
    color: var(--el-color-text);
  }
</style>
