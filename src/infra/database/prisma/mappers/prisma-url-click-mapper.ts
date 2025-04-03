import { UrlClick as PrismaUrlClick } from '@prisma/client';
import { UrlClick } from '@/domain/url/enterprise/entities/url-click';
import { UniqueEntityID } from '@/core/entities';

export class PrismaUrlClickMapper {
  static toDomain(raw: PrismaUrlClick): UrlClick {
    return UrlClick.create(
      {
        shortUrlId: raw.shortUrlId,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(urlClick: UrlClick): PrismaUrlClick {
    return {
      id: urlClick.id.toString(),
      shortUrlId: urlClick.shortUrlId,
      createdAt: new Date(),
    };
  }
}
