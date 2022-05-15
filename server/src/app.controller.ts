import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { LoginDto } from './users/dto/login.dto';
import { failResponse, successResponse } from './utils/handleResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) resp: Response,
  ) {
    const res = await this.appService.login(loginDto);
    if (res) {
      const { password, ...result } = res;
      if (password === loginDto.password) {
        resp.cookie('token', 'token', {
          httpOnly: true,
          expires: new Date(Date.now() + 3600 * 24),
          sameSite: 'none',
        });
        resp.cookie('user', JSON.stringify(result));
        return successResponse(result, '登录成功');
      }
      return failResponse(res, '用户名或密码错误');
    } else {
      return failResponse(res, '用户名或密码错误');
    }
  }
}
