import { ListResponse } from "../types/listTypes";

export interface Service <T,R> {
    create(data: T): Promise<R>;
    get(): Promise<ListResponse<R>>;
    getOne(id: number): Promise<R>;
    update(id: number, data: T): Promise<R>;
    delete(id: number, deleted_by: number): Promise<void>;
}