<template>
    <div>
        <vue-final-modal v-model="stats.showConverterModal" style="z-index: 9999999" classes="modal-container"
            content-class="modal-content" @keydown.esc="stats.showConverterModal = false">
            <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
                <div class="relative w-full h-full max-w-md md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" @click="stats.showConverterModal = false" class="
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
                " >
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Close</span>
                        </button>
                        <div class="p-6 text-center">

                            <div class="mb-6 grid grid-cols-3 gap-5">
                                <div>
                                    <label for="px"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Px</label>
                                    <input type="number" id="px" v-model="px" @input="event => {inch = event.target.value / dpi ; mm = event.target.value * (25.4 / dpi)}"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required>
                                </div>

                                <div>
                                    <label for="mm"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MM</label>
                                    <input type="number"  id="mm" v-model="mm" @input="event => { px = event.target.value * ( dpi / 25.4 ) ; inch = event.target.value / 25.4 }"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required>
                                </div>

                                <div>
                                    <label for="inch"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inch</label>
                                    <input type="number" id="inch" v-model="inch" @input="event => {px = event.target.value * dpi ; mm = event.target.value * 25.4}"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required>
                                </div>

                                <div>
                                    <label for="dpi"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DPI</label>
                                    <input type="number" id="dpi" v-model="dpi" @input="event => dpi = event.target.value"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required>
                                </div>
                            </div>

                            <button @click="stats.showConverterModal = false" type="button" class="
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
                  ">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>
  
<script>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { stats } from "../store/stats";
export default {
    componenets: {
        VueFinalModal,
        ModalsContainer,
    },
    data() {
        return {
            stats,
            px:1,
            mm:72 / 25.4,
            inch: 72,
            dpi:72,
            units: {
                inch: 72,
                mm: 72 / 25.4,
                px: 1,
            }
        };
    },
};
</script>