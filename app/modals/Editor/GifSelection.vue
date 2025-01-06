<template>
  <div>
    <vue-final-modal
      v-model="stats.showGifModal"
      style="z-index: 9999999"
      classes="modal-container"
      content-class="modal-content"
      @keydown.esc="stats.showGifModal = false"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div class="w-full flex justify-center">
          <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div
              class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <button
                type="button"
                @click="stats.showGifModal = !stats.showGifModal"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
              <!-- Modal header -->
              <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3
                  class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white"
                >
                  Select Gif
                </h3>
              </div>
              <!-- Modal body -->
              <div class="p-6 grid grid-cols-3 gap-2">
                <div
                  v-for="gif in gifs"
                  :key="gif.name"
                  class="flex justify-center items-center"
                >
                  <img
                    :src="`${gif.src}`"
                    alt="gif"
                    class="w-full h-full object-cover"
                    @click="selectGif(gif.src)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>
  
  <script>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { stats } from "../../store/stats";
import { canvasContainer } from "../../store/editor";

import { defineAsyncComponent } from "vue";

const isPro = defineAsyncComponent(() =>
  import("../../components/Tags/IsPro.vue")
);
export default {
  components: { VueFinalModal, ModalsContainer, isPro },
  data() {
    return {
      stats,
      canvasContainer,
      gifs: [
    
        {
          name: "pointing-1",
          src: "gifs/pointing/pointing-1.gif",
        },
        {
          name: "pointing-2",
          src: "gifs/pointing/pointing-2.gif",
        },
        {
          name: "pointing-3",
          src: "gifs/pointing/pointing-3.gif",
        },
        {
          name: "pointing-4",
          src: "gifs/pointing/pointing-4.gif",
        },
        {
          name: "pointing-5",
          src: "gifs/pointing/pointing-5.gif",
        },
        {
          name: "pointing-6",
          src: "gifs/pointing/pointing-6.gif",
        },
        {
          name: "pointing-7",
          src: "gifs/pointing/pointing-7.gif",
        },
        {
          name: "pointing-8",
          src: "gifs/pointing/pointing-8.gif",
        },
        {
          name: "pointing-9",
          src: "gifs/pointing/pointing-9.gif",
        },
        {
          name: "pointing-10",
          src: "gifs/pointing/pointing-10.gif",
        },
       
        {
          name: "pointing-12",
          src: "gifs/pointing/pointing-12.gif",
        },
        {
          name: "pointing-13",
          src: "gifs/pointing/pointing-13.gif",
        },
      ],
    };
  },
  methods: {
    selectGif(src) {
      this.stats.showGifModal = false;
      this.canvasContainer.editor.addGif({
        imageSrc: src,
        type:"gif",
        x: this.canvasContainer.editor.getXCenter(
          this.canvasContainer.editor.getSize() / 2
        ),
        y: this.canvasContainer.editor.getYCenter(
          this.canvasContainer.editor.getSize() / 2
        ),
        width: this.canvasContainer.editor.getSize() / 2,
        height: this.canvasContainer.editor.getSize() / 2,
        draggable: true,
      });
    },
  },
};
</script>
  
  