<template>
  <div>
    <div class="relative mt-2 mb-5">
      <div class="text-xs text-gray-400 tracking-wider mb-2">
        Barcode
      </div>

      <input
        type="text"
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
        :value="selected.text().replace(/\*/g, '')"
        placeholder="Barcode"
        @input="(event) => selected.text('*' + event.target.value + '*')"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style="top:35px;transform: rotate(90deg);"
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
        @change="event => selected.fontFamily(event.target.value)"

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
        
          <option :selected="selected.fontFamily() === 'Libre Barcode 39' " value="Libre Barcode 39">Barcode 39</option>
          <option :selected="selected.fontFamily() === 'Libre Barcode 128'" value="Libre Barcode 128">Barcode 128</option>
      
      </select>
      
    </div>
    <div class="mt-2 mb-5">
      <div class="text-xs text-gray-400 tracking-wider mb-2">Size</div>
      <input class=" bg-gray-50
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
          dark:focus:border-blue-500" type="number" :value="selected.fontSize()" @input="event => selected.fontSize(parseInt(event.target.value))" />
    </div>
    <div class="relative mt-2 mb-5">
      <div class="text-xs text-gray-400 tracking-wider mb-2">Alignment</div>
      <div class="inline-flex w-full rounded-md shadow-sm" role="group">
        <button
          type="button"
          @click="selected.align('left')"
          class="
            inline-flex
            items-center
            justify-center
            py-2
            px-4
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
          "
        >
          <Bars3BottomLeftIcon class="w-5 h-5" />
        </button>
        <button
          type="button"
          @click="selected.align('center')"
          class="
            w-full
            inline-flex
            items-center
            justify-center
            py-2
            px-4
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
          "
        >
          <Bars3Icon class="w-5 h-5" />
        </button>
        <button
          type="button"
          @click="selected.align('right')"
          class="
            w-full
            inline-flex
            items-center
            justify-center
            py-2
            px-4
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
          "
        >
          <Bars3BottomRightIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {

  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3Icon,
} from "@heroicons/vue/24/outline";
export default {
  props: ["selected", "editor"],
  components: {
  
    AdjustmentsHorizontalIcon,
    Bars3Icon,
    Bars3BottomRightIcon,
    Bars3BottomLeftIcon,
  },
};
</script>