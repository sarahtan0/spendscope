import "dotenv/config";
import express from "express";
import LogModel from "./models/log";

const app = express();

//async because find() takes time to retrieve from db
app.get("/", async (req, res) => {
    //returns the db to user
    const notes = await LogModel.find().exec();
    res.status(200).json(notes);
})

export default app;