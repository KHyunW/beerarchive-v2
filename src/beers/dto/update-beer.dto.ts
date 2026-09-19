import { PartialType } from '@nestjs/mapped-types';
import { CreateBeerDto } from './create-beer.dto.js';

export class UpdateBeerDto extends PartialType(CreateBeerDto) {}
