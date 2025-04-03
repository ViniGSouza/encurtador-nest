import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Encurtador de URLs API')
    .setDescription(
      'API para encurtamento de URLs com autenticação de usuários',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const options = {
    swaggerOptions: {
      persistAuthorization: true,
      authAction: {
        'JWT-auth': {
          name: 'JWT-auth',
          schema: {
            type: 'http',
            in: 'header',
            name: 'Authorization',
            description: 'JWT Token',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: '',
        },
      },
    },
  };

  SwaggerModule.setup('docs', app, document, options);
}
