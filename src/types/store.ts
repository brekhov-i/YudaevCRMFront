import { IChat, IUser } from "@/types/user";
import { IStudent } from "@/types/student";

export interface IStore {

}

export interface IAuth {
    user: IUser | Object,
    token: string
}

export interface IStoreStudent {
    students: IStudent[],
    chats: IChat[]
}