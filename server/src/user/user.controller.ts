import {
  Bind,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUserList() {
    return this.userService.getUserList();
  }

  @Post('/login')
  @Bind(Res(), Body())
  login(res, param) {
    console.log(param);
    return this.userService.login();
  }

  @Get('/all')
  @Bind(Res())
  findAll(res) {
    const users = this.userService.findAll();
    res.status(HttpStatus.OK).json(users).send();
  }
}
