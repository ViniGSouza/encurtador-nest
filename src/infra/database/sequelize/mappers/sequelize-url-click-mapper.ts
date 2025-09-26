import { UrlClick as DomainUrlClick } from '@/domain/url/enterprise/entities/url-click';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  UrlClick as SequelizeUrlClickModel,
  UrlClickCreationAttributes,
} from '../models/url-click.model';

export class SequelizeUrlClickMapper {
  static toDomain(raw: SequelizeUrlClickModel): DomainUrlClick {
    return DomainUrlClick.create(
      {
        shortUrlId: raw.shortUrlId,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toSequelize(urlClick: DomainUrlClick): UrlClickCreationAttributes {
    return {
      id: urlClick.id.toString(),
      shortUrlId: urlClick.shortUrlId,
    };
  }
}
