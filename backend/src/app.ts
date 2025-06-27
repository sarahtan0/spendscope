import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import LogModel from "./models/log";

const app = express();

//async because find() takes time to retrieve from db
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    //returns the db to user
    try{
        const notes = await LogModel.find().exec();
        res.status(200).json(notes);
    } 
    catch (error) {
        next(error);
    }
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