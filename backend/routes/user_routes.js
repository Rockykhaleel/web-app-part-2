const express = require("express");
const isAuthenticated = require("../middleware/protectedRoute");

const controller = require("../controller/usercontroller")

const router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);
//protected Route
router.get("/profile", isAuthenticated, controller.profile);

router.post("/logout", async (req, res) => {});

module.exports = router;
