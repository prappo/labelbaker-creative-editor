<template>
  <div>
    <vue-final-modal
      v-model="stats.showPreviewModal"
      style="z-index: 9999999"
      classes="modal-container"
      content-class="modal-content"
      @keydown.esc="closeModal"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div class="w-full flex justify-center">
          <div class="relative w-full h-full max-w-7xl">
            <!-- Modal content -->
            <div
              class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <button
                type="button"
                @click="closeModal"
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
                  v-if="showHeaderOptions"
                  class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white"
                >
                  <!-- Main controls container -->
                  <div class="flex items-center justify-between">
                    <!-- Left side controls -->
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200"
                        @click="replay"
                      >
                        <ArrowPathIcon class="w-4 h-4 mr-1 inline-block" />
                        Replay
                      </button>
                    </div>

                    <!-- Right side export controls -->
                    <div class="flex items-center gap-3">
                      <!-- Export options when not rendering -->
                      <div v-if="!exportSettings" class="flex items-center gap-2">
                        <button
                          @click="exportAsVideo"
                          type="button"
                          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 flex items-center gap-2"
                        >
                          <VideoCameraIcon class="w-4 h-4" />
                          Export Video
                          <div
                            v-if="appMode === 'noAuth' && isPro('yes')"
                            class="absolute -top-2 -right-2"
                          >
                            <IsProTag />
                          </div>
                        </button>

                        <button
                          @click="exportAsGif"
                          type="button"
                          class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-300 flex items-center gap-2"
                        >
                          <GifIcon class="w-4 h-4" />
                          Export GIF
                          <div
                            v-if="appMode === 'noAuth' && isPro('yes')"
                            class="absolute -top-2 -right-2"
                          >
                            <IsProTag />
                          </div>
                        </button>
                      </div>

                      <!-- Export settings when rendering -->
                      <div
                        v-if="exportSettings"
                        class="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg"
                      >
                        <!-- Duration input - only show for video -->
                        <div v-if="downloadType === 'video'" class="flex items-center gap-2">
                          <ClockIcon class="w-4 h-4 text-gray-500" />
                          <input
                            min="1"
                            v-model="duration"
                            class="w-20 px-2 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-blue-300"
                            placeholder="Duration"
                            type="number"
                          />
                          <span class="text-sm text-gray-600 dark:text-gray-300">sec</span>
                        </div>

                        <!-- Quality selector (only for GIF) -->
                        <div v-if="downloadType === 'GIF'" class="flex items-center gap-2">
                          <select 
                            v-model="gifQuality" 
                            class="px-2 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-blue-300 bg-white dark:bg-gray-700"
                          >
                            <option value="high">High Quality</option>
                            <option value="medium">Medium Quality</option>
                            <option value="low">Low Quality</option>
                          </select>
                        </div>

                        <!-- Action buttons -->
                        <div class="flex items-center gap-2">
                          <button
                            @click="render"
                            type="button"
                            class="px-4 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-300 flex items-center gap-2"
                          >
                            <FilmIcon class="w-4 h-4" />
                            Start Export
                          </button>

                          <button
                            @click="exportSettings = false"
                            type="button"
                            class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <XCircleIcon class="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </h3>
                <div
                  v-else
                  class="h-8 flex items-center justify-center font-semibold w-full"
                >
                  Preview
                </div>
              </div>
              <!-- Modal body -->
              <div class="w-full">
                <div
                  class="md:w-full relative md:block overflow-auto bg-white top-0 w-full dark:bg-gray-500 items-center justify-center"
                >
                  <!-- rendaring overlay -->
                  <div
                    v-if="rendering"
                    class="absolute bg-blue-400 bg-opacity-30 w-full h-full top-0 flex flex-col gap-3 justify-center z-10 items-center"
                  >
                    <div
                      class="bg-blue-500 font-semibold text-white px-5 py-2 rounded-full flex items-center"
                    >
                      <svg
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {{ renderingStatus }}
                    </div>
                    <div v-if="renderProgress > 0" class="bg-blue-500 px-5 py-2 rounded-full text-white">
                      {{ Math.round(renderProgress * 100) }}% Complete
                    </div>
                  </div>

                  <!-- download overlay -->
                  <div
                    v-if="downloadLink"
                    class="absolute bg-green-400 gap-5 bg-opacity-80 w-full h-full top-0 flex flex-col justify-center z-10 items-center"
                  >
                    <div
                      class="text-xl text-white bg-green-500 px-5 py-1 rounded-full shadow font-semibold"
                    >
                      Your {{ downloadType }} is ready to download
                    </div>
                    <div class="px-3 py-1 rounded-full flex gap-5 items-center">
                      <a
                        :href="downloadLink"
                        :download="downloadType === 'video' ? 'video.mp4' : 'animation.gif'"
                        v-if="downloadLink"
                        class="px-3 flex gap-2 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-full hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        <CloudArrowDownIcon class="w-4" />
                        Download {{ downloadType }}
                      </a>
                      <button
                        @click="downloadLink = null"
                        type="button"
                        class="px-3 flex gap-2 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        <XCircleIcon class="w-4" />
                        Close
                      </button>
                    </div>
                  </div>

                  <!-- Previw -->

                  <div
                    style="height: 80vh"
                    class="w-full h-full"
                    id="previewStage"
                  >
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
import { TempData } from "../store/temp";
import { canvasContainer } from "../store/editor";

