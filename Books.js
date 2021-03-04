const FeedParser = require("feedparser");
const fetch = require("node-fetch");
const {parse} = require("date-fns");

const ALL = "%23ALL%23";

const fetchFeed = async (user, shelf, page) => {
  const feedparser = new FeedParser();
  const response = await fetch(`https://www.goodreads.com/review/list_rss/${user}?shelf=${shelf}&page=${page}`);

  response.body.pipe(feedparser);

  return new Promise((resolve, reject) => {
    const items = [];

    feedparser.on("error", function(error) {
      reject(error);
    });

    feedparser.on("readable", function() {
      let item;
      while ((item = this.read())) {
        items.push(item);
      }
    });

    feedparser.on("end", () => resolve(items));
  });
};

const fetchPagedFeed = async (user, shelf) => {
  const collectedBooks = [];
  let page = 1;

  let books;
  do {
    books = await fetchFeed(user, shelf, page++);
    collectedBooks.push(...books);
  } while (books.length > 0);

  return collectedBooks;
};

const transform = (apiBook, shelf) => {
  const read_at = (apiBook["rss:user_read_at"] || {})["#"];

  return {
    title: apiBook.title,
    author: apiBook["rss:author_name"]["#"],
    image: apiBook["rss:book_large_image_url"]["#"],
    read: read_at ? Date.parse(read_at) : null,
    shelf
  };
};

const getBooks = async (user, shelf) => {
    const books = await fetchPagedFeed(user, shelf);
    return books.map(book => transform(book, shelf))
};

module.exports.getBooks = getBooks;