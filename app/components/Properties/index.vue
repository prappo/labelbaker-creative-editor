<template>
  <div :class="{ hidden: responsive.hideProperties }"
    class="xl:w-52 md:w-52 w-2/3 bg-gray-100 dark:bg-gray-900 z-50 flex-shrink-0 border-l border-gray-200 dark:border-gray-800 h-full overflow-y-auto md:relative md:block fixed right-0 p-2">
    <!-- tabs -->

    <div class="w-full grid grid-cols-2 gap-1 justify-between pb-3">
      <button v-if="tabsVisibility.properties" title="Properties" @click="currentTab = 'properties'"
        class="p-1 flex justify-center items-center bg-gray-200 rounded-md dark:text-gray-500" :class="{
          'text-white bg-gray-500 dark:text-white': currentTab === 'properties',
        }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <button v-if="tabsVisibility.magic" title="Magic" @click="currentTab = 'magic'"
        class="p-1 flex justify-center items-center bg-gray-200 rounded-md dark:text-gray-500" :class="{
          'text-white bg-gray-500 dark:text-white': currentTab === 'magic',
        }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </button>

      <button v-if="tabsVisibility.docSettings" title="Document Settings" @click="currentTab = 'documentSettings'"
        class="p-1 flex justify-center items-center bg-gray-200 rounded-md dark:text-gray-500" :class="{
          'text-white bg-gray-500 dark:text-white':
            currentTab === 'documentSettings',
        }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </button>
      <!-- <button v-if="tabsVisibility.printSettings" title="Print Settings" @click="currentTab = 'printSettings'"
        class="p-1 flex justify-center items-center bg-gray-200 rounded-md dark:text-gray-500" :class="{
          'text-white bg-gray-500 dark:text-white':
            currentTab === 'printSettings',
        }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
        </svg>
      </button> -->

      <button v-if="tabsVisibility.developer" title="Developer" @click="currentTab = 'developer'"
        class="bg-gray-200 flex justify-center items-center rounded-md p-1 dark:text-gray-500" :class="{
          'text-white bg-gray-500 dark:text-white': currentTab === 'developer',
        }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      </button>
    </div>

    <!-- Properties -->
    <div v-if="currentTab === 'properties'">
      <!-- <div v-if="selected && type"
        class="sticky z-10 top-0 px-4 py-2 flex justify-between items-center font-semibold text-[12px] text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 mb-2 dark:ring-black/10">
        {{ type.toUpperCase() }} {{ $t("properties.text") }}
        <button @click="changeVisiblity">
          <EyeIcon v-if="selected.isVisible()" class="w-5 h-5" />
          <EyeSlashIcon v-if="!selected.isVisible()" class="w-5 h-5" />
        </button>
      </div> -->

      <!-- Alignment settings -->

      <AlignmentVue v-if="selected" :selected="selected" :editor="editor" />

      <!-- General settigns -->
      <GeneralVue v-if="selected" :selected="selected" :editor="editor" />



      <!-- <CanvasSettingsVue v-if="!selected" :editor="editor" /> -->

      <div v-if="selected">
        <MediaSettigns v-if="type === 'video' || type === 'audio'" :selected="selected" />
        <BarcodeBasicVue class="border rounded px-2 shadow-md mb-2 py-2" v-if="type == 'barcodeBasic'"
          :selected="selected" :editor="editor" />
        <StarVue class="border rounded px-2 shadow-md mb-2 py-2" v-if="type == 'star'" :selected="selected"
          :editor="editor" />
        <ArcVue class="border rounded px-2 shadow-md mb-2 py-2" v-if="type == 'arc'" :selected="selected"
          :editor="editor" />
        <TriangleVue class="border rounded px-2 shadow-md mb-2 py-2" v-if="type == 'triangle'" :selected="selected"
          :editor="editor" />
        <PolygonVue class="border rounded px-2 shadow-md mb-2 py-2" v-if="type == 'polygon'" :selected="selected"
          :editor="editor" />
        <ImageUpload v-if="type === 'image' || type === 'video' || type === 'audio'" :selected="selected" />
        <QRcodeVue v-if="type === 'qrcode'" :selected="selected" :editor="editor" />
        <BarcodeVue v-if="type == 'barcode'" :selected="selected" :editor="editor" />

        <div>
          <div v-if="type === 'text'">
            <TextVue :selected="selected" :editor="editor" />
          </div>

          <div v-if="type === 'svg'">
            <SvgVue :selected="selected" :editor="editor" />
          </div>

          <!-- Border radius -->
          <div v-if="type === 'rect' ||
            type === 'image' ||
            type === 'qrcode' ||
            type === 'video'
            " class="border rounded px-2 shadow-md mb-2">
            <BorderRadiusVue :selected="selected" :editor="editor" />
          </div>

          <div v-if="selected &&
            selected.attrs.type !== 'shape' &&
            selected.attrs.type !== 'group'
            " class=" px-2  mb-2">
            <!-- color picker -->
            <div class="relative mt-2 mb-5">
              <ColorPicker :editor="editor" :selected="selected" />
            </div>

            <div>
              <Stroke :selected="selected" />
            </div>

            <div class="mt-2">
              <Shadow :selected="selected" />
            </div>

            <div class="mb-10">
              <DashVue :selected="selected" :editor="editor" />
            </div>
        
          </div>


          <!-- <div v-if="selected.attrs.type !== 'shape'" class="border rounded px-2 shadow-md mb-2">
            <div class="relative mt-2 mb-5">
              <div class="flex justify-between w-full text-xs text-gray-400 tracking-wider mb-2 font-bold">
                {{ $t("properties.shadow") }}
              </div>
            </div>
            <div v-if="isAvilable('shadowColor')" class="relative mt-2 mb-5">
              <div class="flex justify-between w-full text-xs text-gray-400 tracking-wider mb-2">
                Color
                <SimpleColorPickerVue :color="selected.shadowColor()" @color-change="changeShadowColor" />
              </div>
            </div>

            <div v-if="isAvilable('shadowBlur')" class="relative mt-2 mb-5">
              <div class="text-xs text-gray-400 tracking-wider mb-2">Blur</div>
              <input type="number" style="padding-left: 32px"
                class="pl-8 h-9 bg-white border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-transparent w-full rounded-md text-sm"
                @input="changeShadowBlur" :value="selected.shadowBlur()" />
              <AdjustmentsHorizontalIcon style="top: 35px" class="w-4 absolute text-gray-400 transform left-2" />
            </div>

            <div v-if="isAvilable('shadowOffsetX')" class="relative mt-2 mb-5">
              <div class="text-xs text-gray-400 tracking-wider mb-2">
                Offset
              </div>
              <div class="flex gap-6">
                <div class="relative">
                  <input style="padding-left: 25px" type="number"
                    class="h-9 bg-white border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-transparent w-full rounded-md text-sm"
                    @input="changeShadowOffsetX" :value="selected.shadowOffsetX()" />
                  <div
                    class="w-2 absolute dark:text-white flex items-center justify-center rounded bg-blue-500 px-2 text-white transform left-2 top-2">
                    X
                  </div>
                </div>
                <div class="relative">
                  <input type="number" style="padding-left: 25px"
                    class="h-9 bg-white border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-transparent w-full rounded-md text-sm"
                    @input="changeShadowOffsetY" :value="selected.shadowOffsetY()" />
                  <div
                    class="w-2 absolute dark:text-white flex items-center justify-center rounded bg-blue-500 px-2 text-white transform left-2 top-2">
                    Y
                  </div>
                </div>
              </div>
            </div>

            <div v-if="isAvilable('shadowOpacity')" class="relative mt-2 mb-5">
              <div
                class="flex flex-col justify-between items-center gap-2 w-full text-xs text-gray-400 tracking-wider mb-2">
                <div class="flex gap-3">
                  {{ $t("properties.opacity") }}
                  <div>({{ selected.shadowOpacity() }})</div>
                </div>
                <input @input="(e) => selected.shadowOpacity(e.target.value)" type="range" min="0" max="1"
                  :value="selected.shadowOpacity()"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" step="0.01" />
              </div>
            </div>
          </div> -->
        </div>

        <NonEditableVue v-if="selected && TempData.templateType[0] === 'label'" :selected="selected" :editor="editor" />
      </div>

      <div v-else class="h-full flex flex-col">
        <BackgroundVue />
      </div>
    </div>

    <!-- Magic settings -->
    <div v-if="currentTab === 'magic'">
      <Magic v-if="selected" :selected="selected" :editor="editor" />
      <div v-else>Please Select an element to set magic</div>
    </div>

    <!-- Document settings -->
    <div v-if="currentTab === 'documentSettings'">
      <div class="text-center py-2">Document Settings & Label Settings</div>
      <hr class="mb-2" />
      <DocumentSettings :editor="editor" />
    </div>
    <!-- PrintSettings -->
    <div v-if="currentTab === 'printSettings'">
      <PrintSettings :container="canvasContainer" :editor="editor" />
    </div>
    <!-- Editor settings -->
    <div v-if="currentTab === 'developer'" class="flex flex-col justify-center py-5">
      <button class="border-2 px-3 py-1 rounded-full" @click="stats.showCodeModal = true">
        Open code editor
      </button>
      <Scripts :key="stats.refresh" />
    </div>
  </div>
