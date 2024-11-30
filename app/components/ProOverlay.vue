<template>
    <div v-if="appMode === 'noAuth' && isPro('yes')"
        class="absolute z-10 flex justify-center rounded-md items-center top-0 bg-slate-400 backdrop-blur-sm bg-opacity-10 h-full w-full">
        <div class="bg-pink-500 text-white rounded-full px-3 py-1 font-bold w-auto">Pro version required</div>
    </div>
</template>