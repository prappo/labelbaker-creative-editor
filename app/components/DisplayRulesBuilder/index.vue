<template>
  <div>
    <Repeater :json="json" :relation="relation"></Repeater>
  </div>
</template>

<script>
import Repeater from './repeater.vue';

export default {
  name: "Builder",
  props:["json","relation"],
  components: {
    Repeater,
  }
};
</script>

<style>

</style>
