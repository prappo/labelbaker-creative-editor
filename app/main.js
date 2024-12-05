// Import core Vue dependencies
import { createApp, defineAsyncComponent } from "vue";

// Import third-party plugins
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createI18n } from "vue-i18n";
import { vfmPlugin } from "vue-final-modal";
import FontFaceObserver from "fontfaceobserver";

// Import local dependencies
import lang from "./libs/lang";
import config from "./libs/config";
import "../style.css";

// Load App component asynchronously for better performance
const App = defineAsyncComponent(() => import('./App.vue'));

// Initialize toast notification
const toast = useToast();

// Load custom barcode font
const barcodeFont = new FontFaceObserver("Libre Barcode 39");
barcodeFont
  .load()
  .catch(() => {
    console.log("unable to load Libre Barcode 39");
  });

// Initialize i18n (internationalization)
const getLocal = () => localStorage.getItem("lang") || "en";

const i18n = createI18n({
  locale: getLocal(),
  fallbackLocale: "en",
  messages: lang,
});

// Initialize Vue application
const selector = "label-baker";
const app = createApp(App);

// Register plugins
app.use(Toast);
app.use(i18n);
app.use(vfmPlugin);

// Configure global error handling
app.config.warnHandler = function (msg, vm, trace) {
  // Handle Vue warnings here
};

// Configure global properties
const globalProps = {
  toast,
  apiEndpoint: 'https://cdn.jsdelivr.net/gh/prappo/label-template-api@1.1.1/public',
  serverEndpoint: window.labelbakerApi,
  apiURL: "",
  shareURL: '',
  isWooExists: false,
  appMode: 'noAuth',
  defaultAudioUrl: '/music.mp3',
  propertyTabsVisibility: {
    properties: true,
    magic: true,
    docSettings: true,
    printSettings: true,
    developer: false,
  },
  // Check if pro features are available
  isPro: (isProRequired) => false
};

// Apply global properties
Object.entries(globalProps).forEach(([key, value]) => {
  app.config.globalProperties[key] = value;
});

// Development mode configuration
if (import.meta.env.MODE === "development") {
  console.log("Development mode");
  // Add development-specific configurations here
}

// Application integration
if (typeof labelbaker !== 'undefined') {
  const appProps = {
    serverEndpoint: labelbaker.serverEndpoint,
    exportURL: `${labelbaker.serverEndpoint}/image-upload`,
    shareURL: labelbaker.shareURL,
    emailSendingApi: labelbaker.emailSendingApi,
    userEmail: labelbaker.userEmail,
    defaultVideoUrl: labelbaker.defaultVideoUrl,
    defaultAudioUrl: labelbaker.defaultAudioUrl,
    licenseEndpoint: labelbaker.licenseEndpoint,
    isWooExists: labelbaker.isWooExists,
   
  };

  // Apply application specific properties
  Object.entries(appProps).forEach(([key, value]) => {
    app.config.globalProperties[key] = value;
  });
}

// Mount the application
app.mount(`#${selector}`);
