const { Router } = require("express");
const router = Router();

router.use(require("./users.router"));
router.use(require("./project.routes"));

module.exports = router;
