<template>
  <button
    type="button"
    @click="stats.showSearchModal = true"
    class="
      hidden
      sm:flex
      items-center
      text-left
      space-x-2
      px-2
      h-8
      bg-white
      ring-1 ring-slate-900/10
      hover:ring-slate-300
      focus:outline-none focus:ring-2 focus:ring-blue-500
      shadow-sm
      rounded-lg
      text-slate-400
      dark:bg-slate-800
      dark:ring-0
      dark:text-slate-300
      dark:highlight-white/5
      dark:hover:bg-slate-700
    "
  >
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="flex-none text-slate-300 dark:text-slate-400"
      aria-hidden="true"
    >
      <path d="m19 19-3.5-3.5"></path>
      <circle cx="11" cy="11" r="6"></circle></svg
    ><span class="flex-auto">Search...</span
    ><kbd class="font-sans font-semibold dark:text-slate-500"
      ><abbr
        title="Control"
        class="no-underline text-slate-300 dark:text-slate-500"
        >⌘
      </abbr>
      K</kbd
    >
  </button>
</template>

<script>

import { stats } from "../../../store/stats";

export default {

  data() {
    return {
      stats,
    };
  },

  mounted(){
    this._keyListener = function (e) {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); 
        stats.showSearchModal = true
      }
    }

    document.addEventListener("keydown", this._keyListener.bind(this));
  }
};
</script>

