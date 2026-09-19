import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBeerDto } from './dto/create-beer.dto.js';
import { UpdateBeerDto } from './dto/update-beer.dto.js';

@Injectable()
export class BeersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBeerDto: CreateBeerDto) {
    const brewery = await this.prisma.brewery.findUnique({
      where: { id: createBeerDto.breweryId },
    });
    if (!brewery) {
      throw new NotFoundException(`Brewery #${createBeerDto.breweryId} not found`);
    }
    return this.prisma.beer.create({ data: createBeerDto });
  }

  findAll() {
    return this.prisma.beer.findMany({
      include: { brewery: true },
    });
  }

  async findOne(id: number) {
    const beer = await this.prisma.beer.findUnique({
      where: { id },
      include: { brewery: true },
    });
    if (!beer) {
      throw new NotFoundException(`Beer #${id} not found`);
    }
    return beer;
  }

  async update(id: number, updateBeerDto: UpdateBeerDto) {
    await this.findOne(id);
    return this.prisma.beer.update({
      where: { id },
      data: updateBeerDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.beer.delete({ where: { id } });
    return { message: `Beer #${id} deleted` };
  }
}