import { InMemoryUserRepository } from '../in-memory-user-repository';

export function makeInMemoryUserRepository() {
  return new InMemoryUserRepository();
}
