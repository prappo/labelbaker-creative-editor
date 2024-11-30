<template >
    <div class="grid md:grid-cols-2 gap-3 items-center">
        <div class="flex flex-col" v-for="(field, index) in fields" :key="index">
            <div class="flex gap-2 items-center">
                <lable class="
                            block
                            mb-2
                            text-sm
                            font-medium
                            text-gray-900
                            dark:text-white
                          ">{{ field.name().replace(/\_/g, " ") }}</lable>
                <TextFieldConfig v-if="field.attrs.type === 'text'" :element="field" />

                <ImageFieldConfig v-if="field.attrs.type === 'image'" :element="field" />
            </div>
            <input v-if="field.attrs.type === 'text'" class="
                            bg-gray-50
                            border border-gray-300
                            text-gray-900 text-sm
                            rounded-lg
                            focus:ring-blue-500 focus:border-blue-500
                            block
                            w-full
                            p-2.5
                            dark:bg-gray-700
                            dark:border-gray-600
                            dark:placeholder-gray-400
                            dark:text-white
                            dark:focus:ring-blue-500
                            dark:focus:border-blue-500
                          " @input="changeValue($event, field)"
                :type="(field.attrs.textType) ? field.attrs.textType : 'text'" :value="getValue(field)" />
            <!-- Image field -->
            <div class="flex gap-6 justify-between items-center" v-else-if="field.attrs.type === 'image'">
                <img class="w-20 rounded-md shadow-md" :src="getImageLink(field)" />
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    @input="changeImage($event, field)" type="file">
            </div>

            <input v-else class="
                            bg-gray-50
                            border border-gray-300
                            text-gray-900 text-sm
                            rounded-lg
                            focus:ring-blue-500 focus:border-blue-500
                            block
                            w-full
                            p-2.5
                            dark:bg-gray-700
                            dark:border-gray-600
                            dark:placeholder-gray-400
                            dark:text-white
                            dark:focus:ring-blue-500
                            dark:focus:border-blue-500
                          " @input="changeValue($event, field)" type="text" :value="getValue(field)" />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import change from "../../../libs/change";
const TextFieldConfig = defineAsyncComponent(()=>import("./FieldsConfig/TextFieldConfig.vue")) ;
const ImageFieldConfig = defineAsyncComponent(()=>import("./FieldsConfig/ImageFieldConfig.vue"));

export default {
    props: ['fields', 'container'],
    components: { TextFieldConfig, ImageFieldConfig },
    methods: {
        getImageLink(el){
            return el.attrs.imageSrc;
        },
        changeValue(event, el) {
            if (el.attrs.type === "text") {
                change.changeText(el, event.target.value);
            }

            if (el.attrs.type === "barcodeBasic") {
                change.changeBarcodeBasic(el, event.target.value);
            }

            if (el.attrs.type === "barcode") {
                change.changeBarcode(el, event.target.value).catch((e) => {
                    this.error(e);
                });
            }

            if (el.attrs.type === "qrcode") {
                change.changeQrCode(el, event.target.value);
            }
        },

        changeImage(e, el) {
            // const file = e.target.files[0];
            // let imageUrl = URL.createObjectURL(file);
            // let config = {}
            // if (file.type === 'image/svg+xml') {
            //     config.type == 'svg';

            // }

            const convertBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);

                    fileReader.onload = () => {
                        resolve(fileReader.result);
                    };

                    fileReader.onerror = (error) => {
                        reject(error);
                    };
                });
            };

            const uploadImage = async (event) => {
                const file = event.target.files[0];
                const base64 = await convertBase64(file);

                this.container.editor.updateImage(el, base64, {})
            };

            uploadImage(e)

        },
        getValue(el) {
            if (el.attrs.type === "text") {
                return el.text();
            }
            if (el.attrs.type === "barcodeBasic") {
                return el.attrs.text.replace(/\*/g, "");
            }
            if (el.attrs.type === "barcode") {
                return el.attrs.barcode;
            }
            if (el.attrs.type === "qrcode") {
                return el.attrs.qrvalue;
            }
        },
    }
}
</script>