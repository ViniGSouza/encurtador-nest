import { UniqueEntityID } from '.';

export abstract class Entity<T> {
  private _id: UniqueEntityID;
  protected props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  public equals(entity: Entity<unknown>): boolean {
    if (entity === this) {
      return true;
    }

    if (entity.id === undefined) {
      return false;
    }

    if (!(entity instanceof Entity)) {
      return false;
    }

    return this._id.equals(entity._id);
  }
}
