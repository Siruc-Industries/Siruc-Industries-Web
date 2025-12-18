<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="isOpen" class="sidebar-backdrop" @click="close"></div>
    </Transition>
    <Transition name="sidebar">
      <aside v-if="isOpen" class="sidebar">
        <div class="sidebar-content">
          <div class="header-row">
            <h2 class="contact-title">Contact Us</h2>
            <button class="close-btn" @click="close">
              <Icon icon="material-symbols:close" :width="24" :height="24" />
            </button>
          </div>
          
          <div class="contact-drawer">
            <p class="contact-intro">
              We're always looking for a challenge.<br />
              Got a project in mind?
            </p>
            
            <hr class="divider" />
            
            <div class="form-fields">
              <div class="form-row">
                <BaseInput
                  id="contact-name"
                  v-model="form.name"
                  placeholder="NAME"
                />
                <BaseInput
                  id="contact-company"
                  v-model="form.company"
                  placeholder="COMPANY"
                />
              </div>
              
              <div class="form-row">
                <BaseInput
                  id="contact-email"
                  v-model="form.email"
                  placeholder="EMAIL"
                />
              </div>
              
              <p class="help-text">How can we help you?</p>
              
              <div class="service-buttons">
                <button
                  v-for="service in services"
                  :key="service"
                  :class="['service-btn', { active: selectedServices.includes(service) }]"
                  @click="toggleService(service)"
                >
                  {{ service }}
                </button>
              </div>
              
              <BaseTextarea
                id="contact-project"
                v-model="form.project"
                placeholder="TELL US ABOUT YOUR PROJECT"
              />
              
              <div v-if="submitError" class="error-message">{{ submitError }}</div>
              <div v-if="submitSuccess" class="success-message">Message sent successfully!</div>
              
              <button 
                class="submit-btn" 
                :disabled="isSubmitting"
                @click="submitForm"
              >
                {{ isSubmitting ? 'SENDING...' : 'SUBMIT A FORM' }}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const form = ref({
  name: '',
  company: '',
  email: '',
  project: '',
});

const services = ['PRODUCT DESIGN', 'BRANDING', 'WEBSITES', 'NO-CODE', 'ENGINEERING'];
const selectedServices = ref<string[]>([]);

const toggleService = (service: string) => {
  const index = selectedServices.value.indexOf(service);
  if (index > -1) {
    selectedServices.value.splice(index, 1);
  } else {
    selectedServices.value.push(service);
  }
};

const isSubmitting = ref(false);
const submitError = ref('');
const submitSuccess = ref(false);

const submitForm = async () => {
  // Basic validation
  if (!form.value.name || !form.value.email) {
    submitError.value = 'Please fill in at least your name and email';
    return;
  }

  isSubmitting.value = true;
  submitError.value = '';
  submitSuccess.value = false;

  try {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        name: form.value.name,
        company: form.value.company,
        email: form.value.email,
        project: form.value.project,
        services: selectedServices.value,
      },
    });

    if ('error' in response && response.error) {
      submitError.value = response.error;
    } else {
      submitSuccess.value = true;
      // Reset form
      form.value = {
        name: '',
        company: '',
        email: '',
        project: '',
      };
      selectedServices.value = [];
      
      // Close drawer after 2 seconds
      setTimeout(() => {
        close();
        submitSuccess.value = false;
      }, 2000);
    }
  } catch (error: any) {
    console.error('Error submitting form:', error);
    submitError.value = 'Failed to send message. Please try again later.';
  } finally {
    isSubmitting.value = false;
  }
};

const close = () => {
  emit('close');
};

// Close on escape key
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && typeof window !== 'undefined') {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }
});

// Prevent body scroll when sidebar is open
watch(() => props.isOpen, (isOpen) => {
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});
</script>

<style scoped lang="scss">
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 600px;
  height: 100vh;
  background-color: #ffffff;
  z-index: 1000;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.sidebar-content {
  padding: 24px;
  height: 100%;
  position: relative;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1c1c1c;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
}

.close-btn :deep(iconify-icon) {
  color: #1c1c1c;
}

.contact-drawer {
  color: #1c1c1c;
}

.contact-title {
  font-size: 32px;
  font-weight: 600;
  color: #1c1c1c;
  margin: 0;
  letter-spacing: -1px;
}

.contact-intro {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.3px;
  line-height: 24px;
  color: #595959;
  margin-bottom: 24px;
}

.divider {
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0 0 24px 0;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 12px;
  
  :deep(.base-input) {
    flex: 1;
    min-width: 0; // Prevents flex items from overflowing
  }
}

// Override input styles for white background
:deep(.base-input__field),
:deep(.base-textarea__field) {
  color: #1c1c1c;
  background-color: #ffffff;
  border-color: #e0e0e0;
  
  &:focus {
    border-color: #1c1c1c;
  }
  
  &::placeholder {
    color: #999999;
    opacity: 1;
  }
}

.help-text {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.3px;
  line-height: 24px;
  color: #595959;
  margin: 8px 0;
  text-transform: uppercase;
}

.service-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.service-btn {
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #1c1c1c;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1c1c1c;
    background-color: #f5f5f5;
  }
  
  &.active {
    background-color: #1c1c1c;
    color: #ffffff;
    border-color: #1c1c1c;
  }
}

.error-message {
  color: #f44336;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: #ffebee;
  border-radius: 4px;
}

.success-message {
  color: #4caf50;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: #e8f5e9;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 14px 24px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #ffffff;
  background-color: var(--el-color-orange);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 8px;
  
  &:hover:not(:disabled) {
    background-color: var(--el-color-orange-hover);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// Sidebar animations
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from {
  transform: translateX(100%);
}

.sidebar-leave-to {
  transform: translateX(100%);
}

// Backdrop animations
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>

