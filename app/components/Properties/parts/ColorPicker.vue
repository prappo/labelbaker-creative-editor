<template>
  <div v-if="selected &&
    selected.attrs.type !== 'shape' &&
    selected.attrs.type !== 'group'
    " class="rounded-md">
    <div class="relative">
      <div>
        <div class="flex flex-col space-y-4">
          <div class="space-y-2">
            <div class="text-base font-semibold text-neutral-8">
              Fill
            </div>
            <div class="flex flex-wrap gap-2">
              <button v-for="(color, index) in fillColors" :key="index" @click="updateColor(color)"
                class="relative rounded-full box-border transition-all outline-none border border-[rgba(2,8,48,0.15)] hover:border-neutral-alpha-3 before:rounded-full before:content-[''] before:absolute before:duration-200 before:w-[calc(100%+2px)] before:h-[calc(100%+2px)] before:-top-[1px] before:-left-[1px] active:before:bg-neutral-alpha-3 after:rounded-full after:content-[''] after:absolute after:duration-200 after:w-[calc(100%+2px)] after:h-[calc(100%+2px)] after:-top-[1px] after:-left-[1px] focus-visible:ring-[3px] focus-visible:ring-accent-alpha-5 active:before:border active:before:border-[rgba(2,8,48,0.15)] w-5 h-5"
                :style="{ backgroundColor: color }"></button>

              <!-- color picker toggle -->
              <button @click="showColorPicker = !showColorPicker" type="button"
                class="group relative overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(34,37,71,0.15)] w-5 h-5"
                style="
                  background-image: conic-gradient(
                    from 180deg at 50% 50%,
                    rgb(255, 0, 0) 0deg,
                    rgb(255, 234, 0) 61.87deg,
                    rgba(128, 255, 0, 0.824) 118.12deg,
                    rgb(0, 255, 255) 180deg,
                    rgb(0, 0, 255) 243.75deg,
                    rgb(255, 0, 255) 303.75deg,
                    rgb(255, 0, 0) 360deg
                  );
                ">
                <span
                  class="absolute inset-0 bg-[rgba(34,37,71,0.15)] opacity-0 transition-opacity group-active:opacity-100"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full py-3" v-if="showColorPicker">
        <ColorPicker :visible-formats="['hex']" v-if="!isIgnoredForColor(selected.attrs.type)" :color="getSelectedColor()"
          @color-change="updateFontColor" class="mb-2 dark:border-gray-700 dark:text-white dark:bg-transparent">
        </ColorPicker>
      </div>
    </div>

    <!-- Opacity -->
    <div v-if="selected.attrs.type !== 'stage'" class="relative mt-2 mb-5">
      <div class="flex flex-col justify-between items-center gap-2 w-full text-xs text-gray-400 tracking-wider mb-2">
        <div class="flex gap-3">
          {{ $t("properties.opacity") }}
          <div>({{ selected.opacity() }})</div>
        </div>
        <input @input="changeOpacity" type="range" min="0" max="1" :value="selected.opacity()"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" step="0.01" />
      </div>
    </div>
  </div>
</template>

<script>
import { ColorPicker } from "vue-accessible-color-picker";

export default {
  components: { ColorPicker },
  props: ["selected", "editor"],
  data() {
    return {
      showColorPicker: false,
      fillColors: [
        "rgb(0, 0, 0)",
        "rgb(255, 255, 255)",
        "rgb(244, 67, 54)",
        "rgb(233, 30, 99)",
        "rgb(156, 39, 176)",
        "rgb(103, 58, 183)",
        "rgb(63, 81, 181)",
        "rgb(33, 150, 243)",
        "rgb(3, 169, 244)",
        "rgb(0, 188, 212)",
        "rgb(0, 150, 136)",
        "rgb(76, 175, 80)",
        "rgb(139, 195, 74)",
        "rgb(205, 220, 57)",
        "rgb(255, 235, 59)",
        "rgb(255, 193, 7)",
        "rgb(255, 152, 0)",
        "rgb(255, 87, 34)",
      ],
    };
  },
  methods: {
    isIgnoredForColor(type) {
      let types = ["line", "anchor"];
      if (types.includes(type)) {
        return true;
      }
      return false;
    },
    getSelectedColor(){
      if(this.selected.attrs.type === 'stage'){
        return this.selected.find(".stageBackground")[0].fill();
        
      }

      return this.selected.fill();
    },
    updateFontColor: function (e) {
      if(this.selected.attrs.type === 'stage'){
        this.selected.find(".stageBackground")[0].fill(e.colors.hex);
        return;
      }
      this.selected.fill(e.colors.hex);
    },
    updateColor(color) {
      if(this.selected.attrs.type === 'stage'){
        this.selected.find(".stageBackground")[0].fill(color);
        return;
      }
      this.selected.fill(color);
    },
    changeOpacity: function (e) {
      this.selected.opacity(parseFloat(e.target.value));
    },
  },
  
};
</script>