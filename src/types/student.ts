export interface IStudent {
    _id: string;
    gkId: string;
    name: string;
    phone: string
    email: string;
    telegram: string;
    chat: string;
    lessons?: string[];
    lastLesson?: string | undefined;
}

export interface ILesson {
    _id: string;
    title: string;
}