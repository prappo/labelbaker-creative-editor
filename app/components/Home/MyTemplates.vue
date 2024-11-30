<template>
  <div class="px-10 py-10">
    <div v-if="myTemplates" class="grid grid-cols-6 gap-4 w-full">
      <div
        v-for="(data, index) in myTemplates"
        @click="showDetails(data)"
        :key="index"
        class="
          bg-white
          p-3
          w-full
          flex flex-col
          justify-between
          rounded-md
          dark:bg-gray-800
          shadow
          cursor-pointer
          hover:ring-2 hover:ring-blue-500 hover:shadow-lg
        "
      >
        <div
          class="
            flex
            xl:flex-row
            flex-col
            items-center
            font-medium
            text-gray-900
            dark:text-white
            pb-2
            mb-2
            h-full
            border-gray-200 border-opacity-75
            dark:border-gray-700
            w-full
          "
        >
          <img :src="data.preview" class="w-full mr-2 dark:bg-white" />
        </div>

        <div class="flex items-center w-full">
          <div
            v-if="data.name"
            class="
              text-xs
              py-1
              px-2
              leading-none
              dark:bg-gray-900
              bg-blue-100
              text-blue-500
              rounded-md
            "
          >
            {{ data.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingVue text="Loading My Templates, Please wait...." />
    </div>

    <vue-final-modal
      @keydown.esc="modalVisiblity = false"
      v-if="selected"
      v-model="modalVisiblity"
      style="z-index: 9999999"
      classes="modal-container"
      content-class="modal-content"
    >
      <div
        style="height: 100vh"
        class="flex justify-center items-center h-full w-full"
      >
        <div
          class="
            bg-white
            dark:bg-gray-800
            flex
            w-2/3
            h-2/3
            rounded
            shadow-lg
            px-2
            py-2
          "
        >
          <div class="w-full mr-2 dark:bg-white items-center flex">
            <img
              style="max-width: 100%; max-height: 100%"
              :src="getPreview()"
            />
          </div>
          <div class="w-full flex flex-col justify-between">
            <div
              class="
                py-10
                pr-10
                flex flex-col
                justify-between
                border-2
                rounded
                mx-2
                my-5
                px-2
                h-full
              "
            >
              <div class="flex items-center justify-between">
                <button
                  class="
                    bg-green-500
                    text-white
                    rounded
                    shadow
                    px-4
                    font-semibold
                    py-1
                  "
                  @click="useIt(selected)"
                >
                  Use it
                </button>

                <button
                  class="
                    flex
                    bg-red-500
                    text-white
                    px-3
                    py-1
                    rounded
                    gap-1
                    shadow
                  "
                  @click="deleteTemplate"
                  v-if="selected.category"
                >
                  Delete
                </button>
                <button
                  class="
                    bg-yellow-500
                    text-white
                    rounded
                    shadow
                    px-4
                    font-semibold
                    py-1
                  "
                  @click="selected = null"
                >
                  Cancel
                </button>
              </div>
              <div class="flex flex-col flex-grow gap-2 items-center pb-5">
                <h1
                  class="
                    font-bold
                    bg-gray-200
                    w-full
                    text-center
                    dark:text-gray-700
                    my-2
                    rounded
                    py-1
                  "
                >
                  Template details
                </h1>
              
                <table
                  class="
                    w-full
                    text-lg text-left text-gray-500
                    dark:text-gray-400
                  "
                 
                >
                  <tr
                    class="
                      bg-white
                      border-b
                      dark:bg-gray-800 dark:border-gray-700
                    "
                  >
                    <td>Labels size</td>
                    <td>
                      {{ selected.props.cellWidth }} x
                      {{ selected.props.cellHeight }}
                    </td>
                  </tr>

                  <tr
                    class="
                      bg-white
                      border-b
                      dark:bg-gray-800 dark:border-gray-700
                    "
                  >
                    <td>Label padding left</td>
                    <td>{{ selected.props.cellPaddingLeft }}</td>
                  </tr>

                  <tr
                    class="
                      bg-white
                      border-b
                      dark:bg-gray-800 dark:border-gray-700
                    "
                  >
                    <td>Label padding Top</td>
                    <td>{{ selected.props.cellPaddingTop }}</td>
                  </tr>

                  <tr
                    class="
                      bg-white
                      border-b
                      dark:bg-gray-800 dark:border-gray-700
                    "
                  >
                    <td>Layout / page size</td>
                    <td>
                      {{ selected.props.pageWidth }} x
                      {{ selected.props.pageHeight }}
                    </td>
                  </tr>

                  <tr
                    class="
                      bg-white
                      border-b
                      dark:bg-gray-800 dark:border-gray-700
                    "
                  >
                    <td>Layout / page margin left</td>
                    <td>{{ selected.props.pageMarginLeft }}</td>
                  </tr>

                  <tr
                    class="
                      bg-white
                      border-b
                      dark:bg-gray-800 dark:border-gray-700
                    "
                  >
                    <td>Layout / page margin left</td>
                    <td>{{ selected.props.pageMarginRight }}</td>
                  </tr>
                </table>
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
import LoadingVue from "../Loading.vue";
import { canvasContainer } from "../../store/editor";
import { store } from "../../store/menu";
import { userData } from "../../store/user";


export default {
  components: { VueFinalModal, ModalsContainer, LoadingVue },
  data() {
    return {
      userData,
      selected: null,
      modalVisiblity: false,
      canvasContainer,
      store,
      apiEndpoint: this.appConfig["data-api-endpoint"],
      layoutData: null,
      shippingTemplateData: null,
      cardTemplateData: null,
      myTemplates: null,
    };
  },

  methods: {
    showDetails: function (data) {
      this.modalVisiblity = true;
      this.selected = data;
    },

    deleteTemplate() {
     
    },

    getPreview() {
     
        return this.selected.preview;
    
    },

    rulerControl: function () {
      if (this.canvasContainer.enableRuler) {
        this.canvasContainer.editor.enableRuler = true;
      } else {
        this.canvasContainer.editor.enableRuler = false;
      }
      this.canvasContainer.editor.ruler.addRuler();
    },

    gridControl: function () {
      if (this.canvasContainer.enableGrid) {
        this.canvasContainer.editor.enableGrid = true;
      } else {
        this.canvasContainer.editor.enableGrid = false;
      }
      this.canvasContainer.editor.grid.addGrid();
    },

    useIt: function (data) {
     
        this.canvasContainer.editor.clearEditor();

        this.canvasContainer.editor.ImportData.source(this.selected.data);

        let s = this.selected.props;

        for (let index in s) {
          this.canvasContainer[index] = s[index];
        }

        this.canvasContainer.editor.editorWidth = parseInt(s.cellWidth);
        this.canvasContainer.editor.editorHeight = parseInt(s.cellHeight);

        store.activeMenu = "designer";
        store.activeTool = "shape";

        setTimeout(() => {
          this.canvasContainer.editor.transform.nodes([]);
          this.canvasContainer.editor.fitIntoContainer();
          this.canvasContainer.editor.fitIntoContainer();
          this.rulerControl();
          this.gridControl();
        }, 500);
        this.canvasContainer.editor.fitIntoContainer();
        this.modalVisiblity = false;
   
      this.rulerControl();
      this.gridControl();
    },

    inchToPx: function (inch) {
      return inch.replace('"', "") * 72;
    },
    getSize: function (data) {
      let s = data.split(" ");
      let width = s[0].replace('"', "");
      let height = s[2].replace('"', "");
      let result = {
        width: width,
        height: height,
      };

      return result;
    },

    getAssetsEndpoint() {
      return this.apiEndpoint + "/assets";
    },

    getShippingTemplateEndpoint() {
      return this.apiEndpoint + "/assets/editor/shipping.json";
    },
    getCardTemplateEndpoint() {
      return this.apiEndpoint + "/assets/editor/card.json";
    },

    getLayoutEndpoint() {
      return this.apiEndpoint + "/data/templates.json";
    },
    getMyTemplates() {
      let db = new DB();
      let myTemplates = [];
      db.getTemplates(userData.details).then((e) => {
        e.forEach((d) => {
          myTemplates.push(JSON.parse(d.data().data));
        });
        this.myTemplates = myTemplates;
      });
    },
  },

  mounted() {
    this.getMyTemplates();
  },
};
</script>
