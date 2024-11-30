<template>
  <div>
    <vue-final-modal v-model="stats.showSearchModal" style="z-index: 9999999" classes="modal-container"
      content-class="modal-content" @keydown.esc="stats.showSearchModal = false">
      <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
        <div class="w-full flex justify-center">
          <div class="relative w-full h-full max-w-md md:h-auto">
            <!-- Modal content -->
            <div class="
                    relative
                    w-full
                    bg-white
                    rounded-tl-lg rounded-tr-lg
                    shadow
                    dark:bg-gray-700
                  ">
              <!-- Modal header -->
              <div class="px-2 py-2 border-b rounded-t dark:border-gray-600">
                <input @input="search" ref="input" class="
                        rounded-md
                        focus:ring-3
                        ring-2
                        border-none
                        ring-blue-500
                        w-full
                      " placeholder="Search " type="text" />
              </div>
              <!-- Modal body -->
              <div v-if="menuData" class="p-2 h-56 overflow-y-scroll">

                <div class="gap-4 flex flex-col">
                  <div v-for="(menu, index) in menuData" :key="index">
                    <div @click="goToMenus(menu.catName, menu.name)" class="
                              group-hover:text-white
                              hover:bg-blue-500
                              cursor-pointer
                              px-2
                              rounded-md
                              py-2
                              hover:shadow-md
                              group
                            ">
                      <div class="group-hover:text-white font-semibold">
                        {{ menu.title }}
                      </div>
                      <div class="text-gray-500 text-sm group-hover:text-white">
                        {{ menu.hint }}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- footer -->
            <div class="px-2 py-2 bg-gray-200 rounded-bl-lg rounded-br-lg">
              <div class="flex items-center gap-2">
                <svg width="15" height="15" aria-label="Escape key" role="img">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                    <path
                      d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956">
                    </path>
                  </g>
                </svg>
                <span class="text-sm">to close</span>
              </div>

              <button type="button" @click="stats.showSearchModal = !stats.showSearchModal" class="
                      absolute
                      bottom-0
                      right-0
                      text-gray-400
                      bg-transparent
                      hover:bg-gray-200 hover:text-gray-900
                      rounded-lg
                      text-sm
                      p-1.5
                      ml-auto
                      inline-flex
                      items-center
                      dark:hover:bg-gray-800 dark:hover:text-white
                    ">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import Fuse from "fuse.js";
import { stats } from "../store/stats";
import { store } from "../store/menu";
import { canvasContainer } from "../store/editor";
export default {
  components: { VueFinalModal, ModalsContainer },
  data() {
    return {
      stats,
      store,
      menuData: null, canvasContainer,
      menus: [
        {
          name: "dashboard",
          title: "Dashboard",
          hint: "",
          catName: "home",
        },
        {
          name: "newProject",
          title: "New Template",
          hint: "",
          catName: "home",
        },
        {
          name: "myTemplates",
          title: "Templates",
          catName: "home",
          hint: "",
        },
        // {
        //   name: "files",
        //   title: "Files",
        //   hint: "List of Image and PDF files which has been created through API calls",
        //   catName: "home",
        // },


        {
          name: "shape",
          title: "Editor",
          hint: "Template Designer",
          catName: "designer",
        },
      ],
    };
  },
  methods: {
    restoreData() {
      this.menuData = this.menus;
    },
    setData(data) {
      this.menuData = data;
    },
    search(e) {
      let keyword = e.target.value;
      let options = {
        keys: ["title", "hint"],
      };
      if (keyword.length === 0) {
        this.restoreData();
        
      } else {
        const fuse = new Fuse(this.menuData, options);
        let results = fuse.search(keyword).map((r) => r.item);
        this.setData(results);
      }
    },
    goToMenus(menu, subMenu) {
      
      if (menu === 'designer') {
        setTimeout(() => {
          this.canvasContainer.editor.fitIntoContainer();
        }, 100);
      }

      this.store.activeMenu = menu;
      this.store.activeTool = subMenu;
      this.stats.showSearchModal = false;
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.input.focus();
    }, 500);
    this.menuData = this.menus;
    // this.$refs.input.focus()
  },
};
</script>

