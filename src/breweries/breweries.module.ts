import { Module } from '@nestjs/common';
import { BreweriesService } from './breweries.service.js';
import { BreweriesController } from './breweries.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [BreweriesController],
  providers: [BreweriesService],
})
export class BreweriesModule {}
