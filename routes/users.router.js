const { Router } = require("express");
const { usersController } = require("../controllers");
const router = Router();

router.post("/userAdd", usersController.addUser);

module.exports = router;
