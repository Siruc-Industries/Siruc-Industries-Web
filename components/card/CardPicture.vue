<template>
  <div class="card">
    <div class="img-holder">
      <img class="card-img" src="~/assets/imgs/placeholder.png" />
    </div>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <p class="text">{{ text }}</p>
    </div>
    <div>
      <Button href="/blog" :circledArrow="true" text="Learn More" />
    </div>
  </div>
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
    margin-bottom: 8px;
    line-height: 25px;
    font-weight: 300;
  }
  .text {
    line-height: 20px;
    font-weight: 300;
  }
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
