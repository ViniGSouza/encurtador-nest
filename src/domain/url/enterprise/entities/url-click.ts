import { Entity, UniqueEntityID } from '@/core/entities';

export interface UrlClickProps {
  shortUrlId: string;
  ipAddress: string;
  userAgent: string;
  referer: string;
}

export class UrlClick extends Entity<UrlClickProps> {
  get shortUrlId() {
    return this.props.shortUrlId;
  }

  get ipAddress() {
    return this.props.ipAddress;
  }

  get userAgent() {
    return this.props.userAgent;
  }

  get referer() {
    return this.props.referer;
  }

  static create(props: UrlClickProps, id?: UniqueEntityID) {
    const urlClick = new UrlClick(props, id);

    return urlClick;
  }
}
