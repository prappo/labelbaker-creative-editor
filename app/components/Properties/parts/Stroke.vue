<template>
    <div>
        <div :class="{'rounded-md' : !showStroke}" class="cursor-pointer flex justify-between rounded-tl-md rounded-tr-md px-2 w-full bg-gray-600 text-white" @click="showStroke = !showStroke">Stroke <div class="flex justify-center items-center"><span v-if="!showStroke">+</span><span v-else>-</span></div></div>
        <div v-if="showStroke" class="border p-2">
            <div>
                <label class="inline-flex relative items-center cursor-pointer">
                    <input :checked="selected.fillAfterStrokeEnabled()" type="checkbox" @change="
                        selected.fillAfterStrokeEnabled()
                            ? selected.fillAfterStrokeEnabled(false)
                            : selected.fillAfterStrokeEnabled(true)
                        " class="sr-only peer" />
                    <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span class="ml-3 text-[12px] font-sm text-gray-900 dark:text-gray-300">Fill After Stroke</span>
                </label>
            </div>

            <div class="relative gap-2 justify-between mt-2 mb-5 flex">
                <div class="text-xs flex w-full items-center">
                    Stroke width
                </div>
                <input type="number"
                    class="h-9 bg-white border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-transparent w-full rounded-md text-sm"
                    placeholder="Stroke wide" @input="changeStroke" :value="selected.strokeWidth()" />
                
            </div>

            <div class="relative mt-2 mb-5">
                <div class="flex justify-between w-full text-xs">
                    Stroke color
                    <SimpleColorPickerVue :color="selected.stroke()" @color-change="colorStrokeChange" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const SimpleColorPickerVue = defineAsyncComponent(() => import('../../SimpleColorPicker.vue'))
export default {
    props: ['selected'],
    components: { SimpleColorPickerVue },
    data(){
        return {
            showStroke:false,
        }
    },
    methods: {
        changeStroke: function (e) {
            this.selected.strokeWidth(parseInt(e.target.value));
        },
        colorStrokeChange: function (e) {
            this.selected.stroke(e);
        },

    }
}
</script>