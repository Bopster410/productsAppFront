export interface QueryParam {
    [key: string]: string;
}

export interface DataResponce<T> {
    status: number;
    data?: T;
    msg?: string;
    msgRus?: string;
}
