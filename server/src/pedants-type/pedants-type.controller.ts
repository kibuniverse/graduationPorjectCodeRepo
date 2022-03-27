import { Controller, Get, Param, Req, Request } from '@nestjs/common';

@Controller('pedants-type')
export class PedantsTypeController {
  @Get('/:id')
  getPedantsType(@Req() requset: Request, @Param('id') id: number): string {
    return `获取所有的挂件类型${id}`;
  }
}
