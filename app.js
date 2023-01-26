const express = require("express");
const app = express();
const port = 4000;

// Initialize the local memory of the app to be empty
app.locals.memory = {};

const setRouter = require("./routes/set");

app.use("/set", setRouter);

if (!process.env.TEST) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
