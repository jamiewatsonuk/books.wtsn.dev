<template>
  <div class="min-h-screen font-sans text-gray-900 bg-gray-100 antialias">
    <div class="max-w-6xl mx-auto">
      <div class="p-6 pb-0">
        <div class="font-serif text-2xl">
          {{ $page.books.edges.length }} books read so far
        </div>
      </div>
      <div
        class="grid grid-cols-3 gap-6 p-6 md:grid-cols-4 lg:grid-cols-8 auto-rows-min"
      >
        <div v-for="edge in $page.books.edges" :key="edge.node.title">
          <div
            class="relative w-full overflow-hidden rounded shadow-2xl"
            style="padding-bottom: 150%"
          >
            <g-image
              :src="edge.node.localImage"
              class="absolute object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      <div class="p-6 pb-0">
        <div class="font-serif text-2xl">
          {{ $page.upcomingBooks.edges.length }} books queued
        </div>
      </div>
      <div
        class="grid grid-cols-3 gap-6 p-6 md:grid-cols-4 lg:grid-cols-8 auto-rows-min"
      >
        <div v-for="edge in $page.upcomingBooks.edges" :key="edge.node.title">
          <div
            class="relative w-full overflow-hidden rounded opacity-25"
            style="padding-bottom: 150%"
          >
            <g-image
              :src="edge.node.localImage"
              class="absolute object-cover w-full h-full"
            />
          </div>
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
  current: allBooks (limit: 1, filter: {shelf: {eq: "currently-reading"}}) {
    edges {
      node {
        author
        title
        image
        localImage
      }
    }
  }
  books: allBooks (sortBy: "read", order: DESC, filter: {shelf: {eq: "read"}}) {
    edges {
      node {
        author
        title
        image
        localImage
        read
      }
    }
  }
  upcomingBooks: allBooks (filter: {shelf: {eq: "to-read"}}) {
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
