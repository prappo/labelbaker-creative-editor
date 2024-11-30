<template>
    <div class="flex flex-col gap-2 w-full">

        <div class="py-2">
            <label class="relative inline-flex items-center cursor-pointer">
                <input :checked="selected.attrs?.[animationFor + 'animationEnable'] ?? false" type="checkbox"
                    v-model="isEnable" value="true" class="sr-only peer">
                <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Animation</span>
            </label>
        </div>

        <div v-if="isEnable">
            <div class="flex justify-between mb-4">
                <button @click="animationType = 'default'"
                    :class="{ 'bg-blue-500': animationType === 'default', 'bg-gray-500': animationType !== 'default' }"
                    class="text-white rounded-full px-2 py-1">Default</button>
                <button @click="animationType = 'custom'"
                    :class="{ 'bg-blue-500': animationType === 'custom', 'bg-gray-500': animationType !== 'custom' }"
                    class=" text-white rounded-full px-2 py-1">Custom</button>
            </div>

            <div v-if="animationType === 'default'">
                <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    @change="applyAnimation">
                    <option>--None--</option>
                    <option v-for="(option, index) in selectOptions" :key="index" :value="option.value" :selected="option.value === selected.attrs[animationFor + 'animation']">{{ option.text }}
                    </option>
                    <!-- <option value="leftToRight">Left To Right</option>
                    <option value="easingLeftToRight">Easing Left To Right</option>
                    <option value="easingRightToTheLeft">Easing Right To The Left</option>
                    <option value="twistyRotatedRightToTheLeft">Twisty Rotated Right To The Left</option>
                    <option value="rotateExitRight">Rotate Exit Right</option>
                    <option value="fadeInItem">FadeIn Item</option>
                    <option value="pulse">Pulse</option>
                    <option value="jello">Jello</option>
                    <option value="tada">Tada</option>
                    <option value="spring">Spring</option>
                    <option value="spellTowardsTheScreen">Spell Towards The Screen</option>
                    <option value="shrinkToCanvas">Shrink To Canvas</option>
                    <option value="opacityFadeOut">Opacity FadeOut</option>
                    <option value="opacityFadeIn">Opacity FadeIn</option>
                    <option value="typewriting">Typewriting (text effect)</option>
                  
                 
                    <option value="fallingAndBouncing">Falling And Bouncing</option>
                    <option value="twistyFallingAndBouncing">Twisty Falling And Bouncing</option>
                    <option value="backEasingMiddleToTop">Back Easing Middle To Top</option>
                    <option value="middleToTopAndRotateClassicNegative">Middle To Top And Rotate Classic Negative</option>
                    <option value="middleToTopAndRotateClassicPositive">Middle To Top And Rotate Classic Positive</option>
                    <option value="middleToTopAndRotateNegative">Middle To Top And Rotate Negative</option>
                    <option value="middleToTopAndRotatePositive">Middle To Top And Rotate Positive</option>

                    <option value="centeredResizingAndRotationingOnTheMiddle">Centered Resizing And Rotationing On The
                        Middle</option>
                    <option value="centeredResizingOnTheMiddle">Centered Resizing On The Middle</option>

                    <option value="flipinX">Flip in X</option>
                    <option value="strobeLightEffectForText">Strobe Light Effect</option>
                    <option value="flipOutX">Flip Out X</option>
                    <option value="zoomOutDown">Zoom Out Down</option> -->
                </select>
            </div>

            <div v-if="animationType === 'custom'" class="flex flex-col gap-2">
                <div>
                    <label for="easingSelection"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Easing</label>

                    <select id="easingSelection"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        @change="setEasing">
                        <option>-None-</option>
                        <option :selected="easing.name === selected.attrs[animationFor + 'easing']"
                            v-for="(easing, index) in easings" :key="index">
                            {{ easing.name }}</option>
                    </select>
                </div>

                <div>
                    <label for="easingDuration"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                    <div class="flex gap-3 items-center">
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Duration" id="easingDuration" type="number"
                            :value="selected.attrs?.[animationFor + 'easingDuration'] ?? 2"
                            @input="(event) => selected.setAttr(animationFor + 'easingDuration', event.target.value)" />
                        <div>Sec</div>
                    </div>
                </div>

                <div>
                    <label for="easingStart" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                        at</label>
                    <div class="flex gap-3 items-center">
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Start at" id="easingStart" type="number"
                            :value="selected.attrs?.[animationFor + 'easingStart'] ?? 0"
                            @input="(event) => selected.setAttr(animationFor + 'easingStart', event.target.value)" />
                        <div>Sec</div>
                    </div>


                </div>

                <div>
                    <div>
                        <label class="relative w-full inline-flex my-2 items-center cursor-pointer">
                            <input :checked="selected.attrs?.[animationFor + 'easingLoop'] ?? false" type="checkbox"
                                v-model="isLoop" value="true" class="sr-only peer">
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                            <span class="ml-3 text-[12px] font-medium text-gray-900 dark:text-gray-300">Reverse on finish</span>
                        </label>
                    </div>
                </div>

                <!-- properties -->
                <div class="flex flex-col gap-4">
                    <!-- position -->
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                        <div class="flex gap-2">
                            <div class="flex flex-col">
                                <span
                                    >
                                    X
                                </span>
                                <input type="number" @input="(event) => updateProperties('x', event.target.value)"
                                    :value="selected.attrs?.[animationFor + 'easingProperties']?.x ?? selected.x()"
                                    class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                            <div class="flex flex-col">
                                <span>
                                    Y
                                </span>
                                <input type="number" @input="(event) => updateProperties('y', event.target.value)"
                                    :value="selected.attrs?.[animationFor + 'easingProperties']?.y ?? selected.y()"
                                    class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>

                    </div>

                    <!-- dimention -->

                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dimention</label>
                        <div class="flex gap-2">
                            <div class="flex flex-col">
                                <span
                                    >
                                    Width
                                </span>
                                <input type="number" @input="(event) => updateProperties('width', event.target.value)"
                                    :value="selected.attrs?.[animationFor + 'easingProperties']?.width ?? selected.width()"
                                    class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Width">
                            </div>

                            <div class="flex flex-col">
                                <span
                                    >
                                    Height
                                </span>
                                <input type="number" @input="(event) => updateProperties('height', event.target.value)"
                                    :value="selected.attrs?.[animationFor + 'easingProperties']?.height ?? selected.height()"
                                    class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Height">
                            </div>
                        </div>

                    </div>

                    <!-- opacity -->

                    <div>

                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opacity ({{
                            selected.attrs?.[animationFor + 'easingProperties']?.opacity ?? selected.opacity() }})</label>
                        <input type="range" max="1" min="0" step="0.1"
                            @input="(event) => updateProperties('opacity', event.target.value)"
                            :value="selected.attrs?.[animationFor + 'easingProperties']?.opacity ?? selected.opacity()"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">

                    </div>

                    <!-- Scale -->

                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Scale</label>
                        <div class="flex flex-col gap-2">
                            <div class="flex">
                                <span
                                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    ScaleX
                                </span>
                                <input type="number"
                                    class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    @input="(event) => updateProperties('scaleX', event.target.value)"
                                    :value="selected.attrs?.[animationFor + 'easingProperties']?.scaleX ?? selected.scaleX()"
                                    placeholder="scaleX">
                            </div>

                            <div class="flex">
                                <span
                                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    ScaleY
                                </span>
                                <input type="number" @input="(event) => updateProperties('scaleY', event.target.value)"
                                    :value="selected.attrs?.[animationFor + 'easingProperties']?.scaleY ?? selected.scaleY()"
                                    class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="scaleY">
                            </div>
                        </div>

                    </div>

                    <!-- rotation -->
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rotation</label>
                        <div class="flex flex-col gap-2">
                            <div class="flex">
                                <span
                                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    Angle
                                </span>
                                <input type="number"
                                    class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    @input="(event) => updateProperties('rotation', event.target.value)"
                                    :value="selected.attrs?.[animationFor + 'easingProperties']?.rotation ?? selected.rotation()"
                                    placeholder="0°">
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </div>



    </div>
