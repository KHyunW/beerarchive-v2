import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: '첫 게시글' })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({ example: '안녕하세요' })
  @IsString()
  @MinLength(1)
  content: string;
}