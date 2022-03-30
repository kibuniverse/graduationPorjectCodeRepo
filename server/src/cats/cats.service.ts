import { Injectable } from '@nestjs/common';
import { Cat } from '../interface/cats.interface';
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat) {
    this.cats.push(cat);
    return 'create success';
  }

  findAll() {
    return this.cats;
  }
}
