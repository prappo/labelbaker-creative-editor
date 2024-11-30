import QRCode from "qrcode";
import change from "../../libs/change";
export default class Printing {
    constructor(editor) {
        this.editor = editor;
    }

    getEditor(config){
        let clonedEditor = this.editor.editor.clone(this.editor);
        // remove unnecessary data
        clonedEditor.find('.gridLayer')[0].destroyChildren();
        clonedEditor.find('.rulerLayer')[0].destroyChildren();
        clonedEditor.find('.hiddenLayer')[0].destroyChildren();
        // Change printing quality 
        this.changeQuality(clonedEditor, config);
        return clonedEditor;
    }

    print(printConfig, config) {
        const self = this;
        const p = new self.editor.Print(printConfig)
        const sheetData = config.sheetData;
        const mappedData = config.mappedData;
        
        let taskList = []
     
        let from = config.range.from;
        let to = config.range.to;

        sheetData.forEach((item, index) => {

            if (config.ignoreFirstRow) {
                if (index === 0) {
                    return;
                }
            }

            if (config.dataSelection === "printSelectedData") {
                if (config.selectedData.indexOf(index) === -1) {
                    return;
                }
            }

            if (config.dataSelection === "ignoreSelectedData") {
                if (config.selectedData.indexOf(index) !== -1) {
                    return;
                }
            }

            if (config.dataSelection === "range") {
                if (index + 2 > from && index < to) {
                } else {
                    return;
                }
            }

            let data = item;
            let label = this.createLabel(this.getEditor(config), data, mappedData, config);


            taskList.push(label.then(e => {
           
                p.createLabel(e)
            }))


        })

        return Promise.all(taskList).then((result) => {
         
            const doc = p.doc;
            doc.save("labels.pdf")
        })



        // const doc = p.doc;
        // doc.save("labels.pdf")
    }



    async createLabel(editor, data, mappedData, config) {
        let taskList = []
        mappedData.forEach((item, index) => {

            let elName = item.elName;
            let dataID = item.dataID;

            editor.find('.' + elName).forEach((el) => {
                let value =  data[dataID];
                if(value !== 'none'){
                    taskList.push(this.changeElement(el,value))
                }
                
            })


        })


        return Promise.all(taskList).then((e) => {
            

            let label = editor.toDataURL({
                pixelRatio: config.printQuality,
              
            })
        
            return label;
        })

    }

    changeText(el, value) {
        return new Promise((resolve, reject) => {
            el.text(value);
            resolve(value);
        })
    }

    changeElement(el, value) {
        
        if (el.attrs.type === 'text') {

            return new Promise((resolve, reject) => {
                change.changeText(el, value).then(e => {
                    resolve(e)
                })

            })
        }
        if (el.attrs.type === 'qrcode') {
            return new Promise((resolve, reject) => {
                this.changeQrCode(el, value).then((e) => {

                    resolve(e);
                })
            })
        }


        if (el.attrs.type === 'image') {
            return new Promise((resolve, reject) => {
                change.changeImage(el, value).then(e => {
                    resolve(e);
                })
            })
        }

        if (el.attrs.type === 'barcode') {
            return new Promise((resolve, reject) => {
                change.changeBarcode(el, value).then(e => {
                    resolve(e);
                })
            })
        }

        if(el.attrs.type === 'barcodeBasic'){
            return new Promise((resolve,reject)=>{
                change.changeBarcodeBasic(el,value).then(e => {
                    resolve(e)
                })
            })
        }

    }

    changeQrCode(el, value) {
        return new Promise((resolve, reject) => {
            QRCode.toDataURL(value)
                .then((url) => {
                    let io = new Image();
                    io.crossOrigin = "Anonymous";
                    io.onload = () => {
                        el.image(io);
                        resolve(url);
                    };
                    io.src = url;
                    el.image(io);
                    el.attrs.qrvalue = value;
                })

        });

    }

    changeQuality(clonedEditor, config) {
        var containerWidth = clonedEditor.width();
        var sceneWidth = config.cellWidth;
        var sceneHeight = config.cellHeight;
        var realScale = containerWidth / sceneWidth;
        var scale = (sceneWidth / containerWidth) * realScale;
        clonedEditor.width(sceneWidth * scale);
        clonedEditor.height(sceneHeight * scale);
        clonedEditor.scale({ x: scale, y: scale });
    }
}