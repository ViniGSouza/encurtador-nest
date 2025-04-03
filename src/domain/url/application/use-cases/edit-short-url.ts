import { Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Injectable } from '@nestjs/common';
import { ShortUrl } from '../../enterprise/entities/short-url';
import { ShortUrlRepository } from '../repositories/short-url';

interface EditShortUrlUseCaseRequest {
  shortUrlId: string;
  originalUrl: string;
  userId: string;
}

type EditShortUrlUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    shortUrl: ShortUrl;
  }
>;

@Injectable()
export class EditShortUrlUseCase {
  constructor(private shortUrlRepository: ShortUrlRepository) {}

  async execute({
    shortUrlId,
    originalUrl,
    userId,
  }: EditShortUrlUseCaseRequest): Promise<EditShortUrlUseCaseResponse> {
    const shortUrl = await this.shortUrlRepository.findById(shortUrlId);

    if (!shortUrl) {
      return left(new ResourceNotFoundError());
    }

    if (shortUrl.userId !== userId) {
      return left(new NotAllowedError());
    }

    shortUrl.originalUrl = originalUrl;
    shortUrl.updatedAt = new Date();

    await this.shortUrlRepository.save(shortUrl);

    return right({
      shortUrl,
    });
  }
}
