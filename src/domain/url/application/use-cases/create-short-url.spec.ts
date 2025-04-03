import { makeInMemoryShortUrlRepository } from 'test/repositories/factories/make-in-memory-short-url-repository';
import { InMemoryShortUrlRepository } from 'test/repositories/in-memory-short-url-repository';
import { CreateShortUrlUseCase } from './create-short-url';

let inMemoryShortUrlRepository: InMemoryShortUrlRepository;
let sut: CreateShortUrlUseCase;

describe('Create Short URL Use Case', () => {
  beforeEach(() => {
    inMemoryShortUrlRepository = makeInMemoryShortUrlRepository();
    sut = new CreateShortUrlUseCase(inMemoryShortUrlRepository);
  });

  it('should be able to create a short URL', async () => {
    const result = await sut.execute({
      originalUrl: 'https://example.com',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.shortUrl.originalUrl).toEqual('https://example.com');
      expect(result.value.shortUrl.shortCode).toBeTruthy();
      expect(result.value.shortUrl.shortCode).toHaveLength(6);
      expect(result.value.shortUrl.clicks).toEqual(0);
    }

    expect(inMemoryShortUrlRepository.items).toHaveLength(1);
  });

  it('should be able to create a short URL with a user id', async () => {
    const userId = 'user-1';

    const result = await sut.execute({
      originalUrl: 'https://example.com',
      userId,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.shortUrl.originalUrl).toEqual('https://example.com');
      expect(result.value.shortUrl.userId).toEqual(userId);
    }

    expect(inMemoryShortUrlRepository.items).toHaveLength(1);
  });
});
