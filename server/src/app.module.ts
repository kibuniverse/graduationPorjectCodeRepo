import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedantsTypeModule } from './pedants-type/pedants-type.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PedantsTypeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
