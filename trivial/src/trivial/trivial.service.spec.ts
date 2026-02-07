import { Test, TestingModule } from '@nestjs/testing';
import { TrivialService } from './trivial.service';

describe('TrivialService', () => {
  let service: TrivialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrivialService],
    }).compile();

    service = module.get<TrivialService>(TrivialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
