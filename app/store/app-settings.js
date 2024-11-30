import { reactive } from "vue";
export const AppSettings = reactive({
    ondboardingScreen:true,
    enableHeader:true,
    enableExport:false,
    enableLogo:true,
    enabledMenu:['dashboard','labels','apps','banners','thumbnails','popups','products','email'],
    enableDarkmode:false,
    enablePreview:true,
})