import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { User } from '@/domain/user/enterprise/entities/user';
import { SequelizeService } from '../sequelize.service';
import { Injectable } from '@nestjs/common';
import { SequelizeUserMapper } from '../mappers/sequelize-user-mapper';
import { User as SequelizeUserModel } from '../models/user.model';

@Injectable()
export class SequelizeUserRepository implements UserRepository {
  constructor(private sequelizeService: SequelizeService) {}

  async findById(id: string): Promise<User | null> {
    const user = await SequelizeUserModel.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!user) {
      return null;
    }

    return SequelizeUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await SequelizeUserModel.findOne({
      where: {
        email,
        deletedAt: null,
      },
    });

    if (!user) {
      return null;
    }

    return SequelizeUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const data = SequelizeUserMapper.toSequelize(user);

    await SequelizeUserModel.create(data);
  }

  async save(user: User): Promise<void> {
    const data = SequelizeUserMapper.toSequelize(user);

    await SequelizeUserModel.update(data, {
      where: { id: data.id },
    });
  }

  async delete(user: User): Promise<void> {
    const data = SequelizeUserMapper.toSequelize(user);

    await SequelizeUserModel.update(
      { deletedAt: new Date() },
      { where: { id: data.id } },
    );
  }
}
