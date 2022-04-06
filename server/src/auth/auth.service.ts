import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    // 密码校验通过后，返回对象本身
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
