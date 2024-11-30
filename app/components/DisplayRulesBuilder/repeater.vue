<template>
  <div>
    
    <Condition :json="json" :relation="relation"></Condition>
  </div>
</template>

<script>
import Condition from './condition.vue';

export default {
  name: "Repeater",
  props:["json","relation"],
  components:{
    Condition
  },
  data(){
    return {
      counter : 0,

    }
  }
};
</script>

