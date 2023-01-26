const express = require("express");
const app = express();
const port = 4000;

app.put("/set", (req, res) => {
  res.status(201).send("OK");
});

if (!process.env.TEST) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
