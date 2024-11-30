<template>
    <div class="rounded-md border-t-gray-600 border-2 px-2 my-2">
        <div>Target Elements</div>
        <div class="flex flex-col gap-2 p-1">
            <div v-for="(element, index) in elements" :key="index">
                <span
                    class="flex w-full justify-between px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300">
                    <div class="flex flex-col">
                        {{ element.name }}
                        <select @change="(event) => setAction(index, 'image', event.target.value,)"
                            v-if="element.type === 'video' || element.type === 'audio'">
                            <option>---No Action---</option>
                            <option value="play">Play</option>
                            <option value="pause">Pause</option>
                            <!-- <option value="mute">Mute</option> -->
                        </select>
                    </div>
                    <button type="button" @click="removeElement(index)"
                        class="inline-flex w-4 h-4 rounded-full items-center p-0.5 ml-2 text-sm bg-transparent text-red-400  hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
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

        <!-- add target eleemnt button -->

       
        
        <div class="pb-2">
            
            <button id="addTargetElements" data-dropdown-toggle="addTargetDropdown"
                class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center inline-flex justify-between items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">Add target <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg></button>
            <!-- Dropdown menu -->
            <div id="addTargetDropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="addTargetElements">
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
    </div>
</template>
<script>
import { canvasContainer } from '../../../../store/editor'
import { initDropdowns, Dropdown } from 'flowbite'
export default {
    props: ['selected', 'targetFor'],
    data() {
        return {
            canvasContainer,
            elements: [],
            showDropdown: null,
            hideDropdown: null,
        }
    },
    methods: {
        setAction(index, attr, value, src = 'func') {
           
      
            this.elements[index].action.length = 0;
            this.elements[index].action.push({
                src: src,
                attr:attr,
                value: value
            })

            this.selected.setAttr(this.targetFor + 'targetElements', this.elements);
        },
        removeElement(index) {
            this.elements.splice(index, 1);
            this.selected.setAttr(this.targetFor + 'targetElements', this.elements);
        },
        addElement(event, element, action) {
            event.preventDefault();
            this.showDropdown.toggle();
            let data = {
                id: element._id,
                name: element.name(),
                action: [],
                type: element.attrs.type,
            }

            let index = this.elements.findIndex((item) => item.id === data.id);

            if (index != -1) {
                this.elements[index].action = action
                // this.elements.splice(index, 1);
            } else {
                this.elements.push(data);
            }



            this.selected.setAttr(this.targetFor + 'targetElements', this.elements);

        },
        filterList: function (elList) {
            return elList.filter(
                (el) =>
                    el.getClassName() !== "Transformer" &&
                    el.name() !== "guid-line" &&
                    el.name() !== "anchor" &&
                    el.attrs.type === "video" ||
                    el.attrs.type === "audio"
            );
        },
    },
    watch: {
        selected: function (val) {
            this.elements = this.selected.attrs?.[this.targetFor + 'targetElements'] ?? [];
        }
    },
    mounted() {
        initDropdowns();
        const showTargetEl = document.getElementById('addTargetDropdown');
        const showTriggerEl = document.getElementById('addTargetElements');


        this.showDropdown = new Dropdown(showTargetEl, showTriggerEl);

        this.elements = this.selected.attrs?.[this.targetFor + 'targetElements'] ?? [];

    }
}
</script>