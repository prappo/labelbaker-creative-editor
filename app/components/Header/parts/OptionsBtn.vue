<template>
  <Menu as="div" style="z-index: 999999" :class="{ 'text-right': canvasContainer.semitic === 'rtl' }"
    class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2 py-1 gap-2 text-sm font-medium text-gray-700 shadow-sm dark:bg-gray-800 dark:text-white hover:bg-gray-50">
        <Bars4Icon class="h-5 w-5" />
        {{ $t("option.file") }}
        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems style="z-index: 999999" :class="{ 'right-0': canvasContainer.semitic === 'rtl' }"
        class="absolute left-0 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white bg-slate-50/90 backdrop-blur-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <div @click="newDesign" class="flex gap-2 cursor-pointer items-center justify-between" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <PlusCircleIcon class="h-5 w-5" />
            <div class="flex-grow">{{ $t("option.new") }}</div>
          </div>
          </MenuItem>
        </div>
        <div>
          <MenuItem v-slot="{ active }">
          <div @click="save()" class="flex cursor-pointer gap-2 justify-between items-center" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <InboxArrowDownIcon class="h-5 w-5" />
            <div class="flex-grow">{{ $t("option.save") }}</div>

            <!-- <kbd
                class="md:inline-flex hidden items-center rounded-md p-1 text-sm font-sans bg-white font-medium text-slate-400"
              >
                ⌘S
              </kbd> -->
          </div>
          </MenuItem>
          <!-- <MenuItem v-slot="{ active }">
            <div
              @click="saveAsTemplateFile()"
              class="flex cursor-pointer gap-2 justify-between items-center"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
            >
              <WindowIcon class="h-5 w-5" />
              <div class="flex-grow">Save As</div>
            </div>
          </MenuItem> -->
          <!-- <MenuItem v-if="appMode === 'noAuth'" v-slot="{ active }">
          <div @click="saveToLibrary"  class="flex cursor-pointer gap-2 justify-between items-center" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <svg class="w-5 fill-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <rect x="0" fill="none" width="20" height="20" />
              <g>
                <path
                  d="M13 11V4c0-.55-.45-1-1-1h-1.67L9 1H5L3.67 3H2c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h10c.55 0 1-.45 1-1zM7 4.5c1.38 0 2.5 1.12 2.5 2.5S8.38 9.5 7 9.5 4.5 8.38 4.5 7 5.62 4.5 7 4.5zM14 6h5v10.5c0 1.38-1.12 2.5-2.5 2.5S14 17.88 14 16.5s1.12-2.5 2.5-2.5c.17 0 .34.02.5.05V9h-3V6zm-4 8.05V13h2v3.5c0 1.38-1.12 2.5-2.5 2.5S7 17.88 7 16.5 8.12 14 9.5 14c.17 0 .34.02.5.05z" />
              </g>
            </svg>
            <div class="flex-grow">{{ $t("option.save_to_media_library") }}</div>
          </div>
          </MenuItem> -->
        </div>
        <div v-if="AppSettings.enableExport">
          <MenuItem v-slot="{ active }">
          <div @click="stats.showExportModal = true" class="flex cursor-pointer gap-2" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <RocketLaunchIcon class="h-5 w-5" />
            Export As
          </div>
          </MenuItem>
        </div>
        <div>
          <!-- <MenuItem v-slot="{ active }">
          <div @click="downloadAsTemplate" class="flex cursor-pointer gap-2" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <CloudArrowDownIcon class="h-5 w-5" />
            {{ $t("option.export") }}
          </div>
          </MenuItem> -->
          <MenuItem v-slot="{ active }">
          <div @click="importFile(canvasContainer.editor)" class="flex cursor-pointer gap-2" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <CloudArrowUpIcon class="h-5 w-5" /> {{ $t("option.import") }}
          </div>
          </MenuItem>

          <!-- <MenuItem v-slot="{ active }">
            <a
              href="#"
              @click="saveAsLayout"
              class="flex gap-2"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
            >
              <InboxStackIcon class="h-5 w-5" />
              {{ $t("option.saveAsLayout") }}
            </a>
          </MenuItem> -->
        </div>
        <!-- <div class="py-1">
          <MenuItem v-slot="{ active }">
          <div @click="downloadAsImage" class="flex cursor-pointer gap-2" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <ArrowDownCircleIcon class="h-5 w-5" />
            {{ $t("option.downloadAsImage") }}
          </div>
          </MenuItem>
        </div> -->

        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <div @click="stats.showSettingsModal = true" class="flex cursor-pointer gap-2" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <Cog8ToothIcon class="h-5 w-5" />
            Settings
          </div>
          </MenuItem>
        </div>

        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <div @click="goHome" class="flex cursor-pointer gap-2" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <HomeIcon class="h-5 w-5" />
            Back to Home
          </div>
          </MenuItem>
        </div>

        <!-- <div class="py-1">
          <MenuItem v-slot="{ active }">
          <div class="flex cursor-pointer gap-2" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block text-sm',
          ]">
            <PrintBtnVue class="w-full" />
          </div>
          </MenuItem>
        </div> -->

        <!-- <div class="py-1">
          <MenuItem v-slot="{ active }">
          <div @click="stats.showConverterModal = true"  class="flex cursor-pointer gap-2" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm',
          ]">
            <CalculatorIcon class="h-5 w-5" />{{ $t("option.unitConverter") }}
          </div>
          </MenuItem>
        </div> -->
        <!-- <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
              @click="deleteSavedData"
              href="#"
              class="flex gap-2"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
            >
              <TrashIcon class="h-5 w-5" />{{ $t("option.deleteSavedData") }}
            </a>
          </MenuItem>
        </div> -->
      </MenuItems>
    </transition>
  </Menu>
