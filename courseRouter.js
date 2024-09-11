import { add, update, remove, get, getById } from "./courseController.js";

import express from "express";

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/add", add);
router.put("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
