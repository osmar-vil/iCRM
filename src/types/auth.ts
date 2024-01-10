export type authRequest = {
    email: string;
    password: string;
}

export type authResponse = {
    token: string;
}

export type token = {
    id: number;
    name: string;
    las_name: string;
}