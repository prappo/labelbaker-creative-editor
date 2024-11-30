<template>
  <div class="px-5 py-2">
    <div class="inline-flex my-5 rounded-md shadow-sm" role="group">
      <button
      @click="selected = 'data'"
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        Select Data
      </button>

      <button
      @click="selected = 'customize'"
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        Customize Template
      </button>
    </div>
    <FeaturedImage v-if="selected ==='data'" :woo="woo" :container="container" />
    <Form v-else :container="container" :fields="fields" />
    
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const FeaturedImage = defineAsyncComponent(() =>
  import("../FeaturedImage/Index.vue")
);
const Form = defineAsyncComponent(() => import("./Form.vue"));
export default {
  props: ["container", "fields", "woo"],
  data() {
    return {
      selected: "data",
    };
  },
  components: { FeaturedImage, Form },
};
</script>
