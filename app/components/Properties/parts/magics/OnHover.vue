<template>
    <div>
     
        <Animation :selected="selected" easingFor="hover"  />
        </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const Animation = defineAsyncComponent(() => import('./Animation.vue'));
export default {
    props:['selected'],
    components: { Animation }
}
</script>