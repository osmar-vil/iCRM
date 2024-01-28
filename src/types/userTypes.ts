export type UserRequest = {
    name: string;
    last_name: string;
    email: string;
    password: string;
    user_id: number;
}

export type UserResponse = { id : number } & Omit<UserRequest, "password" | "user_id">