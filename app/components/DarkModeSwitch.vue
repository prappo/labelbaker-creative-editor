<template>
  <button
    @click="chageTheme"
    type="button"
    class="
      button-switch-editor
      relative
      inline-flex
      flex-shrink-0
      bg-gray-200
      h-6
      w-11
      border-2 border-transparent
      rounded-full
      cusrsor-pointer
      transition-colors
      ease-in-out
      duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
    "
  >
    <span
      class="
        outer-span
        relative
        inline-block
        h-5
        w-5
        rounded-full
        bg-white
        shadow
        transform
        ring-0
        transition
        ease-in-out
        duration-200
        pointer-events-none
      "
    >
      <span
        class="
          light-switch
          absolute
          inset-0
          h-full
          w-full
          flex
          items-center
          justify-center
          transition-opacity
          opacity-100
          ease-out
          duration-100
        "
      >
        <svg
          class="bg-white h-3 w-3 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>

      <span
        class="
          dark-switch
          absolute
          inset-0
          h-full
          w-full
          flex
          items-center
          justify-center
          transition-opacity
          opacity-0
          ease-in
          duration-200
        "
      >
        <svg
          class="bg-white h-3 w-3 text-blue-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.2256 2.00253C9.59172 1.94346 6.93894 2.9189 4.92893 4.92891C1.02369 8.83415 1.02369 15.1658 4.92893 19.071C8.83418 22.9763 15.1658 22.9763 19.0711 19.071C21.0811 17.061 22.0565 14.4082 21.9975 11.7743C21.9796 10.9772 21.8669 10.1818 21.6595 9.40643C21.0933 9.9488 20.5078 10.4276 19.9163 10.8425C18.5649 11.7906 17.1826 12.4053 15.9301 12.6837C14.0241 13.1072 12.7156 12.7156 12 12C11.2844 11.2844 10.8928 9.97588 11.3163 8.0699C11.5947 6.81738 12.2094 5.43511 13.1575 4.08368C13.5724 3.49221 14.0512 2.90664 14.5935 2.34046C13.8182 2.13305 13.0228 2.02041 12.2256 2.00253ZM17.6569 17.6568C18.9081 16.4056 19.6582 14.8431 19.9072 13.2186C16.3611 15.2643 12.638 15.4664 10.5858 13.4142C8.53361 11.362 8.73568 7.63895 10.7814 4.09281C9.1569 4.34184 7.59434 5.09193 6.34315 6.34313C3.21895 9.46732 3.21895 14.5326 6.34315 17.6568C9.46734 20.781 14.5327 20.781 17.6569 17.6568Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
  </button>
</template>

<script>
import { canvasContainer } from "../store/editor";
export default {
  data() {
    return {
      canvasContainer,
      theme: null,
    };
  },

  methods: {
    chageTheme: function () {
      let mode = this.theme;
      let translateClass = "translate-x-5";
      if (canvasContainer.semitic === "rtl") {
        translateClass = "-translate-x-5";
      }
      if (mode === "light") {
        document.documentElement.classList.add("dark");
        mode = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        mode = "light";
      }

      this.theme = mode;
      localStorage.setItem("theme", mode);

      var button = document.querySelector(".button-switch-editor");
      var outerSpan = document.querySelector(".outer-span");
      var lightSwitch = document.querySelector(".light-switch");
      var darkSwitch = document.querySelector(".dark-switch");

      outerSpan.classList.toggle(translateClass);
      button.classList.toggle("bg-gray-800");
      lightSwitch.classList.toggle("opacity-100");

      darkSwitch.classList.toggle("opacity-100");
      darkSwitch.classList.toggle("opacity-0");
    },
  },
  mounted() {
   
    let translateClass = "translate-x-5";
    if (localStorage.getItem("semitic") === "rtl") {
      translateClass = "-translate-x-5";
    }

    setTimeout(() => {
   
      if (this.canvasContainer.semitic === "rtl") {
        translateClass = "-translate-x-5";
      }
    }, 100);
    
    this.theme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light";
    if (this.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    var button = document.querySelector(".button-switch-editor");
    var outerSpan = document.querySelector(".outer-span");
    var lightSwitch = document.querySelector(".light-switch");
    var darkSwitch = document.querySelector(".dark-switch");

    if (this.theme === "dark") {
      outerSpan.classList.add(translateClass);
      button.classList.add("bg-gray-800");
      lightSwitch.classList.remove("opacity-100");
      darkSwitch.classList.remove("opacity-0");
      darkSwitch.classList.add("opacity-100");
    } else {
      try {
        outerSpan.classList.remove(translateClass);
        button.classList.remove("bg-gray-800");
        lightSwitch.classList.add("opacity-100");
        darkSwitch.classList.remove("opacity-100");
      } catch (e) {}
    }
  
  },
};
</script>
