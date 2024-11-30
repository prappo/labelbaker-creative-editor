<template>
  <div class="w-full">
    <div style="height: 35rem" class="w-full flex">
      <!-- Sidebar -->
      <div class="md:w-1/3 w-full rounded-tl-xl rounded-bl-xl bg-blue-500 overflow-y-auto flex flex-col">
        <!-- Selection buttons -->
        <div class="px-5 py-5 bg-blue-500">
          <div class="bg-gray-900 rounded-md grid grid-cols-2 px-2 gap-4 py-2 justify-center">
            <button @click="setMode('presets')" :class="{ 'bg-gray-500': activeMode === 'presets' }"
              class="text-white px-3 py-1 rounded-md">
              Presets
            </button>
            <button @click="setMode('custom')" :class="{ 'bg-gray-500': activeMode === 'custom' }"
              class="text-white px-3 py-1 rounded-md">
              Custom
            </button>
          </div>
        </div>

        <!-- Templates sizes -->
        <div v-if="activeMode === 'presets' && avilableTemplates" class="overflow-y-auto flex flex-col">
          <div class="text-white font-bold px-5 py-3">Categories</div>
          <button :class="{ 'bg-blue-100 text-blue-900': active === 'all' }"
            class="text-white mb-3 mx-5 py-1 hover:bg-blue-100 text-left hover:text-gray-600 px-1 rounded font-semibold"
            @click="setActive('all')">
            ALL
          </button>
          <button :class="{ 'bg-blue-100 text-blue-900': active === cat }" @click="setActive(cat)"
            class="text-white mb-3 mx-5 py-1 hover:bg-blue-100 text-left hover:text-gray-500 px-1 rounded font-semibold"
            v-for="(cat, i) in getCategories()" :key="i">
            {{ cat.toUpperCase() }}
          </button>
        </div>

        <!-- Custom sizes -->
        <div v-if="activeMode === 'custom'" class="overflow-y-auto flex flex-col">

          <!-- banner sizes -->

          <div class="flex flex-col" v-if="selectedType === 'banner'">
            <div class="text-white font-bold px-5 py-3">Banner sizes</div>
            <button @click="setCustomSize(size)"
              class="text-white gap-5 mb-3 mx-5 py-1  hover:bg-blue-100 text-left hover:text-gray-500 px-1 rounded font-semibold"
              v-for="(size, i) in bannerSizes" :key="i">
              <div class="truncate">{{ size.name }}</div>
              <span style="font-size: 8px">{{ size.width }}x{{ size.height }}</span>
            </button>
          </div>


          <!-- Popup sizes -->

          <div v-if="selectedType === 'popup'" class="flex flex-col">
            <div class="text-white font-bold px-5 py-3">Popup sizes</div>
            <button @click="setCustomSize(size)"
              class="text-white gap-5 mb-3 mx-5 py-1  hover:bg-blue-100 text-left hover:text-gray-500 px-1 rounded font-semibold"
              v-for="(size, i) in popupSizes" :key="i">
              <div class="truncate">{{ size.name }}</div>
              <span style="font-size: 8px">{{ size.width }}x{{ size.height }}</span>
            </button>
          </div>

          <!-- thumbnail sizes -->

          <div class="flex flex-col" v-if="selectedType === 'thumbnail'">
            <div class="text-white font-bold px-5 py-3">Thumbnail sizes</div>
            <button @click="setCustomSize(size)"
              class="text-white gap-5 mb-3 mx-5 py-1  hover:bg-blue-100 text-left hover:text-gray-500 px-1 rounded font-semibold"
              v-for="(size, i) in thumbnailSizes" :key="i">
              <div class="truncate">{{ size.name }}</div>
              <span style="font-size: 8px">{{ size.width }}x{{ size.height }}</span>
            </button>
          </div>

          <!-- products sizes -->

          <div class="flex flex-col" v-if="selectedType === 'product'">
            <div class="text-white font-bold px-5 py-3">Product Image sizes</div>
            <button @click="setCustomSize(size)"
              class="text-white gap-5 mb-3 mx-5 py-1  hover:bg-blue-100 text-left hover:text-gray-500 px-1 rounded font-semibold"
              v-for="(size, i) in productSizes" :key="i">
              <div class="truncate">{{ size.name }}</div>
              <span style="font-size: 8px">{{ size.width }}x{{ size.height }}</span>
            </button>
          </div>

          <div class="text-white font-bold px-5 py-3">Other sizes</div>
          <button @click="setCustomSize(size)"
            class="text-white mb-3 mx-5 py-1  hover:bg-blue-100 text-left hover:text-gray-500 px-1 rounded font-semibold"
            v-for="(size, i) in getTemplateSizes()" :key="i">
            <div class="truncate">{{ size.name }}</div>
            <span style="font-size: 8px">{{ size.width }}x{{ size.height }}</span>
          </button>
        </div>
      </div>
      <!-- Templates -->
      <div class="w-full dark:bg-gray-900 md:flex flex-col px-2 bg-white rounded-tr-2xl rounded-br-2xl">
        <!-- header -->
        <div class="w-full relative">
          <!-- Search bar -->
          <div v-if="activeMode === 'presets'" class="relative pl-3 pr-16 py-2">
            <input type="text" style="padding-left: 30px"
              class="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
              :placeholder="$t('sidebar.toolbar.search')" v-model="searchItem" />
            <svg viewBox="0 0 24 24"
              class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-5"
              stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div v-else class="py-4"><b>{{ selectedType.toUpperCase() }}</b> Template</div>
          <button type="button" @click="stats.newTemplateModal = flase" v-if="showCloseBtn"
            class="right-2.5 absolute top-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close</span>
          </button>
        </div>
        <!-- body -->
        <div class="w-full h-full overflow-y-scroll">
          <!-- Presets -->
          <div v-if="activeMode === 'presets' && avilableTemplates"
            class="flex-grow md:columns-3 columns-1 px-3 py-2 overflow-y-auto">
            <div :class="{ 'ring-2 shadow-lg': isTemplateSelected(template) }" @click="selectAvilableTemplate(template)"
              v-for="(template, index) in avilableTemplates" :key="index"
              class="w-full cursor-pointer hover:ring-2 hover:shadow-lg relative mb-4 rounded-md shadow-md">
              <IsProTag v-if="appMode === 'noAuth' && isPro(template.isPro)" />
              <span class="absolute bg-blue-500 rounded-md text-white px-2 py-1 left-1 top-1">{{ template.name }}</span>
              <img class="rounded-md w-full" :src="getPreviewLink(template)" />
              <span v-if="getTemplateDimention(template)"
                class="absolute backdrop-opacity-10 px-2 shadow text-gay-900 rounded backdrop-invert dark:text-gray-900 bg-gray-100 bottom-1 right-1">{{
                  getTemplateDimention(template) }}</span>
            </div>
          </div>

          <!-- custom -->
          <div id="customViewport" v-if="activeMode === 'custom'"
            class="w-full h-full items-center flex justify-center bg-gray-400">
            <img style="max-width: 80%; max-height: 80%" class="mx-5 shadow-md rounded my-5"
              :src="generateCustomPreview()" />
          </div>
        </div>
        <!-- Footer -->
        <div class="flex items-center py-2 justify-start gap-3">
          <div class="w-full" v-if="activeMode === 'presets'">
            <div v-if="selected">
              Selected
              <span class="px-3 py-1 rounded-md bg-blue-100 text-blue-500">{{
                selected.name
              }}</span>
            </div>
          </div>
          <div class="relative w-full">
            <input type="text" v-model="templateName" id="templateName"
              class="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " />
            <label for="templateName"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Template
              Name</label>
          </div>
          <div>
            <select @change="e => selectedType = e.target.value">
              <option :selected="selectedType === t.name" v-for="(t, i ) in getTemplateTypes()" :value="t.name" :key="i">
                {{ t.value }}</option>
            </select>
          </div>
          <div v-if="activeMode === 'custom'" class="flex justify-end gap-3 items-center">
            <div class="relative">
              <input type="number" v-model="cellWidth" id="cellWidth"
                class="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " />
              <label for="cellWidth"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Width</label>
            </div>
            <!-- <div class="relative">
              <input
                type="number"
                v-model="cellWidth"
                class="rounded-full shadow-md pl-10"
              />
              <span class="absolute left-3 text-2xl top-1">W</span>
            </div> -->


            <div class="relative">
              <input type="number" v-model="cellHeight" id="cellHeight"
                class="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " />
              <label for="cellHeight"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Height</label>
            </div>

            <!-- <div class="relative">
              <input
                v-model="cellHeight"
                type="number"
                class="rounded-xl w-auto shadow-md pl-10"
              />
              <span class="absolute left-3 text-2xl top-1">H</span>
            </div> -->
          </div>

          <button @click="createTemplate" class="px-6 py-2 bg-blue-500 rounded-2xl text-white font-semibold">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { templates as storedTemplates } from "../../store/templates";
