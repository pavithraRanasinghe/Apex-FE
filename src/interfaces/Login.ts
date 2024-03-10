import { IUser } from "./User"

export interface ILogInRequest {
    email: string,
    password: string
}

export interface ILogInResponse{
    message: string,
    data: IUser
}
