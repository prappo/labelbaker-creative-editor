<template>
    <div v-if="selected" class="relative mt-1 mb-2 gap-1 flex flex-col">
        <div class="text-xs flex justify-between text-gray-400  mb-2">
            <div class="w-full">Border Radius</div>

            <div class="w-full flex justify-end">
                <button @click="link = !link">
                    <svg v-if="link" class="w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 8H6C4.34315 8 3 9.34315 3 11V13C3 14.6569 4.34315 16 6 16H10M9 12H15M14 8H18C19.6569 8 21 9.34315 21 11V13C21 14.6569 19.6569 16 18 16H14"
                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <svg v-if="!link" class="w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L19 19" stroke="#000000" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.58579 7H7H6C3.79086 7 2 8.79086 2 11V13C2 15.2091 3.79086 17 6 17H7H9H10C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15H9H7H6C4.89543 15 4 14.1046 4 13V11C4 9.89543 4.89543 9 6 9H7H9H9.58579L7.58579 7ZM11.5858 11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H13.5858L11.5858 11ZM15.5858 15H15H14C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17H15H17H17.5858L15.5858 15ZM19.9227 16.5085L18.3785 14.9642C19.3021 14.7873 20 13.9752 20 13V11C20 9.89543 19.1046 9 18 9H17H15H14C13.4477 9 13 8.55228 13 8C13 7.44772 13.4477 7 14 7H15H17H18C20.2091 7 22 8.79086 22 11V13C22 14.5123 21.1608 15.8285 19.9227 16.5085ZM15.8834 12.4691L14.4142 11H15C15.5523 11 16 11.4477 16 12C16 12.1695 15.9578 12.3292 15.8834 12.4691Z"
                            fill="#000000" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex gap-2">
            <div class="relative ">

                <input type="number" min="0" class="
                      pl-6
                      h-10
              
                      bg-transparent
                      dark:text-white
            
                      w-full
                      rounded-md
                      text-sm
                    " @input="changeTopLeft" :value="topLeft" />
                <div
                    class="absolute dark:text-white  flex items-center justify-center rounded  text-white transform left-2 top-3">
                    <svg width="16px" height="16px" fill="#9CA3AF" viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path
                            d="M656 200h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm58 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM192 650h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm696-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm174-696H358c-127 0-230 103-230 230v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-87.3 70.7-158 158-158h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
                    </svg>
                </div>
            </div>
            <div class="relative ">

                <input type="number" min="0" class="pl-6 h-10 bg-transparent dark:text-white w-full rounded-md text-sm"
                    @input="changeTopRight" :value="topRight" />
                <div
                    class="absolute dark:text-white  flex items-center justify-center rounded  text-white transform right-2 top-3">
                    <svg width="16px" height="16px" fill="#9CA3AF" viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M368 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-2 696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm522-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM192 128h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm174 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-48-696H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c87.3 0 158 70.7 158 158v182c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V358c0-127-103-230-230-230z" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="flex gap-2">
            <div class="relative ">

                <input type="number" min="0" class="pl-6 h-10 bg-transparent dark:text-white w-full rounded-md text-sm"
                    @input="changeBottomLeft" :value="bottomLeft" />
                <div
                    class="absolute dark:text-white  flex items-center justify-center rounded  text-white transform left-2 top-3">
                    <svg width="16px" height="16px" fill="#9CA3AF" viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path
                            d="M712 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm2-696h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM136 374h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm0-174h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm752 624h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-348 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-230 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm230 624H358c-87.3 0-158-70.7-158-158V484c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v182c0 127 103 230 230 230h182c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
                    </svg>
                </div>
            </div>

            <div class="relative ">

                <input type="number" min="0" class="pl-6 h-10 bg-transparent dark:text-white w-full rounded-md text-sm"
                    @input="changeBottomRight" :value="bottomRight" />
                <div
                    class="absolute dark:text-white  flex items-center justify-center rounded  text-white transform right-2 top-3">
                    <svg width="16px" height="16px" fill="#9CA3AF" viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path
                            d="M368 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-58-624h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm578 102h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM192 824h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-174h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm292 72h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm174 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm230 276h-56c-4.4 0-8 3.6-8 8v182c0 87.3-70.7 158-158 158H484c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h182c127 0 230-103 230-230V484c0-4.4-3.6-8-8-8z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['editor', 'selected'],
    data() {
        return {
            topLeft: 0,
            topRight: 0,
            bottomRight: 0,
            bottomLeft: 0,
            link: false,

        }
    },
    watch: {
        selected: function (newObj, oldObj) {
            this.updateData(newObj)
        }
    },
    methods: {
        selectAll(value) {
            if (this.link) {
                this.topLeft = value;
                this.topRight = value;
                this.bottomRight = value;
                this.bottomLeft = value;
            }
        },
        changeTopLeft: function (e) {
            this.topLeft = e.target.value
            this.selectAll(e.target.value)
            this.selected.cornerRadius([this.topLeft, this.topRight, this.bottomRight, this.bottomLeft])
        },
        changeTopRight: function (e) {
            this.topRight = e.target.value;
            this.selectAll(e.target.value)
            this.selected.cornerRadius([this.topLeft, this.topRight, this.bottomRight, this.bottomLeft])
        },
        changeBottomRight: function (e) {
            this.bottomRight = e.target.value;
            this.selectAll(e.target.value)
            this.selected.cornerRadius([this.topLeft, this.topRight, this.bottomRight, this.bottomLeft])
        },
        changeBottomLeft: function (e) {
            this.bottomLeft = e.target.value;
            this.selectAll(e.target.value)
            this.selected.cornerRadius([this.topLeft, this.topRight, this.bottomRight, this.bottomLeft])
        },
        updateData: function (obj) {
            var cr = obj.cornerRadius()
            this.topLeft = cr[0];
            this.topRight = cr[1];
            this.bottomRight = cr[2];
            this.bottomLeft = cr[3]
        }
    },
    mounted() {
        this.updateData(this.selected)
    }
}
</script>