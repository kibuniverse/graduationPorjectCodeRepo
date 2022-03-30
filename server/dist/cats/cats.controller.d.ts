import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
export declare class CatsController {
    private catsService;
    constructor(catsService: CatsService);
    findAll(): import("../interface/cats.interface").Cat[];
    create(cat: CreateCatDto): string;
}
