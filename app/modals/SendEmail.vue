<template>
    <div>
        <vue-final-modal v-model="stats.showSendEmailModal" style="z-index: 9999999" classes="modal-container"
            content-class="modal-content" @keydown.esc="stats.showSendEmailModal = false">
            <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
                <div class="w-full flex justify-center">
                    <div class="relative w-full h-full max-w-md md:h-auto">
                        <!-- Modal content -->
                        <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" @click="stats.showSendEmailModal = !stats.showSendEmailModal" class="
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
                                    Mail Settings
                                </h3>
                            </div>
                            <!-- Modal body -->
                            <div class="p-6">

                                <div>
                                    <label for="to"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
                                    <div class="relative mb-6">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z">
                                                </path>
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                            </svg>
                                        </div>
                                        <input type="email" v-model="to" id="to"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="client@email.com">
                                    </div>
                                    <label for="from"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
                                    <div class="relative mb-6">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z">
                                                </path>
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                            </svg>
                                        </div>
                                        <input type="email" v-model="from" id="from"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="me@email.com">
                                    </div>
                                    <label for="subject"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                    <div class="relative mb-6">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z">
                                                </path>
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                            </svg>
                                        </div>
                                        <input type="text" v-model="subject" id="subject"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Awesome subject">
                                    </div>
                                    <div
                                        class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                            <label for="comment" class="sr-only">Your Message</label>
                                            <textarea rows="4" v-model="message"
                                                class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                placeholder="Write your message..." required></textarea>
                                        </div>
                                        <div
                                            class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <button @click="saveSettings" type="button"
                                                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                Done
                                            </button>


                                        </div>
                                    </div>
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
import { stats } from "../store/stats";
import { canvasContainer } from "../store/editor";
export default {
    components: { VueFinalModal, ModalsContainer },
    data() {
        return {
            stats,
            canvasContainer,
            message: '',
            subject: '',
            from: '',
            to: '',
        }
    },
    methods: {
        saveSettings() {
            canvasContainer.editor.editor.setAttrs({
                mailTo: this.to,
                mailFrom: this.from,
                mailSubject: this.subject,
                mailMessage: this.message
            });

            stats.showSendEmailModal = false;
        }
    },
    mounted() {
        this.from = canvasContainer.editor.editor.getAttr('mailFrom') ?? this.userEmail;
        this.to = canvasContainer.editor.editor.getAttr('mailTo') ?? '';
        this.subject = canvasContainer.editor.editor.getAttr('mailSubject') ?? '';
        this.message = canvasContainer.editor.editor.getAttr('mailMessage') ?? '';


    }
}
</script>

