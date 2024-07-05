import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ValidationErrors } from '@/constants';

export class CreateCategoryDto {
  @IsNotEmpty({ message: ValidationErrors.CATEGORY_EMPTY_TITLE })
  @ApiProperty({ example: 'Ноутбуки' })
  title: string;
}
