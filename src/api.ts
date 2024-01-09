import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { AppDataSource } from "./db/datasource";

import userRouter from "./routers/user.routers";

dotenv.config();

const api = express();

api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))

api.use("/user", userRouter)

api.use( (req: Request, res: Response) => res.json({
    status: true,
    API: process.env.API,
    VERSION: process.env.VERSION,
}));

AppDataSource.initialize().catch(error => console.error(error));

api.listen(process.env.PORT)