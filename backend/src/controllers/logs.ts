import { NextFunction, Request, RequestHandler, Response } from "express";
import LogModel from "../models/log";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getLogs: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await LogModel.find().exec();
        //turn logs into a json and return it with a good status
        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
}

interface CreateLogBody {
    title?: string,
    cost?: number,
    section?: string,
}

export const createLog: RequestHandler<unknown, unknown, CreateLogBody, unknown> = async (req: Request<unknown, unknown, CreateLogBody, unknown>, res: Response, next: NextFunction) => {
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

export const getLog: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.params.logId;
    try{
        if (!mongoose.isValidObjectId(logId)) throw createHttpError(400, "Invalid Log Id");
        const log = await LogModel.findById(logId).exec();
        if (!log) throw createHttpError(400, "Log not found");
        res.status(200).json(log);
    } catch (error) {
        next(error);
    }
}

export const deleteLog: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.params.logId;

    try {
        if(!mongoose.isValidObjectId(logId)) throw createHttpError(400, "Invalid log id");
        const log = await LogModel.findById(logId).exec();
        if (!log) throw createHttpError(400, "Log not found");
        await log.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

interface UpdateLogParams {
    logId?: string,
}

interface UpdateLogBody {
    title: string,
    cost: number,
    section: string,
}

export const updateLog: RequestHandler<UpdateLogParams, unknown, UpdateLogBody, unknown> = async (req: Request<UpdateLogParams, unknown, UpdateLogBody, unknown> , res: Response, next: NextFunction) => {
    const logId = req.params.logId;
    const newTitle = req.body.title;
    const newCost = req.body.cost;
    const newSection = req.body.section;

    try {
        if(!mongoose.isValidObjectId(logId)) throw createHttpError(400, "Invalid log id");
        if(!newTitle) throw createHttpError(400, "Note must have a title");
        const log = await LogModel.findById(logId).exec();
        if (!log) throw createHttpError(400, "Log not found");

        log.title = newTitle;
        log.cost = newCost;
        log.section = newSection;

        const newLog = await log.save();
        res.status(200).json(newLog);
        
    } catch(error) {
        next(error);
    }
}