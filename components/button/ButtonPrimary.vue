<template>
    <el-button type="primary" class="btn orange-bg orange-border">
        <slot />
    </el-button>
</template>

<style scoped lang="scss">
  .orange {
    &-bg {
      background-color: var(--el-color-orange);
    }
    &-border {
      border-color: var(--el-color-orange);;
    }
  }
</style>
  