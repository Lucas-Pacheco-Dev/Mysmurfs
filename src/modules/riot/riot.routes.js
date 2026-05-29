const express = require("express");
const controller = require("./riot.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/champions", controller.listChampions)
router.get("/listChampions",controller.championsList)

module.exports = router;