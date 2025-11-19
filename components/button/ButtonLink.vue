<template>
  <a v-if="isExternal" :href="href">
    <el-button
      :class="[
        'btn',
        type === 'primary' ? 'primary-btn' : 'basic-btn',
        variant === 'hero' ? 'hero-btn' : '',
      ]"
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
      <Icon
        v-if="iconifyIcon"
        :icon="iconifyIcon"
        :width="24"
        :height="24"
        class="icon iconify-icon"
      />
    </el-button>
  </a>
  <router-link v-else v-slot="{ navigate }" :to="href" custom>
    <el-button
      :class="[
        'btn',
        type === 'primary' ? 'primary-btn' : 'basic-btn',
        variant === 'hero' ? 'hero-btn' : '',
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
      <Icon
        v-if="iconifyIcon"
        :icon="iconifyIcon"
        :width="24"
        :height="24"
        class="icon iconify-icon"
      />
    </el-button>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'basic' | 'primary'>,
    default: 'basic',
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
  iconifyIcon: {
    type: String,
    default: '',
  },
  variant: {
    type: String as PropType<'default' | 'hero'>,
    default: 'default',
  },
});

const isExternal = computed(() => props.href.startsWith('mailto:') || props.href.startsWith('http') || props.href.startsWith('tel:'));
</script>

<style scoped lang="scss">
:deep(.el-button) {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

// Default button styles
:deep(.primary-btn) {
  background-color: var(--el-color-orange) !important;
  border-color: var(--el-color-orange) !important;
  color: var(--el-color-text) !important;
  
  &:hover {
    background-color: var(--el-color-orange-hover) !important;
    border-color: var(--el-color-orange-hover) !important;
  }
}

:deep(.basic-btn) {
  background-color: var(--el-color-link) !important;
  border-color: var(--el-color-link) !important;
  color: var(--el-color-text) !important;
}

// Hero button variant - larger, rounded, dark theme
// Higher specificity to override Element Plus primary button styles
:deep(.el-button.hero-btn),
:deep(.el-button.primary-btn.hero-btn),
:deep(.el-button.btn.hero-btn) {
  background-color: #000000 !important;
  border-color: #000000 !important;
  color: white !important;
  padding: 22px 44px !important;
  font-size: 18px !important;
  border-radius: 24px !important;
  height: auto !important;
  gap: 12px !important;
  font-weight: 500 !important;
  min-height: auto !important;
  
  span {
    color: white !important;
  }
  
  .icon {
    display: none !important;
  }
  
  .iconify-icon {
    display: inline-block !important;
    color: white !important;
    width: 24px !important;
    height: 24px !important;
    
    :deep(.iconify) {
      width: 100%;
      height: 100%;
    }
  }
  
  &:hover,
  &:focus,
  &:active {
    background-color: #1a1a1a !important;
    border-color: #1a1a1a !important;
    color: white !important;
  }
}

// Default button sizes (when not hero variant)
:deep(.btn:not(.hero-btn)) {
  height: var(--button-height);
  padding: var(--button-padding);
  font-size: var(--button-font-size);
  border-radius: var(--button-corner-radius);
  gap: var(--button-gap);
}

:deep(span) {
  color: inherit;
}

:deep(.icon) {
  width: var(--button-icon-size);
  height: var(--button-icon-size);
}

:deep(.icon-simple) {
  transform: rotate(45deg);
}

:deep(.icon-in-circle) {
  margin-left: 4px;
}

:deep(.icon.iconify-icon) {
  width: 24px;
  height: 24px;
  color: currentColor;
  display: inline-block;
  
  .iconify {
    width: 100%;
    height: 100%;
  }
}

// Show iconify icon when it's provided and not hero variant
:deep(.btn:not(.hero-btn) .iconify-icon) {
  display: inline-block;
}
</style>

