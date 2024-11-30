import FontFaceObserver from "fontfaceobserver";

export default class DataImport {
  constructor(editor) {
    this.editor = editor;
    this.indexs = [];
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  source(jsonData) {
    let data = jsonData; // Covert json string to object
    let editor = this.editor;

    editor.editor.setAttrs(data.attrs)
    let elements = {};
    let background = {};
    for (let i in data.children) {
      if (data.children[i].attrs.name === "mainLayer") {
        elements = data.children[i].children;
      }

      if (data.children[i].attrs.name === "backgroundLayer") {
        background = data.children[i].children;
      }
    }

    if (this.isEmpty(elements)) {
      return;
    }
    // elements = data.children[3].children;

    // background

    if (!this.isEmpty(background)) {
      editor.background.setAttrs(background[0].attrs);
    }

    // all the elements of editor
    let index = 0;
    elements.forEach((el) => {
      if (el.className !== "Transformer") {
        // ignore transformer element

        // If element type is @Text then import fonts
        if (el.className === "Text") {
          let fontName = el.attrs.fontFamily;
          this.addFont(fontName);
          const font = new FontFaceObserver(fontName);

          font
            .load()
            .then(function () {
              el.fontFamily(fontName);
            })
            .catch(function () { });
        }

        // Add elements to the editor
        this.addElement(editor, el, this.makeFunctionName(el), index);

        index++;
      }
    });

    return Promise.all(this.indexs).then((el) => {
      el.forEach((e) => {
        if (e) {
          e.zIndex(e.attrs.index);
        }
      });

      if (editor.editor.getAttr('code') && editor.readOnly) {
        if (typeof window !== 'undefined') {
          // window object is available
          window.labelbakerCanvas = editor;
        }

        eval(editor.editor.getAttr('code'))

      }

      const canvasScripts = editor.editor.getAttr('scripts');
      if (canvasScripts && editor.readOnly) {
        if (typeof window !== 'undefined') {
          // window object is available
          window.labelbakerCanvas = editor;
        }


        canvasScripts.forEach(s => {
          let replacedCode = s.code.replace(/this\./g, 's.');

          eval(replacedCode);
        })
      } else {
     
      }

    });
  }

  addElement(editor, el, functionName, index) {
    if (typeof editor[functionName] === "function") {
      if (el.className === "Image") {
        el.attrs.index = index;
        this.indexs.push(editor[functionName](el.attrs));
      }
      else if (el.className === "Group") {
        editor[functionName](el);
      }
      else {
        editor[functionName](el.attrs);
      }
    }
  }

  makeFunctionName(el) {
    if (el.attrs.hasOwnProperty("type")) {

      return (
        "add" + el.attrs.type.charAt(0).toUpperCase() + el.attrs.type.slice(1)
      );
    }
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
}