import 'https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.min.js';
const IsProTag = defineAsyncComponent(() =>
  import("../components/Tags/IsPro.vue")
);
import {
  ArrowPathIcon,
  ClockIcon,
  CloudArrowDownIcon,
  FilmIcon,
  XCircleIcon,
  GifIcon,
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
    GifIcon,
  },
  data() {
    return {
      stats,
      TempData,
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
      downloadType: 'video',
      gifQuality: 'high',
      renderingStatus: '',
      renderProgress: 0,
    };
  },
  methods: {
    exportAsVideo() {
      if (this.appMode === "noAuth" && this.isPro("yes")) {
        return alert("Pro version required");
      }
      this.downloadType = 'video';
      this.exportSettings = true;
    },
    exportVid(blob) {
      const filename = "video.mp4";
      this.downloadLink = URL.createObjectURL(blob);

      // Update the download link to use .mp4 extension
      const downloadLink = document.querySelector('a[download="myvideo.webm"]');
      if (downloadLink) {
        downloadLink.setAttribute("download", filename);
      }
    },
    render() {
      if (this.downloadType === 'GIF') {
        this.renderGif();
      } else {
        // Existing video render code
        this.renderVideo();
      }
    },
    // Rename existing render method to renderVideo
    renderVideo() {
      const mimeTypes = [
        "video/mp4;codecs=h264,aac",
        "video/mp4",
        "video/webm;codecs=h264,opus",
        "video/webm;codecs=vp8,opus",
      ];

      let selectedMimeType = null;
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      if (!selectedMimeType) {
        alert("Your browser does not support video recording");
        return;
      }

      this.downloadLink = null;
      this.rendering = true;
      this.renderingStatus = 'Preparing video capture...';
      this.renderProgress = 0;

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
              this.renderingStatus = 'Setting up audio...';
              this.editor.medias.forEach((media) => {
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
              console.warn("Audio setup failed:", err);
            }
          }

          let startTime = Date.now();
          const totalDuration = this.duration * 1000;

          // Update progress every 100ms
          const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            this.renderProgress = Math.min(elapsed / totalDuration, 0.99);
            this.renderingStatus = `Recording video... ${Math.round(this.renderProgress * 100)}%`;
          }, 100);

          rec.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          rec.onstop = () => {
            clearInterval(progressInterval);
            if (chunks.length > 0) {
              this.renderingStatus = 'Finalizing video...';
              this.renderProgress = 1;
              
              const blob = new Blob(chunks, {
                type: selectedMimeType.split(";")[0],
              });
              this.exportVid(blob);
            } else {
              this.rendering = false;
              this.renderingStatus = '';
              this.renderProgress = 0;
              console.error("No data was recorded");
            }
          };

          rec.onerror = (err) => {
            clearInterval(progressInterval);
            this.rendering = false;
            this.renderingStatus = '';
            this.renderProgress = 0;
            console.error("Recording error:", err);
          };

          this.renderingStatus = 'Starting video capture...';
          rec.start(100);

          setTimeout(() => {
            rec.stop();
            this.rendering = false;
            this.renderingStatus = '';
            this.renderProgress = 0;
          }, this.duration * 1000);
        })
        .catch((err) => {
          this.rendering = false;
          this.renderingStatus = '';
          this.renderProgress = 0;
          console.error("Canvas setup failed:", err);
        });
    },
    async loadGifWorker() {
      try {
        const response = await fetch('gif.worker.js');
        if (!response.ok) {
          throw new Error('Failed to load GIF worker script');
        }
        return true;
      } catch (err) {
        console.error('Error loading GIF worker:', err);
        return false;
      }
    },
    async renderGif() {
      this.rendering = true;
      this.renderingStatus = 'Loading GIF encoder...';
      this.renderProgress = 0;

      // Check if worker is available first
      const workerLoaded = await this.loadGifWorker();
      if (!workerLoaded) {
        this.rendering = false;
        this.renderingStatus = '';
        alert('Failed to load GIF encoder. Please refresh the page and try again.');
        return;
      }

      this.renderingStatus = 'Preparing to capture frames...';
      
      // Create a cleanup function
      const cleanup = () => {
        this.rendering = false;
        this.renderingStatus = '';
        this.renderProgress = 0;
        if (this.editor && this.editor.resetAnimation) {
          this.editor.resetAnimation();
        }
      };

      // Reset animation state first
      this.replay();

      // Wait a bit for the animation to start
      setTimeout(() => {
        try {
          const sourceCanvas = this.editor.layer.getNativeCanvasElement();
          if (!sourceCanvas) {
            throw new Error('Source canvas not found');
          }

          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d', {
            willReadFrequently: true,
            alpha: true
          });
          
          const actualWidth = sourceCanvas.width;
          const actualHeight = sourceCanvas.height;
          
          // Validate dimensions
          if (actualWidth <= 0 || actualHeight <= 0) {
            throw new Error('Invalid canvas dimensions');
          }

          tempCanvas.width = actualWidth;
          tempCanvas.height = actualHeight;

          // Set quality-dependent settings
          const qualitySettings = {
            high: {
              quality: 1,
              dither: false,
              sample: 1,
              fps: 30
            },
            medium: {
              quality: 5,
              dither: 'FloydSteinberg',
              sample: 2,
              fps: 30
            },
            low: {
              quality: 10,
              dither: 'FloydSteinberg',
              sample: 3,
              fps: 30
            }
          };

          const settings = qualitySettings[this.gifQuality];
          const fps = settings.fps;
          const duration = 5; // 5 seconds duration
          const totalFrames = duration * fps;
          const frameDelay = 1000 / fps;
          

          const gif = new GIF({
            workers: 4, // Reduced from 8 to prevent memory issues
            width: actualWidth,
            height: actualHeight,
            workerScript: 'gif.worker.js',
            quality: settings.quality,
            dither: settings.dither,
            sample: settings.sample,
            repeat: 0,
            transparent: 'rgba(0,0,0,0)',
            background: null,
            debug: true
          });

          let frameCount = 0;
          let isRendering = true;

          // Add error handler for GIF encoder
          gif.on('abort', (err) => {
            console.error('GIF encoding aborted:', err);
            cleanup();
            alert('GIF generation failed. Please try again with lower quality settings.');
          });

          const captureFrame = () => {
            if (!isRendering || frameCount >= totalFrames) {
              this.renderingStatus = 'Generating GIF...';
              gif.render();
              return;
            }

            try {
              // Calculate current animation time
              const currentTime = (frameCount / fps);
              
              // Update animation if possible
              if (this.editor.setAnimationProgress) {
                this.editor.setAnimationProgress(currentTime);
              }

              // Capture frame
              tempCtx.clearRect(0, 0, actualWidth, actualHeight);
              tempCtx.drawImage(sourceCanvas, 0, 0);

              gif.addFrame(tempCanvas, {
                delay: frameDelay,
                copy: true,
                dispose: 1
              });

              frameCount++;
              this.renderProgress = frameCount / totalFrames * 0.5;
              this.renderingStatus = `Capturing frame ${frameCount}/${totalFrames}`;
              
              // Use setTimeout instead of requestAnimationFrame for more controlled timing
              setTimeout(captureFrame, frameDelay);
            } catch (err) {
              console.error('Frame capture error:', err);
              isRendering = false;
              cleanup();
              alert('Error during frame capture. Please try again.');
            }
          };

          gif.on('progress', (p) => {
            this.renderProgress = 0.5 + (p * 0.5);
            this.renderingStatus = `Encoding GIF: ${Math.round(p * 100)}%`;
          });

          gif.on('finished', (blob) => {
            this.downloadLink = URL.createObjectURL(blob);
            this.downloadType = 'GIF';
            cleanup();
          });

          // Start capturing frames
          captureFrame();

        } catch (err) {
          console.error('GIF initialization error:', err);
          cleanup();
          alert('Failed to initialize GIF encoder. Please try again with lower quality settings.');
        }
      }, 1000);
    },
    closeModal() {
      this.editor.clearIntervals();
      stats.showPreviewModal = false;
      this.editor.clearAll();
      this.editor = null;
      document.getElementById("previewCanvas").innerHTML = "";
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
          document.getElementById("previewCanvas").innerHTML = "";
          this.editor.clearAll();
        }

        const editor = new Editor(config);
        this.editor = editor;
        editor.readOnly = true;
        this.canvas = editor;
        window.preview = editor;

        try {
          editor.fitIntoContainer();
        } catch (e) {}
        window.addEventListener("resize", function () {
          try {
            editor.fitIntoContainer();
          } catch (e) {}
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
        } catch (e) {
          reject();
        }
      });
    },
    exportAsGif() {
      this.downloadType = 'GIF';
      this.exportSettings = true;
    },
  },
  mounted() {
    // Preload the GIF worker script
    this.loadGifWorker().then(loaded => {
      if (!loaded) {
        console.error('Failed to preload GIF worker script');
      }
    });

    fetch('gif.worker.js')
      .then(response => {
        if (!response.ok) {
          console.error('gif.worker.js not found in public directory');
        }
      })
      .catch(err => {
        console.error('Failed to check gif.worker.js:', err);
      });

    setTimeout(() => {
      if (!TempData.templateType.includes("banner")) {
        this.showHeaderOptions = true;
      }
    }, 200);
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

