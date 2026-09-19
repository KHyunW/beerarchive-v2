import { IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class CreateBeerDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  style?: string;

  @IsNumber()
  @IsOptional()
  abv?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  breweryId: number;
}