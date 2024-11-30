<template>
    <vue-final-modal
        v-model="stats.newTemplateModal"
        style="z-index: 9999999"
        classes="modal-container"
        content-class="modal-content"
        @keydown.esc="stats.newTemplateModal = false"
      >
        <div
          style="height: 100vh"
          class="flex justify-center items-center h-full w-full"
        >
          <div class="relative w-full h-full max-w-5xl md:h-auto">
            
            <NewTemplate :showCloseBtn="true"  />
          </div>
        </div>
      </vue-final-modal>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { stats } from "../../store/stats";
import { templates } from "../../store/templates";
const NewTemplate = defineAsyncComponent(() => import('../../components/Home/NewTemplate.vue'))
export default {
    components:{VueFinalModal,ModalsContainer,NewTemplate},
    data(){
        return {
            stats,
            templates
        }
    }
}
</script>