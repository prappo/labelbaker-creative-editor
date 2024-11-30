<template>
  <div v-if="!removed" :id="id" class="bg-gray-100 rounded-md py-2 my-5 shadow-md">
    <div class="flex border-b justify-between py-2 items-center">
      <div style="cursor: pointer" @click="minimize = !minimize" class="w-full px-3 hover:text-gray-300 transition-all">
        {{ generateTitle(selected) }}
      </div>
      <div class="items-center flex">
        <a class="w-7 h-7 flex items-center justify-center shadow-md hover:shadow transition-all mr-3 rounded-full bg-red-100"
          style="cursor: pointer" @click="removeCondition">
          <svg class="w-5 h-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </a>
      </div>
    </div>
    <div v-show="!minimize" class="px-3">
      <select @change="conditionChange" style="max-width: 100% !important" v-model="selected"
        class="border rounded w-full px-3 py-2 mt-2">
        <option v-for="(condition, i) in conditions" :value="condition.name" :key="i">
          {{ condition.title }}
        </option>
      </select>

      <select @change="changeOperator" v-model="condify_condition_operator" style="max-width: 100% !important"
        class="border rounded w-full px-3 py-2 mt-2">
        <option value="is">Is</option>
        <option value="is_not">Is Not</option>
      </select>

      <input type="hidden" name="wpcondify_meta[]" :value="JSON.stringify({ settings: componentSettings })" />

      <flat-pickr style="z-index: 99999999999;" @change="dateChange" v-if="selected == 'condify_condition_date'"
        :config="datePickerConfig" class="w-full border rounded px-3 py-1 mt-2 z-[999999999999]"
        v-model="date"></flat-pickr>

      <flat-pickr style="z-index: 99999999999;" @change="dateAndTimeChange" v-if="selected == 'condify_condition_time'"
        :config="dateTimePickerConfig" class="w-full border rounded px-3 py-1 mt-2" v-model="dateAndTime"></flat-pickr>

      <select v-if="selected != 'condify_condition_date' &&
        selected != 'condify_condition_time'
        " @change="conditionValueChange" style="max-width: 100% !important"
        class="border rounded w-full px-3 py-2 mt-2">
        <option v-for="(title, value) in options[selected]" :selected="value == valueSelected" :value="value"
          :key="value">
          {{ title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import countryList from "./libs/country.js";
import dateFormat from "dateformat";

import "flatpickr/dist/flatpickr.css";
export default {
  name: "Logics",
  props: ["id", "settings"],
  components: {
    flatPickr,
  },
  data() {
    return {
      componentSettings: this.settings,

      date:
        this.settings.selected == "condify_condition_date"
          ? this.settings.valueSelected
          : new Date(),
      dateAndTime:
        this.settings.selected == "condify_condition_time"
          ? this.settings.valueSelected
          : null,
      datePickerConfig: {
        minDate: "today",
        dateFormat: "d-m-Y",
      },
      dateTimePickerConfig: {
        // minDate: "today",
        // dateFormat: "d-m-Y H:i",
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        defaultDate: "12:00",
      },
      minimize: false,
      conditions: [
        {
          title: "Browser",
          name: "condify_condition_browser",
        },
        {
          title: "User Role",
          name: "condify_condition_user_role",
        },
        {
          title: "Login Status",
          name: "condify_condition_login_status",
        },
        {
          title: "Operating System",
          name: "condify_condition_operating_system",
        },
        {
          title: "Country",
          name: "condify_condition_country",
        },
        {
          title: "Date",
          name: "condify_condition_date",
        },
        {
          title: "Time",
          name: "condify_condition_time",
        },
        // {
        //   title: "IP",
        //   name: "condify_condition_ip",
        // },
        // {
        //   title: "Dynamic Link",
        //   name: "condify_condition_dynamic_link",
        // },
        {
          title: "Mobile Device",
          name: "condify_condition_mobile",
        },
      ],
      options: {
        condify_condition_mobile: {
          iPhone: "iPhone",
          AndroidOS: "Any android mobile",
          Mobile: "Any mobile",
          HTC: "HTC",
          Nexus: "Nexus",
          Dell: "Dell",
          Motorola: "Motorola",
          Samsung: "Samsung",
          LG: "LG",
          Sony: "Sony",
          Asus: "Asus",
          Palm: "Palm",
          Vertu: "Vertu",
          Pantech: "Pantech",
          Fly: "Fly",
          Wiko: "Wiko",
          GenericPhone: "GenericPhone",
        },
        condify_condition_dynamic_link: {},
        condify_condition_ip: {},
        condify_condition_date: {},
        condify_condition_time: {},
        condify_condition_country: countryList(),
        condify_condition_login_status: {
          logged_in: "Looged in",
        },
        condify_condition_operating_system: {
          mac_os: "Mac OS",
          linux: "Linux",
          ubuntu: "Ubuntu",
          iphone: "iPhone",
          android: "iPad",
          windows: "Windows",
          ipod: "iPod",
          ipad: "Android",
          blackberry: "BlackBerry",
          open_bsd: "OpenBSD",
          sun_os: "SunOS",
          qnx: "QNX",
          beos: "BeOS",
          os2: "OS/2",
          search_bot: "Search Bot",
        },

        condify_condition_browser: {
          opera: "Opera",
          edge: "Edge",
          chrome: "Google Chrome",
          safari: "Safari",
          firefox: "Mozilla Firefox",
          ie: "Internet Explorer",
          others: "Others",
        },
        condify_condition_user_role: {
          subscriber: "Subscriber",
          administrator: "Administrator",
          author: "Author",
          editor: "Editor",
          contributor: "Contributor",
        },
      },

      selected: this.settings.selected,
      valueSelected: this.settings.valueSelected,
      condify_condition_operator: this.settings.condify_condition_operator,
      removed: false,
    };
  },
  methods: {
    getOptions: function (optionName) {
      let optionProperty = "condify_condition_" + optionName + "_options";
      this.componentSettings.selected = optionProperty;
      return this[optionProperty];
    },
    removeCondition: function () {
      this.removed = true;
    },

    conditionChange: function (event) {
      let optionName = event.target.value;

      this.componentSettings.selected = optionName;
      // this.componentSettings.valueSelected = this.options[optionName];
      let firstProperty = Object.keys(this.options[optionName])[0];
      this.componentSettings.valueSelected = firstProperty;
      this.condify_condition_operator = this.componentSettings.condify_condition_operator;

      if (optionName == "condify_condition_date") {
        let now = new Date();
        let currentDate = dateFormat(now, "dd-mm-yyyy");
        this.componentSettings.valueSelected = currentDate;
      }

      if (optionName == "condify_condition_time") {
        // let now = new Date();
        // let currentDateAndTime = dateFormat(now,'dd-mm-yyyy hh:mm');
        this.componentSettings.valueSelected = "currentDateAndTime";
      }
     
    },

    dateChange: function (event) {
      this.componentSettings.valueSelected = event.target.value;
    },

    dateAndTimeChange: function (event) {
      this.componentSettings.valueSelected = event.target.value;
    },

    changeOperator: function (value) {
      this.componentSettings.condify_condition_operator = event.target.value;
    },

    conditionValueChange: function (event) {
      let optionVlaueName = event.target.value;
      this.componentSettings.valueSelected = optionVlaueName;
     
    },

    generateTitle(value) {
      return value
        .replace("condify_condition_", "")
        .replace("_", " ")
        .toUpperCase();
    },
  },

  filters: {
    generateTitle(value) {
      return value;
    },
  },
};
</script>