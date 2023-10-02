const fs = require("fs");
const { test } = require("node:test");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`starter/dev-data/data.json`, "utf-8");
const prdData = JSON.parse(data);
console.log(prdData);
console.log(data);

const tempCard = fs.readFileSync(
  `starter/templates/template-card.html`,
  "utf-8"
);
const tempOver = fs.readFileSync(
  `starter/templates/template-overview.html`,
  "utf-8"
);
const tempPrd = fs.readFileSync(
  `starter/templates/template-product.html`,
  "utf-8"
);
const replaceTemplate = (temp, product) => {
  let output = temp.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%ID%}", product.id);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%PRODUCTDESCRIPTION%}", product.description);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
  output = output.replaceAll("{%IMAGE%}", product.image);

  if (!product.organic)
    output = output.replaceAll("{%NOT ORGANIC%}", "not-organic");
  return output;
};
const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  console.log(query, pathname);
  console.log(url.parse(req.url, true));
  const pathName = req.url;
  //OVERVIEW PAGE
  if (pathname === "/overview" || pathname === "/") {
    const cardsHtml = prdData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    console.log(cardsHtml);

    const output = tempOver.replaceAll("{%PRODUCTCARDS%}", cardsHtml);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === "/product") {
    const product = prdData[query.id];
    const output = replaceTemplate(tempPrd, product);
    res.end(output);

    //API PAGE
  } else if (pathname === "/api") {
    res.end(data);
  } else {
    //ERROR PAGE
    res.writeHead(404, {
      //  "Content-type": "text/html",
    });
    res.end("<h1><i>Page Not Found</i></h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening............");
});

const server1 = http.createServer((req, res) => {
  res.end("Hi this is server 3000");
});

server1.listen(3000, "127.0.0.2", () => {
  console.log("Listening server 3000");
});

//const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
//console.log(textIn);

const textIn = fs.readFileSync("starter/txt/input.txt", "utf-8");
console.log(textIn);
const textOut = "Hi I am kirishn";
fs.writeFileSync("starter/txt/output.txt", textOut);
console.log("File written");
/*
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "file.txt");

if (fs.existsSync(filePath)) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  console.log(fileContent);
} else {
  console.log("File does not exist");
}
*/
console.log("jam".split(""));

process.stdin.on("data", (data) => {
  console.log(`You typed ${data}`);
  const strNew = data.toString();
  console.log(`${strNew}hi`);
  console.log(strNew);
  //node;
  console.log(typeof strNew);
  const strArray = strNew.split("");
  console.log(strArray);

  process.exit();
});

fs.readFile("starter/txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("starter/txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile(
        "starter/txt/final.txt",

        `${data2} \n ${data3}`,
        "utf-8",
        (err) => {
          console.log("Done");
        }
      );
    });
  });
});
console.log("Reading!!!");
