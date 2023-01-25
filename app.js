const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

const memory = {};

app.post("/set", (req, res) => {
  Object.assign(memory, req.query);
  res.status(200).json({ message: "OK" });
});

app.get("/get", (req, res) => {
  value = memory[req.query.key];
  if (value === undefined) {
    res.status(400).send(`Key ${req.query.key} doesn't exist in memory`);
  } else {
    res.status(200).json({ value: value });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
