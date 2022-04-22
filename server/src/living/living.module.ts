import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { LivingGateway } from './living.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LivingGateway],
})
export class LivingModule {}
