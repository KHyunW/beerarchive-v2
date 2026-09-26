import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createReviewDto: CreateReviewDto){
    const beer = await this.prisma.beer.findUnique({
      where: { id: createReviewDto.beerId },
    });
    if (!beer) {
      throw new NotFoundException(`Beer #${createReviewDto.beerId} not found`);
    }

    const existing = await this.prisma.review.findUnique({
      where: {
        userId_beerId: {userId, beerId: createReviewDto.beerId },
      },
    });
    if (existing) {
      throw new ConflictException('이미 이 맥주에 리뷰를 작성하셨습니다');
    }

    return this.prisma.review.create({
      data: {
        rating: createReviewDto.rating,
        content: createReviewDto.ccontent,
        userId,
        beerId: createReviewDto.beerId,
      },
    });
  }

  findAll() {
    return this.prisma.review.findMany({
      include: { user: { select: { id: true, nickname: true } }, beer: true },
    });
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: { user: { select: { id: true, nickname: true } }, beer: true },
    });
    if (!review) {
      throw new NotFoundException(`Review #${id} not found`);
    }
    return review;
  }

  async update(id: number, userId: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);
    if (review.userId !== userId) {
      throw new ConflictException('본인이 작성한 리뷰만 수정할 수 있습니다.');
    }
    return this.prisma.review.update({ where: { id }, data: updateReviewDto });
  }

  async remove(id: number, userId: number) {
    const review = await this.findOne(id);
    if (review.userId !== userId) {
      throw new ConflictException('본인이 작성한 리뷰만 삭제할 수 있습니다.');
    }
    await this.prisma.review.delete({ where: { id } });
    return { message: `Review #${id} deleted` };
  }
}
