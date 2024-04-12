import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// validator
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  });

  // Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('VfClub API')
    .setDescription('Description of the VFClub API')
    .setVersion('1.0')
    .build();

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  const configService: ConfigService<Env, true> = app.get(ConfigService);

  const port = configService.get('PORT', { infer: true });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
