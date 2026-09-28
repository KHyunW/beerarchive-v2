import { Module } from '@nestjs/common';
import { LikesService } from './likes.service.js';
import { LikesController } from './likes.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
