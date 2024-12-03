<template>
  <div>
    <!-- Main editor container -->
    <div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <div class="flex-grow overflow-hidden h-full flex flex-col">
        <!-- Header component -->
        <Header />

        <!-- Main editor area -->
        <div class="flex-grow flex overflow-x-hidden">
          <!-- Left sidebar tools panel -->
          <Tools :editor="editor" />

          <!-- Main canvas viewport -->
          <div id="editor-viewport" class="flex-grow bg-gray-400 dark:bg-gray-900 overflow-y-auto relative">
            <!-- Settings overlay -->
            <Settings :editor="editor" />

            <!-- Canvas container -->
            <div @click="performViewportClick" class="sm:p-4 p-4">
              <div class="flex w-full items-center mb-7">
                <div style="height: 80vh" class="w-full" id="stage-parent-1">
                  <div class="flex justify-center" id="myCanvas"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right sidebar properties panel -->
          <Properties :editor="editor" />
          
          <!-- Context menu -->
          <ContextMenuVue :editor="editor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useToast } from "vue-toastification";
import { Editor } from "../src/editor";

// Async component imports for better performance
const Tools = defineAsyncComponent(() => import("./components/Tools/index.vue"));
const Header = defineAsyncComponent(() => import("./components/Header/Index.vue"));
const Settings = defineAsyncComponent(() => import("./components/Settings.vue"));
const Properties = defineAsyncComponent(() => import("./components/Properties/index.vue"));
const ContextMenuVue = defineAsyncComponent(() => import("./components/ContextMenu.vue"));

// Store imports
import { store } from "./store/menu";
import { AppSettings } from "./store/app-settings";
import { templates } from "./store/templates";
import { canvasContainer } from "./store/editor";
import { EditorSettings } from "./store/settings";
import { stats } from "./store/stats";
import { responsive } from "./store/responsive";
import { userData } from "./store/user";
import { TempData } from "./store/temp";

// Helper functions
import { saveUserData, saveAsTemplate } from "./libs/helper";

export default {
  name: 'Editor',
  components: {
    Tools,
    Header,
    Settings,
    Properties,
    ContextMenuVue,
  },

  data() {
    return {
      editor: null,
      store,
      userData,
      TempData,
      stats,
      templates,
      AppSettings,
      canvasContainer,
      EditorSettings,
      vcount: 0,
      hcount: 0,
      responsive,
    };
  },

  methods: {
    // Handle viewport click
    performViewportClick() {
      responsive.hideProperties = true;
      responsive.hideSidebar = true;
    },

    // Toggle ruler visibility
    rulerControl() {
      this.canvasContainer.editor.enableRuler = this.canvasContainer.enableRuler;
      this.canvasContainer.editor.ruler.addRuler();
    },

    // Toggle grid visibility
    gridControl() {
      this.canvasContainer.editor.enableGrid = this.canvasContainer.enableGrid;
      this.canvasContainer.editor.grid.addGrid();
    },

    // Initialize keyboard shortcuts
    initKeyboardShortcuts() {
      this._keyListener = this.handleKeyboardShortcuts.bind(this);
      document.addEventListener("keydown", this._keyListener);
    },

    // Handle keyboard shortcuts
    handleKeyboardShortcuts(e) {
      // Save shortcut (Ctrl/Cmd + S)
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.handleSave();
      }

      // Undo shortcut (Ctrl/Cmd + Z)
      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.editor.undo();
      }

      // New label shortcut (Ctrl/Cmd + L)
      if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.stats.showNewModal = true;
      }

      // Handle arrow key navigation for selected objects
      switch (e.key) {
        case 'ArrowUp':
          if (this.canvasContainer.editor.selected) {
            this.canvasContainer.editor.selected.y(
              this.canvasContainer.editor.selected.y() - 1
            );
          }
          break;
        case 'ArrowDown':
          if (this.canvasContainer.editor.selected) {
            this.canvasContainer.editor.selected.y(
              this.canvasContainer.editor.selected.y() + 1
            );
          }
          break;
        case 'ArrowLeft':
          if (this.canvasContainer.editor.selected) {
            this.canvasContainer.editor.selected.x(
              this.canvasContainer.editor.selected.x() - 1
            );
          }
          break;
        case 'ArrowRight':
          if (this.canvasContainer.editor.selected) {
            this.canvasContainer.editor.selected.x(
              this.canvasContainer.editor.selected.x() + 1
            );
          }
          break;
      }
    },

    // Handle save functionality
    handleSave() {
      if (this.TempData.editing.id) {
        saveAsTemplate(
          this.TempData.editing.id,
          this.TempData.editing.name,
          this.userData.details.email,
          this.canvasContainer,
          this.serverEndpoint,
          this.appMode
        ).then(() => {
          this.templates.templates = null;
        });
        return;
      }

      let container = {};
      for (let index in this.canvasContainer) {
        if (index != "editor") {
          container[index] = this.canvasContainer[index];
        }
      }

      this.stats.isBusy = true;
      saveUserData(this.serverEndpoint, this.editor, container, this.userData)
        .then(() => {
          this.stats.isBusy = false;
          const toast = useToast();
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
        })
        .catch(() => {
          alert("Unable to save data");
        });
    }
  },

  mounted() {
    // Initialize editor
    const config = {
      width: parseInt(this.canvasContainer.cellWidth),
      height: parseInt(this.canvasContainer.cellHeight),
      container: "myCanvas",
      containerWrapper: "stage-parent-1",
      pageHeight: parseInt(this.canvasContainer.pageHeight),
      pageWidth: parseInt(this.canvasContainer.pageWidth),
    };

    // Create editor instance
    const myEditor = new Editor(config);
    this.canvasContainer.editor = myEditor;
    this.editor = myEditor;
    
    // Development mode exposure
    if (import.meta.env.MODE === "development") {
      window.editor = myEditor;
    }

    // Use nextTick to ensure DOM is fully rendered
    this.$nextTick(() => {
      // Initial fit
      myEditor.fitIntoContainer();
      
      // Add small delay as backup to ensure everything is loaded
      setTimeout(() => {
        myEditor.fitIntoContainer();
      }, 1000);
    });

    // Handle window resize
    window.addEventListener("resize", () => myEditor.fitIntoContainer());

    // Initialize keyboard shortcuts
    this.initKeyboardShortcuts();

    // Load semitic setting if exists
    if (localStorage.getItem("semitic")) {
      this.canvasContainer.semitic = localStorage.getItem("semitic");
    }

    // Update Konva content class
    document
      .querySelector("div.konvajs-content")
      .classList.replace("konvajs-content", "label-baker-content");
  },
};
</script>
