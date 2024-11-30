<template>

  <div class="sm:p-4 p-4 ">
    <div class="flex w-full items-center mb-7">
      <div class="w-full" id="stage-parent-1">
        <div class="shadow-xl" id="myCanvas"></div>
      </div>
    </div>
  </div>

</template>

<script>

import { canvasContainer } from '../store/editor';
const sheet = {
  SL100: {
    name: '2.625" x 1" Address Labels',
    width: 595,
    height: 842,
    lebel: {
      width: 100,
      height: 50,
    },
  },
};


const config = {
  width: 100,
  height: 50,
}
export default {
  components: {},
  props: ['myEditor'],
  data() {
    return {
      name: 'prappo',
      editor: null,
      canvasContainer
    };
  },
  methods: {
    fitStageIntoParentContainer(myEditor) {
      var container = document.querySelector('#stage-parent-1');
      var containerWidth = container.offsetWidth;
      var sceneWidth = config.width;
      var sceneHeight = config.height;
      var scale = containerWidth / sceneWidth;
      myEditor.editor.width(sceneWidth * scale);
      myEditor.editor.height(sceneHeight * scale);
      myEditor.editor.scale({ x: scale, y: scale });
    },
  },
 
};
</script>