import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  create(createUserDto: CreateUserDto) {
    createUserDto.isDelete = false;
    return this.UserRepository.save(createUserDto);
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
