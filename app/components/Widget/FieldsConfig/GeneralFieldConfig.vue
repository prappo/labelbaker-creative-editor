<template>
  <div class="flex flex-col gap-3">
    <div class="flex gap-2 items-center justify-between">
      <span>Visible</span>
      <input v-model="visible" true-value="yes" false-value="no" class="w-20 p-1 dark:bg-gray-800 rounded"
        type="checkbox" />
    </div>
    <div class="flex gap-2 items-center justify-between">
      <span>Width</span>
      <input @input="($event) => element.width($event.target.value)" :value="element.width()"
        class="w-20 p-1 dark:bg-gray-800 rounded" type="number" />
    </div>
    <div class="flex gap-2 items-center justify-between">
      <span>Height</span>
      <input @input="($event) => element.height($event.target.value)" :value="element.height()"
        class="w-20 p-1 dark:bg-gray-800 rounded" type="number" />
    </div>
    <div class="flex gap-2 items-center justify-between">
      <span>Position X</span>
      <input @input="($event) => element.x($event.target.value)" :value="element.x()"
        class="w-20 p-1 dark:bg-gray-800 rounded" type="number" />
    </div>
    <div class="flex gap-2 items-center justify-between">
      <span>Position Y</span>
      <input @input="($event) => element.y($event.target.value)" :value="element.y()"
        class="w-20 p-1 dark:bg-gray-800 rounded" type="number" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["element"],
  data() {
    return {
      visible: 'yes',
    }
  },
  watch:{
    visible: function(newVal, oldVal){
      if(newVal === 'yes'){
        this.element.show()
      }else{
        this.element.hide();
      }
    }
  },
  methods: {
    visiblity(event) {
      
    }
  },
  mounted() {
    if(!this.element.isVisible()){
      this.visible = 'no';
    }
  }
};
</script>