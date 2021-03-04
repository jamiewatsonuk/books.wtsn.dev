<template>
  <div class="min-h-screen font-sans text-gray-900 bg-gray-100 antialias">
    <div class="p-2 text-xs text-center text-white bg-gray-900">

    </div>

    <div class="p-6 pb-0">
      <div class="font-serif text-2xl">{{ $page.books.edges.length }} books read so far</div>
      <div class="text-gray-500">A little experiment using Gridsome and Puppeteer 💪</div>
    </div>
    <div class="grid grid-cols-3 gap-6 p-6 md:grid-cols-4 lg:grid-cols-8 auto-rows-min">
      <div v-for="edge in $page.books.edges" :key="edge.node.title">
        <div class="relative w-full overflow-hidden rounded shadow-2xl" style="padding-bottom: 150%">
          <g-image
            :src="edge.node.localImage"
            class="absolute object-cover w-full h-full"
          />
        </div>
      </div>
    </div>

    <div class="p-6 pb-0">
      <div class="font-serif text-2xl">{{ $page.upcomingBooks.edges.length }} books queued</div>
    </div>
    <div class="grid grid-cols-3 gap-6 p-6 md:grid-cols-4 lg:grid-cols-8 auto-rows-min">
      <div v-for="edge in $page.upcomingBooks.edges" :key="edge.node.title">
        <div class="relative w-full overflow-hidden rounded opacity-25" style="padding-bottom: 150%">
          <g-image
            :src="edge.node.localImage"
            class="absolute object-cover w-full h-full"
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
    upcomingBooks: allUpcomingBooks {
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
