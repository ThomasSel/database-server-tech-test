const express = require("express");
const app = express();
const port = 4000;

const setRouter = require("./routes/set");
const getRouter = require("./routes/get");

app.use(express.json());

// Local memory to store key-value pairs available within each route
//   (req.app.locals.memory)
app.locals.memory = {};

app.use("/set", setRouter);
app.use("/get", getRouter);

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
