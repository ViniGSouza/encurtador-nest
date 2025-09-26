import { ShortUrl as DomainShortUrl } from '@/domain/url/enterprise/entities/short-url';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  ShortUrl as SequelizeShortUrlModel,
  ShortUrlCreationAttributes,
} from '../models/short-url.model';

export class SequelizeShortUrlMapper {
  static toDomain(raw: SequelizeShortUrlModel): DomainShortUrl {
    return DomainShortUrl.create(
      {
        originalUrl: raw.originalUrl,
        shortCode: raw.shortCode,
        userId: raw.userId || '',
        clicks: raw.clicks,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toSequelize(shortUrl: DomainShortUrl): ShortUrlCreationAttributes {
    return {
      id: shortUrl.id.toString(),
      originalUrl: shortUrl.originalUrl,
      shortCode: shortUrl.shortCode,
      userId: shortUrl.userId || null,
      clicks: shortUrl.clicks,
    };
  }
}
