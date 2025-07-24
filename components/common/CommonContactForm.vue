<template>
  <div class="contact-us-container">
    <!-- Left Section -->
    <div class="contact-us-info">
      <h2>Contact Us</h2>
      <ul class="contact-points">
        <li>
          <img class="check-img" src="~/assets/icons/check.svg" />
          <p>Request a demo</p>
        </li>
        <li>
          <img class="check-img" src="~/assets/icons/check.svg" />
          <p>Get a free consultation</p>
        </li>
        <li>
          <img class="check-img" src="~/assets/icons/check.svg" />
          <p>Learn about our methods</p>
        </li>
      </ul>
      <div class="resume">
        <p class="resume-text">Wanna work with us?</p>
        <a class="resume-link" @click="focusFullName">Send us your resume »</a>
      </div>
    </div>

    <!-- Right Section (Form) -->
    <div class="contact-form">
      <h2 class="title">Tell us how we can help</h2>
      <hr class="devider" />
      <div class="contact-form-wrapper">
        <BaseInput
          id="full-name"
          ref="fullNameInput"
          v-model="form.fullName"
          label="Full Name"
          placeholder="John Doe"
        />
        <BaseInput
          id="email"
          v-model="form.email"
          label="Work Email"
          placeholder="john.doe@yourdomain.com"
        />
        <BaseInput
          id="company-size"
          v-model="form.companySize"
          label="Company Size"
          placeholder="1-50"
        />
        <BaseTextarea
          id="help-message"
          v-model="form.message"
          label="How can we help?"
          placeholder="I am interested in..."
        />
      </div>
      <button class="submit-button" @click="submitForm">Send Message</button>
      <p class="alternate-contact">
        You can also email us at
        <a href="mailto:hello@sirucindustries.pl">hello@sirucindustries.pl</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  fullName: '',
  email: '',
  companySize: '',
  message: '',
});

const fullNameInput = ref<HTMLInputElement | null>(null);

const focusFullName = () => {
  // Focus the "Full Name" input
  fullNameInput.value?.focus();
};

const formErrors = ref({
  email: '',
});

const validateForm = () => {
  let isValid = true;
  if (!form.value.email.includes('@')) {
    formErrors.value.email = 'Invalid email address';
    isValid = false;
  } else {
    formErrors.value.email = '';
  }
  return isValid;
};

const submitForm = () => {
  if (validateForm()) {
    console.log('Form submitted:', form.value);
  }
};
</script>

<style scoped lang="scss">
.contact-us-container {
  display: flex;
  justify-content: space-between;
  padding: 6rem 0;
  background-color: transparent;
  color: var(--el-color-text);

  .contact-us-info {
    flex: 1;
    margin-right: 2rem;

    h2 {
      font-size: 2.25rem;
      font-weight: 500;
      margin-bottom: 2.5rem;
    }

    .contact-points {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        flex-direction: row;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        position: relative;
      }
    }

    .resume {
      &-text {
        margin-top: 2.5rem;
        margin-bottom: 0.5rem;
      }

      &-link {
        color: var(--el-color-subtext);
        text-decoration: none;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .contact-form {
    flex: 1;
    max-width: 500px;
    background-color: var(--el-color-bg);
    border: 1px solid var(--el-color-input-border);
    border-radius: 8px;
    padding: 1rem;

    .title {
      font-size: 1.5rem;
      color: var(--el-color-text);
      padding-bottom: 0.5rem;
    }

    .devider {
      margin: 0;
      border: none;
      height: 2px;
      background-color: var(--el-color-input-border);
      margin-bottom: 1.5rem;
    }

    &-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .submit-button {
      display: block;
      width: 100%;
      padding: 0.75rem;
      background-color: var(--el-color-orange);
      border: none;
      border-radius: 4px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;

      &:hover {
        background-color: var(--el-color-orange-hover);
      }
    }

    .alternate-contact {
      margin-top: 1rem;
      font-size: 0.875rem;
      font-weight: 300;
      color: var(--el-color-border);

      a {
        text-decoration: none;
        color: var(--el-color-border);

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
