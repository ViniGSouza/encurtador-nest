import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { RegisterUserUseCase } from './register-user';
import { FakeHashGenerator } from 'test/cryptography/fake-hash-generator';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { makeInMemoryUserRepository } from 'test/repositories/factories/make-in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let fakeHashGenerator: FakeHashGenerator;
let sut: RegisterUserUseCase;

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = makeInMemoryUserRepository();
    fakeHashGenerator = new FakeHashGenerator();
    sut = new RegisterUserUseCase(inMemoryUserRepository, fakeHashGenerator);
  });

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'Encurtador de URL',
      email: 'encurtador@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.user.name).toEqual('Encurtador de URL');
      expect(result.value.user.email).toEqual('encurtador@example.com');
    }
    expect(inMemoryUserRepository.items[0].id).toBeTruthy();
    expect(inMemoryUserRepository.items[0].password).toEqual('hashed_123456');
  });

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'Encurtador de URL',
      email: 'encurtador@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUserRepository.items[0].password).toEqual('hashed_123456');
  });

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Encurtador de URL',
      email: 'encurtador@example.com',
      password: '123456',
    });

    const result = await sut.execute({
      name: 'Encurtador de URL',
      email: 'encurtador@example.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
