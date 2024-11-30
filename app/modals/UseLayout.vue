<template>
  <div>
    <vue-final-modal
      @keydown.esc="canvasContainer.useLayout = false"
      v-model="canvasContainer.useLayout"
      style="z-index: 999999999"
      classes="modal-container"
      content-class="modal-content"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div class="relative w-full max-w-md h-full md:h-auto">
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
                class="w-5 h-5"
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
            <div class="p-6 text-center">
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
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
                  mb-5
                  text-lg
                  font-normal
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Are you sure you want to change layout?
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
                  px-5
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
  </div>
</template>

<script>
import { canvasContainer } from "../store/editor";
import { TempData } from "../store/temp";

export default {
  data() {
    return {
      canvasContainer,
      TempData,
    };
  },
  methods: {
    applyLayout () {
      this.canvasContainer.cellWidth = this.canvasContainer.layoutCellWidth;
      this.canvasContainer.cellHeight = this.canvasContainer.layoutCellHeight;
      this.canvasContainer.pageHeight = this.canvasContainer.layoutPageHeight;
      this.canvasContainer.pageWidth = this.canvasContainer.layoutPageWidth;

     
      this.TempData.cell.x(this.canvasContainer.layoutCellPaddingLeft);
      this.TempData.cell.y(this.canvasContainer.layoutCellPaddingTop);

      this.TempData.cellWidth = this.TempData.canvasContainer.layoutCellWidth;
      this.TempData.cellHeight = this.TempData.canvasContainer.layoutCellHeight;
      this.TempData.pageWidth = this.canvasContainer.layoutPageWidth;
      this.TempData.pageHeight = this.canvasContainer.layoutPageHeight;
      this.canvasContainer.pageMarginLeft = parseInt(
        this.canvasContainer.layoutPageMarginLeft
      );
      this.canvasContainer.pageMarginTop =
        this.TempData.canvasContainer.layoutPageMarginTop;
      this.canvasContainer.cellPaddingLeft = parseInt(
        this.TempData.canvasContainer.layoutCellPaddingLeft
      );
      this.canvasContainer.cellPaddingTop = parseInt(
        this.canvasContainer.layoutCellPaddingTop
      );

      // Preview settings
      this.TempData.myEditor.editorWidth = this.canvasContainer.layoutPageWidth;
      this.TempData.myEditor.editorHeight = this.canvasContainer.layoutPageHeight;
      this.TempData.myEditor.fitIntoContainer();

      this.TempData.cell.width(this.canvasContainer.layoutCellWidth);
      this.TempData.cell.height(this.canvasContainer.layoutCellHeight);

      // Editor settings
      this.TempData.editor.editorWidth = this.canvasContainer.layoutCellWidth;
      this.TempData.editor.editorHeight = this.canvasContainer.layoutCellHeight;
      this.TempData.editor.background.width(this.TempData.editor.editor.width());
      this.TempData.editor.background.height(this.TempData.editor.editor.height());
      this.TempData.editor.fitIntoContainer();

      this.TempData.rulerControl();
      this.TempData.gridControl();

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
};
</script>