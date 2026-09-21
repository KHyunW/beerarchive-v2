import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BreweriesService } from './breweries.service.js';
import { CreateBreweryDto } from './dto/create-brewery.dto.js';
import { UpdateBreweryDto } from './dto/update-brewery.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('breweries')
export class BreweriesController {
  constructor(private readonly breweriesService: BreweriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBreweryDto: CreateBreweryDto) {
    return this.breweriesService.create(createBreweryDto);
  }

  @Get()
  findAll() {
    return this.breweriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breweriesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreweryDto: UpdateBreweryDto) {
    return this.breweriesService.update(+id, updateBreweryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breweriesService.remove(+id);
  }
}
