<template>
  <div>
    <vue-final-modal
      v-model="stats.showExportModal"
      style="z-index: 9999999"
      classes="modal-container"
      content-class="modal-content"
      @keydown.esc="stats.showExportModal = false"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div class="w-full flex justify-center">
          <div class="relative w-full h-full max-w-md md:h-auto">
            <!-- Modal content -->
            <div
              class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <button
                type="button"
                @click="stats.showExportModal = !stats.showExportModal"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <!-- Modal header -->
              <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3
                  class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white"
                >
                  Export As
                </h3>
              </div>
              <!-- Modal body -->
              <div class="p-6 grid grid-cols-3 gap-2">
                <button
                  @click="exportAs('template')"
                  class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
                >
                  <div
                    class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-12 h-12 my-5 stroke-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
                      />
                    </svg>
                  </div>
                  <div class="flex items-center w-full">
                    <div
                      class="text-xs py-1 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden"
                    >
                      Template
                    </div>
                  </div>
                </button>

                <button
                  @click="exportAs('image')"
                  class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
                >
                  <div
                    class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-12 h-12 my-5 stroke-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                  <div class="flex items-center w-full">
                    <div
                      class="text-xs py-1 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden"
                    >
                      Image
                    </div>
                  </div>
                </button>
                <button
                  @click="exportAs('pdf')"
                  class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
                >
                  <div
                    class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative"
                  >
                    <svg
                      class="w-10 h-12 my-5 fill-gray-500"
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
                  </div>
                  <div class="flex items-center w-full">
                    <div
                      class="text-xs py-1 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden"
                    >
                      PDF
                    </div>
                  </div>
                </button>

                <button
                  @click="exportAs('video')"
                  class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
                >
                  <isPro />
                  <div
                    class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-12 h-12 my-5 stroke-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <div class="flex items-center w-full">
                    <div
                      class="text-xs py-1 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden"
                    >
                      Video
                    </div>
                  </div>
                </button>

                <button
                  v-if="appMode === 'noAuth'"
                  @click="exportAs('featuredImage')"
                  class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
                >
                  <div
                    class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative"
                  >
                    <svg
                      class="w-12 h-12 my-5 fill-gray-500"
                      viewBox="-5 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>wordpress</title>
                      <path
                        d="M1.563 16.219c0-1.375 0.281-2.656 0.813-3.813l4.469 12.25c-3.125-1.5-5.281-4.719-5.281-8.438zM17.281 15.75c0 0.813-0.313 1.719-0.719 3.031l-0.938 3.125-3.406-10.094c0.563-0.031 1.094-0.094 1.094-0.094 0.5-0.063 0.438-0.781-0.063-0.75 0 0-1.531 0.094-2.5 0.094-0.938 0-2.469-0.094-2.469-0.094-0.5-0.031-0.563 0.719-0.063 0.75 0 0 0.469 0.063 0.969 0.094l1.469 4-2.063 6.156-3.406-10.156c0.563-0.031 1.063-0.094 1.063-0.094 0.531-0.063 0.469-0.781-0.063-0.75 0 0-1.5 0.094-2.5 0.094h-0.594c1.688-2.531 4.563-4.219 7.844-4.219 2.438 0 4.656 0.938 6.344 2.469-0.063-0.031-0.094-0.031-0.125-0.031-0.938 0-1.594 0.813-1.594 1.688 0 0.75 0.469 1.406 0.938 2.188 0.344 0.625 0.781 1.438 0.781 2.594zM8.281 25.219l2.813-8.188 2.906 7.906c0 0.063 0.031 0.094 0.063 0.125-0.969 0.344-2.031 0.531-3.125 0.531-0.906 0-1.813-0.125-2.656-0.375zM19.156 11.719c0.75 1.344 1.156 2.875 1.156 4.5 0 3.469-1.875 6.469-4.656 8.125l2.875-8.313c0.531-1.313 0.688-2.406 0.688-3.344 0-0.344 0-0.656-0.063-0.969zM10.938 5.281c6.031 0 10.938 4.906 10.938 10.938s-4.906 10.938-10.938 10.938-10.938-4.906-10.938-10.938 4.906-10.938 10.938-10.938zM10.938 26.656c5.75 0 10.438-4.688 10.438-10.438s-4.688-10.438-10.438-10.438-10.438 4.688-10.438 10.438 4.688 10.438 10.438 10.438z"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex items-center w-full">
                    <div
                      class="text-xs py-1 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden"
                    >
                      Featured Image
                    </div>
                  </div>
                </button>

                <button
                  v-if="appMode === 'noAuth' && isWooExists"
                  @click="exportAs('productImage')"
                  class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow relative hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
                >
                  <div
                    class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white md:pb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full justify-center relative"
                  >
                    <svg
                      class="w-12 h-12 my-5 fill-gray-500"
                      viewBox="0 -51.5 256 256"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                    >
                      <path
                        d="M23.759 0h208.378C245.325 0 256 10.675 256 23.863v79.541c0 13.188-10.675 23.863-23.863 23.863H157.41l10.257 25.118-45.109-25.118H23.863c-13.187 0-23.862-10.675-23.862-23.863V23.863C-.104 10.78 10.57 0 23.759 0z"
                        fill="#9B5C8F"
                      />
                      <path
                        d="M14.578 21.75c1.457-1.978 3.642-3.018 6.556-3.226 5.308-.417 8.326 2.08 9.054 7.492 3.226 21.75 6.764 40.17 10.51 55.259l22.79-43.395c2.082-3.955 4.684-6.036 7.806-6.244 4.579-.312 7.388 2.601 8.533 8.741 2.602 13.84 5.932 25.6 9.886 35.59 2.706-26.432 7.285-45.476 13.737-57.235 1.56-2.914 3.85-4.371 6.868-4.58 2.394-.207 4.579.521 6.556 2.082 1.977 1.561 3.018 3.538 3.226 5.932.104 1.873-.208 3.434-1.04 4.995-4.059 7.493-7.39 20.085-10.095 37.567-2.601 16.963-3.538 30.18-2.914 39.65.209 2.6-.208 4.89-1.248 6.868-1.25 2.289-3.122 3.538-5.516 3.746-2.706.208-5.515-1.04-8.221-3.85-9.678-9.887-17.379-24.664-22.998-44.332-6.765 13.32-11.76 23.31-14.986 29.97-6.14 11.76-11.343 17.796-15.714 18.108-2.81.208-5.203-2.186-7.284-7.18-5.307-13.633-11.031-39.962-17.17-78.986-.417-2.706.207-5.1 1.664-6.972zm223.636 16.338c-3.746-6.556-9.262-10.51-16.65-12.072-1.978-.416-3.85-.624-5.62-.624-9.99 0-18.107 5.203-24.455 15.61-5.412 8.845-8.117 18.627-8.117 29.346 0 8.013 1.665 14.881 4.995 20.605 3.746 6.556 9.262 10.51 16.65 12.071 1.977.417 3.85.625 5.62.625 10.094 0 18.211-5.203 24.455-15.61 5.411-8.95 8.117-18.732 8.117-29.45.104-8.117-1.665-14.882-4.995-20.501zm-13.112 28.826c-1.457 6.868-4.059 11.967-7.91 15.401-3.017 2.706-5.827 3.85-8.428 3.33-2.498-.52-4.58-2.705-6.14-6.764-1.25-3.226-1.873-6.452-1.873-9.47 0-2.601.208-5.203.728-7.596.937-4.267 2.706-8.43 5.515-12.384 3.435-5.1 7.077-7.18 10.823-6.452 2.498.52 4.58 2.706 6.14 6.764 1.249 3.226 1.873 6.452 1.873 9.47 0 2.706-.208 5.307-.728 7.7zm-52.033-28.826c-3.746-6.556-9.366-10.51-16.65-12.072-1.977-.416-3.85-.624-5.62-.624-9.99 0-18.107 5.203-24.455 15.61-5.411 8.845-8.117 18.627-8.117 29.346 0 8.013 1.665 14.881 4.995 20.605 3.746 6.556 9.262 10.51 16.65 12.071 1.978.417 3.85.625 5.62.625 10.094 0 18.211-5.203 24.455-15.61 5.412-8.95 8.117-18.732 8.117-29.45 0-8.117-1.665-14.882-4.995-20.501zm-13.216 28.826c-1.457 6.868-4.059 11.967-7.909 15.401-3.018 2.706-5.828 3.85-8.43 3.33-2.497-.52-4.578-2.705-6.14-6.764-1.248-3.226-1.872-6.452-1.872-9.47 0-2.601.208-5.203.728-7.596.937-4.267 2.706-8.43 5.516-12.384 3.434-5.1 7.076-7.18 10.822-6.452 2.498.52 4.58 2.706 6.14 6.764 1.25 3.226 1.873 6.452 1.873 9.47.105 2.706-.208 5.307-.728 7.7z"
                        fill="#FFF"
                      />
                    </svg>
                  </div>
                  <div class="flex items-center w-full">
                    <div
                      class="text-xs py-1 w-full leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md truncate md:block hidden"
                    >
                      Product Image
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { stats } from "../../store/stats";
import { canvasContainer } from "../../store/editor";
import { downloadAsJson } from "../../libs/helper";
import { defineAsyncComponent } from "vue";

