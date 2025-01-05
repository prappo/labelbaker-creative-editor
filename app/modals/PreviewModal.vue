<template>
  <div>
    <vue-final-modal v-model="stats.showPreviewModal" style="z-index: 9999999" classes="modal-container"
      content-class="modal-content" @keydown.esc="closeModal">
      <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
        <div class="w-full flex justify-center">
          <div class="relative w-full h-full max-w-7xl">
            <!-- Modal content -->
            <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" @click="closeModal"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <!-- Modal header -->
              <div class="px-6 py-3 border-b rounded-t dark:border-gray-600">
                <h3 v-if="showHeaderOptions"
                  class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white flex items-center justify-center gap-3">
                  <button type="button"
                    class="px-3 flex gap-2 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="replay">
                    <ArrowPathIcon class="w-4" />
                    ReRender
                  </button>
                  <!-- render button -->

                  <button @click="exportAsVideo" type="button"
                    class="px-3 relative flex gap-2 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <VideoCameraIcon class="w-4" />
                    Export as Video
                    <div v-if="appMode === 'noAuth' && isPro('yes')"
                      style="position: absolute; top: -15px; right: -20px;">
                      <IsProTag />
                    </div>
                  </button>
                  <div v-if="exportSettings" class="flex bg-gray-200 px-4 py-1 rounded-full items-center gap-3">
                    <ClockIcon class="w-4" />
                    <input min="1" v-model="duration" class="w-28 rounded-full h-7" placeholder="Duration"
                      type="number" />
                    Sec
                    <button @click="render" type="button"
                      class="px-3 flex gap-2 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <FilmIcon class="w-4" />
                      Render
                    </button>


                    <button @click="exportSettings = false" type="button"
                      class="flex gap-2  text-xs text-red-600 font-medium text-center">
                      <XCircleIcon class="w-5" />

                    </button>
                  </div>
                </h3>
                <div v-else class="h-8 flex items-center justify-center font-semibold w-full">
                  Preview
                </div>
              </div>
              <!-- Modal body -->
              <div class="w-full">


                <div
                  class="md:w-full relative md:block overflow-auto bg-white  top-0 w-full dark:bg-gray-500 items-center justify-center">

                  <!-- rendaring overlay -->
                  <div v-if="rendering"
                    class="absolute bg-blue-400 bg-opacity-30 w-full h-full top-0 flex justify-center z-10 items-center">
                    <div class="bg-blue-500 font-semibold text-white px-3 py-1 rounded-full flex items-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      Rendering...
                    </div>
                  </div>

                  <!-- download overlay -->
                  <div v-if="downloadLink"
                    class="absolute bg-green-400 gap-5 bg-opacity-80 w-full h-full top-0 flex flex-col justify-center z-10 items-center">
                    <div class="text-xl text-white bg-green-500 px-5 py-1 rounded-full shadow font-semibold">
                      Your video is ready to download
                    </div>
                    <div class=" px-3 py-1 rounded-full flex gap-5 items-center">
                      <a :href="downloadLink" :download="'video.mp4'" v-if="downloadLink"
                        class="px-3 flex gap-2 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-full hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <CloudArrowDownIcon class="w-4" />
                        Download Video
                      </a>
                      <button @click="downloadLink = null" type="button"
                        class="px-3 flex gap-2 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        <XCircleIcon class="w-4" />
                        Close
                      </button>
                    </div>
                  </div>

                  <!-- Previw -->

                  <div style="height: 80vh" class="w-full h-full" id="previewStage">
                    <div class="flex justify-center" id="previewCanvas"></div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { Editor } from "../../src/editor";
