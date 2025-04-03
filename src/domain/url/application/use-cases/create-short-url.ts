import { Either, right } from '@/core/either';
import { generateShortCode } from '@/shared/utils/utils';
import { Injectable } from '@nestjs/common';
import { ShortUrl } from '../../enterprise/entities/short-url';
import { ShortUrlRepository } from '../repositories/short-url';

interface CreateShortUrlUseCaseRequest {
  originalUrl: string;
  userId?: string;
}

type CreateShortUrlUseCaseResponse = Either<
  null,
  {
    shortUrl: ShortUrl;
  }
>;

@Injectable()
export class CreateShortUrlUseCase {
  constructor(private shortUrlRepository: ShortUrlRepository) {}

  async execute({
    originalUrl,
    userId,
  }: CreateShortUrlUseCaseRequest): Promise<CreateShortUrlUseCaseResponse> {
    const shortCode = generateShortCode(6);

    const shortUrl = ShortUrl.create({
      originalUrl,
      shortCode,
      userId: userId || '',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.shortUrlRepository.create(shortUrl);

    return right({
      shortUrl,
    });
  }
}
