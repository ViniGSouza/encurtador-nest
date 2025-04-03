import { InMemoryShortUrlRepository } from 'test/repositories/in-memory-short-url-repository';
import { GetShortUrlByCodeUseCase } from './get-short-url-by-code';
import { makeInMemoryShortUrlRepository } from 'test/repositories/factories/make-in-memory-short-url-repository';
import { ShortUrl } from '../../enterprise/entities/short-url';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

let inMemoryShortUrlRepository: InMemoryShortUrlRepository;
let sut: GetShortUrlByCodeUseCase;

describe('Get Short URL By Code Use Case', () => {
  beforeEach(() => {
    inMemoryShortUrlRepository = makeInMemoryShortUrlRepository();
    sut = new GetShortUrlByCodeUseCase(inMemoryShortUrlRepository);
  });

  it('should be able to get a short url by code', async () => {
    const shortUrl = ShortUrl.create({
      originalUrl: 'https://example.com',
      shortCode: 'abc123',
      userId: 'user-1',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await inMemoryShortUrlRepository.create(shortUrl);

    const result = await sut.execute({
      shortCode: 'abc123',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.shortUrl.originalUrl).toEqual('https://example.com');
      expect(result.value.shortUrl.shortCode).toEqual('abc123');
    }
  });

  it('should not be able to get a short url with a non-existent code', async () => {
    const result = await sut.execute({
      shortCode: 'non-existent',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
