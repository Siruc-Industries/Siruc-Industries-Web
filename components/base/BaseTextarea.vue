<template>
  <div class="base-textarea">
    <label v-if="label" :for="id" class="base-textarea__label">{{ label }}</label>
    <textarea
      :id="id"
      ref="textareaField"
      v-bind="textareaAttrs"
      v-model="model"
      class="base-textarea__field"
    ></textarea>
    <span v-if="error" class="base-textarea__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const textareaField = ref<HTMLTextAreaElement | null>(null);

const model = defineModel({
  type: null,
});

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

const textareaAttrs = {
  type: 'text',
  placeholder: props?.placeholder,
};

// Expose the focus method to parent components
defineExpose({
  focus: () => {
    textareaField.value?.focus();
  },
});
</script>

<style scoped lang="scss">
.base-textarea {
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
    border-radius: 4px;
    background-color: var(--el-color-input-bg);
    outline: none;
    resize: none;
    min-height: 120px;
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
