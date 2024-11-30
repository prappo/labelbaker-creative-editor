<template>
    <div class="">

        <div>
            <label for="onClickAction" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                Action</label>

            <select id="onClickAction"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                @change="seAction">
                <option>-- No Action --</option>
                <option :selected="selected.attrs?.onClickAction === 'goToLink'" value="goToLink">Go to Link</option>
                <option :selected="selected.attrs?.onClickAction === 'showHide'" value="showHide">Show/Hide element</option>
            </select>
        </div>

        <div class="py-5" v-if="action === 'goToLink'">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OnClick link</label>
            <input :value="selected.attrs.url" @input="$event => selected.setAttr('url', $event.target.value)" type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://yourlink.com" required>
        </div>


        <ShowHideElement :selected="selected" showHideFor="onclick_" v-if="action === 'showHide'" />

        <SendEmail class="py-1" :selected="selected" />
        <SaveEntries class="py-1" :selected="selected" />
        <!-- <Manipulation :selected="selected" targetFor="onclick_" /> -->
        <Animation class="py-1" :selected="selected" easingFor="onclick" />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const Animation = defineAsyncComponent(() => import('./Animation.vue'));
const ShowHideElement = defineAsyncComponent(() => import('./ShowHideElement.vue'))
const Manipulation = defineAsyncComponent(() => import('./Manipulation.vue'))
const SendEmail = defineAsyncComponent(()=> import('./parts/SendMail.vue'))
const SaveEntries = defineAsyncComponent(()=>import('./parts/SaveEntries.vue'))
export default {
    props: ['selected'],
    data() {
        return {
            action: null
        }
    },
    components: {
        Animation,
        ShowHideElement,
        Manipulation,
        SendEmail,
        SaveEntries
    },
    methods: {
        seAction(e) {
            this.action = e.target.value;
            this.selected.setAttr('onClickAction', this.action);

        }
    },
    mounted() {
        this.action = this.selected.attrs?.onClickAction ?? '-- No Action --';
    }
}
</script>