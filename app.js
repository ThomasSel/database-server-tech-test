const express = require("express");
const app = express();
const port = 4000;

const setRouter = require("./routes/set");

app.use(express.json());

// Local memory to store key-value pairs available within each route
//   (req.app.locals.memory)
app.locals.memory = {};

app.use("/set", setRouter);

app.get("/get", (req, res) => {
  value = req.app.locals.memory[req.query.key];
  if (value === undefined) {
    res.status(400).send(`Key ${req.query.key} doesn't exist in memory`);
  } else {
    res.status(200).json({ value: value });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
