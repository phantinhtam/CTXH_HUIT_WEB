const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/Admin/credential.controller.js");

router.post("/login", adminController.loginHandler);
router.post("/register", adminController.registerHandler);
router.put("/update/:id", adminController.updateHandler);
router.delete("/delete/:id", adminController.deleteHandler);

module.exports = router;
