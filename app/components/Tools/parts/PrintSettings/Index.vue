<template>
  <div class="w-full flex flex-col gap-2">
   

    <div v-if="!hidePrintModeBtn" class="w-full">
      <PrintModeVue />
    </div>

    <!-- Data selection -->
    <div v-if="container.printMode === 'dynamic'" class="
        flex
       
        rounded
      
        flex-col
        py-5
       
        gap-5
      ">
      <!-- Ignore first row settings -->
      <div class="flex items-center">
        <input v-model="container.ignoreFirstRow" id="ckbox-ignore-first-row" type="checkbox" class="
            w-4
            h-4
            text-blue-600
            bg-gray-100
            rounded
            border-gray-300
            focus:ring-blue-500
            dark:focus:ring-blue-600 dark:ring-offset-gray-800
            focus:ring-2
            dark:bg-gray-700 dark:border-gray-600
          " />
        <label for="ckbox-ignore-first-row" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
          $t("data.ignoreFirstRow")
        }}</label>
      </div>

      <!-- Data selection -->
      <div>
        <button @click="showDataSelection" class="mb-2 font-semibold text-gray-900 dark:text-white">
          Select Data
        </button>
        <ul class="
            w-full
            text-sm
            font-medium
            text-gray-900
            bg-white
            rounded-lg
            border border-gray-200
            dark:bg-gray-700 dark:border-gray-600 dark:text-white
          ">
          <li class="
              w-full
              rounded-t-lg
              border-b border-gray-200
              dark:border-gray-600
            ">
            <div class="flex items-center">
              <label @click="setDataSelection('printAllData')" class="
                  py-3
                  ml-2
                  w-full
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                  flex
                  gap-2
                  cursor-pointer
                ">
                <div class="w-5">
                  <CheckCircleIcon v-if="container.dataSelection === 'printAllData'" class="w-5 text-green-500" />
                </div>
                {{ $t("data.printAllData") }}
              </label>
            </div>
          </li>
          <li class="
              w-full
              rounded-t-lg
              border-b border-gray-200
              dark:border-gray-600
            ">
            <div class="flex items-center">
              <label @click="setDataSelection('printSelectedData')" class="
                  py-3
                  ml-2
                  w-full
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                  flex
                  gap-2
                  cursor-pointer
                ">
                <div class="w-5">
                  <CheckCircleIcon v-if="container.dataSelection === 'printSelectedData'"
                    class="w-5 text-green-500" />
                </div>
                {{ $t("data.printSelectedData") }}
              </label>
            </div>
          </li>
          <li class="
              w-full
              rounded-t-lg
              border-b border-gray-200
              dark:border-gray-600
            ">
            <div class="flex items-center">
              <label @click="setDataSelection('ignoreSelectedData')" for="list-radio-ignoreSelectedData" class="
                  py-3
                  ml-2
                  w-full
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                  flex
                  gap-2
                  cursor-pointer
                ">
                <div class="w-5">
                  <CheckCircleIcon v-if="container.dataSelection === 'ignoreSelectedData'"
                    class="w-5 text-green-500" />
                </div>
                {{ $t("data.ignoreSelectedData") }}
              </label>
            </div>
          </li>
          <li class="
              w-full
              rounded-t-lg
              border-b border-gray-200
              dark:border-gray-600
            ">
            <div class="flex flex-col items-center py-2 pr-3">
              <label @click="setDataSelection('range')" class="
                  py-3
                  ml-2
                  w-full
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                  flex
                  
                  gap-2
                  cursor-pointer
                ">
                <div class="w-5">
                  <CheckCircleIcon v-if="container.dataSelection === 'range'" class="w-5 text-green-500" />
                </div>
                {{ $t("data.range") }}
              </label>
              <div v-if="container.dataSelection === 'range'" class="flex gap-5 justify-between">
                <div class="px-2">
                  <small>{{ $t("data.from") }}</small>
                  <input class="
                      bg-gray-50
                      border border-gray-300
                      text-gray-900 text-sm
                      rounded-lg
                      focus:ring-blue-500 focus:border-blue-500
                      block
                      w-full
                      px-2
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-blue-500
                      dark:focus:border-blue-500
                    " :value="container.range.from" @input="
                      (event) => (container.range.from = event.target.value)
                    " type="number" min="1" />
                </div>
                <div>
                  <small>{{ $t("data.to") }}</small>
                  <input class="
                      bg-gray-50
                      border border-gray-300
                      text-gray-900 text-sm
                      rounded-lg
                      focus:ring-blue-500 focus:border-blue-500
                      block
                      w-full
                      px-2
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-blue-500
                      dark:focus:border-blue-500
                    " :value="container.range.to" @input="
                      (event) => (container.range.to = event.target.value)
                    " type="number" min="1" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex gap-5 flex-col justify-between">
      <div class="w-32">
        <label for="countries" class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-400
          ">
          {{ $t("sidebar.printSettings.printQuality.text") }}</label>
        <select @change="setQuality" class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          ">
          <option :selected="defaultQulaity === q.amount" :value="q.amount" v-for="(q, i) in quality" :key="i">
            {{
  $t(
            "sidebar.printSettings.printQuality." +
  q.value.toLocaleLowerCase()
)
            }}
          </option>
        </select>
      </div>
      <div v-if="container.printMode === 'static'">
        <h2 class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-400
          ">
          {{ $t("sidebar.printMode.numberOfLabels") }}
        </h2>
        <input class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " type="number" :value="container.numberOfCellPrint"
          @input="(e) => (container.numberOfCellPrint = e.target.value)" />
      </div>
    </div>
    <div class="py-5">
      <PrintBtn :config="getConfig()" :editor="container.editor" :printmode="container.printMode" :printconfig="getPrintConfig()"
        class="rounded-md shadow text-white bg-blue-500" />
    </div>
  </div>
