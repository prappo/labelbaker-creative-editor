<template>
  <button @click="printPage" class="h-8 flex justify-between items-center gap-2 px-4">
    <div class="w-full flex gap-2">
      <PrinterIcon class="h-5 w-5" />
      <div v-if="text">
        {{ text }}
      </div>
      <div v-else>
        {{ $t("header.menu.print") }}
      </div>
    </div>
  </button>
</template>

<script>
import { stats } from "../../../store/stats";
import { canvasContainer } from "../../../store/editor";
import { dataSettings } from "../../../store/data";
import { userData} from '../../../store/user'
import { PrinterIcon } from "@heroicons/vue/24/outline";

export default {
  props: ["printconfig", "config", "printmode", "editor","text"],
  components: {
    PrinterIcon,
  },
  data() {
    return {
      canvasContainer,
      dataSettings,
      stats,userData
    };
  },
  methods: {
    getFormat: function () {
      if (this.canvasContainer.format === "custom") {
        return [
          this.canvasContainer.pageWidth,
          this.canvasContainer.pageHeight,
        ];
      }
      return this.canvasContainer.format;
    },

    getOrientation() {
      if (this.canvasContainer.format === "custom") {
        if (this.canvasContainer.pageWidth > this.canvasContainer.pageHeight) {
          return "l";
        }

        return "p";
      }
      return "p";
    },
    printPage: async function () {
      if (this.userData.meta.isExpired && this.appMode != 'noAuth') {
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

      stats.isBusy = true;
      let printConfig;
      if (!this.printconfig) {
        printConfig = {
          pageWidth: this.canvasContainer.pageWidth,
          pageHeight: this.canvasContainer.pageHeight,
          cellWidth: this.canvasContainer.cellWidth,
          cellHeight: this.canvasContainer.cellHeight,
          cellPadding: this.canvasContainer.cellPadding,
          pageMargin: this.canvasContainer.pageMargin,
          pageMarginLeft: this.canvasContainer.pageMarginLeft,
          pageMarginTop: this.canvasContainer.pageMarginTop,
          cellPaddingLeft: this.canvasContainer.cellPaddingLeft,
          cellPaddingTop: this.canvasContainer.cellPaddingTop,
          docSize: {
            orientation: this.getOrientation(),
            unit: "pt",
            format: this.getFormat(),
          },
        };
      } else {
        printConfig = this.printconfig;
      }

      let printMode = this.canvasContainer.printMode;
      if (this.printmode) {
        printMode = this.printmode;
      }
      // static printing
      if (printMode === "static") {
        setTimeout(() => {
          var config = {
            canvasContainer: this.canvasContainer,
          };

          if (this.config) {
            
            if('canvasContainer' in this.config){
              config = this.config;
            }else{
              config = {
                canvasContainer: this.config
              }
            }
            
          }

          if (this.editor) {
            this.editor.staticPrint(printConfig, config);

          } else {
            this.canvasContainer.editor.staticPrint(printConfig, config);
          }

          stats.isBusy = false;
        });
      }

      // dynamic printing

      if (printMode === "dynamic") {
        setTimeout(() => {
          // if (!this.canvasContainer.sheetData) {
          //   alert("You do not have any data. Please Import your data.");
          //   stats.isBusy = false;
          //   return;
          // }

          var config = {
            sheetData: this.canvasContainer.sheetData,
            mappedData: this.canvasContainer.mappedData,
            printQuality: this.canvasContainer.printQuality,
            ignoreFirstRow: this.dataSettings.ignoreFirstRow,
            dataSelection: this.dataSettings.dataSelection,
            selectedData: this.dataSettings.selectedData,
            cellWidth: this.canvasContainer.cellWidth,
            cellHeight: this.canvasContainer.cellHeight,
            range: this.dataSettings.range,
          };

          if (this.config) {
            config = this.config;
          }
          if (!this.config.range) {
            this.config.range = {
              from: 1,
              to: 4,
            }
          }

          if (!config.sheetData) {
            alert("You do not have any data. Please Import your data.");
            stats.isBusy = false;
            return;
          }
          

          if (this.editor) {
            this.editor.dynamicPrint(printConfig, config).then((e) => {
              stats.isBusy = false;
            });
          } else {
            this.canvasContainer.editor
              .dynamicPrint(printConfig, config)
              .then((e) => {
                stats.isBusy = false;
              });
          }
        });
      }
    },
  },
  mounted() {
    this._keyListener = function (e) {
      if (e.key === "p" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();

        this.printPage();
      }
    };

    document.addEventListener("keydown", this._keyListener.bind(this));

  },
};
</script>