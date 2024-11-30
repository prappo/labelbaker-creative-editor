<template>
  <div class="py-2">
    <div :class="{'rounded-md' : !showDash}" class="cursor-pointer flex justify-between rounded-tl-md rounded-tr-md px-2 w-full bg-gray-600 text-white" @click="showDash = !showDash">Dash <div class="flex justify-center items-center"><span v-if="!showDash">+</span><span v-else>-</span></div></div>
    <div v-if="showDash" class="flex border p-2 flex-col gap-2">
      <div class="flex gap-5 justify-between">
        <div>
          <small>Long</small>
          <input
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              px-2
              py-1
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            @input="chanageLong"
            type="number"
            min="0"
            :value="long"
          />
        </div>
        <div>
          <small>Apart</small>
          <input
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              px-2
              py-1
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            type="number"
            @input="changeApart"
            min="0"
            :value="apart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selected", "editor"],
  data() {
    return {
      long: 0,
      apart: 0,
      showDash:false,
    };
  },
  methods: {
    chanageLong(e) {
      this.long = parseInt(e.target.value);
      this.selected.dash([this.long, this.apart]);
    },
    changeApart(e) {
      this.apart = parseInt(e.target.value);
      this.selected.dash([this.long, this.apart]);
    },
  },
  watch: {
    selected: function (newVal, oldVal) {
      if (this.editor.selected) {
        if (typeof this.editor.selected["dash"] !== "function") {
          return;
        }
        if (typeof this.editor.selected.dash === 'function') {

          if(this.editor.selected.dash()?.length){
            if (this.editor.selected.dash().length === 1) {
            this.long = this.selected.dash()[0];
          } else {
            this.long = this.selected.dash()[0];
            this.apart = this.selected.dash()[1];
          }
          }
          
        } else {
          this.long = 0;
          this.apart = 0;
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.editor.selected) {
        if (typeof this.editor.selected.dash === 'function') {
          if(this.editor.selected.dash()?.length){
            if (this.editor.selected.dash().length === 1) {
            this.long = this.selected.dash()[0];
          } else {
            this.long = this.selected.dash()[0];
            this.apart = this.selected.dash()[1];
          }
          }
         
        } else {
          this.long = 0;
          this.apart = 0;
        }
      }
    }, 100);
  },
};
</script>
