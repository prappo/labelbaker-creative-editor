<template>
  <div>
 
    <h1>Editor Settings</h1>
    <!-- Ruler settings -->

    <div class="py-2 ring-1 rounded ring-gray-400 px-2 my-2">
      <div>
        <div class="flex items-center mb-4">
          <input
            v-model="canvasContainer.enableRuler"
            @change="rulerControl"
            id="ruler-checkbox"
            type="checkbox"
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
            for="ruler-checkbox"
            class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300"
          >
            {{  $t('properties.enableRuler') }}
          </label>
        </div>
        <label
          for="small-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >{{ $t('properties.rulerTickSize') }}</label
        >
        <input
          v-model="rulerTickSize"
          @input="changeRulerSettings"
          type="number"
          id="small-input"
          class="
            block
            w-full
            p-2
            text-gray-900
            border border-gray-300
            rounded-lg
            bg-gray-50
            sm:text-xs
            focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
        />
      </div>

      <div>
        <label
          for="small-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >{{ $t('properties.rulerTickSpacking') }}</label
        >
        <input
          v-model="rulerTickSpacing"
          @input="changeRulerSettings"
          type="number"
          id="small-input"
          class="
            block
            w-full
            p-2
            text-gray-900
            border border-gray-300
            rounded-lg
            bg-gray-50
            sm:text-xs
            focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
        />
      </div>

      <div>
        <label
          for="small-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >{{ $t('properties.rulerFontSize') }}</label
        >
        <input
          v-model="rulerFontSize"
          @input="changeRulerSettings"
          type="number"
          id="small-input"
          class="
            block
            w-full
            p-2
            text-gray-900
            border border-gray-300
            rounded-lg
            bg-gray-50
            sm:text-xs
            focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
        />
      </div>
    </div>

    <!-- Grid settings -->

    <div class="py-2 ring-1 rounded ring-gray-400 px-2 my-2">
      <div>
        <div class="flex items-center mb-4">
          <input
            v-model="canvasContainer.enableGrid"
            @change="gridControl"
            id="grid-checkbox"
            type="checkbox"
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
            for="grid-checkbox"
            class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300"
          >
            {{ $t('properties.enableGridAndSnapping') }}
          </label>
        </div>
        <div>
          <label
          for="small-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >{{ $t('properties.blockSnapSize') }}</label
        >
        <input
          v-model="canvasContainer.editor.blockSnapSize"
          @input="event => canvasContainer.editor.grid.addGrid()"
          type="number"
          id="small-input"
          class="
            block
            w-full
            p-2
            text-gray-900
            border border-gray-300
            rounded-lg
            bg-gray-50
            sm:text-xs
            focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
        />
        </div>
      </div>
    </div>

    <!-- Guide settings -->

    <!-- <div class="ring-1 rounded px-2 py-2 ring-gray-400">
      <div class="flex items-center mb-4">
        <input
          v-model="canvasContainer.enableGuide"
          id="default-checkbox"
          type="checkbox"
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
          class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300"
        >
          Enable guide
        </label>
      </div>
      <div>Ctrl+G for <b>Horizontal</b> guide</div>
      <div>Ctrl+H for <b>Vertical</b> guide</div>
      <button class="mt-5 hover:ring-1 rounded py-1 px-1" @click="clearGuide">
        Clear all guide
      </button>
    </div> -->
  </div>
</template>

<script>

import { canvasContainer } from "../../../../store/editor";
export default {
  data() {
    return {
      canvasContainer,
      rulerTickSize: canvasContainer.editor?.rulerTickSize,
      rulerTickSpacing: canvasContainer.editor.rulerTickSpacing,
      rulerFontSize: canvasContainer.editor.rulerFontSize,
    
    };
  },
  methods: {
    fit(){
      this.canvasContainer.editor.fitIntoContainer();
      this.canvasContainer.zoomScale = 0.1
    },
    clearGuide: function () {
      const elementsV = document.getElementsByClassName("vertical-line");
      const elementsH = document.getElementsByClassName("horizontal-line");
      while (elementsV.length > 0) {
        elementsV[0].parentNode.removeChild(elementsV[0]);
      }

      while (elementsH.length > 0) {
        elementsH[0].parentNode.removeChild(elementsH[0]);
      }
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

    changeRulerSettings: function () {
      this.canvasContainer.editor.rulerTickSize = this.rulerTickSize;
      this.canvasContainer.editor.rulerTickSpacing = this.rulerTickSpacing;
      this.canvasContainer.editor.rulerFontSize = this.rulerFontSize;
      this.canvasContainer.editor.ruler.addRuler();
    },
  },
};
</script>
