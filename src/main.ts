import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as CookieParser from 'cookie-parser';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );
  app.useGlobalPipes(new I18nValidationPipe());
  app.use(CookieParser());
  app.enableCors({
    origin: [configService.get('FRONTEND_URL'), configService.get('ADMIN_URL')],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const config = new DocumentBuilder()
    .setTitle('Cartzilla API')
    .setVersion('0.1.1')
    .addBearerAuth()
    .addGlobalParameters({
      in: 'header',
      name: 'x-custom-lang',
      description: 'Custom language header',
      schema: {
        type: 'string',
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
