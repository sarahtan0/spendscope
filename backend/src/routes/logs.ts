import * as LogsController from "../controllers/logs";
import express from "express";

const router = express.Router();

router.get("/", LogsController.getLogs);

router.post("/", LogsController.createLog);

router.get("/:logId", LogsController.getLog);

export default router;