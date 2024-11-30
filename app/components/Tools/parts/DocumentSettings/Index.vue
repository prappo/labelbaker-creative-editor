<template>
  <div class="w-full flex flex-col gap-2">
    <div class="w-full px-10 flex justify-center flex-col">
      <div
        class="flex justify-center"
        id="preview-canvas-holder"
        style="width: 100%; height: 100px"
      >
        <div id="preview-canvas"></div>
      </div>
      <small class="w-full text-center">
        {{ pageWidth }} px , {{ pageHeight }} px
      </small>
    </div>
    <div class="w-full flex flex-col gap-2">
      <div class="flex justify-between">
        <h1
          class="
            block
            mb-1
            text-sm
            w-full
            font-medium
            text-gray-900
            dark:text-gray-400
          "
        >
          {{ $t("sidebar.pageSettings.text") }}
        </h1>
      </div>
      <div class="flex gap-5 justify-between">
        <div>
          <small>{{ $t("sidebar.pageSettings.marginLeft") }}</small>
          <input
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              px-2
              py-1
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            type="number"
            @input="
              (event) =>
                (canvasContainer.pageMarginLeft = parseInt(event.target.value))
            "
            :value="canvasContainer.pageMarginLeft"
          />
        </div>
        <div>
          <small>{{ $t("sidebar.pageSettings.marginTop") }}</small>
          <input
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              px-2
              py-1
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            @input="
              (event) => (canvasContainer.pageMarginTop = event.target.value)
            "
            type="number"
            :value="canvasContainer.pageMarginTop"
          />
        </div>
      </div>

      <select
        class="
          bg-gray-50
          border border-gray-300
          text-gray-900 text-sm
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block
          w-full
          px-2
          py-1
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-blue-500
          dark:focus:border-blue-500
        "
        @change="setPageSize"
      >
        <option :selected="isCustomSize()" value="custom">Custom size</option>
        <option
          :selected="selected === index"
          :key="index"
          :value="index"
          v-for="(sheet, index) in sheets"
        >
          {{ index.toUpperCase() }}
        </option>
      </select>

      <div
        class="w-full border-2 rounded p-2 hover:shadow-xl"
        v-if="selected === 'custom'"
      >
        <h1
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-400
          "
        >
          {{ $t("sidebar.pageSettings.customPageSize") }}
        </h1>
        <div class="flex gap-5 justify-between">
          <div>
            <small>{{ $t("common.width") }}</small>
            <input
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                px-2
                py-1
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              type="number"
              @input="setPageWidth"
              :value="pageWidth"
            />
          </div>
          <div>
            <small>{{ $t("common.height") }}</small>
            <input
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                px-2
                py-1
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              @input="setPageHeight"
              type="number"
              :value="pageHeight"
            />
          </div>
        </div>
      </div>

      <div class="w-full border-blue-500 border-2 rounded p-2 hover:shadow-xl">
        <h1
          class="
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-400
            flex
            gap-5
            justify-between
          "
        >
          {{ $t("sidebar.pageSettings.labelSize") }}
          <div
            class="shadow"
            style="height: 20px; width: 20px; background: #3c81f6"
          ></div>
        </h1>
        <div class="flex gap-5 justify-between">
          <div>
            <small>{{ $t("common.width") }}</small>
            <input
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                px-2
                py-1
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              type="number"
              @input="setCellWidth"
              :value="cellWidth"
            />
          </div>

          <div>
            <small>{{ $t("common.height") }}</small>
            <input
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                px-2
                py-1
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              @input="setCellHeight"
              :value="cellHeight"
              type="number"
            />
          </div>
        </div>
        <div class="flex gap-5 justify-between">
          <div>
            <small>{{ $t("sidebar.pageSettings.paddingLeft") }}</small>
            <input
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                px-2
                py-1
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              type="number"
              @input="
                (event) => {
                  canvasContainer.cellPaddingLeft = parseInt(
                    event.target.value
                  );
                  cell.x(event.target.value);
                }
              "
              :value="canvasContainer.cellPaddingLeft"
            />
          </div>

          <div>
            <small>{{ $t("sidebar.pageSettings.paddingTop") }}</small>
            <input
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                px-2
                py-1
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              @input="
                (event) => {
                  canvasContainer.cellPaddingTop = parseInt(event.target.value);
                  cell.y(event.target.value);
                }
              "
              :value="canvasContainer.cellPaddingTop"
              type="number"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center mb-4">
        <input
          v-model="sameAsDocument"
          id="default-checkbox"
          type="checkbox"
          value=""
          class="
            w-4
            h-4
            text-blue-600
            bg-gray-100
            rounded
            border-gray-300
            focus:ring-blue-500
            dark:focus:ring-blue-600 dark:ring-offset-gray-800
            focus:ring-2
            dark:bg-gray-700 dark:border-gray-600
          "
        />
        <label
          for="default-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{ $t("sidebar.pageSettings.sameAsPageSize") }}</label
        >
      </div>

      <vue-final-modal
        class="absolute"
        @keydown.esc="canvasContainer.useLayout = false"
        v-model="canvasContainer.useLayout"
        style="z-index: 9999999; position: absolute"
        classes="modal-container"
        content-class="modal-content"
      >
        <div
          style="height: 100vh"
          class="flex justify-center items-center h-full w-full"
        >
          <div class="relative w-full mx-3 max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
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
                  class="w-5 h-5 hidden"
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
              <div class="md:p-6 p-2 flex flex-col gap-3 text-center">
                <svg
                  aria-hidden="true"
                  class="
                    mx-auto
                    hidden
                    mb-4
                    w-14
                    h-14
                    text-gray-400
                    dark:text-gray-200
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3
                  class="
                    md:mb-5
                    mt-5
                    text-lg
                    font-normal
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  You want to change layout?
                </h3>
                <button
                  @click="applyLayout"
                  type="button"
                  class="
                    text-white
                    bg-green-500
                    hover:bg-green-800
                    focus:ring-4 focus:outline-none focus:ring-red-300
                    dark:focus:ring-red-800
                    font-medium
                    rounded-lg
                    text-sm
                    inline-flex
                    items-center
                    justify-center
                    px-1
                    md:px-5
                    py-2.5
                    text-center
                    mr-2
                  "
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  @click="canvasContainer.useLayout = false"
                  class="
                    text-gray-500
                    bg-white
                    hover:bg-gray-100
                    focus:ring-4 focus:outline-none focus:ring-gray-200
                    rounded-lg
                    border border-gray-200
                    text-sm
                    font-medium
                    px-5
                    py-2.5
                    hover:text-gray-900
                    focus:z-10
                    dark:bg-gray-700
                    dark:text-gray-300
                    dark:border-gray-500
                    dark:hover:text-white
                    dark:hover:bg-gray-600
                    dark:focus:ring-gray-600
                  "
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </vue-final-modal>

      <button
        class="
          h-8
          flex
          items-center
          gap-2
          px-3
          rounded-md
          shadow
          text-white
          justify-center
          hover:shadow-lg
          bg-green-500
        "
        @click="saveContainer"
      >
        <CheckCircleIcon class="w-5 h-5" />

        {{ $t("sidebar.pageSettings.apply") }}
      </button>
    </div>
  </div>
