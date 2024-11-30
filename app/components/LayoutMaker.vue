<template>
  <div class="flex flex-col  gap-3 md:flex-row">
    <div class="w-1/3 px-5" id="layout-maker-holder">
      <div class="shadow-xl border-1" id="layout-maker-preview"></div>
    </div>
    <div class="w-full h-full mb-10">
      <h1 class="pb-5 text-lg">Make a page layout for your label and predict how many labels you can fit on a page</h1>
      <div v-if="maker" class="flex flex-col justify-between h-full">
        
        <div
          v-if="mode != 'project'"
          class="
            w-full
            p-4
            border border-gray-200
            bg-gray-50
            rounded-t-xl
            dark:border-gray-600 dark:bg-gray-700
          "
        >
          <div class="grid grid-cols-3">
            <div class="col-span-2 sm:col-span-1">
              <button
                @click="applyLayout"
                rel="noopener nofollow noreferrer"
                class="
                  inline-flex
                  items-center
                  px-4
                  py-2
                  mr-3
                  text-xs
                  font-medium
                  text-gray-900
                  bg-white
                  border border-gray-200
                  rounded-lg
                  focus:outline-none
                  hover:bg-gray-100 hover:text-blue-00
                  focus:z-10 focus:ring-2 focus:ring-gray-300
                  dark:focus:ring-gray-500
                  dark:bg-gray-800
                  dark:text-gray-400
                  dark:border-gray-600
                  dark:hover:text-white
                  dark:hover:bg-gray-700
                "
              >
                {{ $t("common.applyLayout") }}
              </button>
            </div>
          </div>
        </div>

        <div
          :class="{ 'border-t border-t-xl rounded-t-xl': mode == 'project' }"
          class="
            flex
            p-0
            bg-white
            border-gray-200
            bg-gradient-to-r
            code-preview
            dark:bg-gray-900
            border-x border-b
            rounded-b-xl
            dark:border-gray-600
          "
        >
          <div class="w-full px-5 py-5">
            <div class="grid md:grid-cols-3 md:gap-5">
              <template v-for="(item, index) in config" :key="index">
                <div v-if="!ignores.includes(index)" class="mb-6">
                  <label
                    class="
                      block
                      mb-2
                      text-sm
                      font-medium
                      text-gray-900
                      dark:text-white
                    "
                    >{{ $t("common." + index) }}</label
                  >
                  <input
                    type="number"
                    :value="item"
                    @input="changeSettings($event, index)"
                    class="
                      bg-gray-50
                      border border-gray-300
                      text-gray-900 text-sm
                      rounded-lg
                      focus:ring-blue-500 focus:border-blue-500
                      block
                      w-full
                      p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-blue-500
                      dark:focus:border-blue-500
                    "
                    placeholder=""
                  />
                </div>
              </template>
            </div>
          </div>
          
        </div>
        <button v-if="mode === 'project'" @click="applyLayout" class="bg-blue-500 text-white px-4 py-2 rounded font-semibold my-2">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { canvasContainer } from "../store/editor";
import { store } from "../store/menu";
import { responsive } from '../store/responsive';
export default {
  props: ["mode"],
  data() {
    return {
      canvasContainer,
      store,
      maker: null,
      ignores: ["container", "containerWrapper", "pageMargin", "cellPadding"],
      config: {
        pageWidth: 595.28,
        pageHeight: 841.89,
        cellWidth: 189,
        cellHeight: 189,
        count: 10,
        cellPadding: 0,
        cellPaddingLeft: 0,
        cellPaddingTop: 0,
        pageMargin: 0,
        pageMarginLeft: 13,
        pageMarginTop: 36,
        container: "layout-maker-preview",
        containerWrapper: "layout-maker-holder",
      },
    };
  },

  methods: {
    changeSettings: function (event, index) {
      this.config[index] = parseInt(event.target.value);

      let maker = new this.canvasContainer.editor.LayoutMaker(this.config);
      this.maker = maker;
      for (let i = 0; i < this.config.count; i++) {
        maker.createLabel({});
      }

      maker.fitIntoContainer();
    },

    applyLayout() {
      this.canvasContainer.layoutPageWidth = parseInt(this.config.pageWidth);
      this.canvasContainer.layoutPageHeight = parseInt(this.config.pageHeight);
      this.canvasContainer.layoutCellHeight = parseInt(this.config.cellHeight);
      this.canvasContainer.layoutCellWidth = parseInt(this.config.cellWidth);
      this.canvasContainer.layoutPageMarginLeft = parseInt(
        this.config.pageMarginLeft
      );
      this.canvasContainer.layoutPageMarginTop = parseInt(
        this.config.pageMarginTop
      );
      this.canvasContainer.layoutCellPaddingLeft = parseInt(
        this.config.cellPaddingLeft
      );
      this.canvasContainer.layoutCellPaddingTop = parseInt(
        this.config.cellPaddingTop
      );

      responsive.hideSidebar = false;
      store.activeMenu = "designer";
      store.activeTool = "documentSettings";
      this.canvasContainer.useLayout = true;
    },
  },

  mounted() {
    setTimeout(() => {
      let maker = new this.canvasContainer.editor.LayoutMaker(this.config);
      this.maker = maker;
      for (let i = 0; i < this.config.count; i++) {
        maker.createLabel({});
      }

      maker.fitIntoContainer();
    }, 100);
  },
};
</script>