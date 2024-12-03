<template>
  <!-- Root container with dynamic RTL/LTR direction -->
  <div v-bind:dir="canvasContainer.semitic">
    <EditorVue />

    <!-- Loading overlay modal -->
    <vue-final-modal
      v-model="stats.isBusy"
      classes="modal-container"
      content-class="modal-content"
      style="z-index: 9999999">
      <LoadingSpinner message="Please wait..." />
    </vue-final-modal>

    <Modals />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { VueFinalModal, ModalsContainer } from 'vue-final-modal';
import { stats } from './store/stats';
import { AppSettings } from './store/app-settings';
import { canvasContainer } from './store/editor';
import FullLoading from './components/FullLoading.vue';

// Extract reusable loading spinner component
const LoadingSpinner = {
  props: ['message'],
  template: `
    <div class="flex justify-center items-center h-full w-full" style="height: 100vh">
      <h1 class="text-white flex gap-2 items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ message }}
      </h1>
    </div>
  `
};

// Lazy load components
const EditorVue = defineAsyncComponent({
  loader: () => import('./Editor.vue'),
  loadingComponent: FullLoading,
  delay: 200,
  timeout: 3000
});

const Modals = defineAsyncComponent(() => import('./modals/Index.vue'));

export default {
  name: 'App',
  components: {
    EditorVue,
    VueFinalModal,
    ModalsContainer,
    Modals,
    LoadingSpinner
  },

  data() {
    return {
      stats,
      canvasContainer,
      AppSettings,
      onboarding: true,
    };
  },

  mounted() {
    // Check first time user
    if (localStorage.getItem('label-baker-first-time')) {
      this.stats.firstTime = false;
    }

    // Handle onboarding state
    if (this.AppSettings.ondboardingScreen) {
      this.onboarding = localStorage.getItem('labelbaker-onboarding');
    }

    // Set RTL/LTR direction from storage
    if (localStorage.getItem('semitic')) {
      setTimeout(() => {
        canvasContainer.semitic = localStorage.getItem('semitic');
      }, 1000);
    }
  },
};
</script>