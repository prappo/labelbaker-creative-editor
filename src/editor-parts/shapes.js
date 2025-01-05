import { Text, Circle, Rect, Line } from "../tools";
import Konva from "konva";
import  "../vendor/gifler.min.js";

export const shapes = {
  addText(config) {
    const txt = new Text(config);
    this.add(txt);
    return txt;
  },

  addRect(config) {
    const obj = new Rect(config);
    this.add(obj);
    return obj;
  },

  addCircle(config) {
    const obj = new Circle(config);
    this.add(obj);
    return obj;
  },

  addLine(config) {
    if (this.isEmpty(config)) {
      config = {
        points: [10, 10, this.getSize(), this.getSize() / 2],
        stroke: this.Konva.Util.getRandomColor(),
        strokeWidth: this.getSize() / 50,
        type: "line",
        draggable: true,
      };
    }
    let line = new this.Konva.Line(config);
    this.add(line);
  },

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

      this.QRCode.toDataURL(config.qrvalue, { errorCorrectionLevel: "H" })
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
  },

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
  },

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
    this.Barcode(canvas, text, { format: format, displayValue: displayValue });
    var img = canvas.toDataURL("image/png");
    let imgUrl = img;
    var imageObj = new Image();
    imageObj.crossOrigin = "Anonymous";
    imageObj.onload = () => {
      config.image = imageObj;
      var img = new this.core.Image(config);
      this.add(img);
    };
    imageObj.src = imgUrl;
  },

  addImage(config) {
    return new Promise((resolve, reject) => {
      if (this.isEmpty(config)) {
        let imgUrl = this.defaultConfiguration.placeHolderImage;
        var imageObj = new Image();
        imageObj.crossOrigin = "Anonymous";
        imageObj.onload = () => {
          var img = new this.core.Image({
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
          var img = new this.core.Image(finalConfig);
          this.add(img);
          resolve(img);
        };
        imageObj.src = imgUrl;
      }
    });
  },

  addSvg(config) {
    if (this.isEmpty(config)) {
      config = {
        type: "svg",
        imageSrc: this.defaultConfiguration.svgPlaceholder,
      };
    }

    return Konva.Image.fromURL(config.imageSrc, (image) => {
      image.setAttrs(config);
      image.draggable(true);
      this.add(image);
      this.layer.draw();
    });
  },

  addGif(config) {
    return new Promise((resolve, reject) => {
      if (this.isEmpty(config)) {
        config = {
          type: "gif",
          imageSrc: 'pointing.gif',
          x: this.getXCenter(this.getSize() / 2),
          y: this.getYCenter(this.getSize() / 2),
          width: this.getSize() / 2,
          height: this.getSize() / 2,
          draggable: true
        };
      }

      const canvas = document.createElement('canvas');
      
      // Use gifler to parse and draw gif animation
      gifler(config.imageSrc).frames(canvas, (ctx, frame) => {
        canvas.width = frame.width;
        canvas.height = frame.height;
        ctx.drawImage(frame.buffer, 0, 0);
        this.layer.draw();
      });

      // Create Konva image with the canvas
      const image = new this.core.Image({
        ...config,
        image: canvas
      });
      
      this.add(image);
      resolve(image);
    });
  },

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
  },

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
    var polygon = new this.core.RegularPolygon(config);
    this.add(polygon);
    return polygon;
  },

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
    var oval = new this.core.Ellipse(config);
    this.add(oval);
    return oval;
  },

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
  },

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
  },

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
    var triangle = new this.core.RegularPolygon(config);
    this.add(triangle);
    return triangle;
  }
}; 