<template>
  <div class=" rounded px-2  mb-2 py-2">
    <div class="mt-2">

      <!-- Position -->
      <div class="flex gap-1 justify-between">

        <div class="w-full flex gap-1 items-center">
          <small id="dropdownMenuPositionX" data-dropdown-toggle="positionXElementsDropdown"
            class="flex justify-between cursor-pointer items-center">
            X

            <!-- Dropdown menu -->
            <div id="positionXElementsDropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="positionXElementsDropdown">
                <li v-for="(el, index) in canvasContainer.editor.layer.children" :key="index">
                  <button @click="setPositionX(el)"
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{
                      el.attrs.name }}</button>
                </li>
              </ul>

            </div>

          </small>
          <input style="border:none !important;background: none;" class="
    bg-gray-50
    border border-gray-300
    text-gray-900 text-sm
    rounded-lg
    focus:ring-blue-500 focus:border-blue-500
    block
    w-full
    dark:bg-gray-700
    dark:border-gray-600
    dark:placeholder-gray-400
    dark:text-white
    dark:focus:ring-blue-500
    dark:focus:border-blue-500
  " type="number" :value="parseInt(selected.x())" min="0" max="360"
            @input="(event) => selected.x(parseInt(event.target.value))" />
        </div>
        <div class="w-full gap-1 flex">
          <small id="dropdownMenuPositionY" data-dropdown-toggle="positionYElementsDropdown"
            class="flex cursor-pointer justify-between items-center">
            Y

            <!-- Dropdown menu -->
            <div id="positionYElementsDropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">

              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="positionYElementsDropdown">
                <li v-for="(el, index) in canvasContainer.editor.layer.children" :key="index">
                  <button @click="setPositionY(el)"
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{
                      el.attrs.name }}</button>
                </li>
              </ul>

            </div>

          </small>
          <input style="border:none !important;background: none;" class="
    bg-gray-50
    border border-gray-300
    text-gray-900 text-sm
    rounded-lg
    focus:ring-blue-500 focus:border-blue-500
    block
    w-full
    
    dark:bg-gray-700
    dark:border-gray-600
    dark:placeholder-gray-400
    dark:text-white
    dark:focus:ring-blue-500
    dark:focus:border-blue-500
  " type="number" :value="parseInt(selected.y())" min="0"
            @input="(event) => selected.y(parseInt(event.target.value))" />
        </div>
      </div>
    </div>
    <!-- width and height -->
    <div class="flex flex-col gap-1">
      <div class="flex gap-1 justify-between">
        <div class="flex items-center gap-1">
          <small>W</small>
          <input style="border:none !important;background: none;" class="
            
              border-0 h-5 border-gray-300
              text-gray-900 text-sm
              rounded-lg
            
             w-full
              
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            " type="number" :value="parseInt(selected.width())" min="1" @input="changeWidth" />
        </div>
        <div class="flex items-center gap-1">
          <small>H</small>
          <input style="border:none !important;background: none;" class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
             
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            " type="number" :value="parseInt(selected.height())" min="1"
            @input="(event) => selected.height(parseInt(event.target.value))" />
        </div>
      </div>
      <div class="flex gap-1 justify-between">
        <div class="w-full flex items-center gap-1">
          <small><svg class="svg" width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0v8h8V7H5c0-2.21-1.79-4-4-4V0H0zm1 4v3h3c0-1.657-1.343-3-3-3z" fill-rule="evenodd"
                fill-opacity="1" fill="currentColor" stroke="none"></path>
            </svg></small>
          <input style="border:none !important;background: none;" class="
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
            " type="number" :value="selected.rotation()" min="0" max="360"
            @input="(event) => selected.rotation(parseInt(event.target.value))" />
        </div>
        <div class="w-full flex gap-1 items-center">
          <small>S</small>
          <input style="border:none !important;background: none;" class="
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
            " type="number" :value="selected.scale().x" min="1" @input="(event) =>
              selected.scale({
                x: parseInt(event.target.value),
                y: parseInt(event.target.value),
              })
              " />
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { initDropdowns } from 'flowbite';
import { canvasContainer } from '../../../store/editor';
export default {
  props: ["editor", "selected"],
  data() {
    return {
      angle: 0,
      canvasContainer,
    };
  },
  methods: {
    changeWidth: function (e) {
      this.selected.width(parseInt(e.target.value));
    },
    changeAngle: function (e) {
      this.angle = e;
      this.selected.rotation(this.angle);
    },
    setPosition(el) {
      this.selected.x(el.x());
      this.selected.y(el.y())
    },
    setPositionX(el) {
      this.selected.x(el.x());
    },
    setPositionY(el) {
  
      this.selected.y(el.y());
    }
  },
  mounted() {
    initDropdowns();
  }
};
</script>