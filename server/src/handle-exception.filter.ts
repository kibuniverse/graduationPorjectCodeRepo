import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HandleExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception?.status || 500;
    response.status(status).json({
      statusCode: status,
      status: 0,
      path: request.url,
      msg: exception?.message,
      data: {},
    });
  }
}
