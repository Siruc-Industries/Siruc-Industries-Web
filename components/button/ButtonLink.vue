<template>
  <router-link v-slot="{ navigate }" :to="href" custom>
    <el-button class="btn btn-bg" @click="navigate">
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

<style scoped lang="scss">
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
