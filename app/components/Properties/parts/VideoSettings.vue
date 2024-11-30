<template>
    <div>
        <input type="text" :value="selected.attrs.videoSrc" @input="(event) => videoUrl = event.target.value"/>
        <button class="w-full text-center bg-blue-500 text-white rounded-full py-1 px-3 my-2" @click="importVideo">Import Video</button>
    </div>
</template>

<script>
export default {
    props:['selected','editor'],
    data(){
        return{
            videoUrl:'',
        }
    },
    methods:{
        importVideo(){
         
            this.editor.updateVideo(this.selected, this.videoUrl)
           
        }
    },
    mounted(){
    
    }
}
</script>