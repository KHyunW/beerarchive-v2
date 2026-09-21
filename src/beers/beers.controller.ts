import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BeersService } from './beers.service.js';
import { CreateBeerDto } from './dto/create-beer.dto.js';
import { UpdateBeerDto } from './dto/update-beer.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBeerDto: CreateBeerDto) {
    return this.beersService.create(createBeerDto);
  }

  @Get()
  findAll() {
    return this.beersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerDto) {
    return this.beersService.update(+id, updateBeerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beersService.remove(+id);
  }
}
