import Konva from "konva";
export default class Ruler {
    constructor(editor) {
        this.editor = editor
    }

    addRuler() {
        const layer = this.editor.rulerLayer;
        if(!this.editor.enableRuler){
            layer.destroyChildren();
            return;
        }
        
        layer.destroyChildren();
       
        const tickSize = this.editor.rulerTickSize; // size of the tick marks in pixels
        const tickSpacing = this.editor.rulerTickSpacing; // distance between tick marks in pixels
        const fontSize = this.editor.rulerFontSize; // size of the tick labels in pixels
        const fontFamily = 'sans-serif'; // font for the tick labels
        const fontColor = this.editor.rulerFontColor; // color of the tick labels

        for (let i = 0; i <= this.editor.editorWidth; i += tickSpacing) {
            // create the tick mark as a line shape
            const hTick = new Konva.Line({
                points: [i, 0, i, tickSize],
                stroke: '#000',
                strokeWidth: 0.5,
                draggable: false,
            });
            layer.add(hTick);
            // create the tick label as a text shape
            const hLabel = new Konva.Text({
                x: i,
                y: tickSize + fontSize,
                text: i,
                fontSize: fontSize,
                fontFamily: fontFamily,
                fill: fontColor,
                draggable: false,
            });
            layer.add(hLabel);
        }


        for (let i = 0; i <= this.editor.editorHeight; i += tickSpacing) {
            // create the tick mark as a line shape
            const vTick = new Konva.Line({
                points: [0, i, tickSize, i],
                stroke: '#000',
                strokeWidth: 0.5,
                draggable: false,
            });
            layer.add(vTick);
            // create the tick label as a text shape
            const vLabel = new Konva.Text({
                x: tickSize + fontSize,
                y: i,
                text: i,
                fontSize: fontSize,
                fontFamily: fontFamily,
                fill: fontColor,
                draggable: false,
            });
            layer.add(vLabel);
        }

        layer.draw();

    }
}