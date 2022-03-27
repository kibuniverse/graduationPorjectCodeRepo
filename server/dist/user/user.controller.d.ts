import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserList(): string[];
    login(res: any, param: any): import("../utils/types").Response<{
        token: string;
    }>;
    findAll(res: any): void;
}
