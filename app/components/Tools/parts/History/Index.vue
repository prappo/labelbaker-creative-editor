<template>
  <div>
    <div v-if="history.length !== 0">
      <button class="pb-2" @click="canvasContainer.editor.History.clearHistory()">Clear history</button>
      <div class="flex flex-col gap-2 ">
        <div :class="{ 'bg-gray-100': canvasContainer.editor.History.step === i }"
          class="border-2 relative rounded px-1 py hover:border-blue-500 hover:shadow-md" style="font-size: 9px"
          v-for="(h, i) in history" :key="i">
          <div class="absolute top-0 right-0 flex gap-1 py-1 px-1">
            <button title="Apply again" @click="canvasContainer.editor.History.applyChange(i)">
              <CheckCircleIcon class="w-4 text-green-500" />
            </button>
            <button title="Revert" @click="canvasContainer.editor.History.applyChange(i, 'revert')">
              <ArrowUturnDownIcon class="w-4 text-gray-500" />
            </button>
            <button @click="canvasContainer.editor.History.delete(i)" title="Delete">
              <XCircleIcon class="w-4 text-red-500" />
            </button>
          </div>
          <div class="bg-blue-500 inline-block text-white rounded px-2 my-1">{{ h.item.name()}}</div>
          <!-- single data -->
          <div v-if="(typeof h.value === 'string')">
            <!-- {{ h.attr }} : {{ h.value }} : {{ h.previous }} -->
            <!-- if color -->
            <div v-if="h.attr === 'fill'">
              Color changed
              <div class="flex items-center gap-1">
                from <div :style="{ background: h.previous }" class="h-2 w-2 rounded-full"></div>
                to <div :style="{ background: h.value }" class="h-2 w-2 rounded-full"></div>
              </div>

            </div>

            <div v-else-if="h.attr === 'fontFamily'">
              Font changed
              <div class="flex items-center gap-1">
                from <div :style="{ fontFamily: h.previous }">{{ h.previous }}</div> to <div
                  :style="{ fontFamily: h.value }">
                  {{ h.value }}</div>
              </div>
            </div>

            <div v-else>
              {{ h.attr }} changed

            </div>
          </div>

          <!-- two dimentional data -->
          <div v-if="(typeof h.value === 'object')">
            <div v-if="h.attr.includes('x')">
              Position changed.
              <div>
                X from <b>{{ h.previous[0].toFixed(2) }}</b> to <b>{{ h.value[0].toFixed(2) }}</b> <br>
                Y from <b>{{ h.previous[1].toFixed(2) }}</b> to <b>{{ h.value[1].toFixed(2) }}</b>
              </div>
            </div>

          </div>


        </div>

      </div>
    </div>
    <div class="text-gray-500 text-center" v-else>{{ $t('sidebar.history.noHistoryFound') }}</div>
  </div>
</template>

<script>
import { canvasContainer } from "../../../../store/editor";
import { ArrowUturnDownIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/vue/20/solid";
export default {
  components: { ArrowUturnDownIcon, CheckCircleIcon, XCircleIcon },
  data() {
    return {
      canvasContainer,
      history: canvasContainer.editor.History.history,
    };
  },

  filters: {
    formatText: function (value) {
     
      let result = value;
      switch (value) {
        case 'fill':
          result = 'color';
          break;

      }

      return result;
    }
  }
};
</script>