import { stats } from "../store/stats";
import { TempData } from "../store/temp"
import { canvasContainer } from "../store/editor";
const IsProTag = defineAsyncComponent(() =>
  import("../components/Tags/IsPro.vue")
);
import {
  ArrowPathIcon,
  ClockIcon,
  CloudArrowDownIcon,
  FilmIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
import { VideoCameraIcon } from "@heroicons/vue/24/solid";
export default {
  components: {
    IsProTag,
    VueFinalModal,
    ModalsContainer,
    ArrowPathIcon,
    VideoCameraIcon,
    ClockIcon,
    FilmIcon,
    XCircleIcon,
    CloudArrowDownIcon,
  },
  data() {
    return {
      stats, TempData,
      selected: {
        props: null,
      },
      canvasContainer,
      editor: null,
      duration: 5,
      exportSettings: false,
      downloadLink: null,
      rendering: false,
      showHeaderOptions: false,
    };
  },
  methods: {
    exportAsVideo() {
      if (this.appMode === 'noAuth' && this.isPro('yes')) {
        return alert('Pro version required');
      }
      this.exportSettings = true;
    },
    exportVid(blob) {
      const filename = 'video.mp4';
      this.downloadLink = URL.createObjectURL(blob);
      
      // Update the download link to use .mp4 extension
      const downloadLink = document.querySelector('a[download="myvideo.webm"]');
      if (downloadLink) {
        downloadLink.setAttribute('download', filename);
      }
    },
    render() {
      // Check for MP4 support first
      const mimeTypes = [
        'video/mp4;codecs=h264,aac',
        'video/mp4',
        'video/webm;codecs=h264,opus',
        'video/webm;codecs=vp8,opus'
      ];

      let selectedMimeType = null;
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      if (!selectedMimeType) {
        alert('Your browser does not support video recording');
        return;
      }

      this.downloadLink = null;
      this.rendering = true;
      
      this.applyOnCanvas()
        .then((e) => {
          const chunks = []; 
          const canvas = this.editor.layer.getNativeCanvasElement();
          const stream = canvas.captureStream(30);
          const rec = new MediaRecorder(stream, {
            mimeType: selectedMimeType,
            videoBitsPerSecond: 2500000, // 2.5 Mbps
          });

          // Audio handling
          const audioCtx = new AudioContext();
          const dest = audioCtx.createMediaStreamDestination();
          
          if (this.editor.medias && this.editor.medias.length > 0) {
            try {
              this.editor.medias.forEach(media => {
                if (media && !media.paused) {
                  const sourceNode = audioCtx.createMediaElementSource(media);
                  sourceNode.connect(dest);
                  sourceNode.connect(audioCtx.destination);
                }
              });
              
              const audioTrack = dest.stream.getAudioTracks()[0];
              if (audioTrack) {
                stream.addTrack(audioTrack);
              }
            } catch (err) {
              console.warn('Audio setup failed:', err);
            }
          }

          rec.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          rec.onstop = () => {
            if (chunks.length > 0) {
              const blob = new Blob(chunks, { type: selectedMimeType.split(';')[0] });
              // Change the download filename to .mp4
              this.exportVid(blob);
            } else {
              this.rendering = false;
              console.error('No data was recorded');
            }
          };

          rec.onerror = (err) => {
            this.rendering = false;
            console.error('Recording error:', err);
          };

          rec.start(100);
          
          setTimeout(() => {
            rec.stop();
            this.rendering = false;
          }, this.duration * 1000);
        })
        .catch((err) => {
          this.rendering = false;
          console.error('Canvas setup failed:', err);
        });
    },
    closeModal() {

      this.editor.clearIntervals();
      stats.showPreviewModal = false;
      this.editor.clearAll();
      this.editor = null;
      document.getElementById('previewCanvas').innerHTML = '';

    },
    replay() {
      this.applyOnCanvas();
    },
    applyOnCanvas() {

      return new Promise((resolve, reject) => {

        const config = {
          width: parseInt(this.selected.props.cellWidth),
          height: parseInt(this.selected.props.cellHeight),
          container: "previewCanvas",
          containerWrapper: "previewStage",
          pageHeight: parseInt(this.selected.props.pageHeight),
          pageWidth: parseInt(this.selected.props.pageWidth),
          dragging: false,
          readOnly: true,
        };

        if (this.editor) {
          this.editor.clearIntervals();
          document.getElementById('previewCanvas').innerHTML = '';
          this.editor.clearAll();
        }

        const editor = new Editor(config);
        this.editor = editor;
        editor.readOnly = true;
        this.canvas = editor;
        window.preview = editor;

        try {
          editor.fitIntoContainer();
        } catch (e) { }
        window.addEventListener("resize", function () {
          try {
            editor.fitIntoContainer();
          } catch (e) { }
        });

        let data = this.canvasContainer.editor.editor;
        let store = this.selected.props;

        editor.editorWidth = parseInt(store.cellWidth);
        editor.editorHeight = parseInt(store.cellHeight);
        // Import data from local storage
        try {
          editor.ImportData.source(
            JSON.parse(canvasContainer.editor.editor.toJSON())
          );

          setTimeout(() => {
            editor.transform.nodes([]);
            editor.fitIntoContainer();
            // editor.selectEvent.data = null;
            // document.dispatchEvent(editor.selectEvent);

            resolve();
          }, 100);

          editor.fitIntoContainer();
        } catch (e) { reject() }

      });
    },
  },
  mounted() {
    setTimeout(() => {
      if (!TempData.templateType.includes('banner')) {
        this.showHeaderOptions = true;
      }
    }, 200)
    this.selected.props = this.canvasContainer;

    this.applyOnCanvas()
      .then((e) => {
        // this.render();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

