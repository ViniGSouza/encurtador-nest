import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaShortUrlRepository } from './prisma/repositories/prisma-short-url-repository';
import { PrismaUrlClickRepository } from './prisma/repositories/prisma-url-click-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { ShortUrlRepository } from '@/domain/url/application/repositories/short-url';
import { UrlClickRepository } from '@/domain/url/application/repositories/url-click';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ShortUrlRepository,
      useClass: PrismaShortUrlRepository,
    },
    {
      provide: UrlClickRepository,
      useClass: PrismaUrlClickRepository,
    },
  ],
  exports: [UserRepository, ShortUrlRepository, UrlClickRepository],
})
export class DatabaseModule {}
