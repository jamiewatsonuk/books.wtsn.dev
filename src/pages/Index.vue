<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="bg-gray-900 text-white text-center p-2 text-xs">
      A little experiment using Gridsome and Puppeteer 💪
    </div>
    <div class=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-9 auto-rows-min">
      <div v-for="edge in $page.books.edges" :key="edge.node.title">
        <div class="w-full relative" style="padding-bottom: 150%">
          <g-image
            :src="edge.node.localImage"
            class="absolute w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Books",
  },
};
</script>

<page-query>
query {
  books: allBooks {
    edges {
      node {
        author
        title
        image
        localImage
      }
    }
  }
}
</page-query>
