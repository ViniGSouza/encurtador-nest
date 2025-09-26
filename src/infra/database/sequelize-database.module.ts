import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { SequelizeService } from './sequelize/sequelize.service';
import { SequelizeUserRepository } from './sequelize/repositories/sequelize-user-repository';
import { SequelizeShortUrlRepository } from './sequelize/repositories/sequelize-short-url-repository';
import { SequelizeUrlClickRepository } from './sequelize/repositories/sequelize-url-click-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { ShortUrlRepository } from '@/domain/url/application/repositories/short-url';
import { UrlClickRepository } from '@/domain/url/application/repositories/url-click';

// Models
import { User } from './sequelize/models/user.model';
import { ShortUrl } from './sequelize/models/short-url.model';
import { UrlClick } from './sequelize/models/url-click.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        dialect: 'postgres',
        uri: envService.get('DATABASE_URL'),
        models: [User, ShortUrl, UrlClick],
        autoLoadModels: true,
        synchronize: false, // Em produção não sincronizar automaticamente
        logging: false,
      }),
    }),
    SequelizeModule.forFeature([User, ShortUrl, UrlClick]),
  ],
  providers: [
    SequelizeService,
    SequelizeUserRepository,
    SequelizeShortUrlRepository,
    SequelizeUrlClickRepository,
    {
      provide: UserRepository,
      useExisting: SequelizeUserRepository,
    },
    {
      provide: ShortUrlRepository,
      useExisting: SequelizeShortUrlRepository,
    },
    {
      provide: UrlClickRepository,
      useExisting: SequelizeUrlClickRepository,
    },
  ],
  exports: [
    UserRepository,
    ShortUrlRepository,
    UrlClickRepository,
    SequelizeService,
  ],
})
export class SequelizeDatabaseModule {}
