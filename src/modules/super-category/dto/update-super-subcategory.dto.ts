import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ValidationErrors } from '@/constants';

export class UpdateSuperCategoryDto {
  @IsNotEmpty({ message: ValidationErrors.SUPER_CATEGORY_EMPTY_TITLE })
  @ApiProperty({ example: 'Смартфоны & Ноутбуки' })
  title: string;
}
