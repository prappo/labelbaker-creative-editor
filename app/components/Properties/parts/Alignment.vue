<template>
  <div>
    <div class="mx-2 grid grid-cols-3 md:flex justify-center items-center" v-if="selected">
      <button class="hover:bg-gray-300 dark:hover:bg-gray-600 rounded px-2 py-2" @click="alignLeft">
        <svg
          data-icon="alignment-left"
          class="w-3 h-3 fill-gray-700 dark:fill-gray-300"
          viewBox="0 0 16 16"
          role="img"
        >
          <path
            d="M9 9H5c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zM1 0C.45 0 0 .45 0 1v14c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1zm13 2H5c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>

      <button
      class="hover:bg-gray-300 dark:hover:bg-gray-600 rounded px-2 py-2"
        @click="alignVerticalCenter"
      >
        <svg
          data-icon="alignment-vertical-center"
          class="w-3 h-3 fill-gray-700 dark:fill-gray-300"
          viewBox="0 0 16 16"
          role="img"
        >
          <path
            d="M13 2H9V1c0-.55-.45-1-1-1S7 .45 7 1v1H3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4v2H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1c0 .55.45 1 1 1s1-.45 1-1v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1H9V7h4c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button class="hover:bg-gray-300 dark:hover:bg-gray-600 rounded px-2 py-2" @click="alignRight">
        <svg
          data-icon="alignment-right"
          class="w-3 h-3 fill-gray-700 dark:fill-gray-300"
          viewBox="0 0 16 16"
          role="img"
        >
          <path
            d="M11 9H7c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm4-9c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1zm-4 2H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button class="hover:bg-gray-300 dark:hover:bg-gray-600 rounded px-2 py-2" @click="alignTop">
        <svg
          data-icon="alignment-top"
          class="w-3 h-3 fill-gray-700 dark:fill-gray-300"
          viewBox="0 0 16 16"
          role="img"
        >
          <path
            d="M15 0H1C.45 0 0 .45 0 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zM6 4H3c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm7 0h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button
      class="hover:bg-gray-300 dark:hover:bg-gray-600 rounded px-2 py-2"
        @click="alignHorizontalCenter"
      >
        <svg
          data-icon="alignment-horizontal-center"
          class="w-3 h-3 fill-gray-700 dark:fill-gray-300"
          viewBox="0 0 16 16"
          role="img"
        >
          <path
            d="M15 7h-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v1H7V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v4H1c-.55 0-1 .45-1 1s.45 1 1 1h1v4c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9h2v1c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9h1c.55 0 1-.45 1-1s-.45-1-1-1z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button class="hover:bg-gray-300 dark:hover:bg-gray-600 rounded px-2 py-2" @click="alignBottom">
        <svg
          data-icon="alignment-bottom"
          class="w-3 h-3 fill-gray-700 dark:fill-gray-300"
          viewBox="0 0 16 16"
          role="img"
        >
          <path
            d="M10 12h3c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm5 2H1c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zM3 12h3c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["editor", "selected"],
  methods: {
    alignLeft() {
      let extra = 0;
      if (
        this.selected.attrs.type === "polygon" ||
        this.selected.attrs.type === "triangle" ||
        this.selected.attrs.type === "oval" ||
        this.selected.attrs.type === "star" ||
        this.selected.attrs.type === "circle" ||
        this.selected.attrs.type === "arc"
      ) {
        extra = this.selected.width() / 2;
      }
      this.editor.selected.x(0 + extra);
    },
    alignVerticalCenter() {
      let extra = 0;
      if (this.selected.attrs.type === "polygon" ||
        this.selected.attrs.type === "triangle" ||
        this.selected.attrs.type === "oval" ||
        this.selected.attrs.type === "star" ||
        this.selected.attrs.type === "circle" ||
        this.selected.attrs.type === "arc") {
        extra = this.selected.width() / 2;
      }
      this.editor.selected.x(
        this.editor.editorWidth / 2 - this.editor.selected.width() / 2 + extra
      );
    },
    alignRight() {
      let extra = 0;
      if (this.selected.attrs.type === "polygon" ||
        this.selected.attrs.type === "triangle" ||
        this.selected.attrs.type === "oval" ||
        this.selected.attrs.type === "star" ||
        this.selected.attrs.type === "circle" ||
        this.selected.attrs.type === "arc") {
        extra = this.selected.width() / 2;
      }

      this.editor.selected.x(
        this.editor.editorWidth - this.editor.selected.width() + extra
      );
    },

    alignTop() {
      let extra = 0;
      if (this.selected.attrs.type === "polygon" ||
        this.selected.attrs.type === "triangle" ||
        this.selected.attrs.type === "oval" ||
        this.selected.attrs.type === "star" ||
        this.selected.attrs.type === "circle" ||
        this.selected.attrs.type === "arc") {
        extra = this.selected.height() / 2;
      }

      editor.selected.y(0 + extra);
    },
    alignHorizontalCenter() {
      let extra = 0;
      if (this.selected.attrs.type === "polygon" ||
        this.selected.attrs.type === "triangle" ||
        this.selected.attrs.type === "oval" ||
        this.selected.attrs.type === "star" ||
        this.selected.attrs.type === "circle" ||
        this.selected.attrs.type === "arc") {
        extra = this.selected.height() / 2;
      }

      this.editor.selected.y(
        this.editor.editorHeight / 2 - this.editor.selected.height() / 2 + extra
      );
    },
    alignBottom() {
      let extra = 0;
      if (this.selected.attrs.type === "polygon" ||
        this.selected.attrs.type === "triangle" ||
        this.selected.attrs.type === "oval" ||
        this.selected.attrs.type === "star" ||
        this.selected.attrs.type === "circle" ||
        this.selected.attrs.type === "arc") {
        extra = this.selected.height() / 2;
      }
      this.editor.selected.y(
        (this.editor.editorHeight - this.editor.selected.height()) + extra
      );
    },
  },
};
</script>