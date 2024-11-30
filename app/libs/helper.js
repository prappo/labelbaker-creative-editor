import FontFaceObserver from "fontfaceobserver";
import { useToast } from "vue-toastification";
import { canvasContainer } from "../store/editor";
import CryptoJS from "crypto-js";
import { TempData } from '../store/temp';

import { store } from "../store/menu";
const toast = useToast();

function convertToImage(blob) {
  if (!blob.includes("blob:")) {
    return blob;
  }
  let blobUrl = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = blobUrl;
  }).then((img) => {
    URL.revokeObjectURL(blobUrl);
    // Limit to 256x256px while preserving aspect ratio
    let [w, h] = [img.width, img.height];
    let aspectRatio = w / h;
    // Say the file is 1920x1080
    // divide max(w,h) by 256 to get factor
    let factor = Math.max(w, h) / 256;
    w = w / factor;
    h = h / factor;

    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL();
  });
}

export function saveNow() {
  let container = {};

  for (let index in canvasContainer) {
    if (index != "editor") {
      container[index] = canvasContainer[index];
    }
  }
  save(canvasContainer.editor, container);
}

export function showSuccess(message) {
  toast.success(message, {
    position: "bottom-center",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
}

export function showError(message) {
  toast.error(message, {
    position: "bottom-center",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
}

export function save(editor, props = {}) {
  editor.editor.find("Image").forEach((image) => {
    let imageSrc;

    if (image.attrs.type === "svg") {
      imageSrc = image.attrs.imageSrc;
    } else {
      imageSrc = image.attrs.image.currentSrc;
    }

    image.setAttr("imageSrc", imageSrc);
  });

  let data = {
    type: "editor",
    data: JSON.parse(editor.editor.toJSON()),
    props: props,
  };

  localStorage.setItem("editorData", JSON.stringify(data));

  showSuccess("Saved !");
}
export function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function downloadAsJson(
  jsonData,
  exportName,
  type = "editor",
  props = {},
  action = "download",
  preview = "none"
) {
  var data = {
    type: type,
    preview: preview,
    data: JSON.parse(jsonData),
    props: props,
  };
  var dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function addFont(fontName) {
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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function importEditor(editor, jsonData) {
  let data = jsonData; // Covert json string to object

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

  if (isEmpty(elements)) {
    return;
  }

  // background

  if (!isEmpty(background)) {
    editor.background.setAttrs(background[0].attrs);
  }

  // all the elements of editor

  elements.forEach((el) => {
    if (el.className !== "Transformer") {
      // ignore transformer element

      // If element type is @Text then import fonts
      if (el.className === "Text") {
        let fontName = el.attrs.fontFamily;
        addFont(fontName);
        const font = new FontFaceObserver(fontName);

        font
          .load()
          .then(function () {
            el.fontFamily(fontName);
          })
          .catch(function () { });
      }

      // Add elements to the editor
      addElement(editor, el, makeFunctionName(el));
    }
  });
}

function makeFunctionName(el) {
  return "add" + el.attrs.type.charAt(0).toUpperCase() + el.attrs.type.slice(1);
}

function addElement(editor, el, functionName) {
  if (typeof editor[functionName] === "function") {
    editor[functionName](el.attrs);
  }
}

export function importLayout(editor, data) { }

const SECRET = "prappo";

export function enc(plainText) {
  var b64 = CryptoJS.AES.encrypt(plainText, SECRET).toString();
  var e64 = CryptoJS.enc.Base64.parse(b64);
  var eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
}

export function dec(cipherText) {
  var reb64 = CryptoJS.enc.Hex.parse(cipherText);
  var bytes = reb64.toString(CryptoJS.enc.Base64);
  var decrypt = CryptoJS.AES.decrypt(bytes, SECRET);
  var plain = decrypt.toString(CryptoJS.enc.Utf8);
  return plain;
}

export function importFile(editor) {
  var input = document.createElement("input");
  input.type = "file";
  input.onchange = function () {
    input.files[0].arrayBuffer().then(function (arrayBuffer) {
      var importedFile = new TextDecoder().decode(arrayBuffer);
      try {
        var jsonData = JSON.parse(importedFile);
        let props = jsonData.props;

        if (jsonData.type === "editor" || jsonData.type === "template") {
          if (jsonData.data.className === "Stage") {
            importEditor(editor, jsonData.data);
          }
        }

        if (!editor.isEmpty(props)) {
          for (let index in props) {
            canvasContainer[index] = props[index];
          }
          editor.editorWidth = props.cellWidth;
          editor.editorHeight = props.cellHeight;
          editor.fitIntoContainer();
        }

        // set layout

        // set timeout
        setTimeout(() => {
          editor.transform.nodes([]);
        }, 500);
      } catch (e) {
        alert("Invalid file");
      }
    });
  };
  input.click();
}

export function saveUserData(
  serverEndpoint,
  editor,
  props = {},
  user,
  appMode = "auth"
) {
  return new Promise((resolve, reject) => {
    editor.editor.find("Image").forEach((image) => {
      if (image.attrs.type === "image") {
        let imageSrc;

        if (image.attrs.type === "svg") {
          imageSrc = image.attrs.imageSrc;
        } else {
          imageSrc = image.attrs.image.currentSrc;
        }

        image.setAttr("imageSrc", imageSrc);
      }

      if (image.attrs.type === 'video') {
        image.setAttr('videoSrc', image.attrs.videoSrc);
      }

      if (image.attrs.type === 'audio') {
        image.setAttr('audioSrc', image.attrs.videoSrc);
      }
    });

    let data = {
      type: "editor",
      data: JSON.parse(editor.editor.toJSON()),
      props: props,
    };
    let savedData = { data: JSON.stringify(data) };

    let slug = "/save/user/data";
    if (appMode === "noAuth") {
      slug = "/user-data";

      let url = serverEndpoint + slug;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedData),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } else {
      let endPoint = serverEndpoint + slug;
      fetch(endPoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          templateData: enc(
            JSON.stringify({
              user: user.email,
            })
          ),
        },
        body: JSON.stringify(savedData),
      })
        .then((res) => res.json())
        .then((d) => {
          resolve(d);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });

  // return await setDoc(
  //   doc(db, "users/" + user.email + "/data", "settings"),
  //   savedData
  // )
}

export function getUserData(serverEndpoint, user, appMode = "auth") {
  return new Promise((resolve, reject) => {
    let url = serverEndpoint + "/get/" + enc(user.email) + "/data";
    if (appMode === "noAuth") {
      url = serverEndpoint + "/user-data";
    }
    fetch(url)
      .then((res) => res.json())
      .then((d) => {
  
        resolve(d);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function saveAsTemplate(
  templateID,
  templateName,
  email,
  canvasContainer,
  serverEndpoint,
  appMode = "auth",
  templateTypes = ['general']
) {
  return new Promise((resolve, reject) => {
    let container = {};

    // canvasContainer.editor.backToOrginalSize();
    let preview = canvasContainer.editor.save(1);

    canvasContainer.editor.editor.find("Image").forEach((image) => {
      let imageSrc;

      if (image.attrs.type === "svg") {
        imageSrc = image.attrs.imageSrc;
      } else {
        imageSrc = image.attrs.image.currentSrc;
      }

      image.setAttr("imageSrc", imageSrc);
    });

    for (let index in canvasContainer) {
      if (index != "editor") {
        container[index] = canvasContainer[index];
      }
    }

    container.icons = [];

    var data = {
      id: templateID,
      type: "editor",
      name: templateName,
      preview: preview,
      data: JSON.parse(canvasContainer.editor.editor.toJSON()),
      props: container,
      category: "my",
      templateTypes: templateTypes,
      updatedAt: Date.now(),
    };

    if (appMode === "noAuth") {
      let url = serverEndpoint + "/template";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          showSuccess("Template Saved !");

          resolve(data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } else {
      fetch(serverEndpoint + "/set/template", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          templateData: enc(
            JSON.stringify({
              user: email,
              template_name: templateName,
            })
          ),
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((d) => {
          showSuccess("Template Saved !");
          resolve(d);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
}

export function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function useIt(data, type = 'template') {

  // import template data if the type is template

  if (type === 'template') {
    window.location.href = "#/editor/" + data.id;
    if (data.category === "my") {
      TempData.editing.name = data.name;
      TempData.editing.id = data.id;
      TempData.templateType = data.templateTypes;

    } else {
      TempData.editing = null;
    }
    canvasContainer.editor.clearEditor();

    let s = data.props;

    for (let index in s) {
      canvasContainer[index] = s[index];
    }

    canvasContainer.editor.editorWidth = parseInt(s.cellWidth);
    canvasContainer.editor.editorHeight = parseInt(s.cellHeight);


    setTimeout(() => {
      canvasContainer.editor.ImportData.source(data.data).then(() => {
        canvasContainer.editor.fitIntoContainer();
      });

      canvasContainer.editor.transform.nodes([]);

      canvasContainer.editor.fitIntoContainer();

    }, 800);
  }

  // import image to editor if type is eimage

  if (type === 'image') {


    canvasContainer.editor.clearAll();
    const imageUrl = data.image_url; // Replace with the actual image URL

    const img = new Image();

    img.onload = () => {
      const imageWidth = img.width;
      const imageHeight = img.height;


      canvasContainer.editor.editorWidth = imageWidth;
      canvasContainer.editor.editorHeight = imageHeight;

  

      canvasContainer.editor.addImage({}).then(image => {
        canvasContainer.editor.updateImage(image, data.image_url)
        canvasContainer.editor.transform.nodes([]);

        canvasContainer.editor.fitIntoContainer();

        image.x(0);
        image.y(0)

        image.width(canvasContainer.editor.editorWidth);
        image.height(canvasContainer.editor.editorHeight)

      })

    };

    img.src = imageUrl;



  }

}

export function installScript(scriptToBeInstalled) {

  const script = scriptToBeInstalled;

  const convertedScript = { ...script };
  convertedScript.code = convertedScript.run.toString();

  // Remove 'run()'
  let code = convertedScript.code.replace("run()", "").trim();

  // Remove '{' and '}'
  code = code.slice(1, -1).trim();

  convertedScript.code = code;


  convertedScript.id = Date.now();
  convertedScript.fields = JSON.parse(JSON.stringify(convertedScript.fields));
  if (!canvasContainer.editor.editor.getAttr("scripts")) {
    canvasContainer.editor.editor.setAttr("scripts", []);
    canvasContainer.editor.editor.attrs.scripts.push(convertedScript);
  } else {
    canvasContainer.editor.editor.attrs.scripts.push(convertedScript);
  }
}