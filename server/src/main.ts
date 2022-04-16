import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RespInterceptor } from './resp.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 拦截器，统一输出
  app.useGlobalInterceptors(new RespInterceptor());
  // 数据验证
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ceg 系统后端')
    .setDescription('ceg 系统后端 API description')
    .setVersion('1.0')
    .addTag('ceg')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
