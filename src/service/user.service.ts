import { User } from "../entity/user";
import { Service } from "../interfaces/service";
import { ListResponse } from "../types/listTypes";
import { UserRequest, UserResponse, authRequest } from "../types/userTypes";
import bcryt from "bcrypt";

export class UserService implements Service<UserRequest, UserResponse> {
    async create(data: UserRequest): Promise<UserResponse> {
        const entity = User.create(data);
        await User.insert(entity);

        return entity.response();
    }
    async get(): Promise<ListResponse<UserResponse>> {
        const [list, count] = await User.createQueryBuilder()
        .orderBy({ id: "DESC" })
        .getManyAndCount();

        const row: UserResponse[] = [];
        for (const x of list) row.push(x.response());

        return { count, pages: 1, row }
    }
    async getOne(id: number): Promise<UserResponse> {
        const entity = await User.findOneByOrFail({ id });
        return entity.response();
    }
    async update(id: number, data: UserRequest): Promise<UserResponse> {
        await User.update(id, data);
        return this.getOne(id);
    }
    async delete(id: number, deleted_by: number): Promise<void> {
        await User.update(id, { deleted_at: () => "CURRENT_TIMESTAMP", deleted_by })
    }

    async auth (data: authRequest) {
        const { password } = await User.createQueryBuilder()
        .select(["password"])
        .where({ email: data.email })
        .getRawOne();

        if ( await bcryt.compare(data.password, password) ) return "Token string"
        else throw Error("Please check your email our password")
    }

}