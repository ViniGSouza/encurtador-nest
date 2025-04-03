import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  Request,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { EditShortUrlUseCase } from '@/domain/url/application/use-cases/edit-short-url';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { AuthenticatedRequest } from '@/infra/http/types/authenticated-request';
import { EnvService } from '@/infra/env/env.service';

const editShortUrlBodySchema = z.object({
  originalUrl: z.string().url(),
});

type EditShortUrlBodySchema = z.infer<typeof editShortUrlBodySchema>;

@Controller('/short-urls/:id')
@ApiTags('short-urls')
@ApiBearerAuth('JWT-auth')
export class EditShortUrlController {
  constructor(
    private editShortUrl: EditShortUrlUseCase,
    private envService: EnvService,
  ) {}

  @Put()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(editShortUrlBodySchema))
  @ApiOperation({ summary: 'Editar uma URL curta' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID da URL curta',
    example: 'uuid-v4',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        originalUrl: {
          type: 'string',
          format: 'url',
          example: 'https://example.com/new-url',
        },
      },
      required: ['originalUrl'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'URL curta editada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'uuid-v4' },
        originalUrl: {
          type: 'string',
          example: 'https://example.com/new-url',
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
    description: 'Você não tem permissão para editar esta URL',
  })
  @ApiResponse({
    status: 404,
    description: 'URL curta não encontrada',
  })
  async handle(
    @Body() body: EditShortUrlBodySchema,
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const { originalUrl } = body;
    const userId = req.user.sub;

    const result = await this.editShortUrl.execute({
      shortUrlId: id,
      originalUrl,
      userId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        case NotAllowedError:
          throw new ForbiddenException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { shortUrl } = result.value;
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
