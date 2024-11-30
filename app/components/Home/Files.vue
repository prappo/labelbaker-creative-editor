<template>
  <div class="w-full h-full md:px-10 md:py-10 px-5 py-5">
    <div v-if="filesInfo" class="gap-10 flex flex-col">
      <h1 class="font-semibold text-2xl py-3">PDF files</h1>
      <div class="grid md:grid-cols-10 gap-5 grid-cols-2">
        <div
          class="
            bg-white
            rounded-md
            shadow
            hover:shadow-xl
            flex flex-col
            justify-between
            items-center
          "
          v-for="(pdf, i) in filesInfo.pdfs.files"
          :key="i"
        >
          <svg
            class="h-20 m-4 w-20 fill-gray-500"
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                class="st0"
                d="M378.413,0H208.297h-13.182L185.8,9.314L57.02,138.102l-9.314,9.314v13.176v265.514
		c0,47.36,38.528,85.895,85.896,85.895h244.811c47.353,0,85.881-38.535,85.881-85.895V85.896C464.294,38.528,425.766,0,378.413,0z
		 M432.497,426.105c0,29.877-24.214,54.091-54.084,54.091H133.602c-29.884,0-54.098-24.214-54.098-54.091V160.591h83.716
		c24.885,0,45.077-20.178,45.077-45.07V31.804h170.116c29.87,0,54.084,24.214,54.084,54.092V426.105z"
              />
              <path
                class="st0"
                d="M171.947,252.785h-28.529c-5.432,0-8.686,3.533-8.686,8.825v73.754c0,6.388,4.204,10.599,10.041,10.599
		c5.711,0,9.914-4.21,9.914-10.599v-22.406c0-0.545,0.279-0.817,0.824-0.817h16.436c20.095,0,32.188-12.226,32.188-29.612
		C204.136,264.871,192.182,252.785,171.947,252.785z M170.719,294.888h-15.208c-0.545,0-0.824-0.272-0.824-0.81v-23.23
		c0-0.545,0.279-0.816,0.824-0.816h15.208c8.42,0,13.447,5.027,13.447,12.498C184.167,290,179.139,294.888,170.719,294.888z"
              />
              <path
                class="st0"
                d="M250.191,252.785h-21.868c-5.432,0-8.686,3.533-8.686,8.825v74.843c0,5.3,3.253,8.693,8.686,8.693h21.868
		c19.69,0,31.923-6.249,36.81-21.324c1.76-5.3,2.723-11.681,2.723-24.857c0-13.175-0.964-19.557-2.723-24.856
		C282.113,259.034,269.881,252.785,250.191,252.785z M267.856,316.896c-2.318,7.331-8.965,10.459-18.21,10.459h-9.23
		c-0.545,0-0.824-0.272-0.824-0.816v-55.146c0-0.545,0.279-0.817,0.824-0.817h9.23c9.245,0,15.892,3.128,18.21,10.46
		c0.95,3.128,1.62,8.56,1.62,17.93C269.476,308.336,268.805,313.768,267.856,316.896z"
              />
              <path
                class="st0"
                d="M361.167,252.785h-44.812c-5.432,0-8.7,3.533-8.7,8.825v73.754c0,6.388,4.218,10.599,10.055,10.599
		c5.697,0,9.914-4.21,9.914-10.599v-26.351c0-0.538,0.265-0.81,0.81-0.81h26.086c5.837,0,9.23-3.532,9.23-8.56
		c0-5.028-3.393-8.553-9.23-8.553h-26.086c-0.545,0-0.81-0.272-0.81-0.817v-19.425c0-0.545,0.265-0.816,0.81-0.816h32.733
		c5.572,0,9.245-3.666,9.245-8.553C370.411,256.45,366.738,252.785,361.167,252.785z"
              />
            </g>
          </svg>
          <div
            class="
              bg-gray-100
              py-2
              w-full
              flex
              space-between
              rounded-bl-md rounded-br-md
            "
          >
            <button
              @click="downloadFile(pdf)"
              class="w-full flex justify-center"
            >
              <ArrowDownCircleIcon class="w-5 h-5 hover:text-green-500" />
            </button>
            <button @click="deleteFile(pdf)" class="w-full flex justify-center">
              <TrashIcon class="w-5 h-5 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <h1 class="font-semibold text-2xl py-3">Image files</h1>
      <div class="grid md:grid-cols-8 grid-cols-2 gap-4">
        <div
          class="
            flex
            bg-white
            rounded-md
            shadow
            hover:shadow-xl
            flex-col
            justify-between
          "
          v-for="(image, i) in filesInfo.images.files"
          :key="i"
        >
          <img class="rounded-md m-5 shadow-md" :src="image" />
          <div
            class="
              bg-gray-100
              py-2
              w-full
              flex
              space-between
              rounded-bl-md rounded-br-md
            "
          >
            <button
              @click="downloadFile(image)"
              class="w-full flex justify-center"
            >
              <ArrowDownCircleIcon class="w-5 h-5 hover:text-green-500" />
            </button>
            <button
              @click="deleteFile(image, 'images')"
              class="w-full flex justify-center"
            >
              <TrashIcon class="w-5 h-5 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <h1 v-else class="text-4xl font-semibold">{{ defaultMessage }}</h1>
  </div>
</template>
<script>
import { ArrowDownCircleIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { enc } from "../../libs/helper";
import { userData } from "../../store/user";
import { dashboard } from "../../store/dashboard";
import { files } from "../../store/files";

export default {
  data() {
    return {
      filesInfo: null,
      userData,
      dashboard,
      files,
      defaultMessage:'Please wait...'
    };
  },
  methods: {
    getFiles() {
      if (!this.files.data) {
        let email = enc(this.userData.details.email);
        fetch(this.serverEndpoint + "/get/" + email + "/files")
          .then((res) => res.json())
          .then((result) => {
            this.filesInfo = result;
            this.dashboard.imageStorage = (
              result.images.storage * 0.000001
            ).toFixed(2);
            this.dashboard.pdfStorage = (
              result.pdfs.storage * 0.000001
            ).toFixed(2);
            
          }).catch(e => {
            this.defaultMessage = 'Unable to load files'
          });
      }
    },

    downloadFile(uri) {
      var anchor = document.createElement("a");
      anchor.href = uri;
      anchor.target = "_blank";
      anchor.download = uri.split("/").pop();
      anchor.click();
    },

    deleteFile(file, type = "pdf") {
      let fileName = file.split("/").pop();
      fetch(
        this.serverEndpoint +
          "/" +
          enc(type) +
          "/" +
          enc(this.userData.details.email) +
          "/" +
          enc(fileName),
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          
          this.files.data = null;
          this.getFiles();
        });
    },
  },
  mounted() {
    this.getFiles();
  },
  components: { ArrowDownCircleIcon, TrashIcon },
};
</script>