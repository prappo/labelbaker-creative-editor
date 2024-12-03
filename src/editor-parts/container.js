export const container = {
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
  },

  backToOrginalSize() {
    this.editor.width(this.editorWidth / this.editor.scaleX());
    this.editor.height(this.editorHeight / this.editor.scaleY());
    this.editor.scale({ x: 1, y: 1 });
  },

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
}; 