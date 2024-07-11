import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

import {
  AuthModule,
  BrandModule,
  CategoryModule,
  SuperCategoryModule,
  SuperSubcategoryModule,
  UserModule,
} from '@/modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-custom-lang'])],
      typesOutputPath: path.join(__dirname, '/generated/i18n.generated.ts'),
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    BrandModule,
    SuperSubcategoryModule,
    SuperCategoryModule,
  ],
})
export class AppModule {}
