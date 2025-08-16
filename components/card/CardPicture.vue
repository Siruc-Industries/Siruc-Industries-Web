<template>
  <NuxtLink :to="`/projects/${id}`">
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
        <div class="title-container">
          <h2 class="title">{{ title }}</h2>
        </div>
        <div class="info-container">
          <div class="row">
            <span v-for="(tab, idx) in tabs" :key="idx" :class="['tab', idx === 0 ? 'main' : '']">
              {{ tab }}
            </span>
          </div>
          <p class="date">{{ formattedDate }}</p>
        </div>
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
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  height: 100%;
}

.img-holder {
  height: 360px;
  max-width: inherit;
  overflow: hidden;
}

.card-img {
  height: 360px;
  max-height: 360px;
  width: 100%;
  border-radius: 8px;
  max-width: -webkit-fill-available;
  max-width: -moz-available; /* Firefox-specific */
  object-fit: cover;
  transition: transform 0.3s ease;
}

.date {
  color: var(--el-color-secondary);
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
  padding: 12px 16px;
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
    line-height: 2rem;
    font-weight: 500;
    font-size: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease; /* Smooth text color transition */
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

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
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
  tabs: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

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
