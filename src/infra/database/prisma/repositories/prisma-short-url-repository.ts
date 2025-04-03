import {
  FindByUserId,
  ShortUrlRepository,
} from '@/domain/url/application/repositories/short-url';
import { ShortUrl } from '@/domain/url/enterprise/entities/short-url';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaShortUrlMapper } from '../mappers/prisma-short-url-mapper';

@Injectable()
export class PrismaShortUrlRepository implements ShortUrlRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<ShortUrl | null> {
    const shortUrl = await this.prisma.shortUrl.findUnique({
      where: { id, deletedAt: null },
    });

    if (!shortUrl) {
      return null;
    }

    return PrismaShortUrlMapper.toDomain(shortUrl);
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl | null> {
    const shortUrl = await this.prisma.shortUrl.findUnique({
      where: { shortCode, deletedAt: null },
    });

    if (!shortUrl) {
      return null;
    }

    return PrismaShortUrlMapper.toDomain(shortUrl);
  }

  async findManyByUserId({
    userId,
    page,
    perPage,
  }: FindByUserId): Promise<ShortUrl[]> {
    const shortUrls = await this.prisma.shortUrl.findMany({
      where: { userId, deletedAt: null },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: 'desc' },
    });

    return shortUrls.map(PrismaShortUrlMapper.toDomain);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.prisma.shortUrl.count({
      where: { userId, deletedAt: null },
    });
  }

  async incrementClicks(id: string): Promise<void> {
    await this.prisma.shortUrl.update({
      where: { id, deletedAt: null },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
  }

  async create(shortUrl: ShortUrl): Promise<void> {
    const data = PrismaShortUrlMapper.toPrisma(shortUrl);

    await this.prisma.shortUrl.create({
      data,
    });
  }

  async save(shortUrl: ShortUrl): Promise<void> {
    const data = PrismaShortUrlMapper.toPrisma(shortUrl);

    await this.prisma.shortUrl.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(shortUrl: ShortUrl): Promise<void> {
    await this.prisma.shortUrl.update({
      where: { id: shortUrl.id.toString() },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
