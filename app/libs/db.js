import { initializeApp } from "firebase/app";

import {
    collection,
    addDoc,
    getFirestore,
    getDoc,
    getDocs,
    setDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

export default class DB {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyDq8MJOMRTEKFo5QfBGQjbBU6yo4mMbWOw",
            authDomain: "label-baker.firebaseapp.com",
            databaseURL: "https://label-baker-default-rtdb.firebaseio.com",
            projectId: "label-baker",
            storageBucket: "label-baker.appspot.com",
            messagingSenderId: "643006274042",
            appId: "1:643006274042:web:b94986ecc097d55cc32c43",
            measurementId: "G-ZS47ZSL69X",
        };

        this.app = initializeApp(this.firebaseConfig);

        this.db = getFirestore(this.app);


    }

    getUser() {
        return this.userData;
    }

    async getUserInfo(email){
        return await getDoc(
            doc(this.db,"users/" + email + "/info","profile")
        )
    }

    async setUserInfo(user,data){
        return await setDoc(
            doc(this.db,"users/" + user.email + "/info","profile"),
            data
        )
    }

    async save(editor, props = {}, user) {

        editor.editor.find('Image').forEach(image => {
            let imageSrc;
            if (image.attrs.type === 'svg') {
                imageSrc = image.attrs.imageSrc;
            } else {
                imageSrc = this.convertToImage(image.toDataURL())
            }

            image.setAttr('imageSrc', imageSrc);
        })

        let data = {
            type: "editor",
            data: JSON.parse(editor.editor.toJSON()),
            props: props
        };
        let savedData = { data : JSON.stringify(data)}
        return await setDoc(
            doc(this.db, "users/" + user.email + "/data", "settings"),
            savedData
        )
    }

    async getSavedData(user){
        return await getDoc(
            doc(this.db, "users/" + user.email + "/data", "settings")
        )
    }

    async saveTemplate(user,name, data) {
        data.name = name;
        data.category = 'my';
        let templateData = { data : JSON.stringify(data) }
        return await setDoc(
            doc(this.db, "users/" + user.email + "/templates", name),
            templateData
        );
    }

    async deleteTemplate(user,name){
        return await deleteDoc(
            doc(
                this.db, "users/" + user.email + "/templates", name
            )
        )
    }

    async getTemplates(user){
        return await getDocs(
            collection(this.db,"users/" + user.email + "/templates")
        )
    }

    async getTemplate(templateID){
        return await getDoc(
            doc(this.db, "users/" + templateID)
        )
    }

    convertToImage(blob) {
        if (!blob.includes('blob:')) {
            return blob;
        }
        let blobUrl = URL.createObjectURL(blob);

        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.onerror = err => reject(err);
            img.src = blobUrl;
        }).then(img => {
            URL.revokeObjectURL(blobUrl);
            // Limit to 256x256px while preserving aspect ratio
            let [w, h] = [img.width, img.height]
            let aspectRatio = w / h
            // Say the file is 1920x1080
            // divide max(w,h) by 256 to get factor
            let factor = Math.max(w, h) / 256
            w = w / factor
            h = h / factor

            let canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            return canvas.toDataURL();
        })
    }

}