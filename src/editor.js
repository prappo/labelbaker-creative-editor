import Core from "./init";
import configuration from "./config";
import { Circle, Rect, Text, Line } from "./tools";
import { Print, Sheet } from "./libs";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import snapping from "./libs/snapping";
import Konva from "konva";
import Features from "./libs/features";
import History from "./libs/history";
import Naming from "./libs/naming";
import DataImport from "./libs/import";
import Grid from "./libs/grid";
import Ruler from "./libs/ruler";
import Selection from "./libs/selection";
import Printing from "./libs/printing";
import LayoutMaker from "./libs/layoutmaker";
import URLControl from "./libs/url";
import InputField from "./libs/input-field"
import { applyAnimation } from "./libs/animation";
import ConvertToHTML from "./libs/convert-to-html";
export class Editor {
  constructor(config) {
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
    this.elements = []; // list of created elements
    this.selected = null; // selected object
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

    // globals
    window.lableBakerIntervals = [];

    if (this.act === "browser") {
      this.editor = new Core.Stage({
        height: this.editorHeight,
        width: this.editorWidth,
        container: this.container,
      });
    } else {
      this.editor = new Core.Stage({
        height: this.editorHeight,
        width: this.editorWidth,
      });
    }

    this.editor.setAttr('type', 'stage')

    this.enableGrid = false;
    this.enableRuler = false;

    // Background layer

    this.backgroundLayer = new Core.Layer();
    this.backgroundLayer.name("backgroundLayer");
    this.editor.add(this.backgroundLayer);

    // add background to background layer

    this.background = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.editorWidth,
      height: this.editorHeight,
      fill: "#ffffffff",
      name: "stageBackground",
      type: "background",
    });

    this.background.on("click tap", () => {
      this.deselect();
    });

    this.backgroundLayer.add(this.background);

    // Grid Layer
    this.gridLayer = new Core.Layer();
    this.gridLayer.name("gridLayer");
    this.editor.add(this.gridLayer);

    // Ruler layer

    this.rulerLayer = new Core.Layer();
    this.rulerLayer.name("rulerLayer");
    this.editor.add(this.rulerLayer);

    // Main layer
    this.layer = new Core.Layer();
    this.layer.name("mainLayer");
    this.editor.add(this.layer);

    this.hiddenLayer = new Core.Layer();
    this.hiddenLayer.name("hiddenLayer");
    this.editor.add(this.hiddenLayer);

    // Add grid
    this.grid = new Grid(this);
    this.shadowRectangle = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.blockSnapSize * 6,
      height: this.blockSnapSize * 3,
      fill: "#FF7B17",
      opacity: 0.6,
      stroke: "#CF6412",
      strokeWidth: 1,
      dash: [5, 2],
      name: "shadowBox",
    });

    this.marker = new Konva.Rect({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      fill: "#FF7B17",
      opacity: 0.6,
      name: "marker",
    });

    this.hiddenLayer.add(this.marker);

    this.grid.addGrid();

    // Add ruler
    this.rulerTickSize = 4;
    this.rulerTickSpacing = 10;
    this.rulerFontSize = 2;
    this.rulerFontColor = "#333";
    this.ruler = new Ruler(this);
    this.ruler.addRuler();

    this.transform = new Core.Transformer({
      shouldOverdrawWholeArea: true,
      ignoreStroke: true,
      padding: 10,
    });
    this.transform.name("transform");
    snapping(this.editor, this.layer, this.transform);
    this.layer.add(this.transform);

    // libs
    // this.cleanUp(this.editor, this.transform);
    this.QRCode = QRCode;
    this.Barcode = JsBarcode;
    this.Print = Print;
    this.Sheet = Sheet;
    this.InputField = InputField;

    // anim

    this.anim = new Konva.Animation(function () {
      // do nothing, animation just need to update the layer
    }, this.layer);

    if (!this.readOnly) {
      this.Features = new Features(this);
      this.Selection = new Selection(this);
      this.Selection.addSelection();
      this.History = new History(this);
    }

    this.Naming = new Naming(this);
    this.ImportData = new DataImport(this);
    this.Printing = new Printing(this);
    this.LayoutMaker = LayoutMaker;
    this.ConvertToHTML = new ConvertToHTML(this)

  }

  mark(obj) {
    this.marker.x(obj.x());
    this.marker.y(obj.y());
    this.marker.height(obj.height());
    this.marker.width(obj.width());
  }

  resetMark() {
    this.marker.x(0);
    this.marker.y(0);
    this.marker.height(0);
    this.marker.width(0);
  }

  undo() {
    this.History.undo();
  }

  selectAll() {
    let items = [];
    this.layer.children.forEach((item) => {
      if (item.getClassName() !== "Transformer") {
        items.push(item);
      }
    });

    this.transform.nodes(items);
  }

  hideAnchor() {
    this.editor.find(".anchor").forEach((el) => {
      el.hide();
    });
  }

  backToOrginalSize() {
    this.editor.width(this.editorWidth / this.editor.scaleX());
    this.editor.height(this.editorHeight / this.editor.scaleY());
    this.editor.scale({ x: 1, y: 1 });

    // var backgroundScale = containerWidth / sceneWidth;
    // this.background.width(sceneWidth * backgroundScale);
    // this.background.height(sceneHeight * backgroundScale);
    // this.background.scale({ x: backgroundScale, y: backgroundScale });
  }

  fitIntoContainer(mood = "fit") {
    var container = document.querySelector("#preview-canvas-holder");

    if (this.containerWrapper) {
      container = document.querySelector("#" + this.containerWrapper);
    }

    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;
    var sceneWidth = this.editorWidth;
    var sceneHeight = this.editorHeight;

    if (mood === "fit") {
      if (sceneWidth > sceneHeight) {
        var scale = containerWidth / sceneWidth;
      } else {
        var scale = containerHeight / sceneHeight;
      }
    } else {
      // if mood is fill
      var scale = containerWidth / sceneWidth;
    }

    this.editor.width(sceneWidth * scale);
    this.editor.height(sceneHeight * scale);
    this.editor.scale({ x: scale, y: scale });


    // fit background

    this.background.width(this.editorWidth);
    this.background.height(this.editorHeight);


  }

  zoom(value) {
    var container = document.querySelector("#preview-canvas-holder");

    if (this.containerWrapper) {
      container = document.querySelector("#" + this.containerWrapper);
    }

    var containerWidth = container.offsetWidth;
    var sceneWidth = this.editorWidth;
    var sceneHeight = this.editorHeight;

    var scale = containerWidth / sceneWidth + value;
    this.editor.width(sceneWidth * scale);
    this.editor.height(sceneHeight * scale);
    this.editor.scale({ x: scale, y: scale });
  }

  addText(config) {
    const txt = Text(config);
    this.add(txt);
    return txt;
  }

  addRect(config) {
    const obj = Rect(config);
    this.add(obj);
    return obj;
  }

  getShape(config) {
    return {
      clipFunc: (ctx) => {
        ctx.arc(0, 0, 30, 0, Math.PI * 2, false);
      },
      type: "shape",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      draggable: true,
    };
  }

  addShape(config) {
    if (this.isEmpty(config)) {
      config = {};
    }

    var shape = new Konva.Group(this.getShape(config));

    let rect = this.addTriangle({});
    shape.add(rect);
    this.add(shape);
  }

  addTriangle(config) {
    if (this.isEmpty(config)) {
      config = {
        x: this.getXCenter(this.getSize(), this.getSize()),
        y: this.getYCenter(this.getSize(), this.getSize()),
        sides: 3,
        radius: this.getSize(),
        fill: Konva.Util.getRandomColor(),
        stroke: Konva.Util.getRandomColor(),
        strokeWidth: 0,
        draggable: true,
        strokeScaleEnabled: false,
        type: "triangle",
      };
    }
    var triangle = new Core.RegularPolygon(config);
    this.add(triangle);
    return triangle;
  }

  addPolygon(config) {
    if (this.isEmpty(config)) {
      config = {
        x: this.getXCenter(this.getSize(), this.getSize()),
        y: this.getXCenter(this.getSize(), this.getSize()),
        sides: 6,
        radius: this.getSize(),
        fill: Konva.Util.getRandomColor(),
        stroke: Konva.Util.getRandomColor(),
        strokeWidth: 0,
        draggable: true,
        strokeScaleEnabled: false,
        type: "polygon",
      };
    }
    var polygon = new Core.RegularPolygon(config);
    this.add(polygon);
    return polygon;
  }

  addOval(config) {
    if (this.isEmpty(config)) {
      config = {
        x: this.getXCenter(this.getSize(), this.getSize()),
        y: this.getXCenter(this.getSize(), this.getSize()),
        radiusX: this.getSize() / 2,
        radiusY: this.getSize(),
        fill: Konva.Util.getRandomColor(),
        stroke: Konva.Util.getRandomColor(),
        strokeWidth: 0,
        strokeScaleEnabled: false,
        draggable: true,
        type: "oval",
      };
    }
    var oval = new Core.Ellipse(config);
    this.add(oval);
    return oval;
  }

  addArc(config) {
    if (this.isEmpty(config)) {
      config = {
        x: this.getXCenter(this.getSize()),
        y: this.getXCenter(this.getSize()),
        innerRadius: this.getSize() / 2,
        outerRadius: this.getSize(),
        strokeScaleEnabled: false,
        angle: 300,
        fill: Konva.Util.getRandomColor(),
        stroke: Konva.Util.getRandomColor(),
        strokeWidth: 0,
        draggable: true,
        type: "arc",
      };
    }
    var arc = new Konva.Arc(config);

    this.add(arc);
    return arc;
  }

  addStar(config) {
    if (this.isEmpty(config)) {
      config = {
        x: this.getXCenter(this.getSize()),
        y: this.getXCenter(this.getSize()),
        numPoints: 6,
        innerRadius: this.getSize() / 1.7,
        outerRadius: this.getSize(),
        fill: Konva.Util.getRandomColor(),
        stroke: Konva.Util.getRandomColor(),
        strokeScaleEnabled: false,
        strokeWidth: 4,
        draggable: true,
        type: "star",
      };
    }
    var star = new Konva.Star(config);

    this.add(star);
    return star;
  }

  addCircle(config) {
    const obj = Circle(config);
    this.add(obj);
    return obj;
  }

  addLine(config) {
    if (this.isEmpty(config)) {
      config = {
        points: [10, 10, this.getSize(), this.getSize() / 2],
        stroke: Konva.Util.getRandomColor(),
        strokeWidth: this.getSize() / 50,
        type: "line",
        draggable: true,
      };
    }
    let line = new Konva.Line(config);

    this.add(line);

    // this.Features.addLine(config);
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  clearIntervals() {
    if (!window.lableBakerIntervals) {
      return;
    }
    for (let i = 0; i < window.lableBakerIntervals.length; i++) {
      clearInterval(window.lableBakerIntervals[i]);
    }
  }

  getSize() {
    let size = this.editorHeight / 3;
    if (this.editorHeight > this.editorWidth) {
      size = this.editorWidth / 3;
    }
    return size;
  }

  getYCenter(height, extra = 0) {
    if (extra > 0) {
      extra = height / 2;
    }
    return this.editorHeight / 2 - height / 2 + extra;
  }
  getXCenter(width, extra = 0) {
    if (extra > 0) {
      extra = width / 2;
    }
    return this.editorWidth / 2 - width / 2 + extra;
  }

  createVideoElement(src) {
    const videoElement = document.createElement('video');
    videoElement.src = src;  // replace with your video path
    videoElement.controls = true;
    videoElement.muted = true;
    videoElement.crossOrigin = 'anonymous';
    return videoElement;
  }

  addMediaOptionsEvent(config, mediaElement) {

    let progressBar = null;
    let orignalWidth = 0;
    if (config.progressBar) {
      let p = this.editor.find('.' + config.progressBar);
      if (p.length > 0) {
        progressBar = p[0];
        orignalWidth = progressBar.width();
      }
    }




    mediaElement.ontimeupdate = (e) => {

      if (!this.readOnly) {
        return;
      }

      if (progressBar) {
        // let data = (mediaElement.currentTime / 100) * orignalWidth * (mediaElement.duration / orignalWidth);
        // const currentTime = audio.currentTime;

        // Calculate the progress as a fraction of current time over audio duration
        const progress = (mediaElement.currentTime / mediaElement.duration) * orignalWidth;
        progressBar.width(progress)
       
      }


    }

    if (config.playBtn) {
      let playBtn = this.editor.find('.' + config.playBtn);
      // if play button found
      if (playBtn.length > 0) {
        playBtn[0].on('click', () => {
         
          mediaElement.play();

        })
      }
    }

    // pause button event

    if (config.pauseBtn) {
      let pauseBtn = this.editor.find('.' + config.pauseBtn);
      // if play button found
      if (pauseBtn.length > 0) {
        pauseBtn[0].on('click', () => {
   
          mediaElement.pause();

        })
      }
    }
  }

  addAudio(config, defaultAudio = '') {
    // let defaultAudio = "http://localhost:5173/music.mp3";

    let audioURL = defaultAudio;
    if (!this.isEmpty(config)) {
      audioURL = config.audioSrc;
    }

    const videoElement = this.createVideoElement(audioURL);

    const defaultConfig = {
      x: 50,
      y: 50,
      type: 'audio',
      image: videoElement,
      draggable: true,
      width: this.editorWidth / 3,
      height: this.editorWidth / 3,
    }

    return new Promise((resolve, reject) => {


      videoElement.onloadedmetadata = (e) => {
     
        let conf = config;
        if (this.isEmpty(config)) {
          conf = defaultConfig;
        } else {
          config.image = videoElement;
        }

        var video = new Konva.Image(conf)

        // resize video 
        let calculation = this.calculateNewSize(
          videoElement.videoWidth,
          videoElement.videoHeight,
          video.width()
        );
        video.width(calculation.width);
        video.height(calculation.height);
        video.setAttr('audioSrc', audioURL);

        this.medias.push(videoElement)
        video.hide(true)
        this.add(video);
        // Start the video
        videoElement.play();

        // if editor mode
        if (!this.readOnly) {
          videoElement.pause();
        } else {
          videoElement.muted = conf?.isMuted ?? false;
          if (conf?.isAutoPlay ?? true) {
            videoElement.pause();
          }

        }

        this.anim.start()
      };

      this.addMediaOptionsEvent(config, videoElement)

      resolve();
    });
  }

  updateVideo(selected, videoUrl) {
    let config = selected.attrs;
    if (config.type === 'audio') {
      config.audioSrc = videoUrl;
    }

    config.videoSrc = videoUrl;
    selected.destroy();
    let conf = JSON.parse(JSON.stringify(config));
   

    if (conf.type === 'audio') {
      this.addAudio(conf)
    } else {
      this.addVideo(conf);
    }

  }


  addVideo(config) {
    let defaultVideo = "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm";
    let videoUrl = defaultVideo;
    if (!this.isEmpty(config)) {
      videoUrl = config.videoSrc;
    }
    const videoElement = this.createVideoElement(videoUrl);
    const defaultConfig = {
      x: 50,
      y: 50,
      type: 'video',
      image: videoElement,
      draggable: true,
      width: this.editorWidth / 3,
      height: this.editorWidth / 3,
    }

    return new Promise((resolve, reject) => {

      videoElement.onloadedmetadata = () => {
        let conf = config;
        if (this.isEmpty(config)) {
          conf = defaultConfig;
        } else {
          config.image = videoElement;
        }

        var video = new Konva.Image(conf)
        // resize video 

        // if (this.isEmpty(config)) {
        let calculation = this.calculateNewSize(
          videoElement.videoWidth,
          videoElement.videoHeight,
          video.width()
        );
        video.width(calculation.width);
        video.height(calculation.height);
        video.setAttr('videoSrc', videoUrl);
        // }

        this.add(video);

        this.medias.push(videoElement)

        // Start the video
        videoElement.play();

        // if editor mode
        if (!this.readOnly) {
          videoElement.pause();
        } else {
          videoElement.muted = conf?.isMuted ?? false;
          if (conf?.isAutoPlay ?? true) {
            videoElement.pause();
          }

        }

        this.anim.start()
      };

      resolve();
    });
  }

  addImage(config) {
    return new Promise((resolve, reject) => {
      if (this.isEmpty(config)) {
        let imgUrl = configuration.placeHolderImage;
        var imageObj = new Image();
        imageObj.crossOrigin = "Anonymous";
        imageObj.onload = () => {
          var img = new Core.Image({
            x: this.getXCenter(this.getSize()),
            y: this.getYCenter(this.getSize()),
            image: imageObj,
            width: this.getSize(),
            height: this.getSize(),
            draggable: true,
            strokeWidth: 0,
            strokeScaleEnabled: false,
            type: "image",
          });
          this.add(img);
          resolve(img);
        };
        imageObj.src = imgUrl;
      } else {
        let imgUrl = config.src;

        if (config.hasOwnProperty("imageSrc")) {
          imgUrl = config.imageSrc;
        }
        if (config.hasOwnProperty("src")) {
          imgUrl = config.src;
        }
        var imageObj = new Image();
        imageObj.crossOrigin = "Anonymous";
        var initConfig = {
          x: config.x,
          y: config.y,
          image: imageObj,
          width: config.width,
          height: config.height,
          draggable: true,
          strokeWidth: 0,
          type: "image",
        };

        var finalConfig = {
          ...initConfig,
          ...config,
        };

        imageObj.onload = () => {
          var img = new Core.Image(finalConfig);
          this.add(img);
          resolve(img);
        };
        imageObj.src = imgUrl;
      }
    });
  }

  addSvg(config) {
    if (this.isEmpty(config)) {
      config = {
        type: "svg",
        imageSrc: configuration.svgPlaceholder,
      };
    }

    return Konva.Image.fromURL(config.imageSrc, (image) => {
      image.setAttrs(config);
      image.draggable(true);
      this.add(image);
      this.layer.draw();
    });
  }

  addPath(config) {
    if (this.isEmpty(config)) {
      config = {
        x: 10,
        y: 10,
        data: "M213.1,6.7c-32.4-14.4-73.7,0-88.1,30.6C110.6,4.9,67.5-9.5,36.9,6.7C2.8,22.9-13.4,62.4,13.5,110.9C33.3,145.1,67.5,170.3,125,217c59.3-46.7,93.5-71.9,111.5-106.1C263.4,64.2,247.2,22.9,213.1,6.7z",
        fill: "green",
        scaleX: 0.1,
        scaleY: 0.1,
        type: "path",
        draggable: true,
      };
    }

    let path = new Konva.Path(config);
    this.add(path);
  }

  calculateNewSize(originalWidth, originalHeight, desiredWidth) {
    var aspectRatio = originalWidth / originalHeight;
    var newHeight = desiredWidth / aspectRatio;

    return {
      width: desiredWidth,
      height: newHeight,
    };
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

  addQrcode(config) {
    return new Promise((resolve, reject) => {
      if (this.isEmpty(config)) {
        config = {
          x: this.getXCenter(this.getSize()),
          y: this.getYCenter(this.getSize()),
          width: this.getSize(),
          height: this.getSize(),
          type: "qrcode",
          qrvalue: "hello",
        };
      }

      QRCode.toDataURL(config.qrvalue, { errorCorrectionLevel: "H" })
        .then((url) => {
          let imgUrl = url;

          Konva.Image.fromURL(imgUrl, (image) => {
            image.setAttrs(config);
            this.add(image);
            resolve(image);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addBarcodeBasic(config) {
    if (this.isEmpty(config)) {
      config = {
        type: "barcodeBasic",
        x: 1,
        y: 1,
        text: "*1234*",
        fontSize: this.editorWidth / 10,
        fontFamily: "Libre Barcode 39",
        fill: "#000000",
        stroke: "#000000",
        strokeWidth: 0,
        draggable: true,
        strokeScaleEnabled: false,
      };
    }

    return this.addText(config);
  }

  addBarcode(config) {
    var text = "1234";
    var format = "CODE39";
    var displayValue = false;
    if (this.isEmpty(config)) {
      config = {
        x: this.getXCenter(this.getSize()),
        y: this.getYCenter(this.getSize()),
        width: this.getSize(),
        height: this.getSize() / 2,
        draggable: true,
        type: "barcode",
        barcode: text,
        displayValue: false,
        format: "CODE39",
      };
    } else {
      text = config.barcode;
    }

    format = config.format;
    displayValue = config.displayValue;

    var canvas = document.createElement("canvas");

    JsBarcode(canvas, text, { format: format, displayValue: displayValue });
    var img = canvas.toDataURL("image/png");
    let imgUrl = img;
    var imageObj = new Image();
    imageObj.crossOrigin = "Anonymous";
    imageObj.onload = () => {
      config.image = imageObj;
      var img = new Core.Image(config);
      this.add(img);
    };
    imageObj.src = imgUrl;
  }

  lockUnlock() {
    if (this.lockedItems.includes(this.selected)) {
      let index = this.lockedItems.indexOf(this.selected);
      if (index > -1) {
        this.lockedItems.splice(index, 1);
      }
      this.transform.nodes([this.selected]);
      this.selected.draggable(true);
    } else {
      this.lockedItems.push(this.selected);
      this.transform.nodes([]);
      this.selected.draggable(false);
    }
  }

  isLocked() {
    return this.lockedItems.includes(this.selected);
  }

  selectItem(item) {
    this.selected = item;
    this.selectEvent.data = item;

    document.dispatchEvent(this.selectEvent);
  }

  add(object) {
    object.on("click tap", () => {
      this.onClick(object);
    });

    object.on("dblclick dbltap", () => {
      this.onDobleClick(object);
    })

    object.on("mouseenter", () => {
      this.onMouseenter(object);
    });

    object.on("mouseleave", () => {
      this.onMouseleave(object);
    });

    this.onLoad(object);
  }

  manipulateTarget(targetFor, object) {

    let prop = targetFor + 'targetElements';

    if (object.attrs?.[prop]) {
      let actions = object.attrs[prop];
      actions.forEach(action => {
        this.applyAction(action)
      })
    }
  }

  applyAction(action) {
    this.layer.find(`.${action.name}`).forEach(el => {
      let gAction = action.action[0];
      if (gAction) {
        if (gAction.src === 'func') {
          el.attrs[gAction.attr][gAction.value]();
        }
      }
  
    })
  }

  onDobleClick(object) {
    // input functionality

    if (object.attrs.type === 'text' && !this.readOnly) {
      (new this.InputField(this, object, 'textarea')).apply()
    }
  }

  onClick(object) {
    this.selected = object;
    this.selectEvent.data = object;
    this.selectItem(object);
    document.dispatchEvent(this.selectEvent);

    if (this.readOnly) {
      if (object.attrs?.onClickAction) {
        switch (object.attrs.onClickAction) {
          case "showHide":
            this.showHide(object, "onclick_");
            break;

          case "goToLink":
            URLControl.goToURL(object); // go to that link
            break;
        }
      }

      // manipulate target
      this.manipulateTarget('onclick_', object);

      // onclick animation

      if (object.attrs?.onclickanimationEnable) {
        this.animate(object, "onclick");
      }

      // input functionality

      if (object.attrs.type === 'text' && object.attrs.inputField) {
        (new this.InputField(this, object)).apply()
      }

    }

    if (!this.lockedItems.includes(object)) {
      if (!this.readOnly) {
        this.transform.nodes([object]);
      }
    } else {
      this.transform.nodes([]);
    }
  }

  onMouseenter(object) {
    if (this.readOnly) {
      if (object.attrs?.onClickAction) {
        this.editor.container().style.cursor = "pointer";
        URLControl.showPointerCursor(this.editor, object);
      }

      if (object.attrs?.hoveranimationEnable) {
        this.animate(object, "hover");
      }
    }
  }

  onMouseleave(object) {
    this.editor.container().style.cursor = "default";
    if (this.readOnly) {
      if (object.attrs?.hoveranimationEnable) {
        // object.tween.reverse();
      }
    }
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

    this.elements.push(object);
    this.layer.add(object);

    // if editor mode
    if (!this.readOnly) {
      this.transform.nodes([object]);

      // select object

      this.selected = object;

      this.selectEvent.data = object;
      document.dispatchEvent(this.selectEvent);

      //

      object.on("transform", function () {
        // self.changeEvent.data = this;
        // document.dispatchEvent(self.changeEvent);
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

        // if(this.attrs.type === 'image'){
        //   self.transform.keepRatio(true);
        //   self.transform.enabledAnchors( [
        //     'top-left',
        //     'top-right',
        //     'bottom-left',
        //     'bottom-right',
        //   ])

        // }
        // adjust size to scale
        // and set minimal size
        this.width(Math.max(1, this.width() * this.scaleX()));
        this.height(Math.max(1, this.height() * this.scaleY()));
        // reset scale to 1

        this.scaleX(1);
        this.scaleY(1);
      });

      object.on("dragstart", function (e) {
        if (self.enableGrid) {
          // shadow

          shadowRectangle.width(this.width());
          shadowRectangle.height(this.height());
          // shadowRectangle.scaleX(this.scaleX());
          // shadowRectangle.scaleY(this.scaleY())
          shadowRectangle.show();
          shadowRectangle.moveToTop();
          this.moveToTop();
        }
      });

      object.on("dragmove", function () {
        // self.changeEvent.data = this;
        // document.dispatchEvent(self.changeEvent);

        if (self.enableGrid) {
          // shadow and snapping
          let x = Math.round(this.x() / blockSnapSize) * blockSnapSize;
          let y = Math.round(this.y() / blockSnapSize) * blockSnapSize;
          let type = object.attrs.type;
          try {
            if (type === "arc" || type === "star") {
              x = x - object.outerRadius();
              y = y - object.outerRadius();
            } else if (
              type === "triangle" ||
              type === "circle" ||
              type === "polygon"
            ) {
              x = x - object.radius();
              y = y - object.radius();
            } else if (type === "line") {
              x = x + object.attrs.points[0];
              y = y + object.attrs.points[1];
            } else if (type === "oval") {
              x = x - object.radiusX();
              y = y - object.radiusY();
            }

            shadowRectangle.position({
              x: x,
              y: y,
            });
          } catch (e) { }

          // self.editor.batchDraw();
        }
      });

      object.on("dragend", (e) => {
        if (!self.readOnly) {
          this.History.addHistory(this.editor.toJSON());
        }

        if (self.enableGrid) {
          // shadow and snapping

          this.position({
            x: Math.round(this.x() / blockSnapSize) * blockSnapSize,
            y: Math.round(this.y() / blockSnapSize) * blockSnapSize,
          });
          self.editor.batchDraw();
          shadowRectangle.hide();
        }
      });

      // transform events

      let previousScaleX = 0;
      let previousScaleY = 0;

      object.on("transformstart", function (e) {
        previousScaleX = e.target.scaleX();
        previousScaleY = e.target.scaleY();
      });

      object.on("transformend", (e) => {
        if (!this.readOnly) {
          this.History.addHistory(this.editor.toJSON());
        }
      });
    }

    // if preview mode

    if (this.readOnly) {
      // If animation enabled
      const animationFor = "common_";
      this.animate(object, animationFor);
    }
  }

  showHide(object, showHideFor) {
    if (object.attrs?.onclick_showHideElements) {
      for (let el of object.attrs[showHideFor + "showHideElements"]) {
        const lookingFor = this.layer.find((ele) => ele.name() === el.name);
        if (lookingFor.length > 0) {
          lookingFor.forEach((ggEl) => {
            ggEl[el.action]();
          });
        }
      }
    }
  }

  animation(animationName, el, duration) {
    applyAnimation(this.editor, this.layer, animationName, el, duration);
  }

  animate(object, animationFor) {
    if (object.attrs?.[animationFor + "animationEnable"] ?? false) {
      // default animation
      let animationType =
        object.attrs?.[animationFor + "animationType"] ?? "default";

      if (animationType === "default") {
        if (object.getAttr(animationFor + "animation")) {
          this.animation(object.getAttr(animationFor + "animation"), object);
        }
      }

      // custon animation

      if (animationType === "custom") {
        if (object.getAttr(animationFor + "easing")) {
          if (object.attrs.easing !== "-None-") {
            let actions = {
              node: object,
              easing: Konva.Easings[object.getAttr(animationFor + "easing")],
              duration: object.attrs?.[animationFor + "easingDuration"] ?? 2,
              onFinish: function () {
                let isLoop =
                  object.attrs?.[animationFor + "easingLoop"] ?? false;
                if (isLoop) {
                  this.reverse();
                }
              },
            };

            let properties = {};

            if (object.attrs?.[animationFor + "easingProperties"]) {
              properties = object.attrs[animationFor + "easingProperties"];
            }

            let tweenConfig = {
              ...actions,
              ...properties,
            };
            // var tween = new Konva.Tween({
            //   node: object,
            //   x: 831.3038370438564,
            //   y: -14.318181818181818,
            //   // scaleX: 0.5,
            //   // scaleY: 0.5,
            //   opacity:1,
            //   easing: Konva.Easings[object.getAttr(animationFor + 'easing')],
            //   duration: object.attrs?.[animationFor + 'easingDuration' ] ?? 2,
            //   onFinish: function() {
            //     let isLoop = object.attrs?.[animationFor + 'easingLoop'] ?? false;
            //     if(isLoop){
            //       this.reverse()
            //     }

            //   },

            // });
            var tween = new Konva.Tween(tweenConfig);

            object.tween = tween;

            // Animation start time
            let startTime = object.attrs?.[animationFor + "easingStart"] ?? 0;

            if (startTime !== 0) {
              setTimeout(() => {
                object.tween.play();
              }, parseInt(object.attrs[animationFor + "easingStart"]) * 1000);
            } else {
              object.tween.play();
            }
          }
        }
      }
    } else {
    }
  }

  getElements() {
    return this.elements;
  }

  getElement(id) {
    return this.layer.children.filter((el) => el._id === id);
  }

  sheetToJson(data) {
    var jsonData = XLSX.utils.sheet_to_json(data, { header: 1 });
    return jsonData;
  }

  getSelected() {
    return this.selected;
  }

  setEelement(id, config) {
    let obj = this.elements.filter((el) => el._id === parseInt(id));
    if (obj.length !== 0) {
      obj[0].text(config.text);
    }
    return this;
  }

  moveUp() {
    const tr = this.layer.find("Transformer");
    try {
      tr[0]._nodes[0].moveUp();
    } catch (err) { }
  }

  moveDown() {
    const tr = this.layer.find("Transformer");
    try {
      tr[0]._nodes[0].moveDown();
    } catch (err) { }
  }

  clearAll() {
    this.clearEditor();
    this.medias.forEach(media => {

      media.pause()
    })
    document.dispatchEvent(this.selectEvent);
    // this.anim.stop();
    // localStorage.removeItem('editorData');
    // this.History.clearHistory();
  }

  clearEditor() {
    this.layer.children.forEach((item) => {
      setTimeout(() => {
        if (item.getClassName() === "Transformer") {
          return;
        }
        item.destroy();
      }, 100);
    });

    this.backgroundLayer.children.forEach((item) => {
      setTimeout(() => {
        if (item.name() === "stageBackground") {
          return;
        }
        item.destroy();
      }, 100);
    });
    this.transform.nodes([]);
    this.selectEvent.data = null;
  }

  deleteSelected() {
    const tr = this.layer.find("Transformer");

    try {
      this.transform.nodes().forEach((el) => el.destroy());
      this.transform.nodes([]);
      this.selectEvent.data = null;
      document.dispatchEvent(this.selectEvent);
    } catch (err) { }
  }

  duplicateSelected() {
    const tr = this.layer.find("Transformer");
    try {
      let els = [];
      this.transform.nodes().forEach((el) => {
        let cloned = el.clone({
          x: el.x() + 10,
          y: el.y() + 10,
        });
        cloned.name(
          cloned.name() +
          "_duplicate_" +
          Math.floor(Math.random() * (99 - 10 + 1) + 10)
        );
        this.layer.add(cloned);
        els.push(cloned);
      });

      this.selectItem(els);
      this.transform.nodes(els);
    } catch (err) { }
  }

  copyStyle() {
    this.copiedStyle = JSON.parse(JSON.stringify(this.selected.getAttrs()));
  }

  filterStyle(attrs) {
    let blackList = ["name", "image", "id", "x", "y"];
    for (let key in attrs) {
      if (typeof this.selected[key] !== "function") {
        delete attrs[key];
      } else {
        if (blackList.includes(key)) {
          delete attrs[key];
        }
      }
    }

 
    return attrs;
  }
  pasteStyle() {
    // this.filterStyle(this.copiedStyle)
  
    // if single selection
    if (this.selected) {
      let attrs = {
        ...this.selected.attrs,
        ...this.filterStyle(this.copiedStyle),
      };
      this.selected.setAttrs(attrs);
    } else {
      alert("You can't paste style on multiple selection");
    }

    // if multiple selection
    // ***todo
  }

  addGroup(group) {
    return new Promise((resolve, reject) => {
      if (group?.children) {
        let newGroup = new Konva.Group(group.attrs);
        this.groupCount++;
        newGroup.name(group.attrs.name);
        group.children.forEach((el, index) => {

          let functionName = this.ImportData.makeFunctionName(el);

          if (typeof this[functionName] === "function") {
            try {
              if (el.attrs.type == 'image') {
              
                this[functionName](el.attrs).then(ee => {
                  newGroup.add(ee);
                })
              } else {
                newGroup.add(this[functionName](el.attrs));
              }

            } catch (err) {
              console.log(err)
            }

          }
        });

        this.layer.add(newGroup);

        // events

        let object = newGroup;
        object.on("click tap", () => {
          this.onClick(object);
        });

        object.on("dblclick dbltap", () => {
          this.onDobleClick(object);
        })

        object.on("mouseenter", () => {
          this.onMouseenter(object);
        });

        object.on("mouseleave", () => {
          this.onMouseleave(object);
        });

        this.onLoad(object);

        resolve();
      }

      reject();
    });
  }

  groupSelected() {
    try {
      let nodes = this.transform.nodes();
      if (nodes.length > 1) {
        this.groupCount++;
        let firstElement = nodes[1];
        let group = new Konva.Group({
          x: 0,
          y: 0,
          type: "group",
          draggable: true,
        });

        group.name("Group " + this.groupCount);

        nodes.forEach((el) => {
          group.add(el);
        });

        group.on("click tap", () => {
          this.selected = group;
          // this.selectEvent.data = group;
          // this.selectItem(group);

          document.dispatchEvent(this.selectEvent);
        });

        this.layer.add(group);
      }

      // this.selectItem(els);
      // this.transform.nodes(els);
    } catch (err) { }
  }
  deselect() {
    this.resetMark();
    this.transform.nodes([]);
    this.selectEvent.data = null;
    document.dispatchEvent(this.selectEvent);
  }
  getOriginalImage(quality = 1) {
    let clonedEditor = this.editor.clone(this);
    clonedEditor.width(this.editorWidth / clonedEditor.scaleX());
    clonedEditor.height(this.editorHeight / clonedEditor.scaleY());
    return clonedEditor.toDataURL({ pixelRatio: quality });
  }

  save(quality = 3, data = {}, transparent = false) {
    this.deselect();
    let clonedEditor = this.editor.clone(this);
    clonedEditor.find(".gridLayer")[0].destroyChildren();
    clonedEditor.find(".rulerLayer")[0].destroyChildren();
    if (transparent) {
      clonedEditor.find(".backgroundLayer")[0].destroyChildren();
    }
    return clonedEditor.toDataURL({ pixelRatio: quality });
  }
  downloadAsImage() {
    this.deselect();
    let dataURL = this.save();
    this.downloadURI(dataURL, "template.jpeg");
  }
  exportToURL(url, additioinalParam = null) {
    return new Promise((resolve, reject) => {
      this.deselect();
      let imageData = this.save();
      const formData = new FormData();

      formData.append("image_data", imageData);

      // send additioal param if avilable
      if (additioinalParam) {
       
        formData.append('additional_params', additioinalParam);
      }

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  downloadAsTransparentImage() {
    this.deselect();
    let dataURL = this.save(3, {}, true);
    this.downloadURI(dataURL, "template.png");
  }

  getOrientation() {
    if (this.editorWidth > this.editorHeight) {
      return "l";
    }

    return "p";
  }

  getFormat() {
    return [this.editorWidth, this.editorHeight];
  }

  downloadAsPDF(returnData = null) {
    const printConfig = {
      pageWidth: this.editorWidth,
      pageHeight: this.editorHeight,
      cellWidth: this.editorWidth,
      cellHeight: this.editorHeight,
      cellPadding: 0,
      pageMargin: 0,
      pageMarginLeft: 0,
      pageMarginTop: 0,
      cellPaddingLeft: 0,
      cellPaddingTop: 0,
      docSize: {
        orientation: this.getOrientation(),
        unit: "pt",
        format: this.getFormat(),
      },
    };

    const config = {
      canvasContainer: {
        cellWidth: this.editorWidth,
        cellHeight: this.editorHeight,
        numberOfCellPrint: 1,
        printQuality: 3,
      },
    };

    if (returnData) {
      return this.staticPrint(printConfig, config, true);
    }
    this.staticPrint(printConfig, config);
  }

  downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  saveImage() {
    let clonedEditor = this.editor.clone(this);

    clonedEditor.find(".gridLayer")[0].destroyChildren();
    clonedEditor.find(".rulerLayer")[0].destroyChildren();
    return clonedEditor.toDataURL({ pixelRatio: 3 });
  }

  dynamicPrint(printConfig, config) {
    return this.Printing.print(printConfig, config);
  }

  staticPrint(printConfig, config, returnData = null) {
    this.deselect();

    const p = new Print(printConfig);
    var clonedEditor = this.editor.clone(this);
    clonedEditor.find(".gridLayer")[0].destroyChildren();
    clonedEditor.find(".rulerLayer")[0].destroyChildren();

    var containerWidth = clonedEditor.width();
    var sceneWidth = config.canvasContainer.cellWidth;
    var sceneHeight = config.canvasContainer.cellHeight;
    var realScale = containerWidth / sceneWidth;
    var scale = (sceneWidth / containerWidth) * realScale;
    clonedEditor.width(sceneWidth * scale);
    clonedEditor.height(sceneHeight * scale);
    clonedEditor.scale({ x: scale, y: scale });

    for (
      var i = 0;
      i < parseInt(config.canvasContainer.numberOfCellPrint);
      i++
    ) {
      p.createLabel(
        clonedEditor.toDataURL({
          pixelRatio: config.canvasContainer.printQuality,
        })
      );
    }

    const doc = p.doc;
    if (returnData) {
      return doc.output();
    }
    doc.save("labels.pdf");
  }
}

export { Core, Print, Sheet, QRCode, JsBarcode as Barcode };
