import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { AuthenticateUserUseCase } from '@/domain/user/application/use-cases/authenticate-user';
import { WrongCredentialsError } from '@/domain/user/application/use-cases/errors/wrong-credentials-error';
import { Public } from '@/infra/auth/public';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
@Public()
@ApiTags('auth')
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'encurtador@example.com',
        },
        password: {
          type: 'string',
          example: 'senha123',
        },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-v4' },
            name: { type: 'string', example: 'Encurtador de URL' },
            email: { type: 'string', example: 'encurtador@example.com' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateUser.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken, user } = result.value;

    return {
      access_token: accessToken,
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }
}
