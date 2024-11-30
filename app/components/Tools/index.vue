<template>
  <div
    :class="{ hidden: responsive.hideSidebar }"
    class="xl:w-52 w-48 flex-shrink-0 h-full overflow-y-auto lg:block fixed md:relative md:z-0 z-50 bg-gray-100 dark:bg-gray-900"
  >
    <div class="grid grid-cols-2 gap-2 px-2 py-2">
      <button
        :class="getActiveClass(tool.name)"
        @click="setActiveClass(tool.name, 'designer')"
        class="flex rounded-lg p-1 flex-col items-center"
        v-for="(tool, index) in tools"
        :key="index"
      >
        <img class="w-4" :src="tool.icon" />
        <!-- <span style="font-size: 10px">{{
          $t("sidebar.toolbar." + tool.name)
        }}</span> -->
      </button>
    </div>
    <!-- shapes start -->
    <shapeVue
      class="p-2"
      v-if="store.activeTool === 'shape'"
      :editor="editor"
    />
    <!-- shapes end -->

    <!-- templates start -->
    <Templates :sidebar="true" v-if="store.activeTool === 'templates'" />
    <!-- templates end -->

    <!-- Document settings start -->

    <NewDesignVue
      class="p-2"
      v-if="store.activeTool === 'documentSettings'"
      :editor="editor"
    />

    <!-- Document settings end -->

    <!-- PrintSettings start -->

    <PrintSettings
      class="p-2"
      :container="canvasContainer"
      v-if="store.activeTool === 'printSettings'"
      :editor="editor"
    />

    <!-- PritSettings end -->

    <!-- Layers -->

    <Layers class="p-2" v-if="store.activeTool === 'layers'" />
    <History class="p-2" v-if="store.activeTool === 'history'" />

    <!-- Editor settings -->

    <DataMapping
      class="p-2"
      :container="canvasContainer"
      v-if="store.activeTool === 'dataMapping'"
    />
    <Icons class="p-2" v-if="store.activeTool === 'icons'" />
  </div>
</template>

<script>
// active class names : ring-2 ring-blue-500 shadow-lg
import { defineAsyncComponent } from "vue";
const shapeVue = defineAsyncComponent(() => import("./parts/Shapes/Index.vue"));
const NewDesignVue = defineAsyncComponent(() =>
  import("./parts/DocumentSettings/Index.vue")
);
const PrintSettings = defineAsyncComponent(() =>
  import("./parts/PrintSettings/Index.vue")
);
const Layers = defineAsyncComponent(() => import("./parts/Layers/Index.vue"));
const History = defineAsyncComponent(() => import("./parts/History/Index.vue"));
const DataMapping = defineAsyncComponent(() =>
  import("./parts/Datamapping/Index.vue")
);
const EditorSettings = defineAsyncComponent(() =>
  import("./parts/EditorSettings/Index.vue")
);
const Icons = defineAsyncComponent(()=>import("./parts/Icons/Index.vue")) ;

import { store } from "../../store/menu";
import { responsive } from "../../store/responsive";
import { canvasContainer } from "../../store/editor";


import {
  shapeIcon,
  layerIcon,
  templatesIcon,
  assetIcon,
} from "../Sidebar/parts/icons";

export default {
  props: ["editor"],
  components: {

    shapeVue,
    Icons,
    NewDesignVue,
    PrintSettings,
    Layers,
    History,
    EditorSettings,
    DataMapping,
  },
  data() {
    return {
      store,
      responsive,
      canvasContainer,
      activeClass:
        "bg-blue-100 shadow-sm text-blue-600 dark:text-blue-200 dark:bg-gray-600",
      tools: [
        {
          name: "shape",
          title: "Tools",
          icon: shapeIcon,
        },
        // {
        //   name: "templates",
        //   title: "Templates",
        //   icon: templatesIcon,
        // },

        // {
        //   name: "icons",
        //   title: "Icons",
        //   icon: assetIcon,
        // },

        {
          name: "layers",
          title: "Elements",
          icon: layerIcon,
        },
      ],
    };
  },

  methods: {
    getActiveClass: function (toolName) {
      if (toolName === store.activeTool) {
        return this.activeClass;
      }

      return "";
    },
    setActiveClass: function (toolName, tab) {
      this.store.activeTool = toolName;
      this.store.activeMenu = tab;
      if (toolName != "dataMapping") {
        canvasContainer.editor.resetMark();
      }
    },
  },
  mounted(){
    this.store.activeTool = 'shape';
    this.store.activeMenu = 'designer';
  }
};
</script>