import express from "express";
import * as UsersController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UsersController.getAuthenticatedUser);

router.post("/signup", UsersController.signUp);

router.post("/login", UsersController.login);

router.post("/logout", UsersController.logout)

router.get("/month-totals", UsersController.getMonthTotals);

router.patch("/modify-month-totals", UsersController.modifyTotal);

export default router;
