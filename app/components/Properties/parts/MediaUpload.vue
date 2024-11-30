<template>
    <div>
        <div class="flex flex-col justify-center items-center w-full my-2">
            <!-- <div class=" w-full flex flex-col">

                <input type="text" v-model="prompt" placeholder="Prompt" />
                <button class="bg-green-500 text-white rounded-full my-2" @click="ai">Generate</button>
                <button @click="removeBg()">Remove background</button>
            </div> -->
            <div class="flex justify-between w-full py-2">
                <button class="px-1 text-[12px] py-1" @click="setActiveClass('uploader')"
                    :class="getActiveClass('uploader')">{{
                        uploaderText }}</button>
                <button class="px-1 text-[12px] py-1" @click="setActiveClass('url')" :class="getActiveClass('url')">From
                    URL</button>

            </div>
            <label @click="wpMedia" v-if="selectedMode === 'uploader'" for="dropzone-file"
                class="flex flex-col justify-center items-center w-full  bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col justify-center items-center py-2">
                   
                    <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                            upload</span> </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ this.format }}</p>
                </div>
                <input v-if="appMode === 'auth'" @change="fileUpload" id="dropzone-file" type="file" class="hidden" />
            </label>

            <div v-if="selectedMode === 'url'" class="w-full flex flex-col justify-start  items-start">
                <input v-model="imageUrl" class="bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              px-2
              py-1
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500" type="text" />
                <button @click="importMedia" class="bg-blue-500  mt-2 px-2 py-1 text-white rounded-full">Import
                    {{ type }}</button>

            </div>
            <lable v-if="isBusy" class="w-full pt-2">Uploading...</lable>
        </div>
    </div>
</template>

<script>
import { canvasContainer } from '../../../store/editor';
import { showError } from '../../../libs/helper';
import { stats } from '../../../store/stats';

