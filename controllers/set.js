module.exports = {
  put: (req, res) => {
    Object.assign(req.app.locals.memory, req.query);
    res.status(201).json({ message: "OK" });
  },
};
