import { Request } from "express";

export interface iRequestBody<T> extends Request { body: T }