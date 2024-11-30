<template>
    <div>
        <div class="text-xs text-gray-400 tracking-wider">Canvas Settings</div>
        <div class="relative mt-2 mb-5">
          <div class="text-xs text-gray-400 tracking-wider mb-2">Dimension</div>
          <div class="flex gap-6">
            <div class="relative ">

              <input type="number" class="
              pl-10
              h-9
              bg-white
              border border-gray-300
              dark:border-gray-700 dark:text-white
              dark:bg-transparent
              w-full
              rounded-md
              text-sm
            " :value="width" />
              <div
                class="w-4 absolute dark:text-white font-bold flex items-center justify-center rounded bg-blue-500 px-3 text-white transform left-2 top-2">
                W
              </div>
            </div>
            <div class="relative ">

              <input type="number" class="
                                            pl-10
                                            h-9
                                            bg-white
                                            border border-gray-300
                                            dark:border-gray-700 dark:text-white
                                            dark:bg-transparent
                                            w-full
                                            rounded-md
                                            text-sm
                                            " @input="" :value="height" />
              <div
                class="w-4 absolute dark:text-white font-bold flex items-center justify-center rounded bg-blue-500 px-3 text-white transform left-2 top-2">
                H
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['editor'],
    data(){
        return {
            height: 0,
            width: 0,
        }
    },
    mounted(){
        
    }
}
</script>