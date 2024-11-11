<template>
  <router-link :to="href" custom v-slot="{ navigate }">
    <el-button class="btn btn-bg" @click="navigate">
      <span>{{ text }}</span>
      <img
        v-if="straight"
        src="assets/icons/arrow-up.svg"
        class="icon icon-simple"
        alt="Link Arrow"
      />
      <img
        v-if="circled"
        src="assets/icons/arrow-in-circle.svg"
        class="icon icon-in-circle"
        alt="Link Arrow"
      />
    </el-button>
  </router-link>
</template>

<style scoped lang="scss">
.test-btn {
  padding: 14px 20px;
  background-color: var(--el-color-link);
  border-radius: 8px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.test-text {
  color: var(--el-color-text);
}

.btn {
  padding: 12px 20px !important;
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

<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  straight: {
    type: Boolean,
    default: false,
  },
  circled: {
    type: Boolean,
    default: false,
  },
});
</script>
