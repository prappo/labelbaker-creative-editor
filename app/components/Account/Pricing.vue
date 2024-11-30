<template>
  <div class="grid w-full md:grid-cols-3 grid-cols-1 gap-4 pb-10">
    <!-- Silver -->
    <div class="flex justify-center">
      <div
        class="
          w-full
          max-w-sm
          p-4
          bg-white
          border border-gray-200
          rounded-lg
          shadow
          sm:p-8
          dark:bg-gray-800 dark:border-gray-700
        "
      >
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Silver
        </h5>
        <div class="flex items-baseline text-gray-900 dark:text-white">
          <span class="text-3xl font-semibold">$</span>
          <span class="text-5xl font-extrabold tracking-tight">9</span>
          <span
            class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
            >/month</span
          >
        </div>
        <!-- List -->
        <ul role="list" class="space-y-5 my-7">
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Unlimited templates</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >3 custom templates</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Generate Unlimited Images and PDFs</span
            >
          </li>
          
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Full access to template Editor</span
            >
          </li>
          
          <li class="flex space-x-3 line-through decoration-gray-500">
            <!-- Icon -->
            <CheckGray />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Bulk Create</span
            >
          </li>
          <li class="flex space-x-3 line-through decoration-gray-500">
            <!-- Icon -->
            <CheckGray />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Share Template</span
            >
          </li>
          <li class="flex space-x-3 line-through decoration-gray-500">
            <!-- Icon -->
            <CheckGray />
            <span class="text-base font-normal leading-tight text-gray-500"
              >API access</span
            >
          </li>
          <li class="flex space-x-3 line-through decoration-gray-500">
            <!-- Icon -->
            <CheckGray />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Storage</span
            >
          </li>
         
        </ul>
        <button
          @click="pay(44665)"
          type="button"
          class="
            text-white
            bg-blue-600
            hover:bg-blue-700
            focus:ring-4 focus:outline-none focus:ring-blue-200
            dark:focus:ring-blue-900
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            inline-flex
            justify-center
            w-full
            text-center
          "
        >
          Choose plan
        </button>
      </div>
    </div>
    <!-- Gold -->
    <div class="flex justify-center">
      <div
        class="
          w-full
          max-w-sm
          p-4
          bg-white
          border border-gray-200
          rounded-lg
          shadow
          sm:p-8
          dark:bg-gray-800 dark:border-gray-700
        "
      >
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Gold
        </h5>
        <div class="flex items-baseline text-gray-900 dark:text-white">
          <span class="text-3xl font-semibold">$</span>
          <span class="text-5xl font-extrabold tracking-tight">19</span>
          <span
            class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
            >/month</span
          >
        </div>
        <!-- List -->
        <ul role="list" class="space-y-5 my-7">
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Unlimited templates</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >5 custom templates</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Generate Unlimited Images and PDFs</span
            >
          </li>
         
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Full access to template Editor</span
            >
          </li>
         
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Bulk Create</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Share Template</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span class="text-base font-normal leading-tight text-gray-500"
              >API access ( 1500 calls)</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Storage 20 MB</span
            >
          </li>
          
        </ul>
        <button
          @click="pay(44903)"
          type="button"
          class="
            text-white
            bg-blue-600
            hover:bg-blue-700
            focus:ring-4 focus:outline-none focus:ring-blue-200
            dark:focus:ring-blue-900
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            inline-flex
            justify-center
            w-full
            text-center
          "
        >
          Choose plan
        </button>
      </div>
    </div>
    <!-- Diamond -->
    <div class="flex justify-center">
      <div
        class="
          w-full
          max-w-sm
          p-4
          bg-white
          border border-gray-200
          rounded-lg
          shadow
          sm:p-8
          dark:bg-gray-800 dark:border-gray-700
        "
      >
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Platinum
        </h5>
        <div class="flex items-baseline text-gray-900 dark:text-white">
          <span class="text-3xl font-semibold">$</span>
          <span class="text-5xl font-extrabold tracking-tight">29</span>
          <span
            class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
            >/month</span
          >
        </div>
        <!-- List -->
        <ul role="list" class="space-y-5 my-7">
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Unlimited templates</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >15 custom templates</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Generate Unlimited Images and PDFs</span
            >
          </li>
          
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span
              class="
                text-base
                font-normal
                leading-tight
                text-gray-500
                dark:text-gray-400
              "
              >Full access to template Editor</span
            >
          </li>
          
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Bulk Create</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Share Template</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span class="text-base font-normal leading-tight text-gray-500"
              >API access ( 3000 calls)</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <CheckGreen />
            <span class="text-base font-normal leading-tight text-gray-500"
              >Storage 50 MB</span
            >
          </li>
          
        </ul>
        <button
          @click="pay(44904)"
          type="button"
          class="
            text-white
            bg-blue-600
            hover:bg-blue-700
            focus:ring-4 focus:outline-none focus:ring-blue-200
            dark:focus:ring-blue-900
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            inline-flex
            justify-center
            w-full
            text-center
          "
        >
          Choose plan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import "https://cdn.paddle.com/paddle/paddle.js";
import CheckGreen from "./parts/CheckGreen.vue";
import CheckGray from "./parts/CheckGray.vue";
import { userData } from "../../store/user";

export default {
  components: {
    CheckGray,
    CheckGreen,
  },
  data() {
    return {
      userData,
    };
  },
  methods: {
    pay(product = 44665) {
      // Paddle.Environment.set("sandbox");
      // Paddle.Setup({ vendor: 10620 });
      // Paddle.Checkout.open({
      //   product: product,
      //   email: this.userData.details.email,
      // });
    },
  },
  mounted() {},
};
</script>