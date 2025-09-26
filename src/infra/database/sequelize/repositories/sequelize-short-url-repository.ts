import {
  FindByUserId,
  ShortUrlRepository,
} from '@/domain/url/application/repositories/short-url';
import { ShortUrl } from '@/domain/url/enterprise/entities/short-url';
import { SequelizeService } from '../sequelize.service';
import { Injectable } from '@nestjs/common';
import { SequelizeShortUrlMapper } from '../mappers/sequelize-short-url-mapper';
import { ShortUrl as SequelizeShortUrlModel } from '../models/short-url.model';
import { Op } from 'sequelize';

@Injectable()
export class SequelizeShortUrlRepository implements ShortUrlRepository {
  constructor(private sequelizeService: SequelizeService) {}

  async findById(id: string): Promise<ShortUrl | null> {
    const shortUrl = await SequelizeShortUrlModel.findOne({
      where: {
        id,
        deletedAt: { [Op.is]: null },
      },
    });

    if (!shortUrl) {
      return null;
    }

    return SequelizeShortUrlMapper.toDomain(shortUrl);
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl | null> {
    const shortUrl = await SequelizeShortUrlModel.findOne({
      where: {
        shortCode,
        deletedAt: { [Op.is]: null },
      },
    });

    if (!shortUrl) {
      return null;
    }

    return SequelizeShortUrlMapper.toDomain(shortUrl);
  }

  async findManyByUserId({
    userId,
    page,
    perPage,
  }: FindByUserId): Promise<ShortUrl[]> {
    const shortUrls = await SequelizeShortUrlModel.findAll({
      where: {
        userId,
        deletedAt: { [Op.is]: null },
      },
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [['createdAt', 'DESC']],
    });

    return shortUrls.map(SequelizeShortUrlMapper.toDomain);
  }

  async countByUserId(userId: string): Promise<number> {
    return SequelizeShortUrlModel.count({
      where: {
        userId,
        deletedAt: { [Op.is]: null },
      },
    });
  }

  async incrementClicks(id: string): Promise<void> {
    await SequelizeShortUrlModel.increment('clicks', {
      where: {
        id,
        deletedAt: { [Op.is]: null },
      },
    });
  }

  async create(shortUrl: ShortUrl): Promise<void> {
    const data = SequelizeShortUrlMapper.toSequelize(shortUrl);

    await SequelizeShortUrlModel.create(data);
  }

  async save(shortUrl: ShortUrl): Promise<void> {
    const data = SequelizeShortUrlMapper.toSequelize(shortUrl);

    await SequelizeShortUrlModel.update(data, {
      where: { id: data.id },
    });
  }

  async delete(shortUrl: ShortUrl): Promise<void> {
    await SequelizeShortUrlModel.update(
      { deletedAt: new Date() },
      { where: { id: shortUrl.id.toString() } },
    );
  }
}
