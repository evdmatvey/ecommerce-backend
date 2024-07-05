import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ValidationErrors } from '@/constants';

export class CreateSuperCategoryDto {
  @IsNotEmpty({ message: ValidationErrors.SUPER_CATEGORY_EMPTY_TITLE })
  @ApiProperty({ example: 'Смартфоны & Планшеты' })
  title: string;
}
