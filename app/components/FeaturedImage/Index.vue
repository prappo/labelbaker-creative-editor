<template>
  <div>
    <div v-if="woo">
      <div
        class="py-1 text-center font-semibold px-2 border-2 mb-2 rounded-full"
      >
        Set Products Image
      </div>
      <div class="overflow-y-scroll h-auto max-h-72" v-if="products">
        <PostComponent
          :container="container"
          v-for="(product, index) in products"
          :key="index"
          :post="product"
        />
      </div>
      <div v-else>No product found</div>
    </div>

    <div v-else>
      <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#featuredImageContent"
          role="tablist"
        >
          <li class="mr-2" role="presentation">
            <button
              class="inline-block p-4 border-b-2 rounded-t-lg"
              id="posts-tab"
              data-tabs-target="#posts"
              type="button"
              role="tab"
              aria-controls="posts"
              aria-selected="true"
              @click="selected = 'post'"
            >
              Posts
            </button>
          </li>
          <li class="mr-2" role="presentation">
            <button
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="pages-tab"
              data-tabs-target="#pages"
              type="button"
              role="tab"
              aria-controls="pages"
              aria-selected="false"
              @click="selected = 'page'"
            >
              Pages
            </button>
          </li>
        </ul>
      </div>
      <div id="featuredImageContent">
        <div
          v-if="selected === 'post'"
          class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="posts"
          role="tabpanel"
          aria-labelledby="posts-tab"
        >
          <div class="overflow-y-scroll h-auto max-h-72" v-if="posts">
            <PostComponent
              :container="container"
              v-for="(post, index) in posts"
              :key="index"
              :post="post"
            />
          </div>
          <div v-else>No post found</div>
        </div>
        <div
          class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="pages"
          role="tabpanel"
          aria-labelledby="pages-tab"
          v-if="selected === 'page'"
        >
          <div class="overflow-y-scroll h-auto max-h-72" v-if="pages">
            <PostComponent
              :container="container"
              v-for="(page, index) in pages"
              :key="index"
              :post="page"
            />
          </div>
          <div v-else>No page found</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const PostComponent = defineAsyncComponent(() => import("./Post.vue"));
export default {
  props: ["container", "woo"],
  components: { PostComponent },
  data() {
    return {
      posts: null,
      pages: null,
      products: null,
      selected: "post",
    };
  },
  mounted() {
    if (this.woo) {
      // get products

      wp.apiRequest({
        path: "labelbaker/v1/products",
      })
        .done((data) => {
          this.products = data;
        })
        .fail((err) => console.log(err));
    } else {
      // get posts
      wp.apiRequest({
        path: "wp/v2/posts?per_page=100",
      })
        .done((data) => {
          this.posts = data;
        })
        .fail((err) => console.log(err));

      // Get pages
      wp.apiRequest({
        path: "wp/v2/pages?per_page=100",
      })
        .done((data) => {
          this.pages = data;
        })
        .fail((err) => console.log(err));
    }
  },
};
</script>