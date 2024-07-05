import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
    UserModule,
    AuthModule,
    CategoryModule,
    BrandModule,
    SuperSubcategoryModule,
    SuperCategoryModule,
  ],
})
export class AppModule {}
