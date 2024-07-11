import { Module } from '@nestjs/common';

import { IntlService, PrismaService } from '@/services';

import { CategoryModule } from '../category';
import { SuperSubcategoryController } from './super-subcategory.controller';
import { SuperSubcategoryService } from './super-subcategory.service';

@Module({
  imports: [CategoryModule],
  controllers: [SuperSubcategoryController],
  providers: [SuperSubcategoryService, PrismaService, IntlService],
  exports: [SuperSubcategoryService],
})
export class SuperSubcategoryModule {}
