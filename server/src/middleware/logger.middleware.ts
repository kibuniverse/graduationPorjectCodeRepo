import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';

export class loggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log(req.cookie);
    if (!req.cookie) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    console.log('Request...');
    next();
  }
}
