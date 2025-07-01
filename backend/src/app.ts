import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import logsRoutes from "./routes/logs";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors({
    origin: ["http://localhost:3001", "https://spendscope-drab.vercel.app"],
    credentials: true,
}))

app.use(express.json());

app.use(morgan("dev"));

//middleware checking for /logs and then logsRoutes checks for path after that
app.use("/logs", logsRoutes);

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