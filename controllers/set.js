const SetController = {
  put: (req, res) => {
    if (Object.keys(req.query).length === 0) {
      res.status(204).send();
    }
    Object.assign(req.app.locals.memory, req.query);
    res.status(201).json({ message: "OK" });
  },
};

module.exports = SetController;
