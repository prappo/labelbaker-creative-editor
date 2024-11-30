<template>
    <div>
        <div>
            <div :class="{ 'rounded-md': !showMediaSettings }"
                class="cursor-pointer flex justify-between rounded-tl-md rounded-tr-md px-2 w-full bg-gray-600 text-white"
                @click="showMediaSettings = !showMediaSettings">Media Settings <div
                    class="flex justify-center items-center"><span v-if="!showMediaSettings">+</span><span v-else>-</span>
                </div>
            </div>
            <div v-if="showMediaSettings" class="p-2 border">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input :checked="selected.attrs?.isMuted ?? false" type="checkbox" v-model="isEnable" value="true"
                        class="sr-only peer">
                    <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Mute</span>
                </label>

                <label class="relative inline-flex mt-2 items-center cursor-pointer">
                    <input :checked="selected.attrs?.isAutoPlay ?? false" type="checkbox" v-model="isAutoPlay" value="true"
                        class="sr-only peer">
                    <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Autoplay</span>
                </label>
            </div>
        </div>

        <div class="mt-2">

            <div :class="{ 'rounded-md': !showMediaOptions }"
                class="cursor-pointer flex justify-between rounded-tl-md rounded-tr-md px-2 w-full bg-gray-600 text-white"
                @click="showMediaOptions = !showMediaOptions">Media Options <div class="flex justify-center items-center">
                    <span v-if="!showMediaOptions">+</span><span v-else>-</span>
                </div>
            </div>
            <div v-if="showMediaOptions" class="border p-2">
                <!-- play btn -->
                <div>
                    <label for="playBtn">Play Button</label>
                    <select @change="e => selected.setAttr('playBtn', e.target.value)" id="playBtn">
                        <option>--None--</option>
                        <option :selected="el.name() === selected.getAttr('playBtn')"
                            v-for="(el, index) in filterList(canvasContainer.editor.layer.children)" :key="index"
                            :value="el.name()">{{ el.name() }}</option>
                    </select>
                </div>

                <!-- Pause btn -->
                <div>
                    <label for="pauseBtn">Pause Button</label>
                    <select @change="e => selected.setAttr('pauseBtn', e.target.value)" id="pauseBtn">
                        <option>--None--</option>
                        <option :selected="el.name() === selected.getAttr('pauseBtn')"
                            v-for="(el, index) in filterList(canvasContainer.editor.layer.children)" :key="index"
                            :value="el.name()">{{ el.name() }}</option>
                    </select>
                </div>

                <!-- Pause btn -->
                <div>
                    <label for="progressBar">Progress Bar</label>
                    <select @change="e => selected.setAttr('progressBar', e.target.value)" id="progressBar">
                        <option>--None--</option>
                        <option :selected="el.name() === selected.getAttr('progressBar')"
                            v-for="(el, index) in filterProgressBarList(canvasContainer.editor.layer.children)" :key="index"
                            :value="el.name()">{{ el.name() }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { canvasContainer } from '../../../store/editor';
export default {
    props: ['selected'],
    data() {
        return {
            canvasContainer,
            isEnable: false,
            isAutoPlay:false,
            showMediaSettings: false,
            showMediaOptions: false,
        }
    },
    methods: {
        toggle() {
            this.isEnable = this.selected.getAttr('isMuted');
            this.isAutoPlay = this.selected.getAttr('isAutoPlay');
        },
        filterList: function (elList) {
            return elList.filter(
                (el) =>
                    el.getClassName() !== "Transformer" &&
                    el.name() !== "guid-line" &&
                    el.name() !== "anchor"
            );
        },
        filterProgressBarList: function (elList) {
            return elList.filter(
                (el) =>
                    el.getClassName() === "Rect" 
                    
            );
        },
    },
    watch: {
        isEnable: function (value, oldValue) {

            this.selected.setAttr('isMuted', value)
        },
        isAutoPlay:function(value,oldValue){
            this.selected.setAttr('isAutoPlay',value);
        }
    },
    mounted() {
        this.toggle()
    }

}
</script>