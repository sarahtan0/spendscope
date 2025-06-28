import { NextFunction, Request, RequestHandler, Response } from "express";
import LogModel from "../models/log"

export const getLog: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await LogModel.find().exec();
        //turn logs into a json and return it with a good status
        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
}