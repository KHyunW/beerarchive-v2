import { Test, TestingModule } from '@nestjs/testing';
import { BeersController } from './beers.controller.js';
import { BeersService } from './beers.service.js';

describe('BeersController', () => {
  let controller: BeersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeersController],
      providers: [BeersService],
    }).compile();

    controller = module.get<BeersController>(BeersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
