<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">{{ label }}</label>
    <input
      :id="id"
      ref="inputField"
      v-bind="inputAttrs"
      v-model="model"
      class="base-input__field"
    />
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const inputField = ref<HTMLInputElement | null>(null);

const model = defineModel();

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
});

const inputAttrs = {
  type: 'text',
  placeholder: props?.placeholder,
};

// Expose the focus method to parent components
defineExpose({
  focus: () => {
    inputField.value?.focus();
  },
});
</script>

<style scoped lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__label {
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--el-color-border);
  }

  &__field {
    padding: 0.75rem;
    color: var(--el-color-text);
    font-weight: 300;
    letter-spacing: 1px;
    border: 1px solid var(--el-color-input-border);
    border-radius: 8px;
    background-color: var(--el-color-input-bg);
    outline: none;
  }

  &__field:focus {
    border-color: var(--el-color-border);
  }

  &__error {
    font-size: 0.75rem;
    color: #f44336;
  }
}
</style>
