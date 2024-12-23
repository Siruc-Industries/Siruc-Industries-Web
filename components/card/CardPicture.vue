<template>
  <NuxtLink :to="`/blog/${id}`">
    <div class="card">
      <div class="img-holder">
        <img class="card-img" src="~/assets/imgs/placeholder.png" />
      </div>
      <div class="content">
        <h2 class="title">{{ title }}</h2>
        <div class="info-container">
          <div class="row">
            <span v-for="(tab, idx) in tabs" :key="idx" :class="['tab', idx === 0 ? 'main' : '']">
              {{ tab }}
            </span>
          </div>
        </div>
        <p class="text">{{ text }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 8px;
  color: var(--el-color-text);
  max-width: 380px;
}

.img-holder {
  max-width: inherit;
  margin-bottom: 12px;
}

.card-img {
  border-radius: 8px;
  max-width: -webkit-fill-available;
  max-width: -moz-available; /* Firefox-specific */
}

.content {
  margin-bottom: 12px;
  .title {
    margin-bottom: 12px;
    line-height: 2rem;
    font-weight: 500;
  }
  .text {
    line-height: 21px;
    font-size: 0.875rem;
    font-weight: 300;
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-bottom: 12px;
  }

  .tab {
    background-color: #00000021;
    border-radius: 30px;
    font-size: 11px;
    font-weight: 400;
    padding: 4px 8px;
  }

  .tab.main {
    background-color: #622f31;
  }
}
</style>

<script setup lang="ts">
const tabs = ref(['lorem ipsum', 'lorem ipsum', 'lorem ipsum']);

defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>
