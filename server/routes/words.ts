import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/word";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", create);
router.post("/:id", update);
router.delete("/:id", remove);

export { router };
