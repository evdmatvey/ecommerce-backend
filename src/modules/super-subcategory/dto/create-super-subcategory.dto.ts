import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ValidationErrors } from '@/constants';

export class CreateSuperSubcategoryDto {
  @IsNotEmpty({ message: ValidationErrors.SUPER_SUBCATEGORY_EMPTY_TITLE })
  @ApiProperty({ example: 'Смартфоны' })
  title: string;
}
