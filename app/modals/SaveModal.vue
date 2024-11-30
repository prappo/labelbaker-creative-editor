<template>
  <div>
    <vue-final-modal v-model="stats.showSaveModal" style="z-index: 9999999" classes="modal-container"
      content-class="modal-content" @keydown.esc="stats.showSaveModal = false">
      <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
        <div class="relative w-full h-full max-w-md md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" @click="stats.showSaveModal = false"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="sr-only">Close</span>
            </button>
            <div class="p-6 text-center">
              <div class="mb-6">
                <label class="block mb-5 text-sm font-medium text-gray-900 dark:text-white">Save As</label>

                <!-- choose template type -->
                <div>
                  <div class="w-full text-left mb-3">Select Template types</div>

                  <ul class="grid w-full gap-3 md:grid-cols-3 mb-3">
                    <li v-for="(t, i) in avilableTyps" :key="i">
                      <input style="display: none" v-model="types" type="checkbox" :id="t + '-option'" :value="t"
                        class="hidden peer" required="" />
                      <label :for="t + '-option'"
                        class="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                          <div class="w-full text-lg font-semibold">
                            {{ t.toUpperCase() }}
                          </div>
                        </div>
                      </label>
                    </li>

                    <li>
                      <input v-model="types" style="display: none" type="checkbox" id="image-option" value="image"
                        class="hidden peer" />
                      <label for="image-option"
                        class="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                          <div class="w-full text-lg font-semibold">Image</div>
                        </div>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="w-full text-left mb-5 flex flex-col gap-2">
                  <div>Template will be saved as :</div>
                  <div>
                    <span v-for="(ty, i) in types" :key="i"
                      class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{{
                        ty.toUpperCase() }}</span>
                  </div>
                </div>
                <div class="relative">
                  <input :value="templateName" @input="changeTemplateName" type="text" id="floating_outlined"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="floating_outlined"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Template
                    Name</label>
                </div>
              </div>
              <div class="flex justify-center">
                <button @click="saveTemplate" :disabled="busy" type="button"
                  class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  <div v-if="busy" role="status">
                    <svg aria-hidden="true"
                      class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                      viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                  Save Template
                </button>
                <button @click="stats.showSaveModal = false" type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

import { stats } from "../store/stats";
import { userData } from "../store/user";
import { saveAsTemplate, showSuccess } from "../libs/helper";
import { canvasContainer } from "../store/editor";
import { templates } from "../store/templates";
import { TempData } from "../store/temp";
export default {
  componenets: {
    VueFinalModal,
    ModalsContainer,
  },
  data() {
    return {
      stats,
      templates,
      TempData,
      user: null,
      templateName: "Template 1",
      busy: false,
      types: ["image"],
      avilableTyps: ["general", "label", "banner", "popup", "app"],
    };
  },

  methods: {
    changeTemplateName(event) {
      this.templateName = event.target.value;
    },

   

    saveToLibrary() {
      return new Promise((resolve, reject) => {
        this.stats.isBusy = true;
        canvasContainer.editor
          .exportToURL(this.exportURL)
          .then((e) => {
            if (e.success) {
              this.stats.isBusy = false;
              resolve("Saved Image to Library");
              showSuccess("Saved Image to Library");
            } else {
              this.stats.isBusy = false;
              reject("Something went wrong");
            }
          })
          .catch((err) => {
       
            this.stats.isBusy = false;
            reject(err);
          });
      });
    },

    saveTemplateAs() {
      this.busy = true;
      
      saveAsTemplate(
        this.TempData.editing.id,
        this.templateName,
        this.user.email,
        canvasContainer,
        this.serverEndpoint,
        this.appMode,
        this.types
      )
        .then((e) => {
          this.busy = false;
          this.stats.showSaveModal = false;
          this.templates.templates = null;
        })
        .catch((e) => {
          this.busy = false;
          this.stats.showSaveModal = false;
        });
    },

    saveTemplate() {
      if (this.types.length === 0) {
        alert("Select at least one type");
        return;
      }

      if (this.types.includes("image")) {
        this.saveToLibrary();
        stats.showSaveModal = false;
      }

      const exists = this.types.some((el) => this.avilableTyps.includes(el));

      if (exists) {
        stats.showSaveModal = true;
        if (this.TempData.myTemplates.includes(this.templateName)) {
          if (
            confirm(
              "A template already exists in this name. Do you want to override that template?"
            )
          ) {
            this.saveTemplateAs();
          }
        } else {
          this.saveTemplateAs();
        }
      }
    },
  },

  mounted() {
    
    if (canvasContainer.editor?.editor) {
   
        this.templateName = canvasContainer.editor.templateName;
      }

    setTimeout(() => {
      this.user = userData.details;
      
    }, 100);
  },
};
</script>