</template>

<script>

import "@formester/universal-font-picker/dist/universal-font-picker.css";

import { defineAsyncComponent } from "vue";
import { stats } from "../../store/stats";
const SimpleColorPickerVue = defineAsyncComponent(() =>
  import("../SimpleColorPicker.vue")
);
const Stroke = defineAsyncComponent(() => import('./parts/Stroke.vue'))
const ColorPicker = defineAsyncComponent(() => import('./parts/ColorPicker.vue'));
const BorderRadiusVue = defineAsyncComponent(() =>
  import("./parts/BorderRadius.vue")
);
const CanvasSettingsVue = defineAsyncComponent(() =>
  import("./parts/CanvasSettings.vue")
);
const ImageUpload = defineAsyncComponent(() =>
  import("./parts/MediaUpload.vue")
);
const QRcodeVue = defineAsyncComponent(() => import("./parts/QRcode.vue"));
const BarcodeVue = defineAsyncComponent(() => import("./parts/Barcode.vue"));
const GeneralVue = defineAsyncComponent(() => import("./parts/General.vue"));
const TextVue = defineAsyncComponent(() => import("./parts/Text.vue"));
const TriangleVue = defineAsyncComponent(() => import("./parts/Triangle.vue"));
const PolygonVue = defineAsyncComponent(() => import("./parts/Polygon.vue"));
const ArcVue = defineAsyncComponent(() => import("./parts/Arc.vue"));
const StarVue = defineAsyncComponent(() => import("./parts/Star.vue"));
const BarcodeBasicVue = defineAsyncComponent(() =>
  import("./parts/BarcodeBasic.vue")
);
const BackgroundVue = defineAsyncComponent(() =>
  import("./parts/Background.vue")
);
const AlignmentVue = defineAsyncComponent(() =>
  import("./parts/Alignment.vue")
);
const NonEditableVue = defineAsyncComponent(() =>
  import("./parts/NonEditable.vue")
);
const SvgVue = defineAsyncComponent(() => import("./parts/Svg.vue"));
const DashVue = defineAsyncComponent(() => import("./parts/Dash.vue"));
const Properties = defineAsyncComponent(() => import("./parts/Properties.vue"));

