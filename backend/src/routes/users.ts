import express from "express";
import * as UsersController from "../controllers/users";

const router = express.Router();

router.post("/signup", UsersController.signUp);

router.post("/login", UsersController.login)

router.get("/debug-session", (req, res) => {
    res.json({
      session: req.session,
      userId: req.session.userId ?? null,
    });
  });
  

export default router;
