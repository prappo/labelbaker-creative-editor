<template>
    <button
          type="button"
         title="Close"
          :class="{
            'left-2.5': canvasContainer.semitic === 'rtl',
            'right-2.5': canvasContainer.semitic !== 'rtl',
          }"
          class=" top-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white ml-10"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close</span>
        </button>
</template>

<script>
import { canvasContainer } from '../../../store/editor'
export default {
    data(){
        return {
            canvasContainer
        }
    }
}
</script>