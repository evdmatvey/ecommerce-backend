import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/auth';
import { UserModule } from '@/user';

import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { SuperCategoryModule } from './super-category/super-category.module';
import { SuperSubcategoryModule } from './super-subcategory/super-subcategory.module';

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
