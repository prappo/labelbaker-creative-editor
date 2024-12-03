import Konva from "konva";
import Grid from "../libs/grid";

export const setupLayers = {
  setupLayers() {
    // Background Layer
    this.backgroundLayer = new this.core.Layer();
    this.backgroundLayer.name("backgroundLayer");
    this.editor.add(this.backgroundLayer);

    this.setupBackground();

    // Grid Layer
    this.gridLayer = new this.core.Layer();
    this.gridLayer.name("gridLayer");
    this.editor.add(this.gridLayer);

    // Ruler Layer
    this.rulerLayer = new this.core.Layer();
    this.rulerLayer.name("rulerLayer");
    this.editor.add(this.rulerLayer);

    // Main Layer
    this.layer = new this.core.Layer();
    this.layer.name("mainLayer");
    this.editor.add(this.layer);

    // Hidden Layer
    this.hiddenLayer = new this.core.Layer();
    this.hiddenLayer.name("hiddenLayer");
    this.editor.add(this.hiddenLayer);

    this.setupGridAndMarker();
  },

  setupBackground() {
    this.background = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.editorWidth,
      height: this.editorHeight,
      fill: "#ffffffff",
      name: "stageBackground",
      type: "background",
    });

    this.background.on("click tap", () => this.deselect());
    this.backgroundLayer.add(this.background);
  },

  setupGridAndMarker() {
    this.grid = new Grid(this);
    this.grid.addGrid();

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
  }
}; 