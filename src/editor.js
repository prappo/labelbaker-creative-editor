import { EditorBase } from "./editor-parts/base";
import { setupLayers } from "./editor-parts/layers";
import { events } from "./editor-parts/events";
import { shapes } from "./editor-parts/shapes";
import { utils } from "./editor-parts/utils";
import { media } from "./editor-parts/media";
import { selection } from "./editor-parts/selection";
import { container } from "./editor-parts/container";
import { exportMethods } from "./editor-parts/export";
import { style } from "./editor-parts/style";
import { group } from "./editor-parts/group";
import { marker } from "./editor-parts/marker";
import { Circle, Rect, Text, Line } from "./tools";
import snapping from "./libs/snapping";
import Core from "./init";
import { Print, Sheet } from "./libs";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

export class Editor extends EditorBase {
  constructor(config) {
    super(config);
    this.setupStage();
    this.setupLayers();
    this.setupTransformer();
    this.setupLibraries();
  }
}

// Mix in all the functionality
Object.assign(Editor.prototype, 
  setupLayers,
  events,
  shapes,
  utils,
  media,
  selection,
  container,
  exportMethods,
  style,
  group,
  marker
);

export { Core, Print, Sheet, QRCode, JsBarcode as Barcode };
