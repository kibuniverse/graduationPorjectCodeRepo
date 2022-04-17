import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { failResponse, successResponse } from 'src/utils/handleResponse';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.UserRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (checkUser) {
      return failResponse(null, '用户名已存在');
    }
    createUserDto.isDelete = false;
    console.log(createUserDto);

    const res = await this.UserRepository.save(createUserDto);
    return successResponse(res, '注册成功');
  }

  findAll() {
    return this.UserRepository.find({ where: { isDelete: false } });
  }

  findOne(id: number) {
    return this.UserRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.UserRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.UserRepository.delete({ id });
  }
}
