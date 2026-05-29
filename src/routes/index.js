const express = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const AccountsRoutes = require("../modules/accounts/accounts.routes");
const RiotRoutes = require("../modules/riot/riot.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/accounts",AccountsRoutes)
router.use("/riot",RiotRoutes)

module.exports = router;