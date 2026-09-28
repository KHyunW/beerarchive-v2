import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service.js';
import { CreateLikeDto } from './dto/create-like.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';

@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(
    @CurrentUser() user: { userId: number },
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likesService.create(user.userId, createLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { userId: number }) {
    return this.likesService.remove(+id, user.userId);
  }

}
