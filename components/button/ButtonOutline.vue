<template>
  <el-button class="btn btn-outlined btn-border">
    <span><slot /></span>
  </el-button>
</template>

<style scoped lang="scss">
  .btn {
    height: var(--button-height) !important;
    padding: var(--button-padding) !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: -0.1px !important;
    border-radius: var(--button-corner-radius) !important;
    display: flex !important;
    align-items: center !important;
    gap: var(--button-gap) !important;
    
    &-border {
      border: none !important;
    }

    &-outlined {
      background: transparent !important;
    }
  }

  span {
    color: #838993 !important;
  }
  
  .btn:hover {
    background-color: rgba(255, 255, 255, 0.05) !important;
    
    span {
      color: white !important;
    }
  }
</style>
