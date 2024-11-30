export default class {
    constructor(editor) {
        this.editor = editor;
        this.types = {
            text: 0,
            barcodeBasic: 0,
            image: 0,
            qrcode: 0,
            rect: 0,
            triangle: 0,
            polygon: 0,
            circle: 0,
            line: 0,
            star: 0,
            arc: 0,
            oval: 0,
            path:0,
            svg:0,
            shape:0,
            video:0,
            audio:0,
            timer:0,
        }
    }

    generateName(type) {
        let typeCount = this.types[type];
        typeCount++;
        this.types[type] = typeCount;
        let word = this.cleanString(type);
        let name = word + '_' + typeCount
        return name;
    }

    cleanString(type) {
        if (type === 'barcodeBasic') {
            return 'Barcode'
        }

        if (type === 'qrcode') {
            return 'QRcode'
        }

        return type.charAt(0).toUpperCase() + type.slice(1);
    }
}