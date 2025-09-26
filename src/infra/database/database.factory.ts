import { Injectable } from '@nestjs/common';
import { EnvService } from '../env/env.service';

// Prisma imports
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaShortUrlRepository } from './prisma/repositories/prisma-short-url-repository';
import { PrismaUrlClickRepository } from './prisma/repositories/prisma-url-click-repository';

// Sequelize imports
import { SequelizeService } from './sequelize/sequelize.service';
import { SequelizeUserRepository } from './sequelize/repositories/sequelize-user-repository';
import { SequelizeShortUrlRepository } from './sequelize/repositories/sequelize-short-url-repository';
import { SequelizeUrlClickRepository } from './sequelize/repositories/sequelize-url-click-repository';

// Domain contracts
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { ShortUrlRepository } from '@/domain/url/application/repositories/short-url';
import { UrlClickRepository } from '@/domain/url/application/repositories/url-click';

export interface DatabaseRepositories {
  userRepository: UserRepository;
  shortUrlRepository: ShortUrlRepository;
  urlClickRepository: UrlClickRepository;
}

@Injectable()
export class DatabaseFactory {
  constructor(
    private envService: EnvService,
    // Prisma
    private prismaService?: PrismaService,
    private prismaUserRepository?: PrismaUserRepository,
    private prismaShortUrlRepository?: PrismaShortUrlRepository,
    private prismaUrlClickRepository?: PrismaUrlClickRepository,
    // Sequelize
    private sequelizeService?: SequelizeService,
    private sequelizeUserRepository?: SequelizeUserRepository,
    private sequelizeShortUrlRepository?: SequelizeShortUrlRepository,
    private sequelizeUrlClickRepository?: SequelizeUrlClickRepository,
  ) {}

  createRepositories(): DatabaseRepositories {
    const ormProvider = this.envService.get('ORM_PROVIDER');

    switch (ormProvider) {
      case 'sequelize':
        return this.createSequelizeRepositories();
      case 'prisma':
      default:
        return this.createPrismaRepositories();
    }
  }

  private createPrismaRepositories(): DatabaseRepositories {
    if (
      !this.prismaUserRepository ||
      !this.prismaShortUrlRepository ||
      !this.prismaUrlClickRepository
    ) {
      throw new Error('Prisma repositories not available');
    }

    return {
      userRepository: this.prismaUserRepository,
      shortUrlRepository: this.prismaShortUrlRepository,
      urlClickRepository: this.prismaUrlClickRepository,
    };
  }

  private createSequelizeRepositories(): DatabaseRepositories {
    if (
      !this.sequelizeUserRepository ||
      !this.sequelizeShortUrlRepository ||
      !this.sequelizeUrlClickRepository
    ) {
      throw new Error('Sequelize repositories not available');
    }

    return {
      userRepository: this.sequelizeUserRepository,
      shortUrlRepository: this.sequelizeShortUrlRepository,
      urlClickRepository: this.sequelizeUrlClickRepository,
    };
  }
}