</template>

<script>
import { Core, Editor as PreviewEditor } from "../../../../../src/editor";
import { store } from "../../../../store/menu";
import { canvasContainer } from "../../../../store/editor";
import { useToast } from "vue-toastification";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { parse } from "@vue/compiler-dom";
import { TempData } from "../../../../store/temp";

const pageFormats = {
  a0: [2383.94, 3370.39],
  a1: [1683.78, 2383.94],
  a2: [1190.55, 1683.78],
  a3: [841.89, 1190.55],
  a4: [595.28, 841.89],
  a5: [419.53, 595.28],
  a6: [297.64, 419.53],
  a7: [209.76, 297.64],
  a8: [147.4, 209.76],
  a9: [104.88, 147.4],
  a10: [73.7, 104.88],
  b0: [2834.65, 4008.19],
  b1: [2004.09, 2834.65],
  b2: [1417.32, 2004.09],
  b3: [1000.63, 1417.32],
  b4: [708.66, 1000.63],
  b5: [498.9, 708.66],
  b6: [354.33, 498.9],
  b7: [249.45, 354.33],
  b8: [175.75, 249.45],
  b9: [124.72, 175.75],
  b10: [87.87, 124.72],
  c0: [2599.37, 3676.54],
  c1: [1836.85, 2599.37],
  c2: [1298.27, 1836.85],
  c3: [918.43, 1298.27],
  c4: [649.13, 918.43],
  c5: [459.21, 649.13],
  c6: [323.15, 459.21],
  c7: [229.61, 323.15],
  c8: [161.57, 229.61],
  c9: [113.39, 161.57],
  c10: [79.37, 113.39],
  dl: [311.81, 623.62],
  letter: [612, 792],
  "government-letter": [576, 756],
  legal: [612, 1008],
  "junior-legal": [576, 360],
  ledger: [1224, 792],
  tabloid: [792, 1224],
  "credit-card": [153, 243],
};

