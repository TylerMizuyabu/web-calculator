import { Test, TestingModule } from '@nestjs/testing';
import { CalculationsGateway } from './calculations.gateway';

describe('CalculationsController', () => {
  let controller: CalculationsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculationsGateway],
    }).compile();

    controller = module.get<CalculationsGateway>(CalculationsGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
