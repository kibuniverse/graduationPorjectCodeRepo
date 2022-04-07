import { Bind, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/register')
  @Bind(Body())
  async register(body) {
    return this.userService.register('yankaizhi', 'Kzkz', 'kaizi');
  }

  @Get('/all')
  async findAll() {
    return this.userService.findAll();
  }

  @Post('/login')
  @Bind(Body())
  async login(body) {
    const res = await this.userService.login(body.userName, body.password);
    if (res) {
      return {
        data: {
          status: 'ok',
          message: '成功',
        },
      };
    }
    return {
      data: {
        status: 'error',
        message: '用户名或密码错误',
      },
    };
  }
}
