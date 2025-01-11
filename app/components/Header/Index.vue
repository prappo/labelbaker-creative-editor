<template>
  <nav
    class="px-2 py-1  md:py-1 sm:px-4 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm w-full z-50 top-0 left-18 border-b border-gray-200 dark:border-gray-600 shadow-sm"
  >
    <div class="flex items-center flex-wrap justify-between mx-auto">
      <div v-if="AppSettings.enableLogo" class="h-10 mr-5 flex items-center gap-3">
        <SvgIcon @click="goHome" class="w-10 cursor-pointer" name="logo" />
      </div>
      <Transition>
        <OptionsBtn v-if="store.activeMenu === 'designer'" />
      </Transition>

      <div class="flex md:order-2 ">
        <div
          class="ml-auto items-center justify-end w-full space-x-4 hidden lg:flex"
        >
          <!-- <SearchBtn /> -->

          <button v-if="store.activeMenu === 'designer' && AppSettings.enablePreview" @click="stats.showPreviewModal = true" type="button" class="text-white flex gap-1 items-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            <ArrowDownCircleIcon class="w-5" />
            Export
            <kbd class="
                    md:inline-flex
                    hidden
                    items-center
                    rounded-md
                   
                    text-sm
                    font-sans
                  
                    font-medium
                    text-slate-400
                  ">
              ⌘I
            </kbd>
          </button>

          <DarkModeSwitch  />
          <!-- <LangulageBtnVue /> -->
        
        </div>
        <div class="items-center md:hidden justify-end flex w-full space-x-5">
      
        </div>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          id="targetEl"
          class="items-center p-2 hidden text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-center flex-grow w-full hidden md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
      
      </div>
    </div>
  </nav>
</template>

<script>
import DarkModeSwitch from "../DarkModeSwitch.vue";
import PrintBtnVue from "./parts/PrintBtn.vue";
import SearchBtn from "./parts/SearchBtn.vue";

import OptionsBtn from "./parts/OptionsBtn.vue";
// import LangulageBtnVue from "./parts/LangulageBtn.vue";
import { store } from "../../store/menu";
import { canvasContainer } from "../../store/editor";
import { stats } from "../../store/stats";
import { AppSettings } from "../../store/app-settings";
import SvgIcon from "./parts/SvgIcon.vue";
import {  ArrowDownCircleIcon } from "@heroicons/vue/20/solid";
export default {
  props: ["editor"],
  components: {
    DarkModeSwitch,
    SearchBtn,
    PrintBtnVue,

    OptionsBtn,
    // LangulageBtnVue,
    SvgIcon,
   
    ArrowDownCircleIcon
},
  data() {
    return {
      store,
      stats,
      AppSettings,
      canvasContainer,
      collapseMenu: true,
      activeCLass: "text-white bg-blue-500",
      currentRoute: null,
      menus: [
      {
          name: "dashboard",
          label: "Home",
          url: "#/dashboard",
          isPro:false,
        },
        {
          name: "templates",
          label: "Templates",
          url: "#/templates",
          isPro:false,
        },
        

        // {
        //   name: "data",
        //   label: "Data",
        // },

        // {
        //   name: "integrations",
        //   label: "Integrations",
        // },

        // {
        //   name: "maker",
        //   label: "Maker",
        //   url:'#/maker'
        // },
        // {
        //   name: "new",
        //   label: "new",
        //   url: "#/new",
        // },
        {
          name: "generators",
          label: "generators",
          url: "#/generators",
          isPro:false,
        },
        {
          name: "banners",
          label: "Banners",
          url: "#/banners",
          isPro:false,
        },
        {
          name: "popups",
          label: "Popups",
          url: "#/popups",
          isPro:false,
        },
        {
          name: "apps",
          label: "apps",
          url: "#/apps",
          isPro:false,
        },
        {
          name: "labels",
          label: "labels",
          url: "#/labels",
          isPro:false,
        },
        {
          name: "thumbnails",
          label: "Thumbnails",
          url: "#/thumbnails",
          isPro:false,
        },
        {
          name: "products",
          label: "products",
          url: "#/products",
          isPro:false,
        },
        {
          name: "email",
          label: "email",
          url: "#/email",
          isPro:false,
        },
        // {
        //   name: "editor",
        //   label: "Editor",
        //   url: "#/editor",
        // },
      ],
    };
  },
  // fill="#9CA3AF"
  methods: {
    menuFilter(menus){
      const newMenu = menus.filter(menu => {
        if(menu.name === 'products' && !this.isWooExists){
          return false;
        }
        
        if(this.AppSettings.enabledMenu.includes(menu.name)){
        
          return true;
        }
        return false;
      })
      return newMenu;
    },
    isCurrentMenu(menuName) {
      
      if (!this.currentRoute) {
        this.currentRoute = window.location.hash;
      }

      if(!window.location.hash){
        window.location.href = '#/dashboard'
      }

      if (this.currentRoute.replace("#/", "") === menuName) {
        return true;
      }
      return false;
    },

    goHome(){
      // window.location.href = '#/dashboard'
    },

    setActive() {},
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentRoute = window.location.hash;
    });
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>