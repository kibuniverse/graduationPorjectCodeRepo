import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(userName: string, password: string): Promise<any>;
}
