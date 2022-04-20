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
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (checkUser) {
      return failResponse(null, '用户名已存在');
    }
    createUserDto.isDelete = false;
    console.log(createUserDto);

    const res = await this.userRepository.save(createUserDto);
    return successResponse(res, '注册成功');
  }

  findAll() {
    return this.userRepository.find({ where: { isDelete: false } });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
