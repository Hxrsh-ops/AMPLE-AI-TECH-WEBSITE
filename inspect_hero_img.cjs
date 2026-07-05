const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html);
const document = dom.window.document;

const selector = 'div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#hero:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div#image-move:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > img:nth-of-type(1)';
const el = document.querySelector(selector);
if (el) {
  console.log("Element found:");
  console.log(el.outerHTML);
  if (el.parentElement) console.log("Parent:", el.parentElement.outerHTML.substring(0, 500));
} else {
  console.log("Not found with full selector. Trying partial...");
  const el2 = document.querySelector('div#image-move');
  if (el2) {
    console.log("Found #image-move");
    console.log(el2.outerHTML.substring(0, 1000));
  } else {
      console.log("Not found #image-move either.");
  }
}
