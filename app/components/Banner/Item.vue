<template>
  <div
    class="bg-white w-full flex justify-between rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg">
    <div
      class="flex p-3 w-2/3 items-center gap-2 font-medium text-gray-900 dark:text-white border-gray-200 border-opacity-75 dark:border-gray-700">
      <img :src="template.preview" class="w-36 ring-1 rounded-md dark:bg-white" />
      <div class="flex h-full flex-col gap-2 justify-between px-3">
        <div class="text-2xl">{{ template.name }}</div>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2 text-gray-500">
            <IdentificationIcon class="w-5 h-5" />
            {{ template.id }}
          </div>
          <div class="flex gap-2 text-gray-500">
            <CalendarIcon class="w-5 h-5" />
            {{ getData(template.updatedAt) }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-5 justify-start px-5 w-full">
      <div class="flex items-center justify-end gap-5 w-full">
        <!-- generator options -->
        <div v-if="this.type === 'generator'">
          <button :class="defaultBtnClass" @click="setOptions('export', 'Generator')">
            Generate
          </button>
        </div>

        <!-- thumbnail options -->
        <div v-if="this.type === 'thumbnail'">
          <button :class="defaultBtnClass" @click="setOptions('thumbnail', 'Thumbnail')">
            Set Thumbnail
          </button>
        </div>

        <!-- email -->
        <div v-if="this.type === 'email'">
          <button :class="defaultBtnClass" @click="setOptions('email', 'Email')">
            Send Email
          </button>
        </div>

        <!-- Product image -->
        <div v-if="this.type === 'product'">
          <button :class="defaultBtnClass" @click="setOptions('productImage', 'Product Image')">
            Set Product Image
          </button>
        </div>

        <!-- Lable -->
        <div v-if="this.type === 'label'">
          <button :class="defaultBtnClass" @click="setOptions('print', 'Generate Label')">
            Generate Label
          </button>
        </div>

        <!-- Share -->

        <div v-if="this.type === 'banner' ||
          this.type === 'popup' ||
          this.type === 'app' ||
          this.type === 'generator'
          ">
          <button @click="shareTemplate" type="button"
            class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
            Share
          </button>
        </div>

        <!-- banner , popup and app options -->
        <div v-if="this.type === 'banner' ||
          this.type === 'popup' ||
          this.type === 'app'
          ">
          <button
            class="text-white flex items-center gap-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            @click="getShortcode()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>

            Shortcode
          </button>
        </div>
        <!-- <div
          class="my-2 py-2 bg-gray-700 px-2 rounded-md"
          v-if="
            this.type === 'banner' ||
            this.type === 'popup' ||
            this.type === 'app'
          "
        >
          <span class="text-white">Shortcode</span>
          <div
            class="flex items-center w-full justify-between text-gray-800 border border-gray-800 bg-white max-w-full font-mono text-sm py-3 px-4 rounded-md"
          >
            <div class="flex gap-1">
              <span>{{ getShortcode() }}</span>
            </div>
            <span
              @click="copyToClipboard"
              class="flex text-gray-800 cursor-pointer w-5 h-5 hover:text-gray-400 duration-200"
            >
              <svg
                class="fill-current"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 115.77 122.88"
                style="enable-background: new 0 0 115.77 122.88"
                xml:space="preserve"
              >
                <g>
                  <path
                    class="st0"
                    d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div> -->

        <!-- global options -->

        <button
          class="py-2 px-5 flex gap-2 items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="setOptions('previewMode', 'Preview')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Preview
        </button>

        <button id="dropdownMenuIconButton" :data-dropdown-toggle="template.id"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 4 15">
            <path
              d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div :id="template.id"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
            <li @click="editBannerTemplate">
              <div
                class="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-4 h-4 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Edit {{ type }}
              </div>
            </li>
            <li @click="editTemplateName">
              <div
                class="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-4 h-4 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>

                Change Name
              </div>
            </li>
            <li v-if="type === 'banner' || type === 'popup' || type === 'app'" @click="editDispalyRules">
              <div
                class="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-4 h-4 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>

                Edit display rules
              </div>
            </li>
            <li @click="showDeleteConfirmation()">
              <div
                class="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-4 h-4 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Delete
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteTemplate, getTemplate, getTemplates } from "../../libs/template";
import { showError, showSuccess, useIt } from "../../libs/helper";
import { canvasContainer } from "../../store/editor";
import { store } from "../../store/menu";
import { TempData } from "../../store/temp";
import { stats } from "../../store/stats";
import { defineAsyncComponent } from "vue";
import { initDropdowns, initModals } from "flowbite";
import { CalendarIcon, IdentificationIcon } from "@heroicons/vue/20/solid";
const Widget = defineAsyncComponent(() =>
  import("../../components/Widget/Index.vue")
);
export default {
  props: ["template", "type"],
  emits: ["getTemplates"],
  components: { Widget, CalendarIcon, IdentificationIcon },
  data() {
    return {
      canvasContainer,
      store,
      TempData,
      templateName: '',
      stats,
      showDeleteModal: false,
      selected: null,
      defaultBtnClass:
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
    };
  },
  methods: {
    showDeleteConfirmation() {
      TempData.changeTemplateId = this.template.id;
      TempData.changeTemplateName = this.template.name;
      stats.showDeleteModal = true
    },
    shareTemplate() {
      stats.showShareModal = true;

    },
    getTemplateName() {
      return 'hm ' + this.template.name;
    },
    setOptions(optionType, optionTitle = "") {
      stats.isBusy = true;
      TempData.optionType = optionType;
      TempData.optionTitle = optionTitle;
      getTemplate(
        this.template,
        this.serverEndpoint,
        this.apiEndpoint,
        "",
        this.appMode
      )
        .then((e) => {
          stats.isBusy = false;
          TempData.selectedTemplate = e;
          stats.showWidgetModal = true;
        })
        .catch((e) => {
          stats.isBusy = false;
        });
    },

    getShortcode() {
      let shortcode = "";
      if (this.getType() === "banner") {
        shortcode = `[labelbaker_banner id='${this.template.id}' width='100%']`;
      }

      if (this.getType() === "popup") {
        shortcode = `[labelbaker_popup width='500px' show_once='true' id='${this.template.id}']`;
      }

      if (this.getType() === "app") {
        shortcode = `[labelbaker_app width='100%' id='${this.template.id}']`;
      }
      TempData.shortCode = shortcode;
      stats.showShortcodeModal = true;
    },
    getType() {
      if (!this.type) {
        return "banner";
      }

      return this.type;
    },
    editTemplateName() {
      TempData.changeTemplateId = this.template.id;
      TempData.changeTemplateName = this.template.name;
      stats.editNameModal = true;
    },

    editDispalyRules() {
      stats.showDisplayRulesModal = true;
    },
    editBannerTemplate() {
      window.location.href = "#/editor/" + this.template.id;
      // getTemplate(
      //   this.template,
      //   this.serverEndpoint,
      //   this.apiEndpoint,
      //   "",
      //   this.appMode
      // ).then((e) => {
      //   useIt(e);
      // });
    },
    getData(timestamp) {
      const date = new Date(timestamp);

      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    },



  },

  mounted() {
    initDropdowns();
    initModals();
   
    this.templateName = this.template.name
  },
};
</script>