import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UsersService } from './users/users.service';
import { MeetingModule } from './meeting/meeting.module';
import { Meeting } from './meeting/entities/meeting.entity';
import { ChatModule } from './chat/chat.module';
import { LivingModule } from './living/living.module';
import { LivingInfoModule } from './living-info/livingInfo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Yankaizhi123.',
      database: 'seg',
      entities: [User, Meeting],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Meeting]),
    UsersModule,
    MeetingModule,
    ChatModule,
    LivingModule,
    LivingInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes();
  }
}
