import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';

export class loggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log(req);
    if (!req.cookie) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    console.log('Request...');
    next();
  }
}
