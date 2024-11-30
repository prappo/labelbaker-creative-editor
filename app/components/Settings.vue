<template>
  <div class="px-4 flex z-40 justify-center gap-20  items-center w-full bg-transparent sticky top-0">
    <div v-if="TempData.editing.name" class="w-full flex items-center h-full">
      <div class="bg-gray-200 dark:bg-gray-900 pl-2 pr-1 py-1 flex items-center justify-between gap-1 rounded-full">
       
       {{ TempData.editing.name }} <div class="flex gap-2" v-if="TempData.templateType">
        <div class="bg-gray-500 px-2 flex justify-center items-center capitalize rounded-full text-white" v-for="(tt , index) in TempData.templateType" :key="index">
          {{ tt }}
        </div>
      </div>
      </div>
    </div>
    <div class="
        flex
        bg-white
        dark:bg-gray-900
        items-center
        justify-center
        mt-2
        rounded-full
        shadow
        md:gap-2
        backdrop-blur-sm
        bg-slate-50/90
      ">
      <button @click="deleteSelected" class="hover:bg-gray-300 rounded-full px-2 py-2" data-tooltip-target="btnDelete">
        <TrashIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="btnDelete" />
      </button>

      <button @click="duplicateSelected" class="hover:bg-gray-300 rounded-full px-2 py-2" data-tooltip-target="btnDuplicate">
        <DocumentDuplicateIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="btnDuplicate" />
      </button>

      <button @click="editor.groupSelected()" class="hover:bg-gray-300 rounded-full px-2 py-2" data-tooltip-target="btnGroup">
        <RectangleGroupIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="btnGroup" />
      </button>

      <button data-tooltip-target="btnZoomIn" class="hover:bg-gray-300 rounded-full px-2 py-2" @click="zoomIn">
        <MagnifyingGlassPlusIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="btnZoomIn" />
      </button>

      <button data-tooltip-target="btnZoomOut" class="hover:bg-gray-300 rounded-full px-2 py-2" @click="zoomOut">
        <MagnifyingGlassMinusIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="btnZoomOut" />
      </button>
      <button data-tooltip-target="fitInViewport" class="hover:bg-gray-300 rounded-full px-2 py-2"
        @click="fitInViewport('fit')">
        <ArrowsPointingInIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="fitInViewport" />
      </button>

      <button data-tooltip-target="fillInViewport" class="hover:bg-gray-300 rounded-full px-2 py-2"
        @click="fitInViewport('fill')">
        <ArrowsPointingOutIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="fillInViewport" />
      </button>

      <button data-tooltip-target="btnMoveUp" class="hover:bg-gray-300 rounded-full px-2 py-2" @click="moveUp">
        <ArrowUpOnSquareIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="btnMoveUp" />
      </button>

      <button data-tooltip-target="btnMoveDown" class="hover:bg-gray-300 rounded-full px-2 py-2" @click="moveDown">
        <ArrowDownOnSquareIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="btnMoveDown" />
      </button>

      <button data-tooltip-target="btnClearAll" class="hover:bg-gray-300 rounded-full px-2 py-2" @click="clearAll">
        <DocumentMinusIcon class="w-5 h-5 dark:text-gray-500" />
        <Tooltip id="btnClearAll" />
      </button>

    </div>

  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { TempData } from "../store/temp";
import {
  TrashIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  DocumentMinusIcon,
  RectangleGroupIcon
} from "@heroicons/vue/24/outline";

const Tooltip = defineAsyncComponent(() => import("./Tooltip/index.vue"));
import { canvasContainer } from "../store/editor";
export default {
  props: ["editor"],
  components: {
    TrashIcon,
    DocumentDuplicateIcon,
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon,
    ArrowUpOnSquareIcon,
    ArrowDownOnSquareIcon,
    DocumentMinusIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    RectangleGroupIcon,
    Tooltip,
  },
  data() {
    return {
      canvasContainer,
      TempData,
      scale: canvasContainer.zoomScale,
      change: 0,
    };
  },
  methods: {
    clearAll: function () {
      this.editor.clearAll();
    },
    moveUp: function () {
      this.editor.moveUp();
    },

    moveDown: function () {
      this.editor.moveDown();
    },
    deleteSelected: function () {
      this.editor.deleteSelected();
    },

    duplicateSelected: function () {
      this.editor.duplicateSelected();
    },

    zoomIn: function () {
      this.scale += 0.1;
      this.editor.zoom(this.scale);

    },
    zoomOut: function () {
      this.scale -= 0.1;
      this.editor.zoom(this.scale);

    },

    fitInViewport(mood) {
      this.editor.fitIntoContainer(mood);
    },
    disableScroll() {
      window.onscroll = function () { window.scrollTo(0, 0); };
    },
  },

  mounted() {
    let self = this;
    setTimeout(() => {
      this.editor.editor.on("wheel", function (e) {
        var deltaX = e.evt.deltaX;
        var deltaY = e.evt.deltaY;
        var scrollStep = Math.abs(deltaY * 1);
        self.disableScroll();
        // Scrolling up
        if (deltaY < 0) {
          self.zoomIn();

          // Scrolling down
        } else if (deltaY > 0) {
          self.zoomOut();
        }
      });
    }, 100);
  },
};
</script>

<style scoped>
svg[role] {
  fill: #6b7280;
}
</style>


