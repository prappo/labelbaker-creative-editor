<template>
  <div>
    <vue-final-modal
      v-model="stats.showLangModal"
      style="z-index: 9999999"
      classes="modal-container"
      content-class="modal-content"
      @keydown.esc="stats.showLangModal = false"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div
      
         class="w-full flex justify-center"
        >
          <div class="relative w-full h-full max-w-md md:h-auto">
            <!-- Modal content -->
            <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                @click="stats.showLangModal = !stats.showLangModal"
                class="
                  absolute
                  top-3
                  right-2.5
                  text-gray-400
                  bg-transparent
                  hover:bg-gray-200 hover:text-gray-900
                  rounded-lg
                  text-sm
                  p-1.5
                  ml-auto
                  inline-flex
                  items-center
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
              
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <!-- Modal header -->
              <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3
                  class="
                    text-base
                    font-semibold
                    text-gray-900
                    lg:text-xl
                    dark:text-white
                  "
                >
                   Language
                </h3>
              </div>
              <!-- Modal body -->
              <div class="p-6">
              
                <ul class="my-4 space-y-3">
                  <li v-for="(language, index) in languages" :key="index">
                    <a
                    @click="setLang(language.name)"
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        text-base
                        font-bold
                        text-gray-900
                        rounded-lg
                        bg-gray-50
                        hover:bg-gray-100
                        group
                        hover:shadow
                        dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white
                      "
                    >
                    <SvgIcon :name="language.name" />
                      <span class="flex-1 ml-3 whitespace-nowrap"
                        >{{ language.title }}</span
                      >
                     
                    </a>
                  </li>
                 
                </ul>
                
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
import { canvasContainer } from "../store/editor";
import SvgIcon from "../components/Header/parts/SvgIcon.vue";
export default {
  components: {
    VueFinalModal,
    ModalsContainer,
    SvgIcon,
  },

  data() {
    return {
      stats,
      lang: "",
      defaultLang: null,
      open: false,
      canvasContainer,
      languages: [
        {
          name: "en",
          title: "English",
        },
        {
          name: "bd",
          title: "বাংলা",
        },
        {
          name: "sa",
          title: "عربي",
        },
        // {
        //   name: "de",
        //   title: "Deutsch",
        // },
        {
          name: "cn",
          title: "中文 (繁體)",
        },
        {
          name: "il",
          title: "עִברִית",
        },
        {
          name: "es",
          title: "española",
        },
    ]
    }
  },
  methods: {
    getDefaultLang() {
      return this.$i18n.local;
    },

    setLang(name) {
      this.open = !this.open;
      this.defaultLang = name;
      this.$root.$i18n.locale = name;
      if (name === 'il' || name === 'sa') {
        localStorage.setItem('semitic', 'rtl')
        canvasContainer.semitic = 'rtl'
      } else {
        localStorage.setItem('semitic', 'ltr')
        canvasContainer.semitic = 'ltr'
      }
      localStorage.setItem('lang', name);
      stats.showLangModal = false;
      canvasContainer.defaultLang = name;
    },

    getLang(name) {
      let lang = null;
      this.languages.forEach((item) => {
        if (item.name === name) {
          lang = item;
        }
      });

      return lang;
    },
  },
  mounted() {
    this.defaultLang = this.$i18n.locale;
   
    this.canvasContainer.defaultLang = this.$i18n.locale
  },
};
</script>