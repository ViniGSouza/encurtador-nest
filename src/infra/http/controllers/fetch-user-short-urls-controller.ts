import { FetchUserShortUrlsUseCase } from '@/domain/url/application/use-cases/fetch-user-short-urls';
import { AuthenticatedRequest } from '@/infra/http/types/authenticated-request';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { z } from 'zod';

const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  perPage: z.number().min(1).max(100).default(10),
});

type PaginationSchema = z.infer<typeof paginationSchema>;

@Controller('/short-urls')
@ApiTags('short-urls')
@ApiBearerAuth('JWT-auth')
export class FetchUserShortUrlsController {
  constructor(private fetchUserShortUrls: FetchUserShortUrlsUseCase) {}

  @Post('/list')
  @ApiOperation({ summary: 'Listar URLs curtas do usuário' })
  @ApiBody({
    description: 'Parâmetros de paginação',
    schema: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'Número da página',
          default: 1,
          example: 1,
        },
        perPage: {
          type: 'number',
          description: 'Itens por página',
          default: 10,
          example: 10,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de URLs curtas do usuário',
    schema: {
      type: 'object',
      properties: {
        shortUrls: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'uuid-v4' },
              originalUrl: {
                type: 'string',
                example:
                  'https://example.com/very-long-url-that-needs-shortening',
              },
              shortCode: { type: 'string', example: 'abc123' },
              fullShortUrl: {
                type: 'string',
                example: 'http://short.url/abc123',
              },
              clicks: { type: 'number', example: 10 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        totalCount: { type: 'number', example: 25 },
        page: { type: 'number', example: 1 },
        perPage: { type: 'number', example: 10 },
        totalPages: { type: 'number', example: 3 },
      },
    },
  })
  async handle(
    @Body() pagination: PaginationSchema,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const { page, perPage } = pagination;

    const result = await this.fetchUserShortUrls.execute({
      userId,
      page,
      perPage,
    });

    if (result.isLeft()) {
      throw new BadRequestException('Erro ao listar URLs curtas');
    }

    const { shortUrls, totalCount } = result.value;

    const totalPages = Math.ceil(totalCount / perPage);

    return {
      shortUrls: shortUrls.map((shortUrl) => {
        return {
          id: shortUrl.id.toString(),
          originalUrl: shortUrl.originalUrl,
          shortCode: shortUrl.shortCode,
          fullShortUrl: `${process.env.SHORT_URL_DOMAIN || 'http://localhost:3333'}/${shortUrl.shortCode}`,
          clicks: shortUrl.clicks,
          createdAt: shortUrl.createdAt,
          updatedAt: shortUrl.updatedAt,
        };
      }),
      totalCount,
      page,
      perPage,
      totalPages,
    };
  }
}
