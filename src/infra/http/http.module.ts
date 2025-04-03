import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateAccountController } from './controllers/create-account-controller';
import { RegisterUserUseCase } from '@/domain/user/application/use-cases/register-user';
import { AuthenticateUserUseCase } from '@/domain/user/application/use-cases/authenticate-user';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
