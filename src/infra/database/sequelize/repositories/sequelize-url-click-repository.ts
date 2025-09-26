import {
  FindManyByShortUrlId,
  UrlClickRepository,
} from '@/domain/url/application/repositories/url-click';
import { UrlClick } from '@/domain/url/enterprise/entities/url-click';
import { SequelizeService } from '../sequelize.service';
import { Injectable } from '@nestjs/common';
import { SequelizeUrlClickMapper } from '../mappers/sequelize-url-click-mapper';
import { UrlClick as SequelizeUrlClickModel } from '../models/url-click.model';

@Injectable()
export class SequelizeUrlClickRepository implements UrlClickRepository {
  constructor(private sequelizeService: SequelizeService) {}

  async findById(id: string): Promise<UrlClick | null> {
    const urlClick = await SequelizeUrlClickModel.findByPk(id);

    if (!urlClick) {
      return null;
    }

    return SequelizeUrlClickMapper.toDomain(urlClick);
  }

  async findByShortUrlId(shortUrlId: string): Promise<UrlClick | null> {
    const urlClick = await SequelizeUrlClickModel.findOne({
      where: { shortUrlId },
      order: [['createdAt', 'DESC']],
    });

    if (!urlClick) {
      return null;
    }

    return SequelizeUrlClickMapper.toDomain(urlClick);
  }

  async findManyByShortUrlId({
    shortUrlId,
    page,
    perPage,
  }: FindManyByShortUrlId): Promise<UrlClick[]> {
    const urlClicks = await SequelizeUrlClickModel.findAll({
      where: { shortUrlId },
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [['createdAt', 'DESC']],
    });

    return urlClicks.map(SequelizeUrlClickMapper.toDomain);
  }

  async countByShortUrlId(shortUrlId: string): Promise<number> {
    return SequelizeUrlClickModel.count({
      where: { shortUrlId },
    });
  }

  async create(urlClick: UrlClick): Promise<void> {
    const data = SequelizeUrlClickMapper.toSequelize(urlClick);

    await SequelizeUrlClickModel.create(data);
  }

  async save(urlClick: UrlClick): Promise<void> {
    const data = SequelizeUrlClickMapper.toSequelize(urlClick);

    await SequelizeUrlClickModel.update(data, {
      where: { id: data.id },
    });
  }

  async delete(urlClick: UrlClick): Promise<void> {
    await SequelizeUrlClickModel.destroy({
      where: { id: urlClick.id.toString() },
    });
  }
}
