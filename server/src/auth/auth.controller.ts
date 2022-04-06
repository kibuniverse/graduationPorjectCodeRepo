import {
  Bind,
  Body,
  Controller,
  Logger,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Bind(Query())
  async login(query) {
    console.log('query: ', query);
    query.user && Logger.log(`${query.user.tag}验证通过`);
    return query.user ? `登录成功，欢迎${query.user.user}～` : '登录失败';
  }
}
