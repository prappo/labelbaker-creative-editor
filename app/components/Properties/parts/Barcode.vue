<template>
  <div class="border rounded px-2 shadow-md mb-2 py-2">
    <div class="relative mt-2 mb-5">
      <div class="text-xs text-gray-400 tracking-wider mb-2">Barcode</div>
      <img class="px-2 py-3 shadow-md" :src="selected.attrs.image.currentSrc" />
      <input
        type="text"
        v-model="value"
        class="
          pl-8
          h-9
          bg-white
          border border-gray-300
          dark:border-gray-700 dark:text-white dark:bg-transparent
          w-full
          rounded-md
          text-sm
        "
        placeholder="Text"
        @input="changeBarcode"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style="bottom: 10px; transform: rotate(90deg)"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 absolute transform left-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
    </div>
    <div>
      <div class="text-xs text-gray-400 tracking-wider mb-2">Format</div>
      <select
        @change="changeBarcode"
        v-model="format"
        class="
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
        "
      >
        <option
          :selected="selected.attrs.format === option"
          v-for="(option, index) in options"
          :value="index"
          :key="index"
        >
          {{ option }}
        </option>
      </select>
      <div v-if="error" class="bg-red-100 mt-2 text-red-500 px-2 py-2">
        {{ error }}
      </div>
    </div>
    <div>
      <div class="text-xs text-gray-400 tracking-wider mb-2">Show value</div>

      <select
        @change="changeBarcode"
        v-model="showValue"
        class="
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
        "
      >
        <option
          v-for="(op, index) in showValueOptios"
          :selected="selected.attrs.dispalyValue === op.value"
          :value="op.value"
          :key="index"
        >
          {{ op.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import change from "../../../../libs/change";

export default {
  props: ["selected", "editor"],
  data() {
    return {
      format: 0,
      value: "",
      error: null,
      showValue: true,
      showValueOptios: [
        {
          title: "Yes",
          value: true,
        },
        {
          title: "No",
          value: false,
        },
      ],
      options: [
        "CODE128",
        "CODE128A",
        "CODE128B",
        "CODE128C",
        "EAN13",
        "EAN8",
        "UPC",
        "CODE39",
        "ITF14",
        "ITF",
        "MSI",
        "MSI10",
        "MSI11",
        "MSI1010",
        "MSI1110",
        "pharmacode",
      ],
    };
  },
  methods: {
    changeBarcode: function (e) {
      let data = {
        value: this.value,
        format: this.options[this.format],
        showValue: this.showValue,
      };
   
      change
        .changeBarcode(this.selected, data)
        .then((e) => (this.error = null))
        .catch((e) => {
    
          this.error = e;
        });
    },
  },
  mounted() {
    this.format = this.options.indexOf(this.selected.attrs.format);
    this.value = this.selected.attrs.barcode;
    this.showValue = this.selected.attrs.displayValue;
  },
};
</script>