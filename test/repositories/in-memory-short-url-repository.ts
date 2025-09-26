import {
  FindByUserId,
  ShortUrlRepository,
} from '@/domain/url/application/repositories/short-url';
import { ShortUrl } from '@/domain/url/enterprise/entities/short-url';

export class InMemoryShortUrlRepository implements ShortUrlRepository {
  public items: ShortUrl[] = [];

  async findById(id: string): Promise<ShortUrl | null> {
    const shortUrl = this.items.find((item) => item.id.toString() === id);

    if (!shortUrl) {
      return null;
    }

    return shortUrl;
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl | null> {
    const shortUrl = this.items.find((item) => item.shortCode === shortCode);

    if (!shortUrl) {
      return null;
    }

    return shortUrl;
  }

  async findManyByUserId({
    userId,
    page,
    perPage,
  }: FindByUserId): Promise<ShortUrl[]> {
    const shortUrls = this.items
      .filter((item) => item.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * perPage, page * perPage);

    return shortUrls;
  }

  async incrementClicks(id: string): Promise<void> {
    const shortUrl = this.items.find((item) => item.id.toString() === id);

    if (shortUrl) {
      const index = this.items.findIndex((item) => item.id.toString() === id);

      this.items[index] = ShortUrl.create(
        {
          originalUrl: shortUrl.originalUrl,
          shortCode: shortUrl.shortCode,
          userId: shortUrl.userId,
          clicks: shortUrl.clicks + 1,
          createdAt: shortUrl.createdAt,
          updatedAt: new Date(),
        },
        shortUrl.id,
      );
    }
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.userId === userId).length;
  }

  async create(shortUrl: ShortUrl): Promise<void> {
    this.items.push(shortUrl);
  }

  async save(shortUrl: ShortUrl): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(shortUrl.id),
    );

    this.items[itemIndex] = shortUrl;
  }

  async delete(shortUrl: ShortUrl): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(shortUrl.id),
    );

    this.items.splice(itemIndex, 1);
  }
}
