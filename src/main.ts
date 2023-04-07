import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// validator
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors();
  await app.listen(process.env.LISTEN_PORT);
}
bootstrap();
