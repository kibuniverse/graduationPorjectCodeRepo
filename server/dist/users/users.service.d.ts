export declare type User = {
    userId: number;
    userName: string;
    password: string;
};
export declare class UsersService {
    private readonly users;
    findOne(userName: string): Promise<User | undefined>;
    register(userName: string, password: string, email: string): Promise<{
        userId: number;
        userName: string;
        password: string;
        email: string;
    }>;
    findAll(): Promise<{
        userId: number;
        userName: string;
        password: string;
    }[]>;
    login(userName: any, password: any): Promise<{
        userId: number;
        userName: string;
        password: string;
    }>;
}
