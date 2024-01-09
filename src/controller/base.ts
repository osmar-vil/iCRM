import { Request, Response } from "express";
import { Service } from "../interfaces/service";
import { iRequestBody } from "../interfaces/express";
import { EntityNotFoundError } from "typeorm";

export class Controller <T, R> {
    private service: Service<T,R>;

    constructor(service: Service<T,R>) { this.service = service }

    async create (req: iRequestBody<T>, res: Response) {
        try {
            return res.json({ data: await this.service.create(req.body) })
        } catch (error) { this.errorResponse(error, res); }
    }

    async get (req: Request, res: Response) {
        try {
            return res.json({ data: await this.service.get() })
        } catch (error) { this.errorResponse(error, res); }
    }

    private errorResponse (error: unknown, res: Response) {
        if (error instanceof EntityNotFoundError)
            return res.status(404).json({
                message: "Can not found any entity with that data provided."
            })
        
        return res.status(500).json({
            message: "Something went wrong, please contact with the support team."
        })
}
}