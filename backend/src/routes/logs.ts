import * as LogsController from "../controllers/logs";
import express from "express";

const router = express.Router();

router.get("/", LogsController.getLogs);

router.post("/", LogsController.createLog);

router.get("/:logId", LogsController.getLog);

router.delete("/:logId", LogsController.deleteLog);

router.patch("/:logId", LogsController.updateLog);

export default router;