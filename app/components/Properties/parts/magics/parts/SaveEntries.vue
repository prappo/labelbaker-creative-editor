<template>
    <div class="flex flex-col gap-2 w-full">

        <div class="py-2">
            <label class="relative inline-flex items-center cursor-pointer">
                <input :checked="selected.attrs?.['saveEntries'] ?? false" type="checkbox" v-model="isEnable"
                    value="true" class="sr-only peer">
                <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Save Entries</span>
            </label>
        </div>

        <div v-if="isEnable">
            All input data will be saved.

        </div>



    </div>
</template>

<script>

export default {
    props: ['selected'],
    data() {
        return {
            isEnable: false,

        };
    },

    watch: {
        isEnable: function (value, oldValue) {

            this.selected.setAttr('saveEntries', value)
        }
    },

    methods: {


        defineToggles() {

            this.isEnable = this.selected.attrs?.['saveEntries'] ?? false;
        },

    },
    mounted() {
        this.defineToggles();
    }
}
</script>