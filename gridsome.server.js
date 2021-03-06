const Books = require('./Books');

const USER = process.env.GOODREADS_USER_ID;

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    const booksCollection = addCollection({typeName: 'books'});

    const [read, current, toRead] = await Promise.all([
      Books.getBooks(USER, "read"),
      Books.getBooks(USER, "currently-reading"),
      Books.getBooks(USER, "to-read"),
    ]);

    [...read, ...current, ...toRead].forEach((book) => booksCollection.addNode(book));
  })
}
