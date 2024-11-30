<template>
  <div>
    <div>
      <div v-if="imageSrc" class="w-15 flex justify-center">
        <img :src="imageSrc" />
      </div>
    </div>
    <div v-if="colors" class="grid grid-cols-10 my-2">
      <div v-for="(color, index) in colors" :key="index">
        <input
          @input="changeColor($event, color)"
          class="w-4 h-5 border-none color"
          type="color"
          :value="color"
        />
      </div>
    </div>
    <button class="bg-blue-500 text-white px-3 py-2 rounded my-2 shadow" @click="changeSVG">Change SVG</button>
  </div>
</template>

<script>
import getSVGColors from "get-svg-colors-browser";
import { canvasContainer } from "../../../store/editor";

export default {
  props: ["editor", "selected"],
  data() {
    return {
      canvasContainer,
      colors: null,
      svg: null,
      currentColor: null,
      svgSelector: null,
      imageSrc: null,
    };
  },

  methods: {
    changeSVG: function () {
      let input = document.createElement("input");
      let self = this;
      input.type = "file";
      input.onchange = () => {
        input.files[0].arrayBuffer().then(function (arrayBuffer) {
          let importedFiles = new TextDecoder().decode(arrayBuffer);
          try {
            self.changeE(importedFiles);
          } catch (err) {}
        });
      };

      input.click();
    },
    changeE(svgString) {
      let encodedSvg = "data:image/svg+xml;base64," + window.btoa(svgString);
      fetch(encodedSvg)
        .then((res) => res.blob())
        .then((e) => {
      
          let imageUrl = window.URL.createObjectURL(e);
          this.canvasContainer.editor.updateImage(this.selected, imageUrl, {
            imageSrc: encodedSvg,
          });
          setTimeout(() => {
            this.canvasContainer.editor.transform.nodes([]);
            this.canvasContainer.editor.transform.nodes([this.selected]);
            this.getColors();
          }, 100);

          this.imageSrc = encodedSvg;
        });
    },
    changeColor(e, oldColor) {
      let newColor = e.target.value.toUpperCase();
      oldColor = oldColor.toUpperCase();
      let imageSrc = this.selected.attrs.imageSrc;
      let decodedSvg = imageSrc.replace("data:image/svg+xml;base64,", "");
      let svg = window.atob(decodedSvg);
      let newSvg = svg.replace(oldColor, newColor);

      let encodedSvg = "data:image/svg+xml;base64," + window.btoa(newSvg);
      this.imageSrc = encodedSvg;
      this.changeE(newSvg);
    },

    getColors() {
      let imageSrc = this.svgSelector.attrs.imageSrc;
      this.imageSrc = imageSrc;
      let svg = window.atob(imageSrc.replace("data:image/svg+xml;base64,", ""));

      this.svg = svg;

      getSVGColors(svg).then((colors) => {
        this.colors = colors.fills;
      });
    },
  },
  watch: {
    selected: function (newVal, oldVal) {
      this.svgSelector = newVal;
      this.getColors();
    },
  },
  mounted() {
    this.svgSelector = this.selected;
    this.getColors();
  },
};
</script>
