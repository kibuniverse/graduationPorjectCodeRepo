"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const resp_interceptor_1 = require("./resp.interceptor");
const CookieParser = require("cookie-parser");
const handle_exception_filter_1 = require("./handle-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new resp_interceptor_1.RespInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new handle_exception_filter_1.HandleExceptionFilter());
    app.use(CookieParser());
    app.enableCors({ origin: true, credentials: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ceg 系统后端')
        .setDescription('ceg 系统后端 API description')
        .setVersion('1.0')
        .addTag('ceg')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map