<template>
  <div
    :class="{ hidden: responsive.hideSidebar }"
    class="
      bg-white
      dark:bg-gray-900 dark:border-gray-800
      w-20
      px-0
      flex-shrink-0
      border-r border-gray-200
      flex-col
      sm:flex
    "
  >
    <div class="h-16 hidden text-blue-500 md:flex items-center justify-center">
      <img class="px-3 mt-3" src="/logo.svg" />
    </div>
    <div
      @click="responsive.hideSidebar = !responsive.hideSidebar"
      class="md:hidden flex justify-center items-center py-4"
    >
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        id="cross"
        data-name="Flat Color"
        xmlns="http://www.w3.org/2000/svg"
        class="icon flat-color"
      >
        <path
          id="primary"
          d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
          style="fill: #9ca3af"
        ></path>
      </svg>
    </div>
    <div
      v-if="store.activeMenu === 'home'"
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-5"
    >
      <button
        @click="setActiveClass(tool.name, 'home')"
        v-for="(tool, index) in homeTools"
        :key="index"
        :class="getActiveClass(tool.name)"
        class="
          h-16
          w-16
          dark:bg-gray-700 dark:text-white
          rounded-md
          flex
          items-center
          justify-center
          flex-col
          gap-1
          hover:ring-1
        "
      >
        <img class="w-6 h-6" :src="tool.icon" />
        <span
          class="text-gray-500 font-semibold"
          style="font-size: 10px; line-height: 12px"
          >{{ $t("sidebar.toolbar." + tool.name) }}</span
        >
      </button>
    </div>
    <div
      v-if="store.activeMenu === 'designer'"
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-3"
    >
      <button
        @click="setActiveClass(tool.name, 'designer')"
        v-for="(tool, index) in tools"
        :key="index"
        :class="getActiveClass(tool.name)"
        class="
          h-16
          w-16
          dark:bg-gray-700 dark:text-white
          rounded-md
          flex
          items-center
          justify-center
          flex-col
          gap-1
          hover:ring-1
        "
      >
        <img class="w-6 h-6" :src="tool.icon" />
        <span
          class="text-gray-500 font-semibold"
          style="font-size: 10px; line-height: 12px"
          >{{ $t("sidebar.toolbar." + tool.name) }}</span
        >
      </button>
    </div>

    <div
      v-if="store.activeMenu === 'data'"
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-5"
    >
      <button
        @click="setActiveClass(tool.name, 'data')"
        v-for="(tool, index) in dataTools"
        :key="index"
        :class="getActiveClass(tool.name)"
        class="
          h-16
          w-16
          dark:bg-gray-700 dark:text-white
          rounded-md
          flex
          items-center
          justify-center
          flex-col
          gap-1
          hover:ring-1
        "
      >
        <img class="w-6 h-6" :src="tool.icon" />
        <span
          class="text-gray-500 font-semibold"
          style="font-size: 10px; line-height: 12px"
          >{{ $t("sidebar.toolbar." + tool.name) }}</span
        >
      </button>
    </div>

    <div
      v-if="store.activeMenu === 'integrations'"
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-5"
    >
      <button
        @click="setActiveClass(tool.name, 'integrations')"
        v-for="(tool, index) in integrationTools"
        :key="index"
        :class="getActiveClass(tool.name)"
        class="
          h-16
          w-16
          dark:bg-gray-700 dark:text-white
          rounded-md
          flex
          items-center
          justify-center
          flex-col
          gap-1
          hover:ring-1
        "
      >
        <img class="w-6 h-6" :src="tool.icon" />
        <span
          class="text-gray-500 font-semibold"
          style="font-size: 10px; line-height: 12px"
          >{{ $t("sidebar.toolbar." + tool.name) }}</span
        >
      </button>
    </div>

    <div
      v-if="store.activeMenu === 'templates'"
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-5"
    >
      <button
        @click="setActiveClass(tool.name, 'templates')"
        v-for="(tool, index) in templateTools"
        :key="index"
        :class="getActiveClass(tool.name)"
        class="
          h-16
          w-16
          dark:bg-gray-700 dark:text-white
          rounded-md
          flex
          items-center
          justify-center
          flex-col
          gap-1
          hover:ring-1
        "
      >
        <img class="w-6 h-6" :src="tool.icon" />
        <span
          class="text-gray-500 font-semibold"
          style="font-size: 10px; line-height: 12px"
          >{{ $t("sidebar.toolbar." + tool.name) }}</span
        >
      </button>
    </div>

    <div
      v-if="store.activeMenu === 'maker'"
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-5"
    >
      <button
        @click="setActiveClass(tool.name, 'maker')"
        v-for="(tool, index) in maker"
        :key="index"
        :class="getActiveClass(tool.name)"
        class="
          h-16
          w-16
          dark:bg-gray-700 dark:text-white
          rounded-md
          flex
          items-center
          justify-center
          flex-col
          gap-1
          hover:ring-1
        "
      >
        <img class="w-6 h-6" :src="tool.icon" />
        <span
          class="text-gray-500 font-semibold px-1"
          style="font-size: 10px; line-height: 12px"
          >{{ $t("sidebar.toolbar." + tool.name) }}</span
        >
      </button>
    </div>

    <div
      v-if="store.activeMenu === 'print'"
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-5"
    >
      <button
        @click="setActiveClass(tool.name, 'print')"
        v-for="(tool, index) in printTools"
        :key="index"
        :class="getActiveClass(tool.name)"
        class="
          h-16
          w-14
          dark:bg-gray-700 dark:text-white
          rounded-md
          flex
          items-center
          justify-center
          flex-col
          gap-1
          hover:ring-1
        "
      >
        <img class="w-6 h-6" :src="tool.icon" />
        <span
          class="text-gray-500 px-1"
          style="font-size: 10px; line-height: 12px"
          >{{ $t("sidebar.toolbar." + tool.name) }}</span
        >
      </button>
    </div>
  </div>
