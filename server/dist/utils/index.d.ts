import { Response } from './types';
export declare function genResponse<T>({ status, message, data, }: Response<T>): Response<T>;
export declare function genSuccess<T>({ message, data, }: {
    message?: string | undefined;
    data?: T | undefined;
}): Response<T>;
