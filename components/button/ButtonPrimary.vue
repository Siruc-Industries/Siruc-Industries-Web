<template>
  <el-button
    type="primary"
    :class="[
      'btn',
      type === 'primary' ? 'orange-bg orange-border' : 'basic-bg basic-border basic-text',
    ]"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  type: {
    type: String as PropType<'basic' | 'primary'>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.orange {
  &-bg {
    background-color: var(--el-color-orange);
  }
  &-border {
    border-color: var(--el-color-orange);
  }
}

.basic {
  &-bg {
    background-color: var(--el-color-text);
  }
  &-border {
    border-color: var(--el-color-text);
  }
  &-text {
    color: var(--el-color-bg);
  }
}
</style>
