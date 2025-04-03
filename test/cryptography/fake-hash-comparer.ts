import { HashComparer } from '@/domain/user/application/cryptography/hash-comparer';

export class FakeHashComparer implements HashComparer {
  async compare(plain: string, hash: string): Promise<boolean> {
    return `hashed_${plain}` === hash;
  }
}
