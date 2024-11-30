<template>
  <div v-bind:dir="canvasContainer.semitic">

        <EditorVue v-if="appMode === 'noAuth' || user.email_verified" />
        <div
          style="height: 100vh"
          class="flex justify-center items-center w-full"
          v-else
        >
          <div
            class="flex p-4 mb-4 items-center text-blue-700 bg-blue-100 rounded-lg dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-2xl font-medium">
              We've sent a verification link to your email address. Please
              verify your email address.
            </div>
          
          </div>
        </div>
        <vue-final-modal
          v-model="stats.isBusy"
          style="z-index: 9999999"
          classes="modal-container"
          content-class="modal-content"
        >
          <div
            style="height: 100vh"
            class="flex justify-center items-center h-full w-full"
          >
            <h1 class="text-white flex gap-2 items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Please wait...
            </h1>
          </div>
        </vue-final-modal>
        <Modals />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

import { getCurrentInstance } from "vue";

// import EditorVue from "./Editor.vue";
// import AuthVue from "./Auth.vue";

import { stats } from "./store/stats";
import { AppSettings } from "./store/app-settings";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
// import Modals from "./modals/Index.vue";
import { canvasContainer } from "./store/editor";
import { userData } from "./store/user";
import FullLoading from "./components/FullLoading.vue";

// const EditorVue = defineAsyncComponent(() => import('./Editor.vue'));
const EditorVue = defineAsyncComponent({
  // the loader function
  loader: () => import("./Editor.vue"),

  // A component to use while the async component is loading
  loadingComponent: FullLoading,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // A component to use if the load fails
  //   errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000,
});




const Modals = defineAsyncComponent(() => import("./modals/Index.vue"));


export default {
  components: {
    EditorVue,
   
    canvasContainer,

    VueFinalModal,
    ModalsContainer,
    Modals,

  },
  setup() {
    const app = getCurrentInstance();
    
    const appMode = app.appContext.config.globalProperties.appMode;

   

    if (appMode === "noAuth") {
      let uesrd = {
        email: "wordpress",
      };
      let isAuthenticated = true;
      userData.details = uesrd;
      return {
        isAuthenticated,
        appMode,
      };
    }
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
    if (localStorage.getItem("label-baker-first-time")) {
      this.stats.firstTime = false;
    }

    if(this.AppSettings.ondboardingScreen){
      this.onboarding = localStorage.getItem('labelbaker-onboarding')
    }
    

    if (localStorage.getItem("semitic")) {
      setTimeout(() => {
        canvasContainer.semitic = localStorage.getItem("semitic");
      }, 1000);
    }
  },
};
</script>



