export default class ConvertToHTML {
    constructor(editor) {
        this.editor = editor;
    }

    export() {
        let html = '';
        this.generateHTML(this.editor)
    }

    generateContent(gEl) {
        let content = '';
        let innerContent = '';
        if (gEl.attrs.type === 'text') {
            innerContent += gEl.text();
        }

        if (gEl.attrs.type === 'line') {
            innerContent += `<img src="${gEl.toDataURL()}" style="${this.generateCSS(gEl.attrs)}" />`
        }



        content += `<div style="${this.generateCSS(gEl.attrs)}">${innerContent}</div>`;
        
        if (gEl.attrs.type === 'image') {
            content = `<img src="${gEl.attrs.imageSrc}" style="${this.generateCSS(gEl.attrs)}" />`
        }
        return content;
    }

    generateHTML(element) {
        let output = '';


        const allElement = this.filterList(element.layer.children)
        allElement.forEach(el => {
            // console.log(el)
            if (el.attrs.type === 'group') {
                let content = `<div style="${this.generateCSS(el.attrs)}">`;
                el.children.forEach(gEl => {
                    content += this.generateContent(gEl)
                    // console.log(gEl)

                })
                output += content;
            }

            output += this.generateContent(el)
        });
        let finalResult = `<div style="width:${element.editorWidth}px;height:${element.editorHeight}px;background:${element.background.fill()}">${output}</div>`
        console.log(finalResult)
    }

    generateCSS(attr) {
        console.log(attr)
        let style = `position:absolute;left:${attr.x}px;top:${attr.y}px;`;
        if (attr?.fill) {
            if (attr.type === 'text') {
                style += this.textCSS(attr)
            } else {
                style += `background-color:${attr.fill};`
            }

        }

        if (attr?.width && attr?.height) {

            style += `width:${attr.width}px; height:${attr.height}px;`
        }
        console.log(attr)
        return style;
    }


    textCSS(attr) {
        let style = '';
        style += `font-size:${attr.fontSize}px;`
        style += `color:${attr.fill};`

        if (attr?.fontFamily) {
            style += `font-family:${attr.fontFamily} ;`
        }

        return style;
    }


    filterList(elList) {
        return elList.filter(
            (el) =>
                el.getClassName() !== "Transformer" &&
                el.name() !== "guid-line" &&
                el.name() !== "anchor"
        );
    }
}