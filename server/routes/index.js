const express = require("express");
const router = express.Router();

const spacecraftRouter = require("./spacecraft");

router.use("/spacecrafts", spacecraftRouter);

module.exports = router;
