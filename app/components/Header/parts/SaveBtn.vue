<template >
  <button v-if="appMode !== 'noAuth'" @click="save" :class="{ 'ml-3': canvasContainer.semitic === 'rtl' }" class="
              h-8
              flex
              items-center
              gap-2
              px-3
              rounded-md
              shadow
              text-white
              bg-green-500
            ">
    <InboxArrowDownIcon class="h-5 w-5" />

    {{ $t("header.menu.save") }}
    <kbd class="
                md:inline-flex
                items-center
                text-sm
                font-sans font-medium
                text-slate-200
                hidden
              ">
      ⌘S
    </kbd>
  </button>
</template>

<script>
import { InboxArrowDownIcon } from "@heroicons/vue/24/outline";
import { stats } from "../../../store/stats";
import { saveUserData, saveAsTemplate } from "../../../libs/helper";
import { userData } from "../../../store/user";
import { templates } from "../../../store/templates";
import { canvasContainer } from "../../../store/editor";
import { getCurrentInstance } from "vue";
import { useToast } from "vue-toastification";
import { TempData } from "../../../store/temp"

export default {
  props: ["editor"],
  components: { InboxArrowDownIcon },
  data() {
    return {
      canvasContainer, TempData, templates,
      user: null,
      stats, userData,
    };
  },
  methods: {
    save() {
      if (this.userData.meta.isExpired && this.appMode !== 'noAuth') {
        this.toast.error("Your subscription expired please upgrade your account.", {
          position: "top-center",
          timeout: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
          rtl: false,
        });

        return;
      }

      if (this.TempData.editing) {
        saveAsTemplate(
          this.TempData.editing.id,
          this.TempData.editing.name,
          this.user.email,
          canvasContainer,
          this.serverEndpoint
        ).then(e => {
          this.templates.templates = null;
        })
        return;
      }

      let container = {};

      for (let index in canvasContainer) {
        if (index != "editor") {
          container[index] = canvasContainer[index];
        }
      }

      this.stats.isBusy = true;
      const toast = useToast();
      saveUserData(
        this.serverEndpoint,
        canvasContainer.editor,
        container,
        this.user,
        this.appMode
      ).then((e) => {
        this.stats.isBusy = false;

        toast.success("Saved !", {
          position: "bottom-center",
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
      }).catch(e => {
        this.stats.isBusy = false;
        toast.error("Unable to save !", {
          position: "bottom-center",
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
        
      });

    },
  },
  mounted() {
  

  },
};
</script>