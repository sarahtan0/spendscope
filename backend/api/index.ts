import express from "express";
import mongoose from "mongoose";
import serverless from "serverless-http";
import "dotenv/config";

const app = express();

// Basic route
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel");
});


// MongoDB connection (outside handler, runs once per cold start)
mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Mongoose connected")
  })
  .catch((err) => console.error("MongoDB connection error:", err));

export const handler = serverless(app);