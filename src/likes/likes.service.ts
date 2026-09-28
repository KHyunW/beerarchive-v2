import { Injectable, NotFoundException, ConflictException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLikeDto } from './dto/create-like.dto.js';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createLikeDto: CreateLikeDto) {
    const { postId, beerId } = createLikeDto;

    if ((postId && beerId) || (!postId && !beerId)) {
      throw new BadRequestException('postId 또는 beerId 중 하나만 지정해야 합니다.');
    }

    if (postId) {
      const post = await this.prisma.post.findUnique({ where: { id: postId } });
      if (!post) throw new NotFoundException(`Post #${postId} not found`);

      const existing = await this.prisma.like.findUnique({
        where: { userId_postId: { userId, postId } },
      });
      if (existing) throw new ConflictException('이미 좋아요를 누른 게시글입니다.');

      return this.prisma.like.create({ data: { userId, postId } });
    }

    const beer = await this.prisma.beer.findUnique({ where: { id: beerId! } });
    if (!beer) throw new NotFoundException(`Beer #${beerId} not found`);

    const existing = await this.prisma.like.findUnique({
      where: { userId_beerId: { userId, beerId: beerId! } },
    });
    if (existing) throw new ConflictException('이미 좋아요를 누른 맥주입니다.');

    return this.prisma.like.create({ data: { userId, beerId } });
  }

  async remove(id: number, userId: number) {
    const like = await this.prisma.like.findUnique({ where: { id } });
    if (!like) throw new NotFoundException(`Like #${id} not found`);
    if (like.userId !== userId) {
      throw new ForbiddenException('본인이 누른 좋아요만 취소할 수 있습니다.');
    }
    await this.prisma.like.delete({ where: { id } });
    return { message: `Like #${id} removed` };
  }
}
