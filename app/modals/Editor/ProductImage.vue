<template>
    <div>
        <vue-final-modal
      v-model="stats.productImageModal"
      style="z-index: 9999999"
      classes="modal-container"
      content-class="modal-content"
      @keydown.esc="stats.productImageModal = false"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div
      
         class="w-full flex justify-center"
        >
          <div class="relative w-full h-full max-w-md md:h-auto">
            <!-- Modal content -->
            <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                @click="stats.productImageModal = !stats.productImageModal"
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
              <!-- Modal header -->
              <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3
                  class="
                    text-base
                    font-semibold
                    text-gray-900
                    lg:text-xl
                    dark:text-white
                  "
                >
                  Product Image
                </h3>
              </div>
              <!-- Modal body -->
              <div class="px-4 py-2">
              
              <FeaturedImage :woo="true" :container="canvasContainer" />
                
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
import { defineAsyncComponent } from "vue";
import { canvasContainer } from "../../store/editor";
import { stats } from "../../store/stats";
const FeaturedImage = defineAsyncComponent(()=>import('../../components/FeaturedImage/Index.vue'))
export default {
    components:{VueFinalModal,ModalsContainer,FeaturedImage},
    data(){
        return {
            stats,canvasContainer
        }
    }
}
</script>

