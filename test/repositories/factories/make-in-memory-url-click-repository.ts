import { InMemoryUrlClickRepository } from '../in-memory-url-click-repository';

export function makeInMemoryUrlClickRepository() {
  return new InMemoryUrlClickRepository();
}
