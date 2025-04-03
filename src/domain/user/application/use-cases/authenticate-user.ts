import { Either, left, right } from '@/core/either';
import { User } from '../../enterprise/entities/user';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
import { UserRepository } from '../repositories/user-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
    user: User;
  }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    });

    return right({
      accessToken,
      user,
    });
  }
}
