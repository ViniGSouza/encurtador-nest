import { Either, left, right } from '@/core/either';
import { ShortUrlRepository } from '../repositories/short-url';
import { UrlClickRepository } from '../repositories/url-click';
import { UrlClick } from '../../enterprise/entities/url-click';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface RegisterUrlClickUseCaseRequest {
  shortUrlId: string;
  ipAddress?: string;
  userAgent?: string;
  referer?: string;
}

type RegisterUrlClickUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    urlClick: UrlClick;
  }
>;

@Injectable()
export class RegisterUrlClickUseCase {
  constructor(
    private shortUrlRepository: ShortUrlRepository,
    private urlClickRepository: UrlClickRepository,
  ) {}

  async execute({
    shortUrlId,
    ipAddress,
    userAgent,
    referer,
  }: RegisterUrlClickUseCaseRequest): Promise<RegisterUrlClickUseCaseResponse> {
    const shortUrl = await this.shortUrlRepository.findById(shortUrlId);

    if (!shortUrl) {
      return left(new ResourceNotFoundError());
    }

    await this.shortUrlRepository.incrementClicks(shortUrlId);

    const urlClick = UrlClick.create({
      shortUrlId,
      ipAddress: ipAddress || '',
      userAgent: userAgent || '',
      referer: referer || '',
    });

    await this.urlClickRepository.create(urlClick);

    return right({
      urlClick,
    });
  }
}
