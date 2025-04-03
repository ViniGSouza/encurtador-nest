import {
  FindManyByShortUrlId,
  UrlClickRepository,
} from '@/domain/url/application/repositories/url-click';
import { UrlClick } from '@/domain/url/enterprise/entities/url-click';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaUrlClickMapper } from '../mappers/prisma-url-click-mapper';

@Injectable()
export class PrismaUrlClickRepository implements UrlClickRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<UrlClick | null> {
    const urlClick = await this.prisma.urlClick.findUnique({
      where: { id },
    });

    if (!urlClick) {
      return null;
    }

    return PrismaUrlClickMapper.toDomain(urlClick);
  }

  async findByShortUrlId(shortUrlId: string): Promise<UrlClick | null> {
    const urlClick = await this.prisma.urlClick.findFirst({
      where: { shortUrlId },
      orderBy: { createdAt: 'desc' },
    });

    if (!urlClick) {
      return null;
    }

    return PrismaUrlClickMapper.toDomain(urlClick);
  }

  async findManyByShortUrlId({
    shortUrlId,
    page,
    perPage,
  }: FindManyByShortUrlId): Promise<UrlClick[]> {
    const urlClicks = await this.prisma.urlClick.findMany({
      where: { shortUrlId },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: 'desc' },
    });

    return urlClicks.map(PrismaUrlClickMapper.toDomain);
  }

  async countByShortUrlId(shortUrlId: string): Promise<number> {
    return this.prisma.urlClick.count({
      where: { shortUrlId },
    });
  }

  async create(urlClick: UrlClick): Promise<void> {
    const data = PrismaUrlClickMapper.toPrisma(urlClick);

    await this.prisma.urlClick.create({
      data,
    });
  }

  async save(urlClick: UrlClick): Promise<void> {
    const data = PrismaUrlClickMapper.toPrisma(urlClick);

    await this.prisma.urlClick.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(urlClick: UrlClick): Promise<void> {
    await this.prisma.urlClick.delete({
      where: { id: urlClick.id.toString() },
    });
  }
}
