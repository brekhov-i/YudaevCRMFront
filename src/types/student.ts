export interface IStudent {
    _id: string;
    gkId: string;
    name: string;
    phone: string
    email: string;
    telegram: string;
    chat: string;
    lessons?: ILesson[];
    lastLesson?: ILesson | string | undefined;
}

export interface ILesson {
    _id: string;
    name: string;
}