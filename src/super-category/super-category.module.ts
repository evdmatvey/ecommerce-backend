import { Module } from '@nestjs/common';

import { PrismaService } from '@/services';
import { SuperSubcategoryModule } from '@/super-subcategory/super-subcategory.module';

import { SuperCategoryController } from './super-category.controller';
import { SuperCategoryService } from './super-category.service';

@Module({
  imports: [SuperSubcategoryModule],
  controllers: [SuperCategoryController],
  providers: [SuperCategoryService, PrismaService],
})
export class SuperCategoryModule {}
