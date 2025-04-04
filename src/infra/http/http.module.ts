import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateAccountController } from './controllers/create-account-controller';
import { RegisterUserUseCase } from '@/domain/user/application/use-cases/register-user';
import { AuthenticateUserUseCase } from '@/domain/user/application/use-cases/authenticate-user';
import { CreateShortUrlController } from './controllers/create-short-url-controller';
import { GetShortUrlByCodeController } from './controllers/get-short-url-by-code-controller';
import { RedirectShortUrlController } from './controllers/redirect-short-url-controller';
import { EditShortUrlController } from './controllers/edit-short-url-controller';
import { DeleteShortUrlController } from './controllers/delete-short-url-controller';
import { FetchUserShortUrlsController } from './controllers/fetch-user-short-urls-controller';
import { CreateShortUrlUseCase } from '@/domain/url/application/use-cases/create-short-url';
import { GetShortUrlByCodeUseCase } from '@/domain/url/application/use-cases/get-short-url-by-code';
import { RegisterUrlClickUseCase } from '@/domain/url/application/use-cases/register-url-click';
import { EditShortUrlUseCase } from '@/domain/url/application/use-cases/edit-short-url';
import { DeleteShortUrlUseCase } from '@/domain/url/application/use-cases/delete-short-url';
import { FetchUserShortUrlsUseCase } from '@/domain/url/application/use-cases/fetch-user-short-urls';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateShortUrlController,
    GetShortUrlByCodeController,
    RedirectShortUrlController,
    EditShortUrlController,
    DeleteShortUrlController,
    FetchUserShortUrlsController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateShortUrlUseCase,
    GetShortUrlByCodeUseCase,
    RegisterUrlClickUseCase,
    EditShortUrlUseCase,
    DeleteShortUrlUseCase,
    FetchUserShortUrlsUseCase,
  ],
})
export class HttpModule {}
