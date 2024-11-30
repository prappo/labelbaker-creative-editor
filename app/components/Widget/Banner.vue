<template>
    <div>
        <!-- set banner width -->
        <div class="px-3 py-5 relative">
            <div class="mb-6 sticky top-12 bg-gray-100 dark:bg-gray-800 p-5 rounded-md z-[9999]">
                <label for="bannerWidth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Banner
                    Width</label>
                <input type="text" id="bannerWidth" :value="width" @input="(event) => width = event.target.value"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="px or % (Ex. 100px or 100%)" required>
            </div>

            <div class="py-5 shadow rounded-md p-3 mb-5" v-if="appMode === 'noAuth'">
                <div class="pb-2">
                    <div class="text-lg">WordPress Shortcode</div>
                    <div>Copy the shortcode and use where you can apply shortcode</div>
                </div>
                
            </div>

            <div class="py-5 shadow rounded-md p-3">
                <div class="pb-2">
                    <div class="text-lg">Embed Code</div>
                    <div>Copy the code and use it anywhere as HTML content</div>

                </div>

            </div>
        </div>


    </div>
</template>

<script>
import { enc , makeId } from '../../libs/helper';



import { userData } from '../../store/user';
export default {
    props: ['template'],
    components: {  },
    data() {
        return {
            width: '100%',
            userData
        }
    },
    methods: {
        getTemplateId() {
            if (this.appMode === 'auth') {
             
                return  enc(userData.details.email) + "/" + enc(this.template.name);
            }
            return this.template.id;
        },
        getUrl(){
            if (this.appMode === 'auth') {
                return this.serverEndpoint + '/i/' + this.getTemplateId();
            }

            return this.serverEndpoint + '/template/' + this.getTemplateId();
        },
        getShortCode() {
            return `[labelbaker_banner width='${this.width}' id='${this.getTemplateId()}']`;
        },
        getEmbedCode() {
            let bannerID = makeId(5)
            return `
<script src='https://cdn.jsdelivr.net/npm/@fatal_error/banner_popup@1.0.9' id='labelbaker-banner-js-js'><\/script>
<link rel='stylesheet' id='labelbaker-banner-css-css' href='https://cdn.jsdelivr.net/npm/@fatal_error/banner_popup@1.0.9/style.css' media='all' />

<div id="${bannerID}"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const bannerConfig = {
        url: "${this.getUrl()}",
        width: '${this.width}',
        container: '${bannerID}'
    };
    labelbaker.labelbakerBanner(bannerConfig);
});
<\/script>
            `;
        }
    },
    mounted() {

    }
}
</script>

<style>
pre {
    overflow-x: auto !important;
}
</style>