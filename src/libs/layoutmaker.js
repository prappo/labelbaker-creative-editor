import Konva from 'konva';
export default class LayoutMaker {
    constructor(config) {
        this.stage = new Konva.Stage({
            container: config.container,
            width: config.pageWidth,
            height: config.pageHeight,
        });
        this.stage.getContent().style.background = 'white';
        this.doc = new Konva.Layer();
        this.config = config;
        this.pageWidth = config.pageWidth;
        this.pageHeight = config.pageHeight;
        this.pageMargin = config.pageMargin;
        this.pageMarginLeft = config.pageMarginLeft;
        this.pageMarginTop = config.pageMarginTop;
        this.cellPaddingLeft = config.cellPaddingLeft;
        this.cellPaddingTop = config.cellPaddingTop;
        this.pageWidth -= this.pageMargin * 2;
        this.pageHeight -= this.pageMargin * 2;
        this.cellPadding = config.cellPadding;
        this.cellWidth = config.cellWidth;
        this.cellHeight = config.cellHeight;
        this.startX = this.pageMarginLeft;
        this.startY = this.pageMarginTop;
        this.stage.add(this.doc);
        this.count = 0;

    }

    createLabel(data) {
        //cell projection

        var requiredWidth = this.startX + this.cellWidth + this.cellPadding * 2;
        var requiredHeight = this.startY + this.cellHeight + this.cellPadding * 2;

        if (requiredWidth <= this.pageWidth) {
            this.#addContent(
                data,
                this.startX + this.cellPadding,
                this.startY + this.cellPadding
            );
            this.startX = requiredWidth + this.cellPaddingLeft;
        } else {
          
            if (requiredHeight + this.cellHeight > this.pageHeight) {
            
               
            } else {
                this.startY = requiredHeight + this.cellPaddingTop;
            }

            // this.startY = requiredHeight ;

            this.startX = this.pageMarginLeft;
            this.#addContent(
                data,
                this.startX + this.cellPadding,
                this.startY + this.cellPadding
            );
            this.startX =
                this.startX +
                this.cellWidth +
                this.cellPadding * 2 +
                this.cellPaddingLeft;
        }
    }

    #addContent(data, xAxis, yAxis) {
        this.count++;
        var rect1 = new Konva.Rect({
            x: xAxis,
            y: yAxis,
            width: this.cellWidth,
            height: this.cellHeight,
            fill: '#3B82F6',
            stroke: 'black',
            strokeWidth: 4,
        });
        var text1 = new Konva.Text({
            x: xAxis,
            y: yAxis,
            text: this.count,
            align: 'center',
            verticalAlign: 'middle',
            width: this.cellWidth,
            height: this.cellHeight,
            fill: 'white',
            fontSize: 20,

        });
        this.doc.add(rect1);
        this.doc.add(text1)

    }

    fitIntoContainer() {
        var container = document.querySelector("#" + this.config.container);

        if (this.containerWrapper) {
            container = document.querySelector("#" + this.config.containerWrapper);
        }

        var containerWidth = container.offsetWidth;
        var sceneWidth = this.pageWidth;
        var sceneHeight = this.pageHeight;

        var scale = containerWidth / sceneWidth;
        this.stage.width(sceneWidth * scale);
        this.stage.height(sceneHeight * scale);
        this.stage.scale({ x: scale, y: scale });
    }
}