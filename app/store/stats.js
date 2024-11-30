import { reactive } from "vue";

export const stats = reactive({
    enabledFeatures:[],
    progress: 0,
    isBusy: false,
    showSaveModal: false,
    refresh:null,
    newTemplateModal: false,
    showConverterModal: false,
    showNewModal: false,
    showLangModal: false,
    showPreviewModal: false,
    showSearchModal: false,
    showDataModal: false,
    showUserModal: false,
    showDataImportModal: false,
    nowEditing: null,
    firstTime: true,
    tempContainer: null,
    showSettingsModal: false,
    showCodeModal: false,
    showChooseNewTemplateModal: false,
    showExportModal: false,
    featuredImageModal: false,
    productImageModal: false,
    showWidgetModal: false,
    showShortcodeModal: false,
    showInstallScriptModal:false,
    editNameModal:false,
    showDisplayRulesModal:false,
    showShareModal:false,
    showDeleteModal:false,
    showSendEmailModal:false,
    
})