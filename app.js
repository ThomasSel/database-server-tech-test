const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.status(200).send("Hello, world");
});

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
