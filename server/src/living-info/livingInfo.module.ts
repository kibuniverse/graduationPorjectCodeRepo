import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import { LivingInfoGateway } from './livingInfo.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User, Meeting])],
  providers: [LivingInfoGateway],
})
export class LivingInfoModule {}
