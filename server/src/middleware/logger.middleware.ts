import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';

export class loggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log(req.body);
    next();
  }
}
