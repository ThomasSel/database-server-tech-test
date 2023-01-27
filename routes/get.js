const express = require("express");
const router = express.Router();

const GetController = require("../controllers/get");

router.get("/", GetController.get);

module.exports = router;
