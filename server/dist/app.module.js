"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const auth_middleware_1 = require("./middleware/auth.middleware");
const users_service_1 = require("./users/users.service");
const meeting_module_1 = require("./meeting/meeting.module");
const meeting_entity_1 = require("./meeting/entities/meeting.entity");
const chat_module_1 = require("./chat/chat.module");
const living_module_1 = require("./living/living.module");
const livingInfo_module_1 = require("./living-info/livingInfo.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes();
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "mariadb",
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Yankaizhi123.',
                database: 'ceg',
                entities: [user_entity_1.User, meeting_entity_1.Meeting],
                synchronize: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, meeting_entity_1.Meeting]),
            users_module_1.UsersModule,
            meeting_module_1.MeetingModule,
            chat_module_1.ChatModule,
            living_module_1.LivingModule,
            livingInfo_module_1.LivingInfoModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, users_service_1.UsersService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map