</template>

<script>
import {
  shapeIcon,
  settingsIcon,
  printIcon,
  layerIcon,
  dataMappingIcon,
  hardDriveIcon,
  linkIcon,
  boxIcon,
  editorIcon,
  userIcon,
  sheetIcon,
  historyIcon,
  socialIcon,
  templatesIcon,
  assetIcon,
  wooIcon,
  shippingIcon,
  newIcon,
  lernIcon,
  filesIcon,
  dashboardIcon
} from "./parts/icons";
import { store } from "../../store/menu";
import { responsive } from "../../store/responsive";
import { canvasContainer } from "../../store/editor";
export default {
  
  data() {
    return {
      activeClass: "bg-blue-100 text-blue-500 dark:bg-gray-200",
      store,
      responsive,
      tools: [
        {
          name: "templates",
          title: "Templates",
          icon: templatesIcon,
        },
        {
          name: "shape",
          title: "Tools",
          icon: shapeIcon,
        },
        {
          name: "icons",
          title: "Icons",
          icon: assetIcon,
        },

        {
          name: "layers",
          title: "Elements",
          icon: layerIcon,
        },

        {
          name: "history",
          title: "History",
          icon: historyIcon,
        },

        {
          name: "documentSettings",
          title: "Page Settings",
          icon: settingsIcon,
        },

        {
          name: "printSettings",
          title: "Print Settings",
          icon: printIcon,
        },

        {
          name: "dataMapping",
          title: "Data Mapping",
          icon: dataMappingIcon,
        },
        // {
        //   name: "editorSettings",
        //   title: "Editor Settings",
        //   icon: editorIcon,
        // },
      ],
      homeTools: [
        {
          name: "dashboard",
          title: "Dashboard",
          icon: dashboardIcon,
        },
        {
          name: "newProject",
          title: "New Project",
          icon: newIcon,
        },
        {
          name: "myTemplates",
          title: "My Templates",
          icon: templatesIcon,
        },
        // {
        //   name: "files",
        //   title: "Files",
        //   icon: filesIcon,
        // },
        // {
        //   name: "learn",
        //   title: "Learn",
        //   icon: lernIcon,
        // },
      ],
      printTools: [
        {
          name: "printSettings",
          title: "Print Settings",
          icon: printIcon,
        },
      ],
      dataTools: [
        {
          name: "localFileUpload",
          title: "Upload from disk",
          icon: hardDriveIcon,
        },
        {
          name: "importFromUrl",
          title: "Import From URL",
          icon: linkIcon,
        },
      ],
      integrationTools: [
        {
          name: "wooImport",
          title: "Import From Woocommerce",
          icon: wooIcon,
        },
      ],
      templateTools: [
        {
          name: "templates",
          title: "Templates",
          icon: shippingIcon,
        },
        {
          name: "dieCutTemplates",
          title: "Die cut Templates",
          icon: boxIcon,
        },
      ],
      maker: [

        {
          name: "layoutMaker",
          title: "Layout Maker",
          icon: templatesIcon,
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
};
</script>