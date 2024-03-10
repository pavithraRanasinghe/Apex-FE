export interface IUser{
    id: number,
    name: string,
    email: string,
    address: string,
    role: Role,
    token: string,
}

enum Role{
    ADMIN,
    SENDER
}