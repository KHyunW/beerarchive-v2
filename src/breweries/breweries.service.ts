import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreweryDto } from './dto/create-brewery.dto.js';
import { UpdateBreweryDto } from './dto/update-brewery.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BreweriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBreweryDto: CreateBreweryDto) {
    return this.prisma.brewery.create({ data: createBreweryDto });
  }

  findAll() {
    return this.prisma.brewery.findMany({
      include: { beers: true },
    });
  }

  async findOne(id: number) {
    const brewery = await this.prisma.brewery.findUnique({
      where: { id },
      include: { beers: true },
    });
    if (!brewery) {
      throw new NotFoundException(`Brewery #${id} not found`);
    }
    return brewery;
  }

  async update(id: number, updateBreweryDto: UpdateBreweryDto) {
    await this.findOne(id);
    return this.prisma.brewery.update({
      where: { id },
      data: updateBreweryDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.brewery.delete({ where: { id }});
    return { message: `Brewery #${id} deleted` };
  }
}
