const memory = require("../app");

module.exports = {
  put(req, res) {
    Object.assign(req.app.locals.memory, req.query);
    res.status(200).json({ message: "OK" });
  },
};
