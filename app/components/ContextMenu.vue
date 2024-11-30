<template>
  <div v-if="canvasContainer.editor">
    <div id="context-menu" style="display: none" class="
        absolute
        z-50
        w-44
        bg-white
        rounded
        divide-y divide-gray-100
        shadow
        dark:bg-gray-700 dark:divide-gray-600
        backdrop-blur-sm
        bg-slate-50/90
      ">
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
        <li>
          <div @click="editor.deleteSelected()" class="
              block
              py-2
              px-4
              cursor-pointer
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">{{ $t('context.delete') }}</div>
        </li>
        <li>
          <div @click="editor.duplicateSelected()" class="
              block
              py-2
              px-4
              cursor-pointer
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">{{ $t('context.duplicate') }}</div>
        </li>
        <li>
          <div @click="editor.copyStyle()" class="
              block
              py-2
              px-4
              cursor-pointer
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">{{ $t('context.copyStyle') }}</div>
        </li>

        <li v-if="editor.copiedStyle && editor.selected">
          <div @click="editor.pasteStyle()" class="
              block
              py-2
              px-4
              cursor-pointer
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">{{ $t('context.pasteStyle') }}</div>
        </li>

        <li>
          <div @click="editor.groupSelected()" class="
              block
              py-2
              px-4
              hover:bg-gray-100
              cursor-pointer
              dark:hover:bg-gray-600 dark:hover:text-white
            ">{{ $t('context.group') }}</div>
        </li>
        <li>
          <div @click="editor.lockUnlock()" class="
              block
              py-2
              px-4
              cursor-pointer
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">
            <div class="flex gap-2">
              <span v-if="editor.isLocked()">{{ $t('context.unlock') }}</span><span v-else>{{ $t('context.lock') }}</span>
              <span>{{ $t('context.movement') }}</span>
            </div>
          </div>
        </li>

        <li>
          <div @click="editor.moveUp()" class="
              block
              py-2
              px-4
              cursor-pointer
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">
            <div class="flex gap-2">{{ $t('context.moveUp') }}</div>
        </div>
        </li>
        <li>
          <div @click="editor.moveDown()" class="
              block
              py-2
              px-4
              cursor-pointer
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">
            <div class="flex gap-2">{{ $t('context.moveDown') }}</div>
        </div>
        </li>

        <li>
          <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start"
            type="button" class="
              flex
              justify-between
              items-center
              py-2
              px-4
              w-full
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">
            {{ $t('context.exportAs') }}<svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <div id="doubleDropdown" class="
              hidden
              z-10
              w-44
              bg-white
              rounded
              divide-y divide-gray-100
              shadow
              dark:bg-gray-700
              backdrop-blur-sm
              bg-slate-50/90
            ">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <div @click="downloadAsImage" class="
                    block
                    py-2
                    px-4
                    cursor-pointer
                    hover:bg-gray-100
                    dark:hover:bg-gray-600 dark:hover:text-white
                  ">{{ $t('context.image') }}</div>
              </li>
             
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { canvasContainer } from "../store/editor";
import { initDropdowns } from 'flowbite';
export default {
  props: ["editor"],
  data() {
    return {
      canvasContainer,
    };
  },

  methods: {
    downloadAsImage: function () {
      if (canvasContainer.editor.selected === null) {
        alert("You can't download multiple element at the same time");
        return;
      }
      this.downloadURI(
        canvasContainer.editor.selected.toDataURL(),
        "element.png"
      );
    },

    downloadAsJSON: function () {
      this.downloadURI(
        canvasContainer.editor.selected.toJSON(),
        "element.json"
      );
    },
    downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    boot() {
      setTimeout(() => {
        let stage = canvasContainer.editor.editor;

        // context menu
        let currentShape;
        var menuNode = document.getElementById("context-menu");

        window.addEventListener("click", (e) => {
          // hide menu
          if (
            e.target.getAttribute("data-dropdown-toggle") !== "doubleDropdown"
          ) {
            menuNode.style.display = "none";
          }
        });

        stage.on("contextmenu", function (e) {
          // prevent default behavior
          e.evt.preventDefault();

          if (e.target.getClassName() === "Stage") {
            // if we are on empty place of the stage we will do nothing
            return;
          }

          if (e.target.name() === "stageBackground") {
            // if we are on empty place of the stage we will do nothing
            return;
          }
          if (e.target.getClassName() === "Shape") {
            // if we are on empty place of the stage we will do nothing

            currentShape = canvasContainer.editor.selected;
          } else {
            currentShape = e.target;
          }

          // show menu
          menuNode.style.display = "initial";
          var containerRect = stage.container().getBoundingClientRect();
          menuNode.style.top =
            containerRect.top + stage.getPointerPosition().y + 4 + "px";
          menuNode.style.left =
            containerRect.left + stage.getPointerPosition().x + 4 + "px";
        });
      }, 500);
    },
  },
  mounted() {
    this.boot();
    initDropdowns();
  },
};
</script>