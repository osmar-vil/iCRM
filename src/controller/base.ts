import { Request, Response } from "express";
import { Service } from "../interfaces/service";
import { iRequestBody } from "../interfaces/express";
import { EntityNotFoundError } from "typeorm";

export class Controller <T, R> {
    private service: Service<T,R>;

    constructor(service: Service<T,R>) { this.service = service }

    create = async (req: iRequestBody<T>, res: Response) => {
        try {
            return res.json({ data: await this.service.create(req.body) })
        } catch (error) { this.errorResponse(error, res); }
    }

    get = async (req: Request, res: Response) => {
        try {
            return res.json({ data: await this.service.get() })
        } catch (error) { this.errorResponse(error, res); }
    }

    errorResponse (error: unknown, res: Response) {
        if (error instanceof EntityNotFoundError)
            return res.status(404).json({
                message: "Can not found any entity with that data provided."
            })
        
        if (error instanceof Error) return res.json({ message: error.message })

        return res.status(500).json({
            message: "Something went wrong, please contact with the support team."
        })
    }
}