import { PartialType } from '@nestjs/mapped-types';
import { CreateBreweryDto } from './create-brewery.dto.js';

export class UpdateBreweryDto extends PartialType(CreateBreweryDto) {}
