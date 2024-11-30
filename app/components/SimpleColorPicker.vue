<template>
    <div>
        <input :value="color" @input="handleColor" type="color" />
        <span></span>
    </div>
</template>
<script>
export default {
    props:['color'],
    methods:{
        handleColor: function(e){
           
            this.$emit('colorChange', e.target.value)
        }
    }
}
</script>
<style scoped>
input {
    cursor: pointer;
}
input[type=color] {
    width: 20px;
    height: 20px; 
    border-radius: 50%;
    overflow: hidden;
}

input[type=color]::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
  padding: 0;
}

input[type=color]::-webkit-color-swatch-wrapper {
    border: none;
    border-radius: 50%;
    padding: 0;
}
</style>