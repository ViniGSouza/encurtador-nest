import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  Request,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { CreateShortUrlUseCase } from '@/domain/url/application/use-cases/create-short-url';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Public } from '@/infra/auth/public';
import { AuthenticatedRequest } from '@/infra/http/types/authenticated-request';

const createShortUrlBodySchema = z.object({
  originalUrl: z.string().url(),
});

type CreateShortUrlBodySchema = z.infer<typeof createShortUrlBodySchema>;

@Controller('/short-urls')
@Public()
@ApiTags('short-urls')
export class CreateShortUrlController {
  constructor(private createShortUrl: CreateShortUrlUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createShortUrlBodySchema))
  @ApiOperation({ summary: 'Criar uma URL curta' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        originalUrl: {
          type: 'string',
          format: 'url',
          example: 'https://example.com/very-long-url-that-needs-shortening',
        },
      },
      required: ['originalUrl'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'URL curta criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'uuid-v4' },
        originalUrl: {
          type: 'string',
          example: 'https://example.com/very-long-url-that-needs-shortening',
        },
        shortCode: { type: 'string', example: 'abc123' },
        fullShortUrl: { type: 'string', example: 'http://short.url/abc123' },
        clicks: { type: 'number', example: 0 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  async handle(
    @Body() body: CreateShortUrlBodySchema,
    @Request() req: AuthenticatedRequest,
  ) {
    const { originalUrl } = body;
    const userId = req.user?.sub;

    const result = await this.createShortUrl.execute({
      originalUrl,
      userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException('Erro ao criar URL curta');
    }

    const { shortUrl } = result.value;

    return {
      id: shortUrl.id.toString(),
      originalUrl: shortUrl.originalUrl,
      shortCode: shortUrl.shortCode,
      fullShortUrl: `${process.env.SHORT_URL_DOMAIN || 'http://localhost:3333'}/${shortUrl.shortCode}`,
      clicks: shortUrl.clicks,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
    };
  }
}
