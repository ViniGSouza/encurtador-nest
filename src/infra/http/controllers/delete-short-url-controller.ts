import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  Request,
} from '@nestjs/common';
import { DeleteShortUrlUseCase } from '@/domain/url/application/use-cases/delete-short-url';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { AuthenticatedRequest } from '@/infra/http/types/authenticated-request';

@Controller('/short-urls/:id')
@ApiTags('short-urls')
@ApiBearerAuth('JWT-auth')
export class DeleteShortUrlController {
  constructor(private deleteShortUrl: DeleteShortUrlUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir uma URL curta' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID da URL curta',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 204,
    description: 'URL curta excluída com sucesso',
  })
  @ApiResponse({
    status: 403,
    description: 'Você não tem permissão para excluir esta URL',
  })
  @ApiResponse({
    status: 404,
    description: 'URL curta não encontrada',
  })
  async handle(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    const result = await this.deleteShortUrl.execute({
      shortUrlId: id,
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
  }
}
