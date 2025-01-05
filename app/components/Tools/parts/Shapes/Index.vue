<template>
  <div>
    <div class="text-xs text-gray-400 tracking-wider">
      {{ $t("sidebar.toolbar.shape") }}
    </div>
    <!-- Search -->
    <div class="relative mt-2">
      <input type="text"
        class="pl-8 lb-search-input h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
        :placeholder="$t('sidebar.toolbar.search')" v-model="searchItem" />
      <svg viewBox="0 0 24 24"
        class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor"
        stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
    <!-- tools -->
    <div class="space-y-4 mt-3">
      <div class="grid grid-cols-2 gap-2">
        <button v-for="(tool, index) in avilableTools" :key="index" @click="tool.action"
          class="group bg-white p-1 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg">
          <IsPro v-if="tool.isPro" class="absolute hidden group-hover:block top-0 right-0 z-10" />
          <div
            class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative">
            <img :src="tool.imageSrc" class="w-10 h-10" alt="profile" />
          </div>
          <div class="flex items-center w-full">
            <div
              class="text-xs py-1 px-1 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden">
              {{ $t("sidebar.shape." + tool.type) }}
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextIcon from "../../icons/Text.svg";
import RectIco from "../../icons/Rect.svg";
import CircleIco from "../../icons/Circle.svg";
import LineIco from "../../icons/Line.svg";
import ImageIco from "../../icons/Image.svg";
import GifIcon from "../../icons/Gif.svg";
import BarcodeIco from "../../icons/Barcode.svg";
import QRcodeeIco from "../../icons/QRcode.svg";
import TriangleIco from "../../icons/Triangle.svg";
import PolygonIco from "../../icons/Polygon.svg";
import OvalIco from "../../icons/Oval.svg";
import ArcIco from "../../icons/Arc.svg";
import StarIco from "../../icons/Star.svg";
import BasicBarcodeIco from "../../icons/BasicBarcode.svg";
import SvgIcon from "../../icons/Svg.svg";
import VideoIcon from "../../icons/Video.svg";
import AudioIcon from "../../icons/Audio.svg";
import { StarIcon as SIcon } from "@heroicons/vue/24/solid";
import IsPro from "../../../Tags/IsPro.vue";
import { TempData } from "../../../../store/temp";
export default {
  props: ["editor"],
  components: { SIcon, IsPro },
  data() {
    return {
      name: "somename",
      searchItem: "",
      TempData,
      tools: [
        {
          name: "Text",
          type: "text",
          mapplable: true,
          imageSrc: TextIcon,
          action: () => {
            this.editor.addText({
              type: "text",
              textType: "text",
              x: 10,
              y: 10,
              text: "New text",
              fontSize: this.editor.editorWidth / 25,
              fontFamily: "Open Sans",
              fill: "#000000",
              stroke: "#000000",
              strokeWidth: 0,
              draggable: true,
            });
          },
        },
        {
          name: "Barcode Basic",
          mapplable: true,
          imageSrc: BasicBarcodeIco,
          type: "barcodeBasic",
          action: () => {
            this.editor.addText({
              type: "barcodeBasic",
              x: 10,
              y: 10,
              text: "*1234*",
              fontSize: this.editor.editorWidth / 10,
              fontFamily: "Libre Barcode 39",
              fill: "#000000",
              stroke: "#000000",
              strokeWidth: 0,
              strokeScaleEnabled: false,
              draggable: true,
            });
          },
        },
        {
          name: "Image",
          type: "image",
          imageSrc: ImageIco,
          action: () => {
            this.editor.addImage({});
          },
        },
        {
          name: "GIF",
          type: "gif",
          imageSrc: GifIcon,
          action: () => {
            this.editor.addGif({});
          },
        },

        {
          name: "Video",
          isPro: false,
          type: "video",
          imageSrc: VideoIcon,
          // madeFor: ['app', 'popup'],
          action: () => {
            
            this.editor.addVideo({});
          },
        },

        {
          name: "Audio",
          type: "audio",
          isPro: false,
          imageSrc: AudioIcon,
          madeFor: ['app', 'popup'],
          action: () => {
            
            this.editor.addAudio({}, this.defaultAudioUrl);
          },
        },

        {
          name: "QRcode",
          type: "qrcode",
          isPro: false,
          imageSrc: QRcodeeIco,
          action: () => {
            
            this.editor.addQrcode({});
          },
        },
        {
          name: "Barcode",
          type: "barcode",
          isPro: false,
          imageSrc: BarcodeIco,
          action: () => {
            
            this.editor.addBarcode({});
          },
        },

        {
          name: "Rectangle",
          imageSrc: RectIco,
          type: "rect",
          action: () => {
            this.editor.addRect({
              x: 10,
              y: 10,
              width: this.editor.editorWidth / 3,
              height: this.editor.editorWidth / 3,
              fill: this.editor.Konva.Util.getRandomColor(),
              stroke: this.editor.Konva.Util.getRandomColor(),
              strokeWidth: 0,
              strokeScaleEnabled: false,
              draggable: true,
              type: "rect",
              cornerRadius: [0, 0, 0, 0],
            });
          },
        },
        {
          name: "Triangle",
          type: "triangle",
          imageSrc: TriangleIco,
          action: () => {
            this.editor.addTriangle({});
          },
        },

        {
          name: "Polygon",
          type: "polygon",
          imageSrc: PolygonIco,
          action: () => {
            this.editor.addPolygon({});
          },
        },

        {
          name: "Circle",
          type: "circle",
          imageSrc: CircleIco,
          action: () => {
            this.editor.addCircle({
              x: this.editor.getXCenter(this.editor.getSize()),
              y: this.editor.getXCenter(this.editor.getSize()),
              width: this.editor.getSize(),
              height: this.editor.getSize(),
              radius: this.editor.getSize(),
              fill: this.editor.Konva.Util.getRandomColor(),
              stroke: this.editor.Konva.Util.getRandomColor(),
              strokeWidth: 0,
              draggable: true,
              type: "circle",
            });
          },
        },

        {
          name: "Line",
          type: "line",
          imageSrc: LineIco,
          action: () => {
            this.editor.addLine({});
          },
        },
        {
          name: "Star",
          type: "star",
          imageSrc: StarIco,
          action: () => {
            this.editor.addStar({});
          },
        },

        {
          name: "Arc",
          type: "arc",
          imageSrc: ArcIco,
          action: () => {
            this.editor.addArc({});
          },
        },

        {
          name: "Oval",
          type: "oval",
          imageSrc: OvalIco,
          action: () => {
            this.editor.addOval({});
          },
        },
        {
          name: "svg",
          type: "svg",
          imageSrc: SvgIcon,
          action: () => {
            this.editor.addSvg({});
          },
        },
      ],
    };
  },

  methods: {
    hasCommonItems(arr1, arr2) {
      const set1 = new Set(arr1);
      for (const item of arr2) {
        if (set1.has(item)) {
          return true;
        }
      }
      return false;
    },
    filterIt: function (e) {
      this.tools.filter((el) => {
        if (el.name === "Text") {
          return false;
        }
      });
    },
  },

  computed: {
    avilableTools() {
      return this.tools.filter((tool) => {
        if(tool.madeFor){
          return tool.name.toLowerCase().includes(this.searchItem) && this.hasCommonItems(TempData.templateType,tool.madeFor)
        }
        return tool.name.toLowerCase().includes(this.searchItem);
      });
    },
  },
  mounted() {

  },
};
</script>

<style scoped>
.lb-search-input {
  padding-left: 32px;
}
</style>