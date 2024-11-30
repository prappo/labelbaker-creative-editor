<template>
  <div>
    <SearchModal v-if="stats.showSearchModal" />
    <SaveModalVue v-if="stats.showSaveModal" />
    <ConverterModalVue />
    <NewLabel />
    <Language />
    <!-- <UseLayout /> -->
    <DataModal />

    <PreviewModal v-if="stats.showPreviewModal" />
    <DataImportModal v-if="stats.showDataImportModal" />
    <SettingsModal v-if="stats.showSettingsModal" />
    <NewDesign :key="Date.now()" v-if="stats.newTemplateModal" />
    <CodeEditor :key="Date.now()" v-if="stats.showCodeModal" />
    <ChooseNewTemplate />
    <ExportModal />
    <FeaturedModal v-if="appMode === 'noAuth' && stats.featuredImageModal" />
    <ProductModal v-if="appMode === 'noAuth' && stats.productImageModal" />
    <WidgetModal v-if="TempData.selectedTemplate" />
    <ShortcodeModal v-if="appMode === 'noAuth' && stats.showShortcodeModal" />
    <ScriptInstaller v-if="stats.showInstallScriptModal" />
    <EditName :key="Date.now()" v-if="stats.editNameModal" />
    <DisplayRules :key="Date.now()" v-if="stats.showDisplayRulesModal" />
    <ShareModal :key="Date.now()" v-if="stats.showShareModal" />
    <DeleteModal :key="Date.now()" v-if="stats.showDeleteModal" />
    <SendMail :key="Date.now()" v-if="stats.showSendEmailModal" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
// import SaveModalVue from "./SaveModal.vue";
const SaveModalVue = defineAsyncComponent(() => import("./SaveModal.vue"));
// import ConverterModalVue from "./ConverterModal.vue";
const ConverterModalVue = defineAsyncComponent(() =>
  import("./ConverterModal.vue")
);
// import NewLabel from "./NewLabel.vue";
const NewLabel = defineAsyncComponent(() => import("./NewLabel.vue"));
// import UseLayout from "./UseLayout.vue";
const UseLayout = defineAsyncComponent(() => import("./UseLayout.vue"));
// import Language from "./Language.vue";
const Language = defineAsyncComponent(() => import("./Language.vue"));
// import DataModal from "./DataModal.vue";
const DataModal = defineAsyncComponent(() => import("./DataModal.vue"));

// import SearchModal from "./SearchModal.vue";
const SearchModal = defineAsyncComponent(() => import("./SearchModal.vue"));
const WidgetModal = defineAsyncComponent(() => import("./WidgetModal.vue"));

const PreviewModal = defineAsyncComponent(() => import("./PreviewModal.vue"));
const DataImportModal = defineAsyncComponent(() =>
  import("./DataImportModal.vue")
);
const SettingsModal = defineAsyncComponent(() =>
  import("./Editor/Settings.vue")
);
const NewDesign = defineAsyncComponent(() =>
  import("./Editor/NewTemplate.vue")
);
const CodeEditor = defineAsyncComponent(() => import("./Editor/Code.vue"));
const ChooseNewTemplate = defineAsyncComponent(() =>
  import("./Editor/ChooseNewTemplate.vue")
);
const ExportModal = defineAsyncComponent(() => import("./Editor/Export.vue"));
const FeaturedModal = defineAsyncComponent(() =>
  import("./Editor/FeaturedImage.vue")
);
const ProductModal = defineAsyncComponent(() =>
  import("./Editor/ProductImage.vue")
);
const ShortcodeModal = defineAsyncComponent(() => import("./Shortcode.vue"));
const ScriptInstaller = defineAsyncComponent(() =>
  import("./ScriptInstaller.vue")
);

const EditName = defineAsyncComponent(()=>import('./EditName.vue'));
const DisplayRules = defineAsyncComponent(()=>import('./DisplayRules.vue'));
const ShareModal = defineAsyncComponent(()=>import('./ShareModal.vue'));
const DeleteModal = defineAsyncComponent(()=>import('./DeleteModal.vue'));
const SendMail = defineAsyncComponent(()=>import('./SendEmail.vue'));

import { stats } from "../store/stats";
import { TempData } from "../store/temp";
export default {
  data() {
    return { stats, TempData };
  },
  components: {
    SaveModalVue,
    SearchModal,
    ConverterModalVue,
    NewLabel,
    UseLayout,
    Language,
    DataModal,
    ShareModal,
    PreviewModal,
    DataImportModal,
    SettingsModal,
    NewDesign,
    CodeEditor,
    ChooseNewTemplate,
    ExportModal,
    FeaturedModal,
    ProductModal,
    WidgetModal,
    ShortcodeModal,
    ScriptInstaller,
    EditName,
    DisplayRules,
    DeleteModal,
    SendMail,
  },
};
</script>



