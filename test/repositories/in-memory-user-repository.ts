import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { User } from '@/domain/user/enterprise/entities/user';

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.equals(user.id));

    this.items[itemIndex] = user;
  }

  async delete(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.equals(user.id));

    this.items.splice(itemIndex, 1);
  }
}
