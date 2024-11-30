import { reactive } from "vue";
export const TempData = reactive({
    document: null,
    editing: {
        name:null,
        id:null,
    }, // name of the template which is being edited.
    myTemplates: [],
    templateType:null,
    selectedTemplate:null,
    optionType:null,
    optionTitle:null,
    shortCode:null,
    code:null,
    scriptIndex:null,
    changeTemplateName:null,
    changeTemplateId:null,
})