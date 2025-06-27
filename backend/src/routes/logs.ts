import * as LogsRouter from "../controllers/logs";
import express from "express";

const router = express.Router();

router.get("/", LogsRouter.getLog);