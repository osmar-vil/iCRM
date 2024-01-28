import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../validators/env.validator";
import { token } from "../types/auth";


const publicPath = [ "/user/auth" ];

export function authMiddleware (req: Request, res: Response, next: NextFunction) {
    if (publicPath.includes(req.originalUrl)) next();
    else {
        const token = req.header('Authorization')?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: 'Access denied' });

        try {
            req.auth = jwt.verify(token, env.JWT_SECRET) as token;
            next();
        } catch (error) { res.status(401).json({ error: 'Invalid token' }); }
    }
};