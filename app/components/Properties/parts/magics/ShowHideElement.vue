<template>
    <div>
        <!-- elements -->
        <div class="flex flex-col gap-2 py-4">
            <div v-for="(element, index) in elements" :key="index">
                <!-- <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

</button>
                {{ element.name }} ( {{ element.action }}) -->

                <span id="badge-dismiss-green" :class="{
                    'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300': element.action === 'show',
                    'text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300': element.action === 'hide',
                }" class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium ">
                    {{ element.name }}
                    <button type="button" @click="removeElement(index)" :class="{
                        'text-green-400  hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300': element.action === 'show',
                        'text-yellow-400  hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300': element.action === 'hide'
                    }" class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm "
                        data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
                        <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Remove</span>
                    </button>
                </span>

            </div>

        </div>

        <!-- add show ele button -->
        <div class="mb-5">
            <button id="addShowElements" data-dropdown-toggle="addShowElementsDropdown"
                class="text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-small rounded-lg text-sm px-1.5 py-1 text-center inline-flex justify-between items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                type="button">Add show element <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg></button>
            <!-- Dropdown menu -->
            <div id="addShowElementsDropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="addShowElements">
                    <li v-for="(element, index) in filterList(
                        canvasContainer.editor.layer.children
                    ).slice().reverse()" :key="index">
                        <a @click="(event) => addElement(event, element, 'show')" href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{
                                element.name() }}</a>
                    </li>

                </ul>
            </div>
        </div>


        <!-- add hide element button -->
        <div>
            <button id="addHideElements" data-dropdown-toggle="addHideElementsDropdown"
                class="text-white w-full bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-small rounded-lg text-sm px-1.5 py-1 text-center inline-flex justify-between items-center dark:bg-yellow-600 dark:yellow:bg-blue-700 dark:focus:ring-yellow-800"
                type="button">Add hide element <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg></button>
            <!-- Dropdown menu -->
            <div id="addHideElementsDropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="addHideElements">
                    <li v-for="(element, index) in filterList(
                        canvasContainer.editor.layer.children
                    ).slice().reverse()" :key="index">
                        <a @click="(event) => addElement(event, element, 'hide')" href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{
                                element.name() }}</a>
                    </li>

                </ul>
            </div>
        </div>


    </div>
</template>
<script>
import { canvasContainer } from '../../../../store/editor'
import { initDropdowns, Dropdown } from 'flowbite'
export default {
    props: ['selected', 'showHideFor'],
    data() {
        return {
            canvasContainer,
            elements: [],
            showDropdown: null,
            hideDropdown: null,
        }
    },
    methods: {
        removeElement(index) {
            this.elements.splice(index, 1);
            this.selected.setAttr(this.showHideFor + 'showHideElements', this.elements);
        },
        addElement(event, element, action) {
            event.preventDefault();

            let data = {
                id: element._id,
                name: element.name(),
                action: action
            }

            let index = this.elements.findIndex((item) => item.id === data.id);

            if (index != -1) {
                this.elements[index].action = action
                // this.elements.splice(index, 1);
            } else {
                this.elements.push(data);
            }

            if (data.action === 'show') {
                this.showDropdown.hide();
            } else {
                this.hideDropdown.hide();
            }

            this.selected.setAttr(this.showHideFor + 'showHideElements', this.elements);

        },
        filterList: function (elList) {
            return elList.filter(
                (el) =>
                    el.getClassName() !== "Transformer" &&
                    el.name() !== "guid-line" &&
                    el.name() !== "anchor"
            );
        },
    },
    watch: {
        selected: function (val) {
            this.elements = this.selected.attrs?.[this.showHideFor + 'showHideElements'] ?? [];
        }
    },
    mounted() {
        initDropdowns();
        const showTargetEl = document.getElementById('addShowElementsDropdown');
        const showTriggerEl = document.getElementById('addShowElements');

        const hideTargetEl = document.getElementById('addHideElementsDropdown');
        const hideTriggerEl = document.getElementById('addHideElements');
        this.showDropdown = new Dropdown(showTargetEl, showTriggerEl);
        this.hideDropdown = new Dropdown(hideTargetEl, hideTriggerEl);
        this.elements = this.selected.attrs?.[this.showHideFor + 'showHideElements'] ?? [];

    }
}
</script>