<template>
  <div class="w-full flex-col flex">
    <div class="flex flex-col gap-10 md:w-1/3 px-10">
      <div v-if="store.activeTool === 'localFileUpload'" class="py-5">
        <DataUploaderVue :container="canvasContainer" />
      </div>

      <div v-if="store.activeTool === 'importFromUrl'">
        <DataImport :container="canvasContainer" />
      </div>

    </div>
    <div class="w-full px-10 py-5">
      <DataTable :data="canvasContainer.sheetData" :container="canvasContainer" />
    </div>
  </div>
</template>

<script>

import { canvasContainer } from "../../store/editor";
import DataImport from "./DataImport.vue";
import { store } from "../../store/menu";
import DataTable from "./DataTable.vue";
import { useToast } from "vue-toastification";
import DataUploaderVue from "./DataUploader.vue";
// import WooImport from '../WooImport/Index.vue'
export default {
  props: ["selected"],

  components: { DataTable, DataUploaderVue,DataImport },
  data() {
    return {
      canvasContainer,
      store,
    
      sheetData: null,
      itemsSelected: [],
      importUrl: "",
      prop: '',
    };
  },
 
  methods: {
    importFromUrl: function () {
      const toast = useToast();
      const importUrl = this.importUrl;
      fetch(importUrl)
        .then((res) => res.json())
        .then((out) => {
          if (this.prop) {
            this.canvasContainer.sheetData = out[this.prop];
          } else {
            this.canvasContainer.sheetData = out;
          }

          toast.success("Data imported !", {
            position: "top-center",
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
        })
        .catch((err) => {
          toast.error("Invalid link or unable to import data", {
            position: "top-center",
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
        });
    },
    getData: function () { },
    getColumns: function () { },
    loadData: function () {
      this.canvasContainer.sheetData = this.sheetData;
    },
    

  },

};
</script>
