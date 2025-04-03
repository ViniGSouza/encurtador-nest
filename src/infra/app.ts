import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { setupSwagger } from './swagger/swagger.config';
import { ValidationPipe } from '@nestjs/common';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  await app.listen(port);
}

if (require.main === module) {
  bootstrap();
}
