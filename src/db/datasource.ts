import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/user";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "mysecretpassword",
    database: "icrm_db",
    synchronize: true,
    logging: true,
    entities: [ User ],
    subscribers: [],
    migrations: [],
})