<template>
  <div>
    <vue-final-modal
      v-model="stats.showInstallScriptModal"
      style="z-index: 9999999"
      classes="modal-container"
      content-class="modal-content"
      @keydown.esc="stats.showInstallScriptModal = false"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div class="w-full flex justify-center">
          <div class="relative w-full h-full max-w-xl md:h-auto">
            <!-- Modal content -->
            <div
              class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <button
                type="button"
                @click="
                  stats.showInstallScriptModal = !stats.showInstallScriptModal
                "
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                <span class="sr-only">Close modal</span>
              </button>
              <!-- Modal header -->
              <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3
                  class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white"
                >
                  Script Installer
                </h3>
              </div>
              <!-- Modal body -->
              <div class="p-6">
                <div class="grid gap-3 grid-cols-3">
                  <div
                  @click="install(index)"
                    v-for="(s, index) in scriptsList"
                    :key="index"
                    class="group  bg-white p-1 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 cursor-pointer hover:ring-blue-500 hover:shadow-lg"
                  >
                  <isProTag v-if="s.isPro" />
                    <div
                      class="flex gap-2 pt-2 flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative"
                    >
                      <img :src="s.image" class="w-10 h-10" alt="profile" />
                      <div>{{ s.name }}</div>
                    </div>
                    <div class="flex items-center w-full">
                      <div
                        
                        class="text-xs cursor-pointer py-1 px-1 w-full leading-none dark:bg-gray-900 text-center bg-blue-100 text-blue-500 rounded-md truncate md:block hidden"
                      >
                        Install
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { stats } from "../store/stats";
import { countdown , incrementAndDecrement , addToCartFunc, select} from "../libs/scripts";
import { installScript } from "../libs/helper";
import CountDownIcon from "../assets/icons/countdown.svg";
import IncrementAndDecrementIcon from "../assets/icons/increment-and-decrement.svg"
import SelectIcon from "../assets/icons/select.svg";
import AddToCartIcon from "../assets/icons/add-to-cart.svg";
import { defineAsyncComponent } from 'vue';
const isProTag = defineAsyncComponent(()=>import('../components/Tags/IsPro.vue'));
export default {
  components: { VueFinalModal, ModalsContainer,isProTag },
  data() {
    return {
      stats,
      scriptsList: [
        {
          name: "Countdown",
          image: CountDownIcon,
          script: countdown,
          isPro:false,
        },
        {
          name: "Increment & Decrement",
          image: IncrementAndDecrementIcon,
          script: incrementAndDecrement,
          isPro:false,
        },
        {
          name: "Add to cart",
          image: AddToCartIcon,
          script: addToCartFunc,
          isPro:true,
        },
        {
          name: "Select",
          image: SelectIcon,
          script: select,
          isPro:false,
        },
      ],
    };
  },

  methods: {
    install(index) {
      if(this.scriptsList[index].isPro && this.isPro('yes')){
        alert('Require Pro Version');
        return;
      }
      installScript(this.scriptsList[index].script);
      this.stats.showInstallScriptModal = false;
      this.stats.refresh = Date.now();
    },
  },
};
</script>

