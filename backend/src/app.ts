import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import logsRoutes from "./routes/logs";
import userRoutes from "./routes/users";
import morgan from "morgan";
// import cors from "cors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo/build/main";
import { requiresAuth } from "./middleware/auth";
import path from "path";

const app = express();

const frontendPath = path.resolve(__dirname, "../../frontend/build");
app.use(express.static(frontendPath));

app.use(express.json());

app.use(morgan("dev"));

app.set("trust proxy", 1);

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        sameSite: "lax",
        // secure: true
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}))

//middleware checking for /logs and then logsRoutes checks for path after that
app.use("/users", userRoutes);
app.use("/logs", requiresAuth, logsRoutes);

//use index.html for non-api routes
app.get("{*any}", (req: Request, res: Response) => {
    console.log("FRONTEND URL:", req.url);
    res.sendFile(path.join(frontendPath, "index.html"));
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(Error("Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({error: errorMessage});
});

export default app;