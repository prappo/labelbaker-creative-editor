<template>
  <div
    :id="id"
    role="tooltip"
    class="
      inline-block
      absolute
      invisible
      z-10
      py-2
      px-3
      text-sm
      font-medium
      text-white
      bg-gray-900
      rounded-lg
      shadow-sm
      opacity-0
      transition-opacity
      duration-300
      tooltip
      dark:bg-gray-700
    "
  >
    {{ $t("editor.settings." + id)}}
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
</template>

<script>
import { initTooltips} from 'flowbite'
export default {
    props:['id'],
    mounted(){
      initTooltips();
    }
}
</script>