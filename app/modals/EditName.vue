<template>
    <div>
        <vue-final-modal v-model="stats.editNameModal" style="z-index: 9999999" classes="modal-container"
            content-class="modal-content" @keydown.esc="stats.editNameModal = false">
            <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
                <div class="w-full flex justify-center">
                    <div class="relative w-full h-full max-w-md md:h-auto">
                        <!-- Modal content -->
                        <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" @click="stats.editNameModal = !stats.editNameModal" class="
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
                    text-base
                    font-semibold
                    text-gray-900
                    lg:text-xl
                    dark:text-white
                  ">
                                    Edit Template Name
                                </h3>
                            </div>
                            <!-- Modal body -->
                            <div class="p-6">

                                <div>
                                    <label for="template_name"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Template
                                        name</label>
                                    <input v-model="templateName" type="text" id="template_name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required>
                                </div>
                                <button @click="changeName"
                                    class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change</button>
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
import { TempData } from "../store/temp";
export default {
    components: { VueFinalModal, ModalsContainer },
    data() {
        return {
            stats, TempData,
            templateName: '',
        }
    },
    methods: {
        changeName() {
            if (!this.templateName) {
                return alert('Template name required');
            }

            // The data we want to send
            var dataToSend = {
                'template_id': this.TempData.changeTemplateId,
                'template_name': this.templateName
            };

            // Use wp.apiRequest to make the API call
            wp.apiRequest({
                path: 'labelbaker/v1/modify-template-name',
                method: 'POST',
                data: dataToSend
            }).done(function (response) {
                // Handle the response on success
          
                location.reload();
                alert(response.message);
            }).fail(function (error) {
                // Handle any errors here
                console.log(error);
                alert('Failed to modify the template.');
            });


        }
    },
    mounted() {
        this.templateName = TempData.changeTemplateName;
    }
}
</script>

