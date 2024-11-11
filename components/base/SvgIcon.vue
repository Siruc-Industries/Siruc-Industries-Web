<template>
  <svg aria-hidden="true" class="svg-icon" :stroke="stroke">
    <use :href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  stroke: {
    type: String,
    required: false,
  },
});

const symbolId = computed(() => `#${props?.name}`);
console.log(symbolId.value);
</script>

<style lang="scss">
.svg-icon {
  width: 16px !important;
  height: 16px !important;
  display: flex;
  width: inherit;
  height: inherit;
}
</style>
