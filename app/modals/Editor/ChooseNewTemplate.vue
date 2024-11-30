<template>
    <div>
        <vue-final-modal v-model="stats.showChooseNewTemplateModal" style="z-index: 9999999" classes="modal-container"
            content-class="modal-content" @keydown.esc="stats.showChooseNewTemplateModal = false">
            <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
                <div class="w-full flex justify-center">
                    <div class="relative w-full h-full max-w-md md:h-auto">
                        <!-- Modal content -->
                        <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button"
                                @click="stats.showChooseNewTemplateModal = !stats.showChooseNewTemplateModal" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
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
                                <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                                    New Template
                                </h3>
                            </div>
                            <!-- Modal body -->
                            <div class="p-6 grid grid-cols-2 gap-5">

                                <button @click="newTemplate('general')"
                                    class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg">

                                    <div
                                        class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-14 h-14 my-5 stroke-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
                                        </svg>

                                    </div>
                                    <div class="flex items-center w-full">
                                        <div
                                            class="text-xs py-1 px-2 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden">
                                            General Template
                                        </div>
                                    </div>
                                </button>

                                <button @click="newTemplate('label')"
                                    class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg">
                                    <div
                                        class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-14 h-14 my-5 stroke-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                                        </svg>
                                    </div>
                                    <div class="flex items-center w-full">
                                        <div
                                            class="text-xs py-1 px-2 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden">
                                            Label Template
                                        </div>
                                    </div>
                                </button>

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
export default {
    components: { VueFinalModal, ModalsContainer },
    data() {
        return {
            stats
        }
    },
    methods: {
        newTemplate(type) {
            this.stats.showChooseNewTemplateModal = false;
            if (type === 'general') {
                this.stats.newTemplateModal = true;
            }

            if (type === 'label') {
                this.stats.showNewModal = true
            }
        }
    }
}
</script>

