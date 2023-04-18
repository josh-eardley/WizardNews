const express = require("express");
const morgan = require("morgan");
const { list, find } = require("./postBank");
const app = express();
const PORT = 1337;

app.use(morgan("dev"));
app.use(express.static('public'));

/*************** Routes ***************/
app.get("/", (req, res) => {
  const posts = list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`;

    res.send(html);
});

app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  const post = find(id);

  if (!post.id) {
    next(err);
  } else {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
         <div class='news-item'>
            <p>
              ${post.title}
              <small>(by ${post.name})</small>
            </p>
            <p>${post.content}</p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${post.date}
            </small>
          </div>
    </body>
  </html>`);
  }
});

/*************** Error Handler ***************/
app.use((err, req, res, next) => {
  console.error(err);
  res.status(404).send(`<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
    Post not Found
    </body>`);
  next();
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
