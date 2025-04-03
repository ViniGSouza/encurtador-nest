import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { GetShortUrlByCodeUseCase } from '@/domain/url/application/use-cases/get-short-url-by-code';
import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from '@/infra/http/types/authenticated-request';
import { EnvService } from '@/infra/env/env.service';

@Controller('/short-urls')
@ApiTags('short-urls')
@ApiBearerAuth('JWT-auth')
export class GetShortUrlByCodeController {
  constructor(
    private getShortUrlByCode: GetShortUrlByCodeUseCase,
    private envService: EnvService,
  ) {}

  @Get('/:code')
  @ApiOperation({ summary: 'Obter URL curta pelo código' })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'Código da URL curta',
    example: 'abc123',
  })
  @ApiResponse({
    status: 200,
    description: 'URL curta encontrada',
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
  @ApiResponse({
    status: 403,
    description: 'Você não tem permissão para acessar esta URL',
  })
  @ApiResponse({
    status: 404,
    description: 'URL curta não encontrada',
  })
  async handle(
    @Param('code') code: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const result = await this.getShortUrlByCode.execute({
      shortCode: code,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { shortUrl } = result.value;

    if (shortUrl.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta URL',
      );
    }

    const shortUrlDomain = this.envService.get('SHORT_URL_DOMAIN');

    return {
      id: shortUrl.id.toString(),
      originalUrl: shortUrl.originalUrl,
      shortCode: shortUrl.shortCode,
      fullShortUrl: `${shortUrlDomain}/${shortUrl.shortCode}`,
      clicks: shortUrl.clicks,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
    };
  }
}
