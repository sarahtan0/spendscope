import * as LogsController from "../controllers/logs";
import express from "express";

const router = express.Router();

router.get("/", LogsController.getLog);

export default router;