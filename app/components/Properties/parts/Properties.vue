<template>
  <div>
    <div class="relative">
      <div class="text-xs text-gray-400 tracking-wider mb-2">Name</div>
      <input type="text" class="
           
            h-9
            bg-white
            border border-gray-300
            dark:border-gray-700 dark:text-white dark:bg-transparent
            w-full
            rounded-md
            text-sm
          " placeholder="Text" @change="(event) => selected.name(event.target.value.replace(/\ /g, '_'))
            " :value="selected.name()" />

    </div>

  </div>
</template>
  
<script>



export default {
  props: ["editor", "selected"],
  components: {

  },
  data() {
    return {

    };
  },
  methods: {

  },


};
</script>