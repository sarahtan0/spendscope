import { NextFunction, Request, RequestHandler, Response } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface createUserBody {
    email?: string,
    username?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, createUserBody, unknown> = 
    async (req: Request<unknown, unknown, createUserBody, unknown>, res: Response, next: NextFunction) =>{

    const email = req.body.email;
    const username = req.body.username;
    const passwordRaw = req.body.password;
    try {
        if (!email || !username || !passwordRaw) throw createHttpError(400, "Parameters missing");

        const existingUsername = await UserModel.findOne({username: username}).exec();
        if (existingUsername) throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");

        const existingEmail = await UserModel.findOne({email: email}).exec();
        if (existingEmail) throw createHttpError(409, "Email already taken. Please choose a different one or log in instead.");

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            email: email,
            username: username,
            password: passwordHashed
        })
        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }
}