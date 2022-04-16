import { Repository } from 'typeorm';
import { LoginDto } from './users/dto/login.dto';
import { User } from './users/entities/user.entity';
export declare class AppService {
    private UserRepository;
    constructor(UserRepository: Repository<User>);
    login(loginDto: LoginDto): Promise<User>;
}
