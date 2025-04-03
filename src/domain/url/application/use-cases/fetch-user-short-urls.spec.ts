import { InMemoryShortUrlRepository } from 'test/repositories/in-memory-short-url-repository';
import { FetchUserShortUrlsUseCase } from './fetch-user-short-urls';
import { makeInMemoryShortUrlRepository } from 'test/repositories/factories/make-in-memory-short-url-repository';
import { ShortUrl } from '../../enterprise/entities/short-url';

let inMemoryShortUrlRepository: InMemoryShortUrlRepository;
let sut: FetchUserShortUrlsUseCase;

describe('Fetch User Short URLs', () => {
  beforeEach(() => {
    inMemoryShortUrlRepository = makeInMemoryShortUrlRepository();
    sut = new FetchUserShortUrlsUseCase(inMemoryShortUrlRepository);
  });

  it('should be able to fetch user short URLs', async () => {
    // Criar várias URLs curtas para o mesmo usuário
    for (let i = 1; i <= 22; i++) {
      await inMemoryShortUrlRepository.create(
        ShortUrl.create({
          originalUrl: `https://example.com/url-${i}`,
          shortCode: `code${i}`,
          userId: 'user-01',
          clicks: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    }

    // Criar algumas URLs para outro usuário
    for (let i = 1; i <= 3; i++) {
      await inMemoryShortUrlRepository.create(
        ShortUrl.create({
          originalUrl: `https://otheruser.com/url-${i}`,
          shortCode: `other${i}`,
          userId: 'user-02',
          clicks: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    }

    const result = await sut.execute({
      userId: 'user-01',
      page: 1,
      perPage: 10,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.shortUrls).toHaveLength(10);
    expect(result.value?.totalCount).toBe(22);

    // Verificar segunda página
    const resultPage2 = await sut.execute({
      userId: 'user-01',
      page: 2,
      perPage: 10,
    });

    expect(resultPage2.isRight()).toBe(true);
    expect(resultPage2.value?.shortUrls).toHaveLength(10);

    // Verificar terceira página (com apenas 2 itens)
    const resultPage3 = await sut.execute({
      userId: 'user-01',
      page: 3,
      perPage: 10,
    });

    expect(resultPage3.isRight()).toBe(true);
    expect(resultPage3.value?.shortUrls).toHaveLength(2);
  });

  it('should return empty array when user has no short URLs', async () => {
    const result = await sut.execute({
      userId: 'user-without-urls',
      page: 1,
      perPage: 10,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.shortUrls).toHaveLength(0);
    expect(result.value?.totalCount).toBe(0);
  });
});
