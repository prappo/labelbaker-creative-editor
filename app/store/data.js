import { reactive } from "vue";

export const dataSettings = reactive({
    ignoreFirstRow: false,
    dataSelection: 'printAllData',
    selectedData: [],
    range: {
        from: 1,
        to: 4,
    }
})