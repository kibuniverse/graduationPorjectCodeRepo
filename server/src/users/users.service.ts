import { Injectable } from '@nestjs/common';

export type User = { userId: number; userName: string; password: string };

@Injectable()
export class UsersService {
  private readonly users = [
    { userId: 1, userName: 'a', password: 'abc' },
    { userId: 2, userName: 'b', password: 'abc' },
  ];
  // 以用户名查找用户对象
  async findOne(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName === userName);
  }

  async register(userName: string, password: string, email: string) {
    const user = { userId: this.users.length + 1, userName, password, email };
    this.users.push(user);
    return user;
  }

  async findAll() {
    return this.users;
  }

  async login(userName, password) {
    const user = this.users.find((user) => user.userName === userName);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
