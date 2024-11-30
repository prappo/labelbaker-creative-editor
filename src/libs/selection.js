import Konva from "konva";
export default class Selection {
  constructor(editor) {
    this.editor = editor;
    this.stage = editor.editor;
    this.tr = editor.transform;
    this.layer = editor.layer;
  }

  addSelection() {
    let stage = this.editor.editor;
    let tr = this.editor.transform;
    let layer = this.editor.layer;
    let self = this;
    layer.add(tr);

    // add a new feature, lets add ability to draw selection rectangle
    var selectionRectangle = new Konva.Rect({
      fill: 'rgb(60 129 246 / 0.29)',
      visible: false,
      name: 'selectionRectangle',
    });
    this.editor.hiddenLayer.add(selectionRectangle)
    // layer.add(selectionRectangle);

    var x1, y1, x2, y2;
    stage.on('mousedown touchstart', (e) => {


      try {
        if (e.target.name() === 'stageBackground' || e.target.attrs.type === 'template') {
          tr.nodes([])
        }
        // do nothing if we mousedown on background
        if (e.target.name() !== 'stageBackground') {
          return;
        }


        e.evt.preventDefault();
        x1 = stage.getPointerPosition().x;
        y1 = stage.getPointerPosition().y;
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
      } catch (e) {

      }

    });

    stage.on('mousemove touchmove', (e) => {

      try {
        // do nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
          return;
        }
        e.evt.preventDefault();
        x2 = parseInt(stage.getPointerPosition().x);
        y2 = parseInt(stage.getPointerPosition().y);

        selectionRectangle.setAttrs({
          x: Math.min(x1, x2) / stage.scaleX(),
          y: Math.min(y1, y2) / stage.scaleY(),
          width: Math.abs(x2 - x1) / stage.scaleX(),
          height: Math.abs(y2 - y1) / stage.scaleY(),
        });
      } catch (error) {

      }


    });

    stage.on('mouseup touchend', (e) => {
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        selectionRectangle.visible(false);
      });

      try {
        var shapes = self.layer.find('Text,Rect,Circle,Image,Polygon,Star,RegularPolygon,Arc,Ellipse,Line');
        var box = selectionRectangle.getClientRect();
        var selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect()) && !this.editor.lockedItems.includes(shape)
        );

        setTimeout(() => {
          tr.nodes(selected);
          if (selected.length === 1) {
            self.editor.selectItem(selected[0])
          } else {
            self.editor.selectItem(null)
          }


        },100)


      } catch (e) {

      }

    });

  
  }
}