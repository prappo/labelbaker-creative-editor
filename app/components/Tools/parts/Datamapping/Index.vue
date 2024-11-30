<template>
  <div class="flex flex-col gap-5 relative">
    <div
      class="flex flex-col gap-5 border rounded px-2 py-2 shadow-lg"
      v-if="container.editor.layer.children"
    >
      <div @click="getMappedData" class="text-center">
        <div class="font-bold">{{ $t("sidebar.dataMapping.text") }}</div>
        <button @click="clearMappedData">{{  $t('sidebar.mapping.clearMappedData') }}</button>
      </div>

      <div
        class="
          w-full
          border-gray-400
          rounded
          shadow-md
          px-2
          py-2
          cursor-pointer
          hover:border-blue-400
        "
        @click="selectElementOnEditor(element)"
        :class="{ 'bg-gray-400 text-white': isElementSelected(element) }"
        v-for="(element, index) in filterList(
          container.editor.layer.children
        )"
        :key="index"
      >
        <div>
          <!-- <img :src="element.toDataURL()" /> -->
          <h2 class="py-1">{{ element.name() }}</h2>
        </div>

        <select
          @change="setMappedData($event, element.name())"
          v-if="container.sheetData"
          class="
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
          "
        >
          <option value="none">None</option>
          <template
            v-for="(column, index) in container.sheetData[0]"
            :key="index"
          >
            <option
              :selected="isSelected(element.name(), index)"
              :value="index"
              v-if="typeof column !== 'object'"
            >
              {{
                typeof index === "number"
                  ? ""
                  : index.replace("_", " ").replace("_", " ") + ": "
              }}
              {{ column }}
            </option>
          </template>
        </select>
      </div>
    </div>
  </div>
</template>

<script>

import change from "../../../../../libs/change";
import { canvasContainer } from "../../../../store/editor";
export default {
  props:['container'],
  data() {
    return {
      selected: null,
      // sheetData: this.getData(),
      mappedData: [],
      canvasContainer,
    };
  },
  methods: {
    getData(){
      if(this.container.sheetData){
        return this.container.sheetData;
      }
      
      return this.canvasContainer.sheetData;
    },
    upsert(array, element) {
      const i = array.findIndex(
        (_element) => _element.elName === element.elName
      );
      if (i > -1) array[i] = element;
      else array.push(element);
    },
    setMappedData: function (event, el_ID) {
      this.upsert(this.container.mappedData, {
        elName: el_ID,
        dataID: event.target.value,
      });
      if (this.selected.attrs.type) {
        var type = this.selected.attrs.type;
        var value = this.container.sheetData[0][event.target.value];
        if (type === "text") {
          change.changeText(this.selected, value);
         
        }

        if (type === "barcodeBasic") {
          change.changeBarcodeBasic(this.selected, value);
        }

        if (type === "barcode") {
          change.changeBarcode(this.selected, value);
        }

        if (type === "qrcode") {
          change.changeQrCode(this.selected, value);
        }

        if (type === "image") {
          change.changeImage(this.selected, value);
        }
      }
    },

    isSelected: function (elName, dataID) {
      let result = false;
      this.container.mappedData.forEach((item) => {
        if (item.dataID == dataID && item.elName == elName) {
          result = true;
        }
      });

      return result;
    },
    getMappedData: function () {
     
    },
    mapData: function (column, index, elID) {
      let data = {
        el: elID,
        dataId: index,
      };

      this.mappedData.push(data);
      return column;
    },
    showData: function (data) {
      var jsonData = XLSX.utils.sheet_to_json(data, { header: 1 });
      return jsonData[0];
    },
    filterList: function (elList) {
    
      return elList.filter(
        (el) =>
          el.getClassName() !== "Transformer" &&
          el.getClassName() !== "Rect" &&
          el.getClassName() !== "Line" &&
          el.getClassName() !== "RegularPolygon" &&
          el.getClassName() !== "RegularPolygon" &&
          el.getClassName() !== "Circle" &&
          el.getClassName() !== "Star" &&
          el.getClassName() !== "Arc" &&
          el.getClassName() !== "Ellipse"
      );
    },
    selectElementOnEditor: function (el) {
      this.container.editor.mark(el)
      // this.container.editor.transform.nodes([el]);
      this.container.editor.transform.nodes([]);
      this.selected = el;
      this.container.editor.selected = el;
      this.container.editor.selectEvent.data = el;
      document.dispatchEvent(this.container.editor.selectEvent);
    },
    isElementSelected: function (el) {
      if (!this.container.editor.selected) {
        return false;
      }
      if (this.container.editor.transform.nodes().includes(el)) {
        return true;
      } else {
        return false;
      }
    },

    clearMappedData() {
      this.container.mappedData.length = 0;
    },
  },
  mounted(){
    if(!this.container.sheetData){
      this.container.sheetData = this.canvasContainer.sheetData;
    }
    
  }
};
</script>