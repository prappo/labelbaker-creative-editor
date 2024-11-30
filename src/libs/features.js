import Konva from "konva";
export default class Features {
  constructor(editor) {
    this.editor = editor;
    this.counter = 0;
  }
  saveEditor() {
    let data = {
      type: "editor",
      data: JSON.parse(this.editor.editor.toJSON()),
    };
    localStorage.setItem("editorData", JSON.stringify(data));
    alert("Saved !");
  }

  addFont(fontName) {
    var head = document.getElementsByTagName("head")[0];

    var link = document.createElement("link");
    var fontID = fontName.replace(" ", "+");
    link.id = fontID;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://fonts.googleapis.com/css?family=" + fontID;
    link.media = "all";
    head.appendChild(link); // or some other options if you need
  }

  makeFunctionName(el) {
    return (
      "add" + el.attrs.type.charAt(0).toUpperCase() + el.attrs.type.slice(1)
    );
  }

  addElement(editor, el, functionName) {
    if (typeof editor[functionName] === "function") {
      editor[functionName](el.attrs);
    }
  }

  addLine(config) {
    var layer = this.editor.layer;
    var self = this;
    this.counter++;
    var id = this.counter;

    if (Object.keys(config).length === 0) {
       
        config = {
          strokeWidth: 1,
          stroke: "black",
          type: "line",
          lineCap: "round",
          id: "quadLinePath" + id,
          name: "line",
          points: [0, 0],
          start1:20,
          start2:10,
          end1:this.editor.editorWidth / 2,
          end2:10,
        };
      }

    // special objects to save references to anchors
    var quad = {
      start: buildAnchor(config.start1, config.start2),
      end: buildAnchor(config.end1, config.end2),
    };

    

    // function to build anchor point
    function buildAnchor(x, y) {
      var anchor = new Konva.Circle({
        x: x,
        y: y,
        radius: 2,
        stroke: "#666",
        fill: " rgba(0, 0, 0, 0.5)",
        strokeWidth: 1,
        draggable: true,
        type: "anchor",
        name: "anchor",
      });
      
      layer.add(anchor);

      // add hover styling
      anchor.on("mouseover", function () {
        document.body.style.cursor = "pointer";
        this.strokeWidth(2);
      });
      anchor.on("mouseout", function () {
        document.body.style.cursor = "default";
        this.strokeWidth(1);
      });

      anchor.on("dragmove", function () {
        updateDottedLines();
      });

      return anchor;
    }

    // function to update line points from anchors
    function updateDottedLines() {
      var q = quad;

      var quadLinePath = layer.findOne("#quadLinePath" + id);

      quadLinePath.points([q.start.x(), q.start.y(), q.end.x(), q.end.y()]);
    }

    
    var quadLinePath = new Konva.Line(config);

    layer.add(quadLinePath);
    self.editor.selectItem(quadLinePath);
    quadLinePath.on("click", function () {
      self.editor.editor.find(".anchor").forEach((el) => {
        el.hide();
      });
      self.editor.selectItem(this);
      quad.start.show();
      quad.end.show();
    });

    updateDottedLines();
  }
}
