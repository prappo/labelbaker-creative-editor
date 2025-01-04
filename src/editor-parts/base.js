import Core from "../init";
import Konva from "konva";
import configuration from "../config";
import Features from "../libs/features";
import History from "../libs/history";
import Naming from "../libs/naming";
import DataImport from "../libs/import";
import Selection from "../libs/selection";
import Printing from "../libs/printing";
import LayoutMaker from "../libs/layoutmaker";
import InputField from "../libs/input-field";
import ConvertToHTML from "../libs/convert-to-html";
import { Print, Sheet } from "../libs";
import { applyAnimation } from "../libs/animation";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

export class EditorBase {
  constructor(config) {
    this.initializeProperties(config);
  }

  initializeProperties(config) {
    this.templateName = '';
    this.templateId = '';
    this.editorHeight = config.height;
    this.editorWidth = config.width; 
    this.pageWidth = config.pageWidth;
    this.pageHeight = config.pageHeight;
    this.container = config.container;
    this.containerWrapper = config.containerWrapper;
    this.readOnly = config.readOnly;
    this.core = Core;
    this.Konva = Konva;
    this.elements = [];
    this.selected = null;
    this.eventName = "editor_element_change";
    this.eventSelected = "editor_selected_element";
    this.changeEvent = new CustomEvent(this.eventName);
    this.selectEvent = new CustomEvent(this.eventSelected);
    this.blockSnapSize = 10;
    this.lockedItems = [];
    this.act = "browser";
    this.groupCount = 0;
    this.copiedStyle = null;
    this.defaultConfiguration = configuration;
    this.medias = [];
    this.enableGrid = false;
    this.enableRuler = false;

    // Clear any existing intervals
    window.lableBakerIntervals = [];
  }

  setupStage() {
    const stageConfig = {
      height: this.editorHeight,
      width: this.editorWidth,
      container: this.act === "browser" ? this.container : undefined
    };

    this.editor = new this.core.Stage(stageConfig);
    this.editor.setAttr('type', 'stage');
  }

  setupTransformer() {
    this.transform = new this.core.Transformer({
      shouldOverdrawWholeArea: true,
      ignoreStroke: true,
      padding: 10,
    });
    this.transform.name("transform");
    this.layer.add(this.transform);
  }

  setupLibraries() {
    // Setup animation
    this.anim = new this.Konva.Animation(() => {}, this.layer);

    // Initialize libraries based on mode
    if (!this.readOnly) {
      this.Features = new Features(this);
      this.Selection = new Selection(this);
      this.Selection.addSelection();
      this.History = new History(this);
    }

    // Common libraries
    this.Naming = new Naming(this);
    this.ImportData = new DataImport(this);
    this.Printing = new Printing(this);
    this.LayoutMaker = LayoutMaker;
    this.ConvertToHTML = new ConvertToHTML(this);
    
    // External libraries
    this.QRCode = QRCode;
    this.Barcode = JsBarcode;
    this.Print = Print;
    this.Sheet = Sheet;
    this.InputField = InputField;
  }

  updateImage(obj, image, config = {}) {
    let io = new Image();
    io.crossOrigin = "Anonymous";
    io.onload = () => {
      

      let calculation = this.calculateNewSize(io.width, io.height, obj.width());
      obj.image(io);
      obj.width(calculation.width);
      obj.height(calculation.height);

      if (!this.isEmpty(config)) {
        obj.setAttrs(config);
      }
      obj.setAttr('imageSrc', image)
    };

    io.src = image;
  }

  animation(animationName, el, duration) {
    applyAnimation(this.editor, this.layer, animationName, el, duration);
  }

  add(object) {
    object.on("click tap", () => {
      this.onClick(object);
    });

    object.on("dblclick dbltap", () => {
      this.onDobleClick(object);
    });

    object.on("mouseenter", () => {
      this.onMouseenter(object);
    });

    object.on("mouseleave", () => {
      this.onMouseleave(object);
    });

    this.elements.push(object);
    this.layer.add(object);
    this.onLoad(object);
  }

  onLoad(object) {
    // disable warning
    console.warn = () => { };
    this.transform.zIndex(99999);

    let blockSnapSize = this.blockSnapSize;
    let shadowRectangle = this.shadowRectangle;
    if (object.getAttr("name")) {
      object.name(object.getAttr("name"));
    } else {
      object.name(this.Naming.generateName(object.attrs.type));
    }

    object.draggable(!this.readOnly);

    // if editor mode
    if (!this.readOnly) {
      this.transform.nodes([object]);
      this.selected = object;
      this.selectEvent.data = object;
      document.dispatchEvent(this.selectEvent);

      // Add transform and drag events
      this.setupObjectEvents(object);
    }

    // if preview mode
    if (this.readOnly) {
      // If animation enabled
      const animationFor = "common_";
      this.animate(object, animationFor);
    }
  }

  setupObjectEvents(object) {
    object.on("transform", function() {
      if (object.attrs.type === 'group') {
        return;
      }

      if (this.attrs.type === "line") {
        const oldPoints = this.points();
        const newPoints = [];
        for (var i = 0; i < oldPoints.length / 2; i++) {
          const point = {
            x: oldPoints[i * 2] * this.scaleX(),
            y: oldPoints[i * 2 + 1] * this.scaleY(),
          };
          newPoints.push(point.x, point.y);
        }
        this.points(newPoints);
      }

      this.width(Math.max(1, this.width() * this.scaleX()));
      this.height(Math.max(1, this.height() * this.scaleY()));
      this.scaleX(1);
      this.scaleY(1);
    });

    // Add other event handlers as needed
  }
} 