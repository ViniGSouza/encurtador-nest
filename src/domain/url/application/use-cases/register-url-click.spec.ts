import { InMemoryShortUrlRepository } from 'test/repositories/in-memory-short-url-repository';
import { RegisterUrlClickUseCase } from './register-url-click';
import { makeInMemoryShortUrlRepository } from 'test/repositories/factories/make-in-memory-short-url-repository';
import { ShortUrl } from '../../enterprise/entities/short-url';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { InMemoryUrlClickRepository } from 'test/repositories/in-memory-url-click-repository';
import { makeInMemoryUrlClickRepository } from 'test/repositories/factories/make-in-memory-url-click-repository';

let inMemoryShortUrlRepository: InMemoryShortUrlRepository;
let inMemoryUrlClickRepository: InMemoryUrlClickRepository;
let sut: RegisterUrlClickUseCase;

describe('Register URL Click Use Case', () => {
  beforeEach(() => {
    inMemoryShortUrlRepository = makeInMemoryShortUrlRepository();
    inMemoryUrlClickRepository = makeInMemoryUrlClickRepository();
    sut = new RegisterUrlClickUseCase(
      inMemoryShortUrlRepository,
      inMemoryUrlClickRepository,
    );
  });

  it('should be able to register a click on a short url', async () => {
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
      shortUrlId: shortUrl.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    const updatedShortUrl =
      await inMemoryShortUrlRepository.findByShortCode('abc123');

    expect(updatedShortUrl?.clicks).toBe(1);
  });

  it('should not be able to register a click on a non-existent short url', async () => {
    const result = await sut.execute({
      shortUrlId: 'non-existent-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
