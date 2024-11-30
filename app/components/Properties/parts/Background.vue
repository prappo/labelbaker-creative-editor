<template>
  <div v-if="editor">
    <div class="font-semibold text-sm">{{ $t('properties.backgroundSettings') }}</div>
    <div class="text-xs py-4  tracking-wider">
        {{ $t("properties.backgroundColorText") }}
      </div>
    <!-- background color picker -->
    <ColorPicker :selected="canvasContainer.editor.editor"/>
    

    <div class="py-5">
      <EditorSettings />
    </div>
   

   
  </div>
</template>

<script>


import { canvasContainer } from "../../../store/editor";
import EditorSettings from '../../Tools/parts/EditorSettings/Index.vue'
import { defineAsyncComponent } from 'vue';
const ColorPicker = defineAsyncComponent(()=>import('./ColorPicker.vue'))
export default {
  components: { EditorSettings,ColorPicker },
  data() {
    return {
      backgroundColor: null,
      canvasContainer,
      editor: null,
      selected: null,
    };
  },
  methods: {
    setBackgroundColor(color) {
      this.selected.fill(color.colors.hex);
    },
    setBorder(e){
      let val = parseInt(e.target.value);
      this.selected.strokeWidth(val)

    }
  },
  mounted() {
    setTimeout(() => {
      this.editor = this.canvasContainer.editor;
      this.selected = this.editor.editor.find(".stageBackground")[0];
      this.backgroundColor = this.selected.fill();
    }, 100);
  },
};
</script>