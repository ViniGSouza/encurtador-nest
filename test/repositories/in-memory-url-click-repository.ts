import {
  FindManyByShortUrlId,
  UrlClickRepository,
} from '@/domain/url/application/repositories/url-click';
import { UrlClick } from '@/domain/url/enterprise/entities/url-click';

export class InMemoryUrlClickRepository implements UrlClickRepository {
  public items: UrlClick[] = [];

  async findById(id: string): Promise<UrlClick | null> {
    const urlClick = this.items.find((item) => item.id.toString() === id);

    if (!urlClick) {
      return null;
    }

    return urlClick;
  }

  async findByShortUrlId(shortUrlId: string): Promise<UrlClick | null> {
    const urlClick =
      this.items
        .filter((item) => item.shortUrlId === shortUrlId)
        .sort((a, b) => {
          // Comparar pela data de criação, assumindo que existe uma propriedade createdAt
          // Normalmente, usaríamos o timestamp de criação, mas como é um mock para testes,
          // vamos ordenar pelo ID que consideramos ser sequencial
          return a.id.toString().localeCompare(b.id.toString());
        })
        .pop() || null;

    return urlClick;
  }

  async findManyByShortUrlId({
    shortUrlId,
    page,
    perPage,
  }: FindManyByShortUrlId): Promise<UrlClick[]> {
    const urlClicks = this.items
      .filter((item) => item.shortUrlId === shortUrlId)
      .sort((a, b) => {
        // Ordenação pelo ID como um substituto para a data de criação em testes
        return b.id.toString().localeCompare(a.id.toString());
      })
      .slice((page - 1) * perPage, page * perPage);

    return urlClicks;
  }

  async countByShortUrlId(shortUrlId: string): Promise<number> {
    return this.items.filter((item) => item.shortUrlId === shortUrlId).length;
  }

  async create(urlClick: UrlClick): Promise<void> {
    this.items.push(urlClick);
  }

  async save(urlClick: UrlClick): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(urlClick.id),
    );

    this.items[itemIndex] = urlClick;
  }

  async delete(urlClick: UrlClick): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(urlClick.id),
    );

    this.items.splice(itemIndex, 1);
  }
}
