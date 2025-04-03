import { Entity, UniqueEntityID } from '@/core/entities';

export interface UrlClickProps {
  shortUrlId: string;
}

export class UrlClick extends Entity<UrlClickProps> {
  get shortUrlId() {
    return this.props.shortUrlId;
  }

  static create(props: UrlClickProps, id?: UniqueEntityID) {
    const urlClick = new UrlClick(props, id);

    return urlClick;
  }
}
