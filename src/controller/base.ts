import { Request, Response } from "express";
import { Service } from "../interfaces/service";
import { iRequestBody } from "../interfaces/express";
import { EntityNotFoundError } from "typeorm";

export class Controller <T, R> {
    protected service: Service<T,R>;

    constructor(service: Service<T,R>) { this.service = service }

    create = async (req: iRequestBody<T & { created_by: number }>, res: Response) => {
        req.body.created_by = req.auth.id;
        try {
            return res.json({ data: await this.service.create(req.body) })
        } catch (error) { this.errorResponse(error, res); }
    }
    get = async (req: Request, res: Response) => {
        try {
            return res.json({ data: await this.service.get() })
        } catch (error) { return this.errorResponse(error, res); }
    }
    getOne = async (req: Request, res: Response) => {
        try {
            return res.json({ data: await this.service.getOne( Number(req.params.id) ) })
        } catch (error) { return this.errorResponse(error, res); }
    }
    update = async (req: iRequestBody<T & { updated_by: number }>, res: Response) => {
        req.body.updated_by = req.auth.id;
        try {
            return res.json({
                data: await this.service.update( Number(req.params.id), req.body)
            })
        } catch (error) { return this.errorResponse(error, res); }
    }
    delete = async (req: Request, res: Response) => {
        try {
            return res.json({
                data: await this.service.delete( Number(req.params.id), req.auth.id )
            })
        } catch (error) { return this.errorResponse(error, res); }
    }

    protected errorResponse (error: unknown, res: Response) {
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