export default {
    props: ['selected'],
    data() {
        return {
            stats,
            prompt: '',
            isBusy: false,
            selectedMode: 'uploader',
            imageUrl: null,
            activeClass: 'bg-gray-200  rounded-md dark:bg-gray-800',
            canvasContainer,

            type: 'image',
            uploaderText: 'Upload Image',
            uploaderTitle: 'Insert image',
            uploaderBtnTxt: 'Use this image',
            format: 'PNG,JPG',
        }
    },

    watch: {
        selected: function (newVal, oldVal) {
            this.changeText();
        }
    },

    methods: {
        removeBg() {
            if (!window.labelbakerBgRemover) {
                return alert("Pro version not found")
            }

            let config = {
                model: 'small',
                progress: (key, current, total) => {
                    console.log(`Downloading ${key}: ${current} of ${total}`);
                }
            };

            let imageSrc = this.selected.getAttr('imageSrc');

            window.labelbakerBgRemover(imageSrc,config).then((blob) => {
                this.uploadBlob(blob)
                // const url = URL.createObjectURL(blob);
            })
        },
        uploadBlob(blob) {
            let config = {}
            const blobToBase64 = (blob, callback) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    // const base64String = event.target.result.split(',')[1];
                    const base64String = event.target.result;
                    callback(base64String);
                };
                reader.readAsDataURL(blob);
            }

            // Usage
            blobToBase64(blob, (base64String) => {
                const base64Image = base64String.split(',')[1];

                let endPoint = this.serverEndpoint + '/upload'
                let body = { base64Image }
                if (this.appMode === 'noAuth') {
                    endPoint = this.exportURL
                    body = { 'image_data': base64Image }
                }

                fetch(endPoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then(response => response.json())
                    .then(data => {
                        this.isBusy = false;
                        if (this.appMode === 'noAuth') {
                            if (data.success) {
                                this.canvasContainer.editor.updateImage(this.selected, data.imageUrl, config)
                                this.stats.isBusy = false;
                            } else {
                                showError(data.message)
                                this.stats.isBusy = false;
                            }
                        } else {
                            this.canvasContainer.editor.updateImage(this.selected, data.imageUrl, config)
                            this.stats.isBusy = false;
                        }

                    })
                    .catch(error => {
                        this.isBusy = false;
                        showError('Unable to upload image');
                        this.stats.isBusy = false;
                        console.error(error);
                    });
              
                // You can use the base64String for your desired purpose
            });
        },
        ai() {
            if (this.prompt.length === 0) {
                return alert("Write something")
            }
            this.stats.isBusy = true;
         
          
            async function query(data) {
                const response = await fetch(
                    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
                    {
                        headers: { Authorization: "Bearer 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" },
                        method: "POST",
                        body: JSON.stringify(data),
                    }
                );
                const result = await response.blob();
                return result;
            }

            query({ "inputs": this.prompt }).then((response) => {
           
                let blob = response;
                this.uploadBlob(blob)
            }).catch(err => {
                console.log(err)
                this.stats.isBusy = false;
            });
        },
        changeText() {
            if (this.selected.attrs.type === 'video') {
                this.uploaderText = 'Upload Video';
                this.format = 'MP4,webm';
                this.type = 'video';
                this.uploaderTitle = 'Insert video';
                this.uploaderBtnTxt = 'Use this video';
            }

            if (this.selected.attrs.type === 'image') {
                this.uploaderText = 'Upload Image';
                this.format = 'PNG,JPG';
                this.type = 'image';
                this.uploaderTitle = 'Insert image';
                this.uploaderBtnTxt = 'Use this image';
            }

            if (this.selected.attrs.type === 'audio') {
                this.uploaderText = 'Upload audio';
                this.format = 'mp3';
                this.type = 'audio';
                this.uploaderTitle = 'Insert audio';
                this.uploaderBtnTxt = 'Use this audio';
            }
        },
        wpMedia() {
            if (this.appMode === 'auth') {
                return;
            }
            const wpUploader = wp.media({
                title: this.uploaderTitle, // modal window title
                library: {
                    // uploadedTo : wp.media.view.settings.post.id, // attach to the current post?
                    type: this.type
                },
                button: {
                    text: this.uploaderBtnTxt // button label text
                },
                multiple: false
            }).on('select', () => {
                const attachment = wpUploader.state().get('selection').first().toJSON();
                if (this.selected.attrs.type === 'image') {
                    this.canvasContainer.editor.updateImage(this.selected, attachment.url, {});
                }
                if (this.selected.attrs.type === 'video' || this.selected.attrs.type === 'audio') {
                    this.canvasContainer.editor.updateVideo(this.selected, attachment.url);

                }
           
            });


    

            wpUploader.open()
        },
        importMedia() {
            this.isBusy = true;
            if (!this.imageUrl) {
                return alert('Image URL required.');
            }
            try {
                this.canvasContainer.editor.updateImage(this.selected, this.imageUrl, {});

                if (this.selected.attrs.type === 'image') {
                    this.canvasContainer.editor.updateImage(this.selected, this.imageUrl, {});
                }
                if (this.selected.attrs.type === 'video' || this.selected.attrs.type === 'audio') {
                    this.canvasContainer.editor.updateVideo(this.selected, this.imageUrl);

                }
                this.isBusy = false;
            } catch (e) {
                this.isBusy = false;
                console.log(e)
            }

        },
        setActiveClass(mode) {
            this.selectedMode = mode;
        },

        getActiveClass(mode) {
            if (this.selectedMode === mode) {
                return this.activeClass;
            }

            return '';

        },

        fileUpload(e) {
            const file = e.target.files[0];

            this.isBusy = true;
            let config = {}
            const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg']
            if (!allowedTypes.includes(file.type)) {
                alert('File type not supported');
                return;
            }

            if (file.type === 'image/svg+xml') {
                config.type == 'svg';

            }

            if (!file) {
                alert('Please select an image file.');
                return;
            }

            const reader = new FileReader();

            reader.addEventListener('load', (event) => {
                const base64Image = event.target.result.split(',')[1];

                let endPoint = this.serverEndpoint + '/upload'
                let body = { base64Image }
                if (this.appMode === 'noAuth') {
                    endPoint = this.exportURL
                    body = { 'image_data': base64Image }
                }

                fetch(endPoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then(response => response.json())
                    .then(data => {
                        this.isBusy = false;
                        if (this.appMode === 'noAuth') {
                            if (data.success) {
                                this.canvasContainer.editor.updateImage(this.selected, data.imageUrl, config)
                            } else {
                                showError(data.message)
                            }
                        } else {
                            this.canvasContainer.editor.updateImage(this.selected, data.imageUrl, config)
                        }

                    })
                    .catch(error => {
                        this.isBusy = false;
                        showError('Unable to upload image');
                        console.error(error);
                    });
            });

            reader.readAsDataURL(file);

        }
    },
    mounted() {
        this.changeText();
    }
}
</script>