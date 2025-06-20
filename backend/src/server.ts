import express from "express";
import "dotenv/config"
import mongoose from "mongoose"

const app = express();

// Basic route
app.get("/", (req, res) => {
  res.send("hello world");
});


const port = process.env.PORT;

mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    });