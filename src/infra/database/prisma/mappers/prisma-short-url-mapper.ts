import { ShortUrl as PrismaShortUrl } from '@prisma/client';
import { ShortUrl } from '@/domain/url/enterprise/entities/short-url';
import { UniqueEntityID } from '@/core/entities';

export class PrismaShortUrlMapper {
  static toDomain(raw: PrismaShortUrl): ShortUrl {
    return ShortUrl.create(
      {
        originalUrl: raw.originalUrl,
        shortCode: raw.shortCode,
        userId: raw.userId || '',
        clicks: raw.clicks,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? new Date(),
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(shortUrl: ShortUrl): PrismaShortUrl {
    return {
      id: shortUrl.id.toString(),
      originalUrl: shortUrl.originalUrl,
      shortCode: shortUrl.shortCode,
      userId: shortUrl.userId || null,
      clicks: shortUrl.clicks,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
      deletedAt: null,
    };
  }
}
