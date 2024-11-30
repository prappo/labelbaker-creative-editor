import { reactive } from "vue";

export const canvasContainer = reactive({
  editor: null,
  pageWidth: 595.28,
  pageHeight: 841.89,
  layoutPageWidth: 595.28,
  layoutPageHeight: 841.89,
  pageMargin: 0,
  cellHeight: 100,
  cellWidth: 200,
  layoutCellHeight: 100,
  layoutCellWidth: 200,
  cellPadding: 0,
  pageMarginLeft: 0,
  pageMarginTop: 0,
  cellPaddingLeft: 0,
  cellPaddingTop: 0,
  layoutPageMarginLeft: 0,
  layoutPageMarginTop: 0,
  layoutCellPaddingLeft: 0,
  layoutCellPaddingTop: 0,
  layoutApplied: false,
  unit: "px",
  useLayout: false,
  numberOfCellPrint: 2,
  printQuality: 3,
  format: "a4",
  printMode: "static",
  sheetData: null,
  mappedData: [],
  enableRuler: false,
  enableGrid: false,
  enableGuide: false,
  icons: null,
  zoomScale: 0.1,
  woocommerceUrl: '',
  woocommerceConsumerKey: null,
  woocommerceConsumerSecret: null,
  semitic: 'ltr',
  defaultLang: 'en',
  ignoreFirstRow: false,
  dataSelection: 'printAllData',
  selectedData: [],
  range: {
    from: 1,
    to: 4,
  }
});
