<template>
  <div class="w-full container mx-auto">
    <div v-if="appMode != 'noAuth'" class="w-full grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-5">
      <div
        class="w-full flex flex-col justify-center gap-5 items-center w-full dark:bg-gray-900 bg-white rounded-md shadow-md px-5 py-5">
        <span class="text-gray-500 font-semibold text-xl">Your Plan</span>
        <div class="text-gray-600 font-extrabold text-5xl">
          {{ dashboard.plan }}
        </div>
      </div>
      <div class="grid md:grid-cols-1 gap-5">
        <div class="grid md:grid-cols-2 gap-5">
          <div class="w-full dark:bg-gray-900 bg-white rounded-md shadow-md px-5 py-5">
            <span class="text-gray-500 font-semibold text-xl">Image Storage</span>
            <div class="text-gray-600 font-extrabold text-4xl">
              {{ dashboard.imageStorage }} MB
            </div>
          </div>
          <div class="w-full dark:bg-gray-900 bg-white rounded-md shadow-md px-5 py-5">
            <span class="text-gray-500 font-semibold text-xl">PDF Storage</span>
            <div class="text-gray-600 font-extrabold text-4xl">
              {{ dashboard.pdfStorage }} MB
            </div>
          </div>
        </div>
        <div class="w-full dark:bg-gray-900 bg-white rounded-md shadow-md px-5 py-5">
          <span class="text-gray-500 font-semibold text-xl">Next Billing Date</span>
          <div class="text-gray-600 font-extrabold text-3xl">
            {{ dashboard.nextBillingDate }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex mr-5">
      <div class="w-full">
        <section class="dark:bg-gray-900">
          <div class="max-w-screen-xl px-4 py-8 mx-auto text-center  lg:px-6">
            <div class="flex mb-3 dark:bg-gray-900 bg-white py-5 rounded-md shadow flex-col items-center justify-center">
              <div class="mb-2 text-4xl md:text-6xl font-extrabold">
                {{ totalTemplates }}
              </div>
              <div class="font-light text-gray-500 dark:text-gray-400">
                Total Templates
              </div>
            </div>
           
          </div>
        </section>
      </div>
      <div class="w-full">
        <div class="w-full mt-8">

          <div
            class=" shadow-lg md:flex w-full px-10 py-5 rounded-md bg-white dark:bg-gray-700 justify-center items-center">


            <div class="w-full flex flex-col mb-5 gap-5">
              <h1 class="font-semibold text-2xl w-full dark:text-white">
                Make creatives easily
              </h1>

              <div class="flex flex-col md:flex-row gap-5">
                <button @click="goToCreateTemplate" class="bg-blue-500 text-white px-3 py-1 rounded-md">
                  Create Template
                </button>
                <!-- <button class="hover:bg-gray-300 text-gray-600 px-3 py-1 rounded-md">Learn more</button> -->
              </div>
            </div>

          
          </div>
        </div>
        <div class="w-full mt-8">

          <div
            class=" shadow-lg md:flex w-full px-10 py-5 rounded-md bg-white dark:bg-gray-700 justify-center items-center">


            <div class="w-full flex flex-col mb-5 gap-5">
              <h1 class="font-semibold text-2xl w-full dark:text-white">
                Learn how <span class="font-bold">LabelBaker</span> works
              </h1>

              <div class="flex flex-col md:flex-row gap-5">
                <button @click="goToDocumentation" class="bg-blue-500 text-white px-3 py-1 rounded-md">
                  Read Documentation
                </button>
                <!-- <button class="hover:bg-gray-300 text-gray-600 px-3 py-1 rounded-md">Learn more</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dashboard } from "../../store/dashboard";
import { userData } from "../../store/user";
import { files } from "../../store/files";
import { enc } from "../../libs/helper";
import { getTemplates } from "../../libs/template";
import { store } from "../../store/menu";
export default {
  data() {
    return {
      dashboard,
      userData,
      files,
      store,
      totalTemplates: "-",
      totalGeneratorTemplates: 0,
      totalBannerTemplates: 0,
      totalPopupTemplates: 0,
      totalAppsTemplates: 0,
      totalLabelsTemplates: 0,
      totalThumbnailTemplates: 0,
    };
  },
  methods: {
    goToDocumentation(){
      window.open('https://wpcox.com/docs-category/labelbaker/', '_blank');
    },
    goToCreateTemplate() {
      this.store.activeMenu = "home";
      this.store.activeTool = "newProject";
    },
    getPlan() {
      if (userData.meta.plan === "trial") {
        return "Trial";
      }
      return userData.meta.plan;
    },
    getNextBillingDate() {
      return new Date(this.userData.meta.expireDate).toDateString();
    },
    getFiles() {
      if (this.appMode !== "noAuth") {
        if (!this.files.data) {
          let email = enc(this.userData.details.email);
          fetch(this.serverEndpoint + "/get/" + email + "/files")
            .then((res) => res.json())
            .then((result) => {
              this.filesInfo = result;
              this.dashboard.imageStorage = (
                result.images.storage * 0.000001
              ).toFixed(2);
              this.dashboard.pdfStorage = (
                result.pdfs.storage * 0.000001
              ).toFixed(2);
            })
            .catch((e) => {
              console.log("Unable to fetch file information");
            });
        }
      }
    },
    templatesCount() {
      getTemplates(this.serverEndpoint, "this.user.email", this.appMode).then(
        (templates) => {

          this.totalTemplates = templates.length;
          templates.forEach(template => {

            if (template.templateTypes.includes('generator')) {
              this.totalGeneratorTemplates++;
            }

            if (template.templateTypes.includes('banner')) {
              this.totalBannerTemplates++;
            }

            if (template.templateTypes.includes('popup')) {
              this.totalPopupTemplates++;
            }

            if (template.templateTypes.includes('app')) {
              this.totalAppsTemplates++;
            }

            if (template.templateTypes.includes('label')) {
              this.totalLabelsTemplates++;
            }
            if (template.templateTypes.includes('thumbnail')) {
              this.totalThumbnailTemplates++;
            }
          })
        }
      );
    },
  },
  mounted() {
    // this.getFiles();
    this.templatesCount();
    this.dashboard.plan = this.getPlan();
    this.dashboard.nextBillingDate = this.getNextBillingDate();
  },
};
</script>