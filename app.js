const express = require("express");
const app = express();
const port = 4000;

const setRouter = require("./routes/set");

app.use("/set", setRouter);

if (!process.env.TEST) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
