export declare class UserService {
    getUserList(): string[];
    login(): import("../utils/types").Response<{
        token: string;
    }>;
    register(): import("../utils/types").Response<unknown>;
    findAll(): any[];
}
