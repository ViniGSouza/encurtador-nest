import { Entity, UniqueEntityID } from '@/core/entities';

export interface ShortUrlProps {
  originalUrl: string;
  shortCode: string;
  userId: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ShortUrl extends Entity<ShortUrlProps> {
  get originalUrl() {
    return this.props.originalUrl;
  }

  get shortCode() {
    return this.props.shortCode;
  }

  get userId() {
    return this.props.userId;
  }

  get clicks() {
    return this.props.clicks;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set originalUrl(url: string) {
    this.props.originalUrl = url;
  }

  set clicks(count: number) {
    this.props.clicks = count;
  }

  set updatedAt(date: Date) {
    this.props.updatedAt = date;
  }

  incrementClicks() {
    this.props.clicks += 1;
  }

  static create(props: ShortUrlProps, id?: UniqueEntityID) {
    const shortUrl = new ShortUrl(props, id);

    return shortUrl;
  }
}
