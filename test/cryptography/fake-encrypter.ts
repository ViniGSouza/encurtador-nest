import { Encrypter } from '@/domain/user/application/cryptography/encrypter';

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }
}
