import { Either, right } from '@/core/either';
import { ShortUrl } from '../../enterprise/entities/short-url';
import { ShortUrlRepository } from '../repositories/short-url';
import { Injectable } from '@nestjs/common';

interface FetchUserShortUrlsUseCaseRequest {
  userId: string;
  page: number;
  perPage: number;
}

type FetchUserShortUrlsUseCaseResponse = Either<
  null,
  {
    shortUrls: ShortUrl[];
    totalCount: number;
  }
>;

@Injectable()
export class FetchUserShortUrlsUseCase {
  constructor(private shortUrlRepository: ShortUrlRepository) {}

  async execute({
    userId,
    page,
    perPage,
  }: FetchUserShortUrlsUseCaseRequest): Promise<FetchUserShortUrlsUseCaseResponse> {
    const shortUrls = await this.shortUrlRepository.findManyByUserId({
      userId,
      page,
      perPage,
    });

    const totalCount = await this.shortUrlRepository.countByUserId(userId);

    return right({
      shortUrls,
      totalCount,
    });
  }
}
