import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSuccess } from 'src/utils';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  getUserList(): string[] {
    return ['y', 'z'];
  }
  login() {
    return genSuccess({
      data: {
        token: 'token',
      },
    });
  }
  register() {
    return genSuccess({});
  }

  findAll() {
    return [];
  }
}
