import { Module } from '@nestjs/common';
import { LivingGateway } from './living.gateway';

@Module({ providers: [LivingGateway] })
export class LivingModule {}
