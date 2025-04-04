import { Controller, Get } from '@nestjs/common';
import { Public } from '@/infra/auth/public';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/health-check/ping')
@Public()
@ApiTags('health-check')
export class PingController {
  @Get()
  @ApiOperation({ summary: 'Verificar estado da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação em funcionamento',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'pong',
        },
      },
    },
  })
  async handle() {
    return {
      message: 'pong',
    };
  }
}
