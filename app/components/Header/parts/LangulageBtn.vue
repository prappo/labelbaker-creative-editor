<template>
  <div>
    <button style="width:100px" v-if="canvasContainer.defaultLang" @click="stats.showLangModal = true" type="button"
      :class="{ 'gap-2': canvasContainer.semitic === 'rtl' }" class="
        inline-flex
        items-center
        justify-center
        text-sm text-gray-500
        rounded
        cursor-pointer
        hover:text-gray-900 hover:bg-gray-100
        dark:hover:bg-gray-700 dark:hover:text-white
        hover:ring-1
      ">
      <SvgIcon :name="getLang(canvasContainer.defaultLang).name" />
      {{ getLang(canvasContainer.defaultLang).title }}
    </button>
   
  </div>
</template>

<script>
import SvgIcon from "./SvgIcon.vue";
import { canvasContainer } from "../../../store/editor";
import { stats } from "../../../store/stats";
export default {
  components: { SvgIcon },
  data() {
    return {
      lang: "",
      defaultLang: null,
      open: false,
      canvasContainer,
      stats,
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
      ],
    };
  },

  methods: {
    getDefaultLang() {
      return this.$i18n.local;
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
    // this.canvasContainer.defaultLang = this.$i18n.locale;
  },
};
</script>