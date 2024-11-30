<template>
  <div>
    <vue-final-modal v-model="stats.showCodeModal" style="z-index: 9999999" classes="modal-container"
      content-class="modal-content" @keydown.esc="stats.showCodeModal = false">
      <div style="height: 100vh" class="flex justify-center items-center h-full w-full">
        <div class="w-full flex justify-center">
          <div class="relative w-full max-w-3xl h-6xl">
            <!-- Modal content -->
            <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" @click="stats.showCodeModal = !stats.showCodeModal"
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
              <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                  Code Editor
                </h3>
              </div>
              <!-- Modal body -->
              <div class="p-6">
                <div style="height: 500px" class="w-full" id="labelbaker-code-editor"></div>

                <button @click="saveCode" type="button"
                  class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Done
                </button>
                <button @click="addAsScript" type="button"
                  class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Add as script
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
import { installScript, showSuccess } from "../../libs/helper";
import { TempData } from "../../store/temp";
export default {
  data() {
    return {
      stats,
      TempData,
      canvasContainer,
      code: "console.log('hello labelbaker')",
      editor: null,
      scriptIndex: null,
      editScript: null,
    };
  },
  components: { VueFinalModal, ModalsContainer },
  methods: {
    saveCode() {
      stats.showCodeModal = false;
      window.labelbakerScript = "";
      if (this.editScript && TempData.scriptIndex != null) {
        eval(window.codeEditor.getValue());
        const script = window.labelbakerScript;
  
        const convertedScript = { ...script };
        convertedScript.code = convertedScript.run.toString();

        // Remove 'run()'
        let code = convertedScript.code.replace("run()", "").trim();

        // Remove '{' and '}'
        code = code.slice(1, -1).trim();

        convertedScript.code = code;
        canvasContainer.editor.editor.attrs.scripts[this.scriptIndex] =
          convertedScript;
        showSuccess("Script Updated");
      } else {
        canvasContainer.editor.editor.setAttrs({
          code: window.codeEditor.getValue(),
        });
        showSuccess("Code applied");
      }
    },
    addAsScript() {
      window.labelbakerScript = "";
      console.log(canvasContainer.editor.editor.getAttr("scripts"));
     
      eval(window.codeEditor.getValue());
      const script = window.labelbakerScript;

      installScript(script)

    
    },
    initMonacoEditor() {
      return new Promise((resolve, reject) => {
        require.config({
          paths: {
            vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs",
          },
        });

        setTimeout(() => {
          require(["vs/editor/editor.main"], () => {
            var editor = monaco.editor.create(
              document.getElementById("labelbaker-code-editor"),
              {
                value: "",
                language: "javascript",
                theme: "vs-light",
                minimap: {
                  enabled: false
                }
              }
            );

            // suggestion

            resolve(editor);
          });
        }, 200);
      });
    },
  },
  mounted() {
    this.initMonacoEditor().then((e) => {
      window.codeEditor = e;
      // setTimeout(() => {
      if (TempData.code && TempData.scriptIndex != null) {
        this.editScript = true;
        this.scriptIndex = TempData.scriptIndex;
        window.codeEditor.setValue(TempData.code);
        this.code = TempData.code;
        setTimeout(() => {
          TempData.code = null;
        }, 200);
      } else {
        if (canvasContainer.editor?.editor.getAttr("code")) {
          window.codeEditor.setValue(
            canvasContainer.editor.editor.getAttr("code")
          );

          this.code = canvasContainer.editor.editor.getAttr("code");
        }
      }

      var formatDocument = e.getAction('editor.action.formatDocument');
      formatDocument.run().then(null, function (err) {
        console.error('Error formatting the document:', err);
      });
    });

    // }, 500);
  },
};
</script>
