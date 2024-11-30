<template>
  <div
    v-if="isPro('yes')"
    class="w-full flex justify-center bg-pink-500 px-3 py-1 rounded-md"
  >
    <div class="flex gap-5 py-2 items-center">
      <div class="text-white text-xl">You need pro version to use this feature</div>
      <a target="__blank" href="https://wpcox.com/labelbaker/pricing" class="bg-pink-700 px-3 py-1 text-white rounded-full hover:text-white hover:shadow-md">Upgrade Now</a>
    </div>
  </div>
</template>