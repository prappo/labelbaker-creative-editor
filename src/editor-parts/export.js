export const exportMethods = {
  getOriginalImage(quality = 1) {
    let clonedEditor = this.editor.clone(this);
    clonedEditor.width(this.editorWidth / clonedEditor.scaleX());
    clonedEditor.height(this.editorHeight / clonedEditor.scaleY());
    return clonedEditor.toDataURL({ pixelRatio: quality });
  },

  save(quality = 3, data = {}, transparent = false) {
    this.deselect();
    let clonedEditor = this.editor.clone(this);
    clonedEditor.find(".gridLayer")[0].destroyChildren();
    clonedEditor.find(".rulerLayer")[0].destroyChildren();
    if (transparent) {
      clonedEditor.find(".backgroundLayer")[0].destroyChildren();
    }
    return clonedEditor.toDataURL({ pixelRatio: quality });
  },

  saveImage() {
    let clonedEditor = this.editor.clone(this);
    clonedEditor.find(".gridLayer")[0].destroyChildren();
    clonedEditor.find(".rulerLayer")[0].destroyChildren();
    return clonedEditor.toDataURL({ pixelRatio: 3 });
  },

  downloadAsImage() {
    this.deselect();
    let dataURL = this.save();
    this.downloadURI(dataURL, "template.jpeg");
  },

  downloadAsTransparentImage() {
    this.deselect();
    let dataURL = this.save(3, {}, true);
    this.downloadURI(dataURL, "template.png");
  },

  downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportToURL(url, additionalParam = null) {
    return new Promise((resolve, reject) => {
      this.deselect();
      let imageData = this.save();
      const formData = new FormData();

      formData.append("image_data", imageData);

      if (additionalParam) {
        formData.append('additional_params', additionalParam);
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
  },

  getOrientation() {
    if (this.editorWidth > this.editorHeight) {
      return "l";
    }
    return "p";
  },

  getFormat() {
    return [this.editorWidth, this.editorHeight];
  },

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
  },

  dynamicPrint(printConfig, config) {
    return this.Printing.print(printConfig, config);
  },

  staticPrint(printConfig, config, returnData = null) {
    this.deselect();

    const p = new this.Print(printConfig);
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
}; 