</template>

<script>
import PrintModeVue from "./PrintMode.vue";
import PrintBtn from "../../../Header/parts/PrintBtn.vue";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import { stats } from '../../../../store/stats';
export default {
  props: ['hidePrintModeBtn', 'container'],
  components: { PrintModeVue, PrintBtn, CheckCircleIcon },
  data() {
    return {
 
      defaultQulaity: 1,
      defaultCellQuantity: 1,
      quality: [
        {
          amount: 1,
          value: "Low",
        },
        {
          amount: 2,
          value: "Medium",
        },
        {
          amount: 3,
          value: "High",
        },
      ],

    };
  },
  methods: {
    showDataSelection(){
      stats.tempContainer = this.container;
      stats.showDataModal = true;
    },
    setDataSelection: function (value) {
      this.container.dataSelection = value;
    },
    setQuality: function (e) {
      this.container.printQuality = e.target.value;
    },
    getConfig() {
      let data = this.container;
      if (!data.range) {
        data.range = this.container.range;
      }

      return data;
    },
    getFormat: function () {
      if (this.container.format === "custom") {
        return [this.container.pageWidth, this.container.pageHeight];
      }
      return this.container.format;
    },
    getOrientation() {
      if (this.container.format === "custom") {
        if (this.container.pageWidth > this.container.pageHeight) {
          return "l";
        }

        return "p";
      }
      return "p";
    },
    getPrintConfig() {
      
      return {
        pageWidth: this.container.pageWidth,
        pageHeight: this.container.pageHeight,
        cellWidth: this.container.cellWidth,
        cellHeight: this.container.cellHeight,
        cellPadding: this.container.cellPadding,
        pageMargin: this.container.pageMargin,
        pageMarginLeft: this.container.pageMarginLeft,
        pageMarginTop: this.container.pageMarginTop,
        cellPaddingLeft: this.container.cellPaddingLeft,
        cellPaddingTop: this.container.cellPaddingTop,
        docSize: {
          orientation: this.getOrientation(),
          unit: "pt",
          format: this.getFormat(),
        },
      };
    },
  },
  mounted() {
    
    this.defaultQulaity = this.container.printQuality;
    
  },
};
</script>
