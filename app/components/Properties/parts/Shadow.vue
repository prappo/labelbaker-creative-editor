<template>
    <div v-if="selected.attrs.type !== 'shape'" >

        <div :class="{'rounded-md' : !showShadow}" class="cursor-pointer flex justify-between rounded-tl-md rounded-tr-md px-2 w-full bg-gray-600 text-white" @click="showShadow = !showShadow">Shadow <div class="flex justify-center items-center"><span v-if="!showShadow">+</span><span v-else>-</span></div></div>
            
        <div class="p-2 border" v-if="showShadow">
            <div v-if="isAvilable('shadowColor')" class="relative">
                <div class="flex justify-between w-full text-xs tracking-wider mb-1">
                    Color
                    <SimpleColorPickerVue :color="selected.shadowColor()" @color-change="changeShadowColor" />
                </div>
            </div>

            <div v-if="isAvilable('shadowBlur')" class="relative flex justify-between">
                <div class="text-xs w-full flex items-center tracking-wider">Blur</div>
                <input type="number" 
                    class=" h-9 bg-white border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-transparent w-full rounded-md text-sm"
                    @input="changeShadowBlur" :value="selected.shadowBlur()" />
                
            </div>

            <div v-if="isAvilable('shadowOffsetX')" class="relative mt-2 mb-5">
                <div class="text-xs tracking-wider mb-1">
                    Offset
                </div>
                <div class="flex gap-6">
                    <div class="relative">
                        <input style="padding-left: 25px" type="number"
                            class="h-9 bg-white border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-transparent w-full rounded-md text-sm"
                            @input="changeShadowOffsetX" :value="selected.shadowOffsetX()" />
                        <div
                            class="w-2 absolute dark:text-white flex items-center justify-center rounded bg-blue-500 px-2 text-white transform left-2 top-2">
                            X
                        </div>
                    </div>
                    <div class="relative">
                        <input type="number" style="padding-left: 25px"
                            class="h-9 bg-white border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-transparent w-full rounded-md text-sm"
                            @input="changeShadowOffsetY" :value="selected.shadowOffsetY()" />
                        <div
                            class="w-2 absolute dark:text-white flex items-center justify-center rounded bg-blue-500 px-2 text-white transform left-2 top-2">
                            Y
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isAvilable('shadowOpacity')" class="relative mt-2 mb-5">
                <div
                    class="flex flex-col justify-between items-center gap-2 w-full text-xs text-gray-400 tracking-wider mb-2">
                    <div class="flex gap-3">
                        {{ $t("properties.opacity") }}
                        <div>({{ selected.shadowOpacity() }})</div>
                    </div>
                    <input @input="(e) => selected.shadowOpacity(e.target.value)" type="range" min="0" max="1"
                        :value="selected.shadowOpacity()"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        step="0.01" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const SimpleColorPickerVue = defineAsyncComponent(() => import('../../SimpleColorPicker.vue'))
export default {
    props: ['selected'],
    data(){
        return {
            showShadow:false,
        }
    },
    components: { SimpleColorPickerVue },
    methods: {
        changeShadowColor: function (e) {
            this.selected.shadowColor(e);
        },
        changeShadowBlur: function (e) {
            this.selected.shadowBlur(parseInt(e.target.value));
        },
        changeShadowOffsetY: function (e) {
            this.selected.shadowOffsetY(parseInt(e.target.value));
        },
        changeShadowOffsetX: function (e) {
            this.selected.shadowOffsetX(parseInt(e.target.value));
        },
        isAvilable(functionName) {
            if (typeof this.selected[functionName] === "function") {
                return true;
            }

            return false;
        },
    }
}
</script>