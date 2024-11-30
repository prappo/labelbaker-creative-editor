<template>
  <div class="w-full justify-center flex flex-col items-center">
    <div class="
        sticky
        w-full
        flex 
        items-center justify-between
        top-0
        z-10
        bg-gradient-to-r
        from-blue-400
        to-emerald-400
        bg-slate-50/90
        dark:bg-slate-700/90
        backdrop-blur-sm
        
      ">
      
      <div class="
          flex
          text-white
          justify-center
          gap-2
          md:items-center md:gap-10
          w-full
          
          py-3
        ">
        <div :class="{ 'bg-blue-500 text-white shadow-xl': active === 'new' }" @click="active = 'new'"
          class="px-2 py-1 rounded-full cursor-pointer hover:ring-1">
          General Template
        </div>
        <div :class="{ 'bg-blue-500 text-white shadow-xl': active === 'label' }" @click="active = 'label'"
          class="px-2 py-1 rounded-full cursor-pointer hover:ring-1">
          Label Template
        </div>


      </div>
      <div class="w-full flex justify-end">
        <button @click="closeWindow" type="button"
          class=" mr-10 bg-gray-100 text-gray-400  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
    <div class="py-5 w-full flex justify-center">
      <div v-if="active === 'new'" class="md:w-4/5 w-full px-10">
        <NewTemplate />
      </div>
      <div v-if="active === 'label'" class="w-full px-10">
        <div class="flex gap-2 justify-center py-4">
        <div :class="{ 'bg-blue-500 text-white shadow-xl': subActive === 'newLabel' }" @click="subActive = 'newLabel'"
          class="px-2 py-1 rounded-md bg-gray-200 cursor-pointer hover:ring-1">
          New Label Template
        </div>
        <div :class="{ 'bg-blue-500 text-white shadow-xl': subActive === 'labelPresets' }" @click="subActive = 'labelPresets'"
          class="px-2 py-1 rounded-md bg-gray-200 cursor-pointer hover:ring-1">
          Label Layout Presets
        </div>
      </div>
      <div class="flex justify-center">
        <NewLabelTemplate class="md:w-1/3 " v-if="subActive === 'newLabel'" />
      </div>
        
        <SheetsVue v-if="subActive === 'labelPresets'" />
      </div>

      
    </div>
  </div>
</template>

<script>
import NewLabelTemplate from "./NewLabelTemplate.vue";
import SheetsVue from "../Layouts/Sheets.vue";
import NewTemplate from "./NewTemplate.vue";
import { store } from "../../store/menu";
export default {
  components: { NewLabelTemplate, SheetsVue, NewTemplate },
  data() {
    return {
      active: "new",
      subActive:'',
      store,
    };
  },
  methods:{
    closeWindow(){
      this.store.activeMenu = 'home',
      this.store.activeTool = 'myTemplates'
    }
  }
};
</script>