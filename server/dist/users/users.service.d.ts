export declare type User = {
    userId: number;
    userName: string;
    password: string;
};
export declare class UsersService {
    private readonly users;
    findOne(userName: string): Promise<User | undefined>;
}
