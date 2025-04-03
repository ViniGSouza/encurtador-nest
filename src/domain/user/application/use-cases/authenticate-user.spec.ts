import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { AuthenticateUserUseCase } from './authenticate-user';
import { FakeHashComparer } from 'test/cryptography/fake-hash-comparer';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { makeInMemoryUserRepository } from 'test/repositories/factories/make-in-memory-user-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { User } from '../../enterprise/entities/user';

let inMemoryUserRepository: InMemoryUserRepository;
let fakeHashComparer: FakeHashComparer;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = makeInMemoryUserRepository();
    fakeHashComparer = new FakeHashComparer();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeHashComparer,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate a user', async () => {
    // Criando usuário com senha já hasheada
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashed_123456',
    });

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.accessToken).toBeTruthy();
      expect(result.value.user.id).toEqual(user.id);
    }
  });

  it('should not be able to authenticate with wrong email', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashed_123456',
    });

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
