// https://www.folha.uol.com.br/

const cheerio = require("cheerio");
const request = require("request");
const express = require("express");

// iniciando express
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  request("https://www.folha.uol.com.br/", function (error, request, body) {
    const $ = cheerio.load(body);
    //console.log($('h2.c-headline__title').text());
    //console.log($('div.c-headline__content > a').attribs.href);
    const artigos = $("h2.c-headline__title");
    //console.log(artigos[0].length)
    //console.log(artigos.html())
    res.setHeader("Content-Type", "text/html");
    res.write(`<meta charset='utf-8'>`);

    artigos.each(function (idx, el) {
      res.write("<h2>");
      //console.log($(el).text())
      res.write($(el).text());
      //console.log($(el).attr('href'))
      //res.write( '<a href='+$(el).attr('href')+ '>')
      res.write("</h2>");
    });

    res.end();
  });
});

app.listen(port, () => {
  console.log(`App ta rodando na porta  ${port}`);
});
