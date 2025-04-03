import { HashGenerator } from '@/domain/user/application/cryptography/hash-generator';

export class FakeHashGenerator implements HashGenerator {
  async hash(plain: string): Promise<string> {
    // Retorna o texto original com um prefixo 'hashed_' para simular um hash
    return `hashed_${plain}`;
  }
}
