const { Router } = require("express");
const { projectsController } = require("../controllers");
const router = Router();

router.post("/projectAdd", projectsController.addProject);
router.get("/getAllProject", projectsController.getAllProject);
router.get("/getEasyProject", projectsController.getEasyProject);
router.get("/getHardProject", projectsController.getHardProject)

module.exports = router;