<template>
    <div>
      <div class="w-full">
        <div class="text-xs text-gray-400 tracking-wider mb-2">Radius</div>
        <input
          class="
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
          "
          type="number"
          min="0"
          :value="selected.radius()"
          @input="(event) => selected.radius(parseInt(event.target.value))"
        />
      </div>
    </div>
</template>

<script>
export default {
  props: ["editor", "selected"],
}
</script>