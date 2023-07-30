import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './main/config/swagger/setup';

async function bootstrap() {
  const prefix = 'register';
  const port = 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(prefix);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });
  setupSwagger(prefix, app);
  await app.listen(port);
}

bootstrap();
