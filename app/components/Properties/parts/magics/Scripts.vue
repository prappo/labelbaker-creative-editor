<template>
  <div class="py-5">
    <div class="flex justify-between items-center mb-2">
      Scripts
      <button class="bg-blue-500 px-2 py-1 rounded-md text-white" @click="stats.showInstallScriptModal = true">
        Add Script
      </button>
    </div>
    <div v-if="canvasScripts" class="flex flex-col gap-3">
      <div v-for="(s, i) in canvasScripts" :key="i" class="border-pink-500 border-2 rounded-md">
        <div class=" px-1 py-1 flex justify-between items-center">
          <div @click="toggle(i)" class="cursor-pointer">{{ s.name }} ({{ i }})</div>
          <div class="flex gap-2">
            <PencilIcon @click="editScript(i)" class="w-4 cursor-pointer" />
            <TrashIcon @click="deleteScript(i)" class="w-4 cursor-pointer" />
          </div>
        </div>
        <div v-if="showScriptsIndexes.includes(i)" class="p-2">
          <p v-if="s.description" class="pb-2">{{ s?.description }}</p>
          <div class="flex flex-col gap-2" v-for="(f, j) in s.fields" :key="j">
            <!-- Text field -->
            <div v-if="f.type === 'text'">
              <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ f.label }}</label>
              <input @input="(event) => changeValue(s, i, j, f, event.target.value)" :value="f.value" type="text" :id="id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <!-- Color field -->
            <div v-if="f.type === 'color'">
              <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ f.label }}</label>
              <input @input="(event) => changeValue(s, i, j, f, event.target.value)" :value="f.value" type="color"
                :id="id" />
            </div>

            <!-- Number field -->
            <div class="pb-4" v-if="f.type === 'number'">
              <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ f.label }}</label>
              <input @input="(event) => changeValue(s, i, j, f, event.target.value)" :value="f.value" type="number"
                :id="id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <!-- Select field -->
            <div v-if="f.type === 'select'">
              <label :for="f.id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ f.label
              }}</label>
              <select v-if="f.data" @change="(event) => changeValue(s, i, j, f, event.target.value)">
                <option v-for="(d,di) in f.data" :value="d.key" :key="di">{{ d.value }}</option>

              </select>

              <select v-else @change="(event) => changeValue(s, i, j, f, event.target.value)" :id="f.id"
                class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>--None--</option>
                <option class="dark:text-white" v-for="(k, idx) in getElements(f?.kind ?? null)"
                  :selected="isSelected(k.attrs.name, f.value)" :key="idx">
                  {{ k.attrs.name }}
                </option>
              </select>
            </div>

            <!-- Date field -->
            <div v-if="f.type === 'date'">
              <label :for="f.id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ f.label
              }}</label>
              <input :value="f.value" type="date" @change="(event) => changeValue(s, i, j, f, event.target.value)"
                :id="f.id"
                class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { canvasContainer } from "../../../../store/editor";
import { stats } from "../../../../store/stats";
import { TempData } from "../../../../store/temp";
import { countdown } from "../../../../libs/scripts";
import { installScript } from "../../../../libs/helper";
export default {
  data() {
    return {
      canvasContainer,
      canvasScripts: [],
      stats,
      TempData,
      showScriptsIndexes: [],
    };
  },
  components: { TrashIcon, PencilIcon },
  methods: {
    installScirptToCanvas() {
      installScript(countdown);
      this.getScripts();
     
    },
    changeValue(s, i, j, f, value) {
   
   
      this.canvasContainer.editor.editor.attrs.scripts[i].fields[j].value = value;

    },
    isSelected(fieldValue, savedValue) {
      return fieldValue === savedValue;
    },
    getElements(type) {
      if (type) {
        return canvasContainer.editor.editor.find(type);
      }
      return this.getAllElements();
    },
    getAllElements() {
      return canvasContainer.editor.editor.children[3].children;
    },
    deleteScript(i) {
     
      this.canvasContainer.editor.editor.attrs.scripts.splice(i, 1);
      this.getScripts();
    },
    editScript(i) {
      if(this.isPro('yes')){
        alert('Required Pro Version');
        return;
      }
      const cScript = this.canvasContainer.editor.editor.attrs.scripts[i];

      const lScript = `labelbakerScript = {
                id: "${cScript.id}",
                name: "${cScript.name}",
                description: "${cScript?.description ?? ""}",
                fields: ${JSON.stringify(cScript.fields)},
                run() {
                    ${cScript.code}
                }
            }`;
      TempData.scriptIndex = i;
      TempData.code = lScript;

      stats.showCodeModal = true;
    },
    getScripts() {
      this.canvasScripts = canvasContainer.editor.editor.getAttr("scripts");
    },
    toggle(index) {
      const removeElementFromArray = (arr, element) => {
        const index = arr.indexOf(element);

        if (index !== -1) {
          arr.splice(index, 1);
        }
      };

      if (this.showScriptsIndexes.includes(index)) {
        removeElementFromArray(this.showScriptsIndexes, index);
      } else {
        this.showScriptsIndexes.push(index);
      }
    },
  },
  mounted() {
    this.getScripts();

  },
};
</script>