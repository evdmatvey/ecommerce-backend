import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as CookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(CookieParser());
  app.enableCors({
    origin: [configService.get('FRONTEND_URL'), configService.get('ADMIN_URL')],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const config = new DocumentBuilder()
    .setTitle('Cartzilla API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
