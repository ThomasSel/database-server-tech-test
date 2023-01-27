module.exports = {
  get: (req, res) => {
    if (!req.query.hasOwnProperty("key")) {
      res.status(400).json({ message: "Bad Request" });
    }
    const value = req.app.locals.memory[req.query.key];
    res.status(200).json({ message: "OK", value: value });
  },
};
