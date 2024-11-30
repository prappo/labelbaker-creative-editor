import Konva from "konva";
export default class Grid {
    constructor(editor) {
        this.editor = editor
        this.shadowRectangle = editor.shadowRectangle;
    }

    addGrid() {
        var gridLayer = this.editor.gridLayer;
        if(!this.editor.enableGrid){
            gridLayer.destroyChildren();
            return;
        }

        var width = this.editor.editorWidth;
        var height = this.editor.editorHeight;

        var blockSnapSize = this.editor.blockSnapSize;

        gridLayer.destroyChildren();

        var padding = blockSnapSize;

 

        for (var i = 0; i < width / padding; i++) {
            gridLayer.add(new Konva.Line({
                points: [Math.round(i * padding) , 0, Math.round(i * padding), height],
                stroke: '#ddd',
                strokeWidth: 0.5,
                draggable: false,
                name:'gridLine'
            }));
        }

        gridLayer.add(new Konva.Line({ points: [0, 0, 10, 10] }));
        for (var j = 0; j < height / padding; j++) {
            gridLayer.add(new Konva.Line({
                points: [0, Math.round(j * padding), width, Math.round(j * padding)],
                stroke: '#ddd',
                strokeWidth: 0.5,
                draggable: false,
                name:'gridLine'
            }));
        }


        this.shadowRectangle = this.editor.shadowRectangle;

        this.shadowRectangle.hide()

        gridLayer.add(this.shadowRectangle)
        gridLayer.draw();

        // stage.add(layer);

        return this.shadowRectangle;

    }
}