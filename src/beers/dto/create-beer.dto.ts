import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class CreateBeerDto {
  @ApiProperty({ example: '제주 위트 에일' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({ example: 'Witbier' })
  @IsString()
  @IsOptional()
  style?: string;

  @ApiPropertyOptional({ example: 5.0 })
  @IsNumber()
  @IsOptional()
  abv?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  breweryId: number;
}