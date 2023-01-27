module.exports = {
  get: (req, res) => {
    res.status(400).send({ message: "Bad Request" });
  },
};
