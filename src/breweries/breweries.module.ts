import { Module } from '@nestjs/common';
import { BreweriesService } from './breweries.service.js';
import { BreweriesController } from './breweries.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BreweriesController],
  providers: [BreweriesService],
})
export class BreweriesModule {}
