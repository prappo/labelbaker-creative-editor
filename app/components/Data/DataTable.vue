<template>
  <div>
    <button v-if="!hideButton" @click="showTable = !showTable" class="w-auto flex mb-4 gap-1 bg-blue-500 px-3 py-2 rounded-md text-white shadow-md"><div v-if="showTable">Hide</div><div v-else>Show</div> DataTable</button>
    <div v-if="showTable">
    <div v-if="getData()">
      <div
        class="
          flex flex-col
          md:flex-row
          items-center
          py-4
          rounded
          px-3
          shadow-sm
          justify-between
          gap-10
          mb-5
          sticky
          top-14
          z-10
          bg-slate-50/90
          dark:bg-slate-700/90
          backdrop-blur-sm
        "
      >
        <!-- Search bar -->
        <div class="w-full">
          <div class="relative">
            <div
              class="
                absolute
                inset-y-0
                left-0
                flex
                items-center
                pl-3
                pointer-events-none
              "
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              class="
                block
                w-full
                p-2
                pl-10
                text-sm text-gray-900
                border border-gray-300
                rounded-lg
                bg-gray-50
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:border-blue-500
              "
              placeholder="Search your data..."
              required
              @input="searchData"
            />
          </div>
        </div>

        <select
          v-if="chooseTemplate"
          id="templates"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-1.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
        >
          <option selected>Choose a template</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <div
          v-if="buttons"
          class="flex justify-end w-full rounded-md"
          role="group"
        >
          <button
            type="button"
            class="
              px-4
              py-2
              text-sm
              font-medium
              text-gray-900
              bg-white
              border border-gray-200
              rounded-l-lg
              hover:bg-gray-100 hover:text-blue-700
              focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
              dark:bg-gray-700
              dark:border-gray-600
              dark:text-white
              dark:hover:text-white
              dark:hover:bg-gray-600
              dark:focus:ring-blue-500
              dark:focus:text-white
            "
          >
            Print All
          </button>
          <button
            type="button"
            class="
              px-4
              py-2
              text-sm
              font-medium
              text-gray-900
              bg-white
              border-t border-b border-gray-200
              hover:bg-gray-100 hover:text-blue-700
              focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
              dark:bg-gray-700
              dark:border-gray-600
              dark:text-white
              dark:hover:text-white
              dark:hover:bg-gray-600
              dark:focus:ring-blue-500
              dark:focus:text-white
            "
          >
            Print Selected
          </button>
          <button
            type="button"
            class="
              px-4
              py-2
              text-sm
              font-medium
              text-gray-900
              bg-white
              border border-gray-200
              rounded-r-md
              hover:bg-gray-100 hover:text-blue-700
              focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
              dark:bg-gray-700
              dark:border-gray-600
              dark:text-white
              dark:hover:text-white
              dark:hover:bg-gray-600
              dark:focus:ring-blue-500
              dark:focus:text-white
            "
          >
            Print all except selected
          </button>
        </div>
      </div>

      <div class="overflow-x-auto overflow-y-auto relative">
        <table
          class="
            w-full
            text-sm
            border-2
            text-left
            rounded
            shadow
            text-gray-500
            dark:text-gray-400
          "
        >
          <tbody>
            <tr
              v-for="(d, i) in getData()"
              :key="i"
              :class="{ flex: getFlex(d) }"
              class="
                bg-white
                px-2
                border-b
                dark:bg-gray-800 dark:border-gray-700
                hover:bg-gray-50
                dark:hover:bg-gray-600
              "
            >
              <td class="p-4 w-4">
                <div class="flex items-center">
                  <input
                    v-model="container.selectedData"
                    :value="i"
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="
                      w-4
                      h-4
                      text-blue-600
                      bg-gray-100
                      rounded
                      border-gray-300
                      focus:ring-blue-500
                      dark:focus:ring-blue-600 dark:ring-offset-gray-800
                      focus:ring-2
                      dark:bg-gray-700 dark:border-gray-600
                    "
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>

              <td
                v-for="(dd, ii) in d"
                :key="ii"
                v-html="fomatTableContent(dd, ii)"
                class="py-4 px-6"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="!getData()" class="h-full w-full">
      <small>{{ $t("data.noDataToPreview") }}</small>
    </div>
  </div>
  </div>
</template>

<script>

import Fuse from "fuse.js";

export default {
  props: ["data", "chooseTemplate", "buttons","container","tableVisible","hideButton"],
  data() {
    return {
      tableData: null,
      showTable: true,
    };
  },
  methods: {
    getFlex(d) {
      if (typeof d[0] === "number") {
        return false;
      }
      return true;
    },
    getData() {
      return this.tableData;
    },
    setData(data) {
      this.tableData = data;
    },
    restoreData() {
      this.tableData = JSON.parse(JSON.stringify(this.data));
    },
    searchData(e) {
      let keyword = e.target.value;
      let keys = [];
      for (let i in this.data[0]) {
        keys.push(i);
      }

      const options = {
        shouldSort: true,
        matchAllTokens: true,
        findAllMatches: true,
        includeScore: true,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: keys,
      };

      if (keyword.length === 0) {
        this.restoreData();
      } else {
        const fuse = new Fuse(this.tableData, options);
        let results = fuse.search(keyword).map((r) => r.item);
        this.setData(results);
      }
    },
    isImage(url) {
      return url.match(/\.(jpeg|jpg|gif|svg|png)$/) != null;
    },
    fomatTableContent(content, index) {
      if (typeof content === "object") {
        let data = "";
        for (let i in content) {
          let text = `<div class="flex gap-2"><b>${i}</b> : ${this.fomatTableContent(
            content[i]
          )}</div>`;
          data += text;
        }

        return data;
      }
      if (typeof content === "number") {
        return content;
      }
      if (this.isImage(content)) {
        return `<img width="100" src="${content}" class="rounded shadow" />`;
      }

      let column = this.formatColumnName(index);
      return `<div class="text-ellipsis no-wrap overflow-hidden ..."><div class="font-bold">${column}</div> ${content}</div>`;
    },

    formatColumnName(column) {
      if (column) {
        if (typeof column === "number") {
          return "";
        }

        // if woo commerce
        if (column.includes("_")) {
          return column.replace("_", " ").replace("_", " ");
        }

        return column;
      }

      return "";
    },
  },
  mounted() {
    this.showTable = this.tableVisible;
    setTimeout(() => {
      this.tableData = JSON.parse(JSON.stringify(this.data));
    }, 500);
  },
  watch: {
    data: function (newVal, oldVal) {
      this.tableData = JSON.parse(JSON.stringify(this.data));
    },
  },
};
</script>

<style scoped>
td {
  vertical-align: baseline;
}
</style>