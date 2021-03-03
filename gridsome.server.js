// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const puppeteer = require('puppeteer');

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto("https://www.goodreads.com/review/list/77658975-jamie-watson?utf8=%E2%9C%93&shelf=read&per_page=100");

    const books = await page.$$eval('#booksBody tr', elements => elements.map(element => {
      return {
        image: element.querySelector(".field.cover img").src.replace(/\._S[XY]\d{2}_/, ""),
        title: element.querySelector(".field.title .value").textContent,
        author: element.querySelector(".field.author .value").textContent,
      }
    }));

    await page.goto("https://www.goodreads.com/review/list/77658975-jamie-watson?shelf=currently-reading");

    const current = await page.$$eval('#booksBody tr', elements => elements.map(element => {
      return {
        image: element.querySelector(".field.cover img").src.replace(/\._S[XY]\d{2}_/, ""),
        title: element.querySelector(".field.title .value").textContent,
        author: element.querySelector(".field.author .value").textContent,
      }
    }));

    await browser.close();

    const booksCollection = addCollection({typeName: 'books'});
    [...current, ...books].reverse().forEach(book => booksCollection.addNode(book));
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })
}
