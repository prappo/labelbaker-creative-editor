
import CryptoJS from 'crypto-js';

const SECRET = 'prappo'

export default class LableBakerPreview {
    constructor(apiEndpoint, serverEndpoint) {
        this.apiEndpoint = apiEndpoint;
        this.serverEndpoint = serverEndpoint;
    }

    getTemplatesEndpoint() {
        return this.apiEndpoint + "/templates";
    }

    dec(cipherText) {
        var reb64 = CryptoJS.enc.Hex.parse(cipherText);
        var bytes = reb64.toString(CryptoJS.enc.Base64);
        var decrypt = CryptoJS.AES.decrypt(bytes, SECRET);
        var plain = decrypt.toString(CryptoJS.enc.Utf8);
        return plain;
    }

    getTemplate(templateID) {


        return new Promise((resolve, reject) => {
            templateID = this.dec(templateID);

            if (templateID.includes("_lb_default_")) {
                console.log("default template found ", templateID);

                // Default templates
                templateID = templateID.split("_lb_default_")[1];
                let userEmail = templateID[0];
                console.log(userEmail);

                fetch(this.getTemplatesEndpoint() + '/index.json')
                    .then((e) => e.json())
                    .then((data) => {
                        let templateData = null;
                        data.forEach((template) => {
                            if (template.id === templateID) {
                                templateData = template;
                                return;
                            }
                        });
                        if (templateData) {
                            fetch(this.getTemplatesEndpoint() + "/" + templateData.path)
                                .then((e) => e.json())
                                .then((temp) => {
                                    resolve(temp);

                                }).catch(e => {
                                    reject(e)
                                });
                        } else {
                            reject(null)
                        }
                    });
            } else {
                // User templates

                console.log(templateID)
                const templateData = templateID.split('/')
                let email = templateData[1]
                let name = templateData[2]

                fetch(
                    this.serverEndpoint +
                    "/templates/" +
                    email +
                    "/" +
                    name
                )
                    .then((e) => e.json())
                    .then((data) => {
                        resolve(data);

                    })
                    .catch((e) => {
                        reject(e)

                    });
            }
        })

    }
}