</template>
  
<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { downloadAsJson, saveUserData } from "../../../libs/helper";
import PrintBtnVue from "./PrintBtn.vue";
import {
  ChevronDownIcon,
  Bars4Icon,
  ArrowDownCircleIcon,
  RocketLaunchIcon,
  PlusCircleIcon,
  CloudArrowUpIcon,
  CalculatorIcon,
  InboxIcon,
  InboxStackIcon,
  TrashIcon,
  PlayIcon,
  Cog8ToothIcon,
  InboxArrowDownIcon,
  WindowIcon,
  HomeIcon,
} from "@heroicons/vue/20/solid";
import { canvasContainer } from "../../../store/editor";

import { getCurrentInstance } from "vue";

function getProps() {
  let container = {};

  for (let index in canvasContainer) {
    if (index != "editor") {
      container[index] = canvasContainer[index];
    }
  }

  return container;
}
</script>

<script>
import { stats } from "../../../store/stats";
import { userData } from "../../../store/user";
import { TempData } from "../../../store/temp";
import { templates } from "../../../store/templates";
import { AppSettings } from "../../../store/app-settings";
import {
  importFile,
  saveAsTemplate,
  showSuccess,
  showError,
} from "../../../libs/helper";
export default {
  data() {
    return {
      stats,
      userData,
      TempData,
      templates,
      AppSettings,
      user: null,
    };
  },
  methods: {
    goHome(){
     
      // window.location.reload(labelbaker.pluginUrl)
      window.location.href = labelbaker.pluginUrl
    },
    saveToLibrary() {
      this.stats.isBusy = true;
      canvasContainer.editor
        .exportToURL(this.exportURL)
        .then((e) => {
          if (e.success) {
            this.stats.isBusy = false;
            showSuccess("Saved Image to Library");
          } else {
            this.stats.isBusy = false;
            alert("Something went wrong");
          }
        })
        .catch((err) => {
      
          this.stats.isBusy = false;
          alert("Error");
          console.log(err);
        });
    },
    newDesign() {
      // this.stats.newTemplateModal = true;
      // this.stats.showChooseNewTemplateModal = true;
      this.stats.showNewModal = true
    },
    deleteSavedData() {
      localStorage.removeItem("editorData");
    },
    saveAsTemplateFile() {
      if (this.userData.meta.isExpired && this.appMode != "noAuth") {
        showError("Your subscription expired please upgrade your account.");
        return;
      }
      this.stats.showSaveModal = true;
    },
    exportEditor() {
      canvasContainer.editor.deselect();
      downloadAsJson(
        canvasContainer.editor.editor.toJSON(),
        "editor",
        "editor",
        {},
        "download",
        canvasContainer.editor.save(1)
      );
    },
    downloadAsImage: function () {
      canvasContainer.editor.deselect();
      let dataURL = canvasContainer.editor.saveImage();
      this.downloadURI(dataURL, "image.png");
    },
    downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getProps() {
      let container = {};
      for (let index in canvasContainer) {
        if (index != "editor") {
          container[index] = canvasContainer[index];
        }
      }
      container.icons = [];
      return container;
    },
    saveFeaturedImage() {
      stats.isBusy = true;
      let apiUrl = this.serverEndpoint + '/featured-image-upload';

      let params = {
        postId: TempData.editing.id
      }

  
      canvasContainer.editor.exportToURL(apiUrl, JSON.stringify(params)).then(data => {
        stats.isBusy = false;
        showSuccess('Saved')
      }).catch(err => {
        stats.isBusy = false;
        showError('Unable to save');
        console.log(err)
      })

    },
    save() {
      if (this.userData.meta.isExpired && this.appMode != "noAuth") {
        showError("Your subscription expired please upgrade your account.");
        return;
      }
      if (this.TempData.editing) {

        if (this.TempData.editing.name === '##Featured Image##') {
          this.saveFeaturedImage();
          return;
        }
        let types = ['general'];

        if (this.TempData.templateType) {
          types = this.TempData.templateType;
        }

        let templateID = "";
        if (this.TempData.editing.id) {
          templateID = this.TempData.editing.id;
        } else {
          const uniqueId = Date.now().toString();
          this.TempData.editing.id = uniqueId;
          templateID = uniqueId;
        }
        saveAsTemplate(
          templateID,
          this.TempData.editing.name,
          this.user.email,
          canvasContainer,
          this.serverEndpoint,
          this.appMode,
          types
        ).then((e) => {
          this.templates.templates = null;
        });
        return;
      }
      this.stats.isBusy = true;
      saveUserData(
        this.serverEndpoint,
        canvasContainer.editor,
        this.getProps(),
        this.user,
        this.appMode
      )
        .then((e) => {
          this.stats.isBusy = false;
          showSuccess("Saved !");
        })
        .catch((e) => {
          showError("Unable to save");
          console.log(e);
          this.stats.isBusy = false;
        });
    },
    downloadAsTemplate() {
      canvasContainer.editor.deselect();
      canvasContainer.editor.editor.find("Image").forEach((image) => {
        let imageSrc;
        if (image.attrs.type === "svg") {
          imageSrc = image.attrs.imageSrc;
        } else {
          imageSrc = image.attrs.image.currentSrc;
        }
        image.setAttr("imageSrc", imageSrc);
      });
      downloadAsJson(
        canvasContainer.editor.editor.toJSON(),
        "template",
        "template",
        this.getProps(),
        "download",
        canvasContainer.editor.save(1)
      );
    },
    saveAsLayout() {
      canvasContainer.editor.deselect();
      downloadAsJson(
        canvasContainer.editor.editor.toJSON(),
        "layout",
        "layout",
        this.getProps()
      );
    },
    preview() {
      stats.showPreviewModal = true;
    },
  },
  mounted() {
    window.labelbakerSave = this.save;
    const app = getCurrentInstance();

   

    this._keyListener = (e) => {
      if (e.key === "i" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.preview();
      }
    };

    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  components: {
    PlayIcon,
    Cog8ToothIcon,
    InboxArrowDownIcon,
    WindowIcon,
    RocketLaunchIcon,
    HomeIcon
  },
};
</script>