import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { GetShortUrlByCodeUseCase } from '@/domain/url/application/use-cases/get-short-url-by-code';
import { RegisterUrlClickUseCase } from '@/domain/url/application/use-cases/register-url-click';
import { Public } from '@/infra/auth/public';
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Redirect,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('redirect')
export class RedirectShortUrlController {
  constructor(
    private getShortUrlByCode: GetShortUrlByCodeUseCase,
    private registerUrlClick: RegisterUrlClickUseCase,
  ) {}

  @Get('/:code')
  @Public()
  @Redirect()
  @ApiOperation({ summary: 'Redirecionar para URL original' })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'Código da URL curta',
    example: 'abc123',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirecionamento para URL original',
  })
  @ApiResponse({
    status: 404,
    description: 'URL curta não encontrada',
  })
  async handle(@Param('code') code: string) {
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

    this.registerUrlClick
      .execute({
        shortUrlId: shortUrl.id.toString(),
      })
      .catch((error) => {
        console.error('Erro ao registrar clique:', error);
      });

    return { url: shortUrl.originalUrl };
  }
}
