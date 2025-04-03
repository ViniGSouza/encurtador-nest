import { Repository } from '@/core/repositories/repository';
import { ShortUrl } from '../../enterprise/entities/short-url';

export interface FindByUserId {
  userId: string;
  page: number;
  perPage: number;
}

export abstract class ShortUrlRepository extends Repository<ShortUrl> {
  abstract findByShortCode(shortCode: string): Promise<ShortUrl | null>;
  abstract findManyByUserId(params: FindByUserId): Promise<ShortUrl[]>;
  abstract incrementClicks(id: string): Promise<void>;
  abstract countByUserId(userId: string): Promise<number>;
}
