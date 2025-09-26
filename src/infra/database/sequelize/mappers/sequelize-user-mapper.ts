import { User as DomainUser } from '@/domain/user/enterprise/entities/user';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  User as SequelizeUserModel,
  UserCreationAttributes,
} from '../models/user.model';

export class SequelizeUserMapper {
  static toDomain(raw: SequelizeUserModel): DomainUser {
    return DomainUser.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toSequelize(user: DomainUser): UserCreationAttributes {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
