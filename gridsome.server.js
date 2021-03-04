const puppeteer = require('puppeteer');

const USER_URL = "77658975-jamie-watson";

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const getBooks = async () => {
      return await page.$$eval('#booksBody tr', elements => elements.map(element => {
        return {
          image: element.querySelector(".field.cover img").src.replace(/\._S[XY]\d{2}_/, ""),
          title: element.querySelector(".field.title .value").textContent,
          author: element.querySelector(".field.author .value").textContent,
        }
      }));
    };

    await page.goto(
      `https://www.goodreads.com/review/list/${USER_URL}?utf8=%E2%9C%93&shelf=read&per_page=100`
    );
    const books = await getBooks();

    await page.goto(`https://www.goodreads.com/review/list/${USER_URL}?shelf=currently-reading`);
    const current = await getBooks();

    await browser.close();

    const booksCollection = addCollection({typeName: 'books'});
    [...current, ...books].reverse().forEach(book => booksCollection.addNode(book));
  })
}
