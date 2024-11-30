<template>
  <div>
    <div v-if="layoutSocialData" class="grid md:grid-cols-6 gap-4 w-full">
      <div
        v-for="(data, index) in layoutSocialData"
        @click="showDetails(data, 'social')"
        :key="index"
        class="
          bg-white
          p-3
          w-full
          flex flex-col
          justify-between
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
            justify-center
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
            :src="getAssetsEndpoint() + '/social/' + data.preview"
            class="h-32 mr-2 dark:bg-white"
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
            {{ formatSocialText(data.labels_size) }}
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
       
        class="flex justify-center items-center mt-10 w-full"
      >
        <div
          class="
            bg-white
            dark:bg-gray-800
            flex
            md:w-2/3 md:h-2/3
            rounded
            shadow-lg
            px-2
            py-2
          "
        >
          
          <div
            class="
              w-full
              flex flex-col
              justify-between
              items-center
              px-2
              py-3
              rounded
            "
          >
            <div class="py-2 flex flex-col items-center  h-full">
            
              <div class="w-full text-center font-semibold text-2xl">
                You want to apply this layout?
                <!-- {{ selected.labels_size }} -->
              </div>
              <div class="w-full flex items-center justify-center gap-10 py-10">
                <button
                  class="
                    bg-green-500
                    text-white
                    px-4
                    font-semibold
                    py-2
                    rounded
                    shadow
                  "
                  @click="useIt(selected)"
                >
                  Yes
                </button>
                <button
                  class="
                    bg-red-500
                    text-white
                    px-4
                    font-semibold
                    py-2
                    rounded
                    shadow
                  "
                  @click="selected = null"
                >
                  No
                </button>
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

    formatSocialText(text) {
      return text.replace(/-/g, " ");
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

