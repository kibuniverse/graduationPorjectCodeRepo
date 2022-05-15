import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './users/dto/login.dto';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    return await this.UserRepository.findOne({
      where: {
        username: loginDto.username,
        isDelete: false,
      },
    });
  }
}
