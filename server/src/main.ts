import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RespInterceptor } from './resp.interceptor';
import * as CookieParser from 'cookie-parser';
import { HandleExceptionFilter } from './handle-exception.filter';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('/etc/nginx/kizy.cc.key'),
    cert: readFileSync('/etc/nginx/kizy.cc_bundle.crt')
  }


  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix('api');
  // 拦截器，统一输出
  app.useGlobalInterceptors(new RespInterceptor());
  // 数据验证
  app.useGlobalPipes(new ValidationPipe());
  // 处理异常
  app.useGlobalFilters(new HandleExceptionFilter());
  // 解析 cookie
  app.use(CookieParser());
  // 允许跨域和传递 cookie
  app.enableCors({ origin: true, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('ceg 系统后端')
    .setDescription('ceg 系统后端 API description')
    .setVersion('1.0')
    .addTag('ceg')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 开启 https

  await app.listen(3000);
}
bootstrap();
