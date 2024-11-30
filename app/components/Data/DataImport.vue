<template>
  <div class="gap-2 flex flex-col">
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          version="1.1"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 195.085 195.085"
          style="enable-background: new 0 0 195.085 195.085"
          xml:space="preserve"
        >
          <g>
            <path
              d="M179.617,15.453c-0.051-0.05-0.102-0.1-0.154-0.149c-18.689-18.549-48.477-20.463-69.37-4.441
c-2.091,1.599-3.776,3.053-5.302,4.575c-0.044,0.044-0.087,0.088-0.13,0.133L71.224,49.012c-2.929,2.929-2.929,7.678,0.001,10.606
c2.93,2.93,7.679,2.929,10.606-0.001l33.561-33.566c0.035-0.035,0.069-0.07,0.104-0.105c1.023-1.01,2.205-2.02,3.715-3.174
c15.008-11.508,36.411-10.098,49.789,3.281c0.044,0.044,0.089,0.088,0.134,0.131c14.652,14.786,14.611,38.742-0.124,53.483
l-33.559,33.563c-2.929,2.929-2.929,7.678,0.001,10.606c1.465,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.304-2.197
l33.56-33.563C200.241,69.641,200.241,36.077,179.617,15.453z"
            />
            <path
              d="M113.23,135.437l-33.541,33.542c-0.066,0.067-0.132,0.136-0.196,0.205c-3.708,3.648-8.059,6.449-12.945,8.333
c-13.995,5.418-29.888,2.07-40.481-8.524c-14.768-14.784-14.768-38.84,0-53.619L59.624,81.83c1.406-1.407,2.197-3.315,2.197-5.305
v-0.013c0-4.143-3.357-7.494-7.5-7.494c-2.135,0-4.062,0.895-5.428,2.328l-33.435,33.422c-20.61,20.628-20.612,54.195-0.002,74.828
c10.095,10.097,23.628,15.479,37.411,15.479c6.414-0.001,12.884-1.167,19.084-3.566c6.922-2.667,13.088-6.67,18.326-11.896
c0.076-0.075,0.15-0.153,0.223-0.232l33.337-33.337c2.929-2.93,2.929-7.678-0.001-10.607
C120.909,132.509,116.16,132.509,113.23,135.437z"
            />
            <path
              d="M59.15,135.908c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196l66.164-66.161
c2.93-2.929,2.93-7.678,0.001-10.606c-2.929-2.93-7.678-2.929-10.606-0.001l-66.164,66.161
C56.221,128.23,56.221,132.979,59.15,135.908z"
            />
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </div>
      <input
        type="search"
        id="search"
        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="API URL"
        v-model="importUrl"
        required
      />
    </div>
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          viewBox="0 0 36 36"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>tree-view-solid</title>
          <rect
            x="10"
            y="26"
            width="6"
            height="6"
            rx="1"
            ry="1"
            class="clr-i-solid clr-i-solid-path-1"
          ></rect>
          <path
            d="M15,16H11a1,1,0,0,0-1,1v1.2H5.8V12H7a1,1,0,0,0,1-1V7A1,1,0,0,0,7,6H3A1,1,0,0,0,2,7v4a1,1,0,0,0,1,1H4.2V29.8H11a.8.8,0,1,0,0-1.6H5.8V19.8H10V21a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V17A1,1,0,0,0,15,16Z"
            class="clr-i-solid clr-i-solid-path-2"
          ></path>
          <path
            d="M33,8H10v2H33a1,1,0,0,0,0-2Z"
            class="clr-i-solid clr-i-solid-path-3"
          ></path>
          <path
            d="M33,18H18v2H33a1,1,0,0,0,0-2Z"
            class="clr-i-solid clr-i-solid-path-4"
          ></path>
          <path
            d="M33,28H18v2H33a1,1,0,0,0,0-2Z"
            class="clr-i-solid clr-i-solid-path-5"
          ></path>
          <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
        </svg>
      </div>
      <input
        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        placeholder="Field"
        v-model="prop"
      />
    </div>
    <div class="w-full">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Method</label
      >
      <select
        v-model="method"
        id="countries"
        class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
    </div>
    <div v-if="method === 'POST'">
      <label
        for="requestbody"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Request Body</label
      >
      <textarea
        id="requestbody"
        rows="4"
        v-model="body"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder='Example: {"username":"admin","password":"1234"}'
      ></textarea>
    </div>
    <div>
      <button
        @click="importFromUrl"
        type="button"
        class="text-white right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {{ $t("data.import") }}
      </button>
    </div>
  </div>
</template>

<script>
import { showSuccess, showError } from "../../libs/helper";
import { stats } from "../../store/stats";
export default {
  props: ["container"],
  data() {
    return {
      importUrl: "",
      prop: "",
      method: "GET",
      body: "",
      showSuccess,
      stats,
    };
  },
  methods: {
    error(message) {
      this.stats.showDataImportModal = false;
      showError(message);
    },
    success(message) {
      this.stats.showDataImportModal = false;
      showSuccess(message);
    },
    importFromUrl: function () {
      const importUrl = this.importUrl;

      if (importUrl.length === 0) {
        return this.error("URL is empty");
      }
      let options;
      if (this.method === "GET") {
        options = {
          method: this.method,
        };
      }
      if (this.method === "POST") {
        options = {
          method: this.method,
          headers: { "Content-Type": "application/json" },
          body: "'" + this.body + "'",
        };
      }

      fetch(importUrl, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          this.error("Something went wrong");
          throw new Error("Something went worng");
        })
        .then((out) => {
          if (this.prop) {
            this.container.sheetData = out[this.prop];
          } else {
            this.container.sheetData = out;
          }

          this.success("Data imported !");
        })
        .catch((err) => {
          this.error("Invalid link or unable to import data");
        });
    },
  },
};
</script>