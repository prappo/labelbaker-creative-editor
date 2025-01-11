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
              <div class="p-6 grid grid-cols-6 gap-2">
                <div
                  v-for="gif in gifs"
                  :key="gif.name"
                  class="flex justify-center items-center"
                >
                  <img
                    :src="`${gif.preview}`"
                    alt="gif"
                    class="w-12 h-12 object-cover cursor-pointer"
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
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-1.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-1.gif",
          category: "pointing",
        },
        {
          name: "pointing-2",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-2.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-2.gif",
          category: "pointing",
        },
        {
          name: "pointing-3",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-3.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-3.gif",
          category: "pointing",
        },
        {
          name: "pointing-4",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-4.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-4.gif",
          category: "pointing",
        },
        {
          name: "pointing-5",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-5.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-5.gif",
          category: "pointing",
        },
        {
          name: "pointing-6",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-6.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-6.gif",
          category: "pointing",
        },
        {
          name: "pointing-7",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-7.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-7.gif",
          category: "pointing",
        },
        {
          name: "pointing-8",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-8.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-8.gif",
          category: "pointing",
        },
        {
          name: "pointing-9",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-9.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-9.gif",
          category: "pointing",
        },
          {
          name: "pointing-10",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-10.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-10.gif",
          category: "pointing",
        },
       
        {
          name: "pointing-12",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-12.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-12.gif",
          category: "pointing",
        },
        {
          name: "pointing-13",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-13.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-13.gif",
          category: "pointing",
        },
        {
          name: "pointing-14",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-14.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-14.gif",
          category: "pointing",
        },
        {
          name: "pointing-15",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-15.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-15.gif",
          category: "pointing",
        },
        {
          name: "pointing-16",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-16.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-16.gif",
          category: "pointing",
        },
        {
          name: "pointing-17",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-17.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-17.gif",
          category: "pointing",
        },
        {
          name: "pointing-18",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-18.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-18.gif",
          category: "pointing",
        },
        {
          name: "pointing-19",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-19.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-19.gif",
          category: "pointing",
        },
        {
          name: "pointing-20",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-20.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-20.gif",
          category: "pointing",
        },
        {
          name: "pointing-21",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-21.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-21.gif",
          category: "pointing",
        },
        {
          name: "pointing-22",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-22.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-22.gif",
          category: "pointing",
        }  ,
        {
          name: "pointing-23",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/pointing/pointing-23.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/pointing/pointing-23.gif",
          category: "pointing",
        }  ,
        {
          name: "random-1",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/random/random-1.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/random/random-1.gif",
          category: "random",
        }  ,
        {
          name: "celebrating-1",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-1.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-1.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-2",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-2.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-2.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-3",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-3.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-3.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-4",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-4.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-4.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-5",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-5.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-5.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-6",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-6.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-6.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-7",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-7.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-7.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-8",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-8.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-8.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-9",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-9.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-9.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-10",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-10.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-10.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-11",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-11.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-11.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-12",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-12.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-12.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-13",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-13.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-13.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-14",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-14.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-14.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-15",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-15.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-15.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-16",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-16.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-16.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-17",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-17.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-17.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-18",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-18.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-18.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-19",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-19.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-19.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-20",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-20.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-20.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-21",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-21.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-21.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-22",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-22.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-22.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-23",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-23.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-23.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-24",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-24.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-24.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-25",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-25.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-25.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-26",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-26.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-26.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-27",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-27.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-27.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-28",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-28.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-28.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-29",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-29.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-29.gif",
          category: "celebrating",
        },
        {
          name: "celebrating-30",
          src: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs/celebrating/calebrating-30.gif",
          preview: "https://raw.githubusercontent.com/Labelbaker/assets/refs/heads/main/static/gifs-preview/celebrating/calebrating-30.gif",
          category: "celebrating",
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
  
  