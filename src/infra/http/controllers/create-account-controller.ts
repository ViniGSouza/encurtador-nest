import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { RegisterUserUseCase } from '@/domain/user/application/use-cases/register-user';
import { UserAlreadyExistsError } from '@/domain/user/application/use-cases/errors/user-already-exists-error';
import { Public } from '@/infra/auth/public';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
@Public()
@ApiTags('accounts')
export class CreateAccountController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @ApiOperation({ summary: 'Criar uma nova conta de usuário' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Encurtador de URL',
        },
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
      required: ['name', 'email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Conta criada com sucesso',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário com este e-mail já existe',
  })
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
