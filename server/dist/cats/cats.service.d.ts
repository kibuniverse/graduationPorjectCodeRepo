import { Cat } from '../interface/cats.interface';
export declare class CatsService {
    private readonly cats;
    create(cat: any): string;
    findAll(): Cat[];
}
