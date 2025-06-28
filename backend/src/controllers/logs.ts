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

export const createLog: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const cost = req.body.cost;
    const section = req.body.section;
    try {
        const newLog = await LogModel.create({
            title: title,
            cost: cost,
            section: section,
        });

        res.status(201).json(newLog);
    } catch (error) {
        next(error);
    }
}