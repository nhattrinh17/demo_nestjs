import { Test, TestingModule } from '@nestjs/testing';
import { UserVer2Controller } from './user-ver2.controller';

describe('UserVer2Controller', () => {
  let controller: UserVer2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVer2Controller],
    }).compile();

    controller = module.get<UserVer2Controller>(UserVer2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
