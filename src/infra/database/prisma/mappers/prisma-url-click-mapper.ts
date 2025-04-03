import { UrlClick as PrismaUrlClick } from '@prisma/client';
import { UrlClick } from '@/domain/url/enterprise/entities/url-click';
import { UniqueEntityID } from '@/core/entities';

export class PrismaUrlClickMapper {
  static toDomain(raw: PrismaUrlClick): UrlClick {
    return UrlClick.create(
      {
        shortUrlId: raw.shortUrlId,
        ipAddress: raw.ipAddress || '',
        userAgent: raw.userAgent || '',
        referer: raw.referer || '',
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(urlClick: UrlClick): PrismaUrlClick {
    return {
      id: urlClick.id.toString(),
      shortUrlId: urlClick.shortUrlId,
      ipAddress: urlClick.ipAddress || null,
      userAgent: urlClick.userAgent || null,
      referer: urlClick.referer || null,
      createdAt: new Date(),
    };
  }
}
