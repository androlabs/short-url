import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { ShortUrl } from 'src/schemas/short-url.schema';
import { ShortUrlRepository } from '../repository';
import { CreateShortUrlService } from './create-short-url.service';

describe(CreateShortUrlService, () => {
  let sut: CreateShortUrlService;
  let shortUrlRepository: MockProxy<ShortUrlRepository>;

  const makeSut = async (): Promise<CreateShortUrlService> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: '.env.test' })],
      providers: [
        CreateShortUrlService,
        {
          provide: ShortUrlRepository,
          useValue: shortUrlRepository,
        },
      ],
    }).compile();

    sut = module.get<CreateShortUrlService>(CreateShortUrlService);

    return sut;
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    shortUrlRepository = mock<ShortUrlRepository>();
  });

  it('should be defined', async () => {
    const sut = await makeSut();

    expect(sut).toBeDefined();
  });

  it('should be return short-url created', async () => {
    const sut = await makeSut();
    const data = { name: 'My short link', originalUrl: 'https://google.com' };

    shortUrlRepository.save.mockImplementationOnce((value) => {
      return Promise.resolve({ ...data, ...value } as ShortUrl);
    });

    const result = await sut.execute(data);

    expect(result.shortUrl).toHaveLength(6);
  });
});
