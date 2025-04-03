export abstract class Repository<T> {
  abstract findById(id: string): Promise<T | null>;
  abstract create(entity: T): Promise<void>;
  abstract save(entity: T): Promise<void>;
  abstract delete(entity: T): Promise<void>;
}
