<template>
  <div>
    <section class="container section-container">
      <div class="section-body">
        <!-- Main Heading -->
        <h1 class="title">
          We architect digital businesses,<br />
          helping big brands and disruptive start-ups<br />
          win and thrive in the digital world.
        </h1>

        <hr class="devider" />

        <!-- What We Do Section -->
        <div class="content">
          <h3 class="content-subtitle">WHAT WE DO</h3>
          <p class="content-description">
            We define, design and develop world-class web & mobile apps, e-commerces (and much more)
            to unleash the digital potential of our clients - the world's finest brands.
          </p>
        </div>

        <div class="logos">
          <!-- Logos Section -->
          <div class="logos-wrapper">
            <!-- First Row -->
            <div class="logos-row scroll-left">
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
            </div>

            <!-- Second Row -->
            <div class="logos-row scroll-right">
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
            </div>

            <!-- Third Row -->
            <div class="logos-row scroll-left">
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
              <img src="~/assets/icons/logos/fiestro-logo.svg" alt="Fiestro Logo" class="logo" />
              <img src="~/assets/icons/logos/gdm-logo.svg" alt="GDM Logo" class="logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.section {
  &-container {
    padding: 180px 0;
    color: var(--el-color-text);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-body {
    max-width: 684px;
    color: var(--el-color-text);

    .title {
      font-size: 2rem;
      font-weight: 500;
      color: inherit;
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .devider {
      margin: 0;
      border: none;
      height: 1px;
      background-color: var(--el-color-border);
      margin-bottom: 8px;
    }

    .content {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 120px;
      margin-bottom: 5rem;

      &-subtitle {
        font-size: 0.875rem;
        font-weight: 300;
        color: inherit;
      }

      &-description {
        font-size: 0.875rem;
        font-weight: 300;
        color: var(--el-color-border);
      }
    }

    .logos {
      &-wrapper {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }

      &-row {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .logo {
        width: 100px;
        height: 32px;
      }
    }
  }
}
</style>
