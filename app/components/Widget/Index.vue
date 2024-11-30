<template>
  <div class="w-full h-full">
    <div v-if="editorData"
      class="bg-white dark:bg-gray-800 grid grid-cols-1 md:grid-cols-2 w-full h-full rounded shadow-lg pt-7">
      <!-- Option selection -->
      <div v-if="selectedOption !== 'previewMode'" class="overflow-auto">
        <!-- buttons -->
        <div class="grid grid-cols-3 w-full md:gap-3 md:px-5 px-0 py-5 gap-3 md:py-5"
          v-if="!selectedOption && !TempData.optionType">
          <button @click="changeOption('export')"
            class="bg-white p-3 w-full flex justify-center gap-2 items-center flex-col rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg">
            <svg class="w-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.36434 4.76444C10.2311 4.56112 11.1156 4.45946 12 4.45946C12.403 4.45946 12.7297 4.13275 12.7297 3.72973C12.7297 3.32671 12.403 3 12 3C11.0037 3 10.0074 3.11452 9.03105 3.34355C6.209 4.00551 4.00551 6.20899 3.34355 9.03104C2.88548 10.9838 2.88548 13.0162 3.34355 14.969C4.00551 17.791 6.209 19.9945 9.03105 20.6565C10.9838 21.1145 13.0162 21.1145 14.969 20.6565C17.791 19.9945 19.9945 17.791 20.6565 14.969C20.8855 13.9925 21 12.9963 21 12C21 11.597 20.6733 11.2702 20.2703 11.2702C19.8673 11.2702 19.5405 11.597 19.5405 12C19.5405 12.8844 19.4389 13.7689 19.2356 14.6357C18.7002 16.9181 16.9181 18.7002 14.6357 19.2356C12.9021 19.6422 11.0979 19.6422 9.36434 19.2356C7.08194 18.7002 5.29982 16.9181 4.76444 14.6357C4.3578 12.9021 4.3578 11.0979 4.76444 9.36434C5.29982 7.08194 7.08194 5.29982 9.36434 4.76444Z"
                fill="#9CA3AF" />
              <path
                d="M16.3784 3C15.9754 3 15.6486 3.32671 15.6486 3.72973C15.6486 4.13275 15.9754 4.45946 16.3784 4.45946H18.5085L13.9164 9.05157C13.6315 9.33655 13.6315 9.79859 13.9164 10.0836C14.2014 10.3685 14.6635 10.3685 14.9484 10.0836L19.5405 5.49145V7.62162C19.5405 8.02464 19.8673 8.35135 20.2703 8.35135C20.6733 8.35135 21 8.02464 21 7.62162V3.72973C21 3.32671 20.6733 3 20.2703 3H16.3784Z"
                fill="#9CA3AF" />
            </svg>
            <h2 class="text-gray-500 font-semibold text-2xl">Create</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Generate Image / PDF from this template
            </p>
          </button>
          <button @click="changeOption('print')"
            class="w-full bg-white p-3 flex justify-center items-center flex-col gap-2 rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg">
            <svg class="w-14" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M432,112V96a48.14,48.14,0,0,0-48-48H64A48.14,48.14,0,0,0,16,96V352a48.14,48.14,0,0,0,48,48H80"
                style="
                  fill: none;
                  stroke: #9ca3af;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                " />
              <rect x="96" y="128" width="400" height="336" rx="45.99" ry="45.99" style="
                  fill: none;
                  stroke: #9ca3af;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                " />
              <ellipse cx="372.92" cy="219.64" rx="30.77" ry="30.55" style="
                  fill: none;
                  stroke: #9ca3af;
                  stroke-miterlimit: 10;
                  stroke-width: 32px;
                " />
              <path d="M342.15,372.17,255,285.78a30.93,30.93,0,0,0-42.18-1.21L96,387.64" style="
                  fill: none;
                  stroke: #9ca3af;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                " />
              <path d="M265.23,464,383.82,346.27a31,31,0,0,1,41.46-1.87L496,402.91" style="
                  fill: none;
                  stroke: #9ca3af;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                " />
            </svg>
            <h2 class="text-gray-500 font-semibold text-2xl">Bulk Create</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Generate bulk contents and Labels
            </p>
          </button>

          <button v-if="editorData.category === 'my'" @click="changeOption('share')"
            class="w-full relative bg-white p-3 flex justify-center items-center flex-col gap-2 rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg">
            <ProTag />
            <svg fill="#9ca3af" class="w-14" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m 1.1997995,12.993916 c -0.079034,-0.023 -0.164071,-0.1093 -0.1879813,-0.1914 -0.012005,-0.042 -0.013006,-0.6895 -0.011005,-5.8210003 l 0,-5.774 0.02201,-0.045 c 0.028012,-0.057 0.083036,-0.1117 0.1401606,-0.1401 l 0.045019,-0.022 5.7922041,0 5.7923041,0 0.05102,0.025 c 0.05602,0.027 0.103645,0.075 0.135459,0.1345 l 0.02101,0.039 0,5.7832 c 0,5.3765003 0,5.7866003 -0.01301,5.8311003 -0.01901,0.06 -0.07903,0.1291 -0.141761,0.1621 l -0.04602,0.024 -5.7877023,0 c -3.4562942,9e-4 -5.799207,0 -5.8160143,-0.01 z m 11.2366575,-5.9919003 0,-5.4342 -5.4319481,0 -5.4318482,0 0,5.4229 c 0,2.9826 -4.002e-4,5.4280003 0,5.4342003 0,0.01 1.0990751,0.011 5.4365502,0.011 l 5.4321481,0 0,-5.4342003 z m -6.8619663,3.7181003 0,-0.8603003 0.8557699,0 0.85577,0 0,0.8603003 0,0.8603 -0.85577,0 -0.8557699,0 0,-0.8603 z m 1.1439945,0 0,-0.2838 -0.2882246,0 -0.2883246,0 0,0.2838 0,0.2837 0.2883246,0 0.2882246,0 0,-0.2837 z m 1.1440947,0 0,-0.2838 1.7160418,0 1.7160413,0 0,0.2838 0,0.2837 -1.7160413,0 -1.7160418,0 0,-0.2837 z m -2.2880892,-3.1483003 0,-1.1441 2.8600364,0 2.8601359,0 0,1.1441 0,1.1439 -2.8601359,0 -2.8600364,0 0,-1.1439 z m 5.1436233,0 0,-0.5721 -2.2880888,0 -2.2880892,0 0,0.5661 c 0,0.3113 0,0.5687 0.010004,0.572 0,0 1.0329466,0.01 2.2880892,0.01 l 2.2820868,0 0,-0.572 z m -7.9992578,0 0,-0.2884 1.1395927,0 1.1394925,0 0,0.2884 0,0.2882 -1.1394925,0 -1.1395927,0 0,-0.2882 z m 2.8556345,-3.4321 0,-1.1441 2.8600364,0 2.8601359,0 0,1.1441 0,1.144 -2.8601359,0 -2.8600364,0 0,-1.144 z m 5.1436233,0 0,-0.5721 -2.2880888,0 -2.2880892,0 0,0.5661 c 0,0.3112 0,0.5686 0.010004,0.5719 0,0 1.0329466,0.01 2.2880892,0.01 l 2.2820868,0 0,-0.5719 z m -7.9992578,0 0,-0.2839 1.1395927,0 1.1394925,0 0,0.2839 0,0.2837 -1.1394925,0 -1.1395927,0 0,-0.2837 z" />
            </svg>
            <h2 class="text-gray-500 font-semibold text-2xl">Share</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Share & Embed this template as a Form
            </p>
          </button>

          <!-- <button
            v-if="appMode === 'auth'"
            @click="changeOption('api')"
            class="w-full relative bg-white p-3 flex justify-center items-center flex-col gap-2 rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
          >
            <svg
              class="w-14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.89001 9C7.87001 9.49 8.71001 10.23 9.32001 11.15C9.67001 11.67 9.67001 12.34 9.32001 12.86C8.71001 13.77 7.87001 14.51 6.89001 15"
                stroke="#9CA3AF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 15H17"
                stroke="#9CA3AF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#9CA3AF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h2 class="text-gray-500 font-semibold text-2xl">API</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Generate Content using API
            </p>
          </button> -->


          <button v-if="editorData.category === 'my'" @click="changeOption('popup')"
            class="w-full relative bg-white p-3 flex justify-center items-center flex-col gap-2 rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg">

            <svg fill="#9ca3af" class="w-14" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
              <title>popup</title>
              <path
                d="M28,4H10A2.0059,2.0059,0,0,0,8,6V20a2.0059,2.0059,0,0,0,2,2H28a2.0059,2.0059,0,0,0,2-2V6A2.0059,2.0059,0,0,0,28,4Zm0,16H10V6H28Z" />
              <path
                d="M18,26H4V16H6V14H4a2.0059,2.0059,0,0,0-2,2V26a2.0059,2.0059,0,0,0,2,2H18a2.0059,2.0059,0,0,0,2-2V24H18Z" />
              <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32"
                height="32" />
            </svg>
            <h2 class="text-gray-500 font-semibold text-2xl">Popup</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Use this template as website Popup
            </p>
          </button>
          <button v-if="editorData.category === 'my'" @click="changeOption('banner')"
            class="w-full relative bg-white p-3 flex justify-center items-center flex-col gap-2 rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg">
            <svg class="w-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6H6V11H18V6Z" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M6 16H18" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M3.5 2H20.5C21.3284 2 22 2.67157 22 3.5V20.5C22 21.3284 21.3284 22 20.5 22H3.5C2.67157 22 2 21.3284 2 20.5V3.5C2 2.67157 2.67157 2 3.5 2Z"
                stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h2 class="text-gray-500 font-semibold text-2xl">Banner</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Use this template as website banner
            </p>
          </button>
          <button v-if="appMode === 'noAuth'" @click="changeOption('email')"
            class="w-full relative bg-white p-3 flex justify-center items-center flex-col gap-2 rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg">
            <ProTag />
            <svg class="w-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="style=linear">
                <g id="email">
                  <path id="vector"
                    d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                    stroke="#9ca3af" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path id="vector_2"
                    d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
                    stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" />
                </g>
              </g>
            </svg>
            <h2 class="text-gray-500 font-semibold text-2xl">Email</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Write Beautiful mail with this template
            </p>
          </button>

          <button v-if="appMode === 'noAuth'" @click="changeOption('thumbnail')"
            class="w-full relative bg-white p-3 flex justify-center items-center flex-col gap-2 rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg">

            <svg class="w-14 h-14 fill-gray-500" viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>wordpress</title>
              <path
                d="M1.563 16.219c0-1.375 0.281-2.656 0.813-3.813l4.469 12.25c-3.125-1.5-5.281-4.719-5.281-8.438zM17.281 15.75c0 0.813-0.313 1.719-0.719 3.031l-0.938 3.125-3.406-10.094c0.563-0.031 1.094-0.094 1.094-0.094 0.5-0.063 0.438-0.781-0.063-0.75 0 0-1.531 0.094-2.5 0.094-0.938 0-2.469-0.094-2.469-0.094-0.5-0.031-0.563 0.719-0.063 0.75 0 0 0.469 0.063 0.969 0.094l1.469 4-2.063 6.156-3.406-10.156c0.563-0.031 1.063-0.094 1.063-0.094 0.531-0.063 0.469-0.781-0.063-0.75 0 0-1.5 0.094-2.5 0.094h-0.594c1.688-2.531 4.563-4.219 7.844-4.219 2.438 0 4.656 0.938 6.344 2.469-0.063-0.031-0.094-0.031-0.125-0.031-0.938 0-1.594 0.813-1.594 1.688 0 0.75 0.469 1.406 0.938 2.188 0.344 0.625 0.781 1.438 0.781 2.594zM8.281 25.219l2.813-8.188 2.906 7.906c0 0.063 0.031 0.094 0.063 0.125-0.969 0.344-2.031 0.531-3.125 0.531-0.906 0-1.813-0.125-2.656-0.375zM19.156 11.719c0.75 1.344 1.156 2.875 1.156 4.5 0 3.469-1.875 6.469-4.656 8.125l2.875-8.313c0.531-1.313 0.688-2.406 0.688-3.344 0-0.344 0-0.656-0.063-0.969zM10.938 5.281c6.031 0 10.938 4.906 10.938 10.938s-4.906 10.938-10.938 10.938-10.938-4.906-10.938-10.938 4.906-10.938 10.938-10.938zM10.938 26.656c5.75 0 10.438-4.688 10.438-10.438s-4.688-10.438-10.438-10.438-10.438 4.688-10.438 10.438 4.688 10.438 10.438 10.438z">
              </path>
            </svg>
            <h2 class="text-gray-500 font-semibold text-2xl">Thumbnail</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Make Featured image using this template
            </p>
          </button>

          <button v-if="appMode === 'noAuth' && isWooExists" @click="changeOption('productImage')"
            class="w-full relative bg-white p-3 flex justify-center items-center flex-col gap-2 rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 hover:shadow-lg">


            <svg class="w-14 h-14 fill-gray-500" viewBox="0 -51.5 256 256" xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid">
              <path
                d="M23.759 0h208.378C245.325 0 256 10.675 256 23.863v79.541c0 13.188-10.675 23.863-23.863 23.863H157.41l10.257 25.118-45.109-25.118H23.863c-13.187 0-23.862-10.675-23.862-23.863V23.863C-.104 10.78 10.57 0 23.759 0z"
                fill="#9B5C8F" />
              <path
                d="M14.578 21.75c1.457-1.978 3.642-3.018 6.556-3.226 5.308-.417 8.326 2.08 9.054 7.492 3.226 21.75 6.764 40.17 10.51 55.259l22.79-43.395c2.082-3.955 4.684-6.036 7.806-6.244 4.579-.312 7.388 2.601 8.533 8.741 2.602 13.84 5.932 25.6 9.886 35.59 2.706-26.432 7.285-45.476 13.737-57.235 1.56-2.914 3.85-4.371 6.868-4.58 2.394-.207 4.579.521 6.556 2.082 1.977 1.561 3.018 3.538 3.226 5.932.104 1.873-.208 3.434-1.04 4.995-4.059 7.493-7.39 20.085-10.095 37.567-2.601 16.963-3.538 30.18-2.914 39.65.209 2.6-.208 4.89-1.248 6.868-1.25 2.289-3.122 3.538-5.516 3.746-2.706.208-5.515-1.04-8.221-3.85-9.678-9.887-17.379-24.664-22.998-44.332-6.765 13.32-11.76 23.31-14.986 29.97-6.14 11.76-11.343 17.796-15.714 18.108-2.81.208-5.203-2.186-7.284-7.18-5.307-13.633-11.031-39.962-17.17-78.986-.417-2.706.207-5.1 1.664-6.972zm223.636 16.338c-3.746-6.556-9.262-10.51-16.65-12.072-1.978-.416-3.85-.624-5.62-.624-9.99 0-18.107 5.203-24.455 15.61-5.412 8.845-8.117 18.627-8.117 29.346 0 8.013 1.665 14.881 4.995 20.605 3.746 6.556 9.262 10.51 16.65 12.071 1.977.417 3.85.625 5.62.625 10.094 0 18.211-5.203 24.455-15.61 5.411-8.95 8.117-18.732 8.117-29.45.104-8.117-1.665-14.882-4.995-20.501zm-13.112 28.826c-1.457 6.868-4.059 11.967-7.91 15.401-3.017 2.706-5.827 3.85-8.428 3.33-2.498-.52-4.58-2.705-6.14-6.764-1.25-3.226-1.873-6.452-1.873-9.47 0-2.601.208-5.203.728-7.596.937-4.267 2.706-8.43 5.515-12.384 3.435-5.1 7.077-7.18 10.823-6.452 2.498.52 4.58 2.706 6.14 6.764 1.249 3.226 1.873 6.452 1.873 9.47 0 2.706-.208 5.307-.728 7.7zm-52.033-28.826c-3.746-6.556-9.366-10.51-16.65-12.072-1.977-.416-3.85-.624-5.62-.624-9.99 0-18.107 5.203-24.455 15.61-5.411 8.845-8.117 18.627-8.117 29.346 0 8.013 1.665 14.881 4.995 20.605 3.746 6.556 9.262 10.51 16.65 12.071 1.978.417 3.85.625 5.62.625 10.094 0 18.211-5.203 24.455-15.61 5.412-8.95 8.117-18.732 8.117-29.45 0-8.117-1.665-14.882-4.995-20.501zm-13.216 28.826c-1.457 6.868-4.059 11.967-7.909 15.401-3.018 2.706-5.828 3.85-8.43 3.33-2.497-.52-4.578-2.705-6.14-6.764-1.248-3.226-1.872-6.452-1.872-9.47 0-2.601.208-5.203.728-7.596.937-4.267 2.706-8.43 5.516-12.384 3.434-5.1 7.076-7.18 10.822-6.452 2.498.52 4.58 2.706 6.14 6.764 1.25 3.226 1.873 6.452 1.873 9.47.105 2.706-.208 5.307-.728 7.7z"
                fill="#FFF" />
            </svg>

            <h2 class="text-gray-500 font-semibold text-2xl">Product Image</h2>
            <p class="bg-blue-100 text-blue-500 px-2 py-2 rounded-md">
              Make Woocommerce Product Image
            </p>
          </button>
        </div>
        <!-- Options -->
        <div class="w-full" v-if="selectedOption">
          <div
            class="flex z-20 rounded items-center sticky top-0 py-2 bg-white dark:bg-gray-900 justify-between w-full px-3 mt-4">
            <!-- back button -->
            <button v-if="!TempData.optionType"
              class="flex gap-2 dark:bg-gray-900 md:w-32 w-full shadow-md px-3 py-2 bg-gray-100 rounded"
              @click="selectedOption = null">
              <svg class="w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z"
                  fill="#9CA3AF" />
              </svg>
              <span>Go Back</span>
            </button>
            <!-- option icon -->

          </div>

          <!-- Printing -->
          <div v-if="selectedOption === 'print'" class="w-full flex flex-col justify-between">
            <div class="text-center bg-gray-800 mx-3 rounded text-white font-semibold py-1">
              Generate static/dynamic labels or PDF file
            </div>


            <div v-if="bulkCreateMode === 'classic'" class="w-full">
              <!-- Dynamic printing mode button -->
              <div :class="{
                'right-2.5': canvasContainer.semitic === 'rtl',
                'left-2.5': canvasContainer.semitic !== 'rtl',
              }"
                class="top-3 text-gray-400 bg-transparent rounded-lg text-sm px-4 pt-5 mr-auto inline-flex items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="dynamic" type="checkbox" value="" class="sr-only peer" />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                  </div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dynamic</span>
                </label>
              </div>
              <!-- If staticMode  -->
              <div v-if="staticMode" class="flex flex-col justify-between rounded mx-2 my-5 px-2 h-full">
                <div class="flex flex-col" v-if="canvas">
                  <ol
                    class="md:sticky top-5 z-10 bg-gray-100 px-2 py-3 rounded-md shadow-md items-center w-full gap-10 space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
                    <li @click="selectStep('step1')" :class="{
                      'text-blue-600 dark:text-blue-500': staticData.step1,
                    }" class="flex items-center space-x-2.5 cursor-pointer">
                      <span :class="{
                        'border-blue-600 dark:border-blue-500':
                          staticData.step1,
                      }" class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0">
                        1
                      </span>
                      <span>
                        <h3 class="font-medium leading-tight">Update</h3>
                        <p class="text-sm">Change template data</p>
                        <p></p>
                      </span>
                    </li>
                    <li @click="selectStep('step2')" :class="{
                      'text-blue-600 dark:text-blue-500': staticData.step2,
                    }" class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 cursor-pointer">
                      <span :class="{
                        'border-blue-600 dark:border-blue-500':
                          staticData.step2,
                      }"
                        class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0 dark:border-gray-400">
                        2
                      </span>
                      <span>
                        <h3 class="font-medium leading-tight">Generate</h3>
                        <p class="text-sm">Configure and Output</p>
                        <p></p>
                      </span>
                    </li>
                  </ol>
                  <!-- Fields -->
                  <div v-if="staticData.step1" class="w-full py-5">
                    <Form :container="getContainer()" :fields="fields" />
                  </div>

                  <div class="py-1 md:flex md:flex-col" v-if="staticData.step2">
                    <!-- Choose mass generation option -->

                    <div class="w-full">
                      <div class="w-full flex pt-5 justify-center">

                      </div>
                    </div>

                    <div class="w-full" v-if="bulkCreateOutputMode === 'pdf'">
                      <!-- PDF generation -->

                      <!-- document details -->
                      <div class="w-full">
                        <div class="pb-2">Configuration</div>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                          <table class="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                            <thead
                              class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                              <tr>
                                <th scope="col" class="px-6 py-3">
                                  Settings name
                                </th>
                                <th scope="col" class="px-6 py-3">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                                <th scope="row"
                                  class="px-6 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                  Label Size
                                </th>
                                <td class="px-6 py-2">
                                  {{ selected.props.cellWidth }} X
                                  {{ selected.props.cellHeight }} px
                                </td>
                              </tr>

                              <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                                <th scope="row"
                                  class="px-6 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                  Label Padding Left
                                </th>
                                <td class="px-6 py-2">
                                  {{ selected.props.cellPaddingLeft }} px
                                </td>
                              </tr>
                              <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                                <th scope="row"
                                  class="px-6 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                  Label Padding Top
                                </th>
                                <td class="px-6 py-2">
                                  {{ selected.props.cellPaddingTop }} px
                                </td>
                              </tr>
                              <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                                <th scope="row"
                                  class="px-6 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                  Page Size
                                </th>
                                <td class="px-6 py-2">
                                  {{ selected.props.pageWidth }} x
                                  {{ selected.props.pageHeight }} px
                                </td>
                              </tr>
                              <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                                <th scope="row"
                                  class="px-6 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                  Page Margin Top
                                </th>
                                <td class="px-6 py-2">
                                  {{ selected.props.pageMarginTop }} px
                                </td>
                              </tr>
                              <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                                <th scope="row"
                                  class="px-6 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                  Page Margin Left
                                </th>
                                <td class="px-6 py-2">
                                  {{ selected.props.pageMarginLeft }} px
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="w-full py-3 items-center flex gap-5 justify-between">
                        <div class="flex gap-5 justify-between">
                          <div class="md:w-32">
                            <label for="countries"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                              Quality</label>
                            <select @change="setQuality"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option :selected="defaultQulaity === q.amount" :value="q.amount" v-for="(q, i) in quality"
                                :key="i">
                                {{ q.value.toLocaleLowerCase() }}
                              </option>
                            </select>
                          </div>
                          <div class="md:w-32">
                            <h2 class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                              Label count
                            </h2>
                            <input
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              type="number" :value="selected.props.numberOfCellPrint" @input="(e) =>
                                (selected.props.numberOfCellPrint =
                                  e.target.value)
                                " />
                          </div>
                        </div>
                        <PrintBtnVue class="md:w-40 rounded-md shadow text-white bg-blue-500" text="Download PDF"
                          printmode="static" :editor="canvas" :config="getConfig()" :printconfig="getPrintConfig()" />
                      </div>
                    </div>
                    <div v-if="bulkCreateOutputMode === 'image'">
                      Coming soon..
                    </div>
                  </div>

                  <div class="py-5">
                    <button v-if="staticData.step1" @click="selectStep('step2')"
                      class="px-5 py-2 bg-blue-500 text-white rounded md:w-auto w-full shadow-sm text-center">
                      Next
                    </button>
                    <button v-if="staticData.step2" @click="selectStep('step1')"
                      class="px-5 py-2 bg-blue-500 text-white rounded md:w-auto w-full shadow-sm text-center">
                      Back
                    </button>
                  </div>
                </div>
              </div>

              <!-- If dynamicMode -->
              <div v-if="!staticMode" class="flex flex-col justify-between rounded mx-2 my-5 px-2 h-full">
                <div class="flex flex-col" v-if="canvas">
                  <ol
                    class="sticky justify-between px-3 top-5 md:top-0 z-20 bg-gray-100 px-2 py-3 rounded-md shadow-md items-center w-full gap-5 space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
                    <li @click="selectStep('step1', false)" :class="{
                      'text-blue-600 dark:text-blue-500': dynamicData.step1,
                    }" class="flex items-center space-x-2.5 cursor-pointer">
                      <span :class="{
                        'border-blue-600 dark:border-blue-500':
                          dynamicData.step1,
                      }" class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0">
                        1
                      </span>
                      <span>
                        <h3 class="font-medium leading-tight">Import Data</h3>

                      </span>
                    </li>
                    <li @click="selectStep('step2', false)" :class="{
                      'text-blue-600 dark:text-blue-500': dynamicData.step2,
                    }" class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 cursor-pointer">
                      <span :class="{
                        'border-blue-600 dark:border-blue-500':
                          dynamicData.step2,
                      }"
                        class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0 dark:border-gray-400">
                        2
                      </span>
                      <span>
                        <h3 class="font-medium leading-tight">Field Mapping</h3>

                      </span>
                    </li>
                    <li @click="selectStep('step3', false)" :class="{
                      'text-blue-600 dark:text-blue-500': dynamicData.step3,
                    }" class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 cursor-pointer">
                      <span :class="{
                        'border-blue-600 dark:border-blue-500':
                          dynamicData.step3,
                      }"
                        class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0 dark:border-gray-400">
                        3
                      </span>
                      <span>
                        <h3 class="font-medium leading-tight">Generate</h3>

                      </span>
                    </li>
                  </ol>
                  <div class="py-5" v-if="dynamicData.step1">
                    <div class="flex py-5 w-full rounded-md" role="group">
                      <button @click="setDataImportMode('upload')" type="button"
                        class="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Upload
                      </button>
                      <button @click="setDataImportMode('api')" type="button"
                        class="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Import from API
                      </button>

                    </div>
                    <DataUploader :container="getContainer()" class="py-5"
                      v-if="dynamicData.dataImportMode === 'upload'" />
                    <div v-if="dynamicData.dataImportMode === 'api'" class="relative">
                      <ProOverlay />
                      <DataImport :container="getContainer()" />
                    </div>

                    <DataTable :chooseTemplate="false" :buttons="false" class="h-full overflow-clip mt-10"
                      :data="getData()" :container="getContainer()" :tableVisible="false" />
                  </div>

                  <div class="py-5" v-if="dynamicData.step2">
                    <DataMpaing :container="getContainer()" />
                  </div>
                  <div class="py-5" v-if="dynamicData.step3">
                    <PrintSettings :container="getContainer()" :hidePrintModeBtn="true" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Export -->
          <div class="w-full px-3 py-2" v-if="selectedOption === 'export'">
            <div class="text-center bg-gray-800 my-2 rounded text-white font-semibold py-1">
              Update values and download with ease using user-friendly form
              below 👇
            </div>
            <Form :container="getContainer()" :fields="fields" />

            <!-- Download options -->
            <DownloadOptionsVue class="sticky mt-3 bg-white dark:bg-gray-900 shadow px-3 rounded bottom-0"
              :appMode="appMode" :exportURL="exportURL" :container="getContainer()" />
          </div>

          <!-- API -->
          <!-- <div v-if="selectedOption === 'api'">
            <API :template="editorData" :fields="fields" />
          </div> -->

          <!-- Share -->
          <div v-if="selectedOption === 'share'">
            <Share :template="editorData" />
          </div>

          <!-- Banner -->

          <div v-if="selectedOption === 'banner' && editorData.category === 'my'">
            <Banner :template="editorData" />
          </div>

          <!-- Popup -->

          <div v-if="selectedOption === 'popup' && editorData.category === 'my'">
            <Popup :template="editorData" />
          </div>

          <!-- Email -->
          <div v-if="selectedOption === 'email' && appMode === 'noAuth'">
            <Email :template="editorData" :container="getContainer()" :fields="fields" />
          </div>

          <!-- thumbnail -->
          <div v-if="selectedOption === 'thumbnail' && appMode === 'noAuth'">

            <!-- <Form :container="container" :fields="fields" /> -->
            <Thumbnail :container="getContainer()" :fields="fields" />
          </div>

          <!-- product Image -->
          <div v-if="selectedOption === 'productImage' && appMode === 'noAuth'">
            <Thumbnail :woo="true" :container="getContainer()" :fields="fields" />
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div
        class="md:w-full md:block hidden bg-white rounded-md px-5 sticky top-0 w-full dark:bg-gray-500 items-center justify-center py-5">
        <div class="w-full h-full flex justify-center" id="templateStage">
          <div class="flex justify-center" id="templateCanvas"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { Editor } from "../../../src/editor";
