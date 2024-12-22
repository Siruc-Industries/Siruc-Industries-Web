<template>
  <router-link v-slot="{ navigate }" :to="href" custom>
    <el-button
      :class="[
        'btn',
        type === 'primary' ? 'orange-bg orange-border' : 'basic-bg basic-border basic-text',
      ]"
      @click="navigate"
    >
      <span>{{ text }}</span>
      <img
        v-if="straightArrow"
        src="assets/icons/arrow-up.svg"
        class="icon icon-simple"
        alt="Link Arrow"
      />
      <img
        v-if="circledArrow"
        src="assets/icons/arrow-in-circle.svg"
        class="icon icon-in-circle"
        alt="Link Arrow"
      />
    </el-button>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  href: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'basic' | 'primary'>,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  straightArrow: {
    type: Boolean,
    default: false,
  },
  circledArrow: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.btn {
  padding: 12px 20px !important;
}

.orange {
  &-bg {
    background-color: var(--el-color-orange);

    &:hover {
      background-color: var(--el-color-orange-hover);
    }
  }
  &-border {
    border-color: var(--el-color-orange);
  }
}

.basic {
  &-bg {
    background-color: var(--el-color-link);
    border-color: var(--el-color-link);
  }
}

span {
  color: var(--el-color-text);
}

.icon {
  width: 24px;
  height: 24px;
  &-simple {
    transform: rotate(45deg);
  }

  &-in-circle {
    margin-left: 6px;
  }
}
</style>
