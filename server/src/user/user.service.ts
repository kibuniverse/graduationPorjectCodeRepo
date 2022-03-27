import { Injectable } from '@nestjs/common';
import { genResponse, genSuccess } from 'src/utils';

@Injectable()
export class UserService {
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
