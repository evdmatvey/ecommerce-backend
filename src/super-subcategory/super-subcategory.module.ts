import { Module } from '@nestjs/common';

import { CategoryModule } from '@/category/category.module';
import { PrismaService } from '@/services';

import { SuperSubcategoryController } from './super-subcategory.controller';
import { SuperSubcategoryService } from './super-subcategory.service';

@Module({
  imports: [CategoryModule],
  controllers: [SuperSubcategoryController],
  providers: [SuperSubcategoryService, PrismaService],
})
export class SuperSubcategoryModule {}
