import { createApp , defineAsyncComponent } from "vue";
import Toast from "vue-toastification";
import { useToast } from "vue-toastification";

import { createI18n } from "vue-i18n";
import lang from "./libs/lang";
import "vue-toastification/dist/index.css";
import { vfmPlugin } from "vue-final-modal";
import "../style.css";
// import App from "./App.vue";
const App = defineAsyncComponent(()=>import('./App.vue'))
import config from "./libs/config";
import FontFaceObserver from "fontfaceobserver";

var font = new FontFaceObserver("Libre Barcode 39");
const toast = useToast();

font
  .load()
  .then(function () { })
  .catch(function () {
    console.log("unable to load Libre Barcode 39");
  });

const messages = lang;

const getLocal = () => {
  if (localStorage.getItem("lang")) {
    return localStorage.getItem("lang");
  }

  return "en";
};
const i18n = createI18n({
  locale: getLocal(), // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
});
const selector = "label-baker";
const docSelector = document.getElementById(selector);

const app = createApp(App).use(Toast);

app.use(i18n);
app.use(vfmPlugin);

app.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
};

// app.config.compilerOptions.isCustomElement = tag => tag.startsWith('svg:');

app.config.globalProperties.toast = toast;
app.config.globalProperties.apiEndpoint = 'https://cdn.jsdelivr.net/gh/prappo/label-template-api@1.1.1/public';
// app.config.globalProperties.apiEndpoint = '';
// app.config.globalProperties.apiEndpoint =
//   "https://raw.githubusercontent.com/prappo/label-template-api/main/public";

app.config.globalProperties.serverEndpoint = window.labelbakerApi;
// app.config.globalProperties.apiURL = "https://api.labelbaker.com";
app.config.globalProperties.apiURL = "";
// app.config.globalProperties.shareURL = 'https://share.labelbaker.com';
app.config.globalProperties.shareURL = '';
app.config.globalProperties.isWooExists = false;
// Application mode
app.config.globalProperties.appMode = 'noAuth';

// app.config.globalProperties.appMode = 'auth';

app.config.globalProperties.isPro = (isProRequired) => {
  // Check if pro plugin is available and if the function requires the pro version
  
  return false;
}
// app.config.globalProperties.exportURL = 'http://labelbaker.local/wp-json/labelbaker/v1/image-upload';

// Change the required configuration
// If current environment is development 

if (import.meta.env.MODE === "development") {
  console.log("Development mode");
  // app.config.globalProperties.serverEndpoint = "http://labelbaker.local/wp-json/labelbaker/v1";
  // app.config.globalProperties.serverEndpoint = "http://localhost:8080";
  // app.config.globalProperties.apiURL = "http://localhost:1337";
}

app.config.globalProperties.defaultAudioUrl = '/music.mp3'

// if using in wordpress
if (typeof labelbaker !== 'undefined') {
  app.config.globalProperties.serverEndpoint = labelbaker.serverEndpoint;
  app.config.globalProperties.exportURL = labelbaker.serverEndpoint + '/image-upload'
  app.config.globalProperties.shareURL = labelbaker.shareURL;
  app.config.globalProperties.emailSendingApi = labelbaker.emailSendingApi;
  app.config.globalProperties.userEmail = labelbaker.userEmail;
  app.config.globalProperties.defaultVideoUrl = labelbaker.defaultVideoUrl;
  app.config.globalProperties.defaultAudioUrl = labelbaker.defaultAudioUrl;
  app.config.globalProperties.licenseEndpoint = labelbaker.licenseEndpoint;
  app.config.globalProperties.isWooExists = labelbaker.isWooExists;
}


app.mount(`#${selector}`);
