import { Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Injectable } from '@nestjs/common';
import { ShortUrlRepository } from '../repositories/short-url';

interface DeleteShortUrlUseCaseRequest {
  shortUrlId: string;
  userId: string;
}

type DeleteShortUrlUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

@Injectable()
export class DeleteShortUrlUseCase {
  constructor(private shortUrlRepository: ShortUrlRepository) {}

  async execute({
    shortUrlId,
    userId,
  }: DeleteShortUrlUseCaseRequest): Promise<DeleteShortUrlUseCaseResponse> {
    const shortUrl = await this.shortUrlRepository.findById(shortUrlId);

    if (!shortUrl) {
      return left(new ResourceNotFoundError());
    }

    if (shortUrl.userId !== userId) {
      return left(new NotAllowedError());
    }

    await this.shortUrlRepository.delete(shortUrl);

    return right({});
  }
}
