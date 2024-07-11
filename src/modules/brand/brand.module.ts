import { Module } from '@nestjs/common';

import { IntlService, PrismaService } from '@/services';

import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, PrismaService, IntlService],
})
export class BrandModule {}
