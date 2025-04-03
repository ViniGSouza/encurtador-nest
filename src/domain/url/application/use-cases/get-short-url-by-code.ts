import { Either, left, right } from '@/core/either';
import { ShortUrl } from '../../enterprise/entities/short-url';
import { ShortUrlRepository } from '../repositories/short-url';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface GetShortUrlByCodeUseCaseRequest {
  shortCode: string;
}

type GetShortUrlByCodeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    shortUrl: ShortUrl;
  }
>;

@Injectable()
export class GetShortUrlByCodeUseCase {
  constructor(private shortUrlRepository: ShortUrlRepository) {}

  async execute({
    shortCode,
  }: GetShortUrlByCodeUseCaseRequest): Promise<GetShortUrlByCodeUseCaseResponse> {
    const shortUrl = await this.shortUrlRepository.findByShortCode(shortCode);

    if (!shortUrl) {
      return left(new ResourceNotFoundError());
    }

    return right({
      shortUrl,
    });
  }
}
