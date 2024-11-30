<template>
  <div>
    <div
      class="text-center w-full text-gray-500"
      v-if="canvasContainer.editor.layer.children.length === 1"
    >
      {{ $t("sidebar.elements.noElementFound") }}
    </div>
    <div
      class="flex flex-col gap-2"
      v-if="canvasContainer.editor.layer.children.length > 1"
    >
      <h1 class="text-center">{{ $t("sidebar.elements.text") }}</h1>

      <div
        class="relative w-full border-gray-400 rounded shadow-md px-2 py-2 flex flex-col justify-between hover:border-blue-400"
        :class="{ 'bg-gray-400 text-white': isElementSelected(element) }"
        v-for="(element, index) in filterList(
          canvasContainer.editor.layer.children
        )
          .slice()
          .reverse()"
        :key="index"
      >
        <!-- single element -->
        <div class="flex w-full">
          <div
            @click="selectElementOnEditor(element)"
            @dblclick="nameFieldIndex[index] = true"
            class="py-1 w-full cursor-pointer"
            :class="{ 'text-white font-semibold': isElementSelected(element) }"
          >
            <div class="pr-2" v-if="nameFieldIndex[index]">
              <input
                :value="element.name()"
                @blur="nameFieldIndex[index] = false"
                v-on:keyup.enter="nameFieldIndex[index] = false"
                @keyup="(e) => element.name(e.target.value.replace(/\ /g, '_'))"
                @input="(e) => element.name(e.target.value.replace(/\ /g, '_'))"
                class="w-full"
                type="text"
              />
            </div>

            <div v-else>{{ element.name() }}</div>
          </div>

          <button @click="changeVisiblity(element)">
            <EyeIcon v-if="element.isVisible()" class="w-5 h-5" />
            <EyeSlashIcon v-if="!element.isVisible()" class="w-5 h-5" />
          </button>
        </div>

        <!-- group element -->
        <div
          class=""
          v-if="element.attrs.type === 'group' && element.children.length != 0"
        >
          <div
            class="flex justify-between"
            v-for="(subEl, i) in element.children"
            :key="i"
            @dblclick="nameFieldIndex['s'+i] = true"
            @click="selectElementOnEditor(subEl)"
          >
          <div class="pr-2" v-if="nameFieldIndex['s'+i]">
              <input
                :value="subEl.name()"
                @blur="nameFieldIndex['s'+i] = false"
                v-on:keyup.enter="nameFieldIndex['s'+i] = false"
                @keyup="(e) => subEl.name(e.target.value.replace(/\ /g, '_'))"
                @input="(e) => subEl.name(e.target.value.replace(/\ /g, '_'))"
                class="w-full"
                type="text"
              />
            </div>
            <div
            v-else
              :class="{
                'text-blue-500 font-semibold': isElementSelected(subEl),
              }"
              class="pl-2 flex justify-between cursor-pointer"
              
            >
              - {{ subEl.name() }}
            </div>
            <button @click="changeVisiblity(subEl)">
              <EyeIcon v-if="subEl.isVisible()" class="w-5 h-5" />
              <EyeSlashIcon v-if="!subEl.isVisible()" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- <div @click="selectElementOnEditor(element)" class="w-5 h-5 bg-blue-500 rounded-full absolute top-2 right-2 cursor-pointer"></div> -->
      </div>
    </div>
  </div>
</template>
  
  <script>
import { canvasContainer } from "../../../../store/editor";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
export default {
  components: { EyeIcon, EyeSlashIcon },
  data() {
    return {
      canvasContainer,
      selected: null,
      nameFieldIndex: [],
    };
  },
  methods: {
    filterList: function (elList) {
      return elList.filter(
        (el) =>
          el.getClassName() !== "Transformer" &&
          el.name() !== "guid-line" &&
          el.name() !== "anchor"
      );
    },
    selectElementOnEditor: function (el) {
      this.canvasContainer.editor.transform.nodes([el]);
      this.selected = el;

      this.canvasContainer.editor.selectItem(el);
    },
    isElementSelected: function (el) {
      if (!this.selected) {
        return false;
      }
      if (this.canvasContainer.editor.transform.nodes().includes(el)) {
        return true;
      } else {
        return false;
      }
    },
    changeVisiblity: function (element) {
      if (element.isVisible()) {
        element.hide();
      } else {
        element.show();
      }
    },
  },

  mounted() {
    this.selected = this.canvasContainer.editor.transform.nodes()[0];
    document.addEventListener("editor_selected_element", (e) => {
      if (e.data) {
        if (!e.data.hasOwnProperty("container")) {
          this.selected = e.data;
        }
      }
    });
  },
};
</script>
  