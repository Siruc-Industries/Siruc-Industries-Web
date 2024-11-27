<template>
  <NuxtLink :to="`/blog/${id}`">
    <div class="card">
      <div class="img-holder">
        <img
          v-if="image"
          :src="`http://localhost:5000${image}`"
          alt="Article image"
          class="card-img"
        />
        <img v-else class="card-img" src="~/assets/imgs/placeholder.png" />
      </div>
      <div class="content">
        <div class="info-container">
          <div class="row">
            <span v-for="(tab, idx) in labs" :key="idx" class="tab">
              {{ tab }}
            </span>
          </div>
          <p class="date">{{ formattedDate }}</p>
        </div>
        <div class="title-container">
          <h2 class="title">{{ title }}</h2>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  background: var(--el-color-bg);
  border-radius: 8px;
  color: var(--el-color-text);
  max-width: 380px;
  box-shadow: 0 0 20px #0006;
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  height: 100%;
}

.img-holder {
  height: 240px;
  overflow: hidden;
  max-width: inherit;
}

.card-img {
  max-height: 240px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card:hover {
  box-shadow: 0 0 25px #0009; /* Enhances hover shadow effect */

  .card-img {
    transform: scale(1.1); /* Scales image on hover */
  }

  .title {
    color: var(--el-color-orange); /* Change to your desired hover color */
  }
}

.content {
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 16px;

  .info-container {
    display: flex;
    justify-content: space-between;

    .date {
      color: var(--el-color-secondary);
    }

    .row {
      display: flex;
      flex-direction: row;
      gap: 12px;
    }

    .tab {
      background-color: #00000021;
      border-radius: 30px;
      font-size: 11px;
      font-weight: 400;
      padding: 4px 8px;
    }
  }

  .title {
    // line-height: 25px;
    font-size: 18px;
    font-weight: 300;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease; /* Smooth text color transition */
  }
}
</style>

<script setup>
import { computed, defineProps, ref } from 'vue';

// Define props for the component
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const labs = ref(['Tab 1', 'Tab 2']);

const formattedDate = computed(() => {
  if (!props.createdAt) return '---';
  const date = new Date(props.createdAt);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
});
</script>
