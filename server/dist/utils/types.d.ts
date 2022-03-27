export declare enum ResponseStatus {
    fail = 0,
    Success = 1
}
export declare type Response<T> = {
    status: ResponseStatus;
    message: string | null;
    data: T;
};
