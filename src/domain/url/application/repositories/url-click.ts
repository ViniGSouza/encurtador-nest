import { Repository } from '@/core/repositories/repository';
import { UrlClick } from '../../enterprise/entities/url-click';

export interface FindManyByShortUrlId {
  shortUrlId: string;
  page: number;
  perPage: number;
}

export abstract class UrlClickRepository extends Repository<UrlClick> {
  abstract findByShortUrlId(shortUrlId: string): Promise<UrlClick | null>;
  abstract findManyByShortUrlId(
    params: FindManyByShortUrlId,
  ): Promise<UrlClick[]>;
  abstract countByShortUrlId(shortUrlId: string): Promise<number>;
}
