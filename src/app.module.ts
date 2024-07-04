import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/auth';
import { UserModule } from '@/user';

import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    CategoryModule,
    BrandModule,
  ],
})
export class AppModule {}
