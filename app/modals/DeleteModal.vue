<template>
    <div>
        <vue-final-modal v-model="stats.showDeleteModal" style="z-index: 9999999" classes="modal-container"
            content-class="modal-content" @keydown.esc="stats.showDeleteModal = false">
            <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
                <div class="w-full flex justify-center">
                    <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button"
                                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                @click="stats.showDeleteModal = false">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-6 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete <b>{{ TempData.changeTemplateName }}</b>?
                                    

                                </h3>
                                <button data-modal-hide="popup-modal" @click="deleteBannerTemplate" type="button"
                                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button @click="stats.showDeleteModal = false" type="button"
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    No, cancel
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
import { stats } from "../store/stats";
import { showError, showSuccess } from "../libs/helper";
import { deleteTemplate, getTemplates } from "../libs/template";
import { TempData } from "../store/temp";
export default {
    components: { VueFinalModal, ModalsContainer },
    data() {
        return {
            stats, TempData
        }
    },
    methods: {
        deleteBannerTemplate() {
            deleteTemplate(this.TempData.changeTemplateId, this.serverEndpoint, "", this.appMode)
                .then((e) => {
                    stats.showDeleteModal = false;
                    showSuccess("Template Deleted");
                    getTemplates(this.serverEndpoint, "", this.appMode).then(
                        (templates) => {
                            window.location.reload()

                        }
                    );
                })
                .catch((err) => {
                    stats.showDeleteModal = false;
                    showError("Unbale to delete");
                });
        },
    }
}
</script>

