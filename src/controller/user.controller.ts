import { Response } from "express";
import { iRequestBody } from "../interfaces/express";
import { UserRequest, UserResponse, authRequest } from "../types/userTypes";
import { Controller } from "./base";
import { UserService } from "../service/user.service";
import { EntityNotFoundError } from "typeorm";

export class UserController extends Controller<UserRequest, UserResponse> {
    private userService = new UserService();
    constructor() { super(new UserService()) }

    auth = async (req: iRequestBody<authRequest>, res: Response) => {
        try {
            return res.json({ data: await this.userService.auth(req.body) })
        } catch (error) { this.errorResponse(error, res) }
    }

}