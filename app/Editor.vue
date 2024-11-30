<template>
  <div>
   
    <div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
     
      <div class="flex-grow overflow-hidden h-full flex flex-col">
   
        <Header />
        <div :class="{ hideme: store.activeMenu !== 'designer' }" class="flex-grow flex overflow-x-hidden">
          <!-- tools -->

          <Tools :editor="editor" />
          <!-- Middle section -->
          <div id="editor-viewport" class="flex-grow bg-gray-400 dark:bg-gray-900 overflow-y-auto relative">
            <!-- Settings section -->
            <Settings :editor="editor" />

            <div @click="performViewportClick" class="sm:p-4 p-4">
              <div class="flex w-full items-center mb-7">
                <div style="height: 80vh" class="w-full" id="stage-parent-1">
                  <div class="flex justify-center" id="myCanvas"></div>
                </div>
              </div>
            </div>
          </div>

          <Properties   :editor="editor" />
          <ContextMenuVue  :editor="editor" />
        </div>

      </div>

    </div>
  </div>
</template>
  
<script>
import { defineAsyncComponent } from "vue";
import { Editor } from "../src/editor";
// import Tools from "./components/Tools/index.vue";
const Tools = defineAsyncComponent(() =>
  import("./components/Tools/index.vue")
);

// import Header from "./components/Header/Index.vue";
const Header = defineAsyncComponent(() =>
  import("./components/Header/Index.vue")
);

// import Sidebar from "./components/Sidebar/Index.vue";
const Sidebar = defineAsyncComponent(() =>
  import("./components/Sidebar/Index.vue")
);

// import Settings from "./components/Settings.vue";
const Settings = defineAsyncComponent(() =>
  import("./components/Settings.vue")
);

// import Properties from "./components/Properties/index.vue";
const Properties = defineAsyncComponent(() =>
  import("./components/Properties/index.vue")
);

// import ContextMenuVue from "./components/ContextMenu.vue";
const ContextMenuVue = defineAsyncComponent(() =>
  import("./components/ContextMenu.vue")
);


import { store } from "./store/menu";
import { AppSettings } from "./store/app-settings";
import { templates } from "./store/templates";
import { canvasContainer } from "./store/editor";
import { EditorSettings } from "./store/settings";
import { stats } from "./store/stats";
import { responsive } from "./store/responsive";
import { userData } from "./store/user";
import { TempData } from "./store/temp";





import { saveUserData, getUserData, saveAsTemplate } from "./libs/helper";





import { getCurrentInstance } from "vue";
import { useToast } from "vue-toastification";
import { enc, useIt } from "./libs/helper";
import { getTemplateById } from "./libs/template"

