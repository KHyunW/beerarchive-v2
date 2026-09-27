import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createPostDto: CreatePostDto){
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        userId,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: { user: { select: { id: true, nickname: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: { select: { id: true, nickname: true } } },
    });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  async update(id: number, userId: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (post.userId !== userId) {
      throw new ForbiddenException('본인이 작성한 게시글만 수정할 수 있습니다.');
    }
    return this.prisma.post.update({ where: { id }, data: updatePostDto});
  }

  async remove(id: number, userId: number) {
    const post = await this.findOne(id);
    if (post.userId !== userId) {
      throw new ForbiddenException('본인이 작성한 게시글만 삭제할 수 있습니다.');
    }
    await this.prisma.post.delete({ where: { id } });
    return { message: `Post #${id} deleted` };
  }
}
