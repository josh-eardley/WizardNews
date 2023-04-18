const express = require("express");
const morgan = require("morgan");
const { list, find } = require("./postBank");
const app = express();
const PORT = 1337;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const posts = list();

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
    <head>
    <body>
      <ul>
        ${posts.map(post => `<li>Title: ${post.title}<br>Author: ${post.name}</li>`)}
      </ul>
    </body>
    </html>`;

    res.send(html);
});


app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
