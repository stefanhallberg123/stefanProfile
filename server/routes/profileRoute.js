const express = require("express");
const router = express.Router();
const path = require("path");

const { list, create } = require(path.join(
  __dirname,
  "../controllers/profile"
));

router.get("/", list);
router.post("/createProfile", create);

module.exports = router;
