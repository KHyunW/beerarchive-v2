import { Module } from '@nestjs/common';
import { BeersService } from './beers.service.js';
import { BeersController } from './beers.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BeersController],
  providers: [BeersService],
})
export class BeersModule {}
