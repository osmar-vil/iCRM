import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { AppDataSource } from "./db/datasource";
import { errors } from "celebrate";

import userRouter from "./routers/user.routers";
import { env } from "./validators/env.validator";
import { seeder } from "./db/seeder";
import { authMiddleware } from "./middleware/jwtMiddleware";

const api = express();

api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))

api.use(authMiddleware);
api.use("/user", userRouter)

api.use( (req: Request, res: Response) => res.json({
    status: true,
    API: env.API,
    VERSION: env.VERSION,
}));

api.use(errors())

AppDataSource.initialize()
.then( () => seeder() )
.catch(error => console.error(error));

api.listen(env.PORT)