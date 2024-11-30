<template>
    <div>
        <vue-final-modal v-model="stats.showDisplayRulesModal" style="z-index: 9999" classes="modal-container"
            content-class="modal-content" @keydown.esc="stats.showDisplayRulesModal = false">
            <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
                <div class="w-full flex justify-center">
                    <div class="relative w-full h-full max-w-md md:h-auto">
                        <!-- Modal content -->
                        <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" @click="stats.showDisplayRulesModal = !stats.showDisplayRulesModal" class="
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
                ">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <!-- Modal header -->
                            <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                                <h3 class="
                                flex gap-4 items-center
                    text-base
                    font-semibold
                    text-gray-900
                    lg:text-xl
                    dark:text-white
                  ">
                                    Display Rules 
                                    <div
                                        class="px-2 shadow-md py-1 flex items-center gap-1 bg-pink-600 relative top-1 right-1 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>

                                        <span class="text-white font-normal text-sm">Pro version required</span>

                                    </div>
                                </h3>
                            </div>
                            <!-- Modal body -->
                            <div class="p-0 overflow-y-scroll max-h-[80vh]">
                                <!-- <div data-relation="" data-json='[{"settings":{"id":"Z4iND","selected":"condify_condition_browser","valueSelected":"chrome","condify_condition_operator" : "is"}},{"settings":{"id":"CdOJS","selected":"condify_condition_browser","valueSelected":"chrome","condify_condition_operator" : "is"}}]'
                                    id="wpcondify_condition_builder"></div> -->
                                <DisplayRules :json="jsonData" :relation="relation" :key="Date.now()" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { stats } from "../store/stats";
const DisplayRules = defineAsyncComponent(() => import('../components/DisplayRulesBuilder/index.vue'))
const ProBadge = defineAsyncComponent(() => import('../components/Tags/IsPro.vue'))
export default {
    components: { VueFinalModal, ModalsContainer, DisplayRules },
    data() {
        return {
            stats,
            relation: 'and',
            jsonData: [
                {
                    "settings":
                        { "id": "Z4iND", "selected": "condify_condition_browser", "valueSelected": "chrome", "condify_condition_operator": "is" }
                }
            ]
        }
    }
}
</script>

