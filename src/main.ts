import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { CorsConfig, NestConfig } from './config/config.interface';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Short Url')
      .setDescription('The short-url API description')
      .setVersion('1.0')
      .addTag('short-url')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory, {
      jsonDocumentUrl: 'swagger/json',
    });
  }

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest') as NestConfig;
  const corsConfig = configService.get<CorsConfig>('cors') as CorsConfig;

  app.enableVersioning();
  if (corsConfig.enabled) app.enableCors({ origin: '*' });
  await app.listen(nestConfig.port);
}
bootstrap();
