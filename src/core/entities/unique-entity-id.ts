import { randomUUID } from 'node:crypto';

export class UniqueEntityID {
  private value: string;

  constructor(id?: string) {
    this.value = id ?? randomUUID();
  }

  toString(): string {
    return this.value;
  }

  toValue(): string {
    return this.value;
  }

  equals(id?: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof UniqueEntityID)) {
      return false;
    }

    return this.toValue() === id.toValue();
  }
}
