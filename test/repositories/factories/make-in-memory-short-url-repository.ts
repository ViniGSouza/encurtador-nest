import { InMemoryShortUrlRepository } from '../in-memory-short-url-repository';

export function makeInMemoryShortUrlRepository() {
  return new InMemoryShortUrlRepository();
}
