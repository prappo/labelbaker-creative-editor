<template>
    <div class="px-5 py-5" v-if="selected">
        <div class="text-center bg-gray-800 rounded text-white font-semibold py-1">Shareable form to generate visuals</div>
        <div class="py-5 flex gap-5">
            <button :class="{ 'bg-blue-100 dark:text-gray-900': active === 'form' }"
                class="px-2 py-1 rounded hover:bg-gray-100 " @click="active = 'form'">Embed Form</button>
            <button v-if="appMode === 'auth'" :class="{ 'bg-blue-100 dark:text-gray-900': active === 'embed-preview' }"
                class="px-2 py-1 rounded hover:bg-gray-100 " @click="active = 'embed-preview'">Embed Preview</button>
            <button :class="{ 'bg-blue-100 dark:text-gray-900': active === 'link' }"
                class="px-2 py-1 rounded hover:bg-gray-100 " @click="active = 'link'">Form Link</button>
            <button v-if="appMode === 'auth'" :class="{ 'bg-blue-100 dark:text-gray-900': active === 'preview' }"
                class="px-2 py-1 rounded hover:bg-gray-100 " @click="active = 'preview'">Preview Link</button>
        </div>

        <div v-if="active === 'form'">
            <h1 class="py-5">Embed form into your website or web application</h1>
            <textarea v-model="getC"></textarea>


        </div>
        <div v-if="active === 'embed-preview'">
            <h1 class="py-5">Embed Preview into your website or web application</h1>
            <textarea v-model="getPCode"></textarea>


        </div>

        <div v-if="active === 'link'">
            <h1 class="py-5">Form Link</h1>
            <textarea v-model="getTLink"></textarea>
        </div>

        <div v-if="active === 'preview'">
            <h1 class="py-5">Template preview Link</h1>
            <textarea v-model="getTPLink"></textarea>

        </div>

    </div>
</template>

<script>


import CryptoJS from 'crypto-js'
import { getCurrentInstance } from "vue";


const SECRET = 'prappo'


export default {
    props: ['template'],
    components: {

    },
    data() {
        return {
            name: null,
            selected: null,
            active: 'form',
            getTPLink: '',
            getPCode: '',
            getTLink: '',
            getPCode: '',
            getC: '',
        }
    },
    setup() {
        const app = getCurrentInstance();
        const appMode = app.appContext.config.globalProperties.appMode;
        let appUser = null;
        appUser = {}

        return {
            appUser
        };
    },
    methods: {
        getName() {
            return this.selected.id;
        },

        getTemplateLink() {
            if (this.appMode === 'noAuth') {
                return this.shareURL + '/' + this.getTemplateID();
            }
            return this.shareURL + '/template/' + this.getTemplateID();
        },

        getTemplatePreviewLink() {
            return this.shareURL + '/preview/' + this.getTemplateID();
        },

        getPreviewCode() {
            return `<div style="position: relative; width: 100%; height: 0; padding-top: 100.0000%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="${this.getTemplatePreviewLink()}" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>`
        },

        getCode() {
            return `<div style="position: relative; width: 100%; height: 0; padding-top: 100.0000%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="${this.getTemplateLink()}" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>`
        },

        getTemplateID() {

            if (this.selected.category === 'my') {
                if (this.appMode === 'noAuth') {
                    return this.selected.id;
                }
                return this.enc('templates/' + this.appUser.email + '/' + this.selected.name)
            }
            return this.enc(this.appUser.email + '_lb_default_' + this.selected.id);

        },
        enc(plainText) {
            var b64 = CryptoJS.AES.encrypt(plainText, SECRET).toString();
            var e64 = CryptoJS.enc.Base64.parse(b64);
            var eHex = e64.toString(CryptoJS.enc.Hex);
            return eHex;
        },

        dec(cipherText) {
            var reb64 = CryptoJS.enc.Hex.parse(cipherText);
            var bytes = reb64.toString(CryptoJS.enc.Base64);
            var decrypt = CryptoJS.AES.decrypt(bytes, SECRET);
            var plain = decrypt.toString(CryptoJS.enc.Utf8);
            return plain;
        }
    },
    watch: {
        template(newTemplate, oldTemplate) {
            this.selected = newTemplate
        }
    },
    mounted() {
        this.selected = this.template;
        this.getTPLink = this.getTemplatePreviewLink();
        this.getPCode = this.getPreviewCode();
        this.getTLink = this.getTemplateLink();
        this.getC = this.getCode();
    }
}
</script>

<style>
pre {
    overflow-x: auto !important;
}

/* 
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
/* ::-webkit-scrollbar-track {
  background: #f1f1f1; 
} */

/* Handle */
/* ::-webkit-scrollbar-thumb {
  background: #888; 
} */

/* Handle on hover */
/* ::-webkit-scrollbar-thumb:hover {
  background: #555; 
}  */
</style>