const isPro = defineAsyncComponent(() =>
  import("../../components/Tags/IsPro.vue")
);
export default {
  components: { VueFinalModal, ModalsContainer, isPro },
  data() {
    return {
      stats,
      canvasContainer,
    };
  },
  methods: {
    exportAs(type) {
      this.stats.showExportModal = false;
      if (type === "template") {
        this.downloadAsTemplate();
      }

      if (type === "image") {
        this.downloadAsImage();
      }

      if (type === "pdf") {
        this.downloadAsPDF();
      }

      if (type === "video") {
        this.stats.showPreviewModal = true;
      }
      if (type === "featuredImage") {
        this.stats.featuredImageModal = true;
      }
      if (type === "productImage") {
        this.stats.productImageModal = true;
      }
    },

    downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    getProps() {
      let container = {};
      for (let index in canvasContainer) {
        if (index != "editor") {
          container[index] = canvasContainer[index];
        }
      }
      container.icons = [];
      return container;
    },
    downloadAsTemplate() {
      canvasContainer.editor.deselect();
      canvasContainer.editor.editor.find("Image").forEach((image) => {
        let imageSrc;
        if (image.attrs.type === "svg") {
          imageSrc = image.attrs.imageSrc;
        } else {
          imageSrc = image.attrs.image.currentSrc;
        }
        image.setAttr("imageSrc", imageSrc);
      });
      downloadAsJson(
        canvasContainer.editor.editor.toJSON(),
        "template",
        "template",
        this.getProps(),
        "download",
        canvasContainer.editor.save(1)
      );
    },

    downloadAsImage: function () {
      canvasContainer.editor.deselect();
      let dataURL = canvasContainer.editor.saveImage();
      this.downloadURI(dataURL, "image.png");
    },

    downloadAsPDF() {
      canvasContainer.editor.downloadAsPDF();
    },
  },
};
</script>

