const express = require("express");
const controller = require("./accounts.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/registerAccount", authMiddleware, controller.registerAccount);
router.get("/ListAccounts", authMiddleware, controller.ListAccounts);

module.exports = router;