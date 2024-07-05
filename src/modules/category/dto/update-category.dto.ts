import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ValidationErrors } from '@/constants';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: ValidationErrors.CATEGORY_EMPTY_TITLE })
  @ApiProperty({ example: 'Смартфоны' })
  title: string;
}
