import { Module } from '@nestjs/common';

import { IntlService, PrismaService } from '@/services';

import { SuperSubcategoryModule } from '../super-subcategory';
import { SuperCategoryController } from './super-category.controller';
import { SuperCategoryService } from './super-category.service';

@Module({
  imports: [SuperSubcategoryModule],
  controllers: [SuperCategoryController],
  providers: [SuperCategoryService, PrismaService, IntlService],
})
export class SuperCategoryModule {}
