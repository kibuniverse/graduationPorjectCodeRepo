import { Response } from 'express';
import { AppService } from './app.service';
import { LoginDto } from './users/dto/login.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    login(loginDto: LoginDto, resp: Response): Promise<{
        data: any;
        msg: string;
        status: number;
    }>;
}
