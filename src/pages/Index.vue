<template>
  <div class="bg-gray-100 min-h-screen antialias font-sans text-gray-900">
    <div class="bg-gray-900 text-white text-center p-2 text-xs">
      
    </div>

    <div class="p-6 pb-0">
      <div class="font-serif text-2xl">{{ $page.books.edges.length }} books so far</div>
      <div class="text-gray-500">A little experiment using Gridsome and Puppeteer 💪</div>
    </div>
    <div class=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 auto-rows-min p-6">
      <div v-for="edge in $page.books.edges" :key="edge.node.title">
        <div class="w-full relative overflow-hidden rounded shadow-2xl" style="padding-bottom: 150%">
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