import { canvasContainer } from "../../store/editor";
import { userData } from "../../store/user";
import { dataSettings } from "../../store/data";
import SmallLoading from "../SmallLoading.vue";

const ProTag = defineAsyncComponent(() => import("../Tags/IsPro.vue"));


// import PrintBtnVue from "../Header/parts/PrintBtn.vue";
const PrintBtnVue = defineAsyncComponent(() =>
  import("../Header/parts/PrintBtn.vue")
);

// import DataUploader from "../../components/Data/DataUploader.vue";
const DataUploader = defineAsyncComponent(() =>
  import("../../components/Data/DataUploader.vue")
);

// import DataTable from "../../components/Data/DataTable.vue";
const DataTable = defineAsyncComponent(() =>
  import("../../components/Data/DataTable.vue")
);

// import DataImport from "../Data/DataImport.vue";
const DataImport = defineAsyncComponent(() => import("../Data/DataImport.vue"));



// import DataMpaing from "../../components/Tools/parts/Datamapping/Index.vue";
const DataMpaing = defineAsyncComponent(() =>
  import("../../components/Tools/parts/Datamapping/Index.vue")
);

// import PrintSettings from "../../components/Tools/parts/PrintSettings/Index.vue";
const PrintSettings = defineAsyncComponent(() =>
  import("../../components/Tools/parts/PrintSettings/Index.vue")
);

