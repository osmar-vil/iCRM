import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base";
import { UserResponse } from "../types/userTypes";

@Entity()
export class User extends Base{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    response() {
        const response: UserResponse = {
            id: this.id,
            name: this.name,
            last_name: this.last_name,
            email: this.email,
        }
        return response;
    }
}