module.exports = {
  get: (req, res) => {
    if (
      Object.keys(req.query).length !== 1 ||
      !req.query.hasOwnProperty("key")
    ) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    const value = req.app.locals.memory[req.query.key];
    if (value === undefined) {
      res.status(404).json({ message: `Key "${req.query.key}" not found` });
      return;
    }
    res.status(200).json({ message: "OK", value: value });
  },
};