// import Form from "./Form.vue";
const Form = defineAsyncComponent(() => import("./Form.vue"));

// import DownloadOptionsVue from "./DownloadOptions.vue";
const DownloadOptionsVue = defineAsyncComponent(() =>
  import("./DownloadOptions.vue")
);

// import Share from "./Share.vue";
const Share = defineAsyncComponent(() => import("./Share.vue"));

const Email = defineAsyncComponent(() => import("./Email.vue"));

// import Banner from "./Banner.vue";
const Banner = defineAsyncComponent({
  loader: () => import("./Banner.vue"),
  // A component to use while the async component is loading
  loadingComponent: SmallLoading,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000,
});

const ProOverlay = defineAsyncComponent(() => import("../ProOverlay.vue"));
const Popup = defineAsyncComponent({
  loader: () => import("./Popup.vue"),
  // A component to use while the async component is loading
  loadingComponent: SmallLoading,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000,
});

// import API from "./API.vue";
// const API = defineAsyncComponent(() => import("./API.vue"));
const Thumbnail = defineAsyncComponent(() => import('./Thumbnail.vue'));

import { useToast } from "vue-toastification";
import { TempData } from "../../store/temp";
export default {
  props: ["selected"],
  components: {
    DownloadOptionsVue,

    PrintSettings,
    DataMpaing,
    PrintBtnVue,
    DataUploader,
    DataTable,
    DataImport,
    Form,
    Share,
    // API,
    Banner,
    Popup,
    ProOverlay,
    ProTag,
    Email,
    Thumbnail
  },
  watch: {
    selected: function (newVal, oldVal) {
      this.setDefault();
      this.editorData = newVal;
      this.applyOnCanvas().then((e) => {
        this.fields = this.getFields();
      });
      this.staticMode =
        this.selected.props.printMode === "static" ? true : false;
    },
    dynamic: function (newVal, oldVal) {
      this.staticMode = !newVal;
      if (newVal) {
        this.selected.props.printMode = "dynamic";
      } else {
        this.selected.props.printMode = "static";
      }
    },
  },
  data() {
    return {
      userData,
      TempData,
      dynamic: null,
      hideDataTable: true,
      dataSettings,
      defaultQulaity: 3,
      defaultCellQuantity: 1,
      selectedOption: null,
      bulkCreateMode: "classic",
      bulkCreateOutputMode: "pdf",
      quality: [
        {
          amount: 1,
          value: "Low",
        },
        {
          amount: 2,
          value: "Medium",
        },
        {
          amount: 3,
          value: "High",
        },
      ],
      canvasContainer,
      staticMode: true,
      staticData: {
        step1: true,
        step2: false,
      },
      exportData: {
        step1: true,
        step2: false,
      },
      dynamicData: {
        step1: true,
        step2: false,
        step3: false,
        dataImportMode: "upload",
      },
      editorData: this.selected,
      canvas: null,
      fields: null,
    };
  },
  methods: {
    setDefault() {
      this.dynamic = null;
      this.hideDataTable = true;
      this.defaultQulaity = 3;
      this.defaultCellQuantity = 1;
      this.selectedOption = null;
      this.quality = [
        {
          amount: 1,
          value: "Low",
        },
        {
          amount: 2,
          value: "Medium",
        },
        {
          amount: 3,
          value: "High",
        },
      ];
      this.staticMode = true;
      this.staticData = {
        step1: true,
        step2: false,
      };
      this.exportData = {
        step1: true,
        step2: false,
      };
      this.dynamicData = {
        step1: true,
        step2: false,
        step3: false,
        dataImportMode: "upload",
      };
      this.canvas = null;
      this.fields = null;
    },
    changeOption(option) {
      if (this.userData.meta.isExpired && this.appMode != "noAuth") {
        this.toast.error(
          "Your subscription expired please upgrade your account.",
          {
            position: "top-center",
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: "button",
            icon: true,
            rtl: false,
          }
        );

        return;
      }
      this.selectedOption = option;
    },
    getContainer() {
      let data = this.selected.props;
      data.editor = this.canvas;
      return data;
    },

    getData() {
      if (this.selected.props.sheetData) {
        return this.selected.props.sheetData;
      }
      return canvasContainer.sheetData;
    },
    setDataImportMode(mode) {
      this.dynamicData.dataImportMode = mode;
    },
    getFormat: function () {
      if (
        this.selected.props.pageWidth === this.selected.props.cellWidth &&
        this.selected.props.pageHeight === this.selected.props.cellHeight
      ) {
        this.selected.props.format = "custom";
      }
      if (this.selected.props.format === "custom") {
        return [this.selected.props.pageWidth, this.selected.props.pageHeight];
      }
      return this.selected.props.format;
    },

    getOrientation() {
      if (this.selected.props.format === "custom") {
        if (this.selected.props.pageWidth > this.selected.props.pageHeight) {
          return "l";
        }

        return "p";
      }
      return "p";
    },

    getPrintConfig() {
      return {
        pageWidth: this.selected.props.pageWidth,
        pageHeight: this.selected.props.pageHeight,
        cellWidth: this.selected.props.cellWidth,
        cellHeight: this.selected.props.cellHeight,
        cellPadding: this.selected.props.cellPadding,
        pageMargin: this.selected.props.pageMargin,
        pageMarginLeft: this.selected.props.pageMarginLeft,
        pageMarginTop: this.selected.props.pageMarginTop,
        cellPaddingLeft: this.selected.props.cellPaddingLeft,
        cellPaddingTop: this.selected.props.cellPaddingTop,
        docSize: {
          orientation: this.getOrientation(),
          unit: "pt",
          format: this.getFormat(),
        },
      };
    },
    getConfig() {
      if (this.staticMode) {
        return {
          canvasContainer: this.selected.props,
        };
      }

      return {
        sheetData: this.selected.props.sheetData,
        mappedData: this.selected.props.mappedData,
        printQuality: this.selected.props.printQuality,
        ignoreFirstRow: this.selected.props.ignoreFirstRow,
        dataSelection: this.selected.props.dataSelection,
        selectedData: this.selected.props.selectedData,
        cellWidth: this.selected.props.cellWidth,
        cellHeight: this.selected.props.cellHeight,
        range: this.selected.props.range,
      };
    },
    setDataSelection: function (value) {
      dataSettings.dataSelection = value;
    },
    setQuality: function (e) {
      this.selected.props.printQuality = e.target.value;
    },
    getDetails() { },
    selectStep(step, isStatic = true, forExport = false) {
      let type = "staticData";

      if (!isStatic) {
        type = "dynamicData";
      }
      if (forExport) {
        type = "exportData";
      }
      for (const stp in this[type]) {
        if (step === stp) {
          this[type][stp] = true;
        } else {
          this[type][stp] = false;
        }
      }
    },
    error(message) {
      const toast = useToast();
      toast.error(message, {
        position: "top-center",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },

    getFields() {
      let elements = [];
      this.canvas.layer.find("Text,Image").forEach((e) => {
        if (
          e.attrs.type === "qrcode" ||
          e.attrs.type === "text" ||
          e.attrs.type === "barcodeBasic" ||
          e.attrs.type === "barcode" ||
          e.attrs.type === "image"
        ) {
          if (
            !e.getAttr("nonEditable") ||
            e.getAttr("nonEditable") === undefined
          ) {
            elements.push(e);
          }
        }
      });

      return elements;
    },
    applyOnCanvas() {
      return new Promise((resolve, reject) => {

        const config = {
          width: parseInt(this.selected.props.cellWidth),
          height: parseInt(this.selected.props.cellHeight),
          container: "templateCanvas",
          containerWrapper: "templateStage",
          pageHeight: parseInt(this.selected.props.pageHeight),
          pageWidth: parseInt(this.selected.props.pageWidth),
          dragging: false,
          readOnly: true,
        };

        const editor = new Editor(config);
        editor.readOnly = true;
        this.canvas = editor;
        window.widget = editor;
        try {
          editor.fitIntoContainer();
        } catch (e) { }
        window.addEventListener("resize", function () {
          try {
            editor.fitIntoContainer();
          } catch (e) { }
        });

        let data = this.editorData;
        let store = data.props;

        editor.editorWidth = parseInt(store.cellWidth);
        editor.editorHeight = parseInt(store.cellHeight);
        // Import data from local storage
        try {
          editor.ImportData.source(data.data);
          setTimeout(() => {
            editor.transform.nodes([]);
            editor.fitIntoContainer();
            editor.selectEvent.data = null;
            document.dispatchEvent(editor.selectEvent);
            resolve();
          }, 100);

          editor.fitIntoContainer();
        } catch (e) { reject() }

      });
    },
  },
  mounted() {
    this.applyOnCanvas().then((e) => {
      this.fields = this.getFields();
    });

    if (TempData.optionType) {
      this.changeOption(TempData.optionType);
    }

    this.staticMode = this.selected.props.printMode === "static" ? true : false;
  },
};
</script>

<style >
.active {
  background: white;
  border-radius: 9999px;
  color: #0ea5e9;
}

.konvajs-content {
  background: none;
}

.konvajs-content>canvas {
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>