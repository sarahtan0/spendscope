import express from "express";
import * as UsersController from "../controllers/users";

const router = express.Router();

router.post("/", UsersController.signUp);

export default router;