export default {
  components: {
    Tools,
    Header,
    Sidebar,
    Settings,
    Properties,


 
    ContextMenuVue,

  },

  data() {
    return {
      name: "prappo",
      editor: null,
      store,
      userData,
      TempData,
      isExpired: false,
      stats,
      templates,
      AppSettings,
      canvasContainer,
      EditorSettings,
      isLoogedIn: false,
      vcount: 0,
      hcount: 0,
      responsive,
    };
  },

  methods: {
    changeRoute(route) {
      const routeList = {
        "#/dashboard": {
          activeMenu: "home",
          activeTool: "myTemplates",
        },
        "#/templates": {
          activeMenu: "home",
          activeTool: "myTemplates",
        },
        "#/new": {
          activeMenu: "home",
          activeTool: "newProject",
        },
        "#/editor": {
          activeMenu: "designer",
          activeTool: "shape",
        },
        "#/maker": {
          activeMenu: "maker",
          activeTool: "layoutMaker",
        },
        "#/license": {
          activeMenu: "license",
          activeTool: "licenseEntry",
        },
        "#/banners": {
          activeMenu: "banners",
          activeTool: "list",
        },
        "#/popups": {
          activeMenu: "popups",
          activeTool: "list",
        },
        "#/labels": {
          activeMenu: "labels",
          activeTool: "list",
        },
        "#/apps": {
          activeMenu: "apps",
          activeTool: "list",
        },
        "#/thumbnails": {
          activeMenu: "thumbnails",
          activeTool: "list",
        },
        "#/products": {
          activeMenu: "products",
          activeTool: "list",
        },
        "#/email": {
          activeMenu: "email",
          activeTool: "list",
        },
        "#/generators": {
          activeMenu: "generators",
          activeTool: "list",
        },
        "#/forms": {
          activeMenu: "forms",
          activeTool: "list",
        },
      };

      const templateID = (url) => {
        // Define the regex pattern for matching "#/editor/{template_id}"
        const pattern = /^#\/editor\/(\w+)$/;

        // Test if the URL matches the pattern
        const match = url.match(pattern);

        // If there is a match, return the captured template_id, otherwise return null
        return match ? match[1] : null;
      };

      const isEditorUrl = (url) => {

        // Define the regex pattern for matching "#/editor/{template_id}"
        const pattern = /^#\/editor\/\w+$/;

        // Test if the URL matches the pattern
        return pattern.test(url);
      };

      if (routeList[route] || isEditorUrl(route)) {
        if (isEditorUrl(route)) {

          this.store.activeMenu = routeList['#/editor'].activeMenu;
          this.store.activeTool = routeList['#/editor'].activeTool;

          // Go to editor page to edit template or image

          setTimeout(() => {
            stats.isBusy = true;
            const id = templateID(route); // get template id or post data

            if (id) {
              // if editor is bening called to edit post thumbnail
              if (id.includes('post')) {
                let postData = id.split('_')
                let postId = postData[1]


                wp.apiRequest({
                  path: "labelbaker/v1/featured-image?post_id=" + postId
                }).done(data => {

                  TempData.editing.id = postId;
                  TempData.templateType = ['']
                  TempData.editing.name = "##Featured Image##"
                  useIt(data, 'image');
                  stats.isBusy = false;
                }).fail(err => {
                  TempData.editing.id = postId;
                  TempData.editing.name = "##Featured Image##"

                  stats.isBusy = false;
                })
              } else {
                // otherwise find template and import on editor to edit
                getTemplateById(id, this.serverEndpoint).then(data => {
                  useIt(data);
                  stats.isBusy = false;
                }).catch(e => {
                  // alert('Template not found')
                  // location.href = document.referrer
                  stats.isBusy = false;

                  return;

                })
              }


            }

            this.canvasContainer.editor.fitIntoContainer();
          }, 500);
        } else {
          let isCreated = false;
          if (route === '#/editor' && this.TempData.editing.name && this.TempData.templateType && !isCreated) {
         
              let templateID = Date.now().toString();
              saveAsTemplate(
                templateID,
                this.TempData.editing.name,
                this.userData.details.email,
                this.canvasContainer,
                this.serverEndpoint,
                this.appMode,
                this.TempData.templateType
              ).then((e) => {
                getTemplateById(templateID, this.serverEndpoint).then(data => {
                  useIt(data);
                  stats.isBusy = false;
                }).catch(e => {
                  // alert('Template not found')
                  // location.href = document.referrer
                  stats.isBusy = false;
                  isCreated = true;
                  return;

                })
              });
        
          }
          this.store.activeMenu = routeList[route].activeMenu;
          this.store.activeTool = routeList[route].activeTool;
        }

        // if (route === "#/editor") {
        //   setTimeout(() => {
        //     this.canvasContainer.editor.fitIntoContainer();
        //   }, 500);
        // }
      }
    },
    performViewportClick() {
      responsive.hideProperties = true;
      responsive.hideSidebar = true;
    },
    rulerControl: function () {
      if (this.canvasContainer.enableRuler) {
        this.canvasContainer.editor.enableRuler = true;
      } else {
        this.canvasContainer.editor.enableRuler = false;
      }
      this.canvasContainer.editor.ruler.addRuler();
    },

    gridControl: function () {
      if (this.canvasContainer.enableGrid) {
        this.canvasContainer.editor.enableGrid = true;
      } else {
        this.canvasContainer.editor.enableGrid = false;
      }
      this.canvasContainer.editor.grid.addGrid();
    },
  },
  mounted() {
   

    const config = {
      width: parseInt(this.canvasContainer.cellWidth),
      height: parseInt(this.canvasContainer.cellHeight),
      container: "myCanvas",
      containerWrapper: "stage-parent-1",
      pageHeight: parseInt(this.canvasContainer.pageHeight),
      pageWidth: parseInt(this.canvasContainer.pageWidth),
    };

    const myEditor = new Editor(config);
    this.canvasContainer.editor = myEditor;
    if (import.meta.env.MODE === "development") {
      window.editor = myEditor;
    }

    this.editor = myEditor;
    myEditor.fitIntoContainer();
    window.addEventListener("resize", function () {
      myEditor.fitIntoContainer();
    });

    const app = getCurrentInstance();
  
   

    if (localStorage.getItem("semitic")) {
      this.canvasContainer.semitic = localStorage.getItem("semitic");
    }

    this._keyListener = function (e) {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.

        if (this.TempData.editing.id) {
          saveAsTemplate(
            this.TempData.editing.id,
            this.TempData.editing.name,
            this.userData.details.email,
            this.canvasContainer,
            this.serverEndpoint,
            this.appMode
          ).then((e) => {
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

        saveUserData(this.serverEndpoint, this.editor, container, user)
          .then((e) => {
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
          .catch((e) => {
            alert("Unable to save data");
          });
      }

      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.
        this.editor.undo();
      }

      // New label
      if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.
        this.stats.showNewModal = true;
      }



      // object move

      switch (e.key) {
        case 'ArrowUp':
          canvasContainer.editor.selected.y(
            canvasContainer.editor.selected.y() - 1
          )
          break;
        case 'ArrowDown':
          canvasContainer.editor.selected.y(
            canvasContainer.editor.selected.y() + 1
          )
          break;
        case 'ArrowLeft':
          canvasContainer.editor.selected.x(
            canvasContainer.editor.selected.x() - 1
          )
          break;
        case 'ArrowRight':
          canvasContainer.editor.selected.x(
            canvasContainer.editor.selected.x() + 1
          )
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", this._keyListener.bind(this));

    document
      .querySelector("div.konvajs-content")
      .classList.replace("konvajs-content", "label-baker-content");

    this.changeRoute(window.location.hash);
    window.addEventListener("hashchange", () => {
      // this.currentPath = window.location.hash;
      this.changeRoute(window.location.hash);
    });
  },
};
</script>
