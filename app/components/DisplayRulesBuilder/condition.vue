<template>
  <div class="border rounded mx-2 my-5 pb-3 shadow-xl">
    <div class="border-b shadow-md gap-2 px-5 py-2 flex items-center">
      <div class="flex items-center gap-3 text-2xl text-gray-600">
     
        <div class=" flex justify-center items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
</svg> Conditions</div>
      </div>
    </div>
    <div class="px-5">
      <div class="flex justify-between items-center py-3">
        <div>Display On</div>
        <div>
          <select v-model="relation" name="condify_condition_relation" class="border rounded px-3 py-2">
            <option value="and">All Conditions Met</option>
            <option value="or">Any Condition Met</option>
          </select>
        </div>
      </div>

      <div class="flex justify-between border-b items-center py-3">
        <div class="text-gray-400 text-sm">Conditions</div>
        <div></div>
      </div>

      <Logics v-for="i in ids" :id="i.id" :settings="i.settings" :key="i.id"></Logics>

      <div class="flex justify-center items-center">
        <button
        style="cursor: pointer"
          @click.prevent="addCondition"
          class="my-5 border-none bg-green-100 text-green-700 px-3 py-1 rounded shadow-md flex items-center justify-center gap-1"
        >
         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
</svg> Add New Condition
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Logics from "./logics.vue";
import Logo from "./logo.vue";

export default {
  name: "Condition",
  props:["json","relation"],
  data() {
    return {
      relation: this.relation,
      count: 1,
      ids:   this.json,
      settings: [],
    };
  },
  components: {
    Logics,
    Logo,
  },
  mounted() {
    let id = this.makeid(5);

    // this.ids.push({
    //   id: id,
    //   settings: {
    //     id: id,
    //     selected: "condify_condition_operating_system",
    //     valueSelected: "linux",
    //   },
    // });
  },
  methods: {
    addCondition: function () {
      let id = this.makeid(5);
      // this.ids.push(id);
      this.ids.push({
        id: id,
        settings: {
          id: id,
          selected: "condify_condition_browser",
          valueSelected: "chrome",
          condify_condition_operator: 'is',
        },
      });
    },
    makeid: function (length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>

<style scoped>
.toggle__dot {
  top: -0.25rem;
  left: -0.25rem;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
  background-color: #48bb78;
}
</style>