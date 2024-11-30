<template>
  <div class="md:hidden absolute bottom-0 z-50 w-full">
    <!-- drawer init and toggle -->
    <div
      class="
        flex
        justify-around
        py-2
        items-center
        w-full
        dark:text-slate-200
        bg-slate-50/90
        dark:bg-slate-700/90
        backdrop-blur-sm
      "
    >
      <button
        class="w-full flex justify-center"
        @click="leftMenu"
      >
        <Bars4Icon class="w-7 text-gray-500" />
      </button>
      <button
      style="background:linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))"
        class="
          w-full
          text-white
          
          hover:bg-blue-800
          focus:ring-4 focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-5
          flex justify-center
          py-2.5
          mr-2
          mb-2
          dark:bg-blue-600 dark:hover:bg-blue-700
          focus:outline-none
          dark:focus:ring-blue-800
        "
        type="button"
        data-drawer-target="drawer-swipe"
        data-drawer-show="drawer-swipe"
        data-drawer-placement="bottom"
        data-drawer-edge=""
        data-drawer-edge-offset="bottom-[60px]"
        aria-controls="drawer-swipe"
      >
      <svg
            class="w-6 h-6"
            aria-hidden="false"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
            ></path>
          </svg>
      </button>
      <button
      v-if="store.activeMenu === 'designer'"
        @click="propertiesMenu"
        class="w-full flex justify-center"
      >
        <Cog6ToothIcon class="w-7 text-gray-500" />
      </button>
    </div>

    <!-- drawer component -->
    <div
      id="drawer-swipe"
      class="
        fixed
        z-40
        w-full
        overflow-y-auto
        dark:text-slate-200
        bg-slate-50/90
        dark:bg-slate-700/90
        backdrop-blur-sm
        border-t border-gray-200
        rounded-t-lg
        dark:border-gray-700 dark:bg-gray-800
        transition-transform
        bottom-0
        left-0
        right-0
        translate-y-full
      "
      tabindex="-1"
      aria-labelledby="drawer-swipe-label"
    >
      <div
        class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
        data-drawer-toggle="drawer-swipe"
      >
        <span
          class="
            absolute
            w-8
            h-1
            -translate-x-1/2
            bg-gray-300
            rounded-lg
            top-3
            left-1/2
            dark:bg-gray-600
          "
        ></span>
        <h5
          id="drawer-swipe-label"
          class="
            inline-flex
            items-center
            text-base text-gray-500
            dark:text-gray-400
          "
        >
          <svg
            class="w-5 h-5 mr-2"
            aria-hidden="false"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
            ></path>
          </svg>
          Menu
        </h5>
      </div>
      <div
        style="height: 50vh"
        class="grid grid-cols-3 overflow-scroll gap-4 p-4 lg:grid-cols-4"
      >
        <div
          @click="newProject"
          data-drawer-toggle="drawer-swipe"
          class="
            p-4
            rounded-lg
            cursor-pointer
            bg-gray-50
            hover:bg-gray-100
            dark:hover:bg-gray-600 dark:bg-gray-700
          "
        >
          <div
            class="
              flex
              justify-center
              items-center
              p-2
              mx-auto
              mb-2
              max-w-[48px]
              bg-gray-200
              dark:bg-gray-500
              rounded-full
              w-18
              h-18
            "
          >
            <svg
              class="inline w-8 h-8 text-gray-500 dark:text-gray-400"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <g stroke="#9CA3AF" stroke-width="2">
                <path stroke-linecap="round" d="M12 16L12 8M16 12L8 12" />
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                />
              </g>
            </svg>
          </div>
          <div class="font-medium text-center text-gray-500 dark:text-gray-400">
            New
          </div>
        </div>
        <div
          @click="templates"
          data-drawer-toggle="drawer-swipe"
          class="
            p-4
            rounded-lg
            cursor-pointer
            bg-gray-50
            hover:bg-gray-100
            dark:hover:bg-gray-600 dark:bg-gray-700
          "
        >
          <div
            class="
              flex
              justify-center
              items-center
              p-2
              mx-auto
              mb-2
              max-w-[48px]
              bg-gray-200
              dark:bg-gray-500
              rounded-full
              w-18
              h-18
            "
          >
            <svg
              viewBox="0 0 24 24"
              class="inline w-8 h-8 text-gray-500 dark:text-gray-400"
              stroke="#9CA3AF"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <div class="font-medium text-center text-gray-500 dark:text-gray-400">
            Templates
          </div>
        </div>
        <div
          @click="editor"
          data-drawer-toggle="drawer-swipe"
          class="
            p-4
            rounded-lg
            cursor-pointer
            bg-gray-50
            hover:bg-gray-100
            dark:hover:bg-gray-600 dark:bg-gray-700
            lg:block
          "
        >
          <div
            class="
              flex
              justify-center
              items-center
              p-2
              mx-auto
              mb-2
              max-w-[48px]
              bg-gray-200
              dark:bg-gray-500
              rounded-full
              w-18
              h-18
            "
          >
            <svg
              class="inline w-8 h-8 text-gray-500 dark:text-gray-400"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#9CA3AF"
            >
              <path
                d="M12.394 1.154h-.788l-4.574 12.17L7 23h1v-8.292l1.498 1.499 2.502-2.5 2.499 2.5 1.501-1.5V23h1v-9.5zM12 2.95L13.147 6h-2.294zm0 9.344l-2.502 2.5-1.417-1.418L10.477 7h3.046l2.396 6.374-1.42 1.419z"
              />
              <path fill="none" d="M0 0h24v24H0z" />
            </svg>
          </div>
          <div class="font-medium text-center text-gray-500 dark:text-gray-400">
            Editor
          </div>
        </div>
        <div
          @click="dataRe"
          data-drawer-toggle="drawer-swipe"
          class="
            p-4
            rounded-lg
            cursor-pointer
            bg-gray-50
            hover:bg-gray-100
            dark:hover:bg-gray-600 dark:bg-gray-700
          "
        >
          <div
            class="
              flex
              justify-center
              items-center
              p-2
              mx-auto
              mb-2
              max-w-[48px]
              bg-gray-200
              dark:bg-gray-500
              rounded-full
              w-18
              h-18
            "
          >
            <svg
              version="1.1"
              class="inline w-8 h-8 text-gray-500 dark:text-gray-400"
              fill="#9CA3AF"
              id="Artwork"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              enable-background="new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M23.3,94.7v280.5c0,46.8,77.5,82.1,180.3,82.1c9.8,0,19.6-0.3,29.1-1c6.7-0.5,11.8-6.3,11.4-13.1
		c-0.5-6.7-6.3-11.7-13.1-11.4c-9,0.6-18.2,1-27.4,1c-91.8,0-155.8-30.4-155.8-57.6v-51c30.7,24.1,87.7,39.6,155.8,39.6
		c6.2,0,12.5-0.1,18.6-0.4c6.8-0.3,12-6,11.7-12.8c-0.3-6.8-6-12-12.8-11.7c-5.8,0.3-11.7,0.4-17.5,0.4
		c-91.8,0-155.8-30.4-155.8-57.6v-50.9c30.7,24.1,87.7,39.6,155.8,39.6c102.8,0,180.3-35.3,180.3-82.1V94.7
		c0-46.8-77.5-82.1-180.3-82.1C100.8,12.5,23.3,47.9,23.3,94.7z M203.6,245.8c-91.8,0-155.8-30.4-155.8-57.6v-51
		c30.7,24.1,87.7,39.6,155.8,39.6c68.1,0,125.1-15.5,155.8-39.6v51C359.5,215.5,295.5,245.8,203.6,245.8z M359.5,94.7
		c0,27.3-64,57.6-155.8,57.6S47.8,121.9,47.8,94.7S111.8,37,203.6,37S359.5,67.4,359.5,94.7z"
                />
                <path
                  d="M371.7,265.5c-64.5,0-117,52.5-117,117s52.5,117,117,117c64.5,0,117-52.5,117-117S436.2,265.5,371.7,265.5z M371.7,475
		c-51,0-92.5-41.5-92.5-92.5s41.5-92.5,92.5-92.5s92.5,41.5,92.5,92.5S422.7,475,371.7,475z"
                />
                <path
                  d="M380,327c-4.7-4.3-11.8-4.3-16.5,0l-32.6,29.8c-5,4.6-5.4,12.3-0.8,17.3c4.6,5,12.3,5.4,17.3,0.8l12.1-11.1V427
		c0,6.8,5.5,12.3,12.3,12.3S384,433.8,384,427v-63.2l12.1,11.1c2.3,2.1,5.3,3.2,8.3,3.2c3.3,0,6.6-1.3,9.1-4
		c4.6-5,4.2-12.7-0.8-17.3L380,327z"
                />
              </g>
            </svg>
          </div>
          <div class="font-medium text-center text-gray-500 dark:text-gray-400">
            Data
          </div>
        </div>
        <div
          @click="integrations"
          data-drawer-toggle="drawer-swipe"
          class="
            p-4
            rounded-lg
            cursor-pointer
            bg-gray-50
            hover:bg-gray-100
            dark:hover:bg-gray-600 dark:bg-gray-700
          "
        >
          <div
            class="
              flex
              justify-center
              items-center
              p-2
              mx-auto
              mb-2
              max-w-[48px]
              bg-gray-200
              dark:bg-gray-500
              rounded-full
              w-18
              h-18
            "
          >
            <svg
              class="inline w-8 h-8 text-gray-500 dark:text-gray-400"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.7399 6.32717C24.3781 8.48282 24.2132 11.571 22.2453 13.5389L20.3007 15.4835C20.0078 15.7764 19.533 15.7764 19.2401 15.4835L12.5226 8.76595C12.2297 8.47306 12.2297 7.99818 12.5226 7.70529L14.4671 5.76075C16.4352 3.79268 19.5237 3.62792 21.6793 5.26646L24.7238 2.22166C25.0167 1.92875 25.4916 1.92873 25.7845 2.22161C26.0774 2.51449 26.0774 2.98936 25.7845 3.28227L22.7399 6.32717ZM19.7704 13.8925L21.1846 12.4783C22.7467 10.9162 22.7467 8.3835 21.1846 6.82141C19.6225 5.25931 17.0899 5.25931 15.5278 6.82141L14.1135 8.23562L19.7704 13.8925Z"
                fill="#9CA3AF"
              />
              <path
                d="M12.7778 11.215C13.0707 11.5079 13.0707 11.9828 12.7778 12.2757L10.6514 14.402L13.5982 17.3489L15.7238 15.2234C16.0167 14.9305 16.4916 14.9305 16.7844 15.2234C17.0773 15.5163 17.0773 15.9912 16.7844 16.284L14.6589 18.4095L15.4858 19.2364C15.7787 19.5293 15.7787 20.0042 15.4858 20.2971L13.5412 22.2416C11.5732 24.2096 8.48484 24.3745 6.32918 22.7361L3.28475 25.7808C2.99187 26.0737 2.517 26.0737 2.22409 25.7808C1.93118 25.488 1.93116 25.0131 2.22404 24.7202L5.26853 21.6754C3.63025 19.5197 3.79509 16.4314 5.76306 14.4635L7.7076 12.5189C8.0005 12.226 8.47537 12.226 8.76826 12.5189L9.59072 13.3414L11.7172 11.215C12.0101 10.9221 12.485 10.9221 12.7778 11.215ZM6.83028 21.1875C8.3929 22.7431 10.9207 22.7409 12.4806 21.181L13.8948 19.7668L8.23793 14.1099L6.82372 15.5241C5.26383 17.084 5.26163 19.6117 6.81709 21.1743L6.82366 21.1808L6.83028 21.1875Z"
                fill="#9CA3AF"
              />
            </svg>
          </div>
          <div class="font-medium text-center text-gray-500 dark:text-gray-400">
            Integrations
          </div>
        </div>
        <div
          @click="layouts"
          data-drawer-toggle="drawer-swipe"
          class="
            p-4
            rounded-lg
            cursor-pointer
            bg-gray-50
            hover:bg-gray-100
            dark:hover:bg-gray-600 dark:bg-gray-700
          "
        >
          <div
            class="
              flex
              justify-center
              items-center
              p-2
              mx-auto
              mb-2
              max-w-[48px]
              bg-gray-200
              dark:bg-gray-500
              rounded-full
              w-18
              h-18
            "
          >
            <svg
              version="1.1"
              class="inline p-1 w-8 h-8 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 192.066 192.066"
              style="enable-background: new 0 0 192.066 192.066"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    style="fill: #9ca3af"
                    d="M0,0v192.066h192.066V0H0z M185.517,36.83h-29.626V6.549h29.626V36.83z M74.071,36.83h-29.16V6.549
			h29.16C74.071,6.549,74.071,36.83,74.071,36.83z M80.617,6.549h31.551V36.83H80.617C80.617,36.83,80.617,6.549,80.617,6.549z
			 M74.071,43.379v142.138h-29.16V43.379H74.071z M80.617,43.379h31.551v142.138H80.617C80.617,185.517,80.617,43.379,80.617,43.379
			z M118.721,43.379h30.624v142.138h-30.624V43.379z M118.721,36.83V6.549h30.624V36.83H118.721z M38.358,6.549V36.83H6.549V6.549
			H38.358z M6.549,43.379h31.812v142.138H6.549V43.379z M155.891,185.517V43.379h29.626v142.138
			C185.517,185.517,155.891,185.517,155.891,185.517z"
                  />
                </g>
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
          <div class="font-medium text-center text-gray-500 dark:text-gray-400">
            Layouts
          </div>
        </div>
       
        <div
          @click="learn"
          data-drawer-toggle="drawer-swipe"
          class="
            p-4
            rounded-lg
            cursor-pointer
            bg-gray-50
            hover:bg-gray-100
            dark:hover:bg-gray-600 dark:bg-gray-700
          "
        >
          <div
            class="
              flex
              justify-center
              items-center
              p-2
              mx-auto
              mb-2
              max-w-[48px]
              bg-gray-200
              dark:bg-gray-500
              rounded-full
              w-18
              h-18
            "
          >
            <svg
              fill="#9CA3AF"
              version="1.1"
              class="inline w-8 h-8 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M373.509,42.51C266.747-46.477,99.149,11.128,75.11,151.303c-11.45,66.768,13.291,132.909,65.576,175.095
			c20.223,16.318,31.822,41.369,31.822,68.731v33.392c0,27.618,22.469,50.088,50.088,50.088h16.696v16.696
			c0,9.221,7.475,16.696,16.696,16.696c9.221,0,16.696-7.475,16.696-16.696v-16.696h16.696c27.618,0,50.088-22.469,50.088-50.088
			v-33.392c0-0.001,0-0.003,0-0.004s0-0.003,0-0.004c0-27.299,11.687-52.419,32.065-68.919
			c43.285-35.045,68.109-87.005,68.109-142.554C439.642,128.984,415.538,77.541,373.509,42.51z M306.076,428.52
			c0,9.206-7.49,16.696-16.696,16.696h-66.784c-9.206,0-16.696-7.49-16.696-16.696v-16.696h100.176V428.52z M239.292,233.734
			h-16.696c-27.618,0-50.088-22.469-50.088-50.088V166.95h16.696c27.618,0,50.088,22.469,50.088,50.088V233.734z M350.523,300.25
			c-23.99,19.423-39.291,47.293-43.357,78.183h-34.482V267.126h16.696c46.031,0,83.48-37.449,83.48-83.48v-33.392
			c0-9.221-7.475-16.696-16.696-16.696h-33.392c-27.279,0-51.542,13.154-66.784,33.45c-15.243-20.296-39.505-33.45-66.784-33.45
			h-33.392c-9.221,0-16.696,7.475-16.696,16.696v33.392c0,46.031,37.449,83.48,83.48,83.48h16.696v111.306h-34.473
			c-4.044-30.931-19.277-58.747-43.166-78.022c-43.034-34.722-63.083-88.354-53.633-143.463
			C127.693,42.232,264.941-4.51,352.13,68.161c34.395,28.668,54.122,70.762,54.122,115.486
			C406.251,229.074,385.939,271.574,350.523,300.25z M272.684,233.734v-16.696c0-27.618,22.469-50.088,50.088-50.088h16.696v16.696
			c0,27.618-22.469,50.088-50.088,50.088H272.684z"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div class="font-medium text-center text-gray-500 dark:text-gray-400">
            Learn
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Drawer } from "flowbite";
import { responsive } from "../store/responsive";
import { store } from "../store/menu";
import { canvasContainer } from "../store/editor";
import { Bars4Icon, Cog6ToothIcon } from "@heroicons/vue/24/solid";
export default {
    data() {
        return {
            appDrawer: null,
            responsive,
            canvasContainer,
            store,
        };
    },
    methods: {
        toggle() {
            
        },
        newProject() {
            this.store.activeMenu = "home";
            this.store.activeTool = "newProject";
        },
        templates() {
            this.store.activeMenu = "home";
            this.store.activeTool = "myTemplates";
        },
        editor() {
            this.store.activeMenu = "designer";
            this.store.activeTool = "shape";
            setTimeout(() => {
                this.canvasContainer.editor.fitIntoContainer();
            }, 100);
        },
        dataRe() {
            this.store.activeMenu = "data";
            this.store.activeTool = "localFileUpload";
        },
        integrations() {
            this.store.activeMenu = "integrations";
            this.store.activeTool = "wooImport";
        },
        layouts() {
            this.store.activeMenu = "layouts";
            this.store.activeTool = "sheetLayout";
        },
        print() {
            this.store.activeMenu = "print";
            this.store.activeTool = "printSettings";
        },
        learn() {
            this.store.activeMenu = "home";
            this.store.activeTool = "learn";
        },
        leftMenu() {
            responsive.hideSidebar = !responsive.hideSidebar;
            if (!responsive.hideSidebar) {
                responsive.hideProperties = true;
            }
        },
        propertiesMenu() {
            responsive.hideProperties = !responsive.hideProperties;
            if (!responsive.hideProperties) {
                responsive.hideSidebar = true;
            }
        },
    },
    mounted() { },
    components: { Bars4Icon, Cog6ToothIcon }
};
</script>