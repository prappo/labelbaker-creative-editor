<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-5 flex-col">
      <label
        class="inline-flex relative items-center mb-4 cursor-pointer w-full"
      >
        <input v-model="isDynamic" type="checkbox" class="sr-only peer" />
        <div
          :class="{
            'after:right-[2px] , peer-checked:after:-translate-x-full':
              canvasContainer.semitic === 'rtl',
          }"
          class="
            w-11
            h-6
            bg-gray-200
            rounded-full
            peer
            peer-focus:ring-4 peer-focus:ring-blue-300
            dark:peer-focus:ring-blue-800 dark:bg-gray-700
            peer-checked:after:translate-x-full peer-checked:after:border-white
            after:content-[''] after:absolute
            md:after:top-0.5 md:after:left-[2px]
            after:bg-white
            after:border-gray-300
            after:border
            after:rounded-full
            after:h-5
            after:w-5
            after:transition-all
            dark:border-gray-600
            peer-checked:bg-blue-600
          "
        ></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {{ $t("sidebar.printMode.dynamicPrinting") }}</span
        >
      </label>
    </div>

    <div class="flex">
      <button
        v-if="canvasContainer.printMode === 'dynamic'"
        @click="gotoDataTab"
        type="button"
        class="
          text-white
          bg-blue-500
          hover:bg-blue-800
          focus:ring-4 focus:outline-none focus:ring-blue-200
          font-medium
          rounded-full
          text-xs
          px-3
          py-1.5
          mr-2
          text-center
          inline-flex
          items-center
          dark:bg-blue-500 dark:hover:bg-blue-600
        "
      >
        {{ $t("sidebar.printMode.importData") }}
      </button>
      <button
        @click="goToMappingTab"
        v-if="canvasContainer.printMode === 'dynamic'"
        type="button"
        class="
          text-blue-900
          bg-transparent
          border border-blue-900
          hover:bg-blue-900 hover:text-white
          focus:ring-4 focus:outline-none focus:ring-blue-200
          font-medium
          rounded-full
          text-xs
          px-3
          py-1.5
          text-center
          dark:border-blue-800 dark:text-blue-800 dark:hover:text-white
        "
        data-dismiss-target="#alert-additional-content-1"
        aria-label="Close"
      >
        {{ $t("sidebar.toolbar.dataMapping") }}
      </button>
    </div>
  </div>
</template>

<script>
import { canvasContainer } from "../../../../store/editor";
import { store } from "../../../../store/menu";
import { useToast } from "vue-toastification";
import { stats } from "../../../../store/stats";

export default {
  data() {
    return {
      isDynamic: false,
      stats,
      canvasContainer,
      store,
      defaultCellQuantity: 1,
    };
  },
  methods: {
    setPrintQuantity: function (e) {
      this.canvasContainer.numberOfCellPrint = e.target.value;
    },
    gotoDataTab: function () {
      // store.activeMenu = "data";
      // store.activeTool = "localFileUpload";
      this.stats.showDataImportModal = true;
      
    },

    goToMappingTab() {
      store.activeMenu = "designer";
      if(store.activeTool === 'dataMapping'){
        store.activeTool = "shape";
        return;
      }
      return store.activeTool = "dataMapping";
    },
    chagneMode: function (e) {
      const toast = useToast();
      toast("Changed Print mode to " + this.canvasContainer.printMode + " .", {
        position: "bottom-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
  },
  mounted: function () {
    setTimeout(() => {
      if (this.canvasContainer.printMode === "dynamic") {
        this.isDynamic = true;
      }
    }, 500);

    this.defaultCellQuantity = this.canvasContainer.numberOfCellPrint;
  },
  watch: {
    isDynamic: function (newVal, oldVal) {
      if (newVal) {
        this.canvasContainer.printMode = "dynamic";
      } else {
        this.canvasContainer.printMode = "static";
      }
    },
  },
};
</script>