import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateLikeDto {
  @ApiPropertyOptional({ description: 'postId 또는 beerId 중 하나만 지정', example: 1 })
  @IsInt()
  @IsOptional()
  postId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  beerId?: number;
}