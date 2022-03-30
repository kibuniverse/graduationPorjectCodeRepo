import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    getUserList(): string[];
    login(): import("../utils/types").Response<{
        token: string;
    }>;
    register(): import("../utils/types").Response<unknown>;
    findAll(): any[];
}
