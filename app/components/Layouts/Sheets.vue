<template>
  <div>
    <div  class="grid grid-cols-2 md:grid-cols-8 gap-4 w-full">
      <div
        v-for="(data, index) in layoutSheetData"
        @click="showDetails(data)"
        :key="index"
        class="
          bg-white
          p-3
          w-full
          flex flex-col
          rounded-md
          dark:bg-gray-800
          shadow
          cursor-pointer
          hover:ring-2 hover:ring-blue-500 hover:shadow-lg
        "
      >
        <div
          class="
            flex
            xl:flex-row
            flex-col
            items-center
            font-medium
            text-gray-900
            dark:text-white
            pb-2
            mb-2
            xl:border-b
            border-gray-200 border-opacity-75
            dark:border-gray-700
            w-full
          "
        >
          <img
            :src="getAssetsEndpoint() + '/' + data.preview"
            class="w-full mr-2 dark:bg-white"
          />
        </div>
        <div class="flex items-center w-full">
          <div
            class="
              text-xs
              py-1
              px-2
              leading-none
              dark:bg-gray-900
              bg-blue-100
              text-blue-500
              rounded-md
            "
          >
            {{ data.labels_size }}
          </div>
        </div>
      </div>
    </div>
    <vue-final-modal
      @keydown.esc="modalVisiblity = false"
      v-if="selected"
      v-model="modalVisiblity"
      style="z-index: 9999999"
      classes="modal-container"
      content-class="modal-content"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div
          class="
            bg-white
            dark:bg-gray-800
            
            md:flex
            md:w-2/3
            md:h-2/3
            rounded
            shadow-lg
            px-2
            py-2
          "
        >
          <div v-if="type !== 'social'" class="w-full flex items-center px-5">
            <img
              :src="getPreviewLink()"
              :class="{
                'h-full': type == 'sheet',
                'w-full': type === 'social',
              }"
              class="mr-2 dark:bg-white"
            />
          </div>
          <div class="w-full flex flex-col justify-between md:ring-1 px-2 py-3 rounded">
            <div class="flex justify-between my-2">
              <button class="bg-green-500 text-white px-4 font-semibold py-2 rounded shadow" @click="useIt(selected)">
                Use it
              </button>
              <button class="bg-red-500 text-white px-4 font-semibold py-2 rounded shadow" @click="selected = null">Cancel</button>
            </div>
            <div class="py-2 flex flex-col flex-grow h-full">
              <h1 class="font-bold py-5">Layout details</h1>
              <table
                class="
                  w-full
                  text-lg text-left text-gray-500
                  dark:text-gray-400
                "
              >
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Labels size</td>
                  <td>{{ selected.labels_size }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Top margin</td>
                  <td>{{ selected.top_margin }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Vertical spacing</td>
                  <td>{{ selected.vertical_spacing }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Corners</td>
                  <td>{{ selected.corners }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Right margin</td>
                  <td>{{ selected.right_margin }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Left margin</td>
                  <td>{{ selected.left_margin }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Horizontal spacing</td>
                  <td>{{ selected.horizontal_spacing }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Sheet size</td>
                  <td>{{ selected.sheet_size }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Bottom margin</td>
                  <td>{{ selected.bottom_margin }}</td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <td>Labels per sheet</td>
                  <td>{{ selected.labels_per_sheet }}</td>
                </tr>
              </table>
            </div>
          
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>


<script>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

import { canvasContainer } from "../../store/editor";
import { store } from "../../store/menu";
export default {
  components: { VueFinalModal, ModalsContainer },
  data() {
    return {
      selected: null,
      modalVisiblity: false,
      canvasContainer,
      store,
    
      layoutSheetData: null,
      layoutSocialData: null,
      type: "sheet",
    };
  },

  methods: {
    showDetails: function (data, type = "sheet") {
      this.type = type;
      this.modalVisiblity = true;
      this.selected = data;
    },

    formatSocialText(text){
      return text.replace(/-/g, " ")
    },

    useIt: function (data) {
      
      let expectedLabelSize = data.labels_size;
      if (this.type === "social") {
        expectedLabelSize = data.sheet_size;
      }
      let { width: labelWidth, height: labelHeight } =
        this.getSize(expectedLabelSize);
      let { width: sheetWidth, height: sheetHeight } = this.getSize(
        data.sheet_size
      );

      this.canvasContainer.layoutPageWidth = this.inchToPx(sheetWidth);
      this.canvasContainer.layoutPageHeight = this.inchToPx(sheetHeight);
      this.canvasContainer.layoutCellHeight = this.inchToPx(labelHeight);
      this.canvasContainer.layoutCellWidth = this.inchToPx(labelWidth);
      this.canvasContainer.layoutPageMarginLeft = this.inchToPx(
        data.left_margin
      );
      this.canvasContainer.layoutPageMarginTop = this.inchToPx(data.top_margin);
      this.canvasContainer.layoutCellPaddingLeft = this.inchToPx(
        data.horizontal_spacing
      );
      this.canvasContainer.layoutCellPaddingTop = this.inchToPx(
        data.vertical_spacing
      );

      this.modalVisiblity = false;
      store.activeMenu = "designer";
      store.activeTool = "documentSettings";
      canvasContainer.useLayout = true;
      
    },

    inchToPx: function (inch) {
      if (this.type == "social") {
        return inch;
      }
      return inch.replace('"', "") * 72;
    },
    getSize: function (data) {
      let width = 0;
      let height = 0;

      if (this.type === "sheet") {
        let s = data.split(" ");
        width = s[0].replace('"', "");
        height = s[2].replace('"', "");
      }

      if (this.type === "social") {
        let s = data.split("x");
        width = parseInt(s[0]);
        height = parseInt(s[1]);
      }

      let result = {
        width: width,
        height: height,
      };

      return result;
    },

    getPreviewLink() {
      if (this.type === "social") {
        return this.getAssetsEndpoint() + "/social/" + this.selected.preview;
      }
      return this.getAssetsEndpoint() + "/" + this.selected.preview;
    },

    getLayoutEndpoint() {
      return this.apiEndpoint + "/data/layouts.json";
    },

    getSocialApiEndpoint() {
      return this.apiEndpoint + "/assets/social/layouts.json";
    },

    getAssetsEndpoint() {
      return this.apiEndpoint + "/assets";
    },
  },

  mounted() {
    fetch(this.getLayoutEndpoint())
      .then((res) => res.json())
      .then((data) => {
        this.layoutSheetData = data;
      });

    fetch(this.getSocialApiEndpoint())
      .then((res) => res.json())
      .then((data) => {
        this.layoutSocialData = data;
      });
  },
};
</script>
