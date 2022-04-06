import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user) {
    console.log('err, user', err, user);
    if (err) {
      throw err;
    }
    if (!user) {
      // 登录失败
      console.log('登录失败');
      return null;
    }
    return { ...user, tag: 'local' };
  }
}
