import { Test, TestingModule } from '@nestjs/testing';
import { TrivialController } from './trivial.controller';

describe('TrivialController', () => {
  let controller: TrivialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrivialController],
    }).compile();

    controller = module.get<TrivialController>(TrivialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
