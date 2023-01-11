import { Test, TestingModule } from '@nestjs/testing';
import { UserVer2Service } from './user-ver2.service';

describe('UserVer2Service', () => {
  let service: UserVer2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVer2Service],
    }).compile();

    service = module.get<UserVer2Service>(UserVer2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