const units = {
  inch: 72,
  mm: 72 / 25.4,
  px: 1,
};
export default {
  name: "DocumentSettings",
  props: ["editor"],
  components: { CheckCircleIcon },
  data() {
    return {
      myEditor: null,
      sheets: pageFormats,
      selected: "a4",
      pageWidth: 595.28,
      pageHeight: 841.89,
      cell: null,
      cellWidth: 10,
      cellHeight: 10,
      store,
      canvasContainer,
      sameAsDocument: false,
    };
  },
  methods: {
    isCustomSize: function () {
      for (const item in pageFormats) {
        let [width, height] = pageFormats[item];
        if (width !== this.pageWidth && height !== this.pageHeight) {
          return true;
        }
      }

      return false;
    },

    getPageFormat(pageWidth, pageHeight) {
      let result = false;
      for (const item in pageFormats) {
        let [width, height] = pageFormats[item];
        if (width === pageWidth && height === pageHeight) {
          result = item;
        }
      }

      return result;
    },
    setPageWidth: function (e) {
      let width = parseInt(e.target.value);

      if (width > 0) {
        this.pageWidth = width;
      }

      this.fit();
    },

    setPageHeight: function (e) {
      let height = parseInt(e.target.value);
      if (height > 0) {
        this.pageHeight = height;
      }

      this.fit();
    },

    setPageSize: function (e) {
      let val = e.target.value;
      this.selected = val;
      if (val !== "custom") {
        var [width, height] = pageFormats[e.target.value];
        this.pageWidth = width;
        this.pageHeight = height;
      }

      this.fit();
    },

    fit: function () {
      this.myEditor.editorWidth = this.pageWidth;
      this.myEditor.editorHeight = this.pageHeight;
      this.myEditor.fitIntoContainer();
      if (this.sameAsDocument) {
        this.cellWidth = this.pageWidth;
        this.cellHeight = this.pageHeight;
        this.cell.width(this.pageWidth);
        this.cell.height(this.pageHeight);
      }
    },

    setCellWidth: function (e) {
      let width = parseInt(e.target.value);
      if (width > 0) {
        this.cellWidth = width;
        this.cell.width(width);
      }

      this.fit();
    },

    setCellHeight: function (e) {
      let height = parseInt(e.target.value);
      if (height > 0) {
        this.cellHeight = height;
        this.cell.height(height);
      }

      this.fit();
    },
    rulerControl: function () {
      if (this.canvasContainer.enableRuler) {
        this.canvasContainer.editor.enableRuler = true;
      } else {
        this.canvasContainer.editor.enableRuler = false;
      }
      this.canvasContainer.editor.ruler.addRuler();
    },

    gridControl: function () {
      if (this.canvasContainer.enableGrid) {
        this.canvasContainer.editor.enableGrid = true;
      } else {
        this.canvasContainer.editor.enableGrid = false;
      }
      this.canvasContainer.editor.grid.addGrid();
    },
    saveContainer: function () {
      this.canvasContainer.cellWidth = this.cellWidth;
      this.canvasContainer.cellHeight = this.cellHeight;
      this.canvasContainer.pageHeight = this.pageHeight;
      this.canvasContainer.pageWidth = this.pageWidth;
      this.canvasContainer.format = this.selected;

      this.editor.editorWidth = this.cellWidth;
      this.editor.editorHeight = this.cellHeight;
      this.editor.fitIntoContainer();
      this.editor.grid.addGrid();
      this.editor.ruler.addRuler();

      const toast = useToast();
      canvasContainer.useLayout = false;
      toast.success("Page settings applied !", {
        position: "bottom-center",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    applyLayout: function () {
      this.canvasContainer.cellWidth = this.canvasContainer.layoutCellWidth;
      this.canvasContainer.cellHeight = this.canvasContainer.layoutCellHeight;
      this.canvasContainer.pageHeight = this.canvasContainer.layoutPageHeight;
      this.canvasContainer.pageWidth = this.canvasContainer.layoutPageWidth;

      this.selected = this.getPageFormat(
        this.canvasContainer.layoutPageWidth,
        this.canvasContainer.layoutPageHeight
      );
      if (!this.selected) {
        this.selected = "custom";
      }
      this.canvasContainer.format = this.selected;
      this.cell.x(this.canvasContainer.layoutCellPaddingLeft);
      this.cell.y(this.canvasContainer.layoutCellPaddingTop);

      this.cellWidth = this.canvasContainer.layoutCellWidth;
      this.cellHeight = this.canvasContainer.layoutCellHeight;
      this.pageWidth = this.canvasContainer.layoutPageWidth;
      this.pageHeight = this.canvasContainer.layoutPageHeight;
      this.canvasContainer.pageMarginLeft = parseInt(
        this.canvasContainer.layoutPageMarginLeft
      );
      this.canvasContainer.pageMarginTop =
        this.canvasContainer.layoutPageMarginTop;
      this.canvasContainer.cellPaddingLeft = parseInt(
        this.canvasContainer.layoutCellPaddingLeft
      );
      this.canvasContainer.cellPaddingTop = parseInt(
        this.canvasContainer.layoutCellPaddingTop
      );

      // Preview settings
      this.myEditor.editorWidth = this.canvasContainer.layoutPageWidth;
      this.myEditor.editorHeight = this.canvasContainer.layoutPageHeight;
      this.myEditor.fitIntoContainer();

      this.cell.width(this.canvasContainer.layoutCellWidth);
      this.cell.height(this.canvasContainer.layoutCellHeight);

      // Editor settings
      this.editor.editorWidth = this.canvasContainer.layoutCellWidth;
      this.editor.editorHeight = this.canvasContainer.layoutCellHeight;
      this.editor.background.width(this.editor.editor.width());
      this.editor.background.height(this.editor.editor.height());
      this.editor.fitIntoContainer();

      this.rulerControl();
      this.gridControl();

      const toast = useToast();
      canvasContainer.useLayout = false;
      toast.success("Page settings applied !", {
        position: "bottom-center",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
  },

  mounted() {
    const config = {
      pageWidth: canvasContainer.pageWidth,
      pageHeight: canvasContainer.pageHeight,
      width: canvasContainer.pageWidth,
      height: canvasContainer.pageHeight,
      container: "preview-canvas",
      containerWrapper: "preview-canvas-holder",
    };
    const myEditor = new PreviewEditor(config);
    this.myEditor = myEditor;

    const layer = myEditor.layer;

    this.pageWidth = canvasContainer.pageWidth;
    this.pageHeight = canvasContainer.pageHeight;
    this.cellPaddingTop = canvasContainer.cellPaddingTop;
    this.cellPaddingLeft = canvasContainer.cellPaddingLeft;
    this.cellWidth = canvasContainer.cellWidth;
    this.cellHeight = canvasContainer.cellHeight;
    this.selected = canvasContainer.format;
    var cell = new Core.Rect({
      x: canvasContainer.cellPaddingLeft,
      y: canvasContainer.cellPaddingTop,
      width: canvasContainer.cellWidth,
      height: canvasContainer.cellHeight,
      fill: "#3C81F6",
      stroke: "black",
      strokeWidth: 0.5,
    });

    this.cell = cell;

    layer.add(cell);
    this.fit();
    TempData.document = this;
    
  },

  watch: {
    sameAsDocument: function (newValue, oldValue) {
      if (newValue) {
        this.fit();
      }
    },
  },
};
</script>

