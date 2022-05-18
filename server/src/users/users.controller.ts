import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { failResponse, successResponse } from 'src/utils/handleResponse';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('/name/:userName')
  async findUserInfoByUsername(@Param('userName') userName: string) {
    return await this.usersService.findByUsername(userName);
  }

  @Get('/userInfo/:uid')
  async getUserInfo(@Param('uid') uid: string) {
    console.log(`selece ${uid} user info`)
    return await this.usersService.findOne(+uid);
  }

  @Post('/changePsd')
  async changePsd(
    @Body() data: { uid: number; oldPsd: string; newPsd: string },
  ) {
    return await this.usersService.changePsd(data);
  }

  @Get()
  async findAll() {
    const res = await this.usersService.findAll();
    if (res) {
      return successResponse(res);
    } else {
      return failResponse(res);
    }
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteUserDto: UpdateUserDto = { isDelete: true };
    return await this.usersService.update(+id, deleteUserDto);
  }
}
