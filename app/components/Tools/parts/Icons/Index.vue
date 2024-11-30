<template>
  <div class="relative">
    <ProOverlay />
    <div class="text-xs text-gray-400 tracking-wider">
      {{ $t("sidebar.toolbar.icons") }}
    </div>
    <!-- Search -->
    <div class="relative mt-2">
      <input
        type="text"
        style="padding-left:32px"
        class="
          pl-8
          h-9
          bg-transparent
          border border-gray-300
          dark:border-gray-700 dark:text-white
          w-full
          rounded-md
          text-sm
        "
        :placeholder="$t('sidebar.toolbar.searchIcons')"
        @keydown.enter="search"
      />
      <svg
        viewBox="0 0 24 24"
        class="
          w-4
          absolute
          text-gray-400
          top-1/2
          transform
          translate-x-0.5
          -translate-y-1/2
          left-2
        "
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
    <!-- icons -->

    <div v-if="icons" class="mt-3">
      <div class="text-xs py-2 text-gray-400 tracking-wider">
        {{ $t("sidebar.toolbar.searchResults") }}
      </div>
      <div v-if="!loading" class="grid grid-cols-3 gap-2">
        <template v-for="(icon, index) in icons" :key="index">
          <IconElementVue :icon="icon" :apiUrl="apiUrl" />
        </template>
      </div>
    </div>

    <!-- Loader -->
    <div
      v-if="loading"
      class="h-24 w-full flex justify-center items-center pt-10"
      role="status"
    >
      <svg
        aria-hidden="true"
        class="
          mr-2
          w-8
          h-8
          text-gray-200
          animate-spin
          dark:text-gray-600
          fill-blue-600
        "
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="">{{ $t("sidebar.toolbar.searching") }}</span>
    </div>

    <!-- Default icons -->

    <div v-if="defaultIcons" class="mt-3">
      <div>
        <div class="text-xs py-2 text-gray-400 tracking-wider">
          {{ $t("sidebar.toolbar.defaultIcons") }}
        </div>
        <div class="grid grid-cols-3 gap-2">
          <template v-for="(icon, index) in defaultIcons" :key="index">
            <defaultIconElementVue :icon="icon" :apiUrl="defaultApiUrl" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { canvasContainer } from "../../../../store/editor";
const IconElementVue = defineAsyncComponent(() => import("./IconElement.vue")) ;
const defaultIconElementVue = defineAsyncComponent(()=> import("./defaultIconElement.vue"));
const ProOverlay = defineAsyncComponent(() => import('../../../ProOverlay.vue'))
export default {
  components: { IconElementVue, defaultIconElementVue ,ProOverlay},
  data() {
    return {
      searchItem: null,
      icons: null,
      defaultIcons: null,
      loading: false,
      canvasContainer,
      apiUrl: '',
      defaultApiUrl: '',
    };
  },

  methods: {
  
    search(e) {
      this.loading = true;
      let keyword = e.target.value;

      try {
        fetch(this.apiUrl, {
          method: "POST",
          headers: {
            Accept: "application/json", // expected data sent back
          },
          body: JSON.stringify({ keyword: keyword }),
        })
          // Handle success
          .then((response) => response.json()) // convert to json
          .then((json) => {
            this.loading = false;
            this.icons = json.icons;
            this.canvasContainer.icons = json.icons;
          }) //print data to console
          .catch((err) => {
            this.loading = false;
          }); // Catch errors
      } catch (e) {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.icons = this.canvasContainer.icons;
    this.loading = true;
    fetch(this.defaultApiUrl)
      .then((response) => response.json())
      .then((e) => {
        this.loading = false;
        this.defaultIcons = e;
     
      })
      .catch((err) => {
        this.loading = false;
     
      });
  },
};
</script>