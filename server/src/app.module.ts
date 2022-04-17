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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Yankaizhi123.',
      database: 'seg',
      entities: [User, Meeting],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes();
  }
}
