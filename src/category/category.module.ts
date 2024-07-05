import { Module } from '@nestjs/common';

import { PrismaService } from '@/services';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  exports: [CategoryService],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
