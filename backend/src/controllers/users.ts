import { NextFunction, Request, RequestHandler, Response } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy(error => {
        if(error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
}

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
        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }
}

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler <unknown, unknown, LoginBody, unknown> = 
    async(req: Request<unknown, unknown, LoginBody, unknown>, res: Response, next: NextFunction) => {

        const username = req.body.username;
        const password = req.body.password;

        try {
            if (!username || !password) throw createHttpError(400, "Parameters missing");

            const user = await UserModel.findOne({username: username}).select("+password +email").exec();
            if (!user) throw createHttpError(400, "User does not exist");
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) throw createHttpError(400, "Incorrect password");

            req.session.userId = user._id;
            console.log("Session created", req.session);
            res.status(201).json(user);
        }catch (error){
            next(error);
        }

    }