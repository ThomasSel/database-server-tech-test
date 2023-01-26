const express = require("express");
const router = express.Router();

const SetController = require("../controllers/set");

router.put("/", SetController.put);

module.exports = router;
