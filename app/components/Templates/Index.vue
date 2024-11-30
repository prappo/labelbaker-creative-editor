<template>
  <div>Templates</div>
</template>

<script>
export default {
  data() {
    return {
      templates: null,
    };
  },
  methods: {
    getShippingTemplateEndpoint() {
      return this.apiEndpoint + "/assets/editor/shipping/index.json";
    },
  },
  mounted() {
    fetch(this.getShippingTemplateEndpoint())
      .then((res) => res.json())
      .then((data) => {
        this.templates = data;
        
      });
  },
};
</script>