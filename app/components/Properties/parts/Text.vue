<template>
  <div class="px-1">
    <div class="rounded-md">
      <div :class="{'rounded-md' : !showTextStyle}" class="cursor-pointer flex justify-between rounded-tl-md rounded-tr-md px-2 w-full bg-gray-600 text-white" @click="showTextStyle = !showTextStyle">Text Style <div class="flex justify-center items-center"><span v-if="!showTextStyle">+</span><span v-else>-</span></div></div>

      <div class="border-2 px-2" v-if="showTextStyle">
        <div class="relative mt-2 mb-5">
          <div class="text-xs text-gray-400 tracking-wider mb-2">Text Value</div>
          <input type="text" class="
          pl-8
          h-9
          bg-white
          border border-gray-300
          dark:border-gray-700 dark:text-white dark:bg-transparent
          w-full
          rounded-md
          text-sm
        " placeholder="Text" @input="changeText" :value="selected.text()" />
          <ChatBubbleBottomCenterIcon style="top: 35px" class="w-4 absolute text-gray-400 transform left-2" />
        </div>
        <div class="relative mt-2 mb-5">
          <div class="text-xs text-gray-400 tracking-wider mb-2">Type</div>
          <select @change="event => selected.setAttr('textType', event.target.value)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option :selected="selected.getAttr('textType') === 'text'" value="text">Text</option>
            <option :selected="selected.getAttr('textType') === 'date'" value="date">Date</option>
            <option :selected="selected.getAttr('textType') === 'time'" value="time">Time</option>
            <option :selected="selected.getAttr('textType') === 'number'" value="number">Number</option>

          </select>
        </div>
        <div class="relative mt-2 mb-5">
          <div class="text-xs text-gray-400 tracking-wider mb-2">Font Family</div>
          <UniversalFontPicker class="
          dark:border-gray-700 dark:text-white dark:bg-transparent
          bg-white
        " auto-load load-all-variants v-model="font" />
        </div>

        <div class="relative mt-2 mb-5">
          <div class="text-xs text-gray-400 tracking-wider mb-2">Font Size</div>
          <input type="number" class="
          pl-8
          h-9
          bg-white
          border border-gray-300
          dark:border-gray-700 dark:text-white dark:bg-transparent
          w-full
          rounded-md
          text-sm
        " placeholder="Text" @input="changeFontSize" :value="selected.fontSize()" />
          <AdjustmentsHorizontalIcon style="top: 35px" class="w-4 absolute text-gray-400 transform left-2" />
        </div>
        <div class="relative mt-2 mb-5">
          <div class="text-xs text-gray-400 tracking-wider mb-2">Alignment</div>
          <div class="inline-flex w-full rounded-md shadow-sm" role="group">
            <button type="button" @click="selected.align('left')" class="
            inline-flex
            items-center
            justify-center
            py-2
            px-2
            w-full
            text-sm
            font-medium
            text-gray-900
            bg-white
            rounded-l-lg
            border border-gray-200
            hover:bg-gray-100 hover:text-blue-500
            focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-500
            dark:bg-gray-700
            dark:border-gray-600
            dark:text-white
            dark:hover:text-white
            dark:hover:bg-gray-600
            dark:focus:ring-blue-500
            dark:focus:text-white
          ">
              <Bars3BottomLeftIcon class="w-5 h-5" />
            </button>
            <button type="button" @click="selected.align('center')" class="
            w-full
            inline-flex
            items-center
            justify-center
            py-2
            px-2
            text-sm
            font-medium
            text-gray-900
            bg-white
            border-t border-b border-gray-200
            hover:bg-gray-100 hover:text-blue-500
            focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-500
            dark:bg-gray-700
            dark:border-gray-600
            dark:text-white
            dark:hover:text-white
            dark:hover:bg-gray-600
            dark:focus:ring-blue-500
            dark:focus:text-white
          ">
              <Bars3Icon class="w-5 h-5" />
            </button>
            <button type="button" @click="selected.align('right')" class="
            w-full
            inline-flex
            items-center
            justify-center
            py-2
            px-2
            text-sm
            font-medium
            text-gray-900
            bg-white
            rounded-r-md
            border border-gray-200
            hover:bg-gray-100 hover:text-blue-500
            focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-500
            dark:bg-gray-700
            dark:border-gray-600
            dark:text-white
            dark:hover:text-white
            dark:hover:bg-gray-600
            dark:focus:ring-blue-500
            dark:focus:text-white
          ">
              <Bars3BottomRightIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 pb-2">
          <div class="w-full flex flex-col">
            <div class="text-xs text-gray-400 tracking-wider mb-2">
              Text Decoration
            </div>
            <select class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " @change="(event) => selected.textDecoration(event.target.value)">
              <option :selected="selected.textDecoration() === ''" value="">
                None
              </option>
              <option :selected="selected.textDecoration() === 'line-through'" value="line-through">
                Line through
              </option>
              <option :selected="selected.textDecoration() === 'underline'" value="underline">
                Underline
              </option>
            </select>
          </div>
          <div class="w-full">
            <div class="text-xs text-gray-400 tracking-wider mb-2">
              VerticalAlign
            </div>
            <select class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " @change="(event) => selected.verticalAlign(event.target.value)">
              <option :selected="selected.verticalAlign() === 'top'" value="top">
                Top
              </option>
              <option :selected="selected.verticalAlign() === 'middle'" value="middle">
                Middle
              </option>
              <option :selected="selected.verticalAlign() === 'bottom'" value="bottom">
                Bottom
              </option>
            </select>
          </div>
          <div class="w-full">
            <div class="text-xs text-gray-400 tracking-wider mb-2">Font Style</div>
            <select class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " @change="(event) => selected.fontStyle(event.target.value)">
              <option :selected="selected.fontStyle() === 'normal'" value="normal">
                Normal
              </option>
              <option :selected="selected.fontStyle() === 'bold'" value="bold">
                Bold
              </option>
              <option :selected="selected.fontStyle() === 'italic'" value="italic">
                Italic
              </option>
              <option :selected="selected.fontStyle() === 'italic bold'" value="italic bold">
                Italic bold
              </option>
            </select>
          </div>
          <div class="w-full">
            <div class="text-xs text-gray-400 tracking-wider mb-2">Wrap</div>
            <select class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " @change="(event) => selected.wrap(event.target.value)">
              <option :selected="selected.wrap() === 'word'" value="word">
                Word
              </option>
              <option :selected="selected.wrap() === 'char'" value="char">
                Char
              </option>
              <option :selected="selected.wrap() === 'none'" value="none">
                None
              </option>
            </select>
          </div>
          <div class="w-full">
            <div class="text-xs text-gray-400 tracking-wider mb-2">IineHeight</div>
            <input class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " type="number" min="1" step="0.1" :value="selected.lineHeight()"
              @input="(event) => selected.lineHeight(parseFloat(event.target.value))" />
          </div>
          <div class="w-full">
            <div class="text-xs text-gray-400 tracking-wider mb-2">Padding</div>
            <input class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " type="number" min="0" :value="selected.padding()"
              @input="(event) => selected.padding(parseInt(event.target.value))" />
          </div>
        </div>
      </div>
    </div>


    <div class="rounded-md my-2">
      <div :class="{'rounded-md' : !showTextOptions}" class="cursor-pointer flex justify-between rounded-tl-md rounded-tr-md px-2 w-full bg-gray-600 text-white" @click="showTextOptions = !showTextOptions">Text Options <div class="flex justify-center items-center"><span v-if="!showTextOptions">+</span><span v-else>-</span></div></div>
      <div v-if="showTextOptions" class="flex border-2 px-2 py-2 flex-col gap-4 pb-2">
        <InputField :selected="selected" :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import UniversalFontPicker from "@formester/universal-font-picker";
import {
  ChatBubbleBottomCenterIcon,
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3Icon,
} from "@heroicons/vue/24/outline";
import { defineAsyncComponent } from 'vue';

const InputField = defineAsyncComponent(() => import('./InputField.vue'))
export default {
  props: ["editor", "selected"],
  components: {
    UniversalFontPicker,
    ChatBubbleBottomCenterIcon,
    AdjustmentsHorizontalIcon,
    Bars3Icon,
    Bars3BottomRightIcon,
    Bars3BottomLeftIcon,
    InputField
  },
  data() {
    return {
      font: null,
      showTextStyle: false,
      showTextOptions:false,
    };
  },
  methods: {
    changeText: function (e) {
      this.selected.text(e.target.value);
    },
    changeFontSize: function (e) {
      this.selected.fontSize(parseInt(e.target.value));
    },
  },
  watch: {
    font(newValue, oldValue) {
      this.selected.fontFamily(newValue);
    },
  },

  mounted() {
    this.font = this.selected.fontFamily();
  },
};
</script>