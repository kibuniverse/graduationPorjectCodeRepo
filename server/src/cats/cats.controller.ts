import { Bind, Body, Controller, Get, Post } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('/all')
  findAll() {
    return this.catsService.findAll();
  }

  @Post('/create')
  @Bind(Body())
  create(cat: CreateCatDto) {
    return this.catsService.create(cat);
  }
}
