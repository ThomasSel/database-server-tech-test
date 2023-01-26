module.exports = {
  get(req, res) {
    value = req.app.locals.memory[req.query.key];
    if (value === undefined) {
      res.status(400).send(`Key ${req.query.key} doesn't exist in memory`);
    } else {
      res.status(200).json({ value: value });
    }
  },
};
