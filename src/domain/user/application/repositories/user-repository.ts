import { Repository } from '@/core/repositories/repository';
import { User } from '../../enterprise/entities/user';

export abstract class UserRepository extends Repository<User> {
  abstract findByEmail(email: string): Promise<User | null>;
}