</template>

<script>
import { canvasContainer } from '../../../../store/editor';
export default {
    props: ['selected', 'easingFor'],
    data() {
        return {
            isLoop: false,
            isEnable: false,
            loopIntervals: [],
            canvasContainer,
            animationType: 'default',
            animationFor: this.easingFor ?? 'common_',
            selectOptions: [
               
                { value: "leftToRight", text: "Left To Right" },
                { value: "easingLeftToRight", text: "Easing Left To Right" },
                { value: "easingRightToTheLeft", text: "Easing Right To The Left" },
                { value: "twistyRotatedRightToTheLeft", text: "Twisty Rotated Right To The Left" },
                { value: "rotateExitRight", text: "Rotate Exit Right" },
                { value: "fadeInItem", text: "FadeIn Item" },
                { value: "pulse", text: "Pulse" },
                { value: "jello", text: "Jello" },
                { value: "tada", text: "Tada" },
                { value: "spring", text: "Spring" },
                { value: "spellTowardsTheScreen", text: "Spell Towards The Screen" },
                { value: "shrinkToCanvas", text: "Shrink To Canvas" },
                { value: "opacityFadeOut", text: "Opacity FadeOut" },
                { value: "opacityFadeIn", text: "Opacity FadeIn" },
                { value: "typewriting", text: "Typewriting (text effect)" },
                { value: "fallingAndBouncing", text: "Falling And Bouncing" },
                { value: "twistyFallingAndBouncing", text: "Twisty Falling And Bouncing" },
                { value: "backEasingMiddleToTop", text: "Back Easing Middle To Top" },
                { value: "middleToTopAndRotateClassicNegative", text: "Middle To Top And Rotate Classic Negative" },
                { value: "middleToTopAndRotateClassicPositive", text: "Middle To Top And Rotate Classic Positive" },
                { value: "middleToTopAndRotateNegative", text: "Middle To Top And Rotate Negative" },
                { value: "middleToTopAndRotatePositive", text: "Middle To Top And Rotate Positive" },
                { value: "centeredResizingAndRotationingOnTheMiddle", text: "Centered Resizing And Rotationing On The Middle" },
                { value: "centeredResizingOnTheMiddle", text: "Centered Resizing On The Middle" },
                { value: "flipinX", text: "Flip in X" },
                { value: "strobeLightEffectForText", text: "Strobe Light Effect" },
                { value: "flipOutX", text: "Flip Out X" },
                { value: "zoomOutDown", text: "Zoom Out Down" },
            ],
            easings: [
                { name: "Linear" },
                { name: "EaseIn" },
                { name: "EaseOut", },
                { name: "EaseInOut", },
                { name: "BackEaseIn", },
                { name: "BackEaseOut", },
                { name: "BackEaseInOut", },
                { name: "ElasticEaseIn", },
                { name: "ElasticEaseOut", },
                { name: "ElasticEaseInOut", },
                { name: "BounceEaseIn", },
                { name: "BounceEaseOut", },
                { name: "BounceEaseInOut", },
                { name: "StrongEaseIn", },
                { name: "StrongEaseOut", },
                { name: "StrongEaseInOut", },
            ]
        };
    },
    watch: {
        animationType:function(value,oldValue){
            this.selected.setAttr(this.animationFor + 'animationType', value);
        },
        selected: function (value, oldValue) {
         
            this.defineToggles();
        },
        isLoop: function (value, oldValue) {

            this.selected.setAttr(this.animationFor + 'easingLoop', value)
        },
        isEnable: function (value, oldValue) {

            this.selected.setAttr(this.animationFor + 'animationEnable', value)
        }

    },
    methods: {
        applyAnimation(event) {
            let animationName = event.target.value;
            this.selected.setAttr(this.animationFor + 'animation', animationName)
            this.canvasContainer.editor.animation(animationName, this.selected)
        },
        updateProperties(key, value) {
            const propertiesKey = this.animationFor + 'easingProperties';

            this.selected.setAttrs({
                [propertiesKey]: {
                    ...this.selected.attrs[propertiesKey],
                    [key]: value
                }
            })
        },
        defineToggles() {
            this.isLoop = this.selected.attrs?.[this.animationFor + 'easingLoop'] ?? false;
            this.isEnable = this.selected.attrs?.[this.animationFor + 'animationEnable'] ?? false;
        },
        loopSettings(event) {
        
        },
        setEasing(event) {
            let easing = event.target.value;
            this.selected.setAttr(this.animationFor + "easing", easing);
        }
    },
    mounted() {
        this.defineToggles();
    }
}
</script>