const Magic = defineAsyncComponent(() => import("./parts/Magic.vue"));
const DocumentSettings = defineAsyncComponent(() =>
  import("../Tools/parts/DocumentSettings/Index.vue")
);
const PrintSettings = defineAsyncComponent(() =>
  import("../Tools/parts/PrintSettings/Index.vue")
);
const MediaSettigns = defineAsyncComponent(() =>
  import("./parts/MediaSettings.vue")
);
const Scripts = defineAsyncComponent(() =>
  import("./parts/magics/Scripts.vue")
);
const InputField = defineAsyncComponent(() => import("./parts/InputField.vue"));
const Shadow = defineAsyncComponent(() => import('./parts/Shadow.vue'))
import { responsive } from "../../store/responsive";
import { canvasContainer } from "../../store/editor";
import { TempData } from "../../store/temp";
import {
  ChatBubbleBottomCenterIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/vue/24/outline";

export default {
  props: ["editor"],
  components: {
    BackgroundVue,
    Properties,
    ColorPicker,
    SimpleColorPickerVue,
    BorderRadiusVue,
    CanvasSettingsVue,
    ImageUpload,
    QRcodeVue,
    BarcodeVue,
    GeneralVue,
    TextVue,
    TriangleVue,
    PolygonVue,
    ArcVue,
    StarVue,
    BarcodeBasicVue,
    AlignmentVue,
    SvgVue,
    DashVue,
    NonEditableVue,
    Scripts,
    Magic,
    DocumentSettings,
    PrintSettings,
    MediaSettigns,
    InputField,
    Stroke,
    Shadow,
    // Icons
    ChatBubbleBottomCenterIcon,
    AdjustmentsHorizontalIcon,
    EyeIcon,
    EyeSlashIcon,
  },
  data() {
    return {
      canvasContainer,
      TempData,
      selected: null,
      type: null,
      color: "#0f4c81",
      responsive,
      currentTab: "properties",
      stats,

      tabsVisibility: {
        properties: true,
        magic: false,
        docSettings: false,
        printSettings: false,
        developer: false,
      },

    };
  },

  methods: {
    isAvilable(functionName) {
      if (typeof this.selected[functionName] === "function") {
        return true;
      }

      return false;
    },

    updateFontColor: function (e) {
      this.selected.fill(e.colors.hex);
    },
    updateColor(color) {
      this.selected.fill(color);
    },


    
    isIgnoredForColor(type) {
      let types = ["line", "anchor"];
      if (types.includes(type)) {
        return true;
      }
      return false;
    },
  },

  mounted() {
    TempData.templateType = 'label';
    setTimeout(() => {
    

      if (TempData.templateType) {
        if (TempData.templateType.includes("banner")) {
          this.tabsVisibility.magic = false;
          this.tabsVisibility.developer = false;
          this.tabsVisibility.printSettings = false;
          this.tabsVisibility.docSettings = false;
        }

        if (TempData.templateType.includes("popup")) {
          this.tabsVisibility.magic = true;
          this.tabsVisibility.developer = true;
          this.tabsVisibility.printSettings = false;
          this.tabsVisibility.docSettings = false;
        }

        if (TempData.templateType.includes("app")) {
          this.tabsVisibility.magic = true;
          this.tabsVisibility.developer = true;
          this.tabsVisibility.printSettings = false;
          this.tabsVisibility.docSettings = false;
        }

        if (TempData.templateType.includes("label")) {
          this.tabsVisibility.magic = false;
          this.tabsVisibility.developer = false;
          this.tabsVisibility.printSettings = true;
          this.tabsVisibility.docSettings = true;
        }
      }
    }, 1000);

    document.addEventListener("editor_selected_element", (e) => {
      if (e.data) {
        if (e.data.length) {
          if (e.data.length === 1) {
            this.selected = e.data[0];
          } else {
            this.selected = null;
            this.type = null;
            return;
          }
        } else {
          this.selected = e.data;
        }

        if (this.selected.attrs.type) {
          this.type = this.selected.attrs.type;

          if (this.type === "text") {
            this.font = this.selected.fontFamily();
          }

          if (this.type === "rect") {
          }
          if (this.type === "svg") {
          }
        } else {
          this.type = null;
        }
      } else {
        this.selected = null;
        this.type = null;
      }
    });
  },
};
</script>
