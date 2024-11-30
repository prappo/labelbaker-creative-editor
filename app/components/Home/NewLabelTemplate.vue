<template>
  <div class="flex flex-col gap-4">
    
    <div class="w-full flex gap-2">
      <!-- Page settings -->
      <div
        class="
          w-full
          flex flex-col
          gap-2
          p-2
          rounded
         
        "
      >
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
              v-model="pageMarginLeft"
              type="number"
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
              v-model="pageMarginTop"
              type="number"
            />
          </div>
        </div>
        <small>{{ $t("sidebar.pageSettings.paperSize") }}</small>
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
                v-model="pageWidth"
                type="number"
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
                v-model="pageHeight"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- label settings -->
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
              v-model="cellWidth"
              type="number"
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
              v-model="cellHeight"
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
              v-model="cellPaddingLeft"
              type="number"
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
              v-model="cellPaddingTop"
              type="number"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      @click="createNew"
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
    >
    <PlusIcon class="w-5" />
      {{ $t("common.new") }}
    </button>
  </div>
</template>
    
    <script>
import { canvasContainer } from "../../store/editor";
import { stats } from "../../store/stats";
import { store } from "../../store/menu";
import { useToast } from "vue-toastification";
import { PlusIcon } from "@heroicons/vue/20/solid";
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

export default {
  components: { PlusIcon },
  data() {
    return {
      stats,
      canvasContainer,
      myEditor: null,
      sheets: pageFormats,
      selected: "a4",
      pageWidth: 595.28,
      pageHeight: 841.89,
      pageMarginTop: 0,
      pageMarginLeft: 0,
      cell: null,
      cellWidth: 200,
      cellHeight: 100,
      cellPaddingTop: 0,
      cellPaddingLeft: 0,
      store,
      canvasContainer,
      sameAsDocument: false,
      editor: null,
    };
  },
  methods: {
    createNew() {
      window.location.href = '#/editor';
      (this.store.activeMenu = "designer"),
        (this.store.activeTool = "shape"),
        setTimeout(() => {
          this.canvasContainer.cellWidth = this.cellWidth;
          this.canvasContainer.cellHeight = this.cellHeight;
          this.canvasContainer.cellPaddingLeft = this.cellPaddingLeft;
          this.canvasContainer.cellPaddingTop = this.cellPaddingTop;

          this.canvasContainer.pageHeight = this.pageHeight;
          this.canvasContainer.pageWidth = this.pageWidth;
          this.canvasContainer.pageMarginLeft = this.pageMarginLeft;
          this.canvasContainer.pageMarginTop = this.pageMarginTop;
          this.canvasContainer.format = this.selected;

          this.editor.editorWidth = this.cellWidth;
          this.editor.editorHeight = this.cellHeight;
          this.editor.background.fill("white");
          this.editor.clearAll();
          this.editor.fitIntoContainer();
          this.editor.grid.addGrid();
          this.editor.ruler.addRuler();

          const toast = useToast();
          canvasContainer.useLayout = false;

          toast.success("New Design Created!", {
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

          this.editor.fitIntoContainer();
        }, 100);
    },
    isCustomSize: function () {
      for (const item in pageFormats) {
        let [width, height] = pageFormats[item];
        if (width !== this.pageWidth && height !== this.pageHeight) {
          return true;
        }
      }

      return false;
    },

    setPageSize: function (e) {
      let val = e.target.value;
      this.selected = val;
      if (val !== "custom") {
        var [width, height] = pageFormats[e.target.value];
        this.pageWidth = width;
        this.pageHeight = height;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.editor = this.canvasContainer.editor;
    }, 100);
  },
};
</script>