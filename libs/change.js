import JsBarcode from "jsbarcode";
import QRCode from 'qrcode';
export default {
  changeText(el, value) {
    el.text(value);
  },

  changeBarcodeBasic(el, value) {
    return new Promise((resolve,reject)=>{
      el.text("*" + value + "*");
      resolve(value)
    })
    
  },

  changeBarcode(el, data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      var barFromat = "CODE39";
      var value = data;
      var showValue = false;

      if (typeof data === "object") {
        barFromat = data.format;
        value = data.value;
        showValue = data.showValue;
      } else {
        barFromat = el.attrs.format;
        showValue = el.attrs.displayValue;
      }

      try {
        var canvas = document.createElement("canvas");
        JsBarcode(canvas, value, {
          format: barFromat,
          displayValue: showValue,
        });
        var img = canvas.toDataURL("image/png");

        let io = new Image();
        io.crossOrigin = "Anonymous";
        io.onload = () => {
          el.image(io);
          resolve(io)
        };

        io.src = img;
        el.image(io);
        el.attrs.format = barFromat;
        el.attrs.barcode = value;
        el.attrs.displayValue = showValue;
        return {
          status: "success",
        };
      } catch (e) {
        reject(e)
        return {
          status: "error",
          message: e,
        };
      }
    });

  },

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

  },

  changeText(el, value) {
    return new Promise((resolve, reject) => {
      el.text(value);
      resolve(value);
    })
  },

  changeImage(el, data) {
    return new Promise((resolve, reject) => {
      try {
        let io = new Image();
        io.crossOrigin = "Anonymous";
        io.onload = () => {
          el.image(io);
          // el.stroke('rgb(255 255 255 / 0)');
          // el.strokeWidth(2)
          resolve(data);
        };

        io.src = data + "?" + Date.now();
        el.image(io);
      } catch (e) {
        reject(e);
    
      }

    })
  }
};
