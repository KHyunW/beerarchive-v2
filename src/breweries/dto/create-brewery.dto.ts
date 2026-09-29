import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class CreateBreweryDto {
  @ApiProperty({ example: '제주맥주' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '제주시' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 33.51 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ example: 126.52 })
  @IsNumber()
  @IsOptional()
  longitude?: number;
}