<script>
import { defineAsyncComponent } from 'vue';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    dynamicComponent() {
      const name = this.name;

      return defineAsyncComponent(() => import(`./${name}.vue`));
    },
  },
};
</script>

<template>
  <component :is="dynamicComponent" />
</template>