import { store } from "../../store/menu";
import { TempData } from "../../store/temp";
import { canvasContainer } from "../../store/editor";
import { stats } from "../../store/stats";
import simpleSvgPlaceholder from "@cloudfour/simple-svg-placeholder";
import { showError, showSuccess } from "../../libs/helper";
import IsProTag from "../Tags/IsPro.vue";
import { userData } from '../../store/user'
import { getTemplates } from '../../libs/template';
export default {
  props: ["showCloseBtn"],
  components: { IsProTag },
  data() {
    return {
      selected: null,
      templateName: 'Template Name',
      selectedTemplate: null,
      storedTemplates,
      TempData,
      templates: [],
      searchItem: "",
      searchingNow: "category",
      editor: null,
      user: null,
      userData,
      store,
      canvasContainer,
      stats,
      createBtnText: "Create",
      cellWidth: 200,
      cellHeight: 100,
      isBusy: false,
      active: "all",
      activeMode: "custom",
      activeClass: "bg-blue-100 text-gray-500",
      selectedType: 'banner',
      templateTypes: [
        { name: "banner", value: "Banner" },
        { name: "popup", value: "Popup" },
        { name: "app", value: "App" },
        { name: "generator", value: "Generator" },
        { name: "thumbnail", value: "Thumbnail" },
        { name: "email", value: "Email" },
      ],
      bannerSizes: [
        {
          name: 'Medium Rectangle',
          width: 300,
          height: 250
        },
        {
          name: 'Leaderboard',
          width: 728,
          height: 90
        },
        {
          name: 'Wide Skyscraper',
          width: 160,
          height: 600
        },
        {
          name: 'Large Rectangle',
          width: 336,
          height: 280
        },
        {
          name: 'Half Page Ad',
          width: 300,
          height: 600
        },
        {
          name: 'Banner',
          width: 468,
          height: 60
        },
        {
          name: 'Square',
          width: 250,
          height: 250
        },
        {
          name: 'Small Square',
          width: 200,
          height: 200
        },
        {
          name: 'Skyscraper',
          width: 120,
          height: 600
        },
        {
          name: 'Wide Banner',
          width: 728,
          height: 180
        },
        {
          name: 'Mobile Leaderboard',
          width: 320,
          height: 50
        }
      ],
      popupSizes: [
        {
          name: 'Popup - Small',
          width: 300,
          height: 250
        },
        {
          name: 'Popup - Medium',
          width: 400,
          height: 300
        },
        {
          name: 'Popup - Large',
          width: 600,
          height: 400
        },
        {
          name: 'Popup - Fullscreen',
          width: 800,
          height: 600
        },
        {
          name: 'Popup - Skyscraper',
          width: 120,
          height: 600
        },
        {
          name: 'Popup - Square',
          width: 250,
          height: 250
        },
        {
          name: 'Popup - Tall',
          width: 160,
          height: 600
        },
        {
          name: 'Popup - Wide',
          width: 800,
          height: 300
        }
      ],
      thumbnailSizes: [
        {
          name: 'Thumbnail - Small',
          width: 80,
          height: 80
        },
        {
          name: 'Thumbnail - Medium',
          width: 120,
          height: 120
        },
        {
          name: 'Thumbnail - Large',
          width: 200,
          height: 200
        },
        {
          name: 'Thumbnail - Wide',
          width: 320,
          height: 180
        },
        {
          name: 'Thumbnail - Landscape',
          width: 160,
          height: 90
        },
        {
          name: 'Thumbnail - Portrait',
          width: 90,
          height: 160
        },
        {
          name: 'Thumbnail - Square',
          width: 150,
          height: 150
        }
      ],
      productSizes: [
        {
          name: 'Product Thumbnail',
          width: 100,
          height: 100
        },
        {
          name: 'Product Image - Small',
          width: 250,
          height: 250
        },
        {
          name: 'Product Image - Medium',
          width: 500,
          height: 500
        },
        {
          name: 'Product Image - Large',
          width: 800,
          height: 800
        },
        {
          name: 'Product Image - Extra Large',
          width: 1200,
          height: 1200
        },
        {
          name: 'Category Thumbnail',
          width: 160,
          height: 160
        },
        {
          name: 'Category Banner',
          width: 1200,
          height: 400
        },
        {
          name: 'Brand Logo',
          width: 200,
          height: 80
        },
        {
          name: 'Featured Product',
          width: 400,
          height: 300
        },
        {
          name: 'Carousel Image',
          width: 800,
          height: 400
        }
      ]


      ,
      customSizes: [
        {
          name: "Open Graph",
          width: 1200,
          height: 630,
        },
        {
          name: "Twitter Card",
          width: 1200,
          height: 600,
        },
        {
          name: "Twitter Post",
          width: 1200,
          height: 675,
        },
        {
          name: "Youtube Thumbnail",
          width: 1280,
          height: 720,
        },
        {
          name: "Facebook Cover",
          width: 851,
          height: 315,
        },
        {
          name: "Facebook event cover",
          width: 1920,
          height: 1005,
        },
        {
          name: "Facebook post",
          width: 940,
          height: 788,
        },
        {
          name: "Facebook Story",
          width: 1080,
          height: 1920,
        },
        {
          name: "Instagram post",
          width: 1080,
          height: 1080,
        },
        {
          name: "Instagram story",
          width: 1080,
          height: 1920,
        },
        {
          name: "Linkedin banner",
          width: 1584,
          height: 396,
        },
        {
          name: "Linkedin Post",
          width: 1200,
          height: 1200,
        },
      ],
    };
  },
  methods: {
    getTemplateSizes() {
      return this.customSizes;
    },
    getTemplateTypes() {
      let templates = this.templateTypes;
      if (this.isWooExists) {
        let elFound = false;
        templates.forEach(el => {
          if (el.name === 'product') {
            elFound = true;
          }
        })

        if (!elFound) {
          templates.push({ name: "product", value: 'Product' })
        }
      }
      return templates;
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
    useIt: function (data) {
      this.canvasContainer.editor.clearEditor();

      this.canvasContainer.editor.ImportData.source(this.selectTemplate.data);

      let s = this.selected.props;

      for (let index in s) {
        this.canvasContainer[index] = s[index];
      }

      this.canvasContainer.editor.editorWidth = parseInt(s.cellWidth);
      this.canvasContainer.editor.editorHeight = parseInt(s.cellHeight);
      this.canvasContainer.editor.templateName = this.templateName;
      if (!this.sidebar) {
        store.activeMenu = "designer";
        store.activeTool = "shape";
      }

      setTimeout(() => {
        this.canvasContainer.editor.transform.nodes([]);
        this.canvasContainer.editor.fitIntoContainer();
        this.canvasContainer.editor.fitIntoContainer();
        this.rulerControl();
        this.gridControl();
        this.modalVisiblity = false;
      }, 500);
    },
    setCustomSize(size) {
      this.cellWidth = size.width;
      this.cellHeight = size.height;
    },
    getTemplateDirectory() {
      return this.apiEndpoint + "/templates/";
    },
    createCustomTemplate() {
      (this.store.activeMenu = "designer"),
        (this.store.activeTool = "shape"),
        setTimeout(() => {

          this.canvasContainer.cellWidth = this.cellWidth;
          this.canvasContainer.cellHeight = this.cellHeight;
          this.canvasContainer.cellPaddingLeft = 0;
          this.canvasContainer.cellPaddingTop = 0;

          this.canvasContainer.pageHeight = this.cellHeight;
          this.canvasContainer.pageWidth = this.cellWidth;
          this.canvasContainer.pageMarginLeft = 0;
          this.canvasContainer.pageMarginTop = 0;
          // this.canvasContainer.format = this.selected;
          this.editor.templateName = this.templateName;
          this.editor.editorWidth = this.cellWidth;
          this.editor.editorHeight = this.cellHeight;

          // background settings
          this.editor.background.fill("white");
          this.editor.background.width(this.cellWidth);
          this.editor.background.height(this.cellHeight);
          this.editor.clearAll();
          this.editor.fitIntoContainer();
          this.editor.grid.addGrid();
          this.editor.ruler.addRuler();

          canvasContainer.useLayout = false;
          stats.showNewModal = false;

          showSuccess("New Design Created!");
          this.editor.fitIntoContainer();
          this.stats.newTemplateModal = false;
        }, 100);
    },
    createPresetsTemplate() {
      // Create templates from presets if template selected
      if (this.selected) {
        let data = this.selected;

        if (this.appMode === "noAuth" && this.isPro(data.isPro)) {
          showError("You need pro version to use this");
          return;
        }
        if (data.category === "my") {
          fetch(
            this.serverEndpoint +
            "/templates/" +
            this.user.email +
            "/" +
            data.name
          )
            .then((e) => e.json())
            .then((data) => {
              this.selectedTemplate = data;
              this.selectedTemplate.id = this.selected.name;
              this.selectedTemplate.category = "my";

              this.useIt(this.selectedTemplate);

              stats.isBusy = false;
              stats.newTemplateModal = false;
              return;
            })
            .catch((e) => {
              alert("Enable to load template");
            });
        } else {
          stats.isBusy = true;
          let directory = this.getTemplateDirectory();

          fetch(directory + data.path)
            .then((res) => res.json())
            .then((d) => {
              this.selectTemplate = d;
              this.selectTemplate.name = data.name;
              this.selectTemplate.id = data.id;
              this.selectTemplate.category = data.category;
              // this.dynamic =
              //   this.selected.props.printMode === "dynamic" ? true : false;

              this.useIt(this.selectTemplate);

              stats.isBusy = false;
              stats.newTemplateModal = false;
            })
            .catch((e) => {
              stats.isBusy = false;
              stats.newTemplateModal = false;

              alert("Unable to load template");
            });
        }
      } else {
        alert("Select a template");
      }
    },
    createTemplate() {

      // check requirements
      if (this.templateName === '') {
        alert('Template Name required');
        return;
      }
      this.TempData.editing.name = this.templateName;
      this.stats.newTemplateModal = false;
      window.location.href = "#/editor";
      if (this.activeMode === "presets") {
        this.createPresetsTemplate();
      } else {
        this.createCustomTemplate();
      }
    },
    generateCustomPreview() {
      return simpleSvgPlaceholder({
        width: this.cellWidth,
        height: this.cellHeight,
      });
    },
    getTemplateDimention(template) {
      if (!template.props) {
      }
      if (template.props) {
        return template.props.cellWidth + "x" + template.props.cellHeight;
      }
      return null;
    },
    setActive(data) {
      this.active = data;
      if (data === "all") {
        this.searchItem = "";
      } else {
        this.searchItem = data;
      }
    },
    setMode(mode) {
      this.activeMode = mode;
    },
    selectAvilableTemplate(data) {
      this.selected = data;
    },

    isTemplateSelected(template) {
      if (this.selected) {
        if (template.id === this.selected.id) {
          return true;
        }
      }
      return false;
    },
    getPreviewLink(template) {
      if (template.category === "my") {
        return template.preview;
      }
      return this.apiEndpoint + "/templates/" + template.preview;
    },
    filterTemplate(cat) {
      if (cat === "all") {
        this.searchItem = "";
      } else {
        this.searchItem = cat;
      }
    },
    getCategories() {
      let catList = [];
      // return catList;
      let currentCat = null;
      if (this.storedTemplates.templates) {
        this.storedTemplates.templates.forEach((template) => {
          if (!currentCat) {
            currentCat = template.category;
            catList.push(currentCat);
          } else {
            if (currentCat !== template.category) {
              currentCat = template.category;
              catList.push(currentCat);
            }
          }
        });
      }

      return catList;
    },

    getTemplates() {
      this.user = userData.details;

      if (this.storedTemplates.templates) {
        this.storedTemplates.templates.forEach((template) => {
          this.templates.push(template);
        });
      } else {
        fetch(this.getTemplatesEndpoint())
          .then((res) => res.json())
          .then((data) => {
            this.shippingTemplateData = data;
            // this.templates = data;
            data.forEach((el) => {
              this.templates.push(el);
            });
            this.storedTemplates.templates = this.templates;
            this.getMyTemplates();
          });
      }

    },
    getMyTemplates() {
      getTemplates(this.serverEndpoint, this.user.email, this.appMode).then(templates => {

        if (templates) {
          templates.forEach((e) => {
            this.templates.push(e);
            this.TempData.myTemplates.push(e.name);
          });
        }
      })
    },

    getTemplateDirectory() {
      return this.apiEndpoint + "/templates/";
    },
    getTemplatesEndpoint() {
      return this.apiEndpoint + "/templates/index.json";
    }
  },
  computed: {
    avilableTemplates() {
      this.templates = this.storedTemplates.templates;
      if (this.templates) {
        return this.templates.filter((template) => {
          return template[this.searchingNow]
            .toLowerCase()
            .includes(this.searchItem);
        });
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.getTemplates();

    setTimeout(() => {
      this.editor = this.canvasContainer.editor;
      let tType = '';
      if(this.TempData.templateType){
        tType = this.TempData.templateType[0];
      }else{
        tType = 'banner'
      }
      this.templateName = tType + ' name';
  
      this.selectedType = tType;


    }, 100);
  },
};
</script>
<style scoped>
.preview-svg {
  max-width: 80%;
  max-height: 80%;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.15));
}
</style>