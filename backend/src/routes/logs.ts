import * as LogsController from "../controllers/logs";
import express from "express";

const router = express.Router();

router.get("/", LogsController.getLog);

router.post("/", LogsController.createLog);

export default router;