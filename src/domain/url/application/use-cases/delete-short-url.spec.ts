import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { makeInMemoryShortUrlRepository } from 'test/repositories/factories/make-in-memory-short-url-repository';
import { InMemoryShortUrlRepository } from 'test/repositories/in-memory-short-url-repository';
import { ShortUrl } from '../../enterprise/entities/short-url';
import { DeleteShortUrlUseCase } from './delete-short-url';

let inMemoryShortUrlRepository: InMemoryShortUrlRepository;
let sut: DeleteShortUrlUseCase;

describe('Delete Short URL', () => {
  beforeEach(() => {
    inMemoryShortUrlRepository = makeInMemoryShortUrlRepository();
    sut = new DeleteShortUrlUseCase(inMemoryShortUrlRepository);
  });

  it('should be able to delete a short URL', async () => {
    const shortUrl = ShortUrl.create({
      originalUrl: 'https://example.com',
      shortCode: 'abc123',
      userId: 'user-01',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await inMemoryShortUrlRepository.create(shortUrl);

    const result = await sut.execute({
      shortUrlId: shortUrl.id.toString(),
      userId: 'user-01',
    });

    expect(result.isRight()).toBe(true);

    const deletedShortUrl = await inMemoryShortUrlRepository.findById(
      shortUrl.id.toString(),
    );
    expect(deletedShortUrl).toBeNull();
  });

  it('should not be able to delete a short URL that does not exist', async () => {
    const result = await sut.execute({
      shortUrlId: 'non-existing-short-url',
      userId: 'user-01',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to delete a short URL from another user', async () => {
    const shortUrl = ShortUrl.create({
      originalUrl: 'https://example.com',
      shortCode: 'abc123',
      userId: 'user-01',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await inMemoryShortUrlRepository.create(shortUrl);

    const result = await sut.execute({
      shortUrlId: shortUrl.id.toString(),
      userId: 'user-02',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
