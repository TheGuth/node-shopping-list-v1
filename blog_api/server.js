const express = require('express');

const app = express();

const blogRouter = require('./blog-postsRouter');

app.use(express.static('public'));

app.use('/blog-post', blogRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
