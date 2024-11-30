<template>
    <div>
        <label for="data-file" class="
            flex flex-col
            justify-center
            items-center
            w-full
            h-64
            bg-gray-50
            rounded-lg
            border-2 border-gray-300 border-dashed
            cursor-pointer
            dark:hover:bg-bray-800 dark:bg-gray-700
            hover:bg-gray-100
            dark:border-gray-600
            dark:hover:border-gray-500
            dark:hover:bg-gray-600
          ">
            <div class="flex flex-col justify-center items-center pt-5 pb-6">
                <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                    </path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">{{ $t("data.clickToUpload")}}</span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">XLS , CSV</p>
            </div>
            <input id="data-file" type="file" class="hidden" />
        </label>
    </div>
</template>

<script>

import { stats } from '../../store/stats';
import { showSuccess } from '../../libs/helper';
export default {
    props:['container'],
    data(){
        return {
            stats
        }
    },
    methods: {
        async handleFileAsync(e) {
            const file = e.target.files[0];
            const inputData = await file.arrayBuffer();

            const wb = XLSX.read(inputData);
            const ws = wb.Sheets[wb.SheetNames[0]];
        

            var data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
            this.container.sheetData = data;
            this.stats.showDataImportModal = false;
            showSuccess('Data imported');
         
        },
    },
    mounted() {
        var inputElement = "data-file";
        var input_dom_element = document.getElementById(inputElement);
        input_dom_element.addEventListener("change", this.handleFileAsync, false);
    },
}
</script>