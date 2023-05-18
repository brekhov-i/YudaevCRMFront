export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: IRole;
    chat: string[];
}

export interface IRole {
    _id: string;
    name: string;
    title: string;
}

export interface IChat {
    _id: string;
    link: string;
    title: string;
}