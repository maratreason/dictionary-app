const { Router } = require("express");
const controller = require("../controllers/word");
const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/create", controller.create);
router.post("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
