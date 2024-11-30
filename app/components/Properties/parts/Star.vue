<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-5 justify-between">
            <div class="w-full">
                <div class="text-xs text-gray-400 tracking-wider mb-2">Inner Radius</div>
                <input class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " type="number" min="0" :value="selected.innerRadius()"
                    @input="(event) => selected.innerRadius(parseInt(event.target.value))" />
            </div>
            <div class="w-full">
                <div class="text-xs text-gray-400 tracking-wider mb-2">Outer Radius</div>
                <input class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " type="number" min="0" :value="selected.outerRadius()"
                    @input="(event) => selected.outerRadius(parseInt(event.target.value !== '' ? event.target.value : 2))" />
            </div>
        </div>

        <div class="flex gap-5 justify-between">
            <div class="w-full">
                <div class="text-xs text-gray-400 tracking-wider mb-2">Number of Points</div>
                <input class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            px-2
            py-1
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " type="number" min="0" :value="selected.numPoints()"
                    @input="(event) => selected.numPoints(parseInt(event.target.value))" />
            </div>
          
        </div>
    </div>
</template>

<script>
export default {
    props: ["editor", "selected